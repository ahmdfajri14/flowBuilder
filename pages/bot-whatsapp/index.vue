<template>
  <div>
    <header-content title="WhatsApp" />
    <div class="filter-section">
      <v-row>
        <v-col cols="6">
          <v-form
            class="form__container"
            @submit.prevent="searchItem(searchKey)"
          >
            <input
              v-model="searchKey"
              placeholder="Search bot name"
              class="form__search"
            />
            <v-icon class="form__icon" @click="searchItem(searchKey)"
              >mdi-magnify</v-icon
            >
          </v-form>
        </v-col>
        <v-col md="4">
          <button-contained-default
            prepend-icon="icon-outline-gear-six"
            class="ml-16"
            color="#FFFFFF"
            label="Configure settings"
            text-color="#1799AC"
            border-color="#1799AC"
            @click="showModalConfig"
          />
        </v-col>
        <v-col md="2">
          <button-contained-default
            prepend-icon="icon-outline-plus-line"
            color="#1799AC"
            text-color="#FFFFFF"
            label="Add number"
            @click="showModalNumber"
          />
        </v-col>
      </v-row>
    </div>
    <div
      v-for="(item, key) in botWhatsapp"
      :key="key"
      class="workspace-row mb-6"
    >
      <div
        class="status"
        :style="
          item.isActive
            ? `background-color: #26C485;`
            : `background-color: #BD1E1E;`
        "
      >
        <p>{{ item.isActive ? 'Active' : 'Paused' }}</p>
      </div>
      <div>
        <component :is="`icon-others-whats-app`" />
      </div>
      <div>
        <p class="m-bold mb-1">{{ item.name }}</p>
        <p class="s-regular">{{ item.phone }}</p>
      </div>
      <div>
        <p class="m-bold mb-1">{{ item.date }}</p>
        <p class="s-regular">Last edited</p>
      </div>
      <div>
        <p class="m-bold mb-1">{{ item.users }}</p>
        <p class="s-regular">Total users</p>
      </div>
      <div>
        <p class="m-bold mb-1">{{ item.bot }}</p>
        <p class="s-regular">Total flow</p>
      </div>
      <div class="text-right">
        <v-btn
          depressed
          :style="`color: #1799AC !important; border: 1px solid #1799AC`"
          :color="color"
          @click="select(key)"
        >
          <p>Open bot</p>
          <v-divider class="mx-3" vertical></v-divider>
          <v-menu origin="center center" transition="scale-transition" bottom>
            <v-toolbar-title slot="activator">
              <v-icon dark>mdi-chevron-down</v-icon>
            </v-toolbar-title>

            <v-list>
              <v-list-item v-for="(dropdown, i) in items" :key="i">
                <v-list-item-title>{{ dropdown }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </div>
    </div>
    <modal-content
      ref="configModal"
      title="Twillio account settings"
      :input-list="configInput"
    />
    <modal-content
      ref="numberModal"
      title="Add new WhatsApp number"
      :input-list="numberInput"
    />
  </div>
</template>

<script>
import HeaderContent from '../../components/General/HeaderContent.vue'
import ModalContent from '../../components/General/ModalContent.vue'
import ButtonContainedDefault from '../../components/Button/default.vue'
export default {
  name: 'BotWhatsappPage',
  components: { HeaderContent, ModalContent, ButtonContainedDefault },
  data() {
    return {
      items: ['New Bundle', 'Merge Bundles'],
      option: 'New Bundle',
      searchKey: '',
      configInput: [
        {
          label: 'Account SSID',
          value: 'account',
        },
        {
          label: 'Auth Token',
          value: 'token',
        },
      ],
      numberInput: [
        {
          label: 'WhatsApp number',
          value: 'account',
        },
      ],
      botWhatsapp: [
        {
          isActive: true,
          name: 'Ketua DKM',
          phone: '+62819555860',
          date: '15 March, 2022 1:58 PM',
          users: 12,
          bot: 4,
        },
        {
          isActive: false,
          name: 'Flow Faedah Foundation',
          phone: '+62819555860',
          date: '15 March, 2022 1:58 PM',
          users: 12,
          bot: 4,
        },
      ],
    }
  },
  computed: {},
  mounted() {},
  methods: {
    showModalConfig() {
      this.$refs.configModal.dialog = true
    },
    select(id) {
      this.$router.push(`/flow/builder/${id}`)
    },
    showModalNumber() {
      this.$refs.numberModal.dialog = true
    },
    searchItem(key) {
      console.log(key, 'key')
    },
  },
}
</script>

<style lang="scss" scoped>
.filter-section{
    margin-bottom: 32.5px;
}
.v-form {
    width: 100%;
    height: 100%;
    border-right: thin solid #e5e5e5;
    margin-right: 32px;
    display: flex;
}
.form__container {
    max-width: 343px;
    max-height: 48px;
    position: relative;
    border: 0.5px solid #EAEAEA;
    border-radius: 6px;
}
.form__search {
     position: absolute;
         left: -2px;
    width: 100%;
    font-size: 22px;
    font-weight: normal;
    position: relative;
        padding: 10px;
    border-right: 1.4px solid #f1f1f1;
    font-family: 'Lato';
}
.form__search:focus {
    outline: none;
}
.form__icon {
    position: absolute;
    cursor: pointer;
        padding: 10px;
    right: -2px;
    transform: translate(0, -50%);
    top: 50%;
    font-size: 30px;
    &:after {
        left: 0;
    }
}
.workspace-row {
  align-items: center;
  display: grid;
  grid-template-columns: 100px 21px 200px auto 80px 80px auto;
  column-gap: 24px;
  background: #fafafa;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  padding: 24px;
}
.status{
    width: 80px;
    height: 37px;
    border-radius: 6px;
    padding: 8px 12px;
    text-align: center;
    font-weight: bold;
    color: #f1f1f1;
;
}
.v-btn {
  border-radius: 6px !important;
  letter-spacing: 0px !important;
}
.v-btn:not(.v-btn--round).v-size--default {
  min-width: 140px;
  height: 44px;
}
::v-deep .v-btn__content {
  text-transform: capitalize !important;
}
</style>
