<template>
  <div>
    <v-row>
      <v-sheet class="mx-auto" max-width="1000">
        <v-slide-group multiple :show-arrows="planContent.length > 3">
          <v-slide-item
            v-for="(item, key) in planContent"
            :key="key"
            v-slot="{ toggle }"
          >
            <v-col class="my-2 pa-0">
              <v-card
                class="ms-4 pa-8 my-8"
                :class="
                  item.isRecomended ? 'recomend-card' : 'not-recomend-card'
                "
                :outlined="item.isRecomended"
                elevation="0"
                @click="toggle"
              >
                <v-row>
                  <v-col>
                    <h4>{{ item.title }}</h4>
                  </v-col>
                  <v-col v-if="item.isRecomended">
                    <div class="recomend-title">
                      <h5>Recomended</h5>
                    </div>
                  </v-col>
                </v-row>
                <v-col class="pa-0 my-8">
                  <h2>{{ item.price }}</h2>
                  <h3>/month</h3>
                </v-col>
                <v-btn v-if="item.isCurrent" class="current-btn" outlined
                  >Current Plan</v-btn
                >
                <v-btn
                  v-else
                  class="free-btn"
                  :style="
                    item.isRecomended
                      ? `
            background-color: #F1441C !important;
            color: #FFFFFF !important;`
                      : `
            background-color: #1799AC !important;
            color: #FFFFFF !important;`
                  "
                  >Try for free</v-btn
                >
                <v-col class="pa-0 my-8">
                  <h4>This plan includes:</h4>
                  <ul
                    v-for="(addon, index) in item.addons"
                    :key="index"
                    class="s-regular mt-2"
                  >
                    <li>{{ addon }}</li>
                  </ul>
                </v-col>
              </v-card>
            </v-col>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'PlanCards',
  props: {
    planContent: {
      type: Array,
      default: () => [
        {
          title: 'Current Plan',
          isRecomended: false,
          price: 129000,
          isCurrent: true,
          addons: ['1 bot', '1000 bot users included', '5 members included'],
        },
        {
          title: 'Starter Plan',
          isRecomended: true,
          price: 129000,
          isCurrent: false,
          addons: ['1 bot', '1000 bot users included', '5 members included'],
        },
        {
          title: 'Contact Us',
          isRecomended: false,
          price: 129000,
          isCurrent: false,
          addons: ['1 bot', '1000 bot users included', '5 members included'],
        },
      ],
    },
  },
}
</script>

<style lang="scss" scoped>
.recomend-card {
    width: 296px; height: 413px;
            background-color: #FFF6CC !important;
}
.not-recomend-card {
     width: 296px; height: 413px;
            background-color: #FFFFFF !important;
}
.recomend-title{
    border: 1px solid #0933A6;
    background-color: #0933A6;
    color: #FFFFFF;
    padding: 2px;
    text-align: center;
}
        .free-btn {
            height: 38px !important;
            width: 100% !important;
        }
        .current-btn {
            background-color: #FFFFFF !important;
            height: 38px !important;
            width: 100% !important;
            color: #1799AC  !important;
            border-color: #1799AC  !important;
        }
  .s-regular {
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 21px;
        }

        ul {
            list-style-image: url('~/assets/icon-check.png');
            li {
                padding-left: 10px;
            }
        }

        ul.list-check-red {
            list-style-image: url('~/assets/icon-check-red.png');
        }
        ::v-deep .v-btn__content{
  text-transform: capitalize !important;
}
</style>
