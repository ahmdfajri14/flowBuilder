<template>
  <div class="detail-listing">
    <v-data-table
      :headers="modelDataTable.headers"
      :items="itemList"
      :page.sync="page"
      :items-per-page="modelDataTable.itemsPerPage"
      :options.sync="optionsData"
      :server-items-length="modelDataTable.totalData"
      :loading="loadingTable"
      hide-default-footer
      class="dkm-table"
      @page-count="pageCount = $event"
    >
      <template slot="item" slot-scope="props">
        <tr :key="`row-${props.index}`" class="table-row">
          <td
            v-for="(headerItem, keyItem) in modelDataTable.headers"
            :key="`header-${keyItem}`"
          >
            <div
              v-if="
                props.item[headerItem.value] &&
                props.item[headerItem.value].type === 'icon'
              "
              :style="`
                background-color: ${
                  props.item[headerItem.value].text === 'Paid'
                    ? '#E7FEF0'
                    : '#fff6cc'
                };
                border-radius: 5px;
                padding: 5px 0px 5px 15px;`"
            >
              <v-icon
                :color="props.item[headerItem.value].color"
                medium
                style="width: auto"
              >
                {{ props.item[headerItem.value].icon }}
              </v-icon>
              <span
                :style="`color: ${
                  props.item[headerItem.value].color
                }; font-weight: bold`"
              >
                {{ props.item[headerItem.value].text }}
              </span>
            </div>
            <!-- ACTION COLUMN -->
            <div
              v-if="
                props.item[headerItem.value] &&
                props.item[headerItem.value].status === 'BUTTON'
              "
              class="button-container"
            >
              <div
                v-for="(act, index) in props.item[headerItem.value].action"
                :key="`button-${index}`"
              >
                <v-btn
                  v-if="!act.icon && !act.toggle"
                  style="color: white"
                  :class="{ link: act.isLink }"
                  :color="
                    act.color ? act.color : props.item[headerItem.value].color
                  "
                  class="item-button"
                  :outlined="outlined"
                  @click.stop="act.value(props.item)"
                >
                  {{ act.text }}
                </v-btn>
                <v-col
                  v-else-if="act.toggle && !act.icon"
                  @click.stop="act.value(props.item)"
                >
                  <v-switch
                    inset
                    disabled
                    color="#00d088"
                    :value="swicthToggle[props.item.id]"
                  />
                </v-col>
                <v-row v-else-if="act.icon">
                  <v-col class="my-1">
                    <v-tooltip v-if="act.text" top>
                      <template #activator="{ on }">
                        <div
                          :style="{
                            backgroundColor: act.color
                              ? act.color
                              : props.item[headerItem.value].color,
                          }"
                          class="item-button icon"
                          v-on="on"
                          @click="act.value(props.item)"
                        >
                          <v-icon size="20" color="#fff">{{ act.name }}</v-icon>
                        </div>
                      </template>
                      <span v-if="act.text">{{ act.text }}</span>
                    </v-tooltip>
                    <template v-else>
                      <div
                        :style="{
                          backgroundColor: act.color
                            ? act.color
                            : props.item[headerItem.value].color,
                        }"
                        class="item-button icon"
                        v-on="on"
                        @click="act.value(props.item)"
                      >
                        <v-icon size="20" color="#fff">{{ act.name }}</v-icon>
                      </div>
                    </template>
                  </v-col>
                </v-row>
              </div>
            </div>
            <div
              v-else-if="
                props.item[headerItem.value] &&
                props.item[headerItem.value].status === 'STATUS_BTN'
              "
              class="button-container"
            >
              <div
                v-for="(act, id) in props.item[headerItem.value].action"
                :key="`status-btn-${id}`"
              >
                <div
                  v-if="
                    typeof props.item[headerItem.value].action.text !==
                      'undefined' &&
                    props.item[headerItem.value].action.text !== null
                  "
                  :class="[
                    props.item[headerItem.value].action.text.toLowerCase(),
                  ]"
                  class="status"
                >
                  {{ props.item[headerItem.value].action.text }}
                </div>
                <div v-else class="status">{{ '-' }}</div>
              </div>
            </div>
            <div
              v-else-if="
                props.item[headerItem.value] &&
                props.item[headerItem.value].status === 'IMAGE'
              "
            >
              <img
                v-if="
                  typeof props.item[headerItem.value].src !== 'undefined' &&
                  props.item[headerItem.value].src !== null
                "
                class="image"
                :src="props.item[headerItem.value].src"
              />
              <div v-else class="image">{{ '-' }}</div>
            </div>
            <!-- TEXT COLOR -->
            <div
              v-else-if="
                props.item[headerItem.value] &&
                props.item[headerItem.value].color
              "
              :style="{ color: props.item[headerItem.value].color }"
            >
              {{ props.item[headerItem.value].value }}
            </div>
            <div v-else-if="headerItem.status === 'DATE'">
              {{
                $moment(props.item[headerItem.value]).format(
                  'DD MMM YYYY HH:mm'
                )
              }}
            </div>
            <div
              v-else-if="
                headerItem.status === 'PILL' &&
                props.item[headerItem.value] === 'Active'
              "
            >
              <v-chip pill color="#00b300" text-color="#00b300" outlined>
                {{ props.item[headerItem.value] }}
              </v-chip>
            </div>
            <div
              v-else-if="
                headerItem.status === 'PILL' &&
                props.item[headerItem.value] === 'Not Active'
              "
            >
              <v-chip pill color="#FF0000" text-color="#FF0000" outlined>
                {{ props.item[headerItem.value] }}
              </v-chip>
            </div>
            <div
              v-else
              class="text-data"
              @click.stop="$emit('clickRow', props.item)"
            >
              {{ props.item[headerItem.value] }}
            </div>
          </td>
        </tr>
      </template>
      <template #no-data>
        <v-alert :value="!loadingTable" type="error">Sorry, No Data</v-alert>
        <v-alert :value="loadingTable" type="info">Getting data...</v-alert>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount" :total-visible="10" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'TableData',
  props: {
    modelDataTable: {
      type: Object,
      default: () => {},
    },
    loadingTable: {
      type: Boolean,
      default: true,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    itemList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      optionsData: {},
      swicthToggle: {},
    }
  },

  watch: {
    itemList: {
      handler(after, before) {
        if (after !== before) {
          this.insertSwitchToggle(after)
          this.$forceUpdate()
        }
      },
      deep: true,
    },
  },

  mounted() {
    this.insertSwitchToggle(this.itemList)
  },

  methods: {
    defaultClicked(data, dataAction) {
      // call default function of cell
      if (!dataAction) {
        if (this.colFunction.default) return this.colFunction.default(data)
      }
    },
    insertSwitchToggle(item) {
      for (
        let itemListIndex = 0;
        itemListIndex < item.length;
        itemListIndex++
      ) {
        const element = item[itemListIndex]
        for (const key in element) {
          if (key === 'is_active' && key in element) {
            this.swicthToggle[element.id] = !!element[key]
          }
        }
      }
    },
    rowClicked(tableChoosen, data) {
      if (tableChoosen.rowFunction) {
        tableChoosen.rowFunction(data)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/tables.scss';
.detail-listing {
    max-width: 100%;
}
.button-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .item-button {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        // margin-left: 10px;
        // margin-bottom: 10px;
        color: #0933A6;
        &.icon {
            display: flex;
            padding: 3px;
            border-radius: 50px;
            align-items: center;
            background-color: red;

            margin: 0 5px;
        }
    }
}
.image {
    max-width: 100px;
    height: 40px;
    border-radius: 4px;
    background-color: #f2f2f2;
}
.image2 {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    background-color: #f2f2f2;
}
.v-tabs__item {
    text-transform: capitalize;
    width: 200px;
    font-size: 14px;
    font-weight: bold;
    line-height: 1.36;
    color: yellow;
    background-color: green;
    box-shadow: 3px -2px 4px 0 rgba(0, 0, 0, 0.06);
    border-left: 1px solid #8e9197;
    border-right: 0.5px solid #8e9197;
}
.tab-title {
    text-align: center;
    cursor: pointer;
    width: 200px;
    padding: 10px 0px;
    font-weight: bold;
    display: inline-block;
    color: #ffffff;
    background-color: #ced5db;
    box-shadow: inherit;
    font-family: 'lato';
    font-size: 14px;
}
.tab-title.active {
    color: blue;
    background-color: #ffffff;
    box-shadow: -1px -3px 6px 0 rgba(0, 0, 0, 0.16);
}
.v-toolbar {
    min-width: 1300px !important;
}
//Custom Table
.tab-table {
    .table-row {
        cursor: pointer;
        &:nth-child(even) {
            background-color: black;
        }
        td {
            font-size: 14px;
            line-height: 1.08;
            letter-spacing: normal;
            max-width: 200px;
            color: #939393;
            // word-break: break-word;
            word-break: normal;
            .text-status {
                // font-size: 11px;
                color: #0075fd;
                text-align: center;
                max-width: 140px;
                background-color: #F5F5F5;
                padding: 4px 12px;
                border-radius: 999px;
                word-break: break-all;
            }
            .text-data {
                // white-space: pre-wrap;
                text-align: left;

                &.text-data-bold {
                    font-weight: bold;
                }
            }
            &.highlight {
                font-weight: 900;
                text-decoration: underline;
                // line-height: 4.81;
                color: blue;
            }
            &.agent {
                font-weight: bold;
            }
            .btn-submit {
                text-align: center;
                background-color: blue;
                border-radius: 4px;
                padding: 10px 15px;
                color: yellow;
            }
            button {
                font-size: 14px;
                border-radius: 4px;
                box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
                // background-color: #fe6300;
                color: #ffffff;
                text-transform: inherit;
            }
            button.link {
                background-color: transparent !important;
                text-decoration: underline;
                color: blue;
                border: 0px;
            }
        }
    }
}
</style>
