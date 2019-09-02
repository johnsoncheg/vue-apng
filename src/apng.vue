<template>
  <div class="apng-wrapper"
    :style="{ width, height }">
    <template v-if="imgSrc">
      <img :src="imgSrc" v-if="supported">
      <canvas ref='c' v-else></canvas>
    </template>
    <slot></slot>
  </div>
</template>

<script>
import supportAPNG from './utils/support_test.js'
import loadUrl from './utils/loader.js'
import parser from './utils/parser.js'

export default {
  name: 'v-apng',
  props: {
    src: [String, HTMLImageElement],
    ignore: Boolean,
    width: {
      type: String,
      required: true
    },
    height: {
      type: String,
      default: 'auto'
    }
  },

  data () {
    return {
      supported: true
    }
  },

  computed: {
    imgSrc ({ src }) {
      if (src instanceof HTMLImageElement) {
        return src.src
      }
      return src
    }
  },

  watch: {
    supported: {
      immediate: true,
      handler (val) {
        if (val) return
        this.$nextTick(_ => {
          this.canvas = this.$refs.c
          if (!this.canvas) return

          this.ctx = this.canvas.getContext('2d')
          const { canvas, $el } = this
          canvas.style.width = $el.clientWidth + 'px'
          canvas.style.height = $el.clientHeight + 'px'

          loadUrl(this.imgSrc)
            .then(parser)
            .then(anim => {
              canvas.width = anim.width
              canvas.height = anim.height
              anim.addContext(this.ctx)
              anim.play()
            })
        })
      }
    }
  },

  created () {
    if (this.ignore) {
      this.supported = false
      return
    }

    supportAPNG().then(r => {
      this.supported = r
    })
  }
}
</script>

<style lang="scss">
.apng-wrapper {
  position: relative;
  img,
  canvas {
    width: 100%;
    height: 100%;
  }

  img,
  canvas {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
