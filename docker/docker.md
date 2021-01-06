# 运行Docker
1. 写一个Dockerfile
2. 使用docker image build 来将Dockerfile打包成镜像
3. 使用docker container create 来根据创建一个容器
4. 使用docker container start来启动一个创建好的容器

## 创建文件
创建一个目录hello-docker，在目录中创建一个index.html文件，内容为：
```
<h1>Hello docker</h1>
```

然后再在目录中创建一个Dockerfile文件，内容为：
```
FROM nginx

COPY ./index.html /usr/share/nginx/html/index.html

EXPOSE 80
```
Dockerfile 中的内容，现在我们简单拆解下：
FROM nginx：基于哪个镜像
COPY ./index.html /usr/share/nginx/html/index.html：将宿主机中的./index.html文件复制进容器里的/usr/share/nginx/html/index.html
EXPOSE 80：容器对外暴露80端口

此时，你的文件结构应该是：
```
hello-docker
  |____index.html
  |____Dockerfile
```

## 打包镜像
文件创建好了，现在我们就可以根据Dockerfile创建镜像了！
```
cd hello-docker/ # 进入刚刚的目录
docker image build ./ -t hello-docker:1.0.0 # 打包镜像
```
注意！Docker 中的选项（Options）放的位置非常有讲究，docker —help image和docker image —help是完全不同的命令

docker image build ./ -t hello-docker:1.0.0的意思是：基于路径./（当前路径）打包一个镜像，镜像的名字是hello-docker，版本号是1.0.0。该命令会自动寻找Dockerfile来打包出一个镜像

## 运行容器
我们刚刚使用 Dockerfile 创建了一个镜像。现在有镜像了，接下来要根据镜像创建容器：
```
docker container create -p 2333:80 hello-docker:1.0.0
docker container start xxx # xxx 为上一条命令运行得到的结果
```

然后在浏览器打开127.0.0.1:2333，你应该能看到刚刚自己写的index.html内容
在上边第一个命令中，我们使用docker container create来创建基于hello-docker:1.0.0镜像的一个容器，使用-p来指定端口绑定——将容器中的80端口绑定在宿主机的2333端口。执行完该命令，会返回一个容器ID.而第二个命令，则是启动这个容器，启动后，就能通过访问本机的2333端口来达到访问容器内80端口的效果了

可以使用docker containers ls来查看当前运行的容器

当容器运行后，可以通过如下命令进入容器内部：
```
docker container exec -it xxx /bin/bash # xxx 为容器ID
```
复制代码原理实际上是启动了容器内的/bin/bash，此时你就可以通过bash shell与容器内交互了。就像远程连接了SSH一样
