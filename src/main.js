import { createApp } from "vue/dist/vue.esm-bundler.js";
// import App from "./App.vue";
import { createI18n } from "vue-i18n/index";

import "bootstrap/scss/bootstrap.scss";
import "bootstrap";

// import i18n resources
import ru from "./locales/ru.json";
import en from "./locales/en.json";

const i18n = new createI18n({
  legacy: false,
  locale: "ru",
  fallbackLocale: "en",
  messages: {
    ru,
    en,
  },
});

const app = createApp({});

app.use(i18n);
app.mount("#app");
