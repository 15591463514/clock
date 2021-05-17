// pages/identity/identity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasAvatar: false, // 有头像？
    idList:["男","女"],  // 性别
    idIndex: 0, 
    disabled:false, // 禁用按钮
  },

   /**
   * 点击性别选择下拉列表
   */
  bindPickerChange: function(e){
    this.setData({
      idIndex:e.detail.value
    });
  },

  /**
   * 上传头像
   */
  upload: function(){

    wx.chooseImage({
      count: 1,
      success:(res)=>{
        console.log(res);
        console.log(res.tempFilePaths[0]);
        this.setData({
          avatar:res.tempFilePaths[0],
          hasAvatar: true
        });
      }
    })

  },

  /**
   * 点击提交
   */
  handlerSubmit: function(res){

    var that = this;
    
    
    // 判断是否有值，如果有值则可以提交
    if( this.data.hasAvatar &&  res.detail.value.UserName && res.detail.value.age){

      // 防治多次添加
      this.setData({
        disabled: true
      });

      console.log(res.detail.value);
      var idCard = new Date().getTime()+parseInt(Math.random()*100);  // 产生一个id

      wx.showLoading({
        title: '',
      })


      // 上传头像文件
      wx.cloud.uploadFile({
        cloudPath: 'avatar/' + res.detail.value.UserName + that.getFileExtendingName(that.data.avatar),
        filePath: that.data.avatar,
        success: result=>{
          console.log(result); 
            
          // 提交数据到数据库
          const db = wx.cloud.database();
          const Users = db.collection("Users");
          Users.add({
            data: {
              UserName: res.detail.value.UserName, // 用户姓名
              gender: res.detail.value.gender,  // 性别
              age: res.detail.value.age,  // 性别
              avatar: that.data.avatar, // 头像
              fileID: result.fileID, // 文件ID（映射到云存储的文件）
              exist: true, // 是否存在，false表示被删除
              idCard: idCard, // 随机ID
              log:[]
            },
            success: a=>{
              wx.showToast({
              title: '信息已保存',
              }); 
            }
          });

          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 500);

        },
        fail: error=>{
          console.log(error);
        }
      });
      
    }else{      
      wx.showToast({title: '请完善信息',icon: 'none'})
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
   * 获取文件后缀格式的正则表达式
   */
  getFileExtendingName: function (filename) {
    // 文件扩展名匹配正则
    var reg = /\.[^\.]+$/;
    var matches = reg.exec(filename);
    if (matches) {
      return matches[0];
    }
    return '';
  }
  
  // // 示例
  // var fName = 'dog.jpg';
  // console.log(getFileExtendingName(fName));   // ".jpg"
  

})