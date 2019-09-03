import resolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from "rollup-plugin-terser"
import babel from 'rollup-plugin-babel'
import bundleSize from 'rollup-plugin-filesize'

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'VueApng'
  },

  plugins: [
    vue({
      template: {
        isProduction: true
      }
    }),
    bundleSize(),
    resolve({
      browser: true,
      modulesOnly: true,
      extensions: ['.js', '.vue']
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', { modules: false }]
      ],
      plugins: [
        ["@babel/plugin-transform-classes", {
          "loose": true
        }]
      ]
    }),
    terser()
  ]
}