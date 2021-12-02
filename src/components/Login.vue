<template>
  <div class="d-flex flex-column login-flex">
    <nav class="navbar navbar-light navbar-expand-mb login-nav">
      <a href="/" class="navbar-brand">Benchkiller</a>
    </nav>
    <main class="container">
      <div class="row">
        <div class="col-md-6">
          <form>
            <div class="mb-3">
              <label for="userTelegram" class="form-label">{{ $t('message.nickname')}}</label>
              <input type="url" class="form-control" id="userTelegram" />
            </div>
            <div class="mb-3">
              <label for="userPassword" class="form-label">{{ $t('message.password')}}</label>
              <input type="password" class="form-control" id="userPassword" />
            </div>
            <button type="submit" class="btn btn-success">{{ $t('message.enterButton')}}</button>
          </form>
          <div class="alert alert-primary" role="alert">
            <span>{{ $t('message.alertMessage1')}}</span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://t.me/benchkiller_test_bot"
              >{{ $t('message.botLink')}}</a
            >
            {{ $t('message.alertMessage2')}}
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
export default {
  name: "Login",
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>
