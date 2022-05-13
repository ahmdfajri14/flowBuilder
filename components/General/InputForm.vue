<template>
  <div>
    <div class="general-form">
      <v-row v-for="item in items" :key="item">
        <v-col cols="3">
          <h3>
            {{ item.label }}
          </h3>
        </v-col>
        <v-col cols="9">
          <v-text-field
            :label="item.placeholder"
            :rules="[item.validation]"
            solo
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InputForm',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      rules: {
        required: (value) => !!value || 'It is Required',
        numeric: (v) => /^[0-9]+$/.test(v) || 'Value must number',
        zero: (v) => v > 0 || 'Bonus tidak boleh nol',
        counter: (v) => v <= 100 || 'Max 100%',
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.general-form{
    margin: 40px;
}
</style>