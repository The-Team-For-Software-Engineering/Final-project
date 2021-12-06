// 基础的底部管理菜单组件
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    first_select: function () {
      wx.redirectTo({
        url: '../project/project'
      })
    },
    second_select: function () {
      wx.redirectTo({
        url: '../create/create'
      })
    },
    third_select: function () {
      wx.redirectTo({
        url: '../search/search'
      })
    },
    fourth_select: function () {
      wx.redirectTo({
        url: '../main/main'
      })
    },
  }
})
