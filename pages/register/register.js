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
    console.log(e)
    this.setData({
      phoneNum: e.detail.value
    })
  },

  genVerifyCode: function () {
    var index = this.data.countryCodeIndex;
    var countryCode = this.data.countryCodes[index];
    var phoneNum = this.data.phoneNum;
    console.log(countryCode,phoneNum)
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
      }
    })
  },

  formSubmit: function (e) {
    var phoneNum = e.detail.value.phoneNum;
    var verifyCode = e.detail.value.verifyCode;
    wx.request({
      url: 'http://localhost:8080/user/verify',
      //POST的请求头是application/json,未来后台可以接受对应的参数，改变请求头
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        phoneNum: phoneNum,
        verifyCode: verifyCode
      },
      success: function(res){
        if(res.data){//校验成功
          //将数据保存到mongodb中
          wx.request({
            url: 'http://localhost:8080/user/register',
            method: 'POST',
            data: {
              phoneNum: phoneNum,
              regDate: new Date(),
              status: 1
            },
            //跳转到充值押金页面
            success: function (res) {
              if (res.data) {//跳转到充值押金页面
                wx.navigateTo({
                  url: '../deposit/deposit',
                })
                //记录用户状态，0：未注册，1：绑定完手机号，2：已实名认证
                //更新getAPP().globalData中的数据，是更新到内存中的数据
                getApp().globalData.status = 1
                getApp().globalData.phoneNum = phoneNum
                //将用户的信息保存到手机存储卡中
                wx.setStorageSync('status', 1)
                wx.setStorageSync("phoneNum", phoneNum)
              } else {//用户信息保存失败
                wx.showModal({
                  title: '提示',
                  content: '服务器端错误，请稍后再试！',
                })
              }
            }
          })
          }else{//校验失败
          wx.showModal({
            title: '提示',
            content: '您输入的验证码有误，请重新输入',
            showCancel: false
          })
        }
      }
    })
  }



})