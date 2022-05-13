<template>
  <div>
    <div class="mb-12">
      <p class="h5-bold mb-2">Welcome, Dwiky!</p>
      <p class="l-regular mb-2">Here’s your summary</p>
      <p class="l-regular">
        You have 1 bots replied 17 messages to 1 bot users in last 30 days.
      </p>
    </div>
    <!-- First Section -->
    <v-row no-gutters class="mb-6">
      <v-col cols="6" class="pa-0 pr-6">
        <div class="wrapper--border">
          <v-row no-gutters align="center">
            <v-col cols="6" class="pa-0">
              <v-row no-gutters align="center" class="mb-3">
                <icon-outline-user-three fill="#120309" class="mr-2" />
                <p class="s-semibold">Total Bot Users</p>
              </v-row>
              <v-row no-gutters align="center" class="mb-3">
                <p class="h5-bold mr-2">100</p>
                <p class="l-bold primary--text">+30</p>
              </v-row>
              <v-row no-gutters align="center">
                <icon-outline-trend-up fill="#1799AC" class="mr-2" />
                <p class="s-semibold primary--text mr-2">30%</p>
                <p class="s-semibold black-60--text mr-2">Since Yesterday</p>
              </v-row>
            </v-col>
            <v-col cols="6" class="pa-0">
              <chart-line-area />
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="6" class="pa-0">
        <div class="wrapper--border">
          <v-row no-gutters align="center">
            <v-col cols="6" class="pa-0">
              <v-row no-gutters align="center" class="mb-3">
                <icon-outline-user-three fill="#120309" class="mr-2" />
                <p class="s-semibold">Active Bot Users</p>
              </v-row>
              <v-row no-gutters align="center" class="mb-3">
                <p class="h5-bold mr-2">642</p>
                <p class="l-bold error--text">-64</p>
              </v-row>
              <v-row no-gutters align="center">
                <icon-outline-trend-down fill="#F1441C" class="mr-2" />
                <p class="s-semibold error--text mr-2">-64</p>
                <p class="s-semibold black-60--text mr-2">Last 30 Days</p>
              </v-row>
            </v-col>
            <v-col cols="6" class="pa-0">
              <chart-line-area />
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <!-- Second Section -->
    <div class="wrapper--border mb-6">
      <v-row no-gutters align="center" justify="space-between" class="mb-5">
        <p class="s-semibold">Bots by Channel</p>
        <p class="s-regular">View All</p>
      </v-row>
      <v-row no-gutters>
        <v-col cols="3" class="pr-6" style="border-right: 2px solid #eaeaea">
          <v-row no-gutters align="center">
            <v-col cols="6">
              <p class="h5-bold mb-2">10</p>
              <v-row no-gutters align="center">
                <icon-others-social-facebook
                  width="20"
                  height="20"
                  class="mr-1"
                />
                <p class="s-regular">Facebook</p>
              </v-row>
            </v-col>
            <v-col cols="6">
              <chart-line-area height="100px" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="3" class="px-6" style="border-right: 2px solid #eaeaea">
          <v-row no-gutters align="center">
            <v-col cols="6">
              <p class="h5-bold mb-2">10</p>
              <v-row no-gutters align="center">
                <icon-others-social-instagram
                  width="20"
                  height="20"
                  class="mr-1"
                />
                <p class="s-regular">Instagram</p>
              </v-row>
            </v-col>
            <v-col cols="6">
              <chart-line-area height="100px" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="3" class="px-6" style="border-right: 2px solid #eaeaea">
          <v-row no-gutters align="center">
            <v-col cols="6">
              <p class="h5-bold mb-2">10</p>
              <v-row no-gutters align="center">
                <icon-others-social-telegram
                  width="20"
                  height="20"
                  class="mr-1"
                />
                <p class="s-regular">Telegram</p>
              </v-row>
            </v-col>
            <v-col cols="6">
              <chart-line-area height="100px" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="3" class="pl-6">
          <v-row no-gutters align="center">
            <v-col cols="6">
              <p class="h5-bold mb-2">10</p>
              <v-row no-gutters align="center">
                <icon-others-social-whatsapp
                  width="20"
                  height="20"
                  class="mr-1"
                />
                <p class="s-regular">Whatsapp</p>
              </v-row>
            </v-col>
            <v-col cols="6">
              <chart-line-area height="100px" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>

    <!-- Third Section -->
    <v-row no-gutters class="mb-12">
      <v-col cols="5" class="wrapper--border pa-4">
        <p class="s-semibold mb-4">Current Plan</p>

        <v-row no-gutters align="center" justify="space-between" class="mb-5">
          <p class="h6-bold">Starter Plan</p>
          <p class="m-bold">Rp129.000/month</p>
        </v-row>

        <v-row no-gutters align="center" justify="space-between" class="mb-4">
          <v-row no-gutters align="center">
            <icon-outline-user-circle-plus
              fill="#120309"
              width="16"
              height="16"
              class="mr-2"
            />
            <p class="m-regular">Total collaborators</p>
          </v-row>
          <div>
            <p class="s-regular text-right">1/1</p>
            <div class="progress--wrapper">
              <div class="progress--inner accent" style="width: 80%"></div>
            </div>
          </div>
        </v-row>
        <v-row no-gutters align="center" justify="space-between" class="mb-4">
          <v-row no-gutters align="center">
            <icon-outline-user-three
              fill="#120309"
              width="16"
              height="16"
              class="mr-2"
            />
            <p class="m-regular">Total bot users</p>
          </v-row>
          <div>
            <p class="s-regular text-right">10/20000</p>
            <div class="progress--wrapper">
              <div class="progress--inner secondary" style="width: 20%"></div>
            </div>
          </div>
        </v-row>
        <v-row no-gutters align="center" justify="space-between" class="mb-5">
          <v-row no-gutters align="center">
            <icon-outline-user-three
              fill="#120309"
              width="16"
              height="16"
              class="mr-2"
            />
            <p class="m-regular">Bots used</p>
          </v-row>
          <div>
            <p class="s-regular text-right">2/10</p>
            <div class="progress--wrapper">
              <div class="progress--inner secondary" style="width: 20%"></div>
            </div>
          </div>
        </v-row>
        <button-default label="Upgrade Plan" />
      </v-col>
      <v-col cols="7" class="pl-6">
        <v-row
          no-gutters
          align="center"
          style="
            height: 100%;
            background: linear-gradient(90deg, #ffffff 0%, #f2fcfd 100%);
          "
          class="wrapper--border px-12"
        >
          <div>
            <p class="h6-bold mb-4">Currently you’re in starter plan</p>
            <p class="m-regular mb-8">
              Upgrade your account plan to access more collaborators, more bot
              users, more bots, and many more!
            </p>
            <button-default label="Explore our offerings" />
          </div>
        </v-row>
      </v-col>
    </v-row>

    <!-- Fourth Section -->
    <v-row no-gutters>
      <v-col cols="6" class="pr-6">
        <div class="wrapper--border pa-0">
          <v-row no-gutters align="center">
            <v-col cols="3">
              <v-img
                src="https://images.unsplash.com/photo-1622151834677-70f982c9adef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3372&q=80"
                height="200px"
                style="border-radius: 6px 0px 0px 6px"
              ></v-img>
            </v-col>
            <v-col cols="9" class="py-4 px-6">
              <p class="l-bold mb-1">Video Tutorial</p>
              <p class="s-regular mb-4">
                Get access to short videos covering flow builder basic features,
                advanced features, lead generation tips as well as bot
                development and integrations.
              </p>
              <button-default label="Watch Here" />
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="6" class="pr-6">
        <div class="wrapper--border pa-0">
          <v-row no-gutters align="center">
            <v-col cols="3">
              <v-img
                src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3271&q=80"
                height="200px"
                style="border-radius: 6px 0px 0px 6px"
              ></v-img>
            </v-col>
            <v-col cols="9" class="py-4 px-6">
              <p class="l-bold mb-1">Help Center</p>
              <p class="s-regular mb-4">
                Access hundreds of support articles providing step by step
                tutorial from bot building, design, account management, and
                more.
              </p>
              <button-default label="Contact Us" />
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'DashboardPage',
}
</script>
<style lang="scss" scoped>
.progress--wrapper {
  background: #f0f4fe;
  width: 80px;
  height: 5px;
  border-radius: 6px;
}
.progress--inner {
  height: 100%;
  border-radius: 6px;
}
</style>
