//封装一个加载中请求效果
var requestHandler = {
    url: '',
    data: {},
    method: '',
    success: function (res) {
    },
    fail: function () {
    },
    complete: function () {
    }
  }
  
  function request(requestHandler) {
    var data = requestHandler.data;
    var url = requestHandler.url;
    var method = requestHandler.method;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      data: data,
      method: method,
      success: function (res) {
        requestHandler.success(res)
        setTimeout( () =>{
          wx.hideLoading()
        }, 500)
      },
      fail: function () {
        wx.hideLoading();
        requestHandler.fail();
      },
      complete: function () {
  
      }
    })
  }
  module.exports = {
    request: request
  }
 