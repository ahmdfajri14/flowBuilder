<template>
  <v-text-field
    single-line
    outlined
    :label="label"
    :type="type"
    :hide-details="hideDetails"
    :height="height"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>
<script>
export default {
  name: 'TextField',
  props: {
    label: {
      type: String,
      default: 'Insert Label',
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
    height: {
      type: String,
      default: '45px',
    },
  },
}
</script>
<style lang="scss" scoped>
/* Change border color v-text-field */
::v-deep .v-input__slot fieldset {
  border-color: #eaeaea !important;
  border-radius: 6px;
}
</style>
