export default {
  addNodeList(state, value) {
    state.addNode.push({
      id: value.id,
      note: value.note,
      text: value.message,
      button: value.button,
    })
  },
}
