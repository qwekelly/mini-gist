import {host} from '@/api/host'

function request(url,method,data,header={}) {
  wx.showLoading({title: 'Loading...'})
  return new Promise((resolve,reject)=>{
    wx.request({
      url: `${host}${url}`,
      method,
      data,
      header:{'Accept': 'application/vnd.github.v3.text-match+json'},
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
