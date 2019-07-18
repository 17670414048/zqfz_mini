// pages/mine/mine.js
let d = new Date();
let year = d.getFullYear();
let month = d.getMonth() + 1;
const app = getApp();
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log('onload')
    this.initStatis();
    this.initArrears();
    this.initTruant();
    // this.initLeaveask();
  },

  onShow() {
    // console.log('onshow');
    this.initLeaveask();
  },
  /**
   * 页面的初始数据
   */
  data: {
    title: '我',
    showDate: false,
    y: year,
    m: month,
    total_times: 0, //总课时
    time_count: 0, //以上课时
    arrears: [], //欠费列表
    arrears_count: 0, //欠费次数
    truantList: [], //旷课列表
    leaveask: [], //请假列表
  },
  back() {
    wx.navigateBack({
      delta: 1
    });

  },
  goDate() {
    this.setData({
      showDate: true
    });
  },
  close() {
    this.setData({
      showDate: false
    });
  },
  submit(e) {
    this.setData({
      y: e.detail.year,
      m: e.detail.month
    });
    this.close();
    this.initStatis();
  },

  initLeaveask: function() {
    var self = this;
    app.post(app.globalData.apis.leaveaskList, {}, function(data) {
      self.setData({
        leaveask: data.list,
      })
    })
  },
  //初始化统计数据
  initStatis: function() {
    var self = this;
    app.post(app.globalData.apis.statis, {
      month: self.data.y + '-' + self.data.m,
    }, function(data) {
      self.data.total_times = data.sign_count + data.truant_count;
      self.data.time_count = data.course_time_count;
      self.setData({
        total_times: self.data.total_times,
        time_count: self.data.time_count,
      })
    })
  },

  //获取欠费人数
  initArrears: function() {
    var self = this;
    app.post(app.globalData.apis.arrears, {}, function(data) {
      self.data.arrears = data.list;
      var count = 0;
      for (var i in data.list) {
        count += Math.abs(data.list[i].time)
      }
      self.setData({
        arrears: self.data.arrears,
        arrears_count: count,
      })
    })
  },

  //学员删除列表
  initTruant: function() {
    var self = this;
    app.post(app.globalData.apis.truantList, {

    }, function(data) {
      self.data.truantList = data.list;
      self.setData({
        truantList: self.data.truantList,
      })
    })
  },

  //跳转删除页面
  goTruant: function(e) {
    var list = JSON.stringify(this.data.truantList);
    wx.navigateTo({
      url: '/pages/studentpayment/studentpayment?flag=2&title=学员删除&list=' + list, //url="/pages/studentpayment/studentpayment?flag=2&title=学员删除"
    })
  },

  //跳转欠费列表页面
  arrearsList: function(e) {
    var list = JSON.stringify(this.data.arrears);
    wx.navigateTo({
      url: '/pages/studentpayment/studentpayment?flag=1&title=欠费学员&list=' + list,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})