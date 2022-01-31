<template>
  <div v-show="title == selectedTitle">
    <table class="container table table-striped table-hover"></table>
    <!-- <div v-else class="text-center pt-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div> -->
  </div>
</template>

<script>
import { inject } from 'vue';
export default {
  props: ['title'],
  setup() {
    const selectedTitle = inject('selectedTitle');
    const offers = inject('tableData');

    return { selectedTitle, offers };
  },
};
</script>
