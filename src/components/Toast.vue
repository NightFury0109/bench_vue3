<template>
  <div aria-live="assertive" aria-atomic="true">
    <div
      id="liveToast"
      class="toast shadow-none toast-notification show position-fixed"
      role="alert"
    >
      <div class="alert-danger toast-body">
        {{ $t("message.dangerAlert") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
