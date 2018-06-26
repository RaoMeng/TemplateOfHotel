// pages/select_city/select_city.js
var cities = require('../../common/city.js');

Page({

     /**
      * 页面的初始数据
      */
     data: {
          allCities: []
     },

     onCitySelect: function (e) {
          console.log('城市选择', e);
          var pages = getCurrentPages();
          if (pages.length >= 2) {
               var prePage = pages[pages.length - 2];
               prePage.setData({
                    location: e.detail.city
               });
          };
          wx.navigateBack();
     },

     /**a
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          this.setData({
               allCities: cities
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