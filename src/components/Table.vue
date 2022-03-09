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
import { computed } from '@vue/runtime-core';
import { getOffersWithPagination } from '../api/offers';
import InfiniteLoading from 'v3-infinite-loading';
import { useStore } from 'vuex';

export default {
  props: {
    collection: String,
    search: Object,
  },
  components: { InfiniteLoading },
  setup(props, { emit }) {
    const store = useStore();
    store.commit('cleanOffersData');

    let page = 1;
    const offers = computed(() => store.state.offers);
    const load = ($state) => {
      try {
        let options = {
          collection: props.collection,
          page: page,
        };
        if (props.search != undefined) {
          options = {
            ...options,
            search: props.search.search,
            regions: props.search.regions,
            period: props.search.period,
          };
          store.commit('cleanOffersData');
        }
        getOffersWithPagination(options).then((res) => {
          if (res.data.data[0].length < 25) $state.complete();
          else {
            store.commit('updateOffersData', res.data.data);
            $state.loaded();
          }
          page++;
        });
      } catch (error) {
        emit('error');
        $state.error();
      }
    };
    return { offers, load };
    // const showTable = _.some([offers]);
  },
};
</script>
