export default {
  auth: {
    create: { method: 'post', url: '/authentication/authenticate/password/' },
    changePassword: {
      method: 'post',
      url: '/authentication/authenticate/change-password/',
    },
  },

  profile: {
    show: { method: 'get', url: '/user/profile/' },
    post: { method: 'post', url: '/user/profile/' },
  },
  media: {
    upload: { method: 'post', url: '/reference/base64-upload/' },
  },
  workspace: {
    get: { method: 'get', url: '/workspace/workspace/' },
    create: { method: 'post', url: '/workspace/workspace/' },
    update: { method: 'put', url: '/workspace/workspace/:id/' },
  },
}
