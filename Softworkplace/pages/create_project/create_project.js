// pages/create_project/create_project.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectname: "", //项目名称
    people_num: 1, //项目人数
    notes: '', //备注
    people_max: 20, //项目最大人数
    time_date: '', //项目创建日期
    time_clock: '', //项目创建时间
    time_update:"",//项目修改时间
    switchto: false, //面向所有人
    open: false, //是否开启权限
    invitecode: "", //项目邀请码    
    key: '',
    time: '',
    flag: true //用于搜索并显示的标志
  },
  itemname(val) {
    this.setData({
      projectname: val.detail.value
    })

  },
  itemmask(val) {
    this.setData({
      notes: val.detail.value
    })

  },
  itemnum(val) {
    this.setData({
      people_max: val.detail.value
    })
  },
  switchto(val) {
    //console.log(val);
    this.setData({
      switchto: val.detail.value
    })
    var switchkey = '';
    if (this.data.switchto) {
      var selectChar = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
        'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
      ]
      for (let i = 0; i < 6; i++) {
        switchkey += selectChar[Math.floor(Math.random() * 36)]
      }
      this.setData({
        "invitecode": switchkey
      })
    } else {
      this.setData({
        "invitecode": null
      })
    }
  },
  opendata(val) {
    this.setData({
      open: val.detail.value
    })
  },
  
  makesure() {
    var switchkey = ''
    var select = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
      'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ]
    for (let i = 0; i < 6; i++) {
      switchkey += select[Math.floor(Math.random() * 36)]
    }
    this.setData({
      "key": switchkey
    })
    console.log(this.data.invitecode);
    console.log(this.data.key);
    if(this.data.people_max>20)
    {
      this.setData({
        "people_max":20
      })
    }
    let date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    let time = `${year}-${month}-${day}`
    wx.getStorage({
      key: 'itemlist'
    }).then(res => {
      let local = res.data
      local.push({
        projectname: this.data.projectname, //项目名称
        people_num: this.data.people_num, //项目人数
        notes: this.data.notes, //备注
        people_max: this.data.people_max, //项目最大人数
        time_date: time, //项目创建日期
        time_clock: "", //项目创建时间
        time_update:"",//项目修改时间
        switchto: this.data.switchto, //是否面向所有人
        invitecode: this.data.invitecode,//邀请码
        open: this.data.open,//是否开启权限
        key: this.data.key,//项目标识符
        flag: true //用于搜索的标志
      })

      wx.setStorage({
        key: "itemlist",
        data: local
      })
    }).catch(res => {
      let local = [{
        projectname: this.data.projectname, //项目名称
        people_num: this.data.people_num, //项目人数
        notes: this.data.notes, //备注
        people_max: this.data.people_max, //项目最大人数
        time_date: time, //项目创建日期
        time_clock: '', //项目创建时间
        time_update:"",//项目修改时间
        switchto: this.data.switchto, //面向所有人
        open: this.data.open,
        key: this.data.key,
        invitecode: this.data.invitecode,//邀请码
        flag: true
      }]
      wx.setStorage({
        key: "itemlist",
        data: local
      })

    })
    wx.redirectTo({
      url: '../create/create'
    })
    // if(local==''){
    //   local.push({
    //     projectname:this.data.projectname,//项目名称
    //     people_num:this.data.people_num,//项目人数
    //     notes:this.data.notes,//备注
    //     people_max:this.data.people_num,//项目最大人数
    //     time_date:time,//项目创建日期
    //     time_clock:'',//项目创建时间
    //     switchto:this.data.switchto,//面向所有人
    //     open:this.data.open,
    //     key:this.data.key,

    //   })

    //   wx.setStorage({
    //     key:"itemlist",
    //     data:local
    //   })
    //   // wx.request({
    //   //   url: ', //仅为示例，并非真实的接口地址
    //   //   data: local,
    //   //   header: {
    //   //     'content-type': 'application/json' // 默认值
    //   //   },
    //   //   success (res) {
    //   //     console.log(res.data)
    //   //   }
    //   // })


    // }else{
    //   local=[{
    //     projectname:this.data.projectname,//项目名称
    //     people_num:this.data.people_num,//项目人数
    //     notes:this.data.notes,//备注
    //     people_max:this.data.people_num,//项目最大人数
    //     time_date:time,//项目创建日期
    //     time_clock:'',//项目创建时间
    //     switchto:this.data.switchto,//面向所有人
    //     open:this.data.open,
    //     key:this.data.key,

    //   }]
    //   wx.setStorage({
    //     key:"itemlist",
    //     data:local
    //   })
    // }
  },

  return: function () {
    wx.redirectTo({
      url: '../create/create'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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