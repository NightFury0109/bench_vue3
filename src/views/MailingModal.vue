<template>
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-body">
        <div class="container">
          <div class="row ps-0">
            <div class="col-xl-8">
              <form class="container">
                <div class="mt-3">
                  <label for="exampleFormControlTextarea1" class="form-label"
                    >{{ $t('mailing.textareaLbl') }}:</label
                  >
                  <textarea
                    class="form-control"
                    :placeholder="$t('mailing.textareaPlacehldr')"
                    rows="15"
                  ></textarea>
                </div>
              </form>
            </div>
            <div class="col-xl-4">
              <label class="form-label pt-3"
                >{{ $t('mailing.usersToSendTo') }}:</label
              >
              <div class="d-flex justify-content-between">
                <ul class="list-group">
                  <li
                    v-for="(user, i) in mailingList"
                    :key="i"
                    class="list-group-item"
                  >
                    @{{ user }}
                    <button
                      @click="removeUser(user)"
                      type="button"
                      class="btn-close ms-1"
                      aria-label="Close"
                    ></button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="container d-flex justify-content-end">
          <button
            type="button"
            class="btn btn-secondary me-2"
            data-bs-dismiss="modal"
          >
            {{ $t('mailing.closeBtn') }}
          </button>
          <button type="button" class="btn btn-success">
            {{ $t('mailing.sendBtn') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    let mailingList = computed(() => store.getters.getChecked);

    function removeUser(userToRemove) {
      store.commit('removeCheckbox', userToRemove);
    }

    return {
      mailingList,
      removeUser,
    };
  },
};
</script>
