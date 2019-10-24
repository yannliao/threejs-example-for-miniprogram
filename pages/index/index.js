Page({
  data: {},
  onLoad: function () {

  },
  primitives: function () {
    wx.navigateTo({
      url: '/pages/primitives/index'
    })
  },
  cube: function () {
    wx.navigateTo({
      url: '/pages/cube/index'
    })
  },
  glb: function () {
    wx.navigateTo({
      url: '/pages/glb/index'
    })
  },
  gltf: function () {
    wx.navigateTo({
      url: '/pages/gltf/index'
    })
  },
  ngltf: function () {
    wx.navigateTo({
      url: '/pages/ngltf/index'
    })
  },
  obj: function () {
    wx.navigateTo({
      url: '/pages/obj/index'
    })
  }
})
