扁平化嵌套数组

```
const arr = [1, 2, 3, [4, 5], 6, 7, [8, 9, 10]];

// 不用flat()
console.log([].concat.apply([], arr));

console.log([].concat([], ...arr));

// flat()
console.log(arr.flat());
```

```
const arr = [1, 2, 3, [4, 5, [6, 7, [8, 9, [10]]]]];

// 使用 Infinity，可展开任意深度的嵌套数组
console.log(arr.flat(Infinity))
```