import Vue from 'vue'

export default (ctx) => {
  Vue.filter('rp', numberToRupiah)
  Vue.filter('getInitial', getInitialName)
}

export const numberToRupiah = (value) => {
  if (!value) return 'Rp0'
  let _value = Number(value)

  if (isNaN(_value)) return ''

  _value = _value.toLocaleString('id-ID')
  return `Rp${_value}`
}

export const getInitialName = (string) => {
  if (!string) return
  const names = string.split(' ')
  let initials = names[0].substring(0, 1).toUpperCase()

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase()
  }
  return initials
}
