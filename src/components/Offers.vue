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
        >Проекты</router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        :to="{ path: '/offers/?collectionavailable' }"
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
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil est libero
      doloribus doloremque voluptas amet porro culpa cumque veniam illo suscipit
      ad in rem nostrum, sit, error repudiandae animi fuga?
    </div>
    <div
      class="tab-pane fade"
      id="profile"
      role="tabpanel"
      aria-labelledby="profile-tab"
    >
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur
      cupiditate non unde ut minus sed, dolore possimus commodi, asperiores
      omnis veritatis porro. Totam, aperiam? Labore eaque delectus commodi
      inventore nisi.
    </div>
  </div>
  <Projects />
  <Teams />
</template>

<script>
import Projects from './Projects.vue';
import Teams from './Projects.vue';

export default {
  components: { Projects, Teams },
};
</script>
