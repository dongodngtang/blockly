/**
 * Currently supported locales for the Scratch Project
 * @type {Object} Key Value pairs of locale code: Language name written in the language
 */

const locales = {
    'en': {
        name: 'English'
    },
    'zh-cn': {
        name: '简体中文'
    },
    'zh-hk': {
        name: '繁體中文'
    },
    // 'pt': {
    //     name: 'Português'
    // },
    'ja': {
        name: '日本語'
    },
    'cs': {
        name: 'Česká republika'
    },
    'es': {
        name: 'Espanol'
    },
    'ru': {
        name: 'русский язык'
    },
    'fi': {
        name: 'Suomen tasavalta'
    },
    'hu': {
        name: 'Magyarország'
    }
};

const customLocales = {
    'zh-cn': {
        locale: 'zh-cn',
        parentLocale: 'zh'
    },
    'zh-hk': {
        locale: 'zh-hk',
        parentLocale: 'zh'
    }
};

const localeMap = {
    'zh-cn': 'zh_CN',
    'zh-hk': 'zh_HK'
};

// list of RTL locales supported, and a function to check whether a locale is RTL
const rtlLocales = [];

const isRtl = locale => {
    return rtlLocales.indexOf(locale) !== -1;
};

export {
    locales as
    default, customLocales, localeMap, rtlLocales, isRtl
};
