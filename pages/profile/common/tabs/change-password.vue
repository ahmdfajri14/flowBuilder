<template>
  <v-form ref="password">
    <div>
      <v-row no-gutters align="center" class="mb-8">
        <v-col cols="4">
          <p class="l-bold">Current Password</p>
        </v-col>
        <v-col cols="8">
          <form-text-field
            v-model="input.current_password"
            label="Input current password"
            :type="hint.current_password ? 'text' : 'password'"
            :rules="rules.current_password"
            :append-icon="hint.current_password ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="hint.current_password = !hint.current_password"
          />
        </v-col>
      </v-row>

      <v-row no-gutters align="center" class="mb-8">
        <v-col cols="4">
          <p class="l-bold">Enter Your New Password</p>
        </v-col>
        <v-col cols="8">
          <form-text-field
            v-model="input.new_password"
            label="Input new password"
            :type="hint.new_password ? 'text' : 'password'"
            :rules="rules.new_password"
            :append-icon="hint.new_password ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="hint.new_password = !hint.new_password"
          />
        </v-col>
      </v-row>

      <v-row no-gutters align="center" class="mb-8">
        <v-col cols="4">
          <p class="l-bold">Confirm New Password</p>
        </v-col>
        <v-col cols="8">
          <form-text-field
            v-model="input.confirm_password"
            label="Confirm new password"
            :type="hint.confirm_password ? 'text' : 'password'"
            :rules="[...rules.confirmation_password, ...matchPasswordRules]"
            :append-icon="
              hint.confirmation_password ? 'mdi-eye' : 'mdi-eye-off'
            "
            @click:append="
              hint.confirmation_password = !hint.confirmation_password
            "
          />
        </v-col>
      </v-row>

      <v-row no-gutters justify="end">
        <button-default label="Submit" @click="handleChangePassword" />
      </v-row>
    </div>
  </v-form>
</template>
<script>
/* eslint-disable camelcase */

export default {
  data: () => ({
    hint: {
      current_password: false,
      new_password: false,
      confirmation_password: false,
    },
    input: {
      current_password: '',
      new_password: '',
      confirmation_password: '',
    },
    rules: {
      current_password: [
        (value) => !!value || 'Please enter your current password',
      ],
      new_password: [
        (value) => !!value || 'Please enter a new password',
        (value) =>
          (value && value.length >= 6) || 'Password minimum 6 characters',
      ],
      confirmation_password: [
        (value) => !!value || 'Please enter password confirmation',
      ],
    },
  }),
  computed: {
    matchPasswordRules() {
      return [
        (value) =>
          (value && value === this.input.new_password) ||
          'Password do not match',
      ]
    },
  },
  methods: {
    async handleChangePassword() {
      if (!this.validate()) {
        this.loading = false
        return
      }
      const { current_password, new_password } = this.input
      const payload = {
        headers: `Token ${this.$store.state.auth.userToken}`,
        data: {
          current_password,
          new_password,
        },
      }
      const res = await this.$api.call('auth.changePassword', payload)
      console.log(res)
    },
    validate() {
      const res = this.$refs.password.validate()
      return res
    },
  },
}
</script>
