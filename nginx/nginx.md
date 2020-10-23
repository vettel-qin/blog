# Nginx 常用命令

查看版本

```
  ./nginx -v
```

启动

```
  ./nginx
```

关闭（有两种方式）

```
 ./nginx -s stop
 ./nginx -s quit
```

重启

```
  ./nginx -s reload
```

```
systemctl start firewalld  # 开启防火墙
systemctl stop firewalld   # 关闭防火墙
systemctl status firewalld # 查看防火墙开启状态，显示running则是正在运行
firewall-cmd --reload      # 重启防火墙，永久打开端口需要reload一下
```
