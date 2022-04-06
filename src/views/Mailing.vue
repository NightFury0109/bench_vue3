<template>
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-body">
        <div class="login-flex d-flex flex-column justify-content-between">
          <form class="pt-3 container flex-grow-1 me-auto">
            <div class="d-flex justify-content align-items-center">
              <svg
                class="me-2"
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <g><rect fill="none" height="24" width="24" /></g>
                <g>
                  <g />
                  <g>
                    <path
                      d="M16.67,13.13C18.04,14.06,19,15.32,19,17v3h4v-3C23,14.82,19.43,13.53,16.67,13.13z"
                    />
                    <path
                      d="M15,12c2.21,0,4-1.79,4-4c0-2.21-1.79-4-4-4c-0.47,0-0.91,0.1-1.33,0.24C14.5,5.27,15,6.58,15,8s-0.5,2.73-1.33,3.76 C14.09,11.9,14.53,12,15,12z"
                    />
                    <path
                      d="M9,12c2.21,0,4-1.79,4-4c0-2.21-1.79-4-4-4S5,5.79,5,8C5,10.21,6.79,12,9,12z M9,6c1.1,0,2,0.9,2,2c0,1.1-0.9,2-2,2 S7,9.1,7,8C7,6.9,7.9,6,9,6z"
                    />
                    <path
                      d="M9,13c-2.67,0-8,1.34-8,4v3h16v-3C17,14.34,11.67,13,9,13z M15,18H3l0-0.99C3.2,16.29,6.3,15,9,15s5.8,1.29,6,2V18z"
                    />
                  </g>
                </g>
              </svg>
              <div>
                <span
                  v-for="(user, i) in mailingList"
                  :key="i"
                  class="ps-1 fw-bold"
                  >@{{ user }}
                  <button
                    @click="removeUser(user)"
                    type="button"
                    class="btn-close me-1 my-button"
                    aria-label="Close"
                  ></button
                ></span>
              </div>
            </div>
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
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button type="button" class="btn btn-success">Send message</button>
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
    // onMounted(() => store.commit('transformCheckedOffers'));
    // let users = mailingList.map((el, i) => {
    //   return mailingList.indexOf(el) != mailingList.length - 1
    //     ? h('span', { key: i }, [
    //         (el = `@${el}` + ', '),
    //         h('button', { class: 'btn-close', ariaLabel: 'close' }, ', '),
    //       ])
    //     : (el = `@${el}`);
    // });
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
