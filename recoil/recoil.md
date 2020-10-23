# 动机

出于兼容性和简便性的考虑，最好使用 React 的内置状态管理功能，而不是使用第三方的全局状态（redux,mobx）但 React 自身有一定的局限性：

只能通过状态提升到公共祖先共享状态，但可能导致一个巨大的树重新渲染。

假设有下面一个场景，有 List 和 Table 两个组件，List 组件中一个节点更新后，Table 组件中的节点也要对应更新。
最常规的做法就是将一个 state 通过公共父组件分发给 List 组件和 Table 组件，显然这样的话每次 state 改变后所有节点都会全量更新。

还可以使用 Context API，我们将节点的状态存在一个 Context 内，只要 Provider 中的 props 发生改变，Provider 的所有后代使用者都会重新渲染。

# 概念

Recoil 能为你创建一个数据流图，从 atom(共享状态)到 selector(纯函数)，再向下流向 React 组件。Atom 是组件可以订阅的状态单位，selector 可以同步或异步转换此状态。
