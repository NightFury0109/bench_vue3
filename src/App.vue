<template>
  <router-view></router-view>
</template>

<script>
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    store.dispatch('fetchAccessToken');
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';
</style>
