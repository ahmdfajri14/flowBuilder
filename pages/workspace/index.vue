<template>
  <div>
    <!-- Workspace Info Panel -->
    <div>
      <p class="h5-bold mb-12">Workspace</p>
      <general-tab-section :items="headerTab" @onHandleTab="changeTabs">
        <v-tabs-items v-model="tab">
          <v-tab-item class="py-8">
            <workspace-info />
          </v-tab-item>
          <v-tab-item class="py-8">
            <members-panel />
          </v-tab-item>
          <v-tab-item class="py-8">
            <div>
              <p class="xl-bold">Channel Settings</p>
              <p class="m-regular mb-12">
                Hide the channel or set the maximum bots limit for each channel
              </p>

              <v-row no-gutters class="mb-6">
                <v-col
                  v-for="bot in botChannel"
                  :key="bot.name"
                  cols="3"
                  class="px-2 column-spacing"
                >
                  <v-row no-gutters align="center" class="mb-4">
                    <component :is="bot.icon" class="mr-2" />
                    <p class="s-semibold">{{ bot.name }}</p>
                  </v-row>
                  <form-select-field
                    v-model="input.bot[bot.name.toLowerCase()]"
                    label="Pick a bot qty"
                    :items="listQuantityBot"
                    hide-details
                  />
                </v-col>
              </v-row>

              <button-default label="Send Invitation" />
            </div>
          </v-tab-item>
        </v-tabs-items>
      </general-tab-section>
    </div>
  </div>
</template>

<script>
import * as channel from './static_data/channelSection'
import WorkspaceInfo from '@/views/workspace/info.vue'
import MembersPanel from '@/views/workspace/members-panel.vue'

export default {
  name: 'WorkspacePage',
  components: { WorkspaceInfo, MembersPanel },
  data: () => ({
    listChannel: channel,
    tab: 0,
    headerTab: ['Workspace Info', 'Members', 'Channels'],
    input: {
      name: '',
      timeformat: '',
      timezone: '',
      email: '',
      role: '',
      bot: {
        facebook: '',
        instagram: '',
        telegram: '',
        whatsapp: '',
      },
    },
    list: {
      role: ['Viewer', 'Editor'],
    },
    rules: {
      name: [(v) => !!v || 'Name is required'],
      email: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      timezone: [(v) => !!v || 'Timezone is required'],
      timeformat: [(v) => !!v || 'Timeformat is required'],
      role: [(v) => !!v || 'Role is required'],
    },
  }),
  computed: {
    botChannel() {
      const tempArray = [...this.listChannel.LIST_BOT]
      return tempArray
    },
    listQuantityBot() {
      const tempArray = [...this.listChannel.BOT_QUANTITY_OPTIONS]
      return tempArray
    },
  },
  methods: {
    changeTabs(id) {
      this.tab = id
    },
    update() {
      this.$refs.formWorkspace.validate()
    },
    sendInvitation() {
      this.$refs.formInvitation.validate()
    },
  },
}
</script>

<style lang="scss" scoped>
.upload-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  padding: 48px 24px;

  .icon-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    background: #f2fcfd;
  }
}

.workspace-row {
  align-items: center;
  display: grid;
  grid-template-columns: 10% 1fr 1fr 1fr 10%;
  column-gap: 24px;
  background: #fafafa;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  padding: 24px;
}
</style>
