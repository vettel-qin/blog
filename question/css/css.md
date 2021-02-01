1. 移动端适配方案具体实现以及对比
(1). media queries
(2). flex 布局
(3). 百分比
(4). rem
(5). vh vw

(1). Media Queries 主要是通过查询设备的宽度来执行不同的css代码，最终达到界面的配置。
```
@media only screen and (max-width: 374px) {
  /* iphone5 或者更小的尺寸，以 iphone5 的宽度（320px）比例设置样式*/
}
@media only screen and (min-width: 375px) and (max-width: 413px) {
  /* iphone6/7/8 和 iphone x */
}
@media only screen and (min-width: 414px) {
  /* iphone6p 或者更大的尺寸，以 iphone6p 的宽度（414px）比例设置样式 */
}
```

优点：
a. 可以针对设备像素做判断，方法简单。像Bootstrap框架。
b. 调整屏幕宽度的时候不用刷新页面即可响应式展示。
缺点：
a. 代码量比较大，维护不方便
b. 为了兼顾大屏幕或高清设备，会造成其他设备资源浪费，特别是加载图片资源。


(2). flex布局
viewport是固定的：
```
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
```
高度定死，宽度自适应，元素都采用px做单位。

（3）. 百分比
viewport是固定的：
```
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
```
宽度使用百分比，高度固定。
缺点：
字体大小无法随屏幕大小发生变化。在大屏手机或横竖屏切换场景下可能会导致页面元素被拉伸变形。

(4). rem
rem是相对长度单位，此方案是相对于根元素font-size计算值的倍数。根据屏幕宽度设置html标签的font-size。viewport是固定的且需要执行js脚本监听分辨率的变化来动态改变根元素的字体大小。
```
export const BASE_SCREEN_WIDTH = 750;
export const BASE_FONT_SIZE = 37.5;

function resizeFontSize() {
  const docEl = document.documentElement!;
  const screenWidth = docEl.getBoundingClientRect().width || window.innerWidth;
  const fontSize = (screenWidth / BASE_SCREEN_WIDTH) * BASE_FONT_SIZE;
  docEl.style.fontSize = `${fontSize > BASE_FONT_SIZE ? BASE_FONT_SIZE : fontSize}px`;
}

function flexibleRem() {
  resizeFontSize();

  window.addEventListener('resize', resizeFontSize);
  window.addEventListener('orientationchange', resizeFontSize);
}

export default flexibleRem;
```
优点：兼容性好，页面不会因为伸缩发生变形。
缺点：
a. 需要执行js脚本监听分辨率的变化来动态改变根元素的字体大小。css样式和js代码有一定耦合性，改font-size的代码必须放在css样式之前。
b. 通过rem计算后可能会出现小数像素，浏览器会对小数四舍五入，按照整数渲染，有可能没那么准确。

(5). vw vh
vw: 1vw等于视口宽度的1%;
vh: 1vh等于视口高度的1%;
优点：
纯css移动端适配方案，不存在脚本依赖问题。

缺点：
存在一些兼容性问题，有些浏览器不支持。

2. flex:1的完整写法是？分别是什么意思？
flex属性是flex-grow、flow-shrink、flex-basis的简写。默认值为0、1、auto;
flex:1的完整写法是
```
flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;
```