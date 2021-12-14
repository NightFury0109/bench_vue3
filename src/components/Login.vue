<template>
  <div class="d-flex flex-column login-flex">
    <nav class="navbar navbar-light navbar-expand-mb login-nav">
      <a href="/" class="navbar-brand">Benchkiller</a>
    </nav>
    <main class="container">
      <Toast v-if="showToast" />
      <div class="row">
        <div class="col-md-6">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="userTelegram" class="form-label">{{
                t("message.nickname")
              }}</label>
              <input
                type="text"
                class="form-control"
                id="userTelegram"
                v-model="userTelegram"
              />
            </div>
            <div class="mb-3">
              <label for="userPassword" class="form-label">{{
                t("message.password")
              }}</label>
              <input
                type="password"
                class="form-control"
                id="userPassword"
                v-model="userPassword"
              />
            </div>
            <button type="submit" id="liveToastBtn" class="btn btn-success">
              {{ t("message.loginButton") }}
            </button>
          </form>
          <div class="alert alert-primary" role="alert">
            <span>{{ t("message.alertMessage1") }}</span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://t.me/benchkiller_test_bot"
              >{{ t("message.botLink") }}</a
            >
            {{ t("message.alertMessage2") }}
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div class="container">
        © Benchkiller 2021<span v-if="currentYear > 2021">
          - {{ currentYear }}</span
        >
      </div>
    </footer>
  </div>
</template>

<script>
import { ref } from "vue";
import Toast from "@/components/Toast";
import _ from "underscore";

export default {
  components: { Toast },
  setup() {
    const currentYear = new Date().getFullYear();
    const userTelegram = ref("");
    const userPassword = ref("");
    const showToast = ref(false);

    const onSubmit = () => {
      if (_.isEmpty(userTelegram.value) && _.isEmpty(userPassword.value)) {
        showToast.value = true;
        setTimeout(() => (showToast.value = false), 10000);
      }
    };
    return {
      currentYear,
      onSubmit,
      showToast,
      userTelegram,
      userPassword,
    };
  },
};
</script>
