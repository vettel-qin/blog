1. 变量式声明对象属性或方法
```
// 属性
const name = "vettel";
const age = 18;
const info = { name, age };
// 等同于
const info = { name: name, age: age };

// 方法
const obj = {
  fn: () => {...}
}
// 等同于
const obj = {
  fn(){...}
}
```

2. 对象的结构赋值
```
const { name, age } = {name: 'vettel', age: 18};
console.log(name, age); // vettel 18
```

3. 对象扩展运算符
注：扩展运算符只能用在最一个参数
```
const {name, ...info} = {name: 'vettel', age: 18, address: 'guangzhou'};
console.log(name, info); // vettel {age: 18, address: "guangzhou"}
```

4. 在Object原型上新增了is()方法
Object.is()方法判断两个值是否同一个值。
语法：
```
Object.is(value1, value2);
```
Object.is修改了==运算符在判断相等前对两边的变量（如果它们不是同一类型）进行强制转换（而Object.is不会强制转换两边的值）还是===运算符将数字-0和+0视为相等，NaN === NaN视为不相等。

5. 在Object原型上新增了assign()方法
5.1 基本用法
Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。它将返回目标对象。
```
const target = { name: 'vettel' };
const source1 = { age: 18 };
const source2 = { age: 20, address: 'guangzhou' };
Object.assign(target, source1, source2);
console.log(target); // {name: "vettel", age: 20, address: "guangzhou"}
```
Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
注：如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

5.2 常见用法
(1). 为对象添加属性
```
class Person {
  constructor(name) {
    Object.assign(this, { name });
  }
}
```
(2). 为对象添加方法
```
Oject.assign(Animal.prototype, {
  say() { ... }
})

// 等同于
Animal.prototype.say = function () { ... }
```

(3). 克隆对象（只能克隆源对象自身的值，不能克隆源对象继承的值）
```
function clone(origin) {
  return Object.assign({}, origin)
}
```

(4). 合并多个对象
```
const merge = (target, ...sources) => Object.assign(target, ...sources);
```
5.3 注意点
(1). 浅拷贝
Object.assigin方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
```
const obj1 = { info: { name: 'vettel', age: 18 } };
const obj2 = Object.assign({}, obj1);
obj1.info.name = 'qin';
console.log(obj2.info.name); // qin
```
上面代码中，源对象obj1的info属性的值是对象，Object.assign拷贝得到的是这个对象的引用， 这个对象的任何变化，都会反映到目标对象上面。

(2). 同名属性的替换，后面的属性会覆盖前面的属性
```
const target = { a: { b: 'hi', c: 'world' } };
const source = { a: { b: 'hello' } };
Object.assign(target, source);
console.log(target); // { a: { b: 'hello' } }
```
上面代码中，target对象的a属性被source对象的a属性整个替换掉了，而不会得到{ a: { b: 'hello', c: 'world' } }

(3). 数组的处理
Object.assign可用来处理数组，但是会把数组视为对象
```
Object.assign([1, 2, 3], [4, 5]); // [4, 5, 3]
```
上面代码中，Object.assign把数组视为属性名为 0、1、2 的对象，因此源数组的 0 属性4覆盖了目标数组的 0 属性1,源数组的 1 属性5覆盖了目标数组的 1 属性2。

6. 在Object的原型上新增了getOwnPropertyDescriptor方法
Object.getOwnPropertyDescriptor()方法返回指定对象上一个自有属性对应的属性描述符。
语法
```
Object.getOwnPropertyDescriptor(obj, prop);
obj: 需要查找的目标对象
prop: 目标对象内属性名称
```
栗子
```
const obj = {
  property1: 42
}

const desc = Object.getOwnPropertyDescriptor(obj, 'property1');

console.log(desc.configurable); // true

console.log(desc.value); // 42
```

7. 在Object原型上新增了getPrototypeOf()和setPrototypeOf()方法
Object.getPrototypeOf()方法返回指定对象的原型，如果没有继承属性则返回null
语法
```
Object.getPrototypeOf(object);
```
栗子：
```
const proto = {};
const obj = Object.create(proto);

console.log(Object.getPrototypeOf(obj) === proto); // true
```

Object.setPrototypeOf()方法用于设置一个对象的prototype属性，返回参数对象本身。
```
Object.setPrototypeOf(object, prototype)
object为需要设置原型的对象
prototype为在原型上设置的属性或方法
```
栗子
```
const obj = { name: 'vettel' };
const proto = { age: 18 };

Object.setPrototypeOf(obj, proto);
console.log(obj.age); // 18
```