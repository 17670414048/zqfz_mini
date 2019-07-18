// pages/mycoursecallname/mycoursecallname.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'点名',
    list:[], //学员列表
    selectList:[], //选择baby_id
    isBottom:false,
    target_id:0, //目标课时id
    target:{}, //目标课时
    sign_count: 0,
    leave_count:0,
    truant_count:0,
  },
  back(){
    wx.navigateBack({
      delta: 1
    });
      
  },

  //选择宝宝
  itemSelected(e){
    // console.log(this.data.list);
    let arr =[];
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    this.data.list[index].checked = !this.data.list[index].checked;
    // console.log(this.data.list);
    this.setData({
      list:this.data.list
    });

    if(this.data.list[index].checked)
    {
        this.data.selectList.push(this.data.list[index].baby_id);
    }else{
        this.data.selectList.splice(this.data.selectList.indexOf(id), 1);
    }
    this.setData({
        isBottom: this.data.selectList.length?true:false,
        selectList: this.data.selectList,
    })
   console.log(this.data.selectList);
  },

  //签到
  sign: function(e){
      if(!this.data.selectList.length) return;
      var self = this;
      var baby_ids = this.data.selectList.join(',');
      app.post(app.globalData.apis.sign,{
          time_id: this.data.target_id,
          baby_ids: baby_ids
      }, function(data){
          //更新babylist
          self.data.list = self.data.list.map(function(item){
              if(self.data.selectList.indexOf(item.baby_id) >=0)
              {
                  item.call.kind = 1;
              }
              item.checked = false;
              return item;
          })
          //更新签到人数
            self.setData({
                list: self.data.list
            });
          self.updateCount();
          self.data.selectList = [];
          self.setData({
              selectList: self.data.selectList
          })
      })
  },

  leave: function(e){
      if (!this.data.selectList.length) return;
      var self = this;
      var baby_ids = this.data.selectList.join(',');
      app.post(app.globalData.apis.leave,{
          time_id: this.data.target_id,
          baby_ids: baby_ids
      }, function(data){
          self.data.list = self.data.list.map(function(item){
              if (self.data.selectList.indexOf(item.baby_id) >= 0) {
                  item.call.kind = 2;
              }
              item.checked = false;
              return item;
          });
          //更新
          self.setData({
              list: self.data.list
          });
          self.updateCount();
          self.data.selectList = [];
          self.setData({
              selectList: self.data.selectList
          })
      });
  },

  truant: function(e){
      if (!this.data.selectList.length) return;
      var self = this;
      var baby_ids = this.data.selectList.join(',');
      app.post(app.globalData.apis.truant, {
          time_id: this.data.target_id,
          baby_ids: baby_ids
      }, function (data) {
          self.data.list = self.data.list.map(function (item) {
              if (self.data.selectList.indexOf(item.baby_id) >= 0) {
                  item.call.kind = 3;
              }
              item.checked = false;
              return item;
          });
          //更新
          self.setData({
              list: self.data.list
          });
          self.updateCount();
          self.data.selectList = [];
          self.setData({
              selectList: self.data.selectList
          })
      });
  },

  updateCount: function()
  {
      let sign_count = 0;
      let leave_count = 0;
      let truant_count = 0;
      let babies = this.data.list;
      for (var i in babies) {
          if (babies[i].call.id) {
              if (babies[i].call.kind == 1) {
                  sign_count++;
              } else if (babies[i].call.kind == 2) {
                  leave_count++;
              } else if (babies[i].call.kind == 3) {
                  truant_count++;
              }
          }
      }
      this.setData({
          sign_count: sign_count,
          leave_count: leave_count,
          truant_count: truant_count,
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.data.target_id = options.target_id;
      this.setData({
          target_id: this.data.target_id,
      })
      //获取学员列表
      var self = this;
      app.post(app.globalData.apis.timeDetail,{
          id: this.data.target_id,
      }, function(data){
          self.data.target = data;
          self.data.list = data.babies;
          self.setData({
              target: self.data.target,
              list: self.data.list,
          });
          self.updateCount();
      })
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