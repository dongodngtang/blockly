/* eslint-disable quotes */
const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
} = require('electron');
// 配合使用 gzip 压缩代码
Menu.setApplicationMenu(null);
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const backApp = express();
const listenTencentAPI = require('./AI/tencent');
const listenAWSAPI = require('./AI/amazon');
const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const yaml = require("js-yaml");

const checkMacOS = () => os.platform() === 'darwin';

let mainPort=10000;
// backApp.get('*.js', function(req, res, next) {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/javascript');
//   next();
// });
backApp.use(bodyParser.json({ limit: '10mb' }));
backApp.use(express.static(__dirname));

backApp.all('*', cors());
backApp.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
});
// 检查更新
backApp.get('/checkUpdate', function(req, resOut) {
  axios.get('https://cn.dobot.cc/Dobot-Scratch/dobotScratch.yml')
    .then(res => {
      resOut.send(JSON.stringify(yaml.load(res.data)));
    });
});

// 固件更新检查
backApp.get('/checkFirmwareUpdate', function(req, resOut) {
  axios.get('https://cn.dobot.cc/Dobot-Scratch/firmware.yml')
    .then(res => {
      resOut.send(JSON.stringify(yaml.load(res.data)));
    });
});

const port = 9991;
backApp.listen(port, () => {
  console.log(`listening ${port}`);
});

let childAI;
let childDobotlink;
app.allowRendererProcessReuse = true;
function createWindow() {
  const locale = app.getLocale();
  if (locale.includes('zh')) {
    // 代理腾讯云的 post 请求
    listenTencentAPI(backApp);
  } else {
    // 代理亚马逊的请求
    listenAWSAPI(backApp);
  }

  let mainWindow = new BrowserWindow({
    show: false,
    backgroundColor: '#4d97ff',
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainPort++;
  mainWindow.maximize();
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
  const template = [
    {
      label: "Application",
      submenu: [
        { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
      ]
    }, 
    {
      label: "Edit",
      submenu: [
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      ]
    }
  ];

  if (process.argv.includes('development')) {
    // mainWindow.loadURL(`http://localhost:${port}/to-build`);
    mainWindow.loadURL('http://localhost:8602');
    mainWindow.webContents.openDevTools();
    if (checkMacOS()) {
      Menu.setApplicationMenu(Menu.buildFromTemplate(template));
      const AIProto = path.join(__dirname, 'build/macResources/AI/ssd_remove.prototxt');
      const AIModel = path.join(__dirname, 'build/macResources/AI/ssd_remove.caffemodel');
      childAI = spawn(path.join(__dirname, 'build/macResources/AI/main'),
        [
          '--port',mainPort,
          '-p' , AIProto,
          '-m' ,AIModel
        ]);
      childDobotlink = spawn(path.join(__dirname, 'build/macResources/DobotLink/DobotLink.app/Contents/MacOS/DobotLink'), [os.tmpdir()]);
    } else {
      // spawn(path.join(__dirname, 'build/winResources/AI/main.exe'));
      childAI = spawn(path.join(__dirname, 'build/winResources/AI/main.exe'),['--port',mainPort],{
        cwd: path.join(__dirname, 'build/winResources/AI')
      });
      childDobotlink = spawn(path.join(__dirname, 'build/winResources/DobotLink/DobotLink.exe'), [os.tmpdir()]);
    }
  } else {
    if (checkMacOS()) {
      Menu.setApplicationMenu(Menu.buildFromTemplate(template));
      spawn(path.join(__dirname, 'macResources/DobotLink/DobotLink.app/Contents/MacOS/DobotLink'), [os.tmpdir()], { detached: true });
      const AIProto = path.join(__dirname, 'macResources/AI/ssd_remove.prototxt');
      const AIModel = path.join(__dirname, 'macResources/AI/ssd_remove.caffemodel');
      childAI = spawn(path.join(__dirname, 'macResources/AI/main'),
        [
          '--port',mainPort,
          '-p' , AIProto,
          '-m' ,AIModel
        ]);
    } else {
      childAI = spawn(path.join(__dirname, 'winResources/AI/main.exe'),['--port',mainPort],{
        cwd: path.join(__dirname, 'winResources/AI')
      });
      childDobotlink = spawn(path.join(__dirname, 'winResources/DobotLink/DobotLink.exe'), [os.tmpdir()]);
    }
    mainWindow.loadURL(`http://localhost:${port}/web`);

  }

  mainWindow.on('closed', function() {
    if (checkMacOS()) {
      try {
        process.kill(childAI.pid);
        process.kill(childDobotlink.pid);
      } catch(e) {
        console.log(e);
      }
    } else {
      try {
        childAI.kill();
        childDobotlink.kill();
      } catch(e) {
        console.log(e);
      }
    }
    
    mainWindow = null;
  });
  mainWindow.on('close', function() {
    // app.quit();
  });
  ipcMain.on('open-dev-tool', function() {
    if(mainWindow.webContents.isDevToolsOpened()) return;
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  });
  ipcMain.on('getAIPort', (event) => {
    event.reply('senAIPort', mainPort);
  });

}

app.on('window-all-closed', function() {
  app.quit();
});
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // if (mainWindow === null) {
    //   createWindow();
    // }
    // // 当运行第二个实例时,将会聚焦到myWindow这个窗口
    // if (mainWindow) {
    //   if (mainWindow.isMinimized()) mainWindow.restore();
    //   mainWindow.focus();
    // }
    createWindow();
  });

  // 创建 myWindow, 加载应用的其余部分, etc...
  app.on('ready',createWindow);
}