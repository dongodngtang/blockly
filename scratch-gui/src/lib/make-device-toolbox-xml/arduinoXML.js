import { blockSeparator, colors, translatorFn } from './common';

const getArduinoSerialLabel = translatorFn('ARDUINO_SERIAL_OPERATION', 'Serial Operation');
const getArduinoIOLabel = translatorFn('ARDUINO_IO_OPERATION', 'I/O Operation');
export const getArduinoKitArduinoXml = function () {
  return `
    <category name="%{BKY_CATEGORY_ARDUINO}" 
    id="arduino" colour="${colors[4].colour}" secondaryColour="${colors[4].secondaryColour}">
    <block type="arduino_setBaudrate">
        <value name="BAUDRATE">
            <shadow type="math_number">
                <field name="NUM">115200</field>
            </shadow>
        </value>
    </block>
    <block type="arduino_print">
        <value name="TEXT">
            <shadow type="text">
                <field name="TEXT">hello world</field>
            </shadow>
        </value>
    </block>
    <block type="arduino_serial_available">
    </block>
    <block type="arduino_serial_read">
    </block>
    </category>
    `;
};
export const getArduinoXml = function () {
  return `
  <category name="%{BKY_CATEGORY_ARDUINO}" 
  id="arduino" colour="${colors[4].colour}" secondaryColour="${colors[4].secondaryColour}">
      <label text="${getArduinoSerialLabel()}" category-label="false"></label>
      <block type="arduino_pin_mode">
          <value name="PINNUM">
              <shadow type="math_positive_number">
                  <field name="NUM">13</field>
              </shadow>
          </value>
      </block>
      <block type="arduino_setBaudrate">
          <value name="BAUDRATE">
              <shadow type="math_number">
                  <field name="NUM">115200</field>
              </shadow>
          </value>
      </block>
      <block type="arduino_setBaudrate2">
          <value name="BAUDRATE">
              <shadow type="math_number">
                  <field name="NUM">115200</field>
              </shadow>
          </value>
      </block>
      <block type="arduino_println">
          <value name="TEXT">
              <shadow type="text">
                  <field name="TEXT">hello world</field>
              </shadow>
          </value>
      </block>
      <block type="arduino_print">
          <value name="TEXT">
              <shadow type="text">
                  <field name="TEXT">hello world</field>
              </shadow>
          </value>
      </block>
      <block type="arduino_serial_available">
      </block>
      <block type="arduino_serial_read">
      </block>
      <label text="${getArduinoIOLabel()}" category-label="false"></label>
      <block type="arduino_digital_write">
          <value name="PINNUM">
              <shadow type="math_positive_number">
                  <field name="NUM">13</field>
              </shadow>
          </value>
          <value name="ARDUINO_LEVEL_OPTION">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>
      </block>
      <block type="arduino_pwm_write">
          <value name="ARDUINO_PWM_OPTION">
              <shadow type="math_number">
                  <field name="NUM">5</field>
              </shadow>
          </value>
          <value name="PWM">
              <shadow type="math_number">
                  <field name="NUM">5</field>
              </shadow>
          </value>
      </block>
      <block type="arduino_digital_read">
          <value name="PINNUM">
              <shadow type="math_number">
                  <field name="NUM">5</field>
              </shadow>
          </value>
      </block>
      <block type="arduino_pin_value">
          <value name="PINNUM">
              <shadow type="math_number">
                  <field name="NUM">5</field>
              </shadow>
          </value>
      </block>
      <block type="arduino_analog_read">
          <value name="PINNUM">
              <shadow type="math_number">
                  <field name="NUM">5</field>
              </shadow>
          </value>
      </block>
      <block type="arduino_tone">
          <value name="PINNUM">
              <shadow type="math_number">
                  <field name="NUM">5</field>
              </shadow>
          </value>
          <value name="FREQUENCY">
              <shadow type="math_number">
                  <field name="NUM">5</field>
              </shadow>
          </value>
          <value name="DURATION">
              <shadow type="math_number">
                  <field name="NUM">5</field>
              </shadow>
          </value>
      </block>
      <block type="arduino_servo">
          <value name="PINNUM">
              <shadow type="math_number">
                  <field name="NUM">5</field>
              </shadow>
          </value>
          <value name="ANGLE">
              <shadow type="math_number">
                  <field name="NUM">5</field>
              </shadow>
          </value>
      </block>
      ${blockSeparator}
  </category>
  `;
};
