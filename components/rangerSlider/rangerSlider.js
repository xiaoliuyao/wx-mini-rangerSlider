Component({

  properties: {
    ww: Number,
    step: Number,
    blocksize: Number,
    min: Number,
    max: Number,
    name: String,
    name2: String,
    unit: String,
    minCurrent: Number,
    maxCurrent: Number,
    magnet: Boolean
  },

  data: {
    offset1: 0, //左滑块中心距离滑动器左端的偏移量
    offset2: 200, //右滑块中心距离滑动器左端的偏移量
    steplong: 2, //滑块每单位的长度，px
    notice: '' //右侧区间文字提示
  },

  ready: function () {
    // console.log("attached");
    // console.log(this.data);
    // 总分割的块数
    let totalSteps = (this.data.max - this.data.min) / this.data.step;
    let steplong = (this.data.ww - 65) / totalSteps
    this.setData({
      offset1: (this.data.minCurrent - this.data.min) / (this.data.max - this.data.min) * (this.data.ww - 65),
      offset2: (this.data.maxCurrent - this.data.min) / (this.data.max - this.data.min) * (this.data.ww - 65),
      steplong: steplong
    })
    if (this.data.maxCurrent != this.data.max) {
      if (this.data.minCurrent != this.data.min) {
        this.setData({
          notice: this.data.minCurrent + '-' + this.data.maxCurrent + this.data.unit
        })
      } else {
        this.setData({
          notice: this.data.maxCurrent + this.data.unit + '以内'
        })
      }
    } else {
      if (this.data.minCurrent != this.data.min) {
        this.setData({
          notice: this.data.minCurrent + this.data.unit + '以上'
        })
      } else {
        this.setData({
          notice: '不限' + this.data.name2
        })
      }
    }
    // console.log(totalSteps);
    // console.log(this.data.steplong);
    // console.log(this.data.offset1 + ':' + this.data.offset2);
  },


  methods: {

    // 左滑块touchmove事件
    lmove: function (e) {
      // console.log(e.changedTouches[0]);

      var minv = (e.changedTouches[0].pageX - 35) / this.data.steplong * this.data.step + this.data.min;
      // console.log(minv + "--" + Math.round(minv));
      if (e.changedTouches[0].pageX >= 35 && e.changedTouches[0].pageX < (this.data.offset2 + 35 - this.data.steplong)) {
        this.setData({
          offset1: e.changedTouches[0].pageX - 35,
          minCurrent: Math.round(minv)
        })
        // console.log(this.data.minCurrent)


        // 判断区间值怎样写。改变左侧滑块，最大值暂不变，所以先判断当前最大值是否和滑块最大值相等
        if (this.data.maxCurrent != this.data.max) {

          // 判读当前变化的最小值和滑块最小值是否相等
          if (Math.round(minv) != this.data.min) {
            this.setData({
              notice: Math.round(minv) + '-' + this.data.maxCurrent + this.data.unit
            })
          } else {
            this.setData({
              notice: this.data.maxCurrent + this.data.unit + '以内'
            })
          }
        } else {
          if (Math.round(minv) != this.data.min) {
            this.setData({
              notice: Math.round(minv) + this.data.unit + '以上'
            })
          } else {
            this.setData({
              notice: '不限' + this.data.name2
            })
          }
        }
      }
    },

    lend: function (e) {
      if (this.data.magnet) {
        this.setData({
          offset1: (this.data.minCurrent - this.data.min) / (this.data.max - this.data.min) * (this.data.ww - 65)
        })
      }

      // touch事件结束后触发父组件的改变最小值方法
      this.triggerEvent('changemin', { "min": this.data.minCurrent })
    },



    // 右滑块touchmove事件
    rmove: function (e) {
      // console.log(e.changedTouches[0]);
      var maxv = (e.changedTouches[0].pageX - 35) / this.data.steplong * this.data.step + this.data.min;
      // console.log(maxv + "--" + Math.round(maxv));
      if (e.changedTouches[0].pageX >= (this.data.offset1 + this.data.steplong + 35) && e.changedTouches[0].pageX <= (this.data.ww - 30)) {
        this.setData({
          offset2: e.changedTouches[0].pageX - 35,
          maxCurrent: Math.round(maxv)
        })

        // 判断区间值怎样写。改变右侧滑块，最小值暂不变，所以先判断当前最小值是否和滑块最小值相等
        if (this.data.minCurrent != this.data.min) {

          // 判读当前变化的最大值和滑块最大值是否相等
          if (Math.round(maxv) != this.data.max) {
            this.setData({
              notice: this.data.minCurrent + '-' + Math.round(maxv) + this.data.unit
            })
          } else {
            this.setData({
              notice: this.data.minCurrent + this.data.unit + '以上'
            })
          }
        } else {
          if (Math.round(maxv) != this.data.max) {
            this.setData({
              notice: Math.round(maxv) + this.data.unit + '以内'
            })
          } else {
            this.setData({
              notice: '不限' + this.data.name2
            })
          }
        }

      }
    },

    rend: function (e) {
      if (this.data.magnet) {
        this.setData({
          offset2: (this.data.maxCurrent - this.data.min) / (this.data.max - this.data.min) * (this.data.ww - 65),
        })
      }

      // touch事件结束后触发父组件的改变最大值方法
      this.triggerEvent('changemax', { "max": this.data.maxCurrent })
    },
  }
})
