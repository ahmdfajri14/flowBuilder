<template>
  <div :class="`badge--root ${checkType}`">
    <p class="s-bold">
      <slot></slot>
    </p>
  </div>
</template>
<script>
export default {
  name: 'BadgeRounded',
  props: {
    type: {
      type: String,
      default: 'default',
    },
  },
  computed: {
    checkType() {
      const checker = {
        success: 'success-badge',
        error: 'error-badge',
      }

      return checker[this.type]
    },
  },
}
</script>
<style lang="scss" scoped>
.badge--root {
  padding: 2px 8px;
  border-radius: 6px;
  width: max-content;
}
.success-badge {
  background-color: #e7fef0 !important;
  color: #08a045 !important;
}
.error-badge {
  background: #fce9e9;
  color: #bd1e1e;
}
</style>
