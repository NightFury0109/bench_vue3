<template>
  <form class="container ms-4">
    <h3>{{ $t('message.filterHeader') }}</h3>
    <div class="mb-3 pt-2">
      <input
        type="email"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="Введите текст для поиска"
      />
    </div>
    <div class="select mt-2">
      <label for="exampleFormControlInput1" class="form-label">Select1</label>
      <select class="form-select" aria-label="Default select example">
        <option selected>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <div class="select mt-2">
      <label for="exampleFormControlInput1" class="form-label">Select2</label>
      <select class="form-select" aria-label="Default select example">
        <option selected>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <div class="buttons mt-4">
      <button class="me-3">Search</button>
      <button>Clean</button>
    </div>
  </form>
</template>

<script>
export default {
  setup() {},
};
</script>
