function httpRequest(url, data, method, header, callback) {
     wx.request({
          url: url,
          data: data,
          method: method,
          header: header,
          success: function (result) {
               return typeof callback == 'function' && callback(result.data);
          },
          fail: function () {
               return typeof callback == 'function' && callback(false);
          }
     })
}

module.exports = { httpRequest: httpRequest }