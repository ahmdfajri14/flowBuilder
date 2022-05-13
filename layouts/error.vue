<template>
  <div>
    <div v-if="error.statusCode === 404" class="mb-8">
      <h1>Oops, maybe you lost..</h1>
      <p class="s-regular">Page not found</p>
    </div>
    <div v-else class="mb-8">
      <h1>Oops, something happens</h1>
      <p class="s-regular">Error</p>
    </div>
    <button-default to="/" label="Back to Dashboard" />
  </div>
</template>

<script>
export default {
  layout: 'error',
  props: ['error'], // you can set a custom layout for the error page
}
</script>
