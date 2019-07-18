//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
   },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(app);
      wx.createIntersectionObserver().relativeToViewport().observe('.userinfo', (res) => {
       console.log(res.id)  // 目标节点 id
       console.log(res.dataset.user) // 目标节点 dataset
        console.log(res.intersectionRatio) // 相交区域占目标节点的布局区域的比例
          console.log(res.intersectionRect) // 相交区域
            console.log(res.intersectionRect.left) // 相交区域的左边界坐标
              console.log(res.intersectionRect.top) // 相交区域的上边界坐标
                console.log(res.intersectionRect.width) // 相交区域的宽度
                  console.log(res.intersectionRect.height) // 相交区域的高度
      })
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    console.log(e.detail.userInfo);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
