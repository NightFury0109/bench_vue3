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
  <InfiniteLoading :offers="offers" @infinite="load" />
</template>

<script>
import { ref } from '@vue/runtime-core';
import { getOffersWithPagination } from '../api/offers';
import InfiniteLoading from 'v3-infinite-loading';

export default {
  props: {
    collection: String,
  },
  components: { InfiniteLoading },
  setup(props) {
    let page = 1;
    const offers = ref([]);
    const load = ($state) => {
      try {
        getOffersWithPagination(props.collection, page).then((res) => {
          if (res.data.data[0].length < 25) $state.complete();
          else {
            offers.value.push(...res.data.data);
            $state.loaded();
          }
        });
      } catch (error) {
        $state.error();
      }
    };
    return { offers, load };
    // const showTable = _.some([offers]);
  },
};
</script>
