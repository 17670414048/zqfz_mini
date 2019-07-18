// pages/graderecord/graderecord.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '请假申请',
        flag: 0,
        list: [], //请假列表
    },
    back() {
        wx.navigateBack({
            delta: 1
        });

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options);
        this.setData({
            title: options.title || '',
            flag: options.flag || ''
        });

        this.initList()
    },

    //初始化请假申请
    initList: function() {
        var self = this;
        app.post(app.globalData.apis.leaveaskList, {}, function(data) {
            self.setData({
                list: data.list,
            })
        })
    },

    allow: function(e){
        var self = this;
        let id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        app.post(app.globalData.apis.leaveAllow,{
            id: id,
        }, function(data){
            self.data.list.splice(index,1);
            self.setData({
                list: self.data.list,
            })
        })
    },

    refuse: function(e){
        var self = this;
        let id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        app.post(app.globalData.apis.leaveRefuse, {
            id: id,
        }, function (data) {
            self.data.list.splice(index, 1);
            self.setData({
                list: self.data.list,
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

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