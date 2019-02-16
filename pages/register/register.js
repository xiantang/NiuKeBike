// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countryCodes: ["86", "80", "84", "87"],
    countryCodeIndex: 0,
    phoneNum: ""
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

  bindCountryCodeChange: function (e) {
    //console.log('picker country code 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countryCodeIndex: e.detail.value
    })
  },

  inputPhoneNum: function (e) {
    // console.log(e)
    this.setData({
      phoneNum: e.detail.value
    })
  },

  genVerifyCode: function () {
    var index = this.data.countryCodeIndex;
    var countryCode = this.data.countryCodes[index];
    var phoneNum = this.data.phoneNum;
    // console.log(countryCode,phoneNum)
    wx.request({
      //小程序访问的网络请求协议必须是https，url里面不能有端口号
      url: "http://localhost:8080/user/genCode",
      data: {
        countryCode: countryCode,
        phoneNum: phoneNum
      },
      method: 'GET',
      success: function (res) {
        wx.showToast({
          title: '已发送，请查收!',
          duration: 2000
        })
        // console.log(res)
      }
    })
  },

  formSubmit: function (e) {
    var phoneNum = e.detail.value.phoneNum;
    var verifyCode = e.detail.value.verifyCode;
    wx.request({
      url: 'http://localhost:8080/user/verify',
    method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
    data:{
      phoneNum:phoneNum,
      verifyCode:verifyCode
    },
    success:function(res){
      if(res.data){
          wx.request({
            url: 'http://localhost:8080/user/register',
            method:"POST",
            // header: {
            //   'content-type': 'application/x-www-form-urlencoded'
            // },
            data:{
              phoneNum:phoneNum,
              regDate:new Date(),
              status:1
            },
            success: function (res) {
              if(res.data){
                wx.navigateTo({
                  url: '../deposite/deposite',
                })
                // 记录用户信息 
                // 0 未注册 1 绑定 2实名认证
                getApp().globalData.status = 1 
                getApp().globalData.phoneNum = phoneNum
                wx.setStorageSync("status",1)
                wx.setStorageSync("phoneNum",phoneNum)
              }else{
                wx.showModal({
                  title: '提示',
                  content: '服务端错误，请稍后再试',
                })
              }

            }

            
          })
      }else{
        wx.showModal({
          title: '提示',
          content: '输入的验证码有误！',
        })
      }
    }
    })
  }


})