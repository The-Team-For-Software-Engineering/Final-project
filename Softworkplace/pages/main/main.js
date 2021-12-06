// pages/main/main.js

Page({
  /**
   * 页面的初始数据
   */
  data: {},
  /**
   * 重定向到帮助页面的方法
   */
  user_help: function () {
    wx.redirectTo({
      url: '../help/help'
    })
  },
  /**
   * 重定向到收藏页面的方法
   */
  user_like: function () {
    wx.redirectTo({
      url: '../user_like/user_like'
    })
  },
  /**
   * 重定向到项目加入页面的方法
   */
  project_join: function () {
    wx.redirectTo({
      url: '../project_join/project_join'
    })
  },
  /**
   * 重定向到查询邀请码页面的方法
   */
  project_search: function () {
    wx.redirectTo({
      url: '../project_search/project_search'
    })
  },
  /**
   * 重定向到退出项目页面的方法
   */
  project_quit: function () {
    wx.redirectTo({
      url: '../project_quit/project_quit'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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