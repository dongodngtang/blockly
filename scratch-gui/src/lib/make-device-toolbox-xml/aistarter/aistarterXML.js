const blockSeparator = '<sep gap="36"/>';
const aistarterSelfXML = function () {
  return `
<category name="%{BKY_CATEGORY_AISTARTER}" id="AIStarter" colour="#0FBD8C" secondaryColour="#0F9D11">
  <block type="AIStarter_SmartBotInit">
  </block>
  <block type="AIStarter_SmartBotSetKeyInit">
  </block>
  <block type="AIStarter_SmartBotSetMotorPI">
    <value name="KP">
        <shadow type="math_number">
            <field name="NUM">1</field>
        </shadow>
    </value>
    <value name="KI">
        <shadow type="math_number">
            <field name="NUM">1</field>
        </shadow>
    </value>
  </block>
  <block type="AIStarter_SmartBotSetLED">
    <value name="PORT">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
    <value name="STATE">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>
</category>`;
};
const aistarterMotionXML = function () {
  return `
<category name="%{BKY_CATEGORY_AISTARTER_MOTION}" 
id="CATEGORY_AISTARTER_MOTION" colour="#4F98FC" secondaryColour="#006cff">
  <block type="AIStarter_SmartBotSetMotor">
    <value name="PORT">
      <shadow type="math_number">
      </shadow>
    </value>
    <value name="SPEED">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>
  <block type="AIStarter_SmartBotServoattach">
    <value name="PORT">
        <shadow type="math_number">
            <field name="NUM">1</field>
        </shadow>
    </value>
  </block>
  <block type="AIStarter_SmartBotServoWrite">
    <value name="PORT">
        <shadow type="math_number">
            <field name="NUM">1</field>
        </shadow>
    </value>
    <value name="VALUE">
        <shadow type="math_number">
            <field name="NUM">1</field>
        </shadow>
    </value>
  </block>
  <block type="AIStarter_SmartBotServoDetach">
    <value name="PORT">
        <shadow type="math_number">
            <field name="NUM">1</field>
        </shadow>
    </value>
  </block>

</category>
`;
};
const aistarterSensorXML = function () {
  return `
<category name="%{BKY_CATEGORY_AISTARTER_SENSOR}" 
id="CATEGORY_AISTARTER_SENSOR" colour="#FFBF00" secondaryColour="#E6AC00">
  <block type="AIStarter_SmartBotSetSonar">
  <value name="PORT">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
  </block>
  <block type="AIStarter_SmartBotGetBarrier">
    <value name="PORT">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>
  <block type="AIStarter_SmartBotGetSonar">
    <value name="PORT">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>
  <block type="AIStarter_SmartBotGetIRModuleValue">
    <value name="PORT">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>


  <block type="AIStarter_SmartBotGetCompass">
  </block>

  <block type="AIStarter_SmartBotSetCompassCalibration">
  </block>
  <block type="AIStarter_SmartBotSetColorWB">
    <value name="PORT">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>

  <block type="AIStarter_SmartBotSetColorSenor">
    <value name="PORT">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
    <value name="ISON">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>

  <block type="AIStarter_SmartBotDetColorSenor">
    <value name="PORT">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
    <value name="COLOR">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>

  <block type="AIStarter_SmartBotGetColorSenor">
    <value name="PORT">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
    <value name="COLOR">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>
  <block type="AIStarter_SmartBotGetKeyValue">
    <value name="KEY">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>
  <block type="AIStarter_SmartBotGetMotorPose">
    <value name="PORT">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>
  <block type="AIStarter_SmartBotSetSonarThreshold">
    <value name="SetSonarThreshold">
    </value>
    <value name="DISTANCE">
        <shadow type="math_number">
            <field name="NUM">1</field>
        </shadow>
    </value>
  </block>
  <block type="AIStarter_SmartBotGetLightAnalog">
  </block>
  <block type="AIStarter_SetDeviation">
      <value name="IR1">
        <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
      <value name="IR2">
        <shadow type="math_number">
        <field name="NUM">0</field>
        </shadow>
      </value>
      <value name="IR3">
        <shadow type="math_number">
        <field name="NUM">0</field>
        </shadow>
      </value>
      <value name="IR4">
        <shadow type="math_number">
        <field name="NUM">0</field>
        </shadow>
      </value>
      <value name="IR5">
        <shadow type="math_number">
        <field name="NUM">0</field>
        </shadow>
      </value>
      <value name="IR6">
        <shadow type="math_number">
        <field name="NUM">0</field>
        </shadow>
      </value>
    </block>
    <block type="AIStarter_GetDeviation"></block>
    <block type="AIStarter_GetHeadDeviation"></block>
    <block type="AIStarter_SmartBotGetPIDLocation"></block>
    <block type="AIStarter_SmartBotSetLocationPID">
      <value name="KP">
        <shadow type="math_number">
        <field name="NUM">0</field>
        </shadow>
      </value>
      <value name="KI">
        <shadow type="math_number">
        <field name="NUM">0</field>
        </shadow>
      </value>
      <value name="KD">
        <shadow type="math_number">
        <field name="NUM">0</field>
        </shadow>
      </value>
      <value name="Limit">
        <shadow type="math_number">
        <field name="NUM">0</field>
        </shadow>
      </value>
    </block>
</category>
`;
};

const aistarterOtherXML = function () {
  return `
<category name="%{BKY_CATEGORY_WIRELESS}" 
id="aistarter_wireless" colour="#f34f00" secondaryColour="#fb4f4f">
  <label text="XBee" category-label="false"></label>    
  <block type="AIStarter_SmartBotXbeeRead">
  </block>

  <block type="AIStarter_SmartBotXbeeWrite">
      <value name="STR">
          <shadow type="text">
              <field name="TEXT">hello world</field>
          </shadow>
      </value>
  </block>

  <block type="AIStarter_SmartBotXbeeCompare">
      <value name="STR1">
          <shadow type="text">
              <field name="TEXT">hello world</field>
          </shadow>
      </value>
  </block>
  <block type="AIStarter_SmartBotXbeeClear">
  </block>
  <label text="%{BKY_CATEGORY_BLUETOOTH}" category-label="false"></label>
  <block type="AIStarter_setBlueTooth">
        <value name="name">
            <shadow type="text">
                <field name="TEXT">000001</field>
            </shadow>
        </value>
        <value name="id">
            <shadow type="text">
                <field name="TEXT">1</field>
            </shadow>
        </value>
    </block>
    <block type="AIStarter_getBlueToothMesagges">
        <value name="id">
            <shadow type="text">
                <field name="TEXT">1</field>
            </shadow>
        </value>
    </block>
    <block type="AIStarter_setBlueToothMesagges">
        <value name="id">
            <shadow type="text">
                <field name="TEXT">1</field>
            </shadow>
        </value>
        <value name="msg">
            <shadow type="text">
                <field name="TEXT">hello</field>
            </shadow>
        </value>
    </block>
    <block type="AIStarter_isGetBlueToothMesagges">
        <value name="id">
            <shadow type="text">
                <field name="TEXT">1</field>
            </shadow>
        </value>
        <value name="msg">
            <shadow type="text">
                <field name="TEXT">hello</field>
            </shadow>
        </value>
    </block>
    <block type="AIStarter_start">
        <value name="id">
            <shadow type="text">
                <field name="TEXT">1</field>
            </shadow>
        </value>
        <value name="msg">
            <shadow type="text">
                <field name="TEXT">hello</field>
            </shadow>
        </value>
    </block>
</category>
`;
};
export const getAistarterXml = function () {
  return `
    ${aistarterSelfXML()}
    ${blockSeparator}
    ${aistarterMotionXML()}
    ${blockSeparator}
    ${aistarterSensorXML()}
    ${blockSeparator}
    ${aistarterOtherXML()}
    `;
};
