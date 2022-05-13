export default function ({ store, redirect }) {
  if (!store.state.userToken) {
    redirect(`/login`)
  }
}
