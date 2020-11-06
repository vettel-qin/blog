# 知识线

什么是 this => this 的指向 => 如何改变 this 指向 => 手写实现 call、apply、bind

# 什么是 this？

this 就是一个对象

# this 的指向

1. 对象调用，this 指向该对象（.前边谁调用 this 就指向谁）

```
const obj = {
  name: 'vettel',
  print() {
    console.log(this);
    console.log(this.name);
  }
}

// 通过对象的方式调用函数
obj.print();  // this指向obj
```

2. 直接调用函数，this 指向的是全局 (window) 对象

```
function print() {
  console.log(this);
}
// 全局调用函数
print(); // this指向window

```

3. 通过 new 的方式，this 永远指向新创建的对象

```
function Person(name, age) {
  this.name = name;
  this.age = age;
  console.log(this);
}

const p = new Person('vettel', '18'); // this指向p
```

4. 箭头函数中的 this
   由于箭头函数没有单独的 this 值，箭头函数的 this 与声明所在的上下文相同。

```
const obj = {
  print: () => {
    console.log(this);
  }
}

obj.print(); // this指向window
```

# 如何改变 this

通过调用函数 bind、apply、bind 来改变 this 的指向

```
const obj = {
  name: 'vettel',
  age: 18
}

function print() {
  console.log(this); // 打印this的指向
  console.log(arguments); // 打印传递的参数
}

// 通过call改变this指向
print.call(obj, 1,2,3);

// 通过apply改变this指向
print.apply(obj, [1,2,3]);

// 通过bind改变this的指向
const fn = print.bind(obj, 1,2,3);
fn();
```

## 三者的共同点和不同点

共同点：
三者都能改变 this 指向，第一个传递的参数都是 this 指向的对象。
三者都采用后续传参的形式

不同点：

1. 传参方面：call 的传参是单个传递的，apply 的传参是数组（传单个值会报错），而 bind 没有规定，传递值和数组都可以
2. 执行方面：call 和 apply 函数是直接执行的，而 bind 函数会返回一个函数，然后我们需要调用才会执行。
