// pages/project_select/project_select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    project_index:-1, //当前项目索引
    project_name:'',
    showdata:[],
    file_path:[],
    file_name:[],
    download_file_path:[],
  },

  choose_file:function(){
    var that = this;
    var temp_file_path = that.data.file_path;
    var temp_file_name = that.data.file_name;
    wx.chooseMessageFile({
      count:6,
      type:'file',
      success(res){
        var tempFilePaths
        for(var i=0;i<res.tempFiles.length;i++)
        {
          temp_file_path.push(res.tempFiles[i].path),
          temp_file_name.push(res.tempFiles[i].name)
        }
        that.setData({
          filePath:temp_file_path,
          file_name:temp_file_name
        })
        for(var i=0;i<res.tempFiles.length;i++)
        {
          wx.uploadFile({
            url:'#',//接口
            filePath: temp_file_path[i],
            name: temp_file_name[i],
            success(res){
              console.log('上传成功: '+temp_file_name[i])
            },
            fail(res){
              console.log('上传失败: '+temp_file_name[i]);
            }
          })
        }
      }
    })
  },
  open_file:function(event){
      var index = event.currentTarget.dataset.index
      console.log(index);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arr = wx.getStorageSync('itemlist');
    this.setData({
      project_index:options.id,
      showdata:arr,
      project_name:arr[options.id].projectname
    })
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