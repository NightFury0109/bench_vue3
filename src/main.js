import { createApp } from "vue";
import App from "./App.vue";
import { createI18n } from "vue-i18n";

import "bootstrap/scss/bootstrap.scss";
import "bootstrap";

const messages = {
  ru: {
    message: {
      nickname: "Ваш никнейм в telegram",
      password: "Пароль",
      loginButton: "Войти",
      alertMessage1: "Впервые у нас? Перейдите в нашего ",
      botLink: "бота",
      alertMessage2: " и сгенерируйте себе пароль.",
      dangerAlert: "Неверный логин или пароль",
    },
  },
  en: {
    message: {
      nickname: "Your Telegram account",
      password: "Password",
      loginButton: "Log in",
      alertMessage1: "No account? Check out our ",
      botLink: "bot",
      alertMessage2: " and generate your password.",
      dangerAlert: "Invalid login or password",
    },
  },
};

// eslint-disable-next-line no-unused-vars
const i18n = new createI18n({
  locale: "ru",
  messages,
});

createApp(App).use(i18n).mount("#app");
