function myInstanceof(left, right) {
  //基本数据类型直接返回false
  if (typeof left !== "object" || left === null) return false;
  //getProtypeOf是Object对象自带的一个方法，获取某个实例对象的原型
  let proto = Object.getPrototypeOf(left);
  console.log(proto, '1111');
  while (true) {
     //查找到尽头，还没找到
     if(proto === null) return false;
     //找到相同的原型对象
     if (proto === right.prototype) return true;
     proto = Object.getPrototypeOf(proto);
  }
}

console.log(myInstanceof({age: 18}, String));