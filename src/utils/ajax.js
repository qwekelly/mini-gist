import {host} from '@/api/host'

function request(url,method,data,header={}) {
  wx.showLoading({title: 'Loading...'})
  let requestUrl = url.indexOf('http') !== -1 ? url : host + url
  return new Promise((resolve,reject)=>{
    wx.request({
      url: `${requestUrl}`,
      method,
      data,
      header: {
        // 'Accept': 'application/vnd.github.v3.text-match+json',
        'content-type': 'application/json',
        // 'Authorization': wx.getStorageSync('Authorization')
      },
      success: function(res) {
        wx.hideLoading()
        resolve(res.data)
      },
      fail: function(res) {
        wx.hideLoading()
      },
      complete: function(res) {
        wx.hideLoading()
      }
    })
  })
}

export default request
