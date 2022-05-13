<template>
  <div class="sidebar">
    <div class="menu-wrapper">
      <nuxt-link
        v-for="(item, key) in menu"
        :key="key"
        :to="item.link"
        :class="active(item) ? 'nuxt-link-active' : ''"
        class="item item-menu"
      >
        <div class="icon-text" @click="handleRoute(item)">
          <div class="custom-icon">
            <component :is="item.icon" />
          </div>
          <p class="m-semibold">{{ item.name }}</p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlowySidebar',
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    active(item) {
      let boolean = true
      ;(this.$route.path.split('/')[1].toLowerCase() === 'flow' ||
        this.$route.path.split('/')[1].toLowerCase() === 'flow-bot') &&
      item.name.toLowerCase() === 'flow-chat'
        ? (boolean = true)
        : (boolean = false)
      return boolean
    },
  },
}
</script>
<style lang="scss" scoped>
.menu-wrapper {
  margin: 32px 0px;
}
.sidebar {
  width: 100%;
  height: 100%;
  z-index: 5;
  padding: 48px 0px;
  border-right: 1px solid #eaeaea;
  .item {
    height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    flex-direction: column;
    cursor: pointer;
    color: #787878;
    span {
      font-size: 12px;
      font-weight: bold;
      line-height: 1.1;
      margin-top: 3px;
      text-align: left;
      padding-left: 4px;
    }

    &.item-menu {
      background-color: transparent;
      transition: ease all 0.3s;
      text-decoration: none;

      &:hover,
      &:not(.nuxt-link-active):active {
        background-color: #f2fcfd;
        color: #1799ac;
        &:after {
          height: 1.5px;
        }
      }

      &.nuxt-link-active {
        background-color: #f2fcfd;
        color: #1799ac;
        .icon-active {
          color: #1799ac !important;
        }
        .icon {
          color: #1799ac;
        }
      }
    }
  }
}
  .icon-text {
    display: grid;
    grid-template-rows: initial;
    grid-template-columns: 30% 70%;
    width: 90%;
    height: 100%;
    border-bottom: thin solid #fff3;
    align-items: center;
  }

.custom-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
