import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import React from 'react';
import { defineMessages, intlShape, injectIntl } from 'react-intl';

import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import Input from '../forms/input.jsx';
const BufferedInput = BufferedInputHOC(Input);

import styles from './project-title-input.css';
import { setProjectTitle } from '../../reducers/project-title';
import { setTitleChanged } from '../../reducers/project-state';

const messages = defineMessages({
  projectTitlePlaceholder: {
    id: 'gui.projectTitlePlaceholder',
    description: 'Placeholder for project title when blank',
    defaultMessage: 'Project title here'
  }
});

class ProjectTitleInput extends React.Component {
  componentDidMount() {
    if (!this.props.titleChanged) {
      const i18nDefault = this.props.intl.formatMessage({ id: 'gui.defaultProjectTitle' });
      this.props.onUpdateProjectTitle(i18nDefault);
    }
  }
  render () {
    const value = this.props.titleChanged ? this.props.projectTitle :
      this.props.intl.formatMessage({ id: 'gui.defaultProjectTitle' });
    return (
      <BufferedInput
        className={classNames(styles.titleField, this.props.className)}
        maxLength="100"
        placeholder={this.props.intl.formatMessage(messages.projectTitlePlaceholder)}
        tabIndex="0"
        type="text"
        value={value}
        onSubmit={this.props.onUpdateProjectTitle}
      />
    );
  }
}

ProjectTitleInput.propTypes = {
  className: PropTypes.string,
  intl: intlShape.isRequired,
  projectTitle: PropTypes.string,
  onUpdateProjectTitle: PropTypes.func,
  titleChanged: PropTypes.bool
};

const mapStateToProps = state => ({
  projectTitle: state.scratchGui.projectTitle,
  titleChanged: state.scratchGui.projectState.titleChanged
});


export default injectIntl(connect(
  mapStateToProps,
  null
)(ProjectTitleInput));
