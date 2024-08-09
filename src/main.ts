import { createApp } from 'vue'
import './assets/style.scss'
import App from "./App.vue"
import { createPinia } from "pinia";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import roleDirective from './directives/role';

const app = createApp(App),
    pinia = createPinia();

app.directive('role', roleDirective);

app
    .use(VueAxios, axios)
    .use(router)
    .use(pinia)

app.mount('#app')
