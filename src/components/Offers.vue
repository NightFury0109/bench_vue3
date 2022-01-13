<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link
        :to="{ path: '/offers', query: { collection: 'lookfor' } }"
        class="nav-link active"
        aria-current="page"
        >Active</router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        :to="{ path: '/offers', query: { collectionavailable } }"
        class="nav-link"
        >Link</router-link
      >
    </li>
  </ul>
</template>

<script>
export default {};
</script>
