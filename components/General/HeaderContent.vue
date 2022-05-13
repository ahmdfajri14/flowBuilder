<template>
  <v-col class="pa-0 pb-10">
    <h1>{{ title }}</h1>
  </v-col>
</template>
<script>
export default {
  name: 'HeaderContent',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
