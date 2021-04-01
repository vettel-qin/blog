- in 验证一个属性是否属于这个对象：attr in object，包括原型对象上面的属性
- hasOwnProperty 验证一个属性是否属于这个对象的私有属性：object.hasOwnProperty(attr)

```
function Fn(x, y) {
  this.x = x
  this.y = y
  this.say = function () {}
}

const f = new Fn(10, 20)
console.log('x' in f) // true
console.log('say' in f) // true
console.log('toString' in f) // true
console.log(f.hasOwnProperty('x')) // true
console.log(f.hasOwnProperty('y')) // true
console.log(f.hasOwnProperty('say')) // true
console.log(f.hasOwnProperty('toString')) // false，因为toString是公有属性
console.log(f.hasOwnProperty('hasOwnProperty')) // false, hasOwnProperty是公有属性
```