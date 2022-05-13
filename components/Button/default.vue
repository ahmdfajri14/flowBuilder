<template>
  <v-btn
    depressed
    :style="`color: ${textColor} !important; border: 1px solid #1799AC`"
    :color="color"
    :outlined="isOutlined"
    v-bind="[$props, $attrs]"
    v-on="$listeners"
  >
    <component :is="prependIcon" class="mr-2" />
    {{ label }}
    <component :is="appendIcon" class="ml-2" />
  </v-btn>
</template>
<script>
export default {
  name: 'ButtonDefault',
  props: {
    label: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
    prependIcon: {
      type: String,
      default: '',
    },
    appendIcon: {
      type: String,
      default: '',
    },
    isOutlined: {
      type: Boolean,
      default: false,
    },
    textColor: {
      type: String,
      default: 'primary',
    },
  },
}
</script>
<style lang="scss" scoped>
.v-btn {
  border-radius: 6px !important;
  letter-spacing: 0px !important;
}
.v-btn:not(.v-btn--round).v-size--default {
  min-width: 120px;
  height: 44px;
}
::v-deep .v-btn__content {
  text-transform: capitalize !important;
}
</style>
