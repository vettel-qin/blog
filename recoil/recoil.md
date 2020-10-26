# 动机

出于兼容性和简便性的考虑，最好使用 React 的内置状态管理功能，而不是使用第三方的全局状态（redux,mobx）但 React 自身有一定的局限性：

只能通过状态提升到公共祖先共享状态，但可能导致一个巨大的树重新渲染。

假设有下面一个场景，有 List 和 Table 两个组件，List 组件中一个节点更新后，Table 组件中的节点也要对应更新。
最常规的做法就是将一个 state 通过公共父组件分发给 List 组件和 Table 组件，显然这样的话每次 state 改变后所有节点都会全量更新。

还可以使用 Context API，我们将节点的状态存在一个 Context 内，只要 Provider 中的 props 发生改变，Provider 的所有后代使用者都会重新渲染。

# 概念

Recoil 能为你创建一个数据流图，从 atom(共享状态)到 selector(纯函数)，再向下流向 React 组件。Atom 是组件可以订阅的状态单位，selector 可以同步或异步转换此状态。

# Atom

Recoil 提出了一个新的状态管理单位 Atom，它是可更新和可订阅的，当一个 Atom 被更新时，每个被订阅的组件都会用新的值来重新渲染。如果从多个组件中使用同一个 Atom ，所有这些组件都会共享它们的状态。
你可以把 Atom 想象为为一组 state 的集合，改变一个 Atom 只会渲染特定的子组件，并不会让整个父组件重新渲染。

# 初始化

使用 recoil 状态的组件需要使用 RecoilRoot 包裹起来：

```
import React from 'react';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <TextInput />
      <CharaterCount />
    </RecoilRoot>
  );
}

```

# 定义状态

上面我们已经提到了 Atom 的概念， Atom 是一种新的状态，但是和传统的 state 不同，它可以被任何组件订阅，当一个 Atom 被更新时，每个被订阅的组件都会用新的值来重新渲染。

首先我们来定义一个 Atom：

```
  import { atom } from 'recoil';

  export const textState = atom({
    key: 'textState',
    default: '',
  });
```

这种方式意味着你不需要像 Redux 那样集中定义状态，可以像 Mobx 一样将数据分散定义在任何地方。

要创建一个 Atom ，必须要提供一个 key ，其必须在 RecoilRoot 作用域中是唯一的，并且要提供一个默认值，默认值可以是一个静态值、函数甚至可以是一个异步函数。

# 订阅和更新状态

Recoil 采用 Hooks 方式订阅和更新状态，常用的是下面三个 API：

useRecoilState：类似 useState 的一个 Hook，可以取到 atom 的值以及 setter 函数
useSetRecoilState：只获取 setter 函数，如果只使用了这个函数，状态变化不会导致组件重新渲染
useRecoilValue：只获取状态

```
import React from 'react';
import { useRecoilState } from 'recoil';
import { textState } from '../store';

// useRecoilState
const NameInput = () => {
const [name, setName] = useRecoilState(textState);
const onChange = (event) => {
  setName(event.target.value);
};

return (
  <>
  <input type="text" value={name} onChange={onChange} />

   <div>Name: {name}</div>
  </>
);
}

// useRecoilValue
const SomeOtherComponentWithName = () => {
  const name = useRecoilValue(textState);
  return <div>{name}</div>;
}

// useSetRecoilState
const SomeOtherComponentThatSetsName = () => {
  const setName = useSetRecoilState(textState);
  return <button onClick={() => setName('Jon Doe')}>Set Name</button>;
}

```

# 派生状态

selector 表示一段派生状态，它使我们能够建立依赖于其他 atom 的状态。它有一个强制性的 get 函数，其作用与 redux 的 reselect 或 MobX 的 @computed 类似。

```
const lengthState = selector({
  key: 'lengthState',
  get: ({get}) => {
    const text = get(nameState);
    return text.length;
  },
});

function NameLength() {
  const length = useRecoilValue(charLengthState);
  return <>Name Length: {length}</>;
}

```
