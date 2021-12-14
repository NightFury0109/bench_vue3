<template>
  <div aria-live="assertive" aria-atomic="true">
    <div id="liveToast" class="toast show" role="alert">
      <div class="toast-body">
        {{ t("message.dangerAlert") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
