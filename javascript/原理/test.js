function Animal(type) {
  this.type = type; // 实例上的属性或方法
  // 如果有显式return同时返回是引用类型就直接返回这个引用类型
}

Animal.prototype.say = function () {
  console.log('say');
}

function mockNew() {
  Constructor = [].shift.call(arguments);
  // Constructor = arguments.shift();
  let obj = {} // 返回的结果
  obj.__proto__ = Constructor.prototype;
  let r = Constructor.apply(obj, arguments); // 执行这个构造函数
  return r instanceof Object ? r : obj;
}

const dog = mockNew(Animal, '哺乳类');
dog.say();