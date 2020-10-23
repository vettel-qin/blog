# 生命周期

1. 挂载阶段
   16.3 之前
   constructor
   componentWillMount
   render
   componentDidMount

   16.3
   constructor
   getDerivedStateFromProps
   render
   componentDidMount

2. 更新阶段
   16.3 之前
   componentWillReceiveProps
   shouldComponentUpdate
   render
   componentWillUpdate
   componentDidUpdate

   16.3
   getDerivedStateFromProps
   shouldComponentUpdate
   render
   getSnapshotBeforeUpdate
   componentDidUpdate

3. 卸载阶段
   componentWillUnmount

# 组件内通信

父组件向子组件通讯: 父组件可以向子组件通过传 props 的方式，向子组件进行通讯
子组件向父组件通讯: props + 回调的方式,父组件向子组件传递 props 进行通讯，此 props 的作用域为父组件自身的函数，子组件调用该函数，将子组件想要传递的信息，作为参数，传递到父组件的作用域中
兄弟组件通信: 找到这两个兄弟节点共同的父节点,结合上面两种方式由父节点转发信息进行通信
跨层级通信: Context 设计目的是为了共享一个组件树而言是“全局”的数据
全局状态管理工具: 借助 Redux 或者 Mobx 等全局状态管理工具进行通信,这种工具会维护一个全局状态 Store,并根据不同的事件产生新的状态

# setState 是同步还是异步？

setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。
setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果。
setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和 setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState，setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。

# 什么是错误边界

在 React 中，我们通常有一个组件树。如果任何一个组件发生错误，它将破坏整个组件树。没有办法捕捉这些错误，我们可以用错误边界优雅地处理这些错误。
错误边界有两个作用
• 如果发生错误，显示回退 UI
• 记录错误
下面是 ErrorBoundary 类的一个例子。如果类实现了 getDerivedStateFromError 或 componentDidCatch 这两个生命周期方法的任何一下，，那么这个类就会成为 ErrorBoundary。前者返回{hasError: true}来呈现回退 UI，后者用于记录错误。

```
  import React from 'react'
  export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    componentDidCatch(error, info) {
      // You can also log the error to an error reporting service
      console.log('Error::::', error);
    }

    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>OOPS!. WE ARE LOOKING INTO IT.</h1>;
      }

      return this.props.children;
    }
  }
```

以下是我们如何在其中一个组件中使用 ErrorBoundary。使用 ErrorBoundary 类包裹 ToDoForm 和 ToDoList。 如果这些组件中发生任何错误，我们会记录错误并显示回退 UI。

```
import React from 'react';
import '../App.css';
import { ToDoForm } from './todoform';
import { ToDolist } from './todolist';
import { ErrorBoundary } from '../errorboundary';
export class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <ErrorBoundary>
          <ToDoForm />
          <ToDolist />
        </ErrorBoundary>
      </div>
    );
  }
}
```

# React Fiber

React 渲染的过程可以被中断，可以将控制权交回浏览器，让位给高优先级的任务，浏览器空闲后再恢复渲染。

# react 某些生命周期被废弃的理由

ComponentWillMount, ComponentWillReceiveProps, ComponentWillUpdate
因为 fiber 的出现，很可能因为高优先级任务的出现而打断现有任务导致它们会被执行多次
