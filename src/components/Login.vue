<template>
  <div class="d-flex flex-column login-flex justify-content-between">
    <nav
      class="navbar navbar-dark bg-dark navbar-expand-mb login-nav py-2 px-3"
    >
      <a href="/" class="navbar-brand">Benchkiller</a>
    </nav>
    <main class="container pt-5">
      <Toast v-if="showToast" />
      <div class="row mx-n3">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-md-5 form px-3">
              <form class="form mb-3" @submit.prevent="onSubmit">
                <div class="mb-3">
                  <label for="userTelegram" class="form-label">{{
                    $t("message.nickname")
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
                    $t("message.password")
                  }}</label>
                  <input
                    type="password"
                    class="form-control"
                    id="userPassword"
                    v-model="userPassword"
                  />
                </div>
                <button type="submit" id="liveToastBtn" class="btn btn-success">
                  {{ $t("message.loginButton") }}
                </button>
              </form>
              <div class="alert alert-primary">
                <span>{{ $t("message.alertMessage1") }}</span>
                <a
                  class="text-decoration-none"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://t.me/benchkiller_test_bot"
                  >{{ $t("message.botLink") }}</a
                >
                {{ $t("message.alertMessage2") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="footer pb-3">
      <div class="container">
        © Benchkiller 2021<span v-if="currentYear > 2021">
          - {{ currentYear }}</span
        >
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import Toast from "@/components/Toast";
import _ from "underscore";
import * as api from "../modules/api";

export default {
  components: { Toast },
  setup() {
    const currentYear = new Date().getFullYear();
    const userTelegram = ref("");
    const userPassword = ref("");
    const showToast = ref(false);

    let user = reactive({
      login: userTelegram.value,
      password: userPassword.value,
    });

    function onSubmit() {
      api.post(
        "user_tokens",
        {
          auth: {
            login: user.login,
            password: user.password,
          },
        },
        (response) => console.log(response),
        (error) => console.log(error)
      );

      if (_.isEmpty(userTelegram.value) && _.isEmpty(userPassword.value)) {
        showToast.value = true;
        setTimeout(() => (showToast.value = false), 10000);
      }
    }
    return {
      currentYear,
      onSubmit,
      showToast,
      userTelegram,
      userPassword,
      user,
    };
  },
};
</script>
