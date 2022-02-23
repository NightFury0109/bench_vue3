<template>
  <div role="alert" aria-live="assertive" aria-atomic="true">
    <div
      id="liveToast"
      class="toast shadow-none toast-notification show position-fixed align-items-center alert-success"
      role="alert"
    >
      <div :="$attrs" class="d-flex">
        <div class="toast-body">
          <slot></slot>
        </div>
        <button
          type="button"
          class="btn-close btn-close-black me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>
