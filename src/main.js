import "./assets/tailwind.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

const app = createApp(App);

import { setUpEcharts } from "./composables/eChart";
import VChart from "vue-echarts";

setUpEcharts();
app.component("v-chart", VChart);

app.use(createPinia());
app.use(PrimeVue, {
   theme: {
      preset: Aura,
   },
});
app.use(router);

app.mount("#app");
