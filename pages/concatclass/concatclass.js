// pages/chooseteacher/chooseteacher.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'确认合课',
    selected:-1,
    list: [],
    // length:0,
    // selectItems:[],
    target_id:0,
    target_index: -1,

  },
  back(){
    wx.navigateBack({
      delta: 1
    });
      
  },
  //选择合并目标
  radioSelect(e){
    //console.log(e);
       let id= e.currentTarget.dataset.id;
       let index=e.currentTarget.dataset.index;
       this.data.target_id = id;
       this.data.target_index = index;
       this.setData({
           target_id: this.data.target_id,
           target_index: this.data.target_index,
       });
  },
  //提交合并请求
  commit(e){
       console.log(this.data.target_id);
      if(!this.data.target_id)
      {
          app.showError('请选择目标课程')
      }
      var self = this;
      var source = this.data.list;
      let target = JSON.stringify(self.data.list[this.data.target_index]);
      source.splice(this.data.target_index, 1);
      var source_ids = source.map(function(item){ return item.id});
      app.post(app.globalData.apis.concatTime,{
          target_id: this.data.target_id,
          source_ids: source_ids.join(',')
      }, function(data){
          wx.navigateTo({
              url: '/pages/success/success?title=合班成功&flag=2&target='+target+'&count='+source.length
          });
      })

      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var item = JSON.parse(options.items);
    this.setData({
      list:item,
      selectItems: item
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