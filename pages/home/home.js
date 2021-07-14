// pages/home/home.js
var intt,time_Continue;
Page({

  /**
   * 页面的初始数据
   */
  // data: {
  //   hour: 0,
  //   minute: 0,
  //   second: 0,
  //   millisecond: 0,
  //   timecount: '00:00:00',
  //   cost: 0,
  //   flag: 1,

  //   endtime: "",
  //   menu_style: "menu"
  // },

  // /**
  //  * 生命周期函数--监听页面加载
  //  */
  // onLoad: function (options) {

  // },//开始
  // start: function () {
  //   var that = this;
  //   //停止（暂停）
  //   clearInterval(intt);
  //   //时间重置
  //   that.setData({
  //     hour: 0,
  //     minute: 0,
  //     second: 0,
  //     millisecond: 0,
  //   })
  //   intt = setInterval(function () { that.timer() }, 50);
  // },
  // //暂停
  // stop: function () {
  //   clearInterval(intt);
  // },
  // //停止
  // Reset: function () {
  //   var that = this
  //   clearInterval(intt);
  //   that.setData({
  //     hour: 0,
  //     minute: 0,
  //     second: 0,
  //     millisecond: 0,
  //     timecount: '00:00:00',
  //   })
  // },
  // timer: function () {
  //   var that = this;
  //   console.log(that.data.millisecond)
  //   that.setData({
  //     millisecond: that.data.millisecond + 5
  //   })
  //   if (that.data.millisecond >= 100) {
  //     that.setData({
  //       millisecond: 0,
  //       second: that.data.second + 1
  //     })
  //   }
  //   if (that.data.second >= 60) {
  //     that.setData({
  //       second: 0,
  //       minute: that.data.minute + 1
  //     })
  //   }

  //   if (that.data.minute >= 60) {
  //     that.setData({
  //       minute: 0,
  //       hour: that.data.hour + 1
  //     })
  //   }
  //   that.setData({
  //     timecount: that.data.hour + ":" + that.data.minute + ":" + that.data.second + ":" + that.data.millisecond
  //   })
  // },
  /**
   * 页面的初始数据
   */
  data: {
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    timecount: '00:00:00',
    cost: 0,
    flag: 1,
    isTiming: "noTiming",
    endtime: "",

    // 新加部分
    in_1: 1,
    in_2: 1,
    in_3: 1,
    a: {},
    arr: [],
    container: "container",
    center: "center"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },//开始
  start: function () {
    var that = this;
    //停止（暂停）
    clearInterval(intt);
    //时间重置
    that.setData({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      isTiming: "isTiming"
    })
    intt = setInterval(function () { that.timer() }, 50);

    // --------新加部分
    // 点击开始开始按钮消失，其他按钮出现
    that.setData({
      in_1: 0
    })
  },
  //暂停
  stop: function () {
    time_Continue=this.data.timecount
    clearInterval(intt);

    // 新加部分
    this.setData({
      in_2: 0,
      in_3: 0
    })
  },
  // 继续
  Continue: function () {
    let that=this
    that.setData({
      in_2: 1,
      in_3: 1,
      timecount:time_Continue
    })

    intt = setInterval(function () { that.timer() }, 50);
  },
  // 记录
  record: function () {
    var times = this.data.timecount, lastTime = '0:0:0:0'
    this.setData({
      // 使计时器上移
      container: 'container container_1',
      center: 'center center_1',
      // 重新赋值对象
      a: {
        time: times
      },
    })
    this.data.arr.push(this.data.a)
    // 重新修改arr
    this.setData({
      arr: this.data.arr
    })
    // console.log(this.data.timecount)
    // console.log(this.data.arr)

  },
  //重置
  Reset: function () {
    var that = this
    clearInterval(intt);
    that.setData({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      timecount: '00:00:00',
      isTiming: "noTiming",
      // 新加部分
      in_1: 1,
      in_2: 1,
      in_3: 1,
      arr: [],
      container: "container",
      center: "center"

    })
  },
  timer: function () {
    var that = this;
    // console.log(that.data.millisecond)
    that.setData({
      millisecond: that.data.millisecond + 5
    })
    if (that.data.millisecond >= 100) {
      that.setData({
        millisecond: 0,
        second: that.data.second + 1
      })
    }
    if (that.data.second >= 60) {
      that.setData({
        second: 0,
        minute: that.data.minute + 1
      })
    }

    if (that.data.minute >= 60) {
      that.setData({
        minute: 0,
        hour: that.data.hour + 1
      })
    }
    that.setData({
      timecount: that.data.hour + ":" + that.data.minute + ":" + that.data.second + ":" + that.data.millisecond
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
    this.setData({ menu_style: "menu" })
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
   * 点击菜单
   */
  menu: function () {

    // 切换图标
    switch (this.data.menu_style) {
      case "menu":
        this.setData({ menu_style: "closed" })
        break;
      case "closed":
        this.setData({ menu_style: "menu" })
        break;
      default:
        break;
    }

  },
  /**
   * 点击云计时
   */
  yunjishi: function () {
    this.setData({ menu_style: "menu" })
  },  /**
  * 点击多人计时
  */
  duoren: function () {
    
  },  /**
  * 点击外设计时
  */
 waishe: function () {
   
   wx.navigateTo({
     url: '../select/select',
   })
   
  },  /**
* 点击抢答器
*/
  qiangda: function () {

  },
  /**
   * 点击上传
   */
  upload: function () {
    wx.showModal({
      title: '提示',
      content: '是否上传本次计时数据',
      success(res) {
        if (res.confirm) {
          wx.showToast({
            title: '',
            icon: "loading",
            success: function () {
              setTimeout(() => {
                wx.showToast({
                  title: '已上传',
                })
              }, 3000);
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  }
})