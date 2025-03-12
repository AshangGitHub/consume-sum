import { createApp } from 'vue';
import router from '@/router';
import './assets/scss/common.scss';
import './assets/scss/index.scss';
import App from './App.vue';
import i18n from '@/locate/index';
import directives from '@/directive/index'; //自定义指令导入
const app = createApp(App);

app.use(i18n);
app.use(router);
app.use(directives);

app.mount('#app');
