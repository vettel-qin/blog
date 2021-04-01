 ## 区别
- interface
  同名的interface自动聚合，也可以跟同名的class自动聚合
  只能表示object、class、function类型
  通过extends实现继承

- type
  不仅仅能够表示object、class、function还可以表示基本数据类型、联合类型等
  不能重名
  通过&实现继承

  1. 声明Object和Function
  ```
  interface Point {
    x: number;
  }

  interface Point {
    y: number;
  }

  class Point { // 两个interface Point和class Point会合并
    set() {}
  }

  interface SetFunction {
    (x: number, y: number): number;
  }

  const obj: Point = {x: 1, y: 2, set: () => ()}

  const fn: SetFunction = (x, y) => x + y;
  ```

  ```
  type Point = {
    x: number;
  }

  type SetFunction = (x: number, y: number) => number

  // type声明其他数据类型
  type Name = string;
  type artialPointX = {x: number};
  type artialPointY = {y: number};
  type Points = artialPointX | artialPointY;
  ```

  2. extend
  - interface extends interface

  ```
  interface PointX {
    x: number
  }

  interface Point extends PointX {
    y: number
  }
  ```

  - interface extends type
  
  ```
  type PointX = { x: number }

  interface Point extends PointX {
    y: number
  }
  ```

  - type extends type

  ```
  type PointX = { x: number }

  type Ponit = PointX & { y: number }
  ```

  - type extends interface

  ```
  interface PointX {
    x: number
  }

  type Point = PointX & {y: number}
  ```