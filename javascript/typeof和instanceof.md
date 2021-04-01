# typeof和instanceof
- 能识别值类型
- 能识别函数类型，返回function
- 能识别引用数据类型，但仅仅如此，不能进一步认知，如null、array、object都是返回object 可以使用Object.prototype.toString.call()判断类型，但是只能检验已经存在的类型
- instanceof：不能对原始简单数据类型校验
- instanceof本质就是用来判断是否是某个实例的构造函数