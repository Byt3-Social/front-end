import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { vMaska } from "maska";
import VueApexCharts from "vue3-apexcharts";

createApp(App)
    .use(router)
    .use(VueApexCharts)
    .directive("maska", vMaska)
    .mount('#app');