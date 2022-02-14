<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link :to="{ name: 'offers' }" class="navbar-brand"
          >Benchkiller</router-link
        >
        <div class="navbar-nav flex-row flex-grow-1">
          <router-link
            :to="{ path: '/offers' }"
            class="nav-link"
            aria-current="page"
          >
            <span v-show="store.state.accessToken">{{
              $t('message.navLink')
            }}</span>
          </router-link>
          <router-link :to="{ path: '/' }" class="nav-link ms-auto">
            <span @click="logOut">{{ $t('message.logOut') }}</span>
          </router-link>
        </div>
      </div>
    </nav>
  </header>
  <router-view></router-view>
</template>

<script>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const logOut = () => {
      store.dispatch('logOut');
    };
    return { logOut, store };
  },
};
</script>
