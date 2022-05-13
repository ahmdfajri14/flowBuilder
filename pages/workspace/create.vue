<template>
  <div>
    <p class="h5-bold mb-12">Workspace</p>
    <div>
      <v-row no-gutters align="start" class="mb-12">
        <v-col cols="4">
          <p class="l-bold">Create New Workspace</p>
        </v-col>
        <v-col cols="8">
          <v-form ref="form" lazy-validation>
            <form-text-field
              v-model="input.workspaceName"
              label="Input name of workspace"
              :rules="rules.workspaceName"
              class="mb-2"
            />
            <button-default
              label="Create New Workspace"
              :loading="loading"
              @click="handleCreateWorkspace"
            />
          </v-form>
        </v-col>
      </v-row>

      <v-divider style="border-color: #eaeaea" class="my-12" />

      <p class="xl-bold mb-8">Current Workspace</p>

      <div class="workspace-row mb-6">
        <icon-others-social-telegram width="48" />
        <div>
          <p class="m-bold mb-1">Bot Tele Indonesia</p>
          <p class="s-regular">1232</p>
        </div>
        <div>
          <p class="m-bold mb-1">12</p>
          <p class="s-regular">Total Bot Users</p>
        </div>
        <div>
          <p class="m-bold mb-1">4</p>
          <p class="s-regular">Active Bot Users</p>
        </div>
        <div>
          <p class="m-bold mb-1">Jilo Putri</p>
          <p class="s-regular">Owner</p>
        </div>
        <v-btn outlined depressed color="primary"
          >Open Bot <v-icon right dark> mdi-chevron-down </v-icon></v-btn
        >
      </div>

      <div class="workspace-row mb-6">
        <icon-others-social-whatsapp width="48" />
        <div>
          <p class="m-bold mb-1">Flow Indonesia</p>
          <p class="s-regular">4512</p>
        </div>
        <div>
          <p class="m-bold mb-1">12</p>
          <p class="s-regular">Total Bot Users</p>
        </div>
        <div>
          <p class="m-bold mb-1">4</p>
          <p class="s-regular">Active Bot Users</p>
        </div>
        <div>
          <p class="m-bold mb-1">Jilo Putri</p>
          <p class="s-regular">Owner</p>
        </div>
        <v-btn outlined depressed color="primary"
          >Open Bot <v-icon right dark> mdi-chevron-down </v-icon></v-btn
        >
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable vue/multi-word-component-names */

export default {
  data: () => ({
    loading: false,
    input: {
      workspaceName: '',
    },
    rules: {
      workspaceName: [(value) => !!value || 'Please enter name of workspace'],
    },
  }),
  methods: {
    async handleCreateWorkspace() {
      if (!this.validate()) {
        this.loading = false
        return
      }
      const payload = {
        data: {
          display_name: this.input.workspaceName,
          logo: 'X',
        },
      }
      this.loadingButton = true
      const res = await this.$api.call('workspace.create', payload)
      this.loadingButton = false
      console.log(res)
    },
    validate() {
      const res = this.$refs.form.validate()
      return res
    },
  },
}
</script>
<style lang="scss" scoped>
.workspace-row {
  align-items: center;
  display: grid;
  grid-template-columns: 40px 1.5fr 1fr 1fr 1fr 10%;
  column-gap: 24px;
  background: #fafafa;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  padding: 24px;
}
::v-deep .v-btn__content {
  text-transform: capitalize !important;
}
</style>
