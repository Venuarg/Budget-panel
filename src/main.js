import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Ripple from "primevue/ripple";
import ToastService from "primevue/toastservice";

import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/mdc-light-indigo/theme.css";
import "./assets/scss/main.scss";

import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App)
    .use(store)
    .use(router)
    .use(PrimeVue, { ripple: true })
    .use(ToastService)
    .directive("ripple", Ripple)
    .mount("#app");
