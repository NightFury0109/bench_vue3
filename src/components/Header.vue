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
            v-show="store.state.accessToken"
          >
            <div class="d-flex justify-content-between align-items-center">
              <span class="material-icons pe-1">list</span>
              <span>{{ $t('message.navLink') }}</span>
            </div>
          </router-link>
          <router-link
            :to="{ path: '/' }"
            class="nav-link ms-auto d-flex justify-content-between align-items-center"
          >
            <div
              @click="logOut"
              class="d-flex justify-content-between align-items-center"
            >
              <span class="material-icons pe-1"> logout </span>
              <span>{{ $t('message.logOut') }}</span>
            </div>
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
