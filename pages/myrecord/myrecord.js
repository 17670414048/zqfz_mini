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
    // const newdate = (new Date()).getTime();
    // this.setData({
    //   list: timeUtil.getWeekDayList(newdate, -1).weekDayList.concat(timeUtil.getWeekDayList(newdate, 0).weekDayList).concat(timeUtil.getWeekDayList(newdate, 1).weekDayList),
    //   times: timeUtil.getWeekDayList(newdate, 0).yearMonth
    // });
    // // this.setData({
    // //     currentItemId: this.data.list.map(function (item) {
    // //         return item.day;
    // //     }).indexOf(String((new Date()).getDate()).padStart(2, '0'))
    // // });
    // this.setData({
    //   currentItemId: this.data.list.map(function(item) {
    //     return item.date;
    //   }).indexOf(timeUtil.getYearMonthDay((new Date()).getTime()))
    // });
    // this.setData({
    //   calenderTime: this.data.list[this.data.currentItemId].date
    // });
    // 滑动日历初始化，以周显示 
    this.initMyCalendar()
    //初始化课表
    this.initCourse();
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
  ifCalendarswiper() {
    this.setData({
      ifCalendarswiper: 0,
    })
  },
  initCourse: function (currentDate = this.data.currentDate) {
    var self = this;
    // var date = this.data.list[this.data.currentItemId];
    const date = {
      date: currentDate
    }
    app.post(app.globalData.apis.courseList, {
      date: date.date,
    }, function(data) {
      var list = data.list;
      var courseList = [];
      if (list.length) {
        var courseList = self.data.timeList.map(function(item) {
          var time_stamp = (new Date(date.date + ' ' + item)).getTime() / 1000;
          var tmp = [];
          while (list.length && time_stamp <= list[0].start_time && time_stamp + 3600 > list[0].start_time) {
            tmp.push(list.shift())
          }
          return tmp;
        })
      }
      self.setData({
        courseList: courseList,
        total_time: data.total_time,
        total_sign: data.total_sign,
      })
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    // list: [],
    title: '上课记录',
    // currentItemId: 1, //滑动定位
    isTime: true, //是否展示日历
    timeList: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
    courseList: [], //课时列表
    total_time: 0, //当日总课时
    total_sign: 0, //当日上课人数
    course: [{
      list: [{
        id: 0,
        name: 1
      }, {
        id: 1,
        name: 2
      }, {
        id: 2,
        name: 3
      }, {
        id: 3,
        name: 4
      }, {
        id: 4,
        name: 5
      }, {
        id: 5,
        name: 6
      }]
    }, {
      list: [{
        id: 6,
        name: 1
      }]
    }, {
      list: [{
        id: 7,
        name: 1
      }]
    }, {
      list: [{
        id: 8,
        name: 1
      }]
    }],
    left: -1, //时间左滑
    right: 1, //时间右滑
    duration: 500,
    calendar: {},
    currentDate: 1, //当前选择的日期,
    ifCalendarswiper: 0,
  },
  back() {
    wx.navigateBack({
      delta: 1
    });

  },
  // 弹出日历
  // change(e) {
  //   this.setData({
  //     isTime: !this.data.isTime
  //   });

  // },
  // changes(e) {
  //   const d = (new Date(e.detail.date)).getTime();
  //   this.setData({
  //     list: timeUtil.getWeekDayList(d, -1).weekDayList.concat(timeUtil.getWeekDayList(d, 0).weekDayList).concat(timeUtil.getWeekDayList(d, 1).weekDayList)
  //   });
  //   const t = timeUtil.getYearMonthDay(d);
  //   for (var i = 0; i < this.data.list.length; i++) {
  //     if (this.data.list[i].date == t) {
  //       this.setData({
  //         currentItemId: i,
  //         duration: 500
  //       });
  //     }
  //   }
  //   this.setData({
  //     times: timeUtil.getYearMonth(d),
  //     calenderTime: e.detail.date
  //   });
  //   this.setData({
  //     isTime: !this.data.isTime
  //   });
  // },
  // swiperChange(e) {
  //   var currentItemId = e.detail.currentItemId;
  //   this.setData({
  //     currentItemId: currentItemId,
  //     times: this.data.list[currentItemId].ym,
  //     calenderTime: this.data.list[currentItemId].date
  //   });
  //   this.changeDate(currentItemId);
  // },
  // changeDate(index) {
  //   var currentDate = this.data.list[index];
  //   var changeTime = new Date(currentDate.date);
  //   var dateUnix = changeTime.getTime();
  //   console.log(index);
  //   if (index == 0) {
  //     this.setData({
  //       list: timeUtil.getWeekDayList(dateUnix - 24 * 2 * 60 * 60 * 1000, -1).weekDayList.concat(timeUtil.getWeekDayList(dateUnix - 24 * 2 * 60 * 60 * 1000, 0).weekDayList).concat(timeUtil.getWeekDayList(dateUnix - 24 * 2 * 60 * 60 * 1000, 1).weekDayList)
  //     });

  //     //  console.log(this.data.list);
  //     this.setData({
  //       currentItemId: 13,
  //       duration: 500
  //     });
  //   }
  //   if (index == this.data.list.length - 7) {
  //     this.setData({
  //       list: timeUtil.getWeekDayList(dateUnix, 0).weekDayList.concat(timeUtil.getWeekDayList(dateUnix, 1).weekDayList).concat(timeUtil.getWeekDayList(dateUnix, 2).weekDayList)

  //     });
  //     // console.log(e.detail.current + 7+"----"+this.data.list.length);
  //     this.setData({
  //       currentItemId: 1,
  //       duration: 500
  //     });
  //   }
  //   //  console.log(this.data.list);
  //   this.initCourse()
  // },
  // clickChange(e) {
  //   var itemId = e.currentTarget.dataset.itemId;
  //   this.setData({
  //     currentItemId: itemId,
  //     times: this.data.list[itemId].ym,
  //     calenderTime: this.data.list[itemId].date
  //   });
    // this.changeDate(itemId);
  // },


})