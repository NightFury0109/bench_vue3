<template>
  <div class="d-flex flex-column login-flex">
    <nav class="navbar navbar-light navbar-expand login-nav">
      <div class="header-nav">
        <a href="http://freedvs.com/" class="navbar-brand">Benchkiller</a>
      </div>
    </nav>
    <main class="container">
      <div class="row">
        <div class="col-md-6">
          <form style="margin-block-end: 1em">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Ваш никнейм в telegram</label
              >
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label"
                >Пароль</label
              >
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button
              type="submit"
              class="btn btn-success"
              style="background-color: #28a745"
            >
              Войти
            </button>
          </form>
          <div class="alert alert-primary" role="alert">
            Впервые у нас? Перейдите в нашего
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://t.me/benchkiller_test_bot"
              >бота</a
            >
            и сгенерируйте себе пароль.
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div class="container">© Benchkiller 2021</div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {};
  },
};
</script>

<style></style>
