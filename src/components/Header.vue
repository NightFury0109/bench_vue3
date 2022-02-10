<template>
  <header>
    <nav
      class="navbar navbar-dark bg-dark navbar-expand-mb login-nav py-2 px-3"
    >
      <router-link :to="{ name: 'offers' }" class="navbar-brand"
        >Benchkiller</router-link
      >
      <ul class="navbar-nav me-auto mb-lg-0">
        <li class="nav-item">
          <router-link :to="{ path: '/offers' }" class="nav-link">
            {{ $t('message.navLink') }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
  <router-view></router-view>
</template>

<script>
export default {};
</script>
