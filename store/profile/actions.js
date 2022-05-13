import * as types from '@/store/constants'

export default {
  async profileShow(context, { headers }) {
    try {
      const response = await this.$api.call('profile.show', headers)
      const responseData = response.data
      context.commit(types.PROFILE_SHOW, responseData)
      return responseData
    } catch (error) {
      console.log('ini error response ')
      // context.commit(types.AUTH_SHOW, {})
      throw error
    }
  },
}
