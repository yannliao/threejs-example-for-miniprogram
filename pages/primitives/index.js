import * as THREE from '../../libs/three.weapp.min.js'
import renderPrimitives from './primitives'

Page({
  data: {},
  onLoad: function () {
    wx.createSelectorQuery()
      .select('#c')
      .node()
      .exec((res) => {
        const canvas = new THREE.global.registerCanvas(res[0].node)
        renderPrimitives(canvas, THREE)
      })
  },
  onUnload: function () {
    THREE.global.clearCanvas()
  }
})
