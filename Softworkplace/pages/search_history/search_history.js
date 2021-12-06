// pages/search/search.js
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
     * 用于在页面中展示的历史记录数据块，实际应当在用户浏览对应教程后自动将对应教程/函数数据块加入，此处暂时为静态数据等待进一步实现
     */
    showdata: [{
        projectname: "教程1",//项目名称
        project_type: 0,//教程种类
        download_num: 30,//下载数
        time_date: "2021-11-1",//创建日期
        time_clock: "14:10",//创建时间
        user_name: "用户1",//用户名
        notes:"备注",//备注
        checked:false,//是否被选中
        shownote:false,//是否显示备注
        key: "aaa" ,//标识教程自身的唯一标识符
        flag:true //搜索功能的标识符
      },
      {
        projectname: "函数1",
        project_type: 1,
        download_num: 30,
        time_date: "2021-11-1",
        time_clock: "14:10",
        user_name: "用户2",
        notes:"备注",//备注
        checked:false,//是否被选中
        shownote:false,//是否显示备注
        key: "bbb", //标识教程自身的唯一标识符
        flag:true //搜索功能的标识符
      },
      {
        projectname: "教程2",
        project_type: 0,
        download_num: 30,
        time_date: "2021-11-1",
        time_clock: "14:10",
        user_name: "用户3",
        notes:"备注",//备注
        checked:false,//是否被选中
        shownote:false,//是否显示备注
        key: "ccc", //标识教程自身的唯一标识符
        flag:true //搜索功能的标识符
      }
    ],
    select_num:0
  },
  return: function () {
    wx.redirectTo({
      url: '../project/project'
    })
  },
  /*单选框的选中方法
   */
  check:function (e) {
    var that = this;
    var index=e.currentTarget.dataset.index;
    var check="showdata["+index+"].checked";
    var checked = that.data.showdata[index].checked;
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
      "select_num":0
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
  //好几个排序算法实现
  getSort: function (e) {
    console.log(e.detail);
    //按时间排序
    var compare0 = function(obj1, obj2){
        var val1 = obj1.time_date;
        var val2 = obj2.time_date;
        if(val1 > val2) {
            return 1;
        }else if(val1 < val2) {
            return -1;
        }else{
            return 0;
        }
    }
    //按名称排序
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
    var newarray = this.data.showdata;
    //var newarray = this.showdata.sort(compare);
    //console.log(newarray);
    if(e.detail.id == 0 || e.detail.id == 1) {
        newarray.sort(compare0);
        console.log(newarray);
    } else if(e.detail.id == 2 || e.detail.id == 3) {
        newarray.sort(compare2);
        console.log(newarray);
    }
    //实时更新排序项目
    this.setData({
        showdata: newarray
    })
  },

//搜索功能的实现？在SEARCH_BAR之中js
searchListener: function(e){
    var that = this;
    const app = getApp();
    this.setData({
        showdata: app.globalData.showdata
    })
    //console.log(this.data.showdata);//教程1
},
clearSearch: function() {
    var that = this;
    const app = getApp();
    this.setData({
        showdata: app.globalData.showdata
    })
},
mylike: function() {
    //这要把用户和教程标识传给后端，就是增加收藏表的意思
    var likes = [];
    var that = this;
    var index = 0;
    var length = that.data.showdata.length;
    for(index=0;index<length;index++){
      if(that.data.showdata[index].checked == true){
        likes.push({user_name:that.data.showdata[index].user_name, key: that.data.showdata[index].key})
      }
    }
    //console.log(likes);
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