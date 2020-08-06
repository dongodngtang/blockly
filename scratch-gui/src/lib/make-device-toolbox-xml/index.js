import {
  getAistarterXml
} from './aistarter/aistarterXML';
import {
  getMagicianXml,
  getArduinoKitMagicianXml,
  getMagicianForMobilePlatforXml
} from './magicianXML';
import {
  mobilePlatformSelfXML,
  mobilePlatformSensorXML
} from './mobilePlatformXML';
import {
  getArduinoXml,
  getArduinoKitArduinoXml
} from './arduinoXML';
import {
  getArduinoKitXml
} from './arduinoKitXML';
import {
  getMagicianLiteXml
} from './magicianLiteXML';
import {
  getControllerXml
} from './controllerXML';


const blockSeparator = '<sep gap="36"/>';


const getMobileplatformXml = function () {
  return `
    ${mobilePlatformSelfXML()}
    ${blockSeparator}
    ${mobilePlatformSensorXML()}
  `;
};
export const getDeviceXml = function (deviceName) {
  switch (deviceName) {
  case 'aistarter':
    return getArduinoXml() + getAistarterXml();
  case 'magician':
    return getMagicianXml();
  case 'magicianlite':
    return getMagicianLiteXml();
  case 'mobileplatform':
    return getMagicianForMobilePlatforXml() + getArduinoXml() + getMobileplatformXml();
  case 'arduinouno':
    return getArduinoXml();
  case 'arduinomega':
    return getArduinoXml();
  case 'arduinokit':
    return getArduinoKitArduinoXml() + getArduinoKitMagicianXml() + getArduinoKitXml();
  case 'controller':
    return getControllerXml();
  }

};
