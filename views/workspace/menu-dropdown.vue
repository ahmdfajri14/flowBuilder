<template>
  <v-menu min-width="320px" offset-y>
    <template #activator="{ on, attrs }">
      <button v-bind="attrs" class="profile-badge" v-on="on">
        <v-row class="no-gutters px-8" align="center">
          <v-avatar color="primary" size="40" class="text-white">
            <span
              v-if="activeWorkspace && !activeWorkspace.logo"
              class="white--text font-weight-bold"
              >{{
                activeWorkspace && activeWorkspace.display_name | getInitial
              }}</span
            >
            <div
              v-else-if="activeWorkspace && activeWorkspace.logo"
              style="height: 100%; height: 100%"
            >
              <img
                :src="activeWorkspace.logo.url"
                alt="picture-profile"
                class="image-preview"
              />
            </div>
          </v-avatar>
          <div class="flex-grow-1 ml-2">
            <p class="m-bold">
              {{ activeWorkspace && activeWorkspace.display_name }}
            </p>
            <p class="s-regular">Workspace</p>
          </div>
          <v-icon>mdi-chevron-down</v-icon>
        </v-row>
      </button>
    </template>
    <div class="pt-2 popup-card">
      <v-row
        no-gutters
        align="center"
        justify="space-between"
        class="mb-2 px-4"
      >
        <p class="m-semibold">Workspace</p>
        <a class="xs-bold">See All</a>
      </v-row>
      <a
        v-for="workspace in workspaceData"
        :key="workspace.id62"
        class="text-decoration-none"
        @click="handleChangeWorkspace(workspace.id62)"
      >
        <div
          class="py-3 workspace-list"
          :class="activeWorkspace.id62 === workspace.id62 && 'active-list'"
        >
          <v-row no-gutters align="center" class="px-4">
            <icon-outline-check-default
              class="mr-2"
              :fill="
                activeWorkspace.id62 === workspace.id62 ? '#08A045' : 'none'
              "
            />
            <v-avatar color="primary" size="26" class="text-white mr-2">
              <span v-if="!workspace.logo" class="white--text xxs-bold">{{
                workspace.display_name | getInitial
              }}</span>
              <div
                v-else-if="workspace.logo"
                style="height: 100%; height: 100%"
              >
                <img
                  :src="workspace.logo.url"
                  alt="picture-profile"
                  class="image-preview"
                />
              </div>
            </v-avatar>
            <p class="s-semibold">{{ workspace.display_name }}</p>
          </v-row>
        </div>
      </a>
      <div class="py-3" style="background: #f0f4fe; cursor: pointer">
        <nuxt-link to="/workspace/create" class="text-decoration-none">
          <v-row no-gutters align="center" class="px-4">
            <icon-outline-plus-default fill="#0933A6" class="mr-2" />
            <p class="s-semibold" style="color: #0933a6">Add New Workspace</p>
          </v-row>
        </nuxt-link>
      </div>
    </div>
  </v-menu>
</template>
<script>
/* eslint-disable vue/multi-word-component-names */

export default {
  data: () => ({}),
  computed: {
    activeWorkspace() {
      return this.$store.state.workspace.currentWorkspace
    },
    currentWorkspaceId() {
      return this.$route.query.workspace_id
    },
    workspaceData() {
      return this.$store.state.workspace.list
    },
  },
  async mounted() {},
  methods: {
    // async fetchData() {
    //   const headers = {
    //     headers: `Token ${this.$store.state.auth.userToken}`,
    //   }

    //   const res = await this.$api.call('workspace.get', headers)
    //   const { data } = res
    //   this.workspaceData = data.map((item, index) => {
    //     if (index === 0) this.handleChangeWorkspace(item.id62)
    //     return {
    //       ...item,
    //       isActive: false,
    //     }
    //   })
    // },
    handleChangeWorkspace(id) {
      this.$store.dispatch('workspace/changeCurrentWorkspace', id)
    },
  },
}
</script>
<style lang="scss" scoped>
button.profile-badge {
  text-align: left;
  height: 48px;
  text-decoration: none;
  cursor: pointer;
  color: #787878;
  background-color: transparent;
  transition: ease all 0.3s;
  text-decoration: none;
  width: 100%;

  &:hover {
    background-color: #f2fcfd;
    color: #1799ac;
    &:after {
      height: 1.5px;
    }
  }
}
.popup-card {
  background: white;
  border: 1px solid #eaeaea;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
}
.active-list {
  background: #f2fcfd;
  color: #1799ac;
}
</style>
