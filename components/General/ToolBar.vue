<template>
  <div>
    <v-toolbar
      flat
      height="75"
      sheet_to_formulae
      class="app-toolbar white"
      style="padding: 0 32px 0 0"
    >
      <v-row justify="space-between">
        <v-col md="4">
          <div class="brand-logo">
            <v-icon style="margin-right: 16px" @click="handleDrawerToggle"
              >mdi-chevron-left</v-icon
            >
            <v-avatar color="primary" size="40" class="text-white">
              <span class="white--text font-weight-bold">TH</span>
            </v-avatar>
            <v-col>
              <h3>Team DMK</h3>
              <span style="color: #120309; font-size: 16px">Workspace</span>
            </v-col>
            <div class="custom-icon" @click="hideSidebar">
              <component :is="`icon-others-show-hide-sidebar`" />
            </div>
          </div>
        </v-col>
        <v-col md="4">
          <div>
            <v-row justify="end">
              <v-col md="4" class="mt-3">
                <button-default
                  prepend-icon="icon-outline-preview-triangle"
                  label="Preview"
                />
              </v-col>
              <v-col md="4" class="mt-3">
                <button-default
                  color="#0933A6"
                  text-color="#FFFFFF"
                  border-color="#0933A6"
                  label="Publish flow"
                />
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  data() {
    return {
      searchKey: '',
      items: [
        {
          icon: 'account_circle',
          href: '#',
          title: 'User Profile',
          click: () => {},
        },
        {
          icon: 'settings',
          href: '#',
          title: 'Settings',
          click: () => {},
        },
        {
          icon: 'power_settings_new',
          href: '#',
          title: 'Log Out',
          click: () => {
            this.$store.dispatch('auth/authDestroy')
          },
        },
      ],
      messageHead: '',
      message: '',
    }
  },

  computed: {
    drawerState() {
      return this.$store.getters['app/getDrawer']
    },
    user() {
      let dataUser = this.$store.getters['auth/getUserData']
      if (!dataUser) {
        dataUser = {
          fullName: '',
          email: '',
        }
      }
      return dataUser
    },

    showSearch() {
      if (this.$route.name === 'agent') {
        return true
      }
      if (this.$route.name === 'list') {
        return true
      }
      if (this.$route.name === 'commercial-lines') {
        return true
      }
      if (this.$route.name === 'partner') {
        return true
      }
      if (this.$route.name === 'alternatif') {
        return true
      }
      return false
    },

    wording() {
      return 'Search Here...'
    },
    searchKeyStore() {
      return this.$store.getters['app/getSearchKey']
    },
  },

  watch: {
    searchKeyStore(newValue) {
      // this.getAllList();
      if (!newValue) this.searchKey = ''
    },
  },

  methods: {
    hideSidebar() {
      console.log('aaa')
      this.$emit('hideSidebar')
    },
    searchItem(data) {
      if (data.length > 3 || data.length < 1) {
        this.$store.dispatch('app/updateSearch', data)
      } else {
        this.messageHead = 'Invalid Search'
        this.message = 'Search should be 4 characters or more'
        this.$refs.validationDialog.dialog = true
      }
    },

    handleDrawerToggle() {
      const drawer = !this.drawerState
      this.$store.dispatch('app/toggleDrawer', drawer)
    },

    handleFullScreen() {
      const doc = window.document
      const docEl = doc.documentElement

      const requestFullScreen =
        docEl.requestFullscreen ||
        docEl.mozRequestFullScreen ||
        docEl.webkitRequestFullScreen ||
        docEl.msRequestFullscreen
      const cancelFullScreen =
        doc.exitFullscreen ||
        doc.mozCancelFullScreen ||
        doc.webkitExitFullscreen ||
        doc.msExitFullscreen

      if (
        !doc.fullscreenElement &&
        !doc.mozFullScreenElement &&
        !doc.webkitFullscreenElement &&
        !doc.msFullscreenElement
      ) {
        requestFullScreen.call(docEl)
      } else {
        cancelFullScreen.call(doc)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
::placeholder {
    color: #c8c8c8;
}
.app--toolbar {
    border-bottom: thin solid #e0e0e0;
    position: fixed;
    left: 0;
    right: 0;
    z-index: 9999;
    .brand-logo {
        width: 286px;
        min-width: 256px;
        height: 76px;
        display: flex;
        align-items: center;
        padding-left: 32px;
    }
}
.v-toolbar {
    box-shadow: none;
}
.v-form {
    width: 100%;
    height: 100%;
    padding: 4px 0 0 32px;
    border-right: thin solid #e5e5e5;
    margin-right: 32px;
    display: flex;
}
.form__container {
    position: relative;
}
.form__search {
    width: 100%;
    font-size: 22px;
    font-weight: normal;
    position: relative;
    border-right: 1.4px solid #f1f1f1;
    font-family: 'Lato';
}
.form__search:focus {
    outline: none;
}
.form__icon {
    position: absolute;
    cursor: pointer;
    right: 32px;
    transform: translate(0, -50%);
    top: 50%;
    font-size: 30px;
    &:after {
        left: 0;
    }
}
.userMenu {
    padding-left: 28px;
}
.userMenuButton {
    position: absolute;
    width: 100%;
}
.userProfile {
    margin: 0px;
    margin-right: 10px;
    font-family: 'lato';
}
.userProfile_name {
    font-size: 16px;
    font-weight: bold;
    line-height: 1.25;
    color: #1955b9;
}
.userProfile_role {
    font-size: 14px;
    line-height: 1;
    // letter-spacing: 0.7px;
    color: #bfbfbf;
    font-weight: normal;
}
</style>
