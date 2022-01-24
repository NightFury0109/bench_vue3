<template>
  <table v-if="dataReady" class="container table table-striped table-hover">
    <thead>
      <tr>
        <th scope="col">Содержание</th>
        <th scope="col">Дата</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="offer" v-for="offer in offers.value">
        <td>
          <p class="fw-bold mb-3">{{ offer.attributes.title }}</p>
          <pre class="text-muted" style="white-space: break-spaces">{{
            offer.attributes.text
          }}</pre>
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
        { collection: 'lookfor' },
        (response) => {
          offers.value = response.data.data;
          dataReady.value = true;
          console.log(response);
        },
        (error) => console.log(error)
      );
    });
    return { offers, dataReady };
  },
};
</script>
