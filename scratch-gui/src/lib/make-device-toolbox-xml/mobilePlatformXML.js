export const mobilePlatformSelfXML = function () {
  return `
<category name="%{BKY_CATEGORY_MOBILEPLATFORM}" id="MobilePlatform" colour="#FF661A" secondaryColour="#FF5500">
<block type="MobilePlatform_SmartBotInit">
</block>
<block type="MobilePlatform_SmartBotSetKeyInit">
</block>
<block type="MobilePlatform_SmartBotSetMotorPI">
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
<block type="MobilePlatform_SmartBotSetLED">
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
<block type="MobilePlatform_SmartBotSetMovment">
  <value name="DIR">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
  <value name="SPEED">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
</block>

<block type="MobilePlatform_SmartBotSetMovmentTime">
  <value name="DIR">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
  <value name="SPEED">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
  <value name="TIME">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
</block>

<block type="MobilePlatform_SmartBotSetMotor">
  <value name="PORT">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
  <value name="SPEED">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
</block>
  
</category>
`;
};
export const mobilePlatformSensorXML = function () {
  return `
<category name="%{BKY_CATEGORY_MOBILEPLATFORM_SENSOR}" 
id="MobilePlatform_sensor" colour="#FFBF00" secondaryColour="#E6AC00">
<block type="MobilePlatform_SmartBotSetSonar">
  <value name="PORT">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
</block>

  <block type="MobilePlatform_SmartBotGetBarrier">
  <value name="PORT">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>

<block type="MobilePlatform_SmartBotGetSonar">
  <value name="PORT">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
</block>

<block type="MobilePlatform_SmartBotGetIRModuleValue">
  <value name="PORT">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
</block>

<block type="MobilePlatform_SmartBotSetColorWB">
  <value name="PORT">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
</block>

<block type="MobilePlatform_SmartBotSetColorSenor">
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

<block type="MobilePlatform_SmartBotDetColorSenor">
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

<block type="MobilePlatform_SmartBotGetColorSenor">
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

<block type="MobilePlatform_SmartBotGetKeyValue">
  <value name="KEY">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
</block>

<block type="MobilePlatform_SmartBotGetMotorPose">
  <value name="PORT">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
</block>



<block type="MobilePlatform_SmartBotSetSonarThreshold">
    <value name="SetSonarThreshold">
    </value>
    <value name="DISTANCE">
        <shadow type="math_number">
            <field name="NUM">1</field>
        </shadow>
    </value>
</block>


<block type="MobilePlatform_SetDeviation">
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
<block type="MobilePlatform_GetDeviation"></block>
<block type="MobilePlatform_SmartBotGetPIDLocation"></block>
<block type="MobilePlatform_SmartBotSetLocationPID">
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
