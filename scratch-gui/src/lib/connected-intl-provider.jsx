import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { connect } from 'react-redux';
// todo: change it to static provider
const mapStateToProps = state => ({
  key: state.locales.locale,
  locale: state.locales.locale,
  messages: state.locales.messages
});

export default connect(mapStateToProps)(ReactIntlProvider);
