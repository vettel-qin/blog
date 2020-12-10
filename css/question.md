# 1. 介绍下 BFC 及其应用
Formatting context(格式化上下文)是W3C CSS2.1规范中的一个概念，它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系。
BFC是Block Formatting context（块级格式化上下文），具体BFC特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且BFC具有普通容器所没有的一些特性。通俗一点来讲，就是把BFC理解为一个封闭的箱子，箱子内部的元素无语如何翻江倒海，都不会影响到外部。

只要元素满足下面任一条件即可触发BFC特性：
1. body根元素
2. 浮动元素：float除了none以外的值。
3. 绝对定位元素：position(absolute,fixed=>绝对定位的元素,相对于浏览器窗口进行定位)
4. display为inline-block\table-cells\flex
5. overflow除了visible以外的值（hidden,auto,scroll）

BFC特性及应用
1. 同一个BFC下外边距会发生折叠
```
<html>
<head>
div{
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 100px;
}
</head>
<body>
    <div></div>
    <div></div>
</body>
</html>
```
从效果上看，因为两个 div 元素都处于同一个 BFC 容器下 (这里指 body 元素) 所以第一个 div 的下边距和第二个 div 的上边距发生了重叠，所以两个盒子之间距离只有 100px，而不是 200px。如果想要避免外边距的重叠，可以将其放在不同的 BFC 容器中。
```
<div class="container">
  <p></p>
</div>
<div class="container">
  <p></p>
</div>

.container {
  overflow: hidden;
}

p {
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 100px;
}
```

2. BFC可以包含浮动的元素（清除浮动）
```
<div style="border: 1px solid #000;overflow: hidden">
    <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```

3. BFC 可以阻止元素被浮动元素覆盖
```
<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; height: 200px;background: #eee;overflow: hidden">我是一个没有设置浮动, 触发了 BFC 元素, width: 200px; height:200px; background: #eee;overflow: hidden</div>
```