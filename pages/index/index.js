// pages/index/index.js

var ww = wx.getSystemInfoSync().windowWidth;

Page({

  data: {
    ww: ww, //窗口宽度

    minPrice: 0,
    maxPrice: 50,
    minMileage: 0,
    maxMileage: 10,

  },


  onLoad: function (options) {

  },

  changeMinPrice: function(e){
    console.log('minPrice:' + e.detail.min);
  },

  changeMaxPrice: function (e) {
    console.log('maxPrice:' + e.detail.max);
  },

  changeMinMileage: function (e) {
    console.log('minMileage:' + e.detail.min);
  },

  changeMaxMileage: function (e) {
    console.log('maxMileage:'+ e.detail.max);
  },

 
})