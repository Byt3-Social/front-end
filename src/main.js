import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { vMaska } from "maska";
import utils from './helpers/maska';

createApp(App)
    .use(router)
    .directive("maska", vMaska)
    .mount('#app');