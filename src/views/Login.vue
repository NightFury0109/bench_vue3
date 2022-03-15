<template>
  <div class="d-flex flex-column login-flex justify-content-between">
    <Header />
    <main class="container pt-5">
      <Alert v-if="showToast" class="alert-danger">
        <template v-slot:icon>
          <svg
            class="me-2"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" /></svg
        ></template>
        <template v-slot:text>{{
          $t('message.toastWrongAuth')
        }}</template></Alert
      >
      <div class="row mx-n3">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-md-5 form px-3">
              <form class="form mb-3" @submit.prevent="loginSubmit">
                <div class="mb-3">
                  <label for="telegram" class="form-label">{{
                    $t('message.nickname')
                  }}</label>
                  <input
                    type="text"
                    class="form-control"
                    autocomplete="telegram"
                    id="telegram"
                    v-model="telegram"
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">{{
                    $t('message.password')
                  }}</label>
                  <input
                    type="password"
                    class="form-control"
                    autocomplete="password"
                    id="password"
                    v-model="password"
                  />
                </div>
                <button type="submit" id="liveToastBtn" class="btn btn-success">
                  {{ $t('message.loginButton') }}
                </button>
              </form>
              <div class="alert alert-primary">
                <span>{{ $t('message.alertMessage1') }}</span>
                <a
                  class="text-decoration-none"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://t.me/Benchkiller_bot"
                  >{{ $t('message.botLink') }}</a
                >
                {{ $t('message.alertMessage2') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="footer pb-3">
      <div class="container">
        © Benchkiller 2021<span v-if="new Date().getFullYear() > 2021">
          - {{ currentYear }}</span
        >
      </div>
    </footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import { ref, reactive, toRefs, onMounted } from 'vue';
import Alert from '@/components/Alert';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

export default {
  components: { Alert, Header },
  setup() {
    const currentYear = new Date().getFullYear();
    const showToast = ref(false);
    const store = useStore();
    const router = useRouter();
    const user = reactive({
      telegram: '',
      password: '',
    });

    onMounted(() => {
      document.title = t('message.loginTitle') + ' | Benchkiller';
    });

    async function loginSubmit() {
      await store
        .dispatch('doLogin', {
          auth: {
            login: user.telegram,
            password: user.password,
          },
        })
        .catch((e) => {
          showToast.value = true;
          setTimeout(() => (showToast.value = false), 10000);
          if (process.env.NODE_ENV != 'production') console.log(e);
        });
      router.push('/offers');
    }

    const { t } = useI18n();
    return {
      currentYear,
      loginSubmit,
      showToast,
      ...toRefs(user),
      t,
    };
  },
};
</script>
