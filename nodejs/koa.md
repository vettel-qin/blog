1. koa2 和express 区别
express是一个基于Nodejs的web应用开发框架，主要基于Connect中间件，并且自身封装了路由、视图处理等功能。
koa主要基于CO中间件，基于ES6的Generator特性的异步流程控制，解决了回调地狱问题和麻烦的错误处理，自身不包含任何中间件。koa2使用async和await来实现异步流程控制。

区别：
（1）、express自身集成了路由、视图处理等功能。koa本身不集成任何中间件，需要配合路由、视图等中间件进行开发。
（2）、异步流程控制：express采用callback来处理异步，koa1采用Generator，koa2采用async/await。Generator和async/await使用同步的写法来处理异步。
（3）、错误处理：express使用callback捕获异常。koa使用try catch,能更好地解决异常捕获。
（4）、中间件模型：express基于Connect中间件，线性模型。koa中间件采用洋葱模型。
（5）、context: express只有Request和Response两个对象。koa增加了一人Context的对象，在Context上也挂载了Request和Response两个对象。