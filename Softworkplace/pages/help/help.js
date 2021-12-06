// pages/create_project/create_project.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    more_help:false
  },
  return: function () {
    wx.redirectTo({
      url: '../main/main'
    })
  },
  more_help: function () {
    var that = this;
    if(!that.data.more_help)
    {  that.setData({
      "more_help":true,
      })
    }
    else
    {
      that.setData({
        "more_help":false,
      })
    }
  },
  authority_table: function () {
    wx.redirectTo({
      url: '../help/authority_table/authority_table'
    })
  },
  authority_help: function () {
    wx.redirectTo({
      url: '../help/authority_help/authority_help'
    })
  },
  project_help: function () {
    wx.redirectTo({
      url: '../help/project_help/project_help'
    })
  },
  create_help: function () {
    wx.redirectTo({
      url: '../help/create_help/create_help'
    })
  },
  search_help: function () {
    wx.redirectTo({
      url: '../help/search_help/search_help'
    })
  },
  main_help: function () {
    wx.redirectTo({
      url: '../help/main_help/main_help'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})