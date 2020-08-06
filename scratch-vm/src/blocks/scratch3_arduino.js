const Cast = require('../util/cast');
const Timer = require('../util/timer');

class Scratch3Arduino {
  /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     */
  getPrimitives () {
    return {
      arduino_analog_in_option: this.analog_in_option,
      arduino_pwm_option: this.pwm_option,
      arduino_pin_mode_option: this.pin_mode_option,
      arduino_level_option: this.level_option,
      arduino_digital_write: this.digital_write,
      arduino_pwm_write: this.pwm_write,
      arduino_digital_read: this.digital_read,
      arduino_pin_mode: this.pin_mode,
      arduino_pin_value: this.pin_value,
      arduino_analog_read: this.analog_read,
      arduino_tone: this.tone,
      arduino_map: this.map,
      arduino_servo: this.servo,
      arduino_pulsein: this.pulsein,
      arduino_println: this.println
    };
  }

  analog_in_option(){}
  pwm_option(){}
  pin_mode_option(){}
  level_option(){}
  digital_write(){}
  pwm_write(){}
  digital_read(){}
  pin_mode(){}
  pin_value(){}
  analog_read(){}
  tone(){}
  map(){}
  servo(){}
  pulsein(){}
  println(){}
}

module.exports = Scratch3Arduino;
