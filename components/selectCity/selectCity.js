// components/selectCity/selectCity.js
var cities = require('../../common/city.js');
var letterLineHeight = 0;

Component({
     externalClasses: ['letter-class', 'item-class'],
     /**
      * 组件的属性列表
      */
     properties: {
          allCities: {
               type: Array,
               value: cities,
               // observer: citiesObserver
          }
     },

     /**
      * 组件的初始数据
      */
     data: {
          allCities: [],
          currentIndex: 'id0',
          letterText: '',
          isLetterHidden: true,
          letterTop: 0,
          letterLeft: 0
     },

     /**
      * 组件的方法列表
      */
     methods: {
          citySelectEvent: function (e) {
               var city = e.target.dataset.city;
               var letter = e.target.dataset.letter;
               var detail = {
                    city: city,
                    letter: letter
               };
               this.triggerEvent('citySelect', detail);
          },

          citiesObserver: function (newVal, oldVal) {
               var detail = {
                    newVal: newVal,
                    oldVal: oldVal
               }
               this.triggerEvent('citiesObserver', detail);
          },

          slideStart: function (e) {
               //手指触摸的y坐标值
               var touchY = e.touches[0].clientY;
               //布局距离屏幕顶端距离
               var offsetTop = e.currentTarget.offsetTop;
               var index = parseInt((touchY - offsetTop) / letterLineHeight);
               this.setData({
                    currentIndex: 'id' + index,
                    isLetterHidden: false,
                    letterText: this.data.allCities[index].letter
               });
          },

          slideMove: function (e) {
               //手指触摸的y坐标值
               var touchY = e.touches[0].clientY;
               //布局距离屏幕顶端距离
               var offsetTop = e.currentTarget.offsetTop;
               var index = parseInt((touchY - offsetTop) / letterLineHeight);
               this.setData({
                    currentIndex: 'id' + index,
                    isLetterHidden: false,
                    letterText: this.data.allCities[index].letter
               });
          },

          slideEnd: function (e) {
               var that = this;
               wx: setTimeout(function () {
                    that.setData({
                         isLetterHidden: true
                    });
               }, 200);
          }
     },

     attached: function () {
          var that = this;
          var cityArray = [];
          for (var key in cities.cities) {
               var cityObject = new Object();
               cityObject.letter = key;
               cityObject.cityList = cities.cities[key];

               cityArray.push(cityObject);
          }

          this.setData({
               allCities: cityArray
          });

          wx.getSystemInfo({
               success: function (res) {
                    letterLineHeight = (res.windowHeight - 80) / that.data.allCities.length;
                    that.setData({
                         letterTop: res.windowHeight / 2 - 30,
                         letterLeft: res.windowWidth / 2 - 30
                    });
               }
          })
     }
})
