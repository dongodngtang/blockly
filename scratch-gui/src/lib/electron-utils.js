const dialog = window.require && window.require('electron').remote.dialog;
const fs = window.require && window.require('fs');
const localStorageItemName = 'recentFiles';
const os = window.require && window.require('os');
const checkMacOS = () => (os ? os.platform() === 'darwin' : false);
let currentPath = '';
const localStorageData = localStorage ? localStorage.getItem(localStorageItemName) : null;

const recentFiles = localStorageData ? JSON.parse(localStorageData) : [];

const recentFilesProxy = new Proxy(recentFiles, {
  set(target, prop, value) {
    Reflect.set(target, prop, value);
    if (prop === 'length') {
      localStorage.setItem(localStorageItemName, JSON.stringify(target));
    }
    return true;
  }
});

const recordRecentFiles = path => {
  const index = recentFilesProxy.indexOf(path);
  if (~index) {
    // 如果最近记录里有该record, 则提到最前面去
    recentFilesProxy.splice(index, 1);
  } else if (recentFilesProxy.length > 5) {
    // 如果最近记录超过5个
    recentFilesProxy.pop();
  }
  recentFilesProxy.unshift(path);
};

export const isElectronEnv = () => !!window.require;

export const getFileNameFromPath = path => {
  if (checkMacOS()) {
    return path.match(/\/([^/]*)\./)[1];
  }
  return /\\([^\\]*)\./.exec(path)[1];
};

export const getRecentFiles = () => {
  if (recentFilesProxy.length === 0) {
    return ['无最近打开文件'];
  }
  return recentFilesProxy;
};

export const removeRecentFile = path => {
  const index = recentFilesProxy.indexOf(path);
  recentFilesProxy.splice(index, 1);
};

export const getFileFromPath = path => {
  const pathExist = fs.existsSync(path);
  if (pathExist) {
    const data = fs.readFileSync(path);
    return data;
  }
  return false;
};

export const showSyncDialog = (type, message) => dialog.showMessageBoxSync({
  type,
  message,
  buttons: ['ok', 'cancel'],
  defaultId: 0
}) === 0;

export const showOpenDialog = () => {
  const path = dialog.showOpenDialogSync({
    filters: [{ name: 'Scratch', extensions: ['sb', 'sb2', 'sb3'] }],
    properties: ['openFile']
  });
  if (!path) return;
  currentPath = path[0];
  recordRecentFiles(path[0]);
  return currentPath;
};

export const saveCurrentFile = content => new Promise(resolve => {
  content.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    .pipe(fs.createWriteStream(currentPath))
    .on('finish', () => {
      resolve();
    });
});


export const showSaveDialog = (content, defaultName) => new Promise(resolve => {
  const savedPath = dialog.showSaveDialogSync({
    title: '保存文件',
    defaultPath: `./${defaultName}`,
    filters: [
      { name: 'Scratch',
        extensions: ['sb', 'sb2', 'sb3']
      }]
  });
  if (!savedPath) return;
  recordRecentFiles(savedPath);
  currentPath = savedPath;
  content.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    .pipe(fs.createWriteStream(savedPath))
    .on('finish', () => {
      resolve(getFileNameFromPath(savedPath));
    });
});

export const showQuitDialog = ({ saveToQuit, noSaveQuit, cancel, quitMessage, cb }) => {
  const buttons = [saveToQuit, noSaveQuit, cancel];
  const clickIndex = dialog.showMessageBoxSync({
    type: 'warning',
    buttons,
    defaultId: 2,
    message: quitMessage,
    cancelId: 2,
    noLink: true
  });
  switch (buttons[clickIndex]) {
  case saveToQuit:
    // hack: 不写 settimeout 无法退出, 因为 dispatch 的action 还未生效
    cb(true).then(() => setTimeout(window.close, 100));
    return true;
  case noSaveQuit:
    cb(false).then(() => setTimeout(window.close, 100));
    return true;
  default:
    return false;
  }
};
export const setCurrentPath = path => {
  currentPath = path;
};
export const canSaveCurrent = () => currentPath !== '';
export const showNeedSaveBox = messages => {
  const buttons = [messages.saveMessage, messages.confirmMessage, messages.cancleMessage];
  const clickButton = dialog.showMessageBoxSync({
    type: 'question',
    message: messages.showMessage,
    buttons,
    noLink: true
  });
  return buttons[clickButton];
};

export const clearCurrentPath = function() {
  currentPath = '';
};
