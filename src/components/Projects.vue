<template>
  <table
    v-if="dataReady"
    class="container table table-striped table-hover table-bordered"
  >
    <thead>
      <tr>
        <th scope="col">Содержание</th>
        <th scope="col">Дата</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="offer" v-for="offer in offers.value">
        <td>
          <p class="text-uppercase">{{ offer.attributes.title }}</p>
          <p class="fw-light">{{ offer.attributes.text }}</p>
        </td>
        <td>
          {{ new Date(offer.attributes['created-at']).toLocaleDateString() }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { onMounted, ref } from 'vue';
import * as api from '../modules/api';

export default {
  setup() {
    const dataReady = ref(false);
    const offers = {};
    onMounted(() => {
      api.get(
        'offers',
        {
          params: { collection: 'lookfor' },
        },
        (response) => {
          offers.value = response.data.data;
          dataReady.value = true;
        },
        (error) => console.log(error)
      );
    });
    return { offers, dataReady };
  },
};
</script>
