import {
  colors,
  blockSeparator
} from './common';
import { aiXml, checkCalibrationAIAdded } from './aiXML.js';
import Blockly from 'scratch-blocks';
import { openCalibration, openImportpopup } from '../events';
import calibrationWs from '../calibration';
import ScratchBlocks from 'scratch-blocks';

const MagicianLiteSettingXML = function () {
  return `
<category name="%{BKY_CATEGORY_MAGICIAN_LITE_SETTING}" 
id="Magician_Lite_Setting" colour="${colors[0].colour}" secondaryColour="${colors[0].secondaryColour}">
  <block type="Magician_Lite_SetEndFixture">
  </block>
  <block type="Magician_Lite_SetPTPCommonParams">
    <value name="percent">
        <shadow type="math_number">
            <field name="NUM">100</field>
        </shadow>
    </value>
  </block>
  
  <block type="Magician_Lite_SetPTPJumpParams">
    <value name="jumpHeight">
        <shadow type="math_number">
            <field name="NUM">10</field>
        </shadow>
    </value>
    <value name="zLimit">
        <shadow type="math_number">
            <field name="NUM">10</field>
        </shadow>
    </value>
  </block>
  <block type="Magician_Lite_SetLostStepParams">
  <value name="threshold">
      <shadow type="math_number">
          <field name="NUM">1</field>
      </shadow>
  </value>
  </block>
  <block type="Magician_Lite_SetLostStep">
  </block>
</category>
`;
};
const MagicianLiteMotionXML = function () {
  return `
<category name="%{BKY_CATEGORY_MAGICIAN_LITE_MOTION}" 
id="Magician_Lite_Motion" colour="${colors[1].colour}" secondaryColour="${colors[1].secondaryColour}">
  <block type="Magician_Lite_Home">
  </block>

  <block type="Magician_Lite_JumpTo">
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

  <block type="Magician_Lite_Goto">
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
  
  <block type="Magician_Lite_MoveDistance">
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

  <block type="Magician_Lite_SetJointAngle">
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
  <block type="Magician_Lite_SetR">
    <value name="r">
        <shadow type="math_number">
            <field name="NUM">0</field>
        </shadow>
    </value>
  </block>

  <block type="Magician_Lite_Gripper">
  </block>
  <block type="Magician_Lite_SetSuctionCup">
  </block>
</category>`;
};
const MagicianLiteStatusXML = function () {
  return `
<category name="%{BKY_CATEGORY_MAGICIAN_LITE_STATUS}" 
id="Magician_Lite_STATUS" colour="${colors[2].colour}" secondaryColour="${colors[2].secondaryColour}">
  <block type="Magician_Lite_CheckLostStep">
  </block>
  <block type="Magician_Lite_GetCurrentCoordinate">
  </block>
  <block type="Magician_Lite_GetJointAngle">
  </block>
  <block type="Magician_Lite_ClearAllAlarmsState">
  </block>
</category>
`;
};

const MagicianLiteCalibrationXML = function () {
  const CALIBRATION = ScratchBlocks.ScratchMsgs.translate(
    'CALIBRATION',
    'Coordinate Calibation'
  );
  const EXPORT = ScratchBlocks.ScratchMsgs.translate(
    'EXPORT',
    'Export Calibation'
  );
  const IMPORT = ScratchBlocks.ScratchMsgs.translate(
    'IMPORT',
    'Import Calibation'
  );
  const ws = calibrationWs.getSingleInstace();

  let flag;
  const handleChange = e => {
    const thisFileInput = e.target;
    const fileToUpload = thisFileInput.files[0];
    const reader = new FileReader();
    reader.readAsText(fileToUpload);
    reader.onload = () => {
      const result = JSON.parse(reader.result);
      if (result && typeof (result) === 'object'){
        flag = result.matrix[0].length === 3;
        flag = result.matrix[0].length === 3;
        if (result && result.matrix.length && flag){
          ws.calibrationImport(result)
            .then(res => {
              if (res){
                document.dispatchEvent(openImportpopup(true));
              }
            });
        } else {
          document.dispatchEvent(openImportpopup(false));
        }
      } else {
        document.dispatchEvent(openImportpopup(false));
      }
      
    };
  };

  const buttonKeys = {
    NEW_CALIBRATION: 'newCalibration',
    IMPORT: 'import',
    EXPORT: 'export'
  };
  (() => {
    const workspace = Blockly.getMainWorkspace();
    workspace.registerButtonCallback(buttonKeys.NEW_CALIBRATION, () => {
      document.dispatchEvent(openCalibration);
    });

    workspace.registerButtonCallback(buttonKeys.IMPORT, () => {
      const ipt = document.createElement('input');
      ipt.type = 'file';
      ipt.accept = '.json';
      ipt.addEventListener('change', handleChange);
      ipt.click();
    });

    workspace.registerButtonCallback(buttonKeys.EXPORT, () => {
      ws.calibrationExport().then(res => {
        const result = {
          matrix: res
        };
        // 创建a标签
        const elementA = document.createElement('a');
      
        // 文件的名称为时间戳加文件名后缀
        elementA.download = `坐标标定.json`;
        elementA.style.display = 'none';
      
        // 生成一个blob二进制数据，内容为json数据
        const blob = new Blob([JSON.stringify(result)]);
      
        // 生成一个指向blob的URL地址，并赋值给a标签的href属性
        elementA.href = URL.createObjectURL(blob);
        document.body.appendChild(elementA);
        elementA.click();
        document.body.removeChild(elementA);
      });
    });
  })();

  return `
  <category name="${CALIBRATION}" 
  id="Magician_Lite_CALIBRATION" colour="${colors[13].colour}" secondaryColour="${colors[13].secondaryColour}">
  <button text="${CALIBRATION}" callbackKey="${buttonKeys.NEW_CALIBRATION}"></button>
  <button text="${IMPORT}" callbackKey="${buttonKeys.IMPORT}"></button>
  <button text="${EXPORT}" callbackKey="${buttonKeys.EXPORT}"></button>
  </category>
  `;
};
export const getMagicianLiteXml = function () {
  return ` 
    ${MagicianLiteSettingXML()}
    ${blockSeparator}
    ${MagicianLiteMotionXML()}
    ${blockSeparator}
    ${MagicianLiteStatusXML()}
    ${blockSeparator}
    ${checkCalibrationAIAdded() ? aiXml(true) : ''}
    ${blockSeparator}
    ${MagicianLiteCalibrationXML()}
  `;
};
