<template>
  <div>
    <header-content title="Plans" />
    <tab-section :items="subscriptionTabs" @onHandleTab="fetchTabs">
      <plan-pricing v-if="currentTab == 0" />
      <payment-invoices v-else />
    </tab-section>
  </div>
</template>

<script>
import HeaderContent from '../../components/General/HeaderContent.vue'
// import InputForm from '../../components/General/InputForm.vue'
import TabSection from '../../components/General/TabSection.vue'
import PlanPricing from '../../views/subcriptions/PlanPricing.vue'
import PaymentInvoices from '../../views/subcriptions/PaymentInvoices.vue'

export default {
  name: 'SubscriptionPage',
  components: { TabSection, HeaderContent, PlanPricing, PaymentInvoices },
  data() {
    return {
      currentTab: 0,
    }
  },
  computed: {
    subscriptionTabs() {
      return ['Plans and pricing', 'Payment, billing, and invoice']
    },
    form() {
      return [
        {
          label: 'Name',
          placeholder: 'Enter your name here',
        },
        {
          label: 'Name',
          placeholder: 'Enter your name here',
        },
        {
          label: 'Name',
          placeholder: 'Enter your name here',
        },
      ]
    },
  },
  mounted() {},
  methods: {
    fetchTabs(id) {
      this.currentTab = id
    },
  },
}
</script>
