<template>
  <div v-show="title == selectedTitle">
    <table class="container table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col" class="text-start fw-light py-4">Содержание</th>
          <th scope="col" class="text-center fw-light py-4">Дата</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="offer.id" v-for="offer in offers[0]">
          <td>
            <input
              class="form-check-input mt-3"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
          </td>
          <td class="p-3">
            <p class="fw-bold mb-3">{{ offer.attributes.title }}</p>
            <pre class="fw-normal" style="white-space: pre-wrap">{{
              offer.attributes.text
            }}</pre>
          </td>
          <td class="p-3">
            {{ new Date(offer.attributes['created-at']).toLocaleString() }}
          </td>
        </tr>
      </tbody>
    </table>
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
