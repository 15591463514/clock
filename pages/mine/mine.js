// pages/mine/mine.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    theme: "white",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let _this = this
    // 一、加载个人信息
    _this.setData({
      userInfo: wx.getStorageSync('UserInfo')
    })

    // 二、渲染主题
    // app.changeTheme(_this)



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
   * set
   */
  set: function () {
    wx.navigateTo({
      url: '../set/set',
    })
  },
  watchBack: function (value) {
    this.setData({
      clock: value
    })
  },
  /**
   * person
   */
  person: function(){
    wx.navigateTo({
      url: '../person/person',
    })
  }
})