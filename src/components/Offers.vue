<template>
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <router-link
        :to="{ path: '/offers', query: { collection: 'lookfor' } }"
        class="nav-link active"
        id="home-tab"
        data-bs-toggle="tab"
        data-bs-target="#home"
        type="button"
        role="tab"
        aria-controls="home"
        aria-selected="true"
        >Предложения</router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        :to="{ path: '/offers', query: { collection: 'available' } }"
        class="nav-link"
        id="profile-tab"
        data-bs-toggle="tab"
        data-bs-target="#profile"
        type="button"
        role="tab"
        aria-controls="profile"
        aria-selected="false"
        >Команды</router-link
      >
    </li>
  </ul>
  <div class="tab-content" id="myTabContent">
    <div
      class="tab-pane fade show active"
      id="home"
      role="tabpanel"
      aria-labelledby="home-tab"
    >
      <Projects />
    </div>
    <div
      class="tab-pane fade"
      id="profile"
      role="tabpanel"
      aria-labelledby="profile-tab"
    >
      <Teams />
    </div>
  </div>
</template>

<script>
import Projects from './Projects.vue';
import Teams from './Projects.vue';

export default {
  components: { Projects, Teams },
};
</script>
