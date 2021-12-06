//  项目界面选中后的底部管理菜单组件
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    project_index: {
      type: Number,
      value: -1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    project_name: '',
    rename_window: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back: function () {
      /* 取消弹窗 */
      this.setData({
        rename_window: false,
      })
    },
    wish_input: function (e) {
      /* 获取弹窗输入值 */
      this.setData({
        temp: e.detail.value
      })
    },
    confirm: function () {
      /* 确认输入值，退出弹窗 */
      this.setData({
        rename_window: false,
        project_name: this.data.temp
      })
      if (this.data.project_name)
        this.triggerEvent('rename', {
          name: this.data.project_name
        })
      //console.log(this.data.project_name);
    },
    //下载的实现方法
    download: function () {
      //this.triggerEvent('delect',{index:this.properties.project_index})
    },
    delete: function () {
      this.triggerEvent('delect', {
        index: this.properties.project_index
      })
    },
    rename: function () {
      this.setData({
        rename_window: true
      })
    },
    more: function () {
      this.triggerEvent("more")
    },
  }
})