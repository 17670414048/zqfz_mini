// pages/studentpayment/studentpayment.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        notice: '提示：以下学员已连续三次旷课/请假，请确定 是否要从您的班级里踢出，踢出以后不可以撤销， 如果想再次加入班级，需要手动添加，请悉知。',
        list: [],
        selectList: [],
        isBottom: false,

    },
    back() {
        wx.navigateBack({
            delta: 1
        });
    },
    //选择待提醒学员
    itemSelected(e) {
        let id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        this.data.list[index].checked = !this.data.list[index].checked;
        if(this.data.list[index].checked)
        {
            this.data.selectList.push(id);
        }else{
            this.data.selectList.splice(this.data.selectList.indexOf(id),1);
        }
        this.setData({
            isBottom: this.data.selectList.length?true:false,
            list: this.data.list,
            selectList: this.data.selectList,
        })
    },

    //选择待移除学员
    deleteSelected: function(e){
        let baby_id = e.currentTarget.dataset.babyid;
        let schedule_id = e.currentTarget.dataset.scheduleid;
        let index = e.currentTarget.dataset.index;
        this.data.list[index].checked = !this.data.list[index].checked;
        if(this.data.list[index].checked){
            this.data.selectList.push(baby_id + '_'+ schedule_id);
        }else{
            this.data.selectList.splice(this.data.selectList.indexOf(baby_id+'_'+schedule_id), 1);
        }
        this.setData({
            isBottom: this.data.selectList.length?true:false,
            list: this.data.list,
            selectList: this.data.selectList,
        })
    },

    //移除学员
    deleteBaby: function(e){
        if(!this.data.isBottom) return;
        var self = this;
        app.post(app.globalData.apis.multiRmBaby, {
            baby_schedule: self.data.selectList.join(','),
        }, function(data){
            self.data.list = self.data.list.filter(function(item){
                var tmp = item.baby_id + '_' + item.schedule_id;
                return self.data.selectList.indexOf(tmp) < 0;
            })
            self.data.selectList = [];
            self.setData({
                list: self.data.list,
                selectList: self.data.selectList,
            });
            
        })
    },

    //发送欠费提醒
    sendNotice: function(e){
        // app.showError('提醒功能还未完成!');
        if(this.data.selectList.length){
            // var self  = this;
            app.post(app.globalData.apis.sendArrearsNotice,{
                ids: this.data.selectList.join(',')
            }, function(data){
                app.toast('发送成功');
                // wx.navigateBack({
                //     delta: 1
                // })
            });
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            title: options.title || '',
            flag: options.flag || '',
            list: JSON.parse(options.list),
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