//  git rm -rf --cached .  清除缓存 -r 循环 -f强制


40: 黑
30: 黑
41: 紅
31: 紅
42: 綠
32: 綠
43: 黃
33: 黃
44: 藍
34: 藍
45: 紫
35: 紫
46: 深綠
36: 深綠
47: 白色
37: 白色
記得在打印完之後，把顏色恢復成NONE，不然再後面的打印都會跟著變色。
另外，還可以加一些ANSI控制碼。加顏色只是以下控制碼中的一種：
\033[0m 關閉所有屬性
\033[1m 設置高亮度
\033[4m 下劃線
\033[5m 閃爍
\033[7m 反顯
\033[8m 消隱
\033[30m -- \033[37m 設置前景色
\033[40m -- \033[47m 設置背景色
\033[nA 光標上移n行
\033[nB 光標下移n行
\033[nC 光標右移n行
\033[nD 光標左移n行
\033[y;xH設置光標位置
\033[2J 清屏
\033[K 清除從光標到行尾的內容
\033[s 保存光標位置
\033[u 恢復光標位置
\033[?25l 隱藏光標
\033[?25h 顯示光標






unit ： 单元

utils ：工具

assets ：
    - func 通用函数


## 前端页面
src ：
    - style 样式
    - component ：组件
                - view 视图
                - action 行为
                - controller 控制器
                - moddle 数据模型
                - readme 自述
                - example 例子
    - assembly ：配装
                - view 视图
                - action 行为
                - controller 控制器
                - moddle 数据模型
                - readme 自述
                - example 例子

## 纯函数
func

## 打包内容
dist

## 工具
tool

## 配置文件
config

## 静态资源 {静态页面组件等}
asset

## 公共资源 {图片字体icon等}
public

## 组件
unit ：
     - view 视图
     - action 逻辑
     - readme 自述
     - example 例子

## 服务端
api ：
    - server 服务
    - router 路由
    - request 请求
    - response 返回
    - moddle 中间件

## 测试
test ：
     - 服务端测试
     - 客户端测试

docs ：
     - 组建的说明文档





userId # 用户ID
visitId # 访客 































