import Apng from './apng.vue'

function install (vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('v-apng', Apng)
}

Apng.install = install

export default Apng