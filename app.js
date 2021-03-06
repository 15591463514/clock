//app.js
App({
  onLaunch: function () {
  
    // 初始化云开发
    wx.cloud.init({
      env: 'sqs15591463514'
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // // 监听蓝牙设备
    // // -1.初始化蓝牙模块
    // wx.openBluetoothAdapter({
    //   success:(res)=>{
    //     console.log(res);
    //   },
    //   fail:(err)=>{
    //     console.log(err);
    //   }
    // })

    // setTimeout(() => {
    //   // -2.监听寻找到新设备的事件
    //   wx.onBluetoothDeviceFound(function(res) {
    //     console.dir(res)
    //   })
    // }, 1000);
    
    





  },
    // 设置监听器
    watch: function (ctx, obj) {
      Object.keys(obj).forEach(key => {
        console.log(ctx, obj);
        this.observer(ctx.data, key, ctx.data[key], function (value) {
          obj[key].call(ctx, value)
        })
      })
    },
    // 监听属性，并执行监听函数
    observer: function (data, key, val, fn) {
      Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get: function () {
          return val
        },
        set: function (newVal) {
          if (newVal === val) return
          fn && fn(newVal)
          val = newVal
        },
      })
    },



  globalData: {
    userInfo: null
  }
})