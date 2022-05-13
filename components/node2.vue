<template>
  <div class="node-message">
    <div class="d-flex pa-3">
      <component :is="`icon-others-chat-circle`" />
      <p class="pl-7 font-weight-bold">Send Message</p>
    </div>
    <div v-for="(content, id) in textContent" :key="id" class="wrapper-content">
      <p class="d-flex py-5 pl-3 outlined-message">
        {{ content.text }}
      </p>
    </div>
    <div class="continue-journey">
      <a @click="modalOpen = !modalOpen"> Contine to next step</a>
    </div>
    <teleport to="#flow-builder">
      <v-navigation-drawer
        v-model="modalOpen"
        absolute
        temporary
        right
        style="overflow: auto"
        :width="380"
      >
        <div style="z-index: 9999">
          <v-card outlined tile>
            <div class="d-flex pa-5">
              <component :is="`icon-others-chat-circle`" />
              <p class="pl-2 font-weight-bold">Send Message</p>
            </div>
          </v-card>
          <v-card style="height: 160px" elevation="0">
            <p class="d-flex pt-5 pl-7 font-weight-bold">Note</p>
            <form-text-field
              class="px-7 py-3"
              height="76px"
              label="Add note"
            ></form-text-field>
          </v-card>
          <v-card class="pb-3" outlined tile>
            <draggable
              :list="content"
              :animation="200"
              ghost-class="ghost"
              group="content"
              :move="checkMove"
              @start="dragging = true"
              @end="dragging = false"
            >
              <div v-for="(list, id) in content" :key="id">
                <div class="d-flex justify-end mr-6 mt-3">
                  <v-icon>mdi-drag-horizontal-variant</v-icon>
                  <div class="ml-3" @click="deleteList(id)">
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </div>
                </div>
                <form-text-field
                  v-model="list.note"
                  class="px-7 pt-3"
                  height="140px"
                  label="Add text here"
                ></form-text-field>
              </div>
            </draggable>
            <div v-if="content.length > 0" class="button-message">
              <button-default
                v-for="(btn, key) in button"
                :key="key"
                color="#1799AC"
                text-color="#FFFFFF"
                border-color="#1799AC"
                :label="btn.name"
              />
              <button-default
                color="#FFFFFF"
                text-color="#1799AC"
                border-color="#1799AC"
                label="Add Button"
                prepend-icon="icon-outline-add-line-blue"
                @click="showModalAddBtn(id)"
              />
            </div>
          </v-card>
          <v-card class="pb-3" outlined tile>
            <p class="d-flex pt-5 pl-7 font-weight-bold">Add new component</p>
            <v-row :justify="'start'" class="ma-2">
              <v-col md="3">
                <v-hover v-slot="{ hover }" open-delay="200">
                  <v-btn
                    depressed
                    :color="hover ? 'primary' : 'grey darken-1'"
                    class="flexcol"
                    outlined
                    icon
                    height="72px"
                    width="62px"
                    @click="addTextMessage"
                  >
                    <v-icon>mdi-format-letter-case</v-icon>
                    <span>Text</span>
                  </v-btn>
                </v-hover>
              </v-col>
              <v-col md="3">
                <v-hover v-slot="{ hover }" open-delay="200">
                  <v-btn
                    depressed
                    :color="hover ? 'primary' : 'grey darken-1'"
                    class="flexcol"
                    outlined
                    icon
                    height="72px"
                    width="62px"
                  >
                    <v-icon>mdi-image-outline</v-icon>
                    <span>Image</span>
                  </v-btn>
                </v-hover>
              </v-col>
              <v-col md="3">
                <v-hover v-slot="{ hover }" open-delay="200">
                  <v-btn
                    depressed
                    :color="hover ? 'primary' : 'grey darken-1'"
                    class="flexcol"
                    outlined
                    icon
                    height="72px"
                    width="62px"
                  >
                    <v-icon>mdi-music-note-outline</v-icon>
                    <span>Audio</span>
                  </v-btn>
                </v-hover>
              </v-col>
              <v-col md="3">
                <v-hover v-slot="{ hover }" open-delay="200">
                  <v-btn
                    depressed
                    :color="hover ? 'primary' : 'grey darken-1'"
                    class="flexcol"
                    outlined
                    icon
                    height="72px"
                    width="62px"
                  >
                    <v-icon>mdi-video-outline</v-icon>
                    <span>Video</span>
                  </v-btn>
                </v-hover>
              </v-col>
            </v-row>
          </v-card>
          <v-card style="height: 140px" elevation="0">
            <p class="d-flex py-5 pl-7 font-weight-bold">
              Continue to the next step
            </p>
            <div class="button-message">
              <button-default
                color="#FFFFFF"
                text-color="#1799AC"
                border-color="#1799AC"
                label="Add Button"
                prepend-icon="icon-outline-add-line-blue"
                @click="addNode"
              />
            </div>
          </v-card>
        </div>
      </v-navigation-drawer>
      <modal-content
        ref="addBtn"
        title="Add new button label"
        :input-list="addBtnInput"
        @onClick="addBtnMessage"
      />
    </teleport>
  </div>
</template>

<script>
import Teleport from 'vue2-teleport'
import draggable from 'vuedraggable'
import ModalContent from '../components/General/ModalContent.vue'

export default {
  components: {
    Teleport,
    draggable,
    ModalContent,
  },
  props: {
    textContent: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      modalOpen: false,
      idCounter: 0,
      addBtnInput: [
        {
          label: 'Button label',
        },
      ],
      list: {
        note: '',
      },
      content: [],
      button: [],
    }
  },
  computed: {
    addNodeList() {
      return this.$store.getters['flowbuilder/getAddNode']
    },
  },
  methods: {
    addNode() {
      const payloadNode = {
        id: this.addNodeList.length + 1,
        note: this.note,
        message: this.content,
        button: this.button,
      }
      this.$store.dispatch('flowbuilder/addNode', payloadNode)
      this.$forceUpdate()
      this.modalOpen = false
    },
    checkMove(e) {
      window.console.log('Future index: ' + e.draggedContext.futureIndex)
    },
    addTextMessage() {
      const index = this.idCounter++
      this.content.push({ id: index })
    },
    showModalAddBtn(id) {
      this.$refs.addBtn.dialog = true
      this.$refs.addBtn.id = id
    },
    addBtnMessage(value) {
      this.button.push({ name: value })
      this.$refs.addBtn.dialog = false
    },
    deleteList(id) {
      this.content.splice(this.content.indexOf(id), 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.node-message {
  height: 100%;
  max-width: 232px;
  background: #ffffff;
}
.wrapper-content {
  border-top: 1px solid #aaa;
}
.outlined-message {
  border-bottom: 1px solid #aaa;
  font-size: 12px;
}
.v-application ul {
  padding-left: 0px !important;
}
::v-deep .flexcol .v-btn__content {
  flex-direction: column !important;
}
::v-deep .v-btn__content {
  text-transform: capitalize !important;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
