React15架构分为两层：
Reconciler(协调器) —— 负责找出变化的组件
Renderer(渲染器) —— 负责将变化的组件渲染到页面上

每当有更新发生时，Reconciler会做如下工作：
- 调用函数组件或class组件的render方法，将返回的JSX转化为虚拟DOM
- 将虚拟DOM和上次更新时的虚拟DOM对比
- 通过对比找出本次更新中变化的虚拟DOM
- 通知renderer将变化的虚拟DOM渲染到页面上

由于React支持跨平台，所以不同平台有不同的Renderer,我们最熟悉的是负责在浏览器环境渲染的Renderer -- ReactDOM

React15架构的缺点
在Reconciler中，mount的组件会调用mountComponent,update的组件会调用updateComponent，这两个方法都会递归更新子组件。
由于递归执行，一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16.6ms，用户交互就会卡顿。