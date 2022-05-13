<template>
  <div>
    <div class="analytics-top">
      <h1>Analytics</h1>
      <div class="date-range d-flex align-center">
        <v-icon class="pr-4">
          mdi-calendar
        </v-icon>
        <span>{{getDateRange(selectedRange.value)}}</span>
        <v-icon class="px-4">
          mdi-circle-small
        </v-icon>
        <v-select 
          v-model="selectedRange"
          :items="[{ text: 'Last 30 days', value: 30 }, { text: 'Last 14 days', value: 14 }, { text: 'Last 7 days', value: 7 }]" 
          class="date-range-picker" 
          return-object
          hide-details 
          outlined 
          dense
        ></v-select>
      </div>
    </div>
    <v-row justify="space-between">
      <v-col>
        <v-card class="pa-6" outlined>
          <div class="d-flex justify-space-between">
            <span class="m-bold">Total bot users</span>
            <v-icon color="black-100">
              mdi-account-group-outline
            </v-icon>
          </div>
          <div class="d-flex align-end">
            <h1 class="h4-bold pr-2">100</h1>
            <span class="h6-bold mb-2 primary--text">+3</span>
          </div>
          <div>
            <v-icon class="mr-1" color="primary">
              mdi-trending-up
            </v-icon>
            <span class="m-semibold primary--text mr-3">3%</span>
            <span class="m-semibold black-60--text">{{selectedRange.text}}</span>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-6" outlined>
          <div class="d-flex justify-space-between">
            <span class="m-bold">New bot users</span>
            <v-icon color="black-100">
              mdi-account-group-outline
            </v-icon>
          </div>
          <div class="d-flex align-end">
            <h1 class="h4-bold pr-2">20</h1>
            <span class="h6-bold mb-2 primary--text">+10</span>
          </div>
          <div>
            <v-icon class="mr-1" color="primary">
              mdi-trending-up
            </v-icon>
            <span class="m-semibold primary--text mr-3">50%</span>
            <span class="m-semibold black-60--text">{{selectedRange.text}}</span>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-6" outlined>
          <div class="d-flex justify-space-between">
            <span class="m-bold">Received messages</span>
            <v-icon color="black-100">
              mdi-account-group-outline
            </v-icon>
          </div>
          <div class="d-flex align-end">
            <h1 class="h4-bold pr-2">200</h1>
            <span class="h6-bold mb-2 primary--text">+30</span>
          </div>
          <div>
            <v-icon class="mr-1" color="primary">
              mdi-trending-up
            </v-icon>
            <span class="m-semibold primary--text mr-3">30%</span>
            <span class="m-semibold black-60--text">{{selectedRange.text}}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <div class="chart">
      <h2 class="pb-5">Total bot users</h2>
      <chart-line-area
        :chart-options="{ 
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            line: {
              backgroundColor: 'rgba(23, 153, 172, 0.1)',
              borderColor: '#1799AC',
              fill: 'origin'
            },
            point: {
              backgroundColor: 'white',
              pointBorderColor: '#F1441C',
              pointBorderWidth: 3,
              pointRadius: 4,
            }
          },
          scales: {
            x: {
              grid: {
                display: false,
                drawBorder: false,
              },
              time: {
                unit: 'day',
                stepSize: 2,
              }
            },
            y: {
              grid: {
                display: true,
                drawBorder: false,
              }
            }
          },
          plugins: {
            legend: false
          }
        }"
        :chart-data="{
          labels: generateDateArray(),
          datasets: [
            {
              borderColor: '#1799AC',
              data: [
                {x:new Date(new Date().setDate(new Date().getDate() - 5)), y:10}, 
                {x:new Date(new Date().setDate(new Date().getDate() - 4)), y:80}, 
                {x:new Date(new Date().setDate(new Date().getDate() - 3)), y:70},
                {x:new Date(new Date().setDate(new Date().getDate() - 2)), y:20}, 
                {x:new Date(new Date().setDate(new Date().getDate() - 1)), y:40}, 
                {x:new Date(new Date().setDate(new Date().getDate() - 0)), y:50},
              ]
            },
          ],
        }"
        height="50vh"
      />
    </div>
    <v-row>
      <v-col>
        <v-card class="pa-6" outlined>
          <div class="d-flex justify-space-between">
            <span class="m-bold">Sent messages</span>
            <v-icon color="black-100">
              mdi-forum-outline
            </v-icon>
          </div>
          <div class="d-flex align-end">
            <h1 class="h4-bold pr-2">2.4k</h1>
            <span class="h6-bold mb-2 primary--text">+30</span>
          </div>
          <div>
            <v-icon class="mr-1" color="primary">
              mdi-trending-up
            </v-icon>
            <span class="m-semibold primary--text mr-3">50%</span>
            <span class="m-semibold black-60--text">Since yesterday</span>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-6" outlined>
          <div class="d-flex justify-space-between">
            <span class="m-bold">Receive messages</span>
            <v-icon color="black-100">
              mdi-forum-outline
            </v-icon>
          </div>
          <div class="d-flex align-end">
            <h1 class="h4-bold pr-2">2k</h1>
            <span class="h6-bold mb-2 primary--text">+30</span>
          </div>
          <div>
            <v-icon class="mr-1" color="primary">
              mdi-trending-up
            </v-icon>
            <span class="m-semibold primary--text mr-3">50%</span>
            <span class="m-semibold black-60--text">Since yesterday</span>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: 'AnalyticsPage',
    data: () => ({
      selectedRange: { text: 'Last 30 days', value: 30 }
    }),
    methods: {
      getDateRange(range) {
        const now = new Date();
        const prior = new Date(new Date().setDate(now.getDate() - range));

        return `${prior.toLocaleDateString('en-gb', { year: 'numeric', month: 'short', day: 'numeric' })} - ${now.toLocaleDateString('en-gb', { year: 'numeric', month: 'short', day: 'numeric' })}`
      },
      generateDateArray() {
        const arr = [];
        const now = new Date();

        for(let i = 0; i < 7; i++) {
          const prior = new Date(new Date().setDate(now.getDate() - i)).toLocaleDateString('en-gb', { year: 'numeric', month: 'short', day: 'numeric' });

          arr.unshift(prior);
        }

        return arr;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .analytics-top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 48px;
  }

  .chart {
    padding-block: 32px;
  }
</style>