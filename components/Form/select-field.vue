<template>
   <v-select
      single-line
      outlined
      append-icon="mdi-chevron-down"
      :label=label
      :hide-details=hideDetails
      :items=items
      v-bind="$attrs"
      v-on="$listeners"
    />
</template>
<script>
export default {
  name: "SelectField",
  props: {
    label: {
      type: String,
      default: "Insert Label"
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [
        {
          text: "Insert items",
          value: "none"
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  /* Change border color v-text-field */
  ::v-deep .v-input__slot fieldset {
    border-color: #EAEAEA !important;
    border-radius: 6px;
  }
</style>
