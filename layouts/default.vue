<template>
  <v-app>
    <v-navigation-drawer floating app width="350px" color="#FAFAFA">
      <app-sidebar :menu="myMenu" :bot-list="botMenu" :settings="settingMenu" />
    </v-navigation-drawer>
    <v-main style="padding: 0px 0px 0px 350px">
      <div class="root">
        <nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import * as menu from '@/shared/menu'
import AppSidebar from '@/components/General/AppSidebar'

export default {
  name: 'LayoutDefault',
  components: {
    AppSidebar,
  },
  data() {
    return {
      displayMenu: menu,
      menuShown: [],
    }
  },
  computed: {
    myMenu() {
      const menuDefault = this.displayMenu.MENU_DEFAULT
      const menuShown = []
      for (let indexMenu = 0; indexMenu < menuDefault.length; indexMenu++) {
        const elementMenu = menuDefault[indexMenu]
        menuShown.push(elementMenu)
      }
      return menuShown
    },
    botMenu() {
      const botList = [...this.displayMenu.LIST_BOT]
      return botList
    },
    settingMenu() {
      const settings = [...this.displayMenu.SETTINGS]
      return settings
    },
  },
}
</script>

<style lang="scss" scoped>
.root {
  padding: 68px 56px 56px 56px;
}
</style>
