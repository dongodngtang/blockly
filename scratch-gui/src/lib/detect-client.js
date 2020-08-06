export const detectClient = function () {
  const appVersion = window.navigator.appVersion;
  const isIOS = /(iPad)|(iPhone)/.test(appVersion);
  const isAndroid = /Android/.test(appVersion);
  const isPC = !isIOS && !isAndroid;
  return {
    isIOS,
    isAndroid,
    isPC
  };
};
