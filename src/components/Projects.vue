<template>
  <table v-if="dataReady" class="container table table-striped table-hover">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col" class="text-start fw-light py-4">Содержание</th>
        <th scope="col" class="text-center fw-light py-4">Дата</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="offer" v-for="offer in offers.value">
        <td>
          <input
            class="form-check-input mt-3"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
        </td>
        <td class="p-3">
          <p class="fw-lighter mb-3">{{ offer.attributes.title }}</p>
          <pre class="fw-normal" style="white-space: break-spaces">{{
            offer.attributes.text
          }}</pre>
        </td>
        <td class="p-3">
          {{ new Date(offer.attributes['created-at']).toLocaleString() }}
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
