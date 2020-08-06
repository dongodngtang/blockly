const ssh2 = require('ssh2');
const fs = require('fs');
const cp = require('child_process');

const BLOCK_DIR = 'scratch-blocks';
const TARGET_DIR = 'scratch-blocks-compile-temp';
const HOST = '192.168.0.12';
const PORT = 59374;
const USER = 'suxixiang';
const KEY_PATH = 'D:/ParkerSVN/suxixiang';
const FILES = [
  'arduino_compressed.js',
  'blocks_compressed_horizontal.js',
  'blockly_compressed_horizontal.js',
  'blocks_compressed.js',
  'blockly_compressed_vertical.js',
  'blocks_compressed_vertical.js',
  'blockly_uncompressed_horizontal.js',
  'blockly_uncompressed_vertical.js'
];
const IGNORE_SVN_FILES = ['node_modules', 'package-lock.json', 'git'];

let conn = null;
let sftp = null;

const get_svn_info = () => {
  return new Promise((resolve, reject) => {
    cp.exec(
      `cd ${BLOCK_DIR} && svn info --show-item revision && svn info --show-item url`,
      (err, stdout) => {
        if (err) {
          reject(err);
        } else {
          const infos = stdout.split('\n');
          const version = infos[0].trim();
          const repository = `${infos[1].trim()}`;
          resolve({
            version,
            repository
          });
        }
      }
    );
  });
};

const connect_server = () => {
  return new Promise((resolve, reject) => {
    conn
      .on('ready', () => {
        conn.sftp((err, s) => {
          if (err) {
            reject(err);
          } else {
            sftp = s;
            resolve();
          }
        });
      })
      .connect({
        host: HOST,
        port: PORT,
        username: USER,
        privateKey: fs.readFileSync(KEY_PATH)
      });
  });
};

const command = (cmd, cbOut, cbErr) => {
  console.log(`${cmd}`);
  return new Promise((resolve, reject) => {
    conn.exec(cmd, (err, stream) => {
      if (err) {
        reject(err);
      } else {
        stream
          .on('close', () => {
            resolve();
          })
          .on('data', data => {
            console.log(`STDOUT: ${data}`);
            cbOut && cbOut(data.toString().trim());
          })
          .stderr.on('data', data => {
            console.log(`STDERR: ${data}`);
            cbErr && cbErr(data.toString().trim());
          });
      }
    });
  });
};

const command_noerr = (cmd, cbOut) => {
  return new Promise(async (resolve, reject) => {
    try {
      let is_err = false;
      await command(cmd, cbOut, err => {
        reject(err);
        is_err = true;
      });
      !is_err && resolve();
    } catch (err) {
      reject(err);
    }
  });
};

const do_download = fileName => {
  return new Promise((resolve, reject) => {
    const remote_file = `${TARGET_DIR}/${fileName}`;
    const local_file = `./${BLOCK_DIR}/${fileName}`;
    sftp.fastGet(remote_file, local_file, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Download ${fileName} res: ${res}`);
        resolve();
      }
    });
  });
};

const do_upload = fileName => {
  return new Promise((resolve, reject) => {
    const remote_file = `${TARGET_DIR}/${fileName}`;
    const local_file = `./${BLOCK_DIR}/${fileName}`;
    sftp.fastPut(local_file, remote_file, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Upload ${fileName} res: ${res}`);
        resolve();
      }
    });
  });
};

const do_delete = fileName => {
  return new Promise(async (resolve, reject) => {
    const remote_file =
      fileName === TARGET_DIR ? fileName : `${TARGET_DIR}/${fileName}`;

    try {
      await command_noerr(`rm -rf ${remote_file}`);
      console.log(`Delete ${fileName} res: ${remote_file}`);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

const download = () => {
  return new Promise(async (resolve, reject) => {
    try {
      for (let index = 0; index < FILES.length; index++) {
        const file = FILES[index];
        await do_download(file);
      }
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

const handle_svn_res = function (res) {
  return new Promise(function (resolve) {
    let modify_files = [];
    let add_files = [];
    let delete_files = [];
    const lines = res.split('\n');
    lines.forEach(line => {
      const words = line.split(' ');
      const type = words[0];
      const file = words[words.length - 1].trim();
      try {
        switch (type) {
        case 'M':
          modify_files.push(file);
          break;
        case '!':
          delete_files.push(file);
          break;
        case '?':
          add_files.push(file);
          break;
        default:
          break;
        }
      } catch (err) {
        console.log(err);
      }
    });

    resolve({
      add_files,
      delete_files,
      modify_files
    });
  });
};

const sync_file_to_serv = () => {
  return new Promise((resolve, reject) => {
    // 检查本地做了哪些修改
    cp.exec(`cd ${BLOCK_DIR} && svn status`, async (err, stdout) => {
      if (err || stdout === null) {
        reject(err);
        return;
      }

      try {
        // 获取修改的文件队列
        const svn_changes = await handle_svn_res(stdout);
        console.log('Local SVN Changes:', svn_changes);

        // 整理需要删除的文件
        const delete_files = svn_changes.delete_files;

        // 整理需要上传的文件
        const upload_files = svn_changes.add_files.concat(
          svn_changes.modify_files
        );

        // 上传文件
        for (let index = 0; index < upload_files.length; index++) {
          const file = upload_files[index];
          IGNORE_SVN_FILES.indexOf(file) === -1 && (await do_upload(file));
        }

        // 删除文件
        for (let index = 0; index < delete_files.length; index++) {
          const file = delete_files[index];
          IGNORE_SVN_FILES.indexOf(file) === -1 && (await do_delete(file));
        }

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });
};

const del_serv_change = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // 检查服务器是否存在文件夹
      let is_exist = null;
      await command_noerr(`if [ -d ${TARGET_DIR} ]; then echo 1; fi`, res => {
        is_exist = res;
      });

      if (is_exist) {
        // 检查服务器做了哪些修改
        let data = '';
        await command_noerr(`cd ${TARGET_DIR} && svn status`, stdout => {
          data += stdout;
        });

        // 获取修改的文件队列
        const svn_changes = await handle_svn_res(data);
        console.log('Server SVN Changes:', svn_changes);

        // 整理需要删除的文件
        const delete_files = svn_changes.add_files.concat(
          svn_changes.modify_files
        );

        // 删除文件
        for (let index = 0; index < delete_files.length; index++) {
          const file = delete_files[index];
          let needDel = true;
          for (let j = 0; j < IGNORE_SVN_FILES.length; j++) {
            if (file.includes(IGNORE_SVN_FILES[j])) {
              needDel = false;
              break;
            }
          }
          needDel && (await do_delete(file));
        }
      }

      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

const fetch_serv_svn = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // 获取本地对应远程仓库信息
      const svn_info = await get_svn_info();

      // 检查服务器是否存在同名文件
      let is_exist = null;
      await command_noerr(`if [ -d ${TARGET_DIR} ]; then echo 1; fi`, res => {
        is_exist = res;
      });

      if (is_exist) {
        // 获取服务器对应的远程仓库信息
        let serv_repos = null;
        await command_noerr(`cd ${TARGET_DIR} && svn info | awk 'NR==3'`, res => {
          serv_repos = res.split(' ')[1];
        });

        // 判断本地和服务器是否对应同一个远程仓库
        if (serv_repos === svn_info.repository) {
          // 将服务器的代码更新到本地的同一个版本
          await command_noerr(`svn up -r ${svn_info.version} ${TARGET_DIR} `);
        } else {
          // 删除文件夹
          await do_delete(TARGET_DIR);
          // 服务器从远程仓库拉取对应版本代码
          await command_noerr(
            `svn co ${svn_info.repository} ${TARGET_DIR} -r ${svn_info.version}`
          );
        }
      } else {
        // 服务器从远程仓库拉取对应版本代码
        await command_noerr(
          `svn co ${svn_info.repository} ${TARGET_DIR} -r ${svn_info.version}`
        );
      }
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

const contact_file = () => {
  const arduino_file = `./${BLOCK_DIR}/arduino_compressed.js`;
  const blockly_file = `./${BLOCK_DIR}/blockly_compressed_vertical.js`;
  const arduino_data = fs.readFileSync(arduino_file);
  const blockly_data = fs.readFileSync(blockly_file);
  fs.writeFileSync(blockly_file, blockly_data + arduino_data);
};

const run = async () => {
  try {
    conn = new ssh2.Client();
    await connect_server();
    // 删除服务器端修改过或者新增的文件
    await del_serv_change();
    // // 服务器端拉取代码
    await fetch_serv_svn();
    // // 同步本地代码到服务器端
    await sync_file_to_serv();
    // 在服务器端编译代码;
    await command(
      `cd ${TARGET_DIR} && npm install && npm run install:ex:server`
    );
    // 从服务器端下载编译过的文件
    await download();
    conn.end();
    // 合并文件
    contact_file();
  } catch (err) {
    console.log(err);
  }
};
run();