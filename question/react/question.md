1. 什么是Virtual DOM
Virtual DOM是一种编程概念，使用js对象去描述真实DOM。当状态变更的时候，重新渲染这个js对象。这个js对象保存于内存中，通过如ReactDOM等类库使之与真实的DOM同步，这一过程叫做协调。

2. React项目中实际开发中做过哪些性能优化
(1). suspence与lazy做懒加载动态组件
(2). 可以结合React的PureComponent以及React.memo等做浅比较处理，结合使用ShouldComponentUpdate做深比较处理；React.useMemo与React.useCallback也是可以做很多优化的地方；
(3). 保证数据的不可变性
(4). 使用唯一的键值迭代
(5). 不在render中处理数据
(6). 不必要的标签，使用React.Fragments
(7). 使用redux时可能造成许多不必要的render，所以在使用的时候，需要谨慎的处理一些数据；
(8). react项目上线之后，首先需要保障的是可用性，所以可以通过React.Profiler分析组件的渲染次数及耗时的一些任务，但是Profile记录的是commit阶段的数据，所以对于react的调和阶段就需要结合performance API一起分析；

3. React组件通信方式