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
     * 用于在页面中展示的教程与函数数据块。包含教程名称，种类，下载数，创建时间等。这里是用于测试页面动态渲染的预设数据，实际数据应当在页面加载时从后端接口动态获取。数据格式可根据实现需求自行调整，但应当告知视图层负责人员用于调整渲染内容
     */
    showdata: [{
        projectname: "教程1", //项目名称
        project_type: 0, //教程种类
        download_num: 30, //下载数
        time_date: "2021-11-1", //创建日期
        time_clock: "14:10", //创建时间
        user_name: "用户1", //用户名
        notes: "备注", //备注
        checked: false, //是否被选中
        shownote: false, //是否显示备注
        key: "aaa", //标识教程自身的唯一标识符
        flag: true //搜索的标志
      },
      {
        projectname: "函数1",
        project_type: 1,
        download_num: 30,
        time_date: "2021-11-1",
        time_clock: "14:10",
        user_name: "用户2",
        notes: "备注", //备注
        checked: false, //是否被选中
        shownote: false, //是否显示备注
        key: "bbb", //标识教程自身的唯一标识符
        flag: true //搜索的标志
      },
      {
        projectname: "教程2",
        project_type: 0,
        download_num: 30,
        time_date: "2021-11-1",
        time_clock: "14:10",
        user_name: "用户3",
        notes: "备注", //备注
        checked: false, //是否被选中
        shownote: false, //是否显示备注
        key: "ccc", //标识教程自身的唯一标识符
        flag: true //搜索的标志
      }
    ],
    select_num: 0
  },
  /*单选框的选中方法
   */
  check: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var check = "showdata[" + index + "].checked";
    var checked = that.data.showdata[index].checked;
    if (!checked) {
      that.setData({
        [check]: true,
        "select_num": that.data.select_num + 1
      })
    } else {
      that.setData({
        [check]: false,
        "select_num": that.data.select_num - 1
      })
    }
  },
  /*单击下拉栏展示备注的方法
   */
  shownote: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var show = "showdata[" + index + "].shownote";
    var showed = that.data.showdata[index].shownote;
    if (!showed) {
      that.setData({
        [show]: true,
      })
    } else {
      that.setData({
        [show]: false,
      })
    }
  },
  /*单选框的取消方法
   取消所有单选的选中状态
   */
  selectquit: function (e) {
    var that = this;
    var index = 0;
    var check = "showdata[" + index + "].checked";
    var length = that.data.showdata.length;
    console.log(length);
    for (index = 0; index < length; index++) {
      check = "showdata[" + index + "].checked";
      that.setData({
        [check]: false,
      })
    }
    that.setData({
      "select_num": 0
    })
  },
  /*单选框的全选方法
   */
  selectall: function (e) {
    var that = this;
    var index = 0;
    var check = "showdata[" + index + "].checked";
    var length = that.data.showdata.length;
    console.log(length);
    for (index = 0; index < length; index++) {
      check = "showdata[" + index + "].checked";
      that.setData({
        [check]: true,
      })
    }
    that.setData({
      "select_num": length
    })
  },
  getSort: function (e) {
    console.log(e.detail);
    //按创建时间排序
    var compare1 = function (obj1, obj2) {
      var val1 = obj1.time_date;
      var val2 = obj2.time_date;
      if (val1 > val2) {
        return 1;
      } else if (val1 < val2) {
        return -1;
      } else if (val1 == val2) {
        if (obj1.time_clock > obj2.time_clock) return 1;
        else if (obj1.time_clock < obj2.time_clock) retrun - 1;
        else return 0;
      }
    }
    //按名称排序
    var compare2 = function (obj1, obj2) {
      var val1 = obj1.projectname;
      var val2 = obj2.projectname;
      if (val1 > val2) {
        return 1;
      } else if (val1 < val2) {
        return -1;
      } else {
        return 0;
      }
    }
    var newarray = this.data.showdata;
    for (var i = 0; i < this.data.showdata.length; i++) {
      newarray[i].flag = true;
    }
    if (e.detail.id == 1) {
      newarray.sort(compare1);
    } else if (e.detail.id == 2) {
      newarray.sort(compare2);
    } else if (e.detail.id == 3) { //只看教程类type=0
      for (var i = 0; i < this.data.showdata.length; i++) {
        if (newarray[i].project_type != 0) newarray[i].flag = false;
      }
    } else if (e.detail.id == 4) { //只看函数类
      for (var i = 0; i < this.data.showdata.length; i++) {
        if (newarray[i].project_type == 0) newarray[i].flag = false;
      }
    }
    this.setData({
      showdata: newarray
    })
  },
  //搜索与取消搜索
  userLikeSearch: function (e) {
    var that = this;
    var searchData = String(e.detail.searchData);
    searchData = searchData.replace(/\s*/g, ""); //正则表达式
    for (var i = 0; i < that.data.showdata.length; i++) {
      var objects = String(that.data.showdata[i].projectname);
      if (objects.indexOf(searchData) != -1) {
        that.data.showdata[i].flag = true;
      } else that.data.showdata[i].flag = false; //不显示
    }
    this.setData({
      showdata: that.data.showdata
    })
  },
  userLikeClearSearch: function () {
    var that = this;
    for (var i = 0; i < that.data.showdata.length; i++) {
      that.data.showdata[i].flag = true;
    }
    this.setData({
      showdata: that.data.showdata
    })
  },
  /*返回个人信息页面的方法
   */
  return: function () {
    wx.redirectTo({
      url: '../main/main'
    })
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