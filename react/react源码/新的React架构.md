React16架构可以分为三层：
- Scheduler(调度器)  -- 调度任务的优先级，高优任务优先进入Reconciler
- Reconciler(协调器) -- 负责找出变化的组件
- Renderer(渲染器)   -- 负责将变化的组件渲染到页面上

Scheduler(调度器)
既然我们以浏览器是否有剩余时间作为任务中断的标准，那么我们需要一种机制，当浏览器有剩余时间时通知我们。

其实部分浏览器已经实现了这个API，这就是requestIdleCallback (opens new window)。但是由于以下因素，React放弃使用：

- 浏览器兼容性
- 触发频率不稳定，受很多因素影响。比如当我们的浏览器切换tab后，之前tab注册的requestIdleCallback触发的频率会变得很低

Reconciler(协调器)
在React16中，Reconciler和Render不再是交替工作，当Scheduler将任务交给Reconciler后，Reconciler会为变化的虚拟DOM打上代表增/删/更新的标记。整个Scheduler与Reconciler的工作都在内存中进行。只有当所有组件都完成Reconciler的工作，才会统一交给Renderer。

Renderer（渲染器）
Renderer根据Reconciler为虚拟DOM打的标记，同步执行对应的DOM操作。

React利用MessageChannel模拟了requestIdleCallback,将回调延迟到绘制操作之后执行。