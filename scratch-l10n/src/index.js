// to find locale data in react-intl, go to:
// https://unpkg.com/react-intl/locale-data/

import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
// import pt from 'react-intl/locale-data/pt';
import ja from 'react-intl/locale-data/ja';
import cs from 'react-intl/locale-data/cs';
import es from 'react-intl/locale-data/es';
import ru from 'react-intl/locale-data/ru';
import fi from 'react-intl/locale-data/fi';
import hu from 'react-intl/locale-data/hu';

import locales, {customLocales, localeMap, isRtl} from './supported-locales.js';
/*
locales = {
    'ab': {name: 'Аҧсшәа'},
    'ca': {name: 'Català'},
    'cs': {name: 'Česky'},
    'cy': {name: 'Cymraeg'},
    'de': {name: 'Deutsch'},
    'el': {name: 'Ελληνικά'},
    'en': {name: 'English'},
    'es': {name: 'Español'},
    'es-419': {name: 'Español Latinoamericano'},
    'fr': {name: 'Français'},
    'ga': {name: 'Gaeilge'},
    'gd': {name: 'Gàidhlig'},
    'he': {name: 'עִבְרִית'},
    'it': {name: 'Italiano'},
    'ja': {name: '日本語'},
    'mi': {name: 'Maori'},
    'nl': {name: 'Nederlands'},
    'nb': {name: 'Norsk Bokmål'},
    'pt': {name: 'Português'},
    'pt-br': {name: 'Português Brasileiro'},
    'sr': {name: 'Српски'},
    'sl': {name: 'Slovenščina'},
    'tr': {name: 'Türkçe'},
    'uk': {name: 'Українська'},
    'zh-cn': {name: '简体中文'},
    'zh-tw': {name: '繁體中文'}
*/

let localeData = [].concat(
    en,
    zh,
    // pt,
    ja,
    cs,
    es,
    ru,
    fi,
    hu
);

for (const lang in customLocales) {
    localeData.push(customLocales[lang]);
}

export {
    locales as default,
    localeMap,
    isRtl,
    localeData // data expected for initializing ReactIntl.addLocaleData
};
