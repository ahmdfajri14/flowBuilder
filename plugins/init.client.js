export default async ({ store }) => {
  const token = store.state.auth.userToken
  if (token) {
    await store.dispatch('profile/profileShow', {
      headers: store.state.auth.userToken,
    })
    await store.dispatch('workspace/fetchWorkspace', {
      headers: token,
    })
  }
}
