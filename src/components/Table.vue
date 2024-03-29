<template>
  <table
    class="container table table-bordered table-striped table-hover flex-shrink-0"
    v-if="offers.length"
  >
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col" class="text-start fw-light py-2 fw-bold">
          {{ $t('message.thead1') }}
        </th>
        <th scope="col" class="text-center fw-light py-2 fw-bold">
          {{ $t('message.thead2') }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr :key="offer.id" v-for="offer in offers">
        <td>
          <input
            class="form-check-input mt-3"
            v-model="checkedOffers"
            type="checkbox"
            :value="offer.attributes.username"
            @change="updateCheckedOffers"
          />
        </td>
        <td class="p-3">
          <p class="fw-bold mb-3">@{{ offer.attributes.title }}</p>
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
  <InfiniteLoading
    class="container"
    :offers="offers"
    :identifier="identifier"
    @infinite="load"
  >
    <template #spinner>
      <div class="col-lg-9 text-center py-5 my-loading">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </template>
    <template #complete>
      <div class="text-center pt-3">
        <span>{{ $t('message.noDataFound') }}</span>
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
        options.page = 1;
        options = { ...options, ...props.search };
      }
    });

    const load = async ($state) => {
      try {
        await getOffersWithPagination(options)
          .then((res) => {
            if (res.data.links.next == null) {
              store.commit('updateOffersData', res.data.data);
              $state.complete();
            } else {
              store.commit('updateOffersData', res.data.data);
              $state.loaded();
            }
          })
          .catch(() => emit('error'));
        options.page++;
      } catch (error) {
        emit('error');
        $state.error();
      }
    };

    const checkedOffers = computed(() => store.state.checkedOffers);
    const updateCheckedOffers = (e) => {
      e.target.checked
        ? store.commit('updateCheckedOffers', e.target.value)
        : store.commit('removeCheckbox', e.target.value);
    };

    return {
      offers,
      load,
      options,
      identifier,
      checkedOffers,
      updateCheckedOffers,
    };
  },
};
</script>
