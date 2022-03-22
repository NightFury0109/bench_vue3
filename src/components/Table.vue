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
  <InfiniteLoading :offers="offers" :identifier="identifier" @infinite="load">
    <template #spinner>
      <div class="col-lg-9 text-center py-5 my-loading">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </template>
  </InfiniteLoading>
</template>

<script>
import { computed, reactive, ref, watchEffect } from '@vue/runtime-core';
import { getOffersWithPagination } from '../api/offers';
import InfiniteLoading from 'v3-infinite-loading';
import { useStore } from 'vuex';

export default {
  props: {
    collection: String,
    search: Object,
  },
  emits: ['error'],
  components: { InfiniteLoading },
  setup(props, { emit }) {
    const store = useStore();
    store.commit('cleanOffersData');
    let page = 1;
    let options = reactive({ collection: props.collection, page: page });
    const offers = computed(() => store.state.offers);
    let identifier = ref(+new Date());

    watchEffect(() => {
      if (props.search != 'undefined') {
        store.commit('cleanOffersData');
        identifier.value += 1;
        options = { ...options, ...props.search };
      }
      console.log(options);
    });
    const load = ($state) => {
      try {
        getOffersWithPagination(options).then((res) => {
          console.log(res.data);
          if (res.data.links.next == null) {
            $state.complete();
          } else {
            store.commit('updateOffersData', res.data.data);
            $state.loaded();
          }
        });
        options.page++;
      } catch (error) {
        emit('error');
        $state.error();
      }
    };

    return { offers, load, options, identifier };
  },
};
</script>
