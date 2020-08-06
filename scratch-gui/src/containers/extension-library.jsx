import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import extensionNormalLibraryContent from '../lib/libraries/extensions/index.jsx';

import getByDeviceName from '../lib/libraries/extensions/deviceExtensions.jsx';

import LibraryComponent from '../components/library/library.jsx';
import extensionIcon from '../components/action-menu/icon--sprite.svg';

const messages = defineMessages({
  extensionTitle: {
    defaultMessage: 'Choose an Extension',
    description: 'Heading for the extension library',
    id: 'gui.extensionLibrary.chooseAnExtension'
  },
  extensionUrl: {
    defaultMessage: 'Enter the URL of the extension',
    description: 'Prompt for unoffical extension url',
    id: 'gui.extensionLibrary.extensionUrl'
  }
});

class ExtensionLibrary extends React.PureComponent {
  constructor (props) {
    super(props);
    bindAll(this, [
      'handleItemSelect'
    ]);
  }

  handleItemSelectChange = (id, windowFlage, blockName) => {
    if (window[windowFlage]) {
      this.props.onCategorySelected(id);
    } else {
      window[windowFlage] = true;
      window.updateToolboxXML(true, true);
    }
    setTimeout(() => this.props.onCategorySelected(blockName));
  }

  handleItemSelect (item) {
    const id = item.extensionId;
    switch (id) {
    case 'MagicianLiteAIExtensionFORControllerFORMagician':
      this.handleItemSelectChange(id, 'AIAdded', 'AI');
      return;
    case 'PhotoelectricAndColorSensorFORMagicianFORController':
      this.handleItemSelectChange(id, 'photoelectricAndColorSensorAdded', 'photoelectricAndColorSensor');
      return;
    case 'SlidingRailFORMagicianFORController':
      this.handleItemSelectChange(id, 'slidingRailXmlAdded', 'slidingRail');
      return;
    case 'EnlightenmentKitFORController':
      this.handleItemSelectChange(id, 'enlightenmentKitXmlAdded', 'enlightenmentKit');
      return;
    default:
      break;
    }
    let url = item.extensionURL ? item.extensionURL : id;
    if (!item.disabled && !id) {
      // eslint-disable-next-line no-alert
      url = prompt(this.props.intl.formatMessage(messages.extensionUrl));
    }

    if (id && !item.disabled) {
      if (this.props.vm.extensionManager.isExtensionLoaded(url)) {
        this.props.onCategorySelected(id);
      } else {
        this.props.vm.extensionManager.loadExtensionURL(url).then(() => {
          this.props.onCategorySelected(id);
        });
      }
    }
  }
  render () {
    const deviceName = this.props.vm.editingTarget.deviceName;
    const extensionLibraryContent = this.props.isDeviceSprite ?
      getByDeviceName(deviceName) : extensionNormalLibraryContent;
    const extensionLibraryThumbnailData = extensionLibraryContent.map(extension => ({
      rawURL: extension.iconURL || extensionIcon,
      ...extension
    }));
    return (
      <LibraryComponent
        data={extensionLibraryThumbnailData}
        filterable={false}
        id="extensionLibrary"
        title={this.props.intl.formatMessage(messages.extensionTitle)}
        visible={this.props.visible}
        onItemSelected={this.handleItemSelect}
        onRequestClose={this.props.onRequestClose}
      />
    );
  }
}

ExtensionLibrary.propTypes = {
  intl: intlShape.isRequired,
  isDeviceSprite: PropTypes.bool,
  onCategorySelected: PropTypes.func,
  onRequestClose: PropTypes.func,
  visible: PropTypes.bool,
  vm: PropTypes.instanceOf(VM).isRequired // eslint-disable-line react/no-unused-prop-types
};

export default injectIntl(ExtensionLibrary);
