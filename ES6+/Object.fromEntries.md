将键值对列表转为对象  ES2019
```
const array = [['one', 1], ['two', 2], ['three', 3]];
const obj = Object.fromEntries(array);
console.log(obj) // { one: 1, two: 2, three: 3 }
```