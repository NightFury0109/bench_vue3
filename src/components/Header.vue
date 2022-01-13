<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-mb login-nav py-2 px-3">
    <a href="/" class="navbar-brand">Benchkiller</a>
    <ul class="navbar-nav me-auto mb-lg-0">
      <li class="nav-item">
        <router-link
          :to="{ path: '/offers', query: { collection: 'lookfor' } }"
          class="nav-link"
        >
          Проекты и команды
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style></style>
