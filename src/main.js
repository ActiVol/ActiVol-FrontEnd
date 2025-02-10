import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import zh_ch from 'element-plus/dist/locale/zh-cn';
import 'element-plus/dist/index.css';
import { Icon } from '@iconify/vue';
import 'iconify-icon';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import './styles/index.less';
import 'virtual:svg-icons-register';
import SvgIcon from './components/svg-icon';
import elementIcons from './components/svg-icon/svgicon';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import plugins from './plugins'; // plugins
import './permission'; // permission control
import { createPinia } from 'pinia';
import { useDict } from './utils/dict';
import directive from './directive';
// 图片上传组件
import ImageUpload from './components/image-upload/index';
// 字典标签组件
import DictTag from './components/dict-tag/index';

const pinia = createPinia();
const app = createApp(App);

app.component('DictTag', DictTag);
app.component('ImageUpload', ImageUpload);
app.component('svg-icon', SvgIcon);
app.component('Icon', Icon);
app.config.globalProperties.useDict = useDict;

app.use(elementIcons);
app.use(pinia);
app.use(router);
app.use(i18n);
app.use(ElementPlus,{
  i18n: (key, value) => i18n.t(key, value),
  locale: zh_ch,
});
app.use(plugins);

app.mount('#app');
directive(app);
