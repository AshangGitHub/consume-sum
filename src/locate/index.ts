import { createI18n } from 'vue-i18n';

import zhCn from './lang/zh-cn';
import zhHk from './lang/zh-hk';
import en from './lang/en';

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('langLocale') || 'zh-cn',
  fallbackLocale: 'zh-cn',
  messages: {
    'zh-cn': zhCn,
    'zh-hk': zhHk,
    en,
  },
});

export default i18n;
