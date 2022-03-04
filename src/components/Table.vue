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
      <tr :key="i" v-for="(offer, i) in offers">
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
</template>

<script>
import { onMounted, onUnmounted, ref } from '@vue/runtime-core';
import { getOffersWithPagination } from '../api/offers';

export default {
  props: {
    collection: String,
  },
  setup(props) {
    let page = 1;
    const offers = ref([]);

    const loadOffers = async (collection) => {
      getOffersWithPagination(collection, page).then((res) => {
        offers.value.push(...res.data.data);
      });
    };
    onMounted(() => {
      console.log('onMount');
      loadOffers(props.collection);
    });
    onUnmounted(() => {
      offers.value = [];
      console.log('onUnmount');
    });
    return { offers, loadOffers };
    // const showTable = _.some([offers]);
  },
};
</script>
