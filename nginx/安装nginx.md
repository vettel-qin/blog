```
sudo apt-get install nginx
```
Ubuntu安装之后的文件结构大致为：
- 所有的配置文件都在/etc/nginx下，并且每个虚拟主机已经安排在了/etc/nginx/sites-available下
- 程序文件在/usr/sbin/nginx
- 日志放在了/var/log/nginx中
- 并已经在/etc/init.d/下创建了启动脚本nginx
- 默认的虚拟主机的目录设置在了/var/www/nginx-default (有的版本 默认的虚拟主机的目录设置在了/var/www, 请参考/etc/nginx/sites-available里的配置)

关闭nginx：

nginx -s stop : 快速停止nginx

nginx -s quit ：完整有序的停止nginx

关闭
service nginx stop
systemctl stop nginx
启动
service nginx start
systemctl start nginx
sudo /etc/init.d/nginx start
重启
service nginx reload
systemctl restart nginx
查看运行信息
ps -ef | grep nginx