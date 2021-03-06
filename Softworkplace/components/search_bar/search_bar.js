// components/search_bar/search_bar.js
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
    showInput: function () {
      this.setData({
        inputShowed: true
      });
    },
    hideInput: function () {
      this.setData({
        inputVal: "",
        inputShowed: false
      });
      // getList(this);

      //监听,点击取消的同时取消搜索结果展示
      this.triggerEvent('eventSearchCancelListener')
    },
    clearInput: function () {
      this.setData({
        inputVal: ""
      });
      // getList(this);
    },
    inputTyping: function (e) {
      //搜索数据
      // getList(this, e.detail.value);
      this.setData({
        inputVal: e.detail.value
      });
    },
    /*待实现的搜索方法*/
    search:function (e) {
      let searchData = e.detail.value //输入的搜索值
      //事件监听
      this.triggerEvent('eventSearchListener',{searchData})
    }
  }
})