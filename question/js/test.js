const obj = { a: 1, b: {c: 2, d: 3, e: {f: 4}} };

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

const newObj = cloneDeep(obj);

newObj.b.c = 'newObjcc';

console.log(obj);
console.log(newObj);
