import { createApp } from 'vue'
import './assets/style.scss'
import App from "./App.vue"
import { createPinia } from "pinia";
import router from "./router";

const app = createApp(App),
    pinia = createPinia();

app
    .use(router)
    .use(pinia)

app.mount('#app')
