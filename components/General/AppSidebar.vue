<template>
  <div class="sidebar">
    <menu-workspace />
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
    <v-divider style="border-color: #eaeaea" />
    <div class="menu-wrapper">
      <p class="s-bold" style="padding-left: 32px">All Bots</p>
      <nuxt-link
        v-for="(item, key) in botList"
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

    <div class="menu-wrapper">
      <p class="s-bold" style="padding-left: 32px">Settings</p>
      <nuxt-link
        v-for="(item, key) in settings"
        :key="key"
        :to="item.link"
        :class="active(item) ? 'nuxt-link-active' : ''"
        class="item item-menu"
      >
        <div class="icon-text">
          <div class="custom-icon">
            <component :is="item.icon" />
          </div>
          <p class="m-semibold">{{ item.name }}</p>
        </div>
      </nuxt-link>
    </div>

    <v-row class="no-gutters px-8" align="center" justify="space-between">
      <v-row no-gutters align="center">
        <v-avatar color="primary" size="40" class="text-white">
          <div v-if="avatar" style="height: 100%; height: 100%">
            <img :src="profile.profile.avatar.url" alt="avatar-sidebar" />
          </div>
          <div v-else>
            <span class="white--text sm-bold">{{
              profile.name | getInitial
            }}</span>
          </div>
        </v-avatar>
        <div class="ml-2" style="max-width: 180px">
          <p
            class="m-bold"
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            {{ profile.name }}
          </p>
          <p
            class="s-regular"
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            {{ profile.email }}
          </p>
        </div>
      </v-row>
      <v-menu v-show="true">
        <template #activator="{ on, attrs }">
          <v-btn v-bind="attrs" icon text v-on="on">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </template>
        <v-card class="mx-auto elevation-0" width="300">
          <v-list dense>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :to="!item.href ? { name: item.name } : null"
              :href="item.href"
              :disabled="item.disabled"
              :target="item.target"
              ripple="ripple"
              rel="noopener"
              @click="item.click"
            >
              <v-list-item-icon v-if="item.icon">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-row>
  </div>
</template>

<script>
import MenuWorkspace from '@/views/workspace/menu-dropdown'

export default {
  name: 'AppSidebar',
  components: { MenuWorkspace },
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
    botList: {
      type: Array,
      default: () => [],
    },
    settings: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      profileBadge: false,
      workSpaceList: [
        {
          name: 'TeamHaloBuilder',
          isActive: true,
        },
        {
          name: 'CS_HaloBuilder',
          isActive: false,
        },
      ],
      items: [
        {
          icon: 'mdi-logout',
          href: '#',
          title: 'Log Out',
          click: () => {
            this.$store.dispatch('auth/authDestroy')
          },
        },
      ],
    }
  },
  computed: {
    profile() {
      return this.$store.state.profile.userProfile
    },
    avatar() {
      return this.profile?.profile?.avatar || ''
    },
  },
  methods: {
    active(item) {
      let boolean = true
      ;(this.$route.path.split('/')[1].toLowerCase() === 'dashboard' ||
        this.$route.path.split('/')[1].toLowerCase() === 'analythics') &&
      item.name.toLowerCase() === 'chat'
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
  .icon-text {
    display: grid;
    grid-template-rows: initial;
    grid-template-columns: 30% 70%;
    width: 90%;
    height: 100%;
    border-bottom: thin solid #fff3;
    align-items: center;
  }
}

.popup-card {
  background: white;
  border: 1px solid #eaeaea;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
}

.workspace-list {
  cursor: pointer;
  &:hover {
    background-color: #f2fcfd;
    color: #1799ac;
  }
}

.custom-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
