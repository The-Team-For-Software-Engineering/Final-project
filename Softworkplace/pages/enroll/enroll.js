// pages/enroll/enroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_disabled: false,
    user_id: "",
    user_password: "",
    passwordack: "",
  },

  signin: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  regist: function(e) {
    var that = this
    if (that.data.user_id == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入账号！',
        success: function(res) {}
      })
    } else if (that.data.user_id.length < 6||that.data.user_id.length >= 12) {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '账号长度有误，请重新输入！',
        success: function(res) {}
      })
    } else if (that.data.user_password == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入密码！',
        success: function(res) {}
      })
    }  else if (that.data.passwordack == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入确认密码！',
        success: function(res) {}
      })
    } else if (that.data.user_password != that.data.passwordack) {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '两次输入密码不一致！',
        success: function(res) {}
      })
    } else {
      wx.redirectTo({
        url: '../login/login'
      })
     /* wx.request({
        url: getApp().globalData.server + '/index.php/Home/User/sign',
        data: {
          phone: that.data.phonenumber,
          password: that.data.password,
          password_again: that.data.passwordack,
        },
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          console.log(res.data)
          if (res.data.error_code == 1) {
            wx.showModal({
              title: '提示！',
              showCancel: false,
              content: res.data.msg,
              success: function (res) { }
            })
          } else if (res.data.error_code == 2) {
            wx.showModal({
              title: '提示！',
              showCancel: false,
              content: '两次密码不一致！',
              success: function(res) {}
            })
          } else if (res.data.error_code == 3) {
            wx.showModal({
              title: '提示！',
              showCancel: false,
              content: '该账号已被注册！',
              success: function(res) {}
            })
          } else if (res.data.error_code != 0) {
            wx.showModal({
              title: '哎呀～',
              content: '出错了呢！' + res.data.msg,
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else if (res.data.error_code == 0) {
            getApp().globalData.user = res.data.data
            console.log(getApp().globalData.user)
            wx.showModal({
              title: '恭喜！',
              showCancel: false,
              content: '登录成功',
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              },
              complete: function(res) {
                wx.reLaunch({
                  url: ""
                })
              }
            })
          }
        },
        fail: function(res) {
          wx.showModal({
            title: '哎呀～',
            content: '网络不在状态呢！',
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })*/
    }
  },

  useridInput: function(e) {
    this.data.user_id = e.detail.value
    console.log(this.data.user_id);
  },


  passwordInput: function(e) {
    this.data.user_password = e.detail.value
  },

  passwordInputAck: function(e) {
    this.data.passwordack = e.detail.value
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})