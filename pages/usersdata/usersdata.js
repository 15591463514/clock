// pages/usersdata/usersdata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    checked: false,
    hidden: "none" 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var db = wx.cloud.database();
    var Users = db.collection('Users');
    Users.where({
      exist: true
    }).get({
      success: res => {
        // console.log(res);
        this.setData({
          Users: res.data
        });
      }
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

  },
  /**
   * 点击查看播放记录
   */
  show: function (e) {
    console.log(e.currentTarget.dataset.any);
    this.setData({
      hidden: "block",
      detail: e.currentTarget.dataset.any,
      hiddenmodalput: false
    });

  },

  /*
   * 
   */
  cancel: function () {

    this.setData({
      hiddenmodalput: true
    })

  },
  /**
   * 点击开关：
   */
  switchchange: function () {

    var checked = !this.data.checked;
    this.setData({
      checked
    });

  },
  /**
   * 点击折线图，表格隐藏
   */
  hidden: function () {

    this.setData({
      hidden: "none"
    })

  }


})