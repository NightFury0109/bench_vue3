require("dotenv").config();

import { createApp } from "vue";
import App from "./App.vue";
import { createI18n } from "vue-i18n";

import ru from "./locales/ru.json";
import en from "./locales/en.json";

// eslint-disable-next-line no-unused-vars
const i18n = new createI18n({
  locale: "ru",
  messages: {
    ru,
    en,
  },
});

createApp(App).use(i18n).mount("#app");
