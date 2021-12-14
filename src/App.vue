<template>
  <Login />
</template>

<script>
import { useI18n } from "vue-i18n";
import ru from "./locales/ru.json";
import en from "./locales/en.json";
import Login from "./components/Login.vue";

export default {
  components: { Login },
  setup() {
    const { t } = new useI18n({
      legacy: false,
      locale: "ru",
      messages: {
        ru,
        en,
      },
    });
    return {
      t,
    };
  },
};
</script>

<style lang="scss">
@import "./assets/scss/style.scss";
</style>
