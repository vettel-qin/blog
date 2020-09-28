# NodeJs 是什么

javascript 是脚本语言，脚本语言都需要一个解析器才能运行。对于写在 html 页面里的 js，浏览器充当了解析器。而对于需要独立运行的 js，NodeJs 就是一个解析器。

首先 nodejs 不是一门后端语言而是一个解析器/环境，一个能够让 js 运行在服务器的解析器/环境，这个解析器/环境就好比是服务器上的浏览器（不是很恰当的栗子），正因为有了这个环境才让 js 变成了一门后端语言。

解析器/环境需要运行引擎才能对 js 进行解析，Nodejs 采用了 V8 引擎（Google 开源的 js 引擎）。
所以 Nodejs 就是一个基于 Chrome V8 引擎的 js 运行环境。

# NodeJs 遵循的规范

nodejs 遵循的是 CommonJs 规范，什么意思？其实就是规定了导入导出的方式。CommonJs 规范是用 require 导入，用 module.exports 导出。

# NodeJs 的应用场景

一般来说，nodejs 主要应用于以下几个方面：

- 自动化构建等工具
- 中间层
- 小项目（基于 express 做了一个活动页生成工具/基于 koa + sequelize 做了一个监控系统平台）

特点：
1、它是一个 Javascript 运行环境
2、依赖于 Chrome V8 引擎进行代码解释
3、事件驱动
4、非阻塞 I/O
5、单进程，单线程

优点：
高并发（最重要的优点）

缺点：
1、只支持单核 CPU，不能充分利用 CPU
2、可靠性低，一旦代码某个环节崩溃，整个系统都崩溃

# 全局对象

所有模块都可以调用

1. global: 表示 nodejs 所在的全局环境，类似于浏览器中的 window 对象。
2. process: 指向 nodejs 内置的 process 模块，获得当前 Node 进程信息，一般用于获取环境变量之类的信息。
3. console: 输入、输出

# 全局函数

1. 定时器函数：共有 4 个，分别是 setTimeout(), clearTimeout(), setInterval(), clearInterval()。
2. require：用于加载模块
   require()里面的参数有两种写法，一种带路径，一种不带路径。

```
  require('./module'); // 相对路径
  require('/module'); // 绝对路径
```

# 全局变量

1. \_\_filename: 指向当前运行的脚本文件名。
2. \_\_dirname: 指向当前运行的脚本所在的目录。

# node 模块包装

nodejs 在解析每个模块（js 文件）时，会对每个模块进行包装，就是在代码外面加一个闭包，并且向里传递五个参数，这样就保证了每个模块之间的独立。

```
  (function(exports, require, module, __filename, __dirname){
    // module: 表示当前模块
    // __filename: 当前模块的带有完整绝对路径的文件名
    // __dirname: 当前模块的完整绝对路径
    module.exports = exports = this = {};
    // 我们写的代码在这...
    return module.exports;
  })()
```
