<template>
  <div>
    <p class="xl-bold mb-1">Send Invitation</p>
    <p class="m-regular mb-6">
      Adding a new member will add additional charge to your current plan
      <br />
      (the amount will be prorated for the current billing cycle)
    </p>

    <v-form ref="formInvitation" lazy-validation>
      <v-row no-gutters align="center" class="mb-6">
        <v-col cols="4">
          <p class="l-bold">Email Address</p>
        </v-col>
        <v-col cols="8">
          <form-text-field
            v-model="input.email"
            label="Input Email"
            :rules="rules.email"
          />
        </v-col>
      </v-row>
      <v-row no-gutters align="center" class="mb-6">
        <v-col cols="4">
          <p class="l-bold">Role</p>
        </v-col>
        <v-col cols="8">
          <form-select-field
            v-model="input.role"
            :items="list.role"
            label="Pick a role"
            :rules="rules.role"
          />
        </v-col>
      </v-row>
    </v-form>
    <v-row no-gutters justify="end">
      <button-default label="Send Invitation" @click="sendInvitation" />
    </v-row>

    <v-divider class="my-12" />

    <p class="xl-bold mb-8">Workspace Members</p>
    <div class="workspace-row mb-6">
      <v-avatar color="primary" size="48">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>
      <div>
        <p class="m-bold mb-1">Dwiky Saputra (You)</p>
        <p class="s-regular">Name</p>
      </div>
      <div>
        <p class="m-bold mb-1">adi@gmail.com</p>
        <p class="s-regular">Email</p>
      </div>
      <div>
        <p class="m-bold mb-1">Owner</p>
        <p class="s-regular">Role</p>
      </div>
      <div class="text-right">
        <v-btn icon>
          <icon-outline-pencil-line />
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MemberPanel',
  data: () => ({
    input: {
      email: '',
      role: '',
    },
    list: {
      role: ['Viewer', 'Editor'],
    },
    rules: {
      email: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      role: [(v) => !!v || 'Role is required'],
    },
  }),
  methods: {
    sendInvitation() {
      this.$refs.formInvitation.validate()
    },
  },
}
</script>
<style lang="scss" scoped>
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
