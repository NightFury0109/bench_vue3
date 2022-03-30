<template>
  <div class="login-flex d-flex flex-column justify-content-between">
    <Header />
    <form class="pt-5 container flex-grow-1 me-auto">
      <table class="table table-bordered">
        <tbody>
          <tr v-for="(mails, i) in mailingList" :key="i">
            <td>@{{ mails }}</td>
          </tr>
        </tbody>
      </table>
      <div class="mt-3">
        <label for="exampleFormControlTextarea1" class="form-label">{{
          $t('mailing.textareaLbl')
        }}</label>
        <textarea
          class="form-control"
          :placeholder="$t('mailing.textareaPlacehldr')"
          rows="15"
        ></textarea>
      </div>
    </form>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  components: { Header, Footer },
  setup() {
    const store = useStore();
    return {
      mailingList: computed(() => store.state.checkedOffers),
    };
  },
};
</script>
