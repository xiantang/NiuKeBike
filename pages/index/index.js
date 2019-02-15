Page({
  data: {
    longitude: 0,
    latitude: 0,
    controls: [],
    logit: 0,
    latit: 0,
    markers: []
  },
  onLoad: function() {
    var that = this;
    wx.getLocation({
      success: function(res) {
        // console.log(res)
        var log = res.longitude;
        var lat = res.latitude;
        that.setData({
          longitude: log,
          latitude: lat
        })
      },
    })
    wx.getSystemInfo({
      success: function(res) {
        var windowWidth = res.windowWidth
        var windowHeight = res.windowHeight
        that.setData({
          controls: [{
              id: 0,
              iconPath: '/images/scan.png',
              position: {
                width: 100,
                height: 100,
                left: windowWidth / 2 - 50,
                top: windowHeight - 160
              },
              clickable: true
            },
            {
              id: 1,
              iconPath: '/images/locate.png',
              position: {
                width: 30,
                height: 30,
                left: 0,
                top: windowHeight - 160
              },
              clickable: true
            },
            {
              id: 2,
              iconPath: '/images/hongbao.png',
              position: {
                width: 30,
                height: 30,
                left: windowWidth - 30,
                top: windowHeight - 160
              },
              clickable: true
            },
            {
              id: 3,
              iconPath: '/images/baojing.png',
              position: {
                width: 30,
                height: 30,
                left: windowWidth - 30,
                top: windowHeight - 160 - 30
              },
              clickable: true
            },
            {
              id: 4,
              iconPath: '/images/cur.png',
              position: {
                width: 30,
                height: 30,
                left: windowWidth / 2 - 15,
                top: windowHeight / 2 - 15
              },
              clickable: true
            },
            {
              id: 5,
              iconPath: '/images/add.png',
              position: {
                width: 30,
                height: 30,
              },
              clickable: true
            }
          ]
        })
      },
    })

  },

  onReady: function() {
    // 创建Map 上下文
    this.mapCtx = wx.createMapContext("myMap")
  },
  controltap: function(e) {
    var cid = e.controlId;
    switch (cid) {
      case 0:
      {
        // 点击扫码
          var status = getApp().globalData.status;
          if(status==0){
            //跳转到注册也页面
            wx.navigateTo({
              url: '../register/register',
            })
          } 
        break
      }
      case 1:
        {
          this.mapCtx.moveToLocation()
          break;
        }
      case 5:
        {
          var bikes = this.data.markers;
          var that = this
          this.mapCtx.getCenterLocation({
            success: function(res) {
              var log = res.longitude
              var lat = res.latitude
              // bikes.push({
              //   iconPath: '/images/bike@red.png',
              //   width: 35,
              //   height: 40,
              //   longitude: log,
              //   latitude: lat
              // }) 
              // that.setData({
              //   markers: bikes
              // })
              wx.request({
                url: 'http://localhost:8080/bike/add',
                data:{
                  longitude:log,
                  latitude:lat,
                  bikeNo:1000
                },
                method:'POST',
                success:function(res){
                  console.log(res)
                }
              })
            }

          })

          
          break;
        }
    }
  }

})