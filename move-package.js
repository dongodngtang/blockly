let path = require('path');
let fs = require('fs');

let dependence_name = process.argv[2];
let package_dir = path.join(__dirname, dependence_name);
let package_config = JSON.parse(
  fs.readFileSync(path.join(package_dir, 'package.json'))
);

let package_name = `${package_config.name}-${package_config.version}.tgz`;
let gui_path = path.join(__dirname, 'scratch-gui');
let gui_lib_path = path.join(gui_path, 'libs');
let new_file = path.join(gui_lib_path, package_name);
let old_file = path.join(package_dir, package_name);

let gui_config_path = path.join(gui_path, 'package.json');
let gui_config = JSON.parse(fs.readFileSync(gui_config_path));

let old_dependence = gui_config.devDependencies[dependence_name];
let new_dependence = path.relative(gui_path, new_file);

gui_config.devDependencies[dependence_name] = './'+new_dependence;

let del = file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
};

del(old_dependence);
del(new_dependence);

if (!fs.existsSync(gui_lib_path)) {
  fs.mkdirSync(gui_lib_path);
}

try {
  fs.renameSync(old_file, new_file);
} catch (err) {
  console.log(err);
}
// 不需要修改 package.json 的依賴包路徑
fs.writeFileSync(
  gui_config_path,
  JSON.stringify(
    gui_config,
    function(key, value) {
      if (typeof value == 'function') {
        return Function.prototype.toString.call(value);
      }
      return value;
    },
    2
  )
);
