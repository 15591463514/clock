// pages/main_1/main_1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,  // 禁用开始键
    disInput: true,  // 禁用输入框
    disReset: false, //禁用重置
    disEmpty: false, //禁用清空
    focus: false,  // 输入框获取焦点
    value: "", // input中的内容
    arr: [], // 存放用户用时的数组
    index: [], // 存放用户id(arr中的num值)
    Array: ["-", "-", "-", "-", "-", "-", "-", "-"],
    button: "background-color:#353742;color:#B0B1B6;margin:10rpx",
    // Array_1:['-','-','-','-','-','-','-','-'], // 第一波计时
    // Array_2:['-','-','-','-','-','-','-','-'], // 第一波计时
    // Array_3:['-','-','-','-','-','-','-','-'], // 第一波计时
    current: 1,  // 当前时第几波
    countdown: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    

    // 加载界面，拿去select成员数组
    var Users = wx.getStorageSync('selectUsers');
    console.log(Users);
    for (var item of Users) {
      item.one = '-';
      item.two = '-';
      item.three = '-';
      this.setData({ Users });
    }

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
   * 点击开始按钮
   */
  start: function (e) {

    if (this.data.current <= 3) {


      // 禁用开始键,重置和清空
      this.setData({
        disabled: true,
        disReset: true,
        disEmpty: true
      });
      // 提示音：请睁眼，10秒倒计时
      console.log("请睁开眼睛");
      // wx.showToast({
      //   title: '准备',
      //   icon: 'none'
      // })
      // var audioOpen = wx.createInnerAudioContext();
      // audioOpen.autoplay = true;
      // audioOpen.src = 'cloud://sqs15591463514.7371-sqs15591463514-1302738333/count/audio/请睁开眼睛.mp3';

      var countdown = 0.01;
      var countDown = 0;
      var countLeft, countRight;
      if (countdown > 0) {
        var a = setInterval(() => {
          countdown = countdown - 0.01
          countDown = countdown.toFixed(2)
          countLeft = parseInt(countDown);
          countRight = countDown.slice(-2);
          this.setData({
            countdown,
            countDown,
            countLeft,
            countRight,
            a
          });

          if (parseInt(countDown) > 0) {
            // var warn =  parseInt(countDown) + "秒后开始";
            // wx.showToast({
            //   title: warn,
            //   icon: 'none'
            // })
          } else {
            // //获取十六进制随机数：
            // var A = (Math.round(Math.random() * 15)).toString(16);
            // var B = (Math.round(Math.random() * 15)).toString(16);
            // var C = (Math.round(Math.random() * 15)).toString(16);
            // var D = (Math.round(Math.random() * 15)).toString(16);
            // var E = (Math.round(Math.random() * 15)).toString(16);
            // var F = (Math.round(Math.random() * 15)).toString(16);
            // var countColor = "#" + A + B + C + D + E + F;
            // // console.log(countColor);
            // this.setData({ countColor });
          }



        }, 10);
      }

      // 10s之后：
      setTimeout(() => {
        // 提示音：请闭眼
        console.log("请闭上眼睛");
        // wx.showToast({
        //   title: '开始计时',
        //   icon: 'none'
        // });
        // var audioClose = wx.createInnerAudioContext();
        // audioClose.autoplay = true;
        // audioClose.src = 'cloud://sqs15591463514.7371-sqs15591463514-1302738333/count/audio/请闭上眼睛.mp3';
        var t_start = (new Date()).getTime();
        console.log(t_start);
        // 输入框可用,输入框获取焦点
        this.setData({
          disReset: false,
          disEmpty: false,
          disInput: false,
          focus: true,
          t_start
        });
      }, 0);

    }

    if (this.data.current >= 4) {

      wx.showToast({
        title: '三组数据已测完',
        icon: 'none'
      })

    }

  },

  /**
   * 监听input
   */
  input: function (e) {

    /** 函数 */
    // （封装）
    // 该用户的用时
    var fun1 = () => {
      var userTime = (new Date()).getTime() - this.data.t_start;
      console.log("用户" + e.detail.value + "用时：" + userTime + "ms");
      // 新建一个对象用于存放该用户信息
      var obj = {};
      obj.num = e.detail.value;
      obj.userTime = (userTime/1000).toFixed(2);
      // 将对象传到数组中
      var arr = this.data.arr;
      var index = this.data.index;
      // 检查
      if (index.includes(obj.num)) {
        console.log("重复");
      } else {
        // 放入
        index.unshift(e.detail.value);
        arr.unshift(obj);  //fun1()作为中间函数
        this.setData({ arr, index });
        var Array = this.data.Array;
        Array[parseInt(e.detail.value) - 1] = obj;
        this.setData({ Array });
        // 整理 
        if (this.data.current == 1) {
          var Users = this.data.Users;
          Users[parseInt(e.detail.value) - 1].one = obj.userTime;
          this.setData({ Users });
        }
        if (this.data.current == 2) {
          var Users = this.data.Users;
          Users[parseInt(e.detail.value) - 1].two = obj.userTime;
          this.setData({ Users });
        }
        if (this.data.current == 3) {
          var Users = this.data.Users;
          Users[parseInt(e.detail.value) - 1].three = obj.userTime;
          this.setData({ Users });
        }
        // 排序
        var arr1 = this.data.arr;
        arr1.sort(function (a, b) {
          return a.num - b.num;
        });
      }
    }


    /** 这里是相关的逻辑 */

    // （清空）
    // 将输入框的值清除为空
    this.setData({ value: "" });

    // （分割）  
    if (e.detail.value.length > 1) {
      var userTime = (new Date()).getTime() - this.data.t_start;
      var inString = e.detail.value;  // 用户输入值
      var inArr = inString.split("");   // split()方法用于将String拆分转化为Array;空字符串表示分别拆开
      console.log(inArr);
      for (var i = 0; i < inArr.length; i++) {
        // 分割，重组
        var obj1 = {};
        obj1.num = inArr[i];
        obj1.userTime = parseInt(userTime / 1000);
        console.log(obj1);
        //检查
        var arr = this.data.arr;
        var index = this.data.index;
        if (index.includes(obj1.num)) {
        } else {
          // 放入
          index.unshift(e.detail.value);
          arr.unshift(obj1);
          this.setData({ arr, index });
          var Array = this.data.Array;
          Array[parseInt(e.detail.value) - 1] = obj1;
          this.setData({
            Array
          });
          // 整理
          if (this.data.current == 1) {
            var Users = this.data.Users;
            Users[parseInt(inArr[i]) - 1].one = obj1.userTime;
            this.setData({ Users });
          }
          if (this.data.current == 2) {
            var Users = this.data.Users;
            Users[parseInt(inArr[i]) - 1].two = obj1.userTime;
            this.setData({ Users });
          }
          if (this.data.current == 3) {
            var Users = this.data.Users;
            Users[parseInt(inArr[i]) - 1].three = obj1.userTime;
            this.setData({ Users });
          }
          // 排序
          var arr1 = this.data.arr;
          arr1.sort(function (a, b) {
            return a.num - b.num;
          });

        }
      }
    } else {
      fun1();
    }






  },
  /**
   * input失去焦点触发
   */
  blur: function () {
    this.setData({
      focus: true  // 失去焦点自动重新获取焦点
    });
  },
  /**
   * 点击保存：
   */
  save: function () {

    var that = this;
    var Time = new Date().getTime();
    var date = new Date(Time);
    var Y, M, D, h, m, s;
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    var _Time = Y + M + D + h + m + s;
    console.log(_Time);

    var db = wx.cloud.database();
    var _ = db.command;
    var Users = db.collection('Users');

    // 测试完的数据列颜色变深
    if (this.data.current == 1) {
      this.setData({ timeOne: "timeOne" });
      // 向数据库添加数据
      console.log(this.data.Users);
      for (var item of this.data.Users) {
        Users.where({
          idCard: item.idCard
        })
          .update({
            data: {
              log: _.push([{ date: Time, _data: _Time, spentTime: item.one }])
            }
          })
      }

    }
    if (this.data.current == 2) {
      this.setData({ timeTwo: "timeTwo" });
      // 向数据库添加数据
      console.log(this.data.Users);
      for (var item of this.data.Users) {
        Users.where({
          idCard: item.idCard
        })
          .update({
            data: {
              log: _.push([{ date: Time, _data: _Time, spentTime: item.two }])
            }
          })
      }
    }
    if (this.data.current == 3) {
      this.setData({ timeThree: "timeThree" });
      // 向数据库添加数据
      console.log(this.data.Users);
      for (var item of this.data.Users) {
        Users.where({
          idCard: item.idCard
        })
          .update({
            data: {
              log: _.push([{ date: Time, _data: _Time, spentTime: item.three }])
            }
          })
      }
    }


    if (this.data.current <= 3) {
      // 波数加一
      this.data.current++;
      // 即将开始下一波计时
      wx.showToast({
        title: '该次计时已保存'
      });
      // 禁用保存键，启用开始键，
      this.setData({
        disabled: false,
        disInput: true,  //禁用input
        arr: [],  // 数组清空
        countdown: null,  // 倒计时归零
        index: [],  // 用户id清零
        Array: [1, 2, 3, 4, 5, 6, 7, 8], // 显示清零
      });
      clearInterval(this.data.a);
    }

  },

  /**
   * 点击重置：
   */
  reset: function () {

    this.setData({
      disabled: false,  // 可以点击开始了
      disInput: true,  //禁用input
      arr: [],  // 数组清空
      countdown: null,  // 倒计时归零
      index: [],  // 用户id清零
      Array: [1, 2, 3, 4, 5, 6, 7, 8], // 显示清零
    });
    var Users = this.data.Users;
    for (var i = 0; i < Users.length; i++) {
      if (this.data.current == 1) {
        Users[i].one = '-';
      }
      if (this.data.current == 2) {
        Users[i].two = '-';
      }
      if (this.data.current == 3) {
        Users[i].three = '-';
      }
    }
    this.setData({ Users })



    clearInterval(this.data.a);
  },
  /**
     * 点击清空
     */
  clear: function () {

    wx.showModal({
      title: '提示',
      content: '是否清空本次测试所有记录',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定');
          var Users = this.data.Users;
          for (var i = 0; i < Users.length; i++) {
            Users[i].one = '-';
            Users[i].two = '-';
            Users[i].three = '-';
          }
          this.setData({
            Users, //三次记录清空
            current: 1,  // 重置为第一波
            disabled: false,  // 可以点击开始
            arr: [],  // 数组清空
            countdown: null,  // 倒计时归零
            index: [],  // 用户id清零
            Array: [1, 2, 3, 4, 5, 6, 7, 8], // 显示清零
            timeOne: '',
            timeTwo: '',
            timeThree: ''
          })
          clearInterval(this.data.a);
        } else if (res.cancel) {
          console.log('用户点击取消')

        }
      }
    })

  }

})

// 清空所有数据后可以再次点击开始，current为1