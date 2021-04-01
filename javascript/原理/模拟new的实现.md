1. 创建一个空对象
2. 让空对象的__proto__(IE没有该属性)指向构造函数的prototype对象
3. 使用apply调用构造函数，属性和方法被添加到this引用的对象中
4. 如果构造函数执行的结果没有返回对象，那么返回创建的新对象，否则，返回构造函数返回的对象

```
function _new(fn: () => void, args) {
  const obj = Object.create(fn.prototype);
  const result = fn.apply(obj, [...args]);
  // 如果构造函数执行的结果返回的是一个对象，那么返回这个对象
  if (result && (typeof result === 'object' || typeof result === 'function')) {
    return result;
  }
  // 如果构造函数返回的不是一个对象，那么返回创建的新对象
  return obj;
}
```