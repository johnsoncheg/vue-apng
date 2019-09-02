import resolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from "rollup-plugin-terser"
import babel from 'rollup-plugin-babel'

module.exports = {
  input: './src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
    name: 'VueApng'
  },

  plugins: [
    vue(),
    resolve({
      browser: true,
      jsnext: true,
      modulesOnly: true
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    terser()
  ]
}