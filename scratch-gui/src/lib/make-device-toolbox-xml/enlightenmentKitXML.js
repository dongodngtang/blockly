export const enlightenmentKitXmlAdded = () => window.enlightenmentKitXmlAdded;
import Blockly from 'scratch-blocks';
const blockSeparator = '<sep gap="36"/>';

export const enlightenmentKitXml = function() {
  const hello = Blockly.ScratchMsgs.translate('DEFAUL_TTEXT_TO_SPEECH', 'hello');
  return `
    <category name="%{BKY_CONTROLLER_ENLIGHTENMENTKIT}"
      id="enlightenmentKit"
      iconURI="${require('./blockIcons/enlightenment-kit.png')}"
    >
      <label text="%{BKY_CONTROLLER_ENLIGHTENMENTKIT_LIGHT}" category-label="false"></label>
      <block type="EnlightenmentKit_setLEDlampRGB">
        <value name="R">
          <shadow type="math_number">
              <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="G">
          <shadow type="math_number">
              <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="B">
          <shadow type="math_number">
              <field name="NUM">0</field>
          </shadow>
        </value>
      </block>
      <block type="EnlightenmentKit_setLEDlampColor">
        <value name="value">
          <shadow type="math_number">
              <field name="NUM">50</field>
          </shadow>
        </value>
      </block>
      <block type="EnlightenmentKit_setLEDlamp"></block>
      <label text="%{BKY_CONTROLLER_ENLIGHTENMENTKIT_SOUNDTITLE}" category-label="false"></label>
      <block type="EnlightenmentKit_voicePlayback">
        <value name="value">
          <shadow type="text">
              <field name="TEXT">1</field>
          </shadow>
        </value>
      </block>
      <block type="EnlightenmentKit_setVolumeAndSpeed"></block>
      <block type="EnlightenmentKit_playMusic"></block>
      <block type="EnlightenmentKit_playSound"></block>
      <block type="EnlightenmentKit_playPromptTone"></block>
      <block type="EnlightenmentKit_operation"></block>

      <label text="%{BKY_CONTROLLER_ENLIGHTENMENTKIT_DISPLAY}" category-label="false"></label>
      <block type="EnlightenmentKit_setOLEDDisplay">
        <value name="inputText">
          <shadow type="text">
            <field name="TEXT">1</field>
          </shadow>
        </value>
      </block>
      <block type="EnlightenmentKit_setOLEDRanksDisplay">
        <value name="inputText">
          <shadow type="text">
            <field name="TEXT">1</field>
          </shadow>
        </value>
      </block>
      <block type="EnlightenmentKit_setOLEDClear"></block>

      <label text="%{BKY_CONTROLLER_ENLIGHTENMENTKIT_SENSOR}" category-label="false"></label>
      <block type="EnlightenmentKit_getKnobSensor"></block>
      ${blockSeparator}
      <block type="EnlightenmentKit_getLightSensor"></block>
      ${blockSeparator}
      <block type="EnlightenmentKit_getSoundSensor"></block>
      ${blockSeparator}
      <block type="EnlightenmentKit_getTemperatureAndHumiditySensor"></block>
      ${blockSeparator}
      <block type="EnlightenmentKit_getColorSensorRGB"></block>
      <block type="EnlightenmentKit_getColorSensorColor"></block>
      ${blockSeparator}
      <block type="EnlightenmentKit_getphotoelectricitySensorBool"></block>
      <block type="EnlightenmentKit_getphotoelectricitySensor"></block>
    </category>
    `;
};
