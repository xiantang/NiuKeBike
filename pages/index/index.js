
Page({
  data: {
    longitude: 0,
    latitude: 0 ,
    controls:[]
  },
  onLoad: function () {
    var that = this;
    wx.getLocation({
      success: function(res) {
        // console.log(res)
        var log = res.longitude;
        var lat = res.latitude;
        that.setData({
          longitude:log,
          latitude:lat
        })
      },
    })
    wx.getSystemInfo({
      success: function(res) {
        var windowWidth = res.windowWidth
        var windowHeight = res.windowHeight
        that.setData({
          controls: [
            {
              id: 1,
              iconPath: '/images/scan.png',
              position: {
                width: 100,
                height: 100,
                left: windowWidth/2-50,
                top: windowHeight-160
              },
              clickable:true
            }
          ]
        })
      },
    })
    
  }
})
