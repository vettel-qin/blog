装饰器（Decorator）是一个函数，用来修改类的行为。以 @ 作为标识符，可以作用于类，也可以作用于类的属性

# ES6中的类
```
class Cat {
  say() {
    console.log("喵~");
  }
}
```
ES6中定义一个类的写法，其实只是一个语法糖，而实际上当我们给一个类添加一个属性的时候，会调用到Object.defineProperty这个方法，它会接受三个参数：target、name和descriptor。所以上面的代码实际上在执行时是这样的：
```
function Cat() {}

Object.defineProperty(Cat.prototype, 'say', {
  value: function () { console.log("喵~"); },
  enmuerable: false,
  writable：true,
  configurable: true,
})
```

# 作用于类的装饰器
```
function isAnimal(target) {
  target.isAnimal = true;
  return target;
}

@isAnimal
class Cat {
  ...
}

console.log(Cat.isAnimal); // true
```

# 作用于类属性的装饰器
```
function readonly(target, name, descriptor) {
  descriptor.wirable = false;
  return descriptor;
}

class Cat {
  @readonly
  say() {
    console.log("喵~"); 
  }
}

const kitty = new Cat();

kitty.say = function() {
  console.log("旺~");
}

kitty.say(); // 喵~
```