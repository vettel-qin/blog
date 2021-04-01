在 JavaScript 中，.replace() 方法只会替换目标字符串中满足 pattern 部分的第一个字符串
```
let string = "Wow, he doesn't like Porsche? I guess he must be crazy!"
console.log(string.replace('he', 'she')) // Wow, she doesn't like Porsche? I guess he must be crazy!

```
而使用ES2021 .replaceAll() 方法，我们可以一次性更新满足 pattern 的所有字符串
```
let string = "Wow, he doesn't like Porsche? I guess he must be crazy!"

console.log(string.replace('he', 'she')) // Wow, she doesn't like Porsche? I guess she must be crazy!

```