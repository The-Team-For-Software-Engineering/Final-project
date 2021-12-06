// 选择排序框组件
Component({
  /**
   * 组件的属性列表   */
  properties: {
    propArray: {
      type: Array,
    }
  },
  /**
   * 组件的初始数据   */
  data: {
    selectShow: false, //初始option不显示
    nowText: " ", //初始内容
    animationData: {}
  },
  methods: {
    //option的显示与否
    selectToggle: function () {
      var nowShow = this.data.selectShow; //获取当前option显示的状态
      //创建动画
      var animation = wx.createAnimation({
        timingFunction: "ease"
      })
      this.animation = animation;
      if (nowShow) {
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export()
        })
      } else {
        animation.rotate(180).step();
        this.setData({
          animationData: animation.export()
        })
      }
      this.setData({
        selectShow: !nowShow
      })
    }, //设置内容
    setText: function (e) {
      var nowData = this.properties.propArray; //当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties
      var nowIdx = e.target.dataset.index; //当前点击的索引
      var nowText = nowData[nowIdx].text; //当前点击的内容
      //再次执行动画，注意这里一定，一定，一定是this.animation来使用动画
      this.animation.rotate(0).step();
      this.setData({
        selectShow: false,
        nowText: nowText,
        animationData: this.animation.export()
      })
      var nowSort={
        id:nowIdx,
        text:nowText
      }
      this.triggerEvent('myget', nowSort);
      /*接下来需实现：通过获取的选项id进行对应的项目排序*/
    }
  }
})