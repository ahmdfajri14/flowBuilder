import * as types from '@/store/constants'

export default {
  async fetchWorkspace(context, { headers }) {
    try {
      const response = await this.$api.call('workspace.get', headers)
      const data = response.results
      context.commit(types.WORKSPACE_SHOW, data)
      context.commit(types.WORKSPACE_ASSIGN)
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  changeCurrentWorkspace({ commit, state }, payload) {
    const { list } = state
    const newPayload = list.find((item) => item.id62 === payload)
    commit(types.WORKSPACE_CHANGE_CURRENT, newPayload)
  },
}
