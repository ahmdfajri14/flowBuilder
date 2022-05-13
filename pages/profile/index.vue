<template>
  <div>
    <!-- User Profile Info Panel -->
    <div>
      <p class="h5-bold mb-12">User Profile</p>
      <general-tab-section :items="headerTab" @onHandleTab="changeTabs">
        <v-tabs-items v-model="tab">
          <v-tab-item class="py-8">
            <tab-account-settings />
          </v-tab-item>
          <v-tab-item class="py-8">
            <tab-change-password />
          </v-tab-item>
        </v-tabs-items>
      </general-tab-section>
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import { AlertUtils } from '../../mixins/alert-utils'
import TabChangePassword from './common/tabs/change-password.vue'
import TabAccountSettings from './common/tabs/account-settings.vue'

export default {
  name: 'ProfileSettingsPage',
  components: { TabChangePassword, TabAccountSettings },
  mixins: [AlertUtils],
  data: () => ({
    tab: 0,
    headerTab: ['Personal Info', 'Password'],
  }),
  computed: {
    botChannel() {
      const tempArray = []
      return tempArray
    },
    listQuantityBot() {
      const tempArray = []
      return tempArray
    },
  },
  methods: {
    changeTabs(id) {
      this.tab = id
    },
  },
}
</script>
