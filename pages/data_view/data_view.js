import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
let chart = null

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '',
      left: 'center'
    },
    legend: {
      data: ['pro', 'shi', 'SQS'],
      top: 20,
      left: 'center',
      backgroundColor: '#b9c2fa',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1', '2', '3', '4', '5', '6', '7'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },

    

  };





  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    },
    showMenu: "fold",
    tab: "close",
    showchart: "",
    showjson: "hidejson",
    recordTime: 0,          // 要查看记录的次数
    selectUsers: [],        // 要查看的人员
    comp: ""
  },

  onReady() {
    wx.showToast({
      title: "请选择数据",
      icon: "none"
    })

    setTimeout(() => {
      this.setData({
        showchart: "no"
      })
    }, 100);

  },
  /**
   * 选择图标
   */
  showMenu: function () {

    if (this.data.tab === "open") {
      this.setData({ tab: "close" })
    }
    if (this.data.showjson === "showjson") {
      this.setData({ showjson: "hidejson" })
    }
    switch (this.data.showMenu) {
      case "fold":
        this.setData({ showMenu: "unfold" })
        break;
      case "unfold":
        this.setData({ showMenu: "fold" })
        break;
    }
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {

    this.setData({
      // tab: "close",
      showMenu: "fold"
    })

    // 每次显示页面，重新加载数据
    var db = wx.cloud.database();
    var Users = db.collection("Users");

    // 查询exist为true的成员
    Users.where({
      exist: true
    })
      .get({
        success: res => {
          console.log(res);

          // 使用fileID获取下载地址
          // 思路：遍历列表图像，一一拿出来，然后进行分别发送请求
          res.data.forEach((value) => {
            value.status = 'noS'
          })

          this.setData({
            Users: res.data
          });

        }
      });

  },
  /**
   * 选项
   */
  menu: function () {

    // 清除selectUsers
    // this.setData({
    //   selectUsers:[]
    // })

    if (this.data.showMenu === "unfold") {
      this.setData({ showMenu: "fold" })
    }

    switch (this.data.tab) {
      case "close":
        this.setData({ tab: "open", showchart: "no", showjson: "hidejson" })
        break;
      case "open":
        this.setData({ tab: "close", showchart: "yes", showjson: "hidejson" })
        break;
    }

  },
  /**
* 点击头像
*/
  pitchOn: function (e) {

    

    var Users = this.data.Users
    console.log(e.target.dataset.index);

    switch (Users[e.target.dataset.index].status) {

      case "noS":
        // 用户状态是未选中

        if(this.data.selectUsers.length===8){
          // 如果人数超过8，则直接退出函数
          return
        }

        // 1、让头像亮起来
        Users[e.target.dataset.index].status = "isS"

        // 2、将选中的人添加到selectUsers中
        this.data.selectUsers.push(Users[e.target.dataset.index])

        break;

      case "isS":
        // 用户状态是选中
        // 1、让头像灭掉
        Users[e.target.dataset.index].status = "noS"
        console.log(Users[e.target.dataset.index])
        // 2、将该人员从selectUsers中删除
        // 2.1 该用户的idCard值是
        console.log(Users[e.target.dataset.index].idCard)
        // 2.2 循环遍历selectUsers，将idcard比较，
        this.data.selectUsers.forEach((value, index, array) => {
          console.log(value.idCard);
          // 2.3 如果相等，则删除掉
          if (Users[e.target.dataset.index].idCard === value.idCard) {
            this.data.selectUsers.splice(index,1)
          }
        })
        break;
    }

    this.setData({
      Users: Users
    })


  },

  /**
   * 点击确认
   */
  confirm: function () {

    if(this.data.selectUsers.length===0||this.data.recordTime===0||this.data.comp===''){
      wx.showToast({
        title: '选择数据不完整',
        icon:'none'
      })
      return
    }

    // 用户选择的查看的数据是多少

    this.setData({
      tab: "close",
      showchart:'yes'
    })


    // 获取选中人数的姓名
    let names=[]
    this.data.selectUsers.forEach((value)=>{
        names.push(value.UserName)
    })

    // 获取横坐标的值
    let Xdata = []
    for(let i=0;i<this.data.recordTime;i++){
      Xdata.push(i+1)
    }

    // 获取记录值
    let detailData = []
    this.data.selectUsers.forEach((value)=>{

      // 对数据进行处理-
      let array = []
      for(let i=0;i<value.log.length;i++){
        // console.log(value.log[i].spentTime)
        // 格式转换
        if(value.log[i].spentTime === '-'){
          value.log[i].spentTime = 0
        }
        if( typeof value.log[i].spentTime === 'string'){
          value.log[i].spentTime = Number(value.log[i].spentTime)
        }
        array.push(value.log[i].spentTime)
      }
      

      let obj = {
        "name": value.UserName,
        "type": "line",
        "smooth": true,
        "data": array.slice(Number('-'+ (this.data.recordTime + 1)), -1)
      }
      detailData.push(obj)
    })

    this.setData({
      detailData
    })

    let option = {
      title: {
        text: '',
        left: 'center'
      },
      legend: {
        data: names,
        top: 20,
        left: 'center',
        backgroundColor: '#b9c2fa',
        z: 100
      },
      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: Xdata,
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      },

      series: this.data.detailData

    };


    console.log(chart);
    
    setTimeout(()=>{
      chart.setOption(option, true)
    },300)





  },
  /**
   * 点击json
   */
  json: function () {


    switch (this.data.showjson) {
      case "hidejson":
        this.setData({
          tab: "close",
          showMenu: "fold",
          showchart: "no",
          showjson: "showjson"
        })
        break;
      case "showjson":
        this.setData({
          tab: "close",
          showMenu: "fold",
          showchart: "yes",
          showjson: "hidejson"
        })
        break;
    }


  },
  time3: function () {
    this.setData({ recordTime: 3 })
  },
  time7: function () {
    this.setData({ recordTime: 7 })
  },
  time15: function () {
    this.setData({ recordTime: 15 })
  },
  comp_jishiqi: function(){
    this.setData({comp: 'jishiqi'})
  },
  comp_yunjishi: function(){
    this.setData({comp: 'yunjishi'})
  },
  comp_waishejishi: function(){
    this.setData({comp: 'waishejishi'})
  }


});

