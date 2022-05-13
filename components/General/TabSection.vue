<template>
  <div>
    <div class="container-custom">
      <v-col style="padding: 0px !important; margin: 0px !important">
        <v-tabs
          v-model="tab"
          background-color="transparent"
          active-class="active"
          color="#1799AC"
          grow
        >
          <v-tab
            v-for="(item, index) in items"
            :key="index"
            @click="currentTab(index)"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </v-col>
    </div>
    <v-tabs-items v-model="tab" style="margin-top: 48px">
      <v-tab-item v-for="(item, index) in items" :key="index">
        <slot></slot>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
export default {
  name: 'TabSection',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tab: null,
    }
  },
  methods: {
    currentTab(id) {
      this.$emit('onHandleTab', id)
    },
  },
}
</script>

<style lang="scss" scoped>
.container-custom {
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  height: auto;
  padding: 8px 16px !important;
  margin: 0px !important;
}
.active {
  background-color: #f2fcfd;
}
::v-deep {
  .v-tab {
    text-transform: none !important;
    flex: none !important;
    font-size: 16px !important;
    letter-spacing: 0 !important;
  }
  .v-tabs-slider {
    background-color: transparent !important;
  }
}
</style>
