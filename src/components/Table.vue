<template>
  <table
    class="container table table-bordered table-striped table-hover"
    v-if="offers.length"
  >
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col" class="text-start fw-light py-4 fw-bold">
          {{ $t('message.thead1') }}
        </th>
        <th scope="col" class="text-center fw-light py-4 fw-bold">
          {{ $t('message.thead2') }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr :key="i" v-for="(offer, i) in offers.flat()">
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
          <p class="fw-light" style="white-space: pre-wrap">
            {{ offer.attributes.text }}
          </p>
        </td>
        <td class="p-3">
          {{ new Date(offer.attributes['created-at']).toLocaleString() }}
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else class="text-center pt-5 my-loading">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  setup() {
    const offers = inject('offers');
    // const showTable = _.some([offers]);
    return { offers };
  },
};
</script>
