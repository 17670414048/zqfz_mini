// pages/date/date.js /* JS代码部分 */
 const y = 1990
const date = new Date()
const nowYear = date.getFullYear()
const nowMonth = date.getMonth() + 1
const nowDay = date.getDate()
// let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
// 根据年月获取当月的总天数
// let getDays = function (year, month) {
//   if (month === 2) {
//     return ((year % 4 === 0) && ((year % 100) !== 0)) || (year % 400 === 0) ? 29 : 28
//   } else {
//     return daysInMonth[month - 1]
//   }
// }
// 根据年月日设置当前月有多少天 并更新年月日数组
let setDate = function (year, month, _this) {
  // let daysNum = year === nowYear && month === nowMonth ? nowDay : getDays(year, month)
  // day = day > daysNum ? 1 : day
  let monthsNum = year === nowYear ? nowMonth : 12
  let years = []
  let months = []
  let yearIndex = 9999
  let monthIndex = 0
  // 重新设置年份列表
  for (let i = y; i <= nowYear + 20; i++) {
    years.push(i)
  }
  years.map((v, idx) => {
    if (v === year) {
      yearIndex = idx
    }
  })
  // 重新设置月份列表
  for (let i = 1; i <= 12; i++) {
    var k = i;
    months.push(k)
  }
  months.map((v, idx) => {
    if (v === month) {
      monthIndex = idx
    }
  })
  // 重新设置日期列表
  // for (let i = 1; i <= daysNum; i++) {
  //   var k = i;
  //   days.push(k)
  // }
  // days.map((v, idx) => {
  //   if (v === day) {
  //     dayIndex = idx
  //   }
  // })
  _this.setData({ 
    //时间列表参数
    years: years,
    months: months,
    //选中的日期
    year: year,
    month: month,
    value: [yearIndex, monthIndex],
  })
}
Component({
  properties:{
    year: {
        type:Number,
        value: ''
    },
    month: {
      type: Number,
      value: ''
  }
  },
  data: {
    //时间列表参数
    flag: false,
    years: [],
    months: [],
    //选中的日期
    // year: y,
    // month: m,
    // value: [],
  },
  // attached(){
  //   let ye = this.data.year - 1990;
  //   let mo = this.data.month - 1;
  //   this.setData({
  //     value:[ye,mo]
  //   }); 
  // },
  ready() {
   setDate(this.data.year, this.data.month, this);
   this.setData({
    value:this.data.value
  });
  },
  // ready(){
  //   this.setData({
  //     value:this.data.value

  //   });
  // },
  methods:{
   /**
	 * 
	 * @param {any} e 
	 */
    bindChange(e) {
      console.log(e);
      // let picker = document.getElementsByClassName('picker-text');
      // picker.getElementsByClassName
      let val = e.detail.value;
      setDate(this.data.years[val[0]], this.data.months[val[1]], this);
    },
    close(){
      this.triggerEvent('close')
    },
    submit(){
      this.triggerEvent('submit',{year:this.data.year,month:this.data.month})
    },
  }
})
