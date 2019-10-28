Page({
  data: {},
  onLoad: function () {

  },
  tap: function(e) {
    let path = e.target.dataset.id
    wx.navigateTo({
      url: `/pages/${path}/index`
    })
  }
})
