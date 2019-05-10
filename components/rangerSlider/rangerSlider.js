let ww = wx.getSystemInfoSync().windowWidth;

Component({

  /**
   * title，标题，如里程
   * unit，单位，如万公里
   * blocksize，滑动块的长度或高度
   * marginLeft，滑动条距离页面的左间距
   * marginRight，滑动条距离页面的右间距
   * magnet，是否吸附到最近的点
   * maxIsInfinite，最右侧标识是否为不限
   * minCurrent，当前最小值
   * maxCurrent，当前最大值
   * keyArr，传递数组
   */
  properties: {
    title: String,
    unit: String,
    blocksize: {
      type: Number,
      value: 22
    },
    marginLeft: {
      type: Number,
      value: 30
    },
    marginRight: {
      type: Number,
      value: 30
    },
    magnet: {
      type: Boolean,
      value: false
    },
    maxIsInfinite: {
      type: Boolean,
      value: false
    },
    minCurrent: Number,
    maxCurrent: Number,
    keyArr: {
      type: Array,
      value: [0, 100]
    }
  },

  data: {
    ww: ww,
    keyTextArray: [],
    min: 0,
    max: 0,
    offset1: 0, //左滑块中心距离滑动器左端的偏移量
    offset2: 0, //右滑块中心距离滑动器左端的偏移量
    steplong: 2, //滑块每单位的长度，px
    notice: '' //右侧区间文字提示
  },


  attached: function() {
    // console.log("attached:");
    // console.log(this.data.maxIsInfinite);
    if (this.data.maxIsInfinite) {
      for (var i = 0; i < this.data.keyArr.length - 1; i++) {
        this.data.keyTextArray.push(this.data.keyArr[i]);
      }
      this.data.keyTextArray.push('不限');
    } else {
      for (var i = 0; i < this.data.keyArr.length; i++) {
        this.data.keyTextArray.push(this.data.keyArr[i]);
      }
    }
    this.setData({
      keyTextArray: this.data.keyTextArray,
      max: this.data.keyArr[this.data.keyArr.length - 1],
      min: this.data.keyArr[0]
    })
    // console.log(this.data.keyTextArray);
  },

  ready: function() {
    // console.log("ready:");
    // console.log(this.data.max);

    // 总分割的块数
    let totalSteps = this.data.max - this.data.min;
    // 每单位步长，px
    let steplong = (ww - this.data.marginLeft - this.data.marginRight) / totalSteps;
    this.setData({
      offset1: (this.data.minCurrent - this.data.min) * steplong,
      offset2: (this.data.maxCurrent - this.data.min) * steplong,
      steplong: steplong
    })

    if (this.data.maxIsInfinite) {
      if (this.data.maxCurrent != this.data.max) {
        if (this.data.minCurrent != this.data.min) {
          this.setNotice1(this.data.minCurrent, this.data.maxCurrent);
        } else {
          this.setNotice3(this.data.maxCurrent);
        }
      } else {
        if (this.data.minCurrent != this.data.min) {
          this.setNotice2(this.data.minCurrent);
        } else {
          this.setNotice4();
        }
      }
    } else {
      this.setNotice1(this.data.minCurrent, this.data.maxCurrent);
    }
    // console.log(totalSteps);
    // console.log("steplong：" + this.data.steplong);
    // console.log(this.data.offset1 + ':' + this.data.offset2);
  },


  methods: {

    // 左滑块touchmove事件
    lmove: function(e) {
      // console.log(e.changedTouches[0].pageX);

      var minv = (e.changedTouches[0].pageX - this.data.marginLeft) / this.data.steplong + this.data.min;
      // console.log(minv + "--" + Math.round(minv));
      // 不能超出滑块最左的点 且 不能超出右边滑块位置-一个步长的距离
      if (e.changedTouches[0].pageX >= this.data.marginLeft && e.changedTouches[0].pageX <= (this.data.offset2 + this.data.marginLeft - this.data.steplong)) {
        this.setData({
          offset1: e.changedTouches[0].pageX - this.data.marginLeft,
          minCurrent: Math.round(minv)
        })
        // console.log(this.data.minCurrent)

        if (this.data.maxIsInfinite) {
          // 判断区间值怎样写。改变左侧滑块，最大值暂不变，所以先判断当前最大值是否和滑块最大值相等
          if (this.data.maxCurrent != this.data.max) {
            // 判读当前变化的最小值和滑块最小值是否相等
            if (Math.round(minv) != this.data.min) {
              this.setNotice1(Math.round(minv), this.data.maxCurrent);
            } else {
              this.setNotice3(this.data.maxCurrent);
            }
          } else {
            if (Math.round(minv) != this.data.min) {
              this.setNotice2(Math.round(minv));
            } else {
              this.setNotice4();
            }
          }
        } else {
          this.setNotice1(Math.round(minv), this.data.maxCurrent);
        }
      }
    },

    lend: function(e) {
      if (this.data.magnet) {
        this.setData({
          offset1: (this.data.minCurrent - this.data.min) / (this.data.max - this.data.min) * (ww - this.data.marginLeft - this.data.marginRight)
        })
        // console.log('左滑块中心距最左点距离：'+this.data.offset1);
      }

      // touch事件结束后触发父组件的改变最小值方法
      this.triggerEvent('changemin', {
        "min": this.data.minCurrent
      })
    },



    // 右滑块touchmove事件
    rmove: function(e) {
      // console.log(e.changedTouches[0]);
      var maxv = (e.changedTouches[0].pageX - this.data.marginLeft) / this.data.steplong + this.data.min;
      // console.log(maxv + "--" + Math.round(maxv));
      if (e.changedTouches[0].pageX >= (this.data.offset1 + this.data.steplong + this.data.marginLeft) && e.changedTouches[0].pageX <= (ww - this.data.marginRight)) {
        this.setData({
          offset2: e.changedTouches[0].pageX - this.data.marginLeft,
          maxCurrent: Math.round(maxv)
        })

        if (this.data.maxIsInfinite) {
          // 判断区间值怎样写。改变右侧滑块，最小值暂不变，所以先判断当前最小值是否和滑块最小值相等
          if (this.data.minCurrent != this.data.min) {

            // 判读当前变化的最大值和滑块最大值是否相等
            if (Math.round(maxv) != this.data.max) {
              this.setNotice1(this.data.minCurrent, Math.round(maxv));
            } else {
              this.setNotice2(this.data.minCurrent);
            }
          } else {
            if (Math.round(maxv) != this.data.max) {
              this.setNotice3(Math.round(maxv));
            } else {
              this.setNotice4();
            }
          }
        } else {
          this.setNotice1(this.data.minCurrent, Math.round(maxv));
        }

      }
    },

    rend: function(e) {
      if (this.data.magnet) {
        this.setData({
          offset2: (this.data.maxCurrent - this.data.min) / (this.data.max - this.data.min) * (ww - this.data.marginLeft - this.data.marginRight),
        })
      }

      // touch事件结束后触发父组件的改变最大值方法
      this.triggerEvent('changemax', {
        "max": this.data.maxCurrent === this.data.max && this.data.maxIsInfinite ? '' : this.data.maxCurrent
      })
    },


    //设置文字为min-max
    setNotice1: function(min, max) {
      this.setData({
        notice: min + '-' + max + this.data.unit
      })
    },
    //设置文字为...以上
    setNotice2: function(min) {
      this.setData({
        notice: min + this.data.unit + '以上'
      })
    },
    //设置文字为...以内
    setNotice3: function(max) {
      this.setData({
        notice: max + this.data.unit + '以内'
      })
    },
    //设置文字为不限
    setNotice4: function() {
      this.setData({
        notice: '不限' + this.data.title
      })
    }

  }
})