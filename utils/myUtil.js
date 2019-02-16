// 查找的DATA
function get(key) {
    var status = wx.getStorageSync(key)
    if (!status) {
        status = getApp().globalData[key];
    }
    return status
}

module.exports ={
    get
}