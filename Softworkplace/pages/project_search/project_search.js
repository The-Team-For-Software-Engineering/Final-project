// pages/project/project.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectArray: [
      {
        id: "1",
        text: "按修改时间",
      },
      {
        id: "2",
        text: "按创建时间",
      },
      {
        id: "3",
        text: "按项目名称",
      },
      {
        id: "4",
        text: "按项目大小",
      },
    ],
    /**
     * 用于在页面中展示的项目数据块。包含项目名称，人数，修改日期，最大人数等。这里是用于测试页面动态渲染的预设数据，实际数据应当在页面加载时从后端接口动态获取。数据格式可根据实现需求自行调整，但应当告知视图层负责人员用于调整渲染内容
     */
    showdata: [
      {
        projectname: "项目1", //项目名称
        people_num: 10, //项目人数
        people_max: 20, //项目最大人数
        time_date: "2021-11-1", //项目创建日期
        time_clock: "14:10", //项目创建时间
        key: "aaa", //标识项目自身的唯一标识符
        invitecode: "10000001", //项目邀请码
        notes: "备注", //备注
        shownote: false, //是否显示备注
        open: true, //是否开启权限
        flag: true, //搜索用标志
        show: false, // 显示隐藏
      },
      {
        projectname: "项目2",
        people_num: 10,
        people_max: 20,
        time_date: "2021-11-1",
        time_clock: "14:10",
        key: "bbb", //标识项目自身的唯一标识符
        invitecode: "10000002", //项目邀请码
        notes: "备注", //备注
        shownote: false, //是否显示备注
        open: true, //是否开启权限
        flag: true, //搜索用标志
        show: false,
      },
      {
        projectname: "项目3",
        people_num: 10,
        people_max: 20,
        time_date: "2021-11-1",
        time_clock: "14:10",
        key: "ccc", //标识项目自身的唯一标识符
        invitecode: "10000003", //项目邀请码
        notes: "备注", //备注
        shownote: false, //是否显示备注
        open: true, //是否开启权限
        flag: true, //搜索用标志
        show: false,
      },
    ],
    select_num: 0,
    more_menu: false,
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
        select_num: that.data.select_num + 1,
      });
    } else {
      that.setData({
        [check]: false,
        select_num: that.data.select_num - 1,
      });
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
      });
    }
    that.setData({
      select_num: 0,
      more_menu: false,
    });
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
      });
    }
    that.setData({
      select_num: length,
    });
  },
  /*TODO:排序选择框的排序方法
   */
  /*TODO:排序选择框的排序方法
   */
  getSort: function (e) {
    console.log(e.detail);
    //按创建时间排序
    var compare1 = function (obj1, obj2) {
      if (obj1.time_date > obj2.time_date) {
        return 1;
      } else if (obj1.time_date < obj2.time_date) {
        return -1;
      } else if (obj1.time_date == obj2.time_date) {
        if (obj1.time_clock > obj2.time_clock) return 1;
        else if (obj1.time_clock < obj2.time_clock) retrun - 1;
        else return 0;
      }
    };
    //按项目名称排序
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
    };
    //按项目人数
    var compare3 = function (obj1, obj2) {
      if (obj1.people_num > obj2.people_num) return 1;
      else if (obj1.people_num < obj2.people_num) return -1;
      else {
        if (obj1.people_max > obj2.people_max) return 1;
        else if (obj1.people_max > obj2.people_max) return -1;
        else return 0;
      }
    };
    var newarray = this.data.showdata;
    if (e.detail.id == 1) {
      newarray.sort(compare1);
    } else if (e.detail.id == 2) {
      newarray.sort(compare2);
    } else if (e.detail.id == 3) {
      newarray.sort(compare3);
    }
    this.setData({
      showdata: newarray,
    });
  },
  /*重定向到加入项目的方法
   */
  project_join: function () {
    wx.redirectTo({
      url: "../project_join/project_join",
    });
  },
  /*重定向到退出项目的方法
   */
  project_quit: function () {
    wx.redirectTo({
      url: "../project_quit/project_quit",
    });
  },
  /*重定向到个人信息页面的方法
   */
  return: function () {
    wx.redirectTo({
      url: "../main/main",
    });
  },
  //搜索与取消搜索
  projectsSearch: function (e) {
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
      showdata: that.data.showdata,
    });
  },
  projectsClearSearch: function () {
    var that = this;
    for (var i = 0; i < that.data.showdata.length; i++) {
      that.data.showdata[i].flag = true;
    }
    this.setData({
      showdata: that.data.showdata,
    });
  },
  onLoad: function (options) {
    /**
     * 等待实现的功能：在页面加载时动态获取后端接口的数据，注入showData数据块中，用于页面动态渲染与其他进一步操作。
     */
  },
  onLoad: function (options) {
    /**
     * 等待实现的功能：在页面加载时动态获取后端接口的数据，注入showData数据块中，用于页面动态渲染与其他进一步操作。
     */
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  // 显示/隐藏
  showClick(obj) {
    const { detail } = obj;
    const temArr = this.data.showdata.map((ele) => {
      if (ele.checked) {
        if (detail === "show") ele.show = true;
        if (detail === "hide") ele.show = false;
        return {
          ...ele,
        };
      }
      return { ...ele };
    });
    this.setData({
      showdata: temArr,
    });
  },
  // share() {
  //   console.log(111);
  //   wx.onMenuShareAppMessage({
  //     title: "标题444444", // 分享标题
  //     link: "http://newshop.zhifengwangluo.c3w.cc/index.php/Mobile/goods/test",
  //     desc: "6666655555555",
  //     imgUrl:
  //       "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558110966988&di=487dff7a53e677bc488c9eefd997d9df&imgtype=0&src=http%3A%2F%2Fk.zol-img.com.cn%2Fsjbbs%2F7692%2Fa7691515_s.jpg", // 分享图标
  //   });
  // },
  onShareAppMessage: function () {
    return {
      title: "弹出分享时显示的分享标题",
      desc: "分享页面的内容",
      path: "/pages/project/project", // 路径，传递参数到指定页面。
    };
  },
});
