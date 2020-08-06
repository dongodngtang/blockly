import {
  colors, blockSeparator
} from './common.js';
import { aiXml, checkCalibrationAIAdded } from './aiXML.js';
import {
  photoelectricAndColorSensorXml,
  photoelectricAndColorSensorAdded
} from './photoelectricAndColorSensorXML.js';
import {
  slidingRailXml,
  slidingRailXmlAdded
} from './slidingRailXML';
import {
  enlightenmentKitXmlAdded,
  enlightenmentKitXml
} from './enlightenmentKitXML';

const controllerIOXML = function () {
  return `
  <category name="%{BKY_CATEGORY_CONTROLLER}" 
    id="controller_IO" colour="${colors[12].colour}" secondaryColour="${colors[12].secondaryColour}">

      <block type="Controller_Digital_output">
          <value name="eio">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>
          <value name="level">
              <shadow type="math_number">
                  <field name="NUM">1</field>
              </shadow>
          </value>
      </block>

      <block type="Controller_Set_Pin">
          <value name="eio">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>
      </block>

      <block type="Controller_SetIOPWM">
          <value name="eio">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>
          <value name="frequency">
              <shadow type="math_number">
                  <field name="NUM">1</field>
              </shadow>
          </value>
          <value name="dutyCycle">
              <shadow type="math_number">
                  <field name="NUM">1</field>
              </shadow>
          </value>
      </block>
      
      <block type="Controller_digital_read">
          <value name="PINNUM">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>
      </block>

      <block type="Controller_digital_read_bool">
          <value name="PINNUM">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>
      </block>

      <block type="Controller_analog_read">
          <value name="eio">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>
      </block>

      <block type="Controller_SetStepperMotor">
          <value name="speed">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>
      </block>

      <block type="Controller_SetStepperMotorNum">
          <value name="speed">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>
          <value name="num">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>
      </block>

       <block type="Controller_SetConveyor">
          <value name="speed">
              <shadow type="math_number">
                  <field name="NUM">0</field>
              </shadow>
          </value>
      </block>
  </category>`;
};

const controllerXbeeXML = function () {
  return `
  <category name="%{BKY_CATEGORY_WIRELESS}" 
  id="controller_wireless" colour="#f34f00" secondaryColour="#f34f00">
    <label text="XBee" category-label="false"></label>    
    <block type="Controller_SmartBotXbeeRead">
    </block>
  
    <block type="Controller_SmartBotXbeeWrite">
        <value name="STR">
            <shadow type="text">
                <field name="TEXT">hello world</field>
            </shadow>
        </value>
    </block>
    <block type="Controller_SmartBotXbeeCompare">
        <value name="inpText">
            <shadow type="text">
                <field name="TEXT">hello world</field>
            </shadow>
        </value>
    </block>
    <block type="Controller_SmartBotXbeeClear">
    </block>
    <label text="%{BKY_CATEGORY_BLUETOOTH}" category-label="false"></label>   
    <block type="BlueTooth_setBlueTooth">
        <value name="name">
            <shadow type="text">
                <field name="TEXT">000001</field>
            </shadow>
        </value>
        <value name="id">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>
    <block type="BlueTooth_getBlueToothMesagges">
        <value name="id">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>
    <block type="BlueTooth_setBlueToothMesagges">
        <value name="id">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="msg">
            <shadow type="text">
                <field name="TEXT">hello</field>
            </shadow>
        </value>
    </block>
    <block type="BlueTooth_isGetBlueToothMesagges">
        <value name="id">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="msg">
            <shadow type="text">
                <field name="TEXT">hello</field>
            </shadow>
        </value>
    </block>
    <block type="BlueTooth_start">
        <value name="id">
            <shadow type="math_number">
                <field name="NUM">1</field>
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


export const getControllerXml = function () {
  return `
  ${controllerIOXML()}
  ${controllerXbeeXML()}
  ${blockSeparator}
  ${checkCalibrationAIAdded() ? aiXml(true) : ''}
  ${photoelectricAndColorSensorAdded() ? photoelectricAndColorSensorXml(true) : ''}
  ${slidingRailXmlAdded() ? slidingRailXml(false) : ''}
  ${enlightenmentKitXmlAdded() ? enlightenmentKitXml() : ''}
  `;
};
