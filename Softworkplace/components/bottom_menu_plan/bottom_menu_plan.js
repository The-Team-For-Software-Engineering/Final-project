//  收藏界面选中后的底部管理菜单组件
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
    quit: function () {
      this.triggerEvent("selectquit")
    },
    select: function () {
      this.triggerEvent("selectall")
    },
  }
})
