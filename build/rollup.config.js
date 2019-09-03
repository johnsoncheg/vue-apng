import resolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from "rollup-plugin-terser"
import babel from 'rollup-plugin-babel'
import bundleSize from 'rollup-plugin-filesize'

const path = require('path')

const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath)
}

module.exports = {
  input: resolveFile('src/index.js'),
  output: {
    file: resolveFile('dist/index.js'),
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