// import * as Blockly from 'scratch-blocks';

Blockly.Python.AIVoice_AutoVoice = function(block) {
  const Languages = block.getFieldValue('Languages') === 'ZH' ?
    'Chinese_voice_recognition' : 'English_voice_recognition';
  const time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC) || 1;
  return `#scratch.start.${Languages}, continued for ('${time}') second\n`;
};

Blockly.Python.AIVoice_ManualVoice = function(block) {
  const Languages = block.getFieldValue('Languages') === 'ZH' ?
    'Chinese_voice_recognition' : 'English_voice_recognition';
  return `#scratch.start.${Languages}, Manual\n`;
};

Blockly.Python.AIVoice_Result = function(block) {
  return [`speech recognition results\n`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.AIVoice_TextToSpeech = function(block) {
  const inputText = Blockly.Python.valueToCode(block, 'inputText', Blockly.Python.ORDER_ATOMIC) || 'hello';
  return `#scratch.speech broadcasting(${inputText})\n`;
};

Blockly.Python.AIBlock_DetectPic = function(block) {
  const timeout = Blockly.Python.valueToCode(block, 'timeout', Blockly.Python.ORDER_ATOMIC) || 3;
  return `#scratch.timeout('${timeout}') seconds to take picture\n`;
};

Blockly.Python.AIBlock_ManualDetectPic = function(block) {
  return `#scratch.take picture manually\n`;
};

Blockly.Python.AIBlock_TagPicture = function(block) {
  const tag = Blockly.Python.valueToCode(block, 'picture', Blockly.Python.ORDER_ATOMIC) || 1;
  return [`Picture recognize('${tag}')'s tag\n`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.AIBlock_Picture = function(block) {
  return [`Picture\n`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.AIBlock_CutAndSee = function(block) {
  const picture = Blockly.Python.valueToCode(block, 'picture', Blockly.Python.ORDER_ATOMIC) || 1;
  return `#scratch.use picture('${picture}') cut and recognize\n`;
};

Blockly.Python.AIBlock_ThingsCount = function(block) {
  return [`Things count in picture\n`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.AIBlock_ThingsTag = function(block) {
  const index = Blockly.Python.valueToCode(block, 'index', Blockly.Python.ORDER_ATOMIC) || 1;
  return [`Picture('${index}') thing's tag\n`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.AIBlock_ThingsPlace = function(block) {
  const index = Blockly.Python.valueToCode(block, 'index', Blockly.Python.ORDER_ATOMIC) || 1;
  const cord = block.getFieldValue('cord') === 0 ? 'x' : 'y';
  return [`Picture('${index}') coordinate ('${cord}') thing's tag\n`, Blockly.Python.ORDER_NONE];
};


Blockly.Python.AIBlock_FaceGender = function(block) {
  const index = Blockly.Python.valueToCode(block, 'index', Blockly.Python.ORDER_ATOMIC) || 1;
  const gender = block.getFieldValue('Languages');
  return [`The gender of picture('${index}') facial recognization is ${gender}\n`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.AIBlock_FaceExpression = function(block) {
  const index = Blockly.Python.valueToCode(block, 'index', Blockly.Python.ORDER_ATOMIC) || 1;
  const expression = block.getFieldValue('expression');
  return [`The expression of picture('${index}') facial recognization is ${expression}\n`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.AIBlock_FaceName = function(block) {
  const index = Blockly.Python.valueToCode(block, 'index', Blockly.Python.ORDER_ATOMIC) || 1;
  return [`The class name of picture('${index}')\n`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.AIBlock_FaceNamePercent = function(block) {
  const index = Blockly.Python.valueToCode(block, 'index', Blockly.Python.ORDER_ATOMIC) || 1;
  const className = block.getFieldValue('class');
  return [`The class name of picture('${index}') facial recognization is ${className}\n`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.AIBlock_OCR = function(block) {
  const picture = Blockly.Python.valueToCode(block, 'picture', Blockly.Python.ORDER_ATOMIC) || 1;
  return [`OCR recognize picture('${picture}') words\n`, Blockly.Python.ORDER_NONE];
};

Blockly.Python.AIBlock_cameraList = function(block) {

  return `#AIBlock_cameraList\n`;
};
Blockly.Python.AIVoice_TextToSpeech = function(block) {

  return `#AIVoice_TextToSpeech\n`;
};
Blockly.Python.AIBlock_setVoice = function(block) {

  return `#AIBlock_setVoice\n`;
};
Blockly.Python.AIBlock_setLanguage = function(block) {

  return `#AIBlock_setLanguage\n`;
};
Blockly.Python.AIBlock_getTranslateblock = function(block) {

  return `#AIBlock_getTranslateblock\n`;
};
Blockly.Python.AIBlock_getViewerLanguageblock = function(block) {

  return `#AIBlock_getViewerLanguageblock\n`;
};
