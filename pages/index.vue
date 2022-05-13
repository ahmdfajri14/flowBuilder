<template>
  <component :is="indexView" />
</template>

<script>
import Cookies from 'js-cookie'
import NewSessionDefault from '~/pages/login.vue'

export default {
  name: 'IndexPage',
  layout: 'guest',
  asyncData(context) {
    if (context.store.getters['auth/getUserToken']) {
      context.app.router.push('/dashboard')
    } else {
      return context.app.router.push('/login')
    }
  },
  computed: {
    indexView() {
      return NewSessionDefault
    },
  },
  created() {
    if (Cookies.get('t')) {
      this.$router.replace('/dashboard')
    }
  },
}
</script>
