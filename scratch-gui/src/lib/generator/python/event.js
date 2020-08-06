// import * as Blockly from 'scratch-blocks';

Blockly.Python.event_whenflagclicked = function() {
  return '#scratch.start\n';
};

Blockly.Python.event_whenkeypressed = function(block) {
  const key = block.getFieldValue('KEY_OPTION');
  return `#scratch.${key}\n`;
};

Blockly.Python.event_whenbroadcastreceived = function(block) {
  return `#scratch.received(message)\n`;
};

Blockly.Python.event_broadcast = function(block) {
  return `#scratch.broadcast(message)\n`;
};

Blockly.Python.event_broadcastandwait = function(block) {
  return `#scratch.broadcast(message) and wait\n`;
};
