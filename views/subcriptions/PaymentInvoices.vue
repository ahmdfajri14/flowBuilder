<template>
  <div>
    <v-card class="mx-auto" elevation="0">
      <v-col class="pl-0">
        <h2>Payment, billing, and invoices</h2>
        <span style="padding-top: 8px"
          >Update your billing details and address</span
        >
      </v-col>
    </v-card>
    <div class="payment-info">
      <v-form lazy-validation>
        <v-row no-gutters align="center" class="mb-6">
          <v-col cols="4">
            <p class="l-bold">Email Address</p>
            <span>Where should invoice</span>
          </v-col>
          <v-col cols="8">
            <form-text-field
              v-model="input.email"
              label="Input email"
              class="mt-2"
              :rules="rules.email"
              style="height: 60px"
            />
            <p style="color: #aaaaaa; font-size: 12px">Current email address</p>
          </v-col>
        </v-row>
        <v-row no-gutters align="center" class="mb-6">
          <v-col cols="4">
            <p class="l-bold">Billing Information</p>
            <span>This information will appear on all of your receipts.</span>
          </v-col>
          <v-col cols="8">
            <form-text-field
              v-model="input.info"
              height="138px"
              label="Company name"
              class="mt-2"
              :rules="rules.info"
              style="height: 138px"
            />
            <p style="color: #aaaaaa; font-size: 12px">
              Do not include any confidential or financial information such as
              credit card numbers.
            </p>
          </v-col>
        </v-row>
      </v-form>
    </div>
    <v-card class="mx-auto" elevation="0">
      <h3>Billing history</h3>
      <tab-section :items="paymentTabs" @onHandleTab="fetchTabs">
        <table-data
          v-if="currentTab == 0"
          :model-data-table="modelDataTable"
          :item-list="itemFiltered"
          :loading-table="loading"
        />
        <table-data
          v-if="currentTab == 1"
          :model-data-table="modelDataTable"
          :item-list="itemFiltered"
          :loading-table="loading"
        />
      </tab-section>
    </v-card>
  </div>
</template>
<script>
import TabSection from '../../components/General/TabSection.vue'
import TableData from '../../components/General/TableData.vue'
export default {
  name: 'PaymentInvoicesView',
  components: {
    TableData,
    TabSection,
  },
  data() {
    return {
      currentTab: 0,
      input: {
        email: 'adam@newmember.co',
        info: '',
      },
      rules: {
        email: [
          (v) => !!v || 'E-mail is required',
          (v) => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        info: [(v) => !!v || 'Info is required'],
      },
      modelDataTable: {
        headers: [
          { text: 'Payout invoice', value: 'invoice' },
          { text: 'Amount', value: 'amount' },
          { text: 'Created Date', value: 'createDate' },
          { text: 'Paid at', value: 'paidDate' },
          {
            text: 'Status',
            value: 'status',
          },
          { text: '', value: 'button' },
        ],
        page: 1,
        pageCount: 0,
        itemsPerPage: 25,
        total: 0,
      },
      loading: false,
      unpaidTrx: [
        {
          invoice_number: 'INV-97084',
          amount: 83000,
          requested_date: '14 Feb 2022',
          status: 'Waiting for payment',
          paid_date: '22 Feb 2022',
        },
        {
          invoice_number: 'INV-97084',
          amount: 83000,
          requested_date: '14 Feb 2022',
          status: 'Paid',
          paid_date: '22 Feb 2022',
        },
      ],
    }
  },
  computed: {
    paymentTabs() {
      return ['Unpaid', 'Paid']
    },
    itemFiltered() {
      const transactionList = this.unpaidTrx
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.modelDataTable.total = (transactionList || []).length
      const listItem = []
      for (
        let indexAgent = 0;
        indexAgent < transactionList.length;
        indexAgent++
      ) {
        const trx = transactionList[indexAgent]
        const itemData = {
          invoice: trx.invoice_number,
          amount: trx.amount,
          paidDate: trx.paid_date,
          button: {
            status: 'BUTTON',
            color: '#1799AC',
            action: [
              {
                text: 'Continue to payment',
                value: () => {
                  window.alert('function button')
                },
              },
            ],
          },
          status: {
            type: 'icon',
            icon:
              trx.status === 'Paid' ? 'mdi-check-circle' : 'mdi-alert-circle',
            text: trx.status,
            color: trx.status === 'Paid' ? '#08A045' : '#6E5C29',
          },
          createDate: trx.requested_date,
        }
        listItem.push(itemData)
      }
      return listItem
    },
  },
  methods: {
    fetchTabs(id) {
      this.currentTab = id
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  thead {
    background-color: #eaeaea !important;
    th {
      color: #120309 !important;
    }
  }
  td {
    color: #120309 !important;
  }
}
.payment-info {
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 48px;
}
</style>
