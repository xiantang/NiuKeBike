var myUtil = require("../../utils/myUtil")

Page({
  data: {
    longitude: 0,
    latitude: 0,
    controls: [],
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
        findBikes(log,lat,that)
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
          var status = myUtil.get("status")
          
          console.log(status)
          if(status==0){
            //跳转到注册也页面
            wx.navigateTo({
              url: '../register/register',
            })
          }
          else if(status ==1){
            wx.navigateTo({
              url: '../deposite/deposite',
            })
          }
          else if(status == 2){
            wx.navigateTo({
              url: '../identify/identify',
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
                  location: [log,lat],
                  bikeNo:1000
                },
                method:'POST',
                success:function(res){

                  findBikes(log,lat,that)
                  
                
                }
              })
            }

          })

          
          break;
        }
    }
  },
  regionchange:function(e){

    var that = this
    var etype = e.type
    if(etype=="end"){
      this.mapCtx.getCenterLocation({
        success:function(res){
          var lat = res.latitude
          var log = res.longitude
          findBikes(log,lat,that)

        }
      })
    }
  }

})
function findBikes(longitude,latitude,that){
  wx.request({
    url:"http://localhost:8080/bike/findNear",
    method:"GET",
    data:{
      longitude:longitude,
      latitude:latitude
    },
    success:function(res){
      console.log(res)
      var bikes = res.data.map((bike)=>{
        return  {
          longitude:bike.content.location[0],
          latitude:bike.content.location[1],
          width: 35,
          height: 40,
          iconPath:'/images/bike@red.png'
        }
      }
      
      )
      that.setData({
        markers:bikes
      })
    }
  })


}