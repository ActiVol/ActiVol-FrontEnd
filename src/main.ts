import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Swal from 'sweetalert2'
import 'iconify-icon';
import { Icon } from '@iconify/vue';

import i18n from './i18n'

const app = createApp(App)
app.use(router)
app.config.globalProperties.$swal = Swal
app.component('icon', Icon)
app.use(i18n)
app.mount('#app')
