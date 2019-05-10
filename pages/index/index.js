// pages/index/index.js

Page({

  data: {

    minPrice: 0,
    maxPrice: 30,
    
    minMileage: 2,
    maxMileage: 6,

    minPercent:-3,
    maxPercent:6

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

  changeMinPercent: function (e) {
    console.log('minPercent:' + e.detail.min);
  },

  changeMaxPercent: function (e) {
    console.log('maxPercent:' + e.detail.max);
  }

 
})