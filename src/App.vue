<template>
  <router-view></router-view>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch('fetchAccessToken');
    });
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';
</style>
