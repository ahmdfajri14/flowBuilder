<template>
  <div id="flow-builder" class="ma-0">
    <div id="drawflow">
      <div class="bar-zoom">
        <v-btn class="mb-4" @click="zoomIn">+</v-btn>
        <v-btn class="mb-4" @click="zoomOut">-</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Drawflow from 'drawflow'
import 'drawflow/dist/drawflow.min.css'
import Vue from 'vue'
import start from '../../../components/node1.vue'
import Node2 from '../../../components/node2.vue'
export default {
  name: 'FlowBuilderPage',
  layout: 'LayoutFlowBuilder',
  data() {
    return {
      editor: null,
      exportValue: null,
      mobileItemSelect: '',
      mobileLastMove: null,
      showMessage: false,
    }
  },
  computed: {
    nodeList() {
      return this.$store.getters['flowbuilder/getNodelist']
    },
    addNodeList() {
      return this.$store.getters['flowbuilder/getAddNode']
    },
  },
  mounted() {
    this.fetchNode()
  },

  methods: {
    fetchNode() {
      const id = document.getElementById('drawflow')
      this.editor = new Drawflow(id, Vue, this)
      this.editor.start()
      this.editor.registerNode('start', start, {}, {})
      console.log(this.addNodeList, this.addNodeList.length, 'ss')
      if (this.addNodeList.length > 0) {
        for (let i = 0; i < this.addNodeList.length; i++) {
          this.editor.registerNode(
            `Node${i}`,
            Node2,
            {
              textContent: this.addNodeList[i].text,
            },
            {}
          )
          this.nodeList[i] = {
            id: i,
            nodeName: `Message ${i}`,
            data: {},
            class: `Node${i}`,
            html: `Node${i}`,
            typenode: 'vue',
            inputs: {
              input_1: {
                connections: [
                  {
                    node: this.addNodeList[i].id.toString(),
                    input: 'output_1',
                  },
                ],
              },
            },
            outputs: {
              output_1: { connections: [] },
              output_2: { connections: [] },
            },
            pos_x: 137 * (i + 2),
            pos_y: 89 * (i + 2),
          }
        }
      }
      console.log(this.addNodeList, this.nodeList, 'hhh')
      this.editor.import({
        drawflow: {
          Home: {
            data: this.nodeList,
          },
        },
      })
    },
    showContentMessage() {
      this.showMessage = true
    },
    positionMobile(ev) {
      this.mobileLastMove = ev
    },
    addNodeToDrawFlow(name, posX, posY, data) {
      posX =
        posX *
          (this.editor.precanvas.clientWidth /
            (this.editor.precanvas.clientWidth * this.editor.zoom)) -
        this.editor.precanvas.getBoundingClientRect().x *
          (this.editor.precanvas.clientWidth /
            (this.editor.precanvas.clientWidth * this.editor.zoom))

      posY =
        posY *
          (this.editor.precanvas.clientHeight /
            (this.editor.precanvas.clientHeight * this.editor.zoom)) -
        this.editor.precanvas.getBoundingClientRect().y *
          (this.editor.precanvas.clientHeight /
            (this.editor.precanvas.clientHeight * this.editor.zoom))

      const nodeSelected = this.listNodes.find((ele) => ele.item === name)

      this.editor.addNode(
        data,
        name,
        nodeSelected.input,
        nodeSelected.output,
        posX,
        posY,
        name,
        {},
        name,
        'vue'
      )
    },
    zoomOut() {
      this.editor.zoom_out()
    },
    zoomIn() {
      this.editor.zoom_in()
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.column ul {
  padding-inline-start: 0px;
}
.column li {
  background: transparent;
}
.node {
  border-radius: 8px;
  border: 2px solid #494949;
  display: block;
  width: 100%;
  height: 60px;
  line-height: 40px;
  padding: 10px;
  margin: 10px 0px;
  cursor: move;
}

#drawflow {
  text-align: initial;
  position: relative;
  height: 720px;
  width: 100%;
  text-align: initial;
  background: rgb(234, 234, 234);
  background-size: 20px 20px;
  background-image: radial-gradient(#494949 1px, transparent 1px);
}
:root {
  --dfBackgroundColor: rgba(234, 234, 234, 1);
  --dfBackgroundSize: 0px;
  --dfBackgroundImage: radial-gradient(
    rgba(55, 34, 34, 1) 1px,
    transparent 1px
  );

  --dfNodeType: flex;
  --dfNodeTypeFloat: none;

  --dfNodeHoverBackgroundColor: #ffffff;
  --dfNodeHoverTextColor: #000000;
  --dfNodeHoverBorderSize: 2px;
  --dfNodeHoverBorderColor: #000000;
  --dfNodeHoverBorderRadius: 4px;

  --dfNodeHoverBoxShadowHL: 0px;
  --dfNodeHoverBoxShadowVL: 2px;
  --dfNodeHoverBoxShadowBR: 15px;
  --dfNodeHoverBoxShadowS: 2px;
  --dfNodeHoverBoxShadowColor: #4ea9ff;

  --dfNodeSelectedBackgroundColor: #000000;
  --dfNodeSelectedTextColor: #ffffff;
  --dfNodeSelectedBorderSize: 2px;
  --dfNodeSelectedBorderColor: #000000;
  --dfNodeSelectedBorderRadius: 4px;

  --dfNodeSelectedBoxShadowHL: 0px;
  --dfNodeSelectedBoxShadowVL: 2px;
  --dfNodeSelectedBoxShadowBR: 15px;
  --dfNodeSelectedBoxShadowS: 2px;
  --dfNodeSelectedBoxShadowColor: #4ea9ff;

  --dfInputBackgroundColor: rgba(9, 51, 166, 1);
  --dfInputBorderSize: 3px;
  --dfInputBorderColor: rgba(158, 183, 250, 1);
  --dfInputBorderRadius: 51px;
  --dfInputLeft: -26px;
  --dfInputHeight: 12px;
  --dfInputWidth: 12px;

  --dfInputHoverBackgroundColor: rgba(23, 153, 172, 1);
  --dfInputHoverBorderSize: 12px;
  --dfInputHoverBorderColor: null;
  --dfInputHoverBorderRadius: 50px;

  --dfOutputBackgroundColor: #ffffff;
  --dfOutputBorderSize: 2px;
  --dfOutputBorderColor: #000000;
  --dfOutputBorderRadius: 50px;
  --dfOutputRight: -3px;
  --dfOutputHeight: 20px;
  --dfOutputWidth: 20px;

  --dfOutputHoverBackgroundColor: #ffffff;
  --dfOutputHoverBorderSize: 2px;
  --dfOutputHoverBorderColor: #000000;
  --dfOutputHoverBorderRadius: 50px;

  --dfLineWidth: 5px;
  --dfLineColor: rgba(23, 153, 172, 1);
  --dfLineHoverColor: rgba(176, 176, 176, 1);
  --dfLineSelectedColor: rgba(238, 47, 18, 1);

  --dfRerouteBorderWidth: 2px;
  --dfRerouteBorderColor: rgba(158, 183, 250, 1);
  --dfRerouteBackgroundColor: rgba(9, 51, 166, 1);

  --dfRerouteHoverBorderWidth: 2px;
  --dfRerouteHoverBorderColor: null;
  --dfRerouteHoverBackgroundColor: rgba(23, 153, 172, 1);

  --dfDeleteDisplay: block;
  --dfDeleteColor: rgba(255, 255, 255, 1);
  --dfDeleteBackgroundColor: rgba(238, 45, 45, 1);
  --dfDeleteBorderSize: 2px;
  --dfDeleteBorderColor: #ffffff;
  --dfDeleteBorderRadius: 50px;
  --dfDeleteTop: -15px;

  --dfDeleteHoverColor: #000000;
  --dfDeleteHoverBackgroundColor: #ffffff;
  --dfDeleteHoverBorderSize: 2px;
  --dfDeleteHoverBorderColor: #000000;
  --dfDeleteHoverBorderRadius: 50px;
}
.drawflow .drawflow-node.selected {
  background: none !important;
}
#drawflow {
  background: var(--dfBackgroundColor);
  background-size: var(--dfBackgroundSize) var(--dfBackgroundSize);
  background-image: var(--dfBackgroundImage);
}

.drawflow .drawflow-node {
  display: var(--dfNodeType);
  background: var(--dfNodeBackgroundColor);
  color: var(--dfNodeTextColor);
  border: var(--dfNodeBorderSize) solid var(--dfNodeBorderColor);
  border-radius: var(--dfNodeBorderRadius);
  min-height: var(--dfNodeMinHeight);
  width: auto;
  min-width: var(--dfNodeMinWidth);
  padding-top: var(--dfNodePaddingTop);
  padding-bottom: var(--dfNodePaddingBottom);
  -webkit-box-shadow: var(--dfNodeBoxShadowHL) var(--dfNodeBoxShadowVL)
    var(--dfNodeBoxShadowBR) var(--dfNodeBoxShadowS) var(--dfNodeBoxShadowColor);
  box-shadow: var(--dfNodeBoxShadowHL) var(--dfNodeBoxShadowVL)
    var(--dfNodeBoxShadowBR) var(--dfNodeBoxShadowS) var(--dfNodeBoxShadowColor);
}

.drawflow .drawflow-node .input {
  left: var(--dfInputLeft);
  background: var(--dfInputBackgroundColor);
  border: var(--dfInputBorderSize) solid var(--dfInputBorderColor);
  border-radius: var(--dfInputBorderRadius);
  height: var(--dfInputHeight);
  width: var(--dfInputWidth);
}

.drawflow .drawflow-node .input:hover {
  background: var(--dfInputHoverBackgroundColor);
  border: var(--dfInputHoverBorderSize) solid var(--dfInputHoverBorderColor);
  border-radius: var(--dfInputHoverBorderRadius);
}

.drawflow .drawflow-node .outputs {
  float: var(--dfNodeTypeFloat);
}

.drawflow .drawflow-node .output {
  right: var(--dfOutputRight);
  background: var(--dfOutputBackgroundColor);
  border: var(--dfOutputBorderSize) solid var(--dfOutputBorderColor);
  border-radius: var(--dfOutputBorderRadius);
  height: var(--dfOutputHeight);
  width: var(--dfOutputWidth);
}

.drawflow .drawflow-node .output:hover {
  background: var(--dfOutputHoverBackgroundColor);
  border: var(--dfOutputHoverBorderSize) solid var(--dfOutputHoverBorderColor);
  border-radius: var(--dfOutputHoverBorderRadius);
}

.drawflow .connection .main-path {
  stroke-width: var(--dfLineWidth);
  stroke: var(--dfLineColor);
}

.drawflow .connection .main-path:hover {
  stroke: var(--dfLineHoverColor);
}

.drawflow .connection .main-path.selected {
  stroke: var(--dfLineSelectedColor);
}

.drawflow .connection .point {
  stroke: var(--dfRerouteBorderColor);
  stroke-width: var(--dfRerouteBorderWidth);
  fill: var(--dfRerouteBackgroundColor);
}

.drawflow .connection .point:hover {
  stroke: var(--dfRerouteHoverBorderColor);
  stroke-width: var(--dfRerouteHoverBorderWidth);
  fill: var(--dfRerouteHoverBackgroundColor);
}

.drawflow-delete {
  display: var(--dfDeleteDisplay);
  color: var(--dfDeleteColor);
  background: var(--dfDeleteBackgroundColor);
  border: var(--dfDeleteBorderSize) solid var(--dfDeleteBorderColor);
  border-radius: var(--dfDeleteBorderRadius);
}

.parent-node .drawflow-delete {
  top: var(--dfDeleteTop);
}

.drawflow-delete:hover {
  color: var(--dfDeleteHoverColor);
  background: var(--dfDeleteHoverBackgroundColor);
  border: var(--dfDeleteHoverBorderSize) solid var(--dfDeleteHoverBorderColor);
  border-radius: var(--dfDeleteHoverBorderRadius);
}

.bar-zoom {
  position: absolute;
  display: grid;
  right: 30px;
  bottom: 0;
  z-index: 1;
}
.menu {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9999;
}
.button-message {
  display: grid;
  gap: 10px;
  margin: 0px 30px;
}
.moving-card {
  opacity: 0.5;
  background: #f7fafc;
  border: 1px solid #4299e1;
}
</style>
