
import Apng from './apng.vue'

function install (vue) {
  if (install.installed) return
  install.installed = true
  vue.component('v-apng', Apng)
}

Apng.install = install

export default Apng