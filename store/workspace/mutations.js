import * as types from '@/store/constants'

export default {
  [types.WORKSPACE_SHOW](state, payload) {
    state.list = payload
  },
  [types.WORKSPACE_ASSIGN](state) {
    if (state.list) {
      state.currentWorkspace = state.list[0]
    }
  },
  [types.WORKSPACE_CHANGE_CURRENT](state, payload) {
    state.currentWorkspace = payload
  },
}
