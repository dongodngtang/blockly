import classNames from 'classnames';
import { defineMessages, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import { Select } from 'antd';
const { Option } = Select;

import styles from './prompt.css';


const messages = defineMessages({
  forAllSpritesMessage: {
    defaultMessage: 'For all sprites',
    description: 'Option message when creating a variable for making it available to all sprites',
    id: 'gui.variableScopeOptionAllSprites'
  },
  forThisSpriteMessage: {
    defaultMessage: 'For this sprite only',
    description: 'Option message when creating a varaible for making it only available to the current sprite',
    id: 'gui.variableScopeOptionSpriteOnly'
  },
  cloudVarOptionMessage: {
    defaultMessage: 'Cloud variable (stored on server)',
    description: 'Option message when creating a variable for making it a cloud variable, a variable that is stored on the server', /* eslint-disable-line max-len */
    id: 'gui.cloudVariableOption'
  },
  availableToAllSpritesMessage: {
    defaultMessage: 'This variable will be available to all sprites.',
    description: 'A message that displays in a variable modal when the stage is selected indicating ' +
            'that the variable being created will available to all sprites.',
    id: 'gui.variablePromptAllSpritesMessage'
  },
  type: {
    defaultMessage: 'type',
    id: 'gui.aistarter.prompt.type'
  },
  int: {
    defaultMessage: 'int',
    id: 'gui.aistarter.prompt.int'
  },
  string: {
    defaultMessage: 'string',
    id: 'gui.aistarter.prompt.string'
  },
  char: {
    defaultMessage: 'char',
    id: 'gui.aistarter.prompt.char'
  },
  unsignedChar: {
    defaultMessage: 'unsigned char',
    id: 'gui.aistarter.prompt.unsignedChar'
  },
  unsignedInt: {
    defaultMessage: 'unsigned int',
    id: 'gui.aistarter.prompt.unsignedInt'
  },
  long: {
    defaultMessage: 'long',
    id: 'gui.aistarter.prompt.long'
  },
  unsignedLong: {
    defaultMessage: 'unsigned long',
    id: 'gui.aistarter.prompt.unsignedLong'
  },
  float: {
    defaultMessage: 'float',
    id: 'gui.aistarter.prompt.float'
  },
  double: {
    defaultMessage: 'char',
    id: 'gui.aistarter.prompt.double'
  },
  boolean: {
    defaultMessage: 'char',
    id: 'gui.aistarter.prompt.boolean'
  }
});

const PromptComponent = props => (
  <Modal
    className={styles.modalContent}
    contentLabel={props.title}
    id={props.title}
    onRequestClose={props.onCancel}
  >
    <Box className={styles.body}>
      <Box className={styles.label}>
        {props.label}
      </Box>
      <Box>
        <input
          autoFocus
          className={styles.variableNameTextInput}
          defaultValue={props.defaultValue}
          name={props.label}
          onChange={props.onChange}
          onFocus={props.onFocus}
          onKeyPress={props.onKeyPress}
        />
      </Box>
      {props.showVariableOptions ?
        <div>
          {props.isStage ?
            <div className={styles.infoMessage}>
              <FormattedMessage
                {...messages.availableToAllSpritesMessage}
              />
            </div> :
            window.deviceName === 'aistarter' ? (<div className={styles.selectContent}>
              <span style={{ margin: '0 10px 0 0 ' }}>
                <FormattedMessage
                  {...messages.type}
                /> {'：'}
              </span>
              <Select
                defaultValue="int"
                style={{ width: 200 }}
                onChange={props.handleSelectChange}
              >
                <Option value="int">
                  <FormattedMessage
                    {...messages.int}
                  />
                </Option>
                <Option value="String">
                  <FormattedMessage
                    {...messages.string}
                  />
                </Option>
                <Option value="char">
                  <FormattedMessage
                    {...messages.char}
                  />
                </Option>
                <Option value="unsigned char">
                  <FormattedMessage
                    {...messages.unsignedChar}
                  />
                </Option>
                <Option value="unsigned int">
                  <FormattedMessage
                    {...messages.unsignedInt}
                  />
                </Option>
                <Option value="long">
                  <FormattedMessage
                    {...messages.long}
                  />
                </Option>
                <Option value="unsigned long">
                  <FormattedMessage
                    {...messages.unsignedLong}
                  />
                </Option>
                <Option value="float">
                  <FormattedMessage
                    {...messages.float}
                  />
                </Option>
                <Option value="double">
                  <FormattedMessage
                    {...messages.double}
                  />
                </Option>
                <Option value="boolean">
                  <FormattedMessage
                    {...messages.boolean}
                  />
                </Option>
                <Option value="uint8_t">{'uint8_t'}</Option>
                <Option value="uint16_t">{'uint16_t'}</Option>
                <Option value="uint32_t">{'uint32_t'}</Option>
              </Select>
            </div>) : null
          }
          {props.showCloudOption ?
            <Box className={classNames(styles.cloudOption)}>
              <label
                className={classNames({ [styles.disabledLabel]: !props.canAddCloudVariable })}
              >
                <input
                  checked={props.cloudSelected && props.canAddCloudVariable}
                  disabled={!props.canAddCloudVariable}
                  type="checkbox"
                  onChange={props.onCloudVarOptionChange}
                />
                <FormattedMessage
                  {...messages.cloudVarOptionMessage}
                />
              </label>
            </Box> : null}
        </div> : null}
  
      <Box className={styles.buttonRow}>
        <button
          className={styles.cancelButton}
          onClick={props.onCancel}
        >
          <FormattedMessage
            defaultMessage="Cancel"
            description="Button in prompt for cancelling the dialog"
            id="gui.prompt.cancel"
          />
        </button>
        <button
          className={styles.okButton}
          onClick={props.onOk}
        >
          <FormattedMessage
            defaultMessage="OK"
            description="Button in prompt for confirming the dialog"
            id="gui.prompt.ok"
          />
        </button>
      </Box>
    </Box>
  </Modal>
);

PromptComponent.propTypes = {
  canAddCloudVariable: PropTypes.bool.isRequired,
  cloudSelected: PropTypes.bool.isRequired,
  defaultValue: PropTypes.string,
  globalSelected: PropTypes.bool.isRequired,
  isStage: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onCloudVarOptionChange: PropTypes.func,
  onFocus: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  onScopeOptionSelection: PropTypes.func.isRequired,
  showCloudOption: PropTypes.bool.isRequired,
  showVariableOptions: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleSelectChange: PropTypes.func
};

export default PromptComponent;
