<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" :max-width="770">
      <v-card class="dialog-v-card">
        <div class="card-foot">
          <v-row v-if="title === 'Twillio account settings'">
            <v-col cols="10">
              <h2>{{ title }}</h2>
              <p>
                If you don't have a Twillio account, please register <a>here</a>
              </p>
            </v-col>
            <v-col cols="2">
              <div class="verified">
                <v-icon style="width: 13px; height: 13px; color: #08a045"
                  >mdi-checkbox-marked-circle</v-icon
                >
                <p>Verified</p>
              </div>
            </v-col>
          </v-row>
          <v-col v-else cols="10">
            <h2 class="d-flex justify-start">{{ title }}</h2>
          </v-col>
          <v-col v-for="(input, key) in inputList" :key="key">
            <h4 class="d-flex justify-start mb-2">{{ input.label }}</h4>
            <form-text-field v-model="inputText" hide-details />
          </v-col>
          <v-row justify="end">
            <v-col md="3">
              <button-contained-default
                color="#FFFFFF"
                text-color="#1799AC"
                border-color="#1799AC"
                label="Cancel"
                @click="closeDialog"
              />
            </v-col>
            <v-col md="3">
              <button-contained-default
                color="#1799AC"
                text-color="#FFFFFF"
                label="Save"
                @click="saveBtn"
              />
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import FormTextField from '../Form/text-field.vue'
import ButtonContainedDefault from '../../components/Button/default.vue'

export default {
  name: 'ModalContent',
  components: { FormTextField, ButtonContainedDefault },
  props: {
    title: { type: String, default: '' },
    inputList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialog: false,
      inputText: '',
    }
  },
  methods: {
    closeDialog() {
      this.dialog = false
    },
    saveBtn() {
      this.$emit('onClick', this.inputText)
    },
  },
}
</script>

<style lang="scss" scoped>
.card-foot {
    background-color: #f8f9fa;
    padding: 40px;
    color: #262626;
    font-size: 14px;
    font-weight: 600;
    label {
        margin-bottom: 5px;
        display: inline-block;
    }
    button {
        font-weight: 800;
        color: #fff;
        border-radius: 20px;
    }
}
.verified{
    display: grid;
  grid-template-columns: 20% 80%;
    justify-items: center;
    height: 37px;
    border-radius: 6px;
    border: 1px solid #08A045;
    color: #08A045;
}
</style>
