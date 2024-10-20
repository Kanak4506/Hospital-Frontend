import "./assets/tailwind.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createAuth0 } from "@auth0/auth0-vue";

import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

const app = createApp(App);

import { setUpEcharts } from "./composables/eChart";
import VChart from "vue-echarts";

setUpEcharts();
app.component("v-chart", VChart);

app.use(router)
   .use(
      createAuth0({
         domain: import.meta.env.VITE_AUTH0_DOMAIN,
         clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
         authorizationParams: {
            redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
         },
      }),
   )
   .use(PrimeVue, {
      theme: {
         preset: Aura,
      },
   })
   .mount("#app");
app.use(createPinia());