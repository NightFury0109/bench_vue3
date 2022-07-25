require('dotenv').config();

import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import store from './store';

import ru from './locales/ru.json';
import en from './locales/en.json';

const i18n = new createI18n({
  locale: 'en',
  messages: {
    ru,
    en,
  },
});

createApp(App).use(router).use(store).use(i18n).mount('#app');
