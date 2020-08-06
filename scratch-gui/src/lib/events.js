export const STARTVISUALSORT = 'StartVisualSort';
export const ADDEDVISUALSORT = 'AddedVisualSort';
export const CANCELVISUALSORT = 'CancelVisualSort';

export const STARTCALIBRATION = 'StartCalibration';
export const CANCELCALIBRATION = 'CancelCalibration';
export const STARTMACHANICALCALIBRATION = 'StartMachanicalCalibration';

export const EXPORTCALIBRATION = 'ExportCalibration';
export const IMPORTCALIBRATION = 'ImportCalibration';
export const EDITCALIBRATION = 'EditCalibration';
export const MANUALFINISH = 'manualFinish';
export const CLOSEAUTOREACOGING = 'closeAutoReacoging';

export const EDITAI = 'editAI';
export const ONLYAIRES = 'onlyAIRes';
export const AIAUTOFINISH = 'aiRes';
export const MANUALAI = 'manualAI';
export const SHOWSMALLIMG = 'showSmallImg';
export const SHOWCUTSMALLIMGLIST = 'showCutSmallImgList';
export const NOPHOTORECOGNITION = 'noPhotoRecognition';

export const DELCONFIRM = 'delConfirm';
export const TUTORIALCHANGE = 'tutorialChange';
export const TUTORIALPDFCHANGE = 'tutorialPDFChange';

// Magican Lite 坐标标定
export const OPEN_CALIBRATION = 'openCalibration';
export const OPEN_IMPORTPOPUP = 'openImportPopup';

export const ALARMTYPECHANGE = 'alarmTypeChange';

export const delConfirm = isOk => new CustomEvent(DELCONFIRM, { detail: isOk });
export const startVisualSort = new Event(STARTVISUALSORT);
export const addedVisualSort = new Event(ADDEDVISUALSORT);
export const cancelVisualSort = new Event(CANCELVISUALSORT);
export const editCalibration = new Event(EDITCALIBRATION);
// AI 接口事件
export const editAI = (isFacial, type, isUpload) => new CustomEvent(EDITAI, { detail: { isFacial, type, isUpload } });
export const showOnlyAIRes = timeout => new CustomEvent(ONLYAIRES, { detail: { timeout } });
export const AIAutoFinish = res => new CustomEvent(AIAUTOFINISH, { detail: res });
export const manualAI = isCut => new CustomEvent(MANUALAI, { detail: { isCut } });
export const showSmallImg = res => new CustomEvent(SHOWSMALLIMG, { detail: res });
export const showCutSmallImgList = res => new CustomEvent(SHOWCUTSMALLIMGLIST, { detail: res });
export const noPhotoRecognition = data => new CustomEvent(NOPHOTORECOGNITION, { detail: { data } });

export const startCalibration = isInit => new CustomEvent(STARTCALIBRATION, { detail: { isInit } });
export const startMachanicalCalibration = new Event(STARTMACHANICALCALIBRATION);
// 语音识别事件
export const exportCalibration = new Event(EXPORTCALIBRATION);
export const importCalibration = new Event(IMPORTCALIBRATION);
export const manualFinish = new Event(MANUALFINISH);
export const closeAutoReacoging = new Event(CLOSEAUTOREACOGING);

// 标定事件
export const openCalibration = new Event(OPEN_CALIBRATION);
export const openImportpopup = flag => new CustomEvent(OPEN_IMPORTPOPUP, { detail: { flag } });

// 切换语言教程中心内容改变
export const tutorialChange = new Event(TUTORIALCHANGE);
export const tutorialPDFChange = new Event(TUTORIALPDFCHANGE);

// alarmtype
export const alarmTypeChange = new Event(ALARMTYPECHANGE);
