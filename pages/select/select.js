// pages/select/select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDel: false, // 是否是删除状态
  },

  /**
   * 点击添加：跳转到填写表单的界面
   */
  add: function(){

    wx.navigateTo({
      url: '../identity/identity',
    })

  },
  /**
   * 点击删除：
   */
  del: function(){

    // 每个人头像右上角出现红叉
    var isDel = !this.data.isDel;
    this.setData({
      isDel
    });

  },
  /**
   * 点击红叉：
   */
  del_icon: function(e){

    console.log(e.target.dataset.index);  // 被删除的索引
    console.log(e.target.dataset.idcard); // 被删除的idCard


    // 删除本地的
    var Users = this.data.Users;
    Users.splice(e.target.dataset.index, 1);
    this.setData({Users});

    // 删除数据库的
    var db = wx.cloud.database();
    var Users = db.collection("Users");

    // 将有关字段更改，并不会完全删除
    Users.where({
      idCard: e.target.dataset.idcard
    }).update({
      data:{
        exist:false
      },
      success: res=>{
        console.log("已经删除");
      }
    })
  },
  /**
   * 点击头像
   */
  pitchOn: function(e){

    // 对应的头像上显示选中图标
    var status = this.data.status;
    status[e.target.dataset.index] = true;
    this.setData({status});

    // 将选中的额对应的用户添加到新的数组中
    var Users = this.data.Users;
    var selectUsers = this.data.selectUsers;
    // console.log(Users[e.target.dataset.index]);
    selectUsers.push(Users[e.target.dataset.index]);
    this.setData({selectUsers});
  },
  /**
   * 点击选图标
   */
  unselect: function(e){

    // 取消选中状态
    var status = this.data.status;
    status[e.target.dataset.index] = false;
    this.setData({status});

    // 取消新的数组中的对应用户
    // console.log(e.target.dataset.idcard);
    var selectUsers = this.data.selectUsers;
    for(var i=0;i<selectUsers.length;i++){

      // console.log(this.data.selectUsers[i].idCard);
      // 如果idcard相同则删除对应用户
      if(selectUsers[i].idCard === (e.target.dataset.idcard)){ 
        // console.log(this.data.selectUsers[i]);
        selectUsers.splice(i,1);
        this.setData({selectUsers});
      }

    }

  },
  /**
   * 点击查看
   */
  look: function(){
    wx.navigateTo({
      url: '../usersdata/usersdata',
    })
  },
  /**
   * 点击确认
   */
  enter: function(){

    // 人数判断：范围在1~8之间
    console.log(this.data.selectUsers.length);
    if(this.data.selectUsers.length === 0){
      wx.showToast({
        title: '至少选择1人',
        icon: 'none'
      })
    }else if(this.data.selectUsers.length > 8){
      wx.showToast({
        title: '不可超过8人',
        icon: 'none'
      })
    }else{

      wx.setStorageSync('selectUsers', this.data.selectUsers)

      wx.navigateTo({
        url: '../main_1/main_1',
      })

    }

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

    // 每次显示页面，重新加载数据
    var db = wx.cloud.database();
    var Users = db.collection("Users");

    // 查询exist为true的成员
    Users.where({
      exist: true
    })
    .get({
      success: res=>{
        console.log(res); 
        
        // 使用fileID获取下载地址
        // 思路：遍历列表图像，一一拿出来，然后进行分别发送请求
        this.setData({
          Users: res.data
        });
        
        // var avatarDown = [];
        // var n = 1;
        // for(var i=0;i<this.data.Users.length;i++){
        //   console.log(n);
        
        //   if(n == 2){
            
        //   }else if(n == 1){
        //     n = 2;
        //     console.log(n);
        //     // console.log(res.data[i].fileID);
        //     console.log("这是第"+i+"张图");

        //     wx.cloud.downloadFile({
        //       fileID: res.data[i].fileID, // 文件 ID
        //       success: result => {
        //         n = 1;
        //         console.log(result.tempFilePath);
        //         // this.setData({avatarDown});
        //       },
        //       fail: console.error
        //     })
        //   }

        // }



        // 新建一个数组用于保存选中的状态
        var status = [];
        var selectUsers = [];
        for(var i=0;i<res.data.length;i++){
          status.push(false);
        }
        // console.log(status);
        this.setData({status,selectUsers});
      }
    });

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