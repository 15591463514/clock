// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    now:0,
    last:null
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

  },
  /**
   * 输入框输入内容时，触发的函数
   */
  input: function(e){
    clearTimeout(wx.getStorageSync('timing'));
    this.data.now++
    // console.log(this.data.now);
    // 1.当数字为1是也就是按钮开始按下的时刻，记录时间为t0
    if(this.data.now ==1){
      var t0 = new Date().getTime();
      wx.setStorageSync('t0', t0);
      console.log("开始时间："+wx.getStorageSync('t0'));
      this.setData({
        t0
      });
    }
    // 2.当数字不变时，就是按钮松开的时刻，记录时间为t1
    // 添加一个时延函数为1000ms，用来判断数字是否在变，也就是说是否在按键盘
    var timing = setTimeout(() => {
      // this.data.last = this.data.now;
      // 结束时间
      var t1 = new Date().getTime();
      console.log("结束时间："+t1);
      // 最后按钮按下的时长 t=t1-t0-1000  
      var t = t1 - wx.getStorageSync('t0') -1000;
      console.log("用时:"+t+"ms");
      this.setData({
        t1,
        t:t+"ms"
      });
    }, 1000);
    // 将这个定时器的编号先存起来，下次在1000ms内再次执行input可取消该定时器，如果不取消就会显示stop记录时间
    wx.setStorageSync('timing', timing);   
  },
  /**
   * 点击重置
   */
  remake: function(){
    this.setData({
      now:0,
      t0:"",
      t1:"",
      t:""
    });
  }
})