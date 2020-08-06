'use strict';

goog.provide('Blockly.Blocks.arduinokit');

goog.require('Blockly.Blocks');

goog.require('Blockly.Colours');

goog.require('Blockly.constants');

goog.require('Blockly.ScratchBlocks.VerticalExtensions');


const dropdownOptions = {
  ArduinoKit_SetBlockLocation: [
    ["Red", "red"],
    ["Yellow", "yellow"],
    ["Blue", "blue"],
    ["Green", "green"]
  ],
  ArduinoKit_DetectPhases: (
    () => {
      const res = Array(20);
      for (let i = 1; i <= 20; i++) {
        res[i - 1] = [i + '', i + ''];
      }
      return res;
    }
  )(),
  ArduinoKit_CheckButtonState: [
    ['Red', 'red'],
    ['Green', 'green'],
    ['Blue', 'blue']
  ],
  ArduinoKit_TurnLED: [
    ['ON', 'on'],
    ['OFF', 'off']
  ],
  ArduinoKit_ReadJoystickValue: [
    ['x', 'x'],
    ['y', 'y']
  ]
};

Blockly.Blocks['ArduinoKit_RecognitionInit'] = {
  init: function () {
    this.jsonInit({
      "id": "ArduinoKit_RecognitionExecute",
      "message0": Blockly.Msg.ARDUINOKIT_RECOGNITION_INIT,
      "args0": [],
      "category": Blockly.Categories.arduinokit,
      "tooltip": Blockly.Msg.ARDUINOKIT_RECOGNITION_INIT_TOOLTIP,
      "extensions": ["colours_arduinokit_visual", "shape_statement"]
    });
  }
};

Blockly.Blocks['ArduinoKit_RecognitionExecute'] = {
  init: function () {
    this.jsonInit({
      "id": "ArduinoKit_RecognitionExecute",
      "message0": Blockly.Msg.ARDUINOKIT_RECOGNITION_EXECUTE,
      "args0": [],
      "category": Blockly.Categories.arduinokit,
      "tooltip": Blockly.Msg.ARDUINOKIT_RECOGNITION_EXECUTE_TOOLTIP,
      "extensions": ["colours_arduinokit_visual", "shape_statement"]
    });
  }
};

Blockly.Blocks['ArduinoKit_SetBlockLocation'] = {
  init: function () {
    this.jsonInit({
      "id": "ArduinoKit_SetBlockLocation",
      "message0": Blockly.Msg.ARDUINOKIT_SETBLOCKLOCATION,
      "args0": [{
        "type": "field_dropdown",
        "name": "chosen_color",
        "options": dropdownOptions.ArduinoKit_SetBlockLocation
      },
      {
        "type": "input_value",
        "name": "cord_x"
      },
      {
        "type": "input_value",
        "name": "cord_y"
      },
      {
        "type": "input_value",
        "name": "cord_z"
      },
      {
        "type": "input_value",
        "name": "cord_r"
      }
      ],
      "category": Blockly.Categories.arduinokit,
      "tooltip": Blockly.Msg.ARDUINOKIT_SETBLOCKLOCATION_TOOLTIP,
      "extensions": ["colours_arduinokit_visual", "shape_statement"]
    });
  }
};

Blockly.Blocks['ArduinoKit_DetectBlock'] = {
  init: function () {
    this.jsonInit({
      "id": "ArduinoKit_DetectBlock",
      "message0": Blockly.Msg.ARDUINOKIT_DETECTBLOCK,
      "args0": [{
        "type": "field_dropdown",
        "name": "chosen_color",
        "options": dropdownOptions.ArduinoKit_SetBlockLocation
      }],
      "category": Blockly.Categories.arduinokit,
      "tooltip": Blockly.Msg.ARDUINOKIT_DETECTBLOCK_TOOLTIP,
      "extensions": ["colours_arduinokit_visual", "output_boolean"]
    });
  }
};

Blockly.Blocks['ArduinoKit_CountBlock'] = {
  init: function () {
    this.jsonInit({
      "id": "ArduinoKit_CountBlock",
      "message0": Blockly.Msg.ARDUINOKIT_COUNTBLOCK,
      "args0": [{
        "type": "field_dropdown",
        "name": "chosen_color",
        "options": dropdownOptions.ArduinoKit_SetBlockLocation
      }],
      "category": Blockly.Categories.arduinokit,
      "tooltip": Blockly.Msg.ARDUINOKIT_COUNTBLOCK_TOOLTIP,
      "extensions": ["colours_arduinokit_visual", "output_number"]
    });
  }
};

Blockly.Blocks['ArduinoKit_GetBlock'] = {
  init: function () {
    this.jsonInit({
      "id": "ArduinoKit_GetBlock",
      "message0": Blockly.Msg.ARDUINOKIT_GETBLOCK,
      "args0": [{
        "type": "field_dropdown",
        "name": "chosen_color",
        "options": dropdownOptions.ArduinoKit_SetBlockLocation
      }],
      "category": Blockly.Categories.arduinokit,
      "tooltip": Blockly.Msg.ARDUINOKIT_GETBLOCK_TOOLTIP,
      "extensions": ["colours_arduinokit_visual", "shape_statement"]
    });
  }
};

Blockly.Blocks['ArduinoKit_StuckBlock'] = {
  init: function () {
    this.jsonInit({
      "id": "ArduinoKit_StuckBlock",
      "message0": Blockly.Msg.ARDUINOKIT_STUCKBLOCK,
      "args0": [{
        "type": "field_dropdown",
        "name": "chosen_color",
        "options": dropdownOptions.ArduinoKit_SetBlockLocation
      }],
      "category": Blockly.Categories.arduinokit,
      "tooltip": Blockly.Msg.ARDUINOKIT_STUCKBLOCK_TOOLTIP,
      "extensions": ["colours_arduinokit_visual", "shape_statement"]
    });
  }
};

Blockly.Blocks['ArduinoKit_SetBlockNumber'] = {
  init: function () {
    this.jsonInit({
      "id": "ArduinoKit_SetBlockNumber",
      "message0": Blockly.Msg.ARDUINOKIT_SETBLOCKNUMBER,
      "args0": [{
        "type": "field_dropdown",
        "name": "chosen_color",
        "options": dropdownOptions.ArduinoKit_SetBlockLocation
      },
      {
        "type": "input_value",
        "name": "block_count"
      }
      ],
      "category": Blockly.Categories.arduinokit,
      "tooltip": Blockly.Msg.ARDUINOKIT_SETBLOCKNUMBER_TOOLTIP,
      "extensions": ["colours_arduinokit_visual", "shape_statement"]
    });
  }
};

Blockly.Blocks['ArduinoKit_SpeechRecognizeInit'] = {
  init: function () {
    this.jsonInit({
      "id": "ArduinoKit_SpeechRecognizeInit",
      "message0": Blockly.Msg.ARDUINOKIT_SPEECHRECOGNIZEINIT,
      "args0": [],
      "category": Blockly.Categories.arduinokit,
      "tooltip": Blockly.Msg.ARDUINOKIT_SPEECHRECOGNIZEINIT_TOOLTIP,
      "extensions": ["colours_arduinokit_speech", "shape_statement"]
    });
  }
};

Blockly.Blocks['ArduinoKit_SpeechRecognizeAdd'] = {
  init: function () {
    this.jsonInit({
      "id": "ArduinoKit_SpeechRecognizeAdd",
      "message0": Blockly.Msg.ARDUINOKIT_SPEECHRECOGNIZEADD,
      "args0": [{
        "type": "input_value",
        "name": "detect_phrase"
      },
      {
        "type": "field_dropdown",
        "name": "phrase_number",
        "options": dropdownOptions.ArduinoKit_DetectPhases
      }
      ],
      "category": Blockly.Categories.arduinokit,
      "tooltip": Blockly.Msg.ARDUINOKIT_SPEECHRECOGNIZEADD_TOOLTIP,
      "extensions": ["colours_arduinokit_speech", "shape_statement"]
    });
  }
};

Blockly.Blocks['ArduinoKit_DetectPhases'] = {
  init: function () {
    this.jsonInit({
      "id": "ArduinoKit_DetectPhases",
      "message0": Blockly.Msg.ARDUINOKIT_DETECTPHASES,
      "args0": [{
        "type": "field_dropdown",
        "name": "phrase_number",
        "options": dropdownOptions.ArduinoKit_DetectPhases
      }],
      "category": Blockly.Categories.arduinokit,
      "tooltip": Blockly.Msg.ARDUINOKIT_DETECTPHASES_TOOLTIP,
      "extensions": ["colours_arduinokit_speech", "output_boolean"]
    });
  }
};

Blockly.Blocks['ArduinoKit_CheckButtonState'] = {
  init: function () {
    this.jsonInit({
      "id": "ArduinoKit_CheckButtonState",
      "message0": Blockly.Msg.ARDUINOKIT_CHECKBUTTONSTATE,
      "args0": [{
        "type": "field_dropdown",
        "name": "chosen_color",
        // "options": dropdownOptions.ArduinoKit_CheckButtonState
        "options": [
          [Blockly.Msg.ARDUINO_KIT_CHECK_BUTTON_STATE_R, 'red'],
          [Blockly.Msg.ARDUINO_KIT_CHECK_BUTTON_STATE_G, 'green'],
          [Blockly.Msg.ARDUINO_KIT_CHECK_BUTTON_STATE_B, 'blue']
        ]
      }],
      "category": Blockly.Categories.arduinokit,
      "tooltip": Blockly.Msg.ARDUINOKIT_CHECKBUTTONSTATE_TOOLTIP,
      "extensions": ["colours_arduinokit_joystick", "output_boolean"]
    });
  }
};

Blockly.Blocks['ArduinoKit_TurnLED'] = {
  init: function () {
    this.jsonInit({
      "id": "ArduinoKit_TurnLED",
      "message0": Blockly.Msg.ARDUINOKIT_TURNLED,
      "args0": [{
        "type": "field_dropdown",
        "name": "chosen_color",
        // "options": dropdownOptions.ArduinoKit_CheckButtonState
        "options": [
          [Blockly.Msg.ARDUINO_KIT_CHECK_BUTTON_STATE_R, 'red'],
          [Blockly.Msg.ARDUINO_KIT_CHECK_BUTTON_STATE_G, 'green'],
          [Blockly.Msg.ARDUINO_KIT_CHECK_BUTTON_STATE_B, 'blue']
        ]
      },
      {
        "type": "field_dropdown",
        "name": "switch",
        // "options": dropdownOptions.ArduinoKit_TurnLED
        "options": [
          [Blockly.Msg.ARDUINO_KIT_TURN_LED_ON, 'on'],
          [Blockly.Msg.ARDUINO_KIT_TURN_LED_OFF, 'off']
        ]
      }
      ],
      "category": Blockly.Categories.arduinokit,
      "tooltip": Blockly.Msg.ARDUINOKIT_TURNLED_TOOLTIP,
      "extensions": ["colours_arduinokit_joystick", "shape_statement"]
    });
  }
};

Blockly.Blocks['ArduinoKit_CheckLEDState'] = {
  init: function () {
    this.jsonInit({
      "id": "ArduinoKit_CheckLEDState",
      "message0": Blockly.Msg.ARDUINOKIT_CHECKLEDSTATE,
      "args0": [{
        "type": "field_dropdown",
        "name": "chosen_color",
        // "options": dropdownOptions.ArduinoKit_CheckButtonState
        "options": [
          [Blockly.Msg.ARDUINO_KIT_CHECK_BUTTON_STATE_R, 'red'],
          [Blockly.Msg.ARDUINO_KIT_CHECK_BUTTON_STATE_G, 'green'],
          [Blockly.Msg.ARDUINO_KIT_CHECK_BUTTON_STATE_B, 'blue']
        ]
      }],
      "category": Blockly.Categories.arduinokit,
      "tooltip": Blockly.Msg.ARDUINOKIT_TURNLED_TOOLTIP,
      "extensions": ["colours_arduinokit_joystick", "output_boolean"]
    });
  }
};

Blockly.Blocks['ArduinoKit_ReadJoystickValue'] = {
  init: function () {
    this.jsonInit({
      "id": "ArduinoKit_ReadJoystickValue",
      "message0": Blockly.Msg.ARDUINOKIT_READJOYSTICKVALUE,
      "args0": [{
        "type": "field_dropdown",
        "name": "chosen_xy",
        "options": dropdownOptions.ArduinoKit_ReadJoystickValue
      }],
      "category": Blockly.Categories.arduinokit,
      "tooltip": Blockly.Msg.ARDUINOKIT_READJOYSTICKVALUE_TOOLTIP,
      "extensions": ["colours_arduinokit_joystick", "output_number"]
    });
  }
};

Blockly.Blocks['ArduinoKit_CheckJoystickPressState'] = {
  init: function () {
    this.jsonInit({
      "id": "ArduinoKit_CheckJoystickPressState",
      "message0": Blockly.Msg.ARDUINOKIT_CHECKJOYSTICKPRESSSTATE,
      "args0": [],
      "category": Blockly.Categories.arduinokit,
      "tooltip": Blockly.Msg.ARDUINOKIT_CHECKJOYSTICKPRESSSTATE_TOOLTIP,
      "extensions": ["colours_arduinokit_joystick", "output_boolean"]
    });
  }
};

Blockly.Blocks['ArduinoKit_Init'] = {
  init: function () {
    this.jsonInit({
      "id": "ArduinoKit_Init",
      "message0": Blockly.Msg.ARDUINOKIT_INIT,
      "args0": [],
      "category": Blockly.Categories.arduinokit,
      "tooltip": Blockly.Msg.ARDUINOKIT_INIT_TOOLTIP,
      "extensions": ["colours_magician_setting", "shape_statement"]
    });
  }
};
