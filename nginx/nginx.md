# 1. nginx简介
nginx是一个高性能的HTTP和反向代理服务器，特点是占有内存少，并发能力强。专为性能优化而生的，有报告表明能支持高达50，000个并发连接数。

# 2. 正向/反向代理
(1). 正向代理

# 3. 负载均衡

# 4. 动静分离

# 5. Nginx 常用命令
使用nginx操作命令前提条件，必须进入nginx的目录/usr/local/nginx/sbin
1. 查看版本

```
  ./nginx -v
```

2. 启动

```
  ./nginx
```

3. 关闭（有两种方式）

```
 ./nginx -s stop
 ./nginx -s quit
```

4. 重启

```
  ./nginx -s reload
```
5. 查看进程
```
ps -ef | grep nginx
```

```
systemctl start firewalld  # 开启防火墙
systemctl stop firewalld   # 关闭防火墙
systemctl status firewalld # 查看防火墙开启状态，显示running则是正在运行
firewall-cmd --reload      # 重启防火墙，永久打开端口需要reload一下
firewall-cmd --list-all    # 查看开放的端口号
firewall-cmd --add-port80/tcp --permanent 设置开放的端口
firewall-cmd --add-server=http --permanent
```

# 正向代理

一般的访问流程是客户端直接向目标服务器发送请求并获取内容，使用正向代理后，客户端改为向代理服务器发送请求，并指定目标服务器（原始服务器），然后由代理服务器和原始服务器通信，转交请求并获得的内容，再返回给客户端。正向代理隐藏了真实的客户端，为客户端收发请求，使真实客户端对服务器不可见；

举个具体的例子 🌰，你的浏览器无法直接访问谷哥，这时候可以通过一个代理服务器来帮助你访问谷哥，那么这个服务器就叫正向代理。

# 反向代理

与一般访问流程相比，使用反向代理后，直接收到请求的服务器是代理服务器，然后将请求转发给内部网络上真正进行处理的服务器，得到的结果返回给客户端。反向代理隐藏了真实的服务器，为服务器收发请求，使真实服务器对客户端不可见。一般在处理跨域请求的时候比较常用。现在基本上所有的大型网站都设置了反向代理。

举个具体的例子 🌰，去饭店吃饭，可以点川菜、粤菜、江浙菜，饭店也分别有三个菜系的厨师 👨‍🍳，但是你作为顾客不用管哪个厨师给你做的菜，只用点菜即可，小二将你菜单中的菜分配给不同的厨师来具体处理，那么这个小二就是反向代理服务器。

简单的说，一般给客户端做代理的都是正向代理，给服务器做代理的就是反向代理。

# 负载均衡

使用多个服务器，然后将请求分发到各个服务器上，将负载分发到不同的服务器，这就是负载均衡，核心是「分摊压力」。Nginx 实现负载均衡，一般来说指的是将请求转发给服务器集群。

举个具体的例子 🌰，晚高峰乘坐地铁的时候，入站口经常会有地铁工作人员大喇叭“请走 B 口，B 口人少车空....”，这个工作人员的作用就是负载均衡。

# 动静分离

为了加快网站的解析速度，可以把动态页面和静态页面由不同的服务器来解析，加快解析速度，降低原来单个服务器的压力

# 典型配置
位置： /usr/local/nginx/conf

组成：
有三部分组成：
全局块
从配置文件开始到event块之间的内容，主要设置一些影响nginx服务器整体运行的配置指令
event块
event块涉及的指令主要影响nginx服务器与用户的网络连接
http块
包括http全局块和server块


```
user  nginx;                        # 运行用户，默认即是nginx，可以不进行设置
worker_processes  1;                # Nginx 进程数，一般设置为和 CPU 核数一样。值越大表示支持的并发处理量越多
error_log  /var/log/nginx/error.log warn;   # Nginx 的错误日志存放目录
pid        /var/run/nginx.pid;      # Nginx 服务启动时的 pid 存放位置

events {
  use epoll;     # 使用epoll的I/O模型(如果你不知道Nginx该使用哪种轮询方法，会自动选择一个最适合你操作系统的)
  worker_connections 1024;   # 每个进程允许最大并发数,或支持的最大连接数
}

http {   # 配置使用最频繁的部分，代理、缓存、日志定义等绝大多数功能和第三方模块的配置都在这里设置
  # 设置日志模式
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

  access_log  /var/log/nginx/access.log  main;   # Nginx访问日志存放位置

  sendfile            on;   # 开启高效传输模式
  tcp_nopush          on;   # 减少网络报文段的数量
  tcp_nodelay         on;
  keepalive_timeout   65;   # 保持连接的时间，也叫超时时间，单位秒
  types_hash_max_size 2048;

  include             /etc/nginx/mime.types;      # 文件扩展名与类型映射表
  default_type        application/octet-stream;   # 默认文件类型

  include /etc/nginx/conf.d/*.conf;   # 加载子配置项

  server {
    listen       80;       # 配置监听的端口
    server_name  localhost;    # 配置的域名

    location / {
      root   /usr/share/nginx/html;  # 网站根目录
      index  index.html index.htm;   # 默认首页文件
      deny xxx.xxx.xx.xx;   # 禁止访问的ip地址，可以为all
      allow xxx.xxx.xx.xx   # 允许访问的ip地址，可以为all
    }

    error_page 500 502 503 504 /50x.html;  # 默认50x对应的访问页面
    error_page 400 404 error.html;   # 同上
  }
}
```

server 块可以包含多个 location 块，location 指令用于匹配 uri，语法：

```
location [ = | ~ | ~* | ^~] uri {
	...
}
```

localtion指令说明：
= 精确匹配路径，用于不含正则表达式的 uri 前，如果匹配成功，不再进行后续的查找；
^~ 用于不含正则表达式的 uri 前，表示如果该符号后面的字符是最佳匹配，采用该规则，不再进行后续的查找；
~ 表示用该符号后面的正则去匹配路径，区分大小写；
~\* 表示用该符号后面的正则去匹配路径，不区分大小写。跟 ~ 优先级都比较低，如有多个 location 的正则能匹配的话，则使用正则表达式最长的那个；

# pm2

安装 pm2 并创建软链接

```
npm install pm2 -g
ln -s /usr/local/nodejs/bin/pm2 /usr/local/bin/pm2
```

# pm2 基本功能命令

| 功能                  | 命令                                  |
| --------------------- | ------------------------------------- |
| 启动进程/应用         | pm2 start bin/abc 或 pm2 start app.js |
| 重命名进程/应用       | pm2 start app.js --name abc           |
| 添加进程/应用         | pm2 start bin/abc --watch             |
| 结束进程/应用         | pm2 stop abc                          |
| 结束所有进程/应用     | pm2 stop all                          |
| 删除进程/应用         | pm2 delete abc                        |
| 删除所有进程/应用     | pm2 delete all                        |
| 列出所有进程/应用     | pm2 list                              |
| 查看进程/应用详情     | pm2 show abc 或 pm2 describe abc      |
| 查看进程/应用资源消耗 | pm2 monit                             |
| 查看进程/应用日志     | pm2 logs abc                          |
| 查看所有进程/应用日志 | pm2 logs                              |
| 重新启动进程/应用     | pm2 restart abc                       |
| 重新启动所有进程/应用 | pm2 restart all                       |

# 实例

## 反向代理

比如我们监听 8888 端口，然后把访问不同路径的请求进行反向代理：
把访问 http://ip地址:8888/edu 的请求转发到 http://ip地址:9999
把访问 http://ip地址:8888/vod 的请求转发到 http://ip地址:9991

```
server {
  listen 8888;
  server_name ip地址;

  location ~ /edu/ {
    proxy_pass http://ip地址:9999;
  }

  location ~ /vod/ {
    proxy_pass http://ip地址:9991;
  }
}
```

反向代理还有一些其他的指令，可以了解一下：

proxy_set_header：在将客户端请求发送给后端服务器之前，更改来自客户端的请求头信息；
proxy_connect_timeout：配置 Nginx 与后端代理服务器尝试建立连接的超时时间；
proxy_read_timeout：配置 Nginx 向后端服务器组发出 read 请求后，等待相应的超时时间；
proxy_send_timeout：配置 Nginx 向后端服务器组发出 write 请求后，等待相应的超时时间；
proxy_redirect：用于修改后端服务器返回的响应头中的 Location 和 Refresh。

## 负载均衡

Nginx 提供了好几种分配方式，默认为轮询，就是轮流来。有以下几种分配方式：
轮询，默认方式，每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务挂了，能自动剔除；
weight，权重分配，指定轮询几率，权重越高，在被访问的概率越大，用于后端服务器性能不均的情况；
ip_hash，每个请求按访问 IP 的 hash 结果分配，这样每个访客固定访问一个后端服务器，可以解决动态网页 session 共享问题。负载均衡每次请求都会重新定位到服务器集群中的某一个，那么已经登录某一个服务器的用户再重新定位到另一个服务器，其登录信息将会丢失，这样显然是不妥的；
fair（第三方），按后端服务器的响应时间分配，响应时间短的优先分配，依赖第三方插件 nginx-upstream-fair，需要先安装；

修改 nginx.conf

```
  upstream myserver {
    server ip地址:9999;
    server ip地址:9991;
    # fair/ip_hash
  }

  server {
    ...
    location / {
      proxy_pass http://myserver;
      ...
    }
  }
```
