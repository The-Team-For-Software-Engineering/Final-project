// 查询邀请码界面选中后的底部管理菜单组件
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
      // 显示
      show() {
        this.triggerEvent("eventShowClick", "show");
      },
      // 隐藏
      hide() {
        this.triggerEvent("eventHideClick", "hide");
      },
    
  }
})
