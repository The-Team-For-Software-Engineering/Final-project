// pages/project/project.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectArray: [{
        "id": "1",
        "text": "按修改时间"
      }, {
        "id": "2",
        "text": "按创建时间"
      },
      {
        "id": "3",
        "text": "按项目名称"
      },
      {
        "id": "4",
        "text": "按项目大小"
      }
    ],
    /**
     * 用于在页面中展示的计划数据块。实际数据应当在页面加载时从后端接口动态获取。
     */
    plandata: [{
        plan_name: "计划1",//计划名称
        plan_time: "7:00",//计划创建时间
        plan_date: "2021-1-1",//计划日期
        checked:false,//是否被选中
        key: "aaa"//标识计划自身的唯一标识符
      },
      {
        plan_name: "计划2",//计划名称
        plan_time: "8:00",//计划创建时间
        plan_date: "2021-1-1",//计划日期
        checked:false,//是否被选中
        key: "bbb"//标识计划自身的唯一标识符
      }
    ],
    select_num:0,
    edited:false
  },
  return: function () {
    wx.redirectTo({
      url: '../create/create'
    })
  },

 cancel_edit:function()
  {
    var that = this;
    that.setData({
      "edited":false,
      "select_num":0
    })
  },
  /*编辑计划方法
   */
  edit_plan:function()
  {
    var that = this;
    that.setData({
      "edited":true,
      
    })
  },
  /*单选框的选中方法
   选中任一项目后弹出管理菜单并进行各类管理（参考原型设计）
   */
  check:function (e) {
    var that = this;
    var index=e.currentTarget.dataset.index;
    var check="plandata["+index+"].checked";
    var checked = that.data.plandata[index].checked;
    if(!checked)
    {  that.setData({
        [check]:true,
        "select_num":that.data.select_num+1
      })
    }
    else
    {
      that.setData({
        [check]:false,
        "select_num":that.data.select_num-1
      })
    }
  },
  /*单选框的取消方法
   取消所有单选的选中状态
   */
  selectquit:function (e) {
    console.log("aaa");
    var that = this;
    var index=0;
    var check="plandata["+index+"].checked";
    var length = that.data.showdata.length;
    console.log(length);
    for(index=0;index<length;index++)
    {  check="plandata["+index+"].checked";
      that.setData({
      [check]:false,
      })
    }
    that.setData({
      "select_num":0,
      "more_menu":false
    })
  },
  /*单选框的全选方法
   */
  selectall:function (e) {
    console.log("bbb");
    var that = this;
    var index=0;
    var check="plandata["+index+"].checked";
    var length = that.data.showdata.length;
    console.log(length);
    for(index=0;index<length;index++)
    { check="plandata["+index+"].checked"; 
      that.setData({
        [check]:true,
      })
    }
    that.setData({
      "select_num":length
    })
  },
  /*TODO:排序选择框的排序方法
   */
  getSort: function (e) {
    console.log(e.detail);
  },
  
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 等待实现的功能：在页面加载时动态获取后端接口的数据，注入showData数据块中，用于页面动态渲染与其他进一步操作。
     */
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
    wx.getStorage({
      key: 'itemlist'
    }).then(res=>{
      this.setData({
        showdata:res.data
      })
      var length=res.data.length;
      for(let index=0;index<length;index++)
     { let show="showdata["+index+"].shownote";
       let flag="showdata["+index+"].flag";
       this.setData({
        showdata:res.data,
        [show]:false,
        [flag]:true
      })
     }
    })
    wx.getStorage({
      key: 'user_name'
    }).then(res=>{
      this.setData({
        user_name:res.data
      })
    })
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