## token存放位置
token就是访问资源的凭证。
一般是用户通过用户名和密码登录成功之后，服务器将登陆凭证做数字签名，加密之后得到的字符串作为token。token在用户登录成功之后会返回给客户端，客户端主要有以下几种存储方式：
1. 存储在localStorage中，每次调用接口的时候都把它当成一个字段传。
2. 存储在localStorage中，每次调用接口的时候放在HTTP请求头的authorization字段里。
3. 存储在cookie中，让它自动发送，不过缺点就是不能跨域。

## token放在cookie和放在localStorage、sessionStorage中有什么不同？
1. 将token存储在localStorage或sessionStorage
优点：具有更加灵活。更大空间，天然免疫CSRF的特征
缺点：容易受到XSS攻击

2. 将token存储在cookie
优点：可以指定httponly,来防止被javascript读取，也可以指定secure，来保证token只在https下传输。
缺点： 容易遭受CSRF攻击，空间有限。
