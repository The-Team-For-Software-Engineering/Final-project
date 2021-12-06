// pages/project/project.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    project_index:0, // 单选框选中项目
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
     * 用于在页面中展示的项目数据块。包含项目名称，人数，修改日期，最大人数等。这里是用于测试页面动态渲染的预设数据，实际数据应当在页面加载时从后端接口动态获取。数据格式可根据实现需求自行调整，但应当告知视图层负责人员用于调整渲染内容
     */
    showdata: [/*{
        projectname: "项目1",//项目名称
        people_num: 10,//项目人数
        people_max: 20,//项目最大人数
        time_date: "2021-11-1",//项目创建日期
        time_clock: "14:10",//项目创建时间
        key: "aaa" ,//标识项目自身的唯一标识符
        invitecode:"10000001",//项目邀请码
        notes:"备注",//备注
        shownote:false,//是否显示备注
        open:true//是否开启权限
      },
      {
        projectname: "项目2",
        people_num: 10,
        people_max: 20,
        time_date: "2021-11-1",
        time_clock: "14:10",
        key: "bbb" ,//标识项目自身的唯一标识符
        invitecode:"10000002",//项目邀请码
        notes:"备注",//备注
        shownote:false,//是否显示备注
        open:true//是否开启权限
      },
      {
        projectname: "项目3",
        people_num: 10,
        people_max: 20,
        time_date: "2021-11-1",
        time_clock: "14:10",
        key: "ccc" ,//标识项目自身的唯一标识符
        invitecode:"10000003",//项目邀请码
        notes:"备注",//备注
        shownote:false,//是否显示备注
        open:true//是否开启权限
      }*/
    ],
    select_num:0,
    more_menu:false
  },
  
  /*单选框的选中方法
   选中任一项目后弹出管理菜单并进行各类管理（参考原型设计）
   */
  check:function (e) {
    var that = this;
    var index=e.currentTarget.dataset.index;
    var check="showdata["+index+"].checked";
    var checked = that.data.showdata[index].checked;
    if(!checked)
    {  that.setData({
        [check]:true,
        project_index:index,
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
    console.log(this.data.project_index);
  },
  /*单选框的取消方法
   取消所有单选的选中状态
   */
  selectquit:function (e) {
    var that = this;
    var index=0;
    var check="showdata["+index+"].checked";
    var length = that.data.showdata.length;
    console.log(length);
    for(index=0;index<length;index++)
    {  check="showdata["+index+"].checked";
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
    var that = this;
    var index=0;
    var check="showdata["+index+"].checked";
    var length = that.data.showdata.length;
    console.log(length);
    for(index=0;index<length;index++)
    { check="showdata["+index+"].checked"; 
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
  /*TODO:排序选择框的排序方法
   */
  getSort: function (e) {
    console.log(e.detail);
    //按创建时间排序
    var compare1 = function(obj1, obj2){
      if(obj1.time_date > obj2.time_date) {
          return 1;
      }else if(obj1.time_date < obj2.time_date) {
          return -1;
      }else if(obj1.time_date == obj2.time_date){
        if(obj1.time_clock > obj2.time_clock) return 1;
        else if(obj1.time_clock < obj2.time_clock) retrun -1;
        else return 0;
      }
    }
    //按项目名称排序
    var compare2 = function(obj1, obj2){
      var val1 = obj1.projectname;
      var val2 = obj2.projectname;
      if(val1 > val2) {
          return 1;
      }else if(val1 < val2) {
          return -1;
      }else{
          return 0;
      }
    }
    //按项目人数
    var compare3 = function(obj1, obj2){
      if(obj1.people_num > obj2.people_num) return 1;
      else if(obj1.people_num < obj2.people_num) return -1;
      else{
        if(obj1.people_max > obj2.people_max) return 1;
        else if(obj1.people_max > obj2.people_max) return - 1;
        else return 0;
      }
    }
    var newarray = this.data.showdata;
    if(e.detail.id == 1) {
      newarray.sort(compare1); 
    } else if(e.detail.id == 2) {
      newarray.sort(compare2); 
    } else if(e.detail.id == 3) {
      newarray.sort(compare3);
    }
    this.setData({
      showdata: newarray
    })
  },
  /*选中后菜单中更多菜单的展示方法
   */
  moremenu:function (e) {
    var that = this;
    that.setData({
      "more_menu":true
    })
  },
  /*单击下拉栏展示备注的方法
   */
  shownote:function (e) 
  {
    var that = this;
    var index=e.currentTarget.dataset.index;
    var show="showdata["+index+"].shownote";
    var showed = that.data.showdata[index].shownote;
    if(!showed)
    {  that.setData({
        [show]:true,
      })
    }
    else
    {
      that.setData({
        [show]:false,
      })
    }
  },
    /* 
    跳转到单个项目页面
     */
  project_select:function(event){
    var that = this;
    var index = event.currentTarget.dataset.index;
    //    wx.setStorageSync('showdata',that.data.showdata);
    wx.navigateTo({
      url: '../project_select/project_select?id=' + index,
    })
  },
  /**
   * 等待实现的文件上传功能
   */
  file_upload: function () {},

  /**
   * 等待实现的历史页面功能
   */
  project_history: function () {
    wx.redirectTo({
      url: '../search_history/search_history'
    })
  },

  /**
   * 等待实现的创建计划功能
   */
  create_plan: function () {
    wx.redirectTo({
      url: '../plan/plan'
    })
  },
  projectSearch: function(e) {
    var that = this;
    var searchData = String(e.detail.searchData);
    searchData = searchData.replace(/\s*/g,""); //正则表达式
    for(var i = 0; i < that.data.showdata.length; i++) {
        var objects = String(that.data.showdata[i].projectname);
        if(objects.indexOf(searchData) != -1){
          that.data.showdata[i].flag = true;
        }
        else that.data.showdata[i].flag = false; //不显示
    }
    this.setData({
      showdata: that.data.showdata
    })
},
projectClearSearch: function() {
  var that = this;
  for(var i = 0; i < that.data.showdata.length; i++){
    that.data.showdata[i].flag = true;
  }
  this.setData({
    showdata: that.data.showdata
  })
},
  delect:function(event){
    /* 通过组件删除项目 */
  var that = this;
  var arr = wx.getStorageSync('itemlist');
  arr.splice(event.detail.index,1)
  that.setData({
     showdata:arr,
     select_num:that.data.select_num-1,
  })
   wx.setStorageSync('itemlist', arr)
   console.log(this.data.project_index);
},
rename:function(event){
 /* 通过组件重命名项目 */
 var that = this;
 if (that.data.select_num>1) {
  wx.showToast({
    title: '不能重命名多个文件！',
    icon: 'none',
    duration: 2000 //持续的时
  })
  return;
}
 var index =that.data.project_index;
 console.log(index);
 var temp_str = "showdata["+index+"].projectname";
 var check="showdata["+index+"].checked";
 that.setData({
   [temp_str]:event.detail.name,
   select_num:0,
   [check]:false
 })
 console.log(this.data.showdata);
 wx.setStorageSync('itemlist', this.data.showdata)
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