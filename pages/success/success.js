// pages/success/success.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        flag:0,
        target: {}, //合班目标课程
        concat_count: 0, //合班数量
    },
    back() {
        wx.navigateBack({
            delta: 1
        });

    },
    onTap(e) {
        wx.redirectTo({
            url: '/pages/mytimetable/mytimetable'
        });
    },

    //撤销合并
    undoConcat(e){
        app.post(app.globalData.apis.undoConcat,{
            target_id: this.data.target.id,
        }, function(data){
            wx.redirectTo({
                url: '/pages/mytimetable/mytimetable'
            });
        })
    },

    //取消停课
    unStop: function(e){
        app.post(app.globalData.apis.unstopTime,{
            id: this.data.target.id,
        }, function(data){
            wx.navigateBack({
                delta: 1
            });
        })
    },
    undoCover: function(e){
        app.post(app.globalData.apis.uncoverTime,{
            id: this.data.target.id,
        }, function(data){
            wx.navigateBack({
                delta: 1
            });
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var target = JSON.parse(options.target);
        var concat_count = options.count||0;
        this.setData({
            title: options.title,
            flag: options.flag,
            target: target,
            concat_count: concat_count,
        });
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