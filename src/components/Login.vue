<template>
  <div class="d-flex flex-column login-flex justify-content-between">
    <Header />
    <main class="container pt-5">
      <Toast v-if="showToast" />
      <div class="row mx-n3">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-md-5 form px-3">
              <form class="form mb-3" @submit.prevent="onSubmit">
                <div class="mb-3">
                  <label for="telegram" class="form-label">{{
                    $t('message.nickname')
                  }}</label>
                  <input
                    type="text"
                    class="form-control"
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
                  href="https://t.me/benchkiller_test_bot"
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
        © Benchkiller 2021<span v-if="currentYear > 2021">
          - {{ currentYear }}</span
        >
      </div>
    </footer>
  </div>
</template>

<script>
import Header from './Header.vue';
import { ref, reactive, toRefs } from 'vue';
import Toast from '@/components/Toast';
import _ from 'underscore';
import * as api from '../api/api';
import { useStore } from 'vuex';

export default {
  components: { Toast, Header },
  setup() {
    const currentYear = new Date().getFullYear();
    const showToast = ref(false);
    const store = useStore();

    const user = reactive({
      telegram: '',
      password: '',
    });

    function onSubmit() {
      const userData = reactive({
        username: '',
        token: '',
        id: '',
      });
      api.post(
        'user_tokens',
        {
          auth: {
            login: user.telegram,
            password: user.password,
          },
        },
        (response) => {
          console.log(response);
          userData.username = response.data.user.username;
          userData.token = response.data['auth_token'].token;
          userData.id = response.data.user.uuid;
          store.dispatch('login', userData);
        },
        (error) => console.log(error)
      );

      if (_.isEmpty(user.telegram) && _.isEmpty(user.password)) {
        showToast.value = true;
        setTimeout(() => (showToast.value = false), 10000);
      }
    }
    return {
      currentYear,
      onSubmit,
      showToast,
      ...toRefs(user),
    };
  },
};
</script>
