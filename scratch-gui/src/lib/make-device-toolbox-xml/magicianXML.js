import {
  colors,
  blockSeparator
} from './common';

import { aiXml, checkCalibrationAIAdded } from './aiXML.js';
import {
  photoelectricAndColorSensorXml,
  photoelectricAndColorSensorAdded
} from './photoelectricAndColorSensorXML.js';
import {
  slidingRailXml,
  slidingRailXmlAdded
} from './slidingRailXML';

const arduinokitMagicianSettingXML = function () {
  return `
    <category name="%{BKY_CATEGORY_MAGICIAN_SETTING}" 
id="Magician_Setting" colour="${colors[0].colour}" secondaryColour="${colors[0].secondaryColour}">
    <block type="ArduinoKit_Init"></block>
    <block type="Magician_SetPTPCommonParams">
        <value name="velocity">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="acceleration">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
    </block>
    <block type="Magician_SetPTPJumpParams">
    <value name="jumpHeight">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="zLimit">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>
</category>
    `;
};
const magicianSettingXML = function () {
  return `
<category name="%{BKY_CATEGORY_MAGICIAN_SETTING}" 
id="Magician_Setting" colour="${colors[0].colour}" secondaryColour="${colors[0].secondaryColour}">
  <block type="Magician_SetEndFixture">
  </block>
  <block type="Magician_SetPTPCommonParams">
    <value name="velocity">
        <shadow type="math_number">
            <field name="NUM">100</field>
        </shadow>
    </value>
    <value name="acceleration">
        <shadow type="math_number">
            <field name="NUM">100</field>
        </shadow>
    </value>
  </block>

  <block type="Magician_SetPTPJointParams">
    <value name="velocity">
        <shadow type="math_number">
            <field name="NUM">10</field>
        </shadow>
    </value>
    <value name="acceleration">
        <shadow type="math_number">
            <field name="NUM">10</field>
        </shadow>
    </value>
  </block>

  <block type="Magician_SetPTPCoordinateParams">
    <value name="xyzVelocity">
        <shadow type="math_number">
            <field name="NUM">100</field>
        </shadow>
    </value>
    <value name="rVelocity">
        <shadow type="math_number">
            <field name="NUM">100</field>
        </shadow>
    </value>
    <value name="xyzAcceleration">
        <shadow type="math_number">
            <field name="NUM">100</field>
        </shadow>
    </value>
    <value name="rAccleration">
        <shadow type="math_number">
            <field name="NUM">100</field>
        </shadow>
    </value>
  </block>
  
  <block type="Magician_SetPTPJumpParams">
    <value name="jumpHeight">
        <shadow type="math_number">
            <field name="NUM">20</field>
        </shadow>
    </value>
    <value name="zLimit">
        <shadow type="math_number">
            <field name="NUM">100</field>
        </shadow>
    </value>
  </block>

  <block type="Magician_SetLostStepParams">
    <value name="threshold">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>
  <block type="Magician_SetLostStep">
  </block>
  <block type="Magician_SetMotorSpeed">
    <value name="Speed">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>
  <block type="Magician_SetMotorSpeedAndDistance">
    <value name="Speed">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="Distance">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>

  <block type="Magician_SetConveyor">
  <value name="Speed">
      <shadow type="math_number">
          <field name="NUM">0</field>
      </shadow>
  </value>
  </block>
</category>
`;
};
const arduinokitMagicianMotionXML = function () {
  return `
  <category name="%{BKY_CATEGORY_MAGICIAN_MOTION}" 
  id="Magician_Motion" colour="${colors[1].colour}" secondaryColour="${colors[1].secondaryColour}">
    <block type="Magician_Home"></block>
    <block type="Magician_JumpTo">
        <value name="x">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="y">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="z">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="r">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
    </block>
    <block type="Magician_Goto">
        <value name="x">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="y">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="z">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="r">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
    </block>

    <block type="Magician_MoveDistance">
        <value name="x">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="y">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="z">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="r">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
    </block>
  </category>
    `;
};
const magicianMotionXML = function () {
  return `
<category name="%{BKY_CATEGORY_MAGICIAN_MOTION}" 
id="Magician_Motion" colour="${colors[1].colour}" secondaryColour="${colors[1].secondaryColour}">
  <block type="Magician_Home">
  </block>

  <block type="Magician_JumpTo">
    <value name="x">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="y">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="z">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="r">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>

  <block type="Magician_Goto">
    <value name="x">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="y">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="z">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="r">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>
  
  <block type="Magician_MoveDistance">
    <value name="x">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="y">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="z">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="r">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>

  <block type="Magician_SetJointAngle">
    <value name="Joint1">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="Joint2">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="Joint3">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="Joint4">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>
  <block type="Magician_SetR">
    <value name="r">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>

  <block type="Magician_Gripper">
  </block>
  <block type="Magician_SetSuctionCup">
  </block>
</category>`;
};

const arduinokitMagicianStatusXML = function () {
  return `
  <category name="%{BKY_CATEGORY_MAGICIAN_STATUS}" 
id="Magician_STATUS" colour="${colors[2].colour}" secondaryColour="${colors[2].secondaryColour}">
    <block type="Magician_GetCurrentCoordinate">
    </block>
  </category>
  `;
};
const magicianStatusXML = function () {
  return `
<category name="%{BKY_CATEGORY_MAGICIAN_STATUS}" 
id="Magician_STATUS" colour="${colors[2].colour}" secondaryColour="${colors[2].secondaryColour}">
  <block type="Magician_GetCurrentCoordinate">
  </block>
  <block type="Magician_GetJointAngle">
  </block>
  <block type="Magician_ClearAllAlarmsState">
  </block>
</category>
`;
};

const arduinokitMagicianIOXML = function () {
  return `
  <category name="%{BKY_CATEGORY_MAGICIAN_IO}" 
id="Magician_IO" colour="${colors[3].colour}" secondaryColour="${colors[3].secondaryColour}">
  <block type="Magician_GetIODI"></block>
</category>
  `;
};
const magicianIOXML = function () {
  return `
<category name="%{BKY_CATEGORY_MAGICIAN_IO}" 
id="Magician_IO" colour="${colors[3].colour}" secondaryColour="${colors[3].secondaryColour}">
    <block type="Magician_SetIOMultiplexing">
    </block>
  <block type="Magician_SetPWMOutput">
    <value name="frequency">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="dutyCycle">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>

  <block type="Magician_SetLeaveIOutput">
  </block>

  <block type="Magician_GetIODI">
  </block>

  <block type="Magician_GetIOADC">
  </block>
</category>
`;
};


export const getMagicianXml = function () {
  return `
    ${magicianSettingXML()}
    ${blockSeparator}
    ${magicianMotionXML()}
    ${blockSeparator}
    ${magicianStatusXML()}
    ${blockSeparator}
    ${magicianIOXML()}
    ${blockSeparator}
    ${checkCalibrationAIAdded() ? aiXml() : ''}
    ${photoelectricAndColorSensorAdded() ? photoelectricAndColorSensorXml() : ''}
    ${slidingRailXmlAdded() ? slidingRailXml(true) : ''}
  `;
};
const magicianSettingForMobilePlatformXML = function () {
  return `
<category name="%{BKY_CATEGORY_MAGICIAN_SETTING}" 
id="Magician_Setting" colour="${colors[0].colour}" secondaryColour="${colors[0].secondaryColour}">
  <block type="Magician_SetEndFixture">
  </block>
  <block type="Magician_SetPTPCommonParams">
    <value name="velocity">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="acceleration">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>

  <block type="Magician_SetPTPJointParams">
    <value name="velocity">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="acceleration">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>
  
  <block type="Magician_SetMotorSpeed">
    <value name="Speed">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>
  <block type="Magician_SetPTPJumpParams">
    <value name="jumpHeight">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="zLimit">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>
  
  <block type="Magician_SetMotorSpeedAndDistance">
    <value name="Speed">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="Distance">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>

  <block type="Magician_SetConveyor">
  <value name="Speed">
      <shadow type="math_number">
          <field name="NUM">0</field>
      </shadow>
  </value>
  </block>
</category>
`;
};
const magicianMotionForMobilePlatformXML = function () {
  return `
<category name="%{BKY_CATEGORY_MAGICIAN_MOTION}" 
id="Magician_Motion" colour="${colors[1].colour}" secondaryColour="${colors[1].secondaryColour}">
  <block type="Magician_Home">
  </block>

  <block type="Magician_JumpTo">
    <value name="x">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="y">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="z">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="r">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>

  <block type="Magician_Goto">
    <value name="x">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="y">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="z">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="r">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>
  
  <block type="Magician_MoveDistance">
    <value name="x">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="y">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="z">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="r">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>

  <block type="Magician_SetJointAngle">
    <value name="Joint1">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="Joint2">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="Joint3">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="Joint4">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>

  <block type="Magician_Gripper">
  </block>
  <block type="Magician_SetSuctionCup">
  </block>
</category>`;
};
const magicianStatusForMobilePlatformXML = function () {
  return `
<category name="%{BKY_CATEGORY_MAGICIAN_STATUS}" 
id="Magician_STATUS" colour="${colors[2].colour}" secondaryColour="${colors[2].secondaryColour}">
  <block type="Magician_GetCurrentCoordinate">
  </block>
  <block type="Magician_GetJointAngle">
  </block>
</category>
`;
};
const magicianIOForMobilePlatformXML = function () {
  return `
<category name="%{BKY_CATEGORY_MAGICIAN_IO}" 
id="Magician_IO" colour="${colors[3].colour}" secondaryColour="${colors[3].secondaryColour}">
    <block type="Magician_SetIOMultiplexing">
    </block>
  <block type="Magician_SetPWMOutput">
    <value name="frequency">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
    <value name="dutyCycle">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>

  <block type="Magician_SetLeaveIOutput">
  </block>

  <block type="Magician_GetIODI">
  </block>

  <block type="Magician_GetIOADC">
  </block>
</category>
`;
};
export const getMagicianForMobilePlatforXml = function () {
  return `
    ${magicianSettingForMobilePlatformXML()}
    ${blockSeparator}
    ${magicianMotionForMobilePlatformXML()}
    ${blockSeparator}
    ${magicianStatusForMobilePlatformXML()}
    ${blockSeparator}
    ${magicianIOForMobilePlatformXML()}
  `;
};


export const getArduinoKitMagicianXml = function () {
  return `
  ${arduinokitMagicianSettingXML()}
  ${blockSeparator}
  ${arduinokitMagicianMotionXML()}
  ${blockSeparator}
  ${arduinokitMagicianStatusXML()}
  ${blockSeparator}
  ${arduinokitMagicianIOXML()}
  `;
};
