'use strict';


function makeDeviceMsg(Blockly) {

  //Magician
  Blockly.Msg.MAGICIAN_HOME = '%1 Home';
  Blockly.Msg.MAGICIAN_HOME_TOOLTIP = 'Set Home';

  Blockly.Msg.MAGICIAN_SET_END_FIXTURE = '%1 Select End Effector %2';
  Blockly.Msg.MAGICIAN_SET_END_FIXTURE_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_SET_PTP_COMMON_PARAMS = '%1 Set Motion Ratio  Velocity %2 % Acceleration %3 %';
  Blockly.Msg.MAGICIAN_SET_PTP_COMMON_PARAMS_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_SET_PTP_JOINT_PARAMS = '%1 Set Joint Velocity %2 °/s Acceleration %3 °/s^2';
  Blockly.Msg.MAGICIAN_SET_PTP_JOINT_PARAMS_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_SET_PTP_COORDINATE_PARAMS = '%1 Set XYZ Velocity %2 mm/s  Acceleration %4 mm/s^2 \n Set End Effector Velocity %3 °/s Acceleration %5 °/s^2';
  Blockly.Msg.MAGICIAN_SET_PTP_COORDINATE_PARAMS_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_SET_PTPL_PARAMS = '%1 SetPTPL velocity %2 acceleration %3';
  Blockly.Msg.MAGICIAN_SET_PTPL_PARAMS_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_SET_PTP_JUMP_PARAMS = '%1 Set Jump Height %2 mm zLimit %3 mm';
  Blockly.Msg.MAGICIAN_SET_PTP_JUMP_PARAMS_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_SET_LOST_STEP_PARAMS = '%1 Set Lost Step Threshold %2°';
  Blockly.Msg.MAGICIAN_SET_LOST_STEP_PARAMS_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_SET_LOST_STEP = '%1 Set Lost Step';
  Blockly.Msg.MAGICIAN_SET_LOST_STEP_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_JUMP_TO = '%1 Jump To X %2 Y %3 Z %4 R %5';
  Blockly.Msg.MAGICIAN_JUMP_TO_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_GOTO = '%1 Goto X %2 Y %3 Z %4 R %5 Move Type %6';
  Blockly.Msg.MAGICIAN_GOTO_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_MOVE_DISTANCE = '%1 Relative Move △X %2 mm △Y %3 mm △Z %4 mm △R %5 °';
  Blockly.Msg.MAGICIAN_MOVE_DISTANCE_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_SET_R = '%1 Set R%2° Mode%3';
  Blockly.Msg.MAGICIAN_SET_R_TOOLTIP = '';


  Blockly.Msg.MAGICIAN_SET_R_RELATIVE_COORDINATES = 'Relative';
  Blockly.Msg.MAGICIAN_SET_R_ABSOLUTE_COORDINATES = 'Absolute';

  Blockly.Msg.MAGICIAN_CHECK_LOST_STEP = '%1 Check Lost Step';
  Blockly.Msg.MAGICIAN_CHECK_LOST_STEP_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_CLEAR_ALL_ALARMS_STATE = '%1 Clear Alarm';
  Blockly.Msg.MAGICIAN_CLEAR_ALL_ALARMS_STATE_TOOLTIP = 'Clear Alarm';

  Blockly.Msg.MAGICIAN_SET_JOINT_ANGLE = '%1 Move Joints to Joint1 %2 ° Joint2 %3 ° Joint3 %4 ° Joint4 %5 °';
  Blockly.Msg.MAGICIAN_SET_JOINT_ANGLE_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_SET_SUCTION_CUP = '%1 Suction Cup %2';
  Blockly.Msg.MAGICIAN_SET_SUCTION_CUP_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_GRIPPER = '%1 Gripper %2';
  Blockly.Msg.MAGICIAN_GRIPPER_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_SET_IO_MULTIPLEXING = '%1 Set Pin %2 Mode %3';
  Blockly.Msg.MAGICIAN_SET_IO_MULTIPLEXING_TOOLTIP = 'Set Pin Mode';

  Blockly.Msg.MAGICIAN_SET_LEAVE_I_OUTPUT = '%1 Set Analog Output Port %2 Value %3';
  Blockly.Msg.MAGICIAN_SET_LEAVE_I_OUTPUT_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_SET5_V_OUTPUT = '%1 Set digital Output Port %2 Value %3';
  Blockly.Msg.MAGICIAN_SET5_V_OUTPUT_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_SET_PWM_OUTPUT = '%1 Set PWM Output Port %2 Frequency %3  Duty %4 %';
  Blockly.Msg.MAGICIAN_SET_PWM_OUTPUT_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_SET_MOTOR_SPEED = '%1 Set Stepper Motor %2 Speed %3 pulses/s';
  Blockly.Msg.MAGICIAN_SET_MOTOR_SPEED_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_SET_MOTOR_SPEED_AND_DISTANCE = '%1 Set Stepper Motor %2 Speed %3 pulses/s , Number of Pulses %4';
  Blockly.Msg.MAGICIAN_SET_MOTOR_SPEED_AND_DISTANCE_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_SET_LASER = '%1 Laser IsEnable %2 Power %3';
  Blockly.Msg.MAGICIAN_SET_LASER_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_SET_PHOTOELECTRIC_SENSOR = '%1 SetPhotoelectricSensor IsEnable %2 Version %3 port %4';
  Blockly.Msg.MAGICIAN_SET_PHOTOELECTRIC_SENSOR_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_SET_CONVEYOR = '%1 Set Conveyor Motor %2 Speed %3 mm/s';
  Blockly.Msg.MAGICIAN_SET_CONVEYOR_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_GET_CURRENT_COORDINATE = '%1 Get Current Coordinate %2';
  Blockly.Msg.MAGICIAN_GET_CURRENT_COORDINATE_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_GET_JOINT_ANGLE = '%1 Get Current Joint Angle %2';
  Blockly.Msg.MAGICIAN_GET_JOINT_ANGLE_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_GET_IODI = '%1 Get Digital Input Reading %2';
  Blockly.Msg.MAGICIAN_GET_IODI_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_GET_IOADC = '%1 Get Analog Input Reading %2';
  Blockly.Msg.MAGICIAN_GET_IOADC_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_OPTIONS_SET_END_FIXTURE_GRIPPER_AND_SUCTION_CUP = 'Gripper & Suction Cup';
  Blockly.Msg.MAGICIAN_OPTIONS_SET_END_FIXTURE_LASER = 'Laser';
  Blockly.Msg.MAGICIAN_OPTIONS_SET_END_FIXTURE_PEN = 'Pen';

  Blockly.Msg.MAGICIAN_OPTIONS_MAGICIAN_GOTO_STRAIGHT = 'Straight Line';
  Blockly.Msg.MAGICIAN_OPTIONS_MAGICIAN_GOTO_JOINT = 'Joint';

  Blockly.Msg.MAGICIAN_OPTIONS_Magician_HIGH = 'HIGH';
  Blockly.Msg.MAGICIAN_OPTIONS_Magician_LOW = 'LOW';

  Blockly.Msg.MAGICIAN_OPTIONS_Magician_SUCKER_ON = 'ON';
  Blockly.Msg.MAGICIAN_OPTIONS_Magician_SUCKER_OFF = 'OFF';

  Blockly.Msg.MAGICIAN_OPTIONS_MAGICIAN_GRIPPER_GRIP = 'Grip';
  Blockly.Msg.MAGICIAN_OPTIONS_MAGICIAN_GRIPPER_RELEASE = 'Release';
  Blockly.Msg.MAGICIAN_OPTIONS_Magician_GRIPPER_OFF = 'OFF';

  Blockly.Msg.MAGICIAN_OPTIONS_Magician_STEPPER1 = 'STEPPER1';
  Blockly.Msg.MAGICIAN_OPTIONS_Magician_STEPPER2 = 'STEPPER2';

  Blockly.Msg.MAGICIAN_OPTIONS_Magician_V1 = 'V1';
  Blockly.Msg.MAGICIAN_OPTIONS_Magician_V2 = 'V2';

  Blockly.Msg.MAGICIAN_OPTIONS_MAGICIAN_JOINT1 = 'Joint1';
  Blockly.Msg.MAGICIAN_OPTIONS_MAGICIAN_JOINT2 = 'Joint2';
  Blockly.Msg.MAGICIAN_OPTIONS_MAGICIAN_JOINT3 = 'Joint3';
  Blockly.Msg.MAGICIAN_OPTIONS_MAGICIAN_JOINT4 = 'Joint4';

  Blockly.Msg.MAGICIAN_OPTIONS_COLOR_R = 'Red';
  Blockly.Msg.MAGICIAN_OPTIONS_COLOR_G = 'Green';
  Blockly.Msg.MAGICIAN_OPTIONS_COLOR_B = 'Blue';

  Blockly.Msg.MAGICIAN_MULTIPLEXING_MODE_IO_FUNCTION_DUMMY = 'IOFunctionDummy';
  Blockly.Msg.MAGICIAN_MULTIPLEXING_MODE_IO_FUNCTION_DO = 'IOFunctionDO';
  Blockly.Msg.MAGICIAN_MULTIPLEXING_MODE_IO_FUNCTION_PWM = 'IOFunctionPWM';
  Blockly.Msg.MAGICIAN_MULTIPLEXING_MODE_IO_FUNCTION_DI = 'IOFunctionDI';
  Blockly.Msg.MAGICIAN_MULTIPLEXING_MODE_IO_FUNCTION_ADC = 'IOFunctionADC ';
  Blockly.Msg.MAGICIAN_MULTIPLEXING_MODE_IO_FUNCTION_DIPU = 'IOFunctionDIPU ';
  Blockly.Msg.MAGICIAN_MULTIPLEXING_MODE_IO_FUNCTION_DIPD = 'IOFunctionDIPD ';

  //MagicianLite
  Blockly.Msg.MAGICIAN_LITE_HOME = '%1 Home';
  Blockly.Msg.MAGICIAN_LITE_HOME_TOOLTIP = 'Set Home';

  Blockly.Msg.MAGICIAN_LITE_SET_END_FIXTURE = '%1 Select End Effector %2';
  Blockly.Msg.MAGICIAN_LITE_SET_END_FIXTURE_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_SET_PTP_COMMON_PARAMS = '%1 Set Motion Ratio  Velocity %2 % Acceleration %3 %';
  Blockly.Msg.MAGICIAN_LITE_SET_PTP_COMMON_PARAMS_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_SET_PTP_JOINT_PARAMS = '%1 Set Joint Velocity %2 °/s Acceleration %3 °/s^2';
  Blockly.Msg.MAGICIAN_LITE_SET_PTP_JOINT_PARAMS_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_SET_PTP_COORDINATE_PARAMS = '%1 Set XYZ Velocity %2 mm/s  Acceleration %4 mm/s^2 \n Set End Effector Velocity %3 °/s Acceleration %5 °/s^2';
  Blockly.Msg.MAGICIAN_LITE_SET_PTP_COORDINATE_PARAMS_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_SET_PTPL_PARAMS = '%1 SetPTPL velocity %2 acceleration %3';
  Blockly.Msg.MAGICIAN_LITE_SET_PTPL_PARAMS_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_SET_PTP_JUMP_PARAMS = '%1 Set Jump Height %2 mm zLimit %3 mm';
  Blockly.Msg.MAGICIAN_LITE_SET_PTP_JUMP_PARAMS_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_SET_LOST_STEP_PARAMS = '%1 Set Lost Step Threshold %2°';
  Blockly.Msg.MAGICIAN_LITE_SET_LOST_STEP_PARAMS_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_SET_LOST_STEP = '%1 Set Lost Step';
  Blockly.Msg.MAGICIAN_LITE_SET_LOST_STEP_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_JUMP_TO = '%1 Jump To X %2 Y %3 Z %4 R %5';
  Blockly.Msg.MAGICIAN_LITE_JUMP_TO_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_GOTO = '%1 Goto X %2 Y %3 Z %4 R %5 Move Type %6';
  Blockly.Msg.MAGICIAN_LITE_GOTO_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_MOVE_DISTANCE = '%1 Relative Move △X %2 mm △Y %3 mm △Z %4 mm △R %5 °';
  Blockly.Msg.MAGICIAN_LITE_MOVE_DISTANCE_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_SET_R = '%1 Set R%2° Mode%3';
  Blockly.Msg.MAGICIAN_LITE_SET_R_TOOLTIP = '';


  Blockly.Msg.MAGICIAN_LITE_SET_R_RELATIVE_COORDINATES = 'Relative';
  Blockly.Msg.MAGICIAN_LITE_SET_R_ABSOLUTE_COORDINATES = 'Absolute';

  Blockly.Msg.MAGICIAN_LITE_CHECK_LOST_STEP = '%1 Check Lost Step';
  Blockly.Msg.MAGICIAN_LITE_CHECK_LOST_STEP_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_CLEAR_ALL_ALARMS_STATE = '%1 Clear Alarm';
  Blockly.Msg.MAGICIAN_LITE_CLEAR_ALL_ALARMS_STATE_TOOLTIP = 'Clear Alarm';

  Blockly.Msg.MAGICIAN_LITE_SET_JOINT_ANGLE = '%1 Move Joints to Joint1 %2 ° Joint2 %3 ° Joint3 %4 ° Joint4 %5 °';
  Blockly.Msg.MAGICIAN_LITE_SET_JOINT_ANGLE_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_SET_SUCTION_CUP = '%1 Suction Cup %2';
  Blockly.Msg.MAGICIAN_LITE_SET_SUCTION_CUP_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_GRIPPER = '%1 Gripper %2';
  Blockly.Msg.MAGICIAN_LITE_GRIPPER_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_SET_LEAVE_I_OUTPUT = '%1 Set Analog Output Port %2 Value %3';
  Blockly.Msg.MAGICIAN_LITE_SET_LEAVE_I_OUTPUT_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_SET5_V_OUTPUT = '%1 Set digital Output Port %2 Value %3';
  Blockly.Msg.MAGICIAN_LITE_SET5_V_OUTPUT_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_SET_PWM_OUTPUT = '%1 Set PWM Output Port %2 Frequency %3  Duty %4 %';
  Blockly.Msg.MAGICIAN_LITE_SET_PWM_OUTPUT_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_SET_MOTOR_SPEED = '%1 Set Stepper Motor %2 Speed %3 mm/s';
  Blockly.Msg.MAGICIAN_LITE_SET_MOTOR_SPEED_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_SET_MOTOR_SPEED_AND_DISTANCE = '%1 Set Stepper Motor %2 Speed %3 mm/s , Number of mm %4';
  Blockly.Msg.MAGICIAN_LITE_SET_MOTOR_SPEED_AND_DISTANCE_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_SET_LASER = '%1 Laser IsEnable %2 Power %3';
  Blockly.Msg.MAGICIAN_LITE_SET_LASER_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_SET_PHOTOELECTRIC_SENSOR = '%1 SetPhotoelectricSensor IsEnable %2 Version %3 port %4';
  Blockly.Msg.MAGICIAN_LITE_SET_PHOTOELECTRIC_SENSOR_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_SET_CONVEYOR = '%1 Set Conveyor Motor %2 Speed %3 mm/s';
  Blockly.Msg.MAGICIAN_LITE_SET_CONVEYOR_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_GET_CURRENT_COORDINATE = '%1 Get Current Coordinate %2';
  Blockly.Msg.MAGICIAN_LITE_GET_CURRENT_COORDINATE_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_GET_JOINT_ANGLE = '%1 Get Current Joint Angle %2';
  Blockly.Msg.MAGICIAN_LITE_GET_JOINT_ANGLE_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_GET_IODI = '%1 Get Digital Input Reading %2';
  Blockly.Msg.MAGICIAN_LITE_GET_IODI_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_GET_IOADC = '%1 Get Analog Input Reading %2';
  Blockly.Msg.MAGICIAN_LITE_GET_IOADC_TOOLTIP = '';

  Blockly.Msg.MAGICIAN_LITE_OPTIONS_SET_END_FIXTURE_GRIPPER_AND_SUCTION_CUP = 'Gripper & Suction Cup';
  Blockly.Msg.MAGICIAN_LITE_OPTIONS_SET_END_FIXTURE_LASER = 'Laser';
  Blockly.Msg.MAGICIAN_LITE_OPTIONS_SET_END_FIXTURE_PEN = 'Pen';

  Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_GOTO_STRAIGHT = 'Straight Line';
  Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_GOTO_JOINT = 'Joint';

  Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_HIGH = 'HIGH';
  Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_LOW = 'LOW';

  Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_SUCKER_ON = 'ON';
  Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_SUCKER_OFF = 'OFF';

  Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_GRIPPER_GRIP = 'Grip';
  Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_GRIPPER_RELEASE = 'Release';
  Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_GRIPPER_OFF = 'OFF';

  Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_STEPPER1 = 'STEPPER1';
  Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_STEPPER2 = 'STEPPER2';

  Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_V1 = 'V1';
  Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_V2 = 'V2';

  Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_JOINT1 = 'Joint1';
  Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_JOINT2 = 'Joint2';
  Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_JOINT3 = 'Joint3';
  Blockly.Msg.MAGICIAN_LITE_OPTIONS_MAGICIAN_LITE_JOINT4 = 'Joint4';

  Blockly.Msg.MAGICIAN_LITE_OPTIONS_COLOR_R = 'Red';
  Blockly.Msg.MAGICIAN_LITE_OPTIONS_COLOR_G = 'Green';
  Blockly.Msg.MAGICIAN_LITE_OPTIONS_COLOR_B = 'Blue';

  //MobilePlatform

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_MOVMENT = 'Car %1 Speed %2';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_MOVMENT_TOOLTIP = 'Set the MobilePlatform movement state speed<=255';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_MOVMENT_TIME = 'Car %1 Speed %2 Motion Time %3 Second';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_MOVMENT_TIME_TOOLTIP = 'Set the MobilePlatform movement state and duration speed<=255';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_MOTOR = 'Car %1 Motor Speed %2 RPM';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_MOTOR_TOOLTIP = 'Set the speed of mobilePlatform two motors speed<200rpm';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_MOTOR_PI = 'Set Motor KP %1 KI %2';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_MOTOR_PI_TOOLTIP = 'Set Motor PI KP 0.5~2.5 KI 0.05~0.5';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_MOTOR_POSE = 'Get %1 Motor Angle';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_MOTOR_POSE_TOOLTIP = 'Get Motor Pose';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_SONAR = 'Star %1 Sonar';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_SONAR_TOOLTIP = 'Enable Sonar';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_BARRIER = ' %1 Barriers Detected';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_BARRIER_TOOLTIP = 'Get Barriers Detected';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_SONAR = 'Return %1 Sonar Data';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_SONAR_TOOLTIP = 'Return Sonar Distance';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_IR_MODULE_VALUE = 'Return IR %1 Data';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_IR_MODULE_VALUE_TOOLTIP = 'Return IR Value';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_COMPASS = 'Return geomagnetic Angle';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_COMPASS_TOOLTIP = 'Return geomagnetic Angle';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_COMPASS_CALIBRATION = 'Set Calibration';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_COMPASS_CALIBRATION_TOOLTIP = 'Set Calibration';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_COLOR_WB = 'Set %1 Color Senor white balance';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_COLOR_WB_TOOLTIP = 'White balance of sensor data';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_COLOR_SENOR = 'Set %1 Color Senor %2';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_COLOR_SENOR_TOOLTIP = 'Start the color sensor';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_COLOR_SENOR = 'retrun %1 Color Senor %2 Data';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_COLOR_SENOR_TOOLTIP = 'Get the Senor color Value datae';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_DET_COLOR_SENOR = 'Detected %1 Color Senor %2 Data';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_DET_COLOR_SENOR_TOOLTIP = 'Detected the Senor color Value datae';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_KEY_INIT = 'Set Key Init';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_KEY_INIT_TOOLTIP = 'Set Key Init';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_KEY_VALUE = 'Return Button %1 State';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_KEY_VALUE_TOOLTIP = 'Get button status';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_LED = 'Set LED %1 State %2';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_LED_TOOLTIP = 'Set LED status';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_SONAR_THRESHOLD = 'Set Sonar Threshold %1';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_SONAR_THRESHOLD_TOOLTIP = 'Set Sonar Threshold';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_INIT = 'Mobile Platfrom Init';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_INIT_TOOLTIP = 'Mobile Platfrom Init';

  Blockly.Msg.MOBILE_PLATFORM_SET_DEVIATION = 'Set Deviation (IR1+%1)×%2+(IR2+%3)×%4+(IR3+%5)×%6+(IR4+%7)×%8+(IR5+%9)×%10+(IR6+%11)×%12';
  Blockly.Msg.MOBILE_PLATFORM_SET_DEVIATION_TOOLTIP = 'Set Deviation of IR';

  Blockly.Msg.MOBILE_PLATFORM_GET_DEVIATION = 'Get Deciation';
  Blockly.Msg.MOBILE_PLATFORM_GET_DEVIATION_TOOLTIP = 'Get Deviation of IR';

  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_DEVIATION_SET_DEVIATION = 'Set Deviation IR1×%1+IR2×%2+IR3×%3+IR4×%4+IR5×%5+IR6×%6';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_DEVIATION_SET_DEVIATION_TOOLTIP = 'Set Deviation of IR';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_DEVIATION = 'Get Deciation';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_DEVIATION_TOOLTIP = 'Get Deviation of IR';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_PID_LOCATION = 'Get PID-Processed Deviation';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_GET_PID_LOCATION_TOOLTIP = 'Get PID-Processed Deviation';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_LOCATION_PID = 'Set Line Follower PID KP %1 KI %2 KD %3 Accumulated Error Limit %4';
  Blockly.Msg.MOBILE_PLATFORM_SMART_BOT_SET_LOCATION_PID_TOOLTIP = 'Set Line Follower PID';


  Blockly.Msg.MOBILE_PLATFORM_OPTIONS_LED_STATES_ON = 'ON';
  Blockly.Msg.MOBILE_PLATFORM_OPTIONS_LED_STATES_OFF = 'OFF';
  Blockly.Msg.MOBILE_PLATFORM_OPTIONS_LED_STATES_BLINK = 'BLINK';
  Blockly.Msg.MOBILE_PLATFORM_OPTIONS_DIR_FRONT = 'Ahead';
  Blockly.Msg.MOBILE_PLATFORM_OPTIONS_DIR_BACK = 'Back';
  Blockly.Msg.MOBILE_PLATFORM_OPTIONS_DIR_RIGHT = 'Turn Right';
  Blockly.Msg.MOBILE_PLATFORM_OPTIONS_DIR_LEFT = 'Turn Left';
  Blockly.Msg.MOBILE_PLATFORM_OPTIONS_MOTOR_RIGHT = 'Right';
  Blockly.Msg.MOBILE_PLATFORM_OPTIONS_MOTOR_LEFT = 'Left';
  Blockly.Msg.MOBILE_PLATFORM_OPTIONS_SONAR_RF = 'Right Front';
  Blockly.Msg.MOBILE_PLATFORM_OPTIONS_SONAR_F = 'Front';
  Blockly.Msg.MOBILE_PLATFORM_OPTIONS_SONAR_LF = 'Left Front';
  Blockly.Msg.MOBILE_PLATFORM_OPTIONS_COLORSENOR_RIGHT = 'Right';
  Blockly.Msg.MOBILE_PLATFORM_OPTIONS_COLORSENOR_LEFT = 'Left';
  Blockly.Msg.MOBILE_PLATFORM_OPTIONS_COLOR_SENOR_R = 'Red';
  Blockly.Msg.MOBILE_PLATFORM_OPTIONS_COLOR_SENOR_G = 'Green';
  Blockly.Msg.MOBILE_PLATFORM_OPTIONS_COLOR_SENOR_B = 'Blue';

  //AIStarter
  Blockly.Msg.AI_STARTER_SMART_BOT_SET_MOVMENT = 'Car %1 Speed %2';
  Blockly.Msg.AI_STARTER_SMART_BOT_SET_MOVMENT_TOOLTIP = 'Set the AIStarter movement state speed<=255';

  Blockly.Msg.AI_STARTER_SMART_BOT_SET_MOVMENT_TIME = 'Car %1 Speed %2 Motion Time %3 Second';
  Blockly.Msg.AI_STARTER_SMART_BOT_SET_MOVMENT_TIME_TOOLTIP = 'Set the AIStarter movement state and duration speed<=255';

  Blockly.Msg.AI_STARTER_SMART_BOT_SET_MOTOR = 'Car %1 Motor Speed %2 RPM';
  Blockly.Msg.AI_STARTER_SMART_BOT_SET_MOTOR_TOOLTIP = 'Set the speed of AIStarter two motors speed<200rpm';

  Blockly.Msg.AI_STARTER_SMART_BOT_SET_MOTOR_PI = 'Set Motor PID KP %1 KI %2';
  Blockly.Msg.AI_STARTER_SMART_BOT_SET_MOTOR_PI_TOOLTIP = 'Set Motor PI KP 0.5~2.5 KI 0.05~0.5';

  Blockly.Msg.AI_STARTER_SMART_BOT_GET_MOTOR_POSE = 'Get Motor Pose Port %1';
  Blockly.Msg.AI_STARTER_SMART_BOT_GET_MOTOR_POSE_TOOLTIP = 'Get Motor Pose';

  Blockly.Msg.AI_STARTER_SMART_BOT_SET_SONAR = 'Star %1 Sonar';
  Blockly.Msg.AI_STARTER_SMART_BOT_SET_SONAR_TOOLTIP = 'Enable Sonar';

  Blockly.Msg.AI_STARTER_SMART_BOT_GET_BARRIER = ' %1 Barriers Detected';
  Blockly.Msg.AI_STARTER_SMART_BOT_GET_BARRIER_TOOLTIP = 'Get Barriers Detected';

  Blockly.Msg.AI_STARTER_SMART_BOT_GET_SONAR = 'Return %1 Sonar Data';
  Blockly.Msg.AI_STARTER_SMART_BOT_GET_SONAR_TOOLTIP = 'Return Sonar Distance';

  Blockly.Msg.AI_STARTER_SMART_BOT_GET_IR_MODULE_VALUE = 'Return IR %1 Data';
  Blockly.Msg.AI_STARTER_SMART_BOT_GET_IR_MODULE_VALUE_TOOLTIP = 'Return IR Value';

  Blockly.Msg.AI_STARTER_SMART_BOT_GET_COMPASS = 'Return geomagnetic Angle';
  Blockly.Msg.AI_STARTER_SMART_BOT_GET_COMPASS_TOOLTIP = 'Return geomagnetic Angle';

  Blockly.Msg.AI_STARTER_SMART_BOT_SET_COMPASS_CALIBRATION = 'Set Calibration';
  Blockly.Msg.AI_STARTER_SMART_BOT_SET_COMPASS_CALIBRATION_TOOLTIP = 'Set Calibration';

  Blockly.Msg.AI_STARTER_SMART_BOT_SET_COLOR_WB = 'Set %1 Color Senor White Balance';
  Blockly.Msg.AI_STARTER_SMART_BOT_SET_COLOR_WB_TOOLTIP = 'White balance of sensor data';

  Blockly.Msg.AI_STARTER_SMART_BOT_SET_COLOR_SENOR = 'Set %1 Color Senor %2';
  Blockly.Msg.AI_STARTER_SMART_BOT_SET_COLOR_SENOR_TOOLTIP = 'Start the color sensor';

  Blockly.Msg.AI_STARTER_SMART_BOT_GET_COLOR_SENOR = 'retrun %1 Color Senor %2 Data';
  Blockly.Msg.AI_STARTER_SMART_BOT_GET_COLOR_SENOR_TOOLTIP = 'Get the Senor color Value data';

  Blockly.Msg.AI_STARTER_SMART_BOT_DET_COLOR_SENOR = 'Detected %1 Color Senor %2 Data';
  Blockly.Msg.AI_STARTER_SMART_BOT_DET_COLOR_SENOR_TOOLTIP = 'Detected the Senor color Value data';

  Blockly.Msg.AI_STARTER_SMART_BOT_SET_KEY_INIT = 'Set Key Init';
  Blockly.Msg.AI_STARTER_SMART_BOT_SET_KEY_INIT_TOOLTIP = 'Set Key Init';

  Blockly.Msg.AI_STARTER_SMART_BOT_GET_KEY_VALUE = 'Return Button %1 Data';
  Blockly.Msg.AI_STARTER_SMART_BOT_GET_KEY_VALUE_TOOLTIP = 'Get button status';

  Blockly.Msg.AI_STARTER_SMART_BOT_SET_LED = 'Set LED %1 State %2';
  Blockly.Msg.AI_STARTER_SMART_BOT_SET_LED_TOOLTIP = 'Set LED status';

  Blockly.Msg.AI_STARTER_SMART_BOT_SET_SONAR_THRESHOLD = 'Set Sonar Threshold Distance %1';
  Blockly.Msg.AI_STARTER_SMART_BOT_SET_SONAR_THRESHOLD_TOOLTIP = 'Set Sonar Threshold';

  Blockly.Msg.AI_STARTER_SMART_BOT_INIT = 'Smartbot Init';
  Blockly.Msg.AI_STARTER_SMART_BOT_INIT_TOOLTIP = '';

  Blockly.Msg.AI_STARTER_SMART_BOT_GET_LIGHT_ANALOG = 'Get Photoresistance Value';
  Blockly.Msg.AI_STARTER_SMART_BOT_GET_LIGHT_ANALOG_TOOLTIP = '';

  Blockly.Msg.AI_STARTER_SMART_BOT_SERVOATTACH = 'Attach Servo %1';
  Blockly.Msg.AI_STARTER_SMART_BOT_SERVOATTACH_TOOLTIP = '';

  Blockly.Msg.AI_STARTER_SMART_BOT_SERVO_WRITE = 'Set Servo %1 Angle %2';
  Blockly.Msg.AI_STARTER_SMART_BOT_SERVO_WRITE_TOOLTIP = '';

  Blockly.Msg.AI_STARTER_SMART_BOT_SERVO_DETACH = 'Detach Servo %1';
  Blockly.Msg.AI_STARTER_SMART_BOT_SERVO_DETACH_TOOLTIP = '';

  Blockly.Msg.AI_STARTER_SMART_BOT_TIMER_TASK_ATTACH = 'Start Timer';
  Blockly.Msg.AI_STARTER_SMART_BOT_TIMER_TASK_ATTACH_TOOLTIP = '';

  Blockly.Msg.AI_STARTER_SMART_BOT_TIMER_TASK_DETACH = 'Stop Timer';
  Blockly.Msg.AI_STARTER_SMART_BOT_TIMER_TASK_DETACH_TOOLTIP = '';

  Blockly.Msg.AI_STARTER_SMART_BOT_XBEE_READ = 'Xbee read data';
  Blockly.Msg.AI_STARTER_SMART_BOT_XBEE_READ_TOOLTIP = '';

  Blockly.Msg.AI_STARTER_SMART_BOT_XBEE_WRITE = 'Xbee Send %1';
  Blockly.Msg.AI_STARTER_SMART_BOT_XBEE_WRITE_TOOLTIP = '';

  Blockly.Msg.AI_STARTER_SMART_BOT_XBEE_COMPARE = 'Xbee %1 compare Xbee %2';
  Blockly.Msg.AI_STARTER_SMART_BOT_XBEE_COMPARE_TOOLTIP = '';

  Blockly.Msg.AI_STARTER_SMART_BOT_XBEE_CLEAR = 'Xbee Clear';
  Blockly.Msg.AI_STARTER_SMART_BOT_XBEE_CLEAR_TOOLTIP = '';
  Blockly.Msg.AI_STARTER_SMART_BOT_SET_DEVIATION_SET_DEVIATION = 'Set Deviation IR1×%1+IR2×%2+IR3×%3+IR4×%4+IR5×%5+IR6×%6';
  Blockly.Msg.AI_STARTER_SMART_BOT_SET_DEVIATION_SET_DEVIATION_TOOLTIP = 'Set Deviation of IR';
  Blockly.Msg.AI_STARTER_SMART_BOT_GET_DEVIATION = 'Get Deciation';
  Blockly.Msg.AI_STARTER_SMART_BOT_GET_DEVIATION_TOOLTIP = 'Get Deviation of IR';
  Blockly.Msg.AI_STARTER_SMART_BOT_GET_PID_LOCATION = 'Get PID-Processed Deviation';
  Blockly.Msg.AI_STARTER_SMART_BOT_GET_PID_LOCATION_TOOLTIP = 'Get PID-Processed Deviation';
  Blockly.Msg.AI_STARTER_SMART_BOT_SET_LOCATION_PID = 'Set Line Follower PID KP %1 KI %2 KD %3 Accumulated Error Limit %4';
  Blockly.Msg.AI_STARTER_SMART_BOT_SET_LOCATION_PID_TOOLTIP = 'Set Line Follower PID';
  Blockly.Msg.AI_STARTER_SMART_BOT_OPTIONS_LED_STATES_ON = 'ON';
  Blockly.Msg.AI_STARTER_SMART_BOT_OPTIONS_LED_STATES_OFF = 'OFF';
  Blockly.Msg.AI_STARTER_SMART_BOT_OPTIONS_LED_STATES_BLINK = 'BLINK';
  Blockly.Msg.AI_STARTER_SMART_BOT_OPTIONS_DIR_FRONT = 'Front';
  Blockly.Msg.AI_STARTER_SMART_BOT_OPTIONS_DIR_BACK = 'Back';
  Blockly.Msg.AI_STARTER_SMART_BOT_OPTIONS_DIR_RIGHT = 'Right';
  Blockly.Msg.AI_STARTER_SMART_BOT_OPTIONS_DIR_LEFT = 'Left';
  Blockly.Msg.AI_STARTER_SMART_BOT_OPTIONS_MOTOR_RIGHT = 'Right';
  Blockly.Msg.AI_STARTER_SMART_BOT_OPTIONS_MOTOR_LEFT = 'Left';
  Blockly.Msg.AI_STARTER_SMART_BOT_OPTIONS_SONAR_RF = 'RightFront';
  Blockly.Msg.AI_STARTER_SMART_BOT_OPTIONS_SONAR_F = 'Front';
  Blockly.Msg.AI_STARTER_SMART_BOT_OPTIONS_SONAR_LF = 'LeftFront';
  Blockly.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLORSENOR_RIGHT = 'Right';
  Blockly.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLORSENOR_LEFT = 'Left';
  Blockly.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLORSENOR_R = 'Right';
  Blockly.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLORSENOR_L = 'Left';
  Blockly.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLOR_SENOR_R = 'Red';
  Blockly.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLOR_SENOR_G = 'Green';
  Blockly.Msg.AI_STARTER_SMART_BOT_OPTIONS_COLOR_SENOR_B = 'Blue';


  // ArduinoKit
  Blockly.Msg.ARDUINOKIT_RECOGNITION_INIT = 'Init Visual Recognition';
  Blockly.Msg.ARDUINOKIT_RECOGNITION_INIT_TOOLTIP = 'To Init Visual Recognition';
  Blockly.Msg.ARDUINOKIT_RECOGNITION_EXECUTE = 'Perform Visual Recognition';
  Blockly.Msg.ARDUINOKIT_RECOGNITION_EXECUTE_TOOLTIP = 'To Perform Visual Recognition';
  Blockly.Msg.ARDUINOKIT_SETBLOCKLOCATION = 'Set %1 Block Stacking Location X %2 Y %3 Z %4 R %5';
  Blockly.Msg.ARDUINOKIT_SETBLOCKLOCATION_TOOLTIP = 'To set colord block position';
  Blockly.Msg.ARDUINOKIT_DETECTBLOCK = 'Detect %1 Block';
  Blockly.Msg.ARDUINOKIT_DETECTBLOCK_TOOLTIP = 'Return camera catched chosen color block or not';
  Blockly.Msg.ARDUINOKIT_COUNTBLOCK = 'Count %1 Block';
  Blockly.Msg.ARDUINOKIT_COUNTBLOCK_TOOLTIP = 'Return camera catched blocks number of chosen color';
  Blockly.Msg.ARDUINOKIT_GETBLOCK = 'Get %1 Block';
  Blockly.Msg.ARDUINOKIT_GETBLOCK_TOOLTIP = 'To get block automatically';
  Blockly.Msg.ARDUINOKIT_STUCKBLOCK = 'Stack Block to %1 Area';
  Blockly.Msg.ARDUINOKIT_STUCKBLOCK_TOOLTIP = 'To put stuck block at chosen color\'s place';
  Blockly.Msg.ARDUINOKIT_SETBLOCKNUMBER = 'Set %1 Stacked Blocks Number to %2';
  Blockly.Msg.ARDUINOKIT_SETBLOCKNUMBER_TOOLTIP = 'To reset stack block number';
  Blockly.Msg.ARDUINOKIT_SPEECHRECOGNIZEINIT = 'Speech Recognition Init';
  Blockly.Msg.ARDUINOKIT_SPEECHRECOGNIZEINIT_TOOLTIP = 'Speech Recognition Init';
  Blockly.Msg.ARDUINO_KIT_CHECK_BUTTON_STATE_R = 'Red';
  Blockly.Msg.ARDUINO_KIT_CHECK_BUTTON_STATE_G = 'Green';
  Blockly.Msg.ARDUINO_KIT_CHECK_BUTTON_STATE_B = 'Blue';
  Blockly.Msg.ARDUINO_KIT_CHECK_BUTTON_STATE_Y = 'Yellow';
  Blockly.Msg.ARDUINO_KIT_TURN_LED_ON = 'ON';
  Blockly.Msg.ARDUINO_KIT_TURN_LED_OFF = 'OFF';
  // eslint-disable-next-line no-useless-escape
  Blockly.Msg.ARDUINOKIT_SPEECHRECOGNIZEADD = 'Add Speech Recognition " %1 " to Phrase %2';
  Blockly.Msg.ARDUINOKIT_SPEECHRECOGNIZEADD_TOOLTIP = 'Add Phrase to be recognized';
  Blockly.Msg.ARDUINOKIT_DETECTPHASES = 'Detect Phrases %1';
  Blockly.Msg.ARDUINOKIT_DETECTPHASES_TOOLTIP = 'Detect Phrases';
  Blockly.Msg.ARDUINOKIT_CHECKBUTTONSTATE = 'Check %1 Button State';
  Blockly.Msg.ARDUINOKIT_CHECKBUTTONSTATE_TOOLTIP = 'Check color button state';
  Blockly.Msg.ARDUINOKIT_READJOYSTICKVALUE = 'Read Joystick %1 Value';
  Blockly.Msg.ARDUINOKIT_READJOYSTICKVALUE_TOOLTIP = 'To Read Joystick Value';
  Blockly.Msg.ARDUINOKIT_CHECKJOYSTICKPRESSSTATE = 'Check Joystick Press State';
  Blockly.Msg.ARDUINOKIT_CHECKJOYSTICKPRESSSTATE_TOOLTIP = 'To Check Joystick Press State';
  Blockly.Msg.ARDUINOKIT_TURNLED = 'Turn %1 LED %2';
  Blockly.Msg.ARDUINOKIT_TURNLED_TOOLTIP = 'To Turn chosen color LED on/off';
  Blockly.Msg.ARDUINOKIT_CHECKLEDSTATE = 'Check %1 LED State';
  Blockly.Msg.ARDUINOKIT_INIT = 'SmartKit Init';
  Blockly.Msg.ARDUINOKIT_CHECKLEDSTATE_TOOLTIP = 'To Check chosen LED state';
  Blockly.Msg.ArduinoKit_Visual_ImportVisualData = 'Import Initialization Data';
  Blockly.Msg.ArduinoKit_Visual_SaveVisualData = 'Save Current Initialization Data';

  //Controller

  Blockly.Msg.CONTROLLER_OUT_ANALOG_SIGNAL = 'Analog Output Pin %1 Value %2';
  Blockly.Msg.CONTROLLER_OUT_ANALOG_SIGNAL_TOOLTIP = 'Analog Output PinValue';
  Blockly.Msg.CONTROLLER_OUT_DIGITAL_SIGNAL = 'Digital Output Pin %1 Level %2';
  Blockly.Msg.CONTROLLER_OUT_DIGITAL_SIGNAL_TOOLTIP = 'Digital Output Pin Level';
  Blockly.Msg.CONTROLLER_SET_PIN = 'Set Pin %1 Mode %2';
  Blockly.Msg.CONTROLLER_SET_PIN_TOOLTIP = 'Set Pin';
  Blockly.Msg.CONTROLLER_SET_PWM = 'Set PWM Output Pin %1 frequency %2 Duty Cycle %3 %';
  Blockly.Msg.CONTROLLER_SET_PWM_TOOLTIP = 'Set PWM Output';
  Blockly.Msg.CONTROLLER_READ_DIGIGTAL = 'Digital Read Pin %1';
  Blockly.Msg.CONTROLLER_READ_DIGIGTAL_TOOLTIP = 'Digital Read';
  Blockly.Msg.CONTROLLER_READ_ANALOG = 'Analog Read Pin A %1';
  Blockly.Msg.CONTROLLER_READ_ANALOG_TOOLTIP = 'Analog Read';
  Blockly.Msg.CONTROLLER_SET_SERVO = 'Set Servo Pin %1 Angle %2°';
  Blockly.Msg.CONTROLLER_SET_SERVO_TOOLTIP = 'Set Servo';
  Blockly.Msg.CONTROLLER_SET_STEPPER = 'Set Stepper Motor %1 Speed %2 pulses/s';
  Blockly.Msg.CONTROLLER_SET_STEPPER_TOOLTIP = 'Set Stepper Motor';
  Blockly.Msg.CONTROLLER_SET_STEPPER_NUM = 'Set Stepper Motor %1 Speed %2 pulses/s , Number of Pulses %3';
  Blockly.Msg.CONTROLLER_SET_STEPPER_NUM_TOOLTIP = 'Set Stepper Motor';
  Blockly.Msg.CONTROLLER_SET_CONVEYOR = 'Set Conveyor Motor %1 Speed %2 mm/s';
  Blockly.Msg.CONTROLLER_SET_CONVEYOR_TOOLTIP = 'Set Conveyor Motor';

  Blockly.Msg.CONTROLLER_OPTIONS_Magician_HIGH = 'HIGH';
  Blockly.Msg.CONTROLLER_OPTIONS_Magician_LOW = 'LOW';

  Blockly.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_DUMMY = 'IOFunctionDummy';
  Blockly.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_DO = 'IOFunctionDO';
  Blockly.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_PWM = 'IOFunctionPWM';
  Blockly.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_DI = 'IOFunctionDI';
  Blockly.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_ADC = 'IOFunctionADC ';
  Blockly.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_DIPU = 'IOFunctionDIPU ';
  Blockly.Msg.CONTROLLER_MULTIPLEXING_MODE_IO_FUNCTION_DIPD = 'IOFunctionDIPD ';





  // 积木类别标签
  Blockly.Msg.CATEGORY_MAGICIAN = 'Magician';
  Blockly.Msg.CATEGORY_MAGICIAN_SETTING = 'Setting';
  Blockly.Msg.CATEGORY_MAGICIAN_MOTION = 'Motion';
  Blockly.Msg.CATEGORY_MAGICIAN_STATUS = 'Status';
  Blockly.Msg.CATEGORY_MAGICIAN_IO = 'I/O';
  Blockly.Msg.CATEGORY_MAGICIAN_LITE = 'Magician';
  Blockly.Msg.CATEGORY_MAGICIAN_LITE_SETTING = 'Setting';
  Blockly.Msg.CATEGORY_MAGICIAN_LITE_MOTION = 'Motion';
  Blockly.Msg.CATEGORY_MAGICIAN_LITE_STATUS = 'Status';
  Blockly.Msg.CATEGORY_MAGICIAN_LITE_IO = 'I/O';
  Blockly.Msg.CATEGORY_AISTARTER = 'AIStarter';
  Blockly.Msg.CATEGORY_MOBILEPLATFORM = 'Mobile Platform';
  Blockly.Msg.CATEGORY_AISTARTER_MOTION = 'Motion';
  Blockly.Msg.CATEGORY_AISTARTER_SENSOR = 'Sensor';
  Blockly.Msg.CATEGORY_AISTARTER_OTHER = 'Xbee';
  Blockly.Msg.CATEGORY_MOBILEPLATFORM_SENSOR = 'Sensor';
  Blockly.Msg.CATEGORY_VISUAL_SORTING = 'Visual Sort';
  Blockly.Msg.CATEGORY_SPEECH_RECOGNIZE = 'Speech Recognize';
  Blockly.Msg.CATEGORY_JOYSTICK = 'Joystick';
  Blockly.Msg.CATEGORY_CONTROLLER = 'Magic Box';
  Blockly.Msg.CATEGORY_CALIBRATION = 'Calibration';


  // 保证换行
  Blockly.Msg.CATEGORY_MOBILEPLATFORM = `Mobile
  Platform`;

  Blockly.Msg.Arduino_Serial_Operation = 'Serial Operation';
  Blockly.Msg.Arduino_IO_Operation = 'I/O Operation';
  Blockly.Msg.ArduinoKit_Visual_InitVisualSort = 'Init Visual Sort';


}

module.exports = makeDeviceMsg;
