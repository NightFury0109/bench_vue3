<template>
  <div
    class="d-flex flex-column"
    style="min-height: 100%; justify-content: space-between"
  >
    <nav
      class="navbar navbar-light navbar-expand"
      style="background-color: #343a40 !important; padding: 0.5rem 1rem"
    >
      <div class="header-nav">
        <a href="http://freedvs.com/" class="navbar-brand" style="color: white"
          >Benchkiller</a
        >
      </div>
    </nav>
    <main class="container" style="max-width: 1140px">
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
      <div class="container" style="padding-bottom: 1em">
        © Benchkiller 2021
      </div>
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

<style scoped>
main {
  flex: 1 1 auto;
}
.container {
  max-width: 1140px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: 354px;
  margin-left: 354px;
  padding-top: 2em;
}
</style>
