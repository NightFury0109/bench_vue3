<template>
  <div
    class="alert alert-dismissible d-flex justify-content position-fixed align-items-center toast-notification"
    role="alert"
  >
    <slot name="icon"></slot>
    <div class="fade show">
      <slot name="text"></slot>
    </div>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
</template>

<script>
export default {};
</script>
