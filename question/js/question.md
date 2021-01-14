1. 深浅拷贝
1.1. 浅拷贝
Object.assign() 会合并对象生成一个新对象。如果对象的属性是普通类型改变之后新对象不会改变。如果是引用类型改变之后新对象也会改变。
```
const obj = {a: 1, b: {item: 2}};
const newObj = Object.assign({}, obj);
obj.a = 11;
obj.b.item = 22;
console.log(newObj.a); // 1
console.log(newObj.b.item); // 22;
```
1.2. 深拷贝
1.2.1. JSON.parse(JSON.stringify(obj));

1.2.2. 浅拷贝 + 递归
```
function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

function cloneDeep(source) {
  if (!isObject(source)) return source; // 非对象返回自身

  const target = Array.isArray(source) ? [] : {};

  for (let key in source) {
    //判断属性是否是对象自身属性，而不是从原型链继承的
    if (source.hasOwnProperty(key)) {
      // 判断属性值是否为对象，如果是对象就进行递归操作
      if (isObject(source[key])) {
        target[key] = cloneDeep(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return target;
}
```