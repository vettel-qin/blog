flex容器：父元素显式设置了display: flex
flex项目：flex容器内的子元素

1. Flex容器属性
```
flex-direction | flex-wrap | flex-flow | align-items | justify-content | align-content
```

(1). flex-direction属性控制flex项目沿着主轴的排列方向
它具有四个值:
```
row | column | row-reverse | column-reverse
```
row: 横向从左到右排列，默认的排列方式
row-reverse: 反转横向排列（从右到左排列，最后一项排在最前面）
column: 纵向排列
column-reverse:反转纵向排列，从后往前排，最后一项排在最上面

(2). flex-wrap属性指定flex项目换行方式
```
nowrap | wrap | wrap-reverse
```
nowrap: 不换行，默认
wrap: 多行
wrap-reverse: 反转wrap排列

(3). flex-flow属性是flex-direaction和flex-wrap的简写

(4). justify-content属性控制flex项目沿着容器主轴的对齐方向
```
flex-start | flex-end | center | space-between | space-aroud
```
flex-start: 让所有flex项目靠主轴开始边缘（左对齐），默认
flex-end: 让所有flex项目靠主轴结束边缘（右对齐）
center: 让所有flex项目排在主轴中间
space-between: 两端对齐，项目之间的间隔都相等。
space-around: 每个flex项目两侧的间隔相等，所以项目之间的间隔比项目与边框的间隔大一倍

(5). align-items属性定义项目在交叉（侧轴）轴上如何对齐
```
flex-start | flex-end | center | baseline | stretch
```
stretch: 让所有flex项目高度和flex容器高度一样。默认
flex-start: 让所有flex项目靠侧轴开始边缘（顶部对齐）
flex-end: 让所有flex项目靠侧轴结束边缘（底部对齐）
center: 让flex项目在靠侧轴中间（居中对齐）
baseline: 让所有flex项目在侧轴上沿着他们自己的基线对齐

(6). align-content属性用于多行的flex容器，控制flex项目在flex容器里的排列方式，排列效果和align-items值一样，但除了baseline属性值
```
stretch | flex-start | flex-end | center
```
stretch: 让flex项目沿着侧轴适应flex容器可用的空间。默认
flex-start: 让多行flex项目靠侧轴开始边缘（顶部对齐）
flex-end： 让多行flex项目靠侧轴结束边缘（底部对齐）
center：让多行flex项目在侧轴中间