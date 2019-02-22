//app.js
var commonUtils = require('common/commonUtils.js');
var httpRequest = require('common/request.js');

App({
     onLaunch: function () {
          wx.setEnableDebug({
               enableDebug: true
          })
          var that = this;
          wx.getSystemInfo({
               success: function (res) {
                    var sdkVersion = res.SDKVersion;
                    var versionCompare = commonUtils.compareVersion(sdkVersion, '1.9.90');
                    if (versionCompare == -1) {
                         that.globalData.isVersionHigh = false
                    } else {
                         that.globalData.isVersionHigh = true
                    }
               },
          });

          this.loginWx();
     },
     loginWx: function () {
          // 登录
          wx.login({
               success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
               }
          })
          // 获取用户信息
          wx.getSetting({
               success: res => {
                    if (res.authSetting['scope.userInfo']) {
                         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                         wx.getUserInfo({
                              success: res => {
                                   // 可以将 res 发送给后台解码出 unionId
                                   this.globalData.userInfo = res.userInfo

                                   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                   // 所以此处加入 callback 以防止这种情况
                                   if (this.userInfoReadyCallback) {
                                        this.userInfoReadyCallback(res)
                                   }
                              }
                         })
                    }
               }
          })
     },
     globalData: {
          userInfo: null,
          isVersionHigh: false
     },
     func: {
          httpRequest: httpRequest.httpRequest,
          dateFormat: commonUtils.dateFormat,
          floatAdd: commonUtils.floatAdd,
          floatSub: commonUtils.floatSub,
          floatDiv: commonUtils.floatDiv,
          floatMul: commonUtils.floatMul,
          compareVersion: commonUtils.compareVersion,
          // loginWx: this.loginWx,
     }
})