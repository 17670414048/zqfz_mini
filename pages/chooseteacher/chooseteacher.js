// pages/chooseteacher/chooseteacher.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'选择代课老师',
    radio:[],
    selected:-1,
    source:{},

  },
  back(){
    wx.navigateBack({
      delta: 1
    });
      
  },
  radioSelect(e){
       let teacher_id = e.currentTarget.dataset.id;
        console.log(teacher_id)
       this.setData({
         selected: teacher_id
       });
  },
  commit(e){
      if(this.data.selected)
      {
          app.post(app.globalData.apis.coverTime,{
              id: this.data.source.id,
              teacher_id: this.data.selected,
          }, function(data){
              var target = JSON.stringify(data);
              wx.navigateTo({
                  url: '/pages/success/success?title=更换成功&flag=1&target='+target
              });
          })
      }
    
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //解析source
      this.data.source = JSON.parse(options.source);
      this.setData({
          source: this.data.source,
      })
      //加载老师列表
      var self = this;
      app.post(app.globalData.apis.teacherList,{}, function(data){
          self.data.radio = data.list;
          self.setData({
              radio: self.data.radio
          })
      })
    
    this.setData({
      selected:this.data.radio[0].id || -1
    });
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