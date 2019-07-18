//app.jS

const url_pre = 'https://xinshengerke.hbb.net:4433/api';
 // const url_pre = 'http://xinshengerke.hbb.net:8080/api';
// const url_pre = 'http://api.tszh.wiwcc.com';

App({
    onLaunch: function() {
        var self = this;
        // 展示本地存储能力
        // console.log(wx.getLaunchOptionSync('1005'));
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {

                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                this.post(this.globalData.apis.login, {
                        code: res.code,
                        source: this.globalData.source
                    },
                    function(data) {
                        self.globalData.user_id = data.user_id;
                        self.globalData.token = data.token;
                        self.globalData.openid = data.openid;
                        self.globalData.inited = true;
                        if (self.loginCallback) {
                            self.loginCallback()
                        }
                    })
            }
        })
    },
    globalData: {
        userInfo: null,
        user_id: 0,
        source: 'mini',
        token: '',
        openid: '',
        inited: false,
        apis: {
            sendcode: '/zqfz/user/guardian/send-code', //发送验证码
            bindMini: '/zqfz/teacher/teacher/bind-mini', //绑定小程序
            login: '/zqfz/teacher/mini/login', //小程序登录
            courseList: '/zqfz/teacher/course-time/list-by-date', //按日期获取课时列表
            concatTime: '/zqfz/teacher/course-time/combin', //合班
            undoConcat: '/zqfz/teacher/course-time/uncombin', //撤销合班
            stopTime: '/zqfz/teacher/course-time/stop', //停课
            unstopTime: '/zqfz/teacher/course-time/unstop', //撤销停课
            coverTime: '/zqfz/teacher/course-time/instead', //代课
            uncoverTime: '/zqfz/teacher/course-time/uninstead', //撤销代课
            teacherList: '/zqfz/teacher/teacher/list', //老师列表
            timeDetail: '/zqfz/teacher/course-time/detail', //课时详情
            sign: '/zqfz/teacher/rollcall/sign', //签到
            leave: '/zqfz/teacher/rollcall/leave', //请假
            truant: '/zqfz/teacher/rollcall/truant', //旷课
            statis: '/zqfz/teacher/teacher/statis', //我的统计数据
            arrears: '/zqfz/teacher/baby/arrears-list', //欠费数据
            truantList: '/zqfz/teacher/baby/absent-list', //精彩旷课学员列表
            multiRmBaby: '/zqfz/teacher/course-time/multi-rm-baby', //批量移除学员
            leaveaskList: '/zqfz/teacher/leave-ask/undo-list', //未处理请假通知
            leaveAllow: '/zqfz/teacher/leave-ask/allow', //同意请假申请
            leaveRefuse: '/zqfz/teacher/leave-ask/refuse', //拒绝请假申请
            sendArrearsNotice: '/zqfz/teacher/baby/send-arrears-notice', //欠费提醒
        }
    },
    checkLogin: function() {
        if (this.globalData.user_id) {
            wx.navigateTo({
                url: '/pages/mytimetable/mytimetable'
            })
        } else wx.navigateTo({
            url: '/pages/login/login',
        })
    },
    showError: function(msg) {
        wx.showModal({
            content: msg,
            showCancel: false,
            success: function(res) {

            }
        });
    },
    toast: function(e) {
        wx.showToast({
            title: e,
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });

    },
    post: function(url, data, success, fail = null, complete = null) {
        var self = this;
        var requestObj = {
            url: url_pre + url,
            data: data,
            method: 'POST',
            dataType: 'json',
            header: {
                userid: this.globalData.user_id,
                source: this.globalData.source,
                token: this.globalData.token,
            }
        };
        requestObj.success = function(res) {
            if (res.data.result == 20009) {
                //self.showError("请先登录");
                if (self.currentPage != 'pages/login/login') {
                    return wx.navigateTo({
                        url: '/pages/login/login',
                    })
                } else {
                    return self.showError("请先登录")
                }

            } else if (res.data.result != 0) {
                return self.showError(res.data.message)
            } else {
                return success(res.data.data);
            }

        };

        if (!fail) {

            fail = function(error) {
                self.showError("网络通讯失败");
                // console.log(error)
            }

        }
        requestObj.fail = function(error) {
            return fail(error)
        }
        if (!complete) {
            complete = function(event) {
                // console.log(event)
            }
        }
        wx.showLoading({
            title: "加载中...",
            mask: true,
        })
        requestObj.complete = function(event) {
            wx.hideLoading();
            return complete(event)
        };
        return wx.request(requestObj)
    },
    currentPage: function() {
        var pages = getCurrentPages();
        return pages[pages.length - 1].route;
    }
})