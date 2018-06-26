// pages/hotelDetail/hotelDetail.js

var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth() + 1;
var currentDay = new Date().getDate();
var currentWeek = new Date().getDay();
var currentDate = currentYear + '-' + currentMonth + '-' + currentDay;

var startDate = '';
var startYear;
var startDay;
var startMonth;
var startWeek;
var endOfStartDate = '2020-12-31';
var startDayCount;

var endDate = '';
var endYear;
var endDay;
var endMonth;
var endWeek;
var endOfEndDate = '2020-12-31';

var dayCount = 1;

function RoomBean() {
     var image;
     var name;
     var service;
     var price;
}


Page({

     /**
      * 页面的初始数据
      */
     data: {
          startDate: '',
          currentDate: '',
          endOfStartDate: '',
          endDate: '',
          endOfEndDate: '',
          startDay: '',
          startMonth: '',
          startWeek: '',
          endDay: '',
          endMonth: '',
          endWeek: '',
          dayCount: 1,


          hotelName: '',
          hotelAddress: '',
          roomArray: [
               {
                    image: '../../res/images/ic_hotel_image.png',
                    name: '标准单人间',
                    service: 'WiFi/有窗/空调',
                    price: 158
               }, {
                    image: '../../res/images/ic_hotel_image.png',
                    name: '标准双人间',
                    service: 'WiFi/有窗/空调',
                    price: 258
               }, {
                    image: '../../res/images/ic_hotel_image.png',
                    name: '豪华单人间',
                    service: 'WiFi/有窗/空调',
                    price: 198
               }, {
                    image: '../../res/images/ic_hotel_image.png',
                    name: '豪华双人间',
                    service: 'WiFi/有窗/空调',
                    price: 358
               }
          ],
          serviceList: [
               {
                    icon: '../../res/images/ic_service_park.png',
                    name: '停车场'
               },
               {
                    icon: '../../res/images/ic_service_food.png',
                    name: '营养早餐'
               },
               {
                    icon: '../../res/images/ic_service_park.png',
                    name: '健身室'
               },
               {
                    icon: '../../res/images/ic_service_food.png',
                    name: '免费WiFi'
               },
               {
                    icon: '../../res/images/ic_service_park.png',
                    name: '叫车服务'
               },
               {
                    icon: '../../res/images/ic_service_food.png',
                    name: '营养早餐'
               },
               {
                    icon: '../../res/images/ic_service_park.png',
                    name: '健身室'
               },
               {
                    icon: '../../res/images/ic_service_food.png',
                    name: '免费WiFi'
               },
               {
                    icon: '../../res/images/ic_service_park.png',
                    name: '叫车服务'
               }
          ]
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          startDate = currentDate;
          startYear = currentYear;
          startDay = currentDay;
          startMonth = currentMonth;
          startWeek = currentWeek;

          this.initEndDate();
          this.setSearchDate();

          console.log(options);
          var hotelName = options.name;
          var address = options.address;
          var distance = options.distance;
          if (hotelName !== undefined) {
               this.setData({
                    hotelName: hotelName,
                    hotelAddress: address + '\n距我' + distance + '公里'
               });
          }
     },

     bookRoom: function (e) {
          var index = e.currentTarget.dataset.index;
          var room = this.data.roomArray[index];
          wx.navigateTo({
               url: '../bookHotel/bookHotel?price=' + room.price + '&hotelName=' + this.data.hotelName + '&roomName=' + room.name + '&startDate=' + startDate + '&endDate=' + endDate,
          })
     },

     startDateChange: function (e) {
          console.log(e);
          startDate = e.detail.value;
          var startArray = startDate.split('-');
          startYear = parseInt(startArray[0]);
          startDay = parseInt(startArray[2]);
          startMonth = parseInt(startArray[1]);
          startWeek = new Date(startYear, startMonth, startDay).getDay();

          var startFormat = this.formatDate(startDate);
          var endFormat = this.formatDate(endDate);
          if (new Date(endFormat) < new Date(startFormat)) {
               this.initEndDate();
          }

          this.setSearchDate();
     },

     endDateChange: function (e) {
          console.log(e);
          endDate = e.detail.value;
          var endArray = endDate.split('-');
          endYear = parseInt(endArray[0]);
          endDay = parseInt(endArray[2]);
          endMonth = parseInt(endArray[1]);
          endWeek = new Date(endYear, endMonth, endDay).getDay();

          this.setSearchDate();
     },

     formatDate: function (date) {
          return date.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/');
     },

     getWeekday: function (week) {
          var weekday = new Array(7)
          weekday[0] = "周日"
          weekday[1] = "周一"
          weekday[2] = "周二"
          weekday[3] = "周三"
          weekday[4] = "周四"
          weekday[5] = "周五"
          weekday[6] = "周六"

          return weekday[week];
     },

     prefixInteger: function (num, length) {
          return (Array(length).join('0') + num).slice(-length);
     },

     getDayCount: function (startDate, endDate) {
          var startFormat = this.formatDate(startDate);
          var endFormat = this.formatDate(endDate);

          var start = new Date(startFormat);
          var end = new Date(endFormat);

          var result = end - start;
          if (result >= 0) {
               var days = parseInt(result / (1000 * 60 * 60 * 24));
               return days == 0 ? 1 : days;
          } else {
               return 0;
          }
     },

     initEndDate: function () {
          startDayCount = new Date(startYear, startMonth, 0).getDate();

          if (startMonth == 12 && startDay == 31) {
               endYear = startYear + 1;
               endMonth = 1;
               endDay = 1;
          } else {
               endYear = startYear;
               if (startDay <= startDayCount) {
                    endMonth = startMonth
                    endDay = startDay + 1;
               } else {
                    endMonth = startMonth + 1;
                    endDay = 1;
               }
          }
          if (currentWeek >= 7) {
               endWeek = 1;
          } else {
               endWeek = currentWeek + 1;
          }
          endDate = endYear + '-' + endMonth + '-' + endDay;
     },

     setSearchDate: function () {
          this.setData({
               currentDate: currentDate,

               startDate: startDate,
               startDay: this.prefixInteger(startDay, 2),
               startMonth: this.prefixInteger(startMonth, 2),
               startWeek: this.getWeekday(startWeek),
               endOfStartDate: '2020-12-31',

               endDate: endDate,
               endDay: this.prefixInteger(endDay, 2),
               endMonth: this.prefixInteger(endMonth, 2),
               endWeek: this.getWeekday(endWeek),
               endOfEndDate: '2020-12-31',

               dayCount: this.getDayCount(startDate, endDate)
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