# wx-mini-rangerSlider  
根据业务需求所写的区间滑块组件。包含文字部分、滑块和刻度。适用于小程序。  
### 效果
![组件图](http://pre7kddvq.bkt.clouddn.com/range_slide.png)  
### 特点
- 步长一律为1
- 根据业务需要选择最右刻度文字是否为“不限”，如果滑动最大值到“不限”，就会返回空值
- 滑动条左右间距和滑块大小可调
- 可选择是否吸附到最近点
### 参数(组件属性)
|参数|是否必需|默认值|描述|
|:--|:--|:--|:--|
|title|yes||名称，如里程|
|unit|yes||单位，如万公里|
|blocksize|no|22|滑动块的长度或高度|
|marginLeft|no|30|滑动条距离页面的左间距|
|marginRight|no|30|滑动条距离页面的右间距|
|magnet|no|false|是否吸附到最近的点|
|maxIsInfinite|no|false|最右侧刻度文字是否为“不限“|
|minCurrent|yes||当前最小值|
|maxCurrent|yes||当前最大值|
|keyArr|no|[0, 100]|刻度数组(必须全部是数字，即使你想要最右刻度为”不限“，也必须将数组最后一个设为按规律递增或递减后的那个数字)|
