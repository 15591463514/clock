// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    theme: "white",
    userInfo: {},
    hasUserInfo: false,
    showText: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {

    setTimeout(()=>{
      this.setData({
        showText: true
      })
    },1000)


    if (wx.getStorageSync('hasUserInfo') == true) {
      console.log("tiao");
      wx.switchTab({
        url: '../home/home',
      })
    }


    // 调用监听器，监听数据变化
    // hasUserInfo是要监听的数据
    app.watch(this, {
      hasUserInfo: function (newVal) {
        console.log(newVal)
        console.log("已经获取到用户信息，可以跳转了");
        wx.switchTab({
          url: '../home/home',
        })
      }
    })






  },

  getInfo() {
    wx.getUserProfile({
      desc: "我是描述",
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.setStorageSync('hasUserInfo', true)
        wx.setStorageSync('UserInfo', res.userInfo)
      },
      fail: (err) => {
        console.log(err);
      }
    })
  }

})

