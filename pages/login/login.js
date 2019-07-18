const app = getApp()

Page({
    data: {
        number: '',
        code: '',
        inited: false,
        user_id: 0,
    },
    onLoad: function() {
        // this.setData({
        //   number:this.data.number,
        //   code:this.data.code
        // });
        var self = this;
        app.loginCallback = function() {
            self.setData({
                inited: true,
                user_id: app.globalData.user_id,
            })
            if (app.globalData.user_id) {
                wx.redirectTo({
                    url: '/pages/mytimetable/mytimetable'
                })
            }
            
        }

        self.setData({
            inited: app.globalData.inited,
            user_id: app.globalData.user_id,
        })
        if (app.globalData.user_id) {
            wx.redirectTo({
                url: '/pages/mytimetable/mytimetable'
            })
        }
    },
    //   index:function(){
    //     console.log('1111111');

    //   },
    //提交信息
    formSubmit(e) {
        let number = this.data.number;
        let code = this.data.code;
        if (number != '' && code != '') {
            app.post(app.globalData.apis.bindMini, {
                    mobile: number,
                    code: code,
                    openid: app.globalData.openid
                },
                function(data) {

                    app.globalData.user_id = data.user_id;
                    app.globalData.source = data.source;
                    app.globalData.token = data.token;

                    wx.redirectTo({
                        url: '/pages/mytimetable/mytimetable',
                    })
                })
        } else {
            app.toast('请填写手机号和验证码');
        }
    },
    setPhone: function(e) {
        var val = e.detail.value;

        this.setData({
            number: val,
        })
    },
    setCode: function(e) {
        this.setData({
            code: e.detail.value
        })
    },
    sendCode: function(e) {
        if (!this.data.number || !/1[0-9]{10}/.test(this.data.number)) {
            app.showError("手机号格式错误")
        } else {
            app.post(app.globalData.apis.sendcode, {
                mobile: this.data.number,
            }, function(res) {
                //console.log(res)
                wx.showToast({
                    title: '验证码已发送',
                    duration: 1000,
                })
            })
        }
    },
    //忘记密码
    forget(e) {
        app.toast('请稍等！正在完善中。。。。');
    },

    onShow: function() {
        if (app.globalData.user_id) {
            wx.redirectTo({
                url: '/pages/mytimetable/mytimetable'
            })
        }
    },
});