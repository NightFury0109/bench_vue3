<template>
  <footer class="footer pb-3">
    <div class="container">
      © Benchkiller 2021<span v-if="new Date().getFullYear() > 2021">
        - {{ new Date().getFullYear() }}</span
      >
    </div>
  </footer>
</template>

<script>
export default {};
</script>
