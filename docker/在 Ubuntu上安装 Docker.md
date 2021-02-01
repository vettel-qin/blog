首先，更新软件包索引，并且安装必要的依赖软件，来添加一个新的 HTTPS 软件源：
```
sudo apt update
sudo apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```

使用下面的 curl 导入源仓库的 GPG key：
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

将 Docker APT 软件源添加到你的系统：
```
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```
现在，Docker 软件源被启用了，你可以安装软件源中任何可用的 Docker 版本。

01.想要安装 Docker 最新版本，运行下面的命令。如果你想安装指定版本，跳过这个步骤，并且跳到下一步。
```
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
```

02.想要安装指定版本，首先列出 Docker 软件源中所有可用的版本：
```
sudo apt update
apt list -a docker-ce
```
可用的 Docker 版本将会在第二列显示。本文安装是5:20.10.2~3-0~ubuntu-focal amd64
通过在软件包名后面添加版本=<VERSION>来安装指定版本：
```
sudo apt install docker-ce=<VERSION> docker-ce-cli=<VERSION> containerd.io
```

一旦安装完成，Docker 服务将会自动启动。你可以输入下面的命令，验证它：
```
sudo service docker start
```

这个时候运行docker的话，如果不是root用户会报错
看一下权限
```
$ cd /var/run
$ ll | grep docker
# 输出如下
drwx------  8 root  root    180 11月 21 16:36 docker
-rw-r--r--  1 root  root      5 11月 21 16:35 docker.pid
srw-rw----  1 root  docker    0 11月 21 16:35 docker.sock
```

可以看到 docker.sock 的所有者是 docker 这个组。所以我们要把当前用户添加到这个组里。
```
$ sudo gpasswd -a ${USER} docker
```

重启docker
```
sudo service docker restart
```

切换当前会话到新 group 或者重启 X 会话
```
newgrp - docker
```
注意:最后一步是必须的，否则因为 groups 命令获取到的是缓存的组信息，刚添加的组信息未能生效，所以 docker images 执行时同样有错。

安装docker-compose
```
curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.4/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose  #赋予可执行权限
```