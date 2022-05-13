<template>
  <v-app>
    <v-navigation-drawer
      v-if="!hide"
      floating
      app
      width="250px"
      color="#FAFAFA"
    >
      <flowy-sidebar :menu="myMenu" />
    </v-navigation-drawer>
    <tool-bar
      ref="toolbarRef"
      class="app--toolbar"
      @hideSidebar="hideSidebar"
    />
    <v-main
      :style="`${
        hide ? ' padding: 76px 0px 0px 0px' : 'padding: 76px 0px 0px 250px'
      }; background-color: #eaeaea`"
    >
      <div class="root">
        <nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import FlowySidebar from '../components/General/FlowySidebar.vue'
import ToolBar from '../components/General/ToolBar.vue'

import * as menu from '@/shared/menu'
export default {
  name: 'FlowBuilder',
  components: { FlowySidebar, ToolBar },
  data() {
    return {
      flowyMenu: menu,
      menuShown: [],
      hide: false,
    }
  },
  computed: {
    myMenu() {
      const menuDefault = this.flowyMenu.MENU_FLOWY
      const menuShown = []
      for (let indexMenu = 0; indexMenu < menuDefault.length; indexMenu++) {
        const elementMenu = menuDefault[indexMenu]
        menuShown.push(elementMenu)
      }
      return menuShown
    },
  },
  methods: {
    hideSidebar() {
      this.hide = !this.hide
    },
  },
}
</script>


