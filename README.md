"# ladder-stack" 

## 启动数据库
cd mongodb/mongo/bin
mongod --dbpath ../db
###

# 清理本地缓存命令
git clean -df

#清空git暂存区
git rm -r --cached .
#清空git 指定暂存区文件
git rm -r --cached filename


// 将本地master 强制替换线上 master
git push origin master:master -f


---------------------------------------
git push origin develop:master -f
把本地的 develop 分支强制(-f)推送到远程 master








    git push --set-upstream origin last













