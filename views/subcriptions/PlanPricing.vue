<template>
  <div>
    <v-card class="mx-auto" elevation="0">
      <v-col class="pl-0">
        <h2>Plans and pricing</h2>
        <span style="padding-top: 8px"
          >You are currently subscribed to the Free (Monthly) plan. Upgrade your
          plan to get more features</span
        >
      </v-col>
    </v-card>
    <v-card class="mx-auto" outlined>
      <v-row justify="space-between">
        <v-col class="pa-8">
          <h3 style="color: #aaaaaa">Next payment</h3>
          <h1 style="padding-top: 8px">On 22 March 2022</h1>
        </v-col>
        <v-col class="d-flex justify-end align-center pa-8">
          <button-default label="Manage payments" />
        </v-col>
      </v-row>
    </v-card>
    <plan-cards />
  </div>
</template>
<script>
import PlanCards from '../../components/General/PlanCards.vue'
export default {
  name: 'PlanPricingView',
  components: { PlanCards },
}
</script>

PlanCards
