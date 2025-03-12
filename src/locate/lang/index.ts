import { createI18n } from 'vue-i18n';
import zhCn from './zh-cn';
import zhHk from './zh-hk';
import en from './en';
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
