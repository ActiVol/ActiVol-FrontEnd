import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Swal from 'sweetalert2'
import 'iconify-icon';
import { Icon } from '@iconify/vue';

const app = createApp(App)
app.use(router)
app.config.globalProperties.$swal = Swal
app.component('icon', Icon)
app.mount('#app')
