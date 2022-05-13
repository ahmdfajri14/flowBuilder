import * as types from '@/store/constants'

export default {
  async authCreate(context, payload) {
    try {
      const response = await this.$api.call('auth.create', payload)
      const responseData = response.data
      context.commit(types.AUTH_CREATE, responseData)
      context.commit(types.AUTH_DATA_UPDATE, responseData.token)
      return responseData
    } catch (error) {
      context.commit(types.AUTH_CREATE, {})
      context.dispatch('authDestroy')
      throw error
    }
  },
  authDestroy(context) {
    context.commit(types.AUTH_DESTROY)
    this.$router.push('/login')
  },
}
