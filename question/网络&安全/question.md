1. 输入URL到页面加载全过程
- 1.1 加载的流程
  - 浏览器根据DNS服务器得到域名的IP地址
  - 向这个IP服务器发送HTTP请求
  - 服务器收到、处理并返回HTTP请求
  - 浏览器得到返回内容
  例如
  - 在浏览器输入https://www.baidu.com的时候，首先经过DNS解析，找到www.baidu.com对应的IP14.215.177.39，然后向该IP发送HTTP请求。
  - 服务端接收到HTTP请求，然后经过处理，返回HTTP请求（返回的内容其实就是HTML格式的字符串）。
- 1.2 渲染过程
  - 根据HTML结构生成DOM树
  - 根据CSS生成CSSOM
  - 将DOM和CSSOM整合形成RenderTree
  - 找到所有内容处于网页的哪个位置，布局渲染树
  - 最终绘制出页面