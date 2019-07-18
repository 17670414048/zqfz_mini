const app = getApp();
var timeUtil = require('../../utils/week-utils.js');
import initCalendar from '../../components/calendarswiper/main.js';
import {
  switchView,
  getSelectedDay,
  jump,
  setSelectedDays,
  current
} from '../../components/calendarswiper/main.js';

Page({
  onLoad() {
    
    // 滑动日历初始化，以周显示 
    this.initMyCalendar()
    // 初始化课表
    // this.initCourse()


  },

  onShow(){
    console.log('onshow');
    this.initCourse()
  },

  gomine(){
    wx.navigateTo({
      url: "/pages/mine/mine",
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    // list: [],
    // currentItemId: 1, //滑动定位
    isTime: true, //是否展示日历
    isAll: false, //是否展示我的课程
    timeList: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
    course: [],
    isBottom: false, //我的课表界面底部是否可点
    goAll: false, //全部课表界面底部是否可点
    selected: -1, //选中的课程
    select_id: 0, //选中课时id
    left: -1, //时间左滑
    right: 1, //时间右滑
    duration: 500,
    concat: [], //选择合课的课程id
    concatItems: [], //具体选择的课程
    courseList: [],
    length: 0, //选中去合课的课程的个数
    switch: {
      color: '#fff',
      isOn: true
    },
    calendar: {},
    currentDate: 1, //当前选择的日期,
    ifCalendarswiper: 0,
  },
  ifCalendarswiper(){
    this.setData({
      ifCalendarswiper: 0,
    })
  },
  initMyCalendar() {
    const conf = {
      /**
       * 选择日期后执行的事件
       * @param { object } currentSelect 当前点击的日期
       * @param { array } allSelectedDays 选择的所有日期（当mulit为true时，才有allSelectedDays参数）
       */
      afterTapDay: (currentSelect, allSelectedDays) => {
        switchView('week');
        this.calendarswiper = this.selectComponent('#calendarswiper');
        this.calendarswiper.setData({
          num: 1,
          ifClick: 0,
        })
        console.log(currentSelect)
        this.setData({
          currentDate: currentSelect.year + '/' + currentSelect.month + '/' + currentSelect.day,
          ifCalendarswiper: 0,
        })
        this.initCourse()
        // console.log(this.data.list)
      },
      /**
       * 当改变月份时触发
       * @param { object } current 当前年月
       * @param { object } next 切换后的年月
       */
      // whenChangeMonth: (current, next) => { },
      // /**
      //  * 日期点击事件（此事件会完全接管点击事件）
      //  * @param { object } currentSelect 当前点击的日期
      //  * @param { object } event 日期点击事件对象
      //  */
      // onTapDay(currentSelect, event) { },
      // /**
      //  * 日历初次渲染完成后触发事件，如设置事件标记
      //  * @param { object } ctx 当前页面实例
      //  */
      // afterCalendarRender(ctx) { },
    }
    initCalendar(conf);
    switchView('week');
    let current = getSelectedDay()[0].year + '/' + getSelectedDay()[0].month + '/' + getSelectedDay()[0].day
    // console.log(current)
    this.setData({
      currentDate: current
    })
  },
  initCourse: function(currentDate = this.data.currentDate) {
    // let acceptDate = currentDate.year + "" +currentDate.month + "" +currentDate.day 
    const dates = {
      date: currentDate
    }
    // console.log(dates,"dates")
    var mine = this.data.isAll ? 0 : 1;
    var self = this;
    //  console.log(dates.date);
    app.post(app.globalData.apis.courseList, {
        date: dates.date,
        mine: mine
      },
      function(data) {
        var list = data.list;
        // console.log(data,"data")
        var courseList = [];
        if (list.length) {
          var courseList = self.data.timeList.map(function(item) {
            var time_stamp = (new Date(dates.date + ' ' + item)).getTime() / 1000;
            var tmp = [];
            // console.log(data)
            while (list.length && time_stamp <= list[0].start_time && time_stamp + 3600 > list[0].start_time) {
              if (self.data.concat.indexOf(list[0].id) >= 0) {
                list[0].selected = true;
              } else {
                list[0].selected = false;
              }
              tmp.push(list.shift())
            }
            return tmp;
          })
        }
        self.setData({
          courseList: courseList
        })
        console.log(courseList);
      })
  },
  tagSwitch: function(e) {
    this.data.isAll = !this.data.isAll;
    this.data.switch.isOn = !this.data.isAll;
    this.setData({
      switch: this.data.switch,
      isAll: this.data.isAll,
    })
    this.initCourse()
  },
  // 判断是我的课程还是全部课程
  switch () {
    this.setData({
      isAll: !this.data.isAll
    });
  },
  
  switchMonthView() {
    switchView('month');
    this.calendarswiper = this.selectComponent('#calendarswiper');
    this.calendarswiper.setData({
      num: 0,
      ifClick: 1,
      
    })
    this.setData({
      ifCalendarswiper: 1,
    })
    // jump(year,month,day);
  },
  
  // 选中课程
  select(e) {
    //console.log(e);
    let idx = e.currentTarget.dataset.index;
    // if(this.data.courseList[idx][0].status != 0) return;
    this.setData({
      selected: idx,
      isBottom: true,
      select_id: e.currentTarget.dataset.idx,
    });
    // console.log(this.data.selected);
  },
  // 选中课程
  selects(e) {
    //console.log(e);
    let id = e.currentTarget.dataset.idx;
    let index0 = e.currentTarget.dataset.index0;
    let index = e.currentTarget.dataset.index;
    let item = this.data.courseList[index0][index];
    if (item.status != 0) return; //未点名的课程不能合班
    this.data.courseList[index0][index].selected = !this.data.courseList[index0][index].selected;
    if (this.data.courseList[index0][index].selected) {
      this.data.concat.push(id)
      this.data.concatItems.push(item)
    } else {
      let del_index = this.data.concat.indexOf(id);
      this.data.concat.splice(del_index, 1);
      this.data.concatItems.splice(del_index, 1);
    }
    this.setData({
      courseList: this.data.courseList,
      concat: this.data.concat,
      concatItems: this.data.concatItems
    })

  },
  //去合课界面
  goselect(e) {

    if (this.data.concat.length) {
      let list = JSON.stringify(this.data.concatItems);
      wx.navigateTo({
        url: '/pages/concatclass/concatclass?items=' + list
      });
    }

  },
  // 停课
  stopcurse(e) {
      var self = this;
      wx.showModal({
          title: '提示',
          content: '确定要停课吗？',
          success: function (sm) {
              if (sm.confirm) {
                  if (e.currentTarget.dataset.isbottom) {
                      if (self.data.courseList[self.data.selected][0].status != 0) {
                          app.showError("不能停课");
                          return;
                      }
                      app.post(app.globalData.apis.stopTime, {
                          id: self.data.select_id,
                      }, function (data) {
                          let target = JSON.stringify(self.data.courseList[self.data.selected][0]);
                          wx.navigateTo({
                              url: '/pages/success/success?title=停课成功&flag=0&target=' + target
                          })
                      })

                  }
              } else if (sm.cancel) {
                  
              }
          }
      })


    //var self = this;
    //console.log(e);
    
  },
  // 点名
  callname(e) {
    if (e.currentTarget.dataset.isbottom) {
      // let target = JSON.stringify(this.data.courseList[this.data.selected][0]);
      wx.navigateTo({
        url: '/pages/mycoursecallname/mycoursecallname?target_id=' + this.data.select_id,
      })
    }
  },
  // 代课
  absentclass(e) {
    var self = this;
    if (e.currentTarget.dataset.isbottom) {
      if (self.data.courseList[self.data.selected][0].status != 0) {
        app.showError("不能代课");
        return;
      }
      let source = JSON.stringify(this.data.courseList[this.data.selected][0]);
      wx.navigateTo({
        url: '/pages/chooseteacher/chooseteacher?source=' + source,
      })
    }
  },
})