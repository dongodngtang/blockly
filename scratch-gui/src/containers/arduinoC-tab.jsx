import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';

import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
const ArduinoBrowse = React.lazy(() => import('../components/arduinoC-browse'));

import { connect } from 'react-redux';
import {
  activateTab,
  ARUINOC_TAB_INDEX
} from '../reducers/editor-tab';
import { SuspenseContainer } from './suspense.jsx';
import { codeLanguage } from '../components/arduinoC-browse/index.jsx';

class ArduinoCTab extends React.Component {

  componentDidUpdate(prevProps) {
    // 只在打开页面时触发 Update 属性
    if (this.props.showCodePane && !prevProps.showCodePane) {
      this.props.translateCode(this.props.deviceName);
    }
  }
  
  render() {
    return (<SuspenseContainer><ArduinoBrowse
      ArduinoCode={this.props.code}
      closeCodePane={this.props.closeCodePane}
      showCodePane={this.props.showCodePane}
      onChangeIsShowTutorialSidebar={this.props.onChangeIsShowTutorialSidebar}
      codeType={['magician', 'magicianlite', 'controller']
        .includes(this.props.deviceName) ?
        codeLanguage.python : codeLanguage.C}
    /></SuspenseContainer>);
  }
}

ArduinoCTab.propTypes = {
  deviceName: PropTypes.string,
  closeCodePane: PropTypes.func,
  showCodePane: PropTypes.bool,
  translateCode: PropTypes.func,
  onChangeIsShowTutorialSidebar: PropTypes.func,
  code: PropTypes.string
};

const mapDispatchToProps = dispatch => ({
  onActivateArduinoCTab: () => dispatch(activateTab(ARUINOC_TAB_INDEX))
});

export default errorBoundaryHOC('Arduino Code')(
  injectIntl(connect(
    null,
    mapDispatchToProps
  )(ArduinoCTab))
);
