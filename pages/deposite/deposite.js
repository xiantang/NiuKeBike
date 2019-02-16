// pages/deposit/deposit.js
var myUtils = require("../../utils/myUtil.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  deposit:function(){
    var that = this;
    //获取用户的手机号
    var phoneNum = myUtils.get("phoneNum")
    wx.showModal({
      title:"提示",
      content:"是否进行充值",
      success:function(res){
        if(res.confirm){
          wx.showLoading({
            title: '正在充值',
            mask:true
          })
          // console.log(myUtils.get("phoneNum"))
        wx.request({
          url: 'http://localhost:8080/user/deposite',
          
          method:"POST",
          data:{
              phoneNum:phoneNum,
              deposit:299,
              status:2
          },
          success:function(res){
            // 关闭充值中的加载对话框
            wx.hideLoading()
            if(res.data){
              wx.navigateTo({
                url: '../identify/identify',
              })
              getApp().globalData.status = 2 
              wx.setStorageSync("status",2)
            }
            
          }
        })
        }
      }
    })
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
  
  }
})