git 使用


打开git bash
ssh-keygen -t rsa -C "yunruofengsheng@126.com" // 三个回车  C:/user/xueyufei/.ssh


#先删除，再添加
git remote rm origin
git remote add origin [url]



提交
git push origin master



mongodb 使用

将mongodb加入环境变量，
> mongo  // 进入mongodb
> db.movies.find() // 查看movies下的所有数据



cd mongo\bin                                      // 切换到mongod.exe目录
mongod --dbpath E:\00_project\01_node\mong\db    // 用来创建并运行数据库


数据 = {
  用户: {账号, 密码, 名字, 昵称, 介绍, 书架, 架构, 喜欢, 收藏, 好友, }
  商品: {名称, 介绍, 图片, 收藏数, 喜欢数}
  架构: {名称, id, 集合: {头部, 中间, 底部}}
}



data = {
  user : {u_name, u_age, },
  book: {b_name, b_size, b_zan, b_tuijian},
  tool: {t_name, t_used, t_download}
};



//  利用这个可以添加数据
var _movie = new Movie({
  title: '异形：契约e',
  director: '雷德利·斯科特',
  country: '美国',
  year: 2017,
  poster: 'https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2167448161.webp',
  language: '英语',
  flash: 'http://119.188.38.131/youku/65743530DBB4C838FBA166544F/0300080100585FB87B799839BBD120136343F3-AD4F-8451-FC2A-A9554D727689.mp4?sid=049846040186412f9e92c&ctype=12&ccode=0401&duration=133&expire=18000&psid=599c21659cf2ed62339a7ba955d34987&ups_client_netip=114.240.103.157&ups_ts=1498460401&ups_userid=&utid=LT%2FBEcSPnjsCAXt3LLqrfLyH&vid=XMTg4NTUxNjQ5Ng%3D%3D&vkey=A57113a190f13ec64fa327c44ec8d116e&nk=411351972806_24974340174&ns=0_22165960&special=true',
  summary:'“科幻之父”雷德利-斯科特将为他所开创的《异形》系列带来新篇章。《异形：契约》的故事发生在《普罗米修斯》10年后，一群新的宇航员乘坐着“契约号”飞船前往遥远的星系寻找殖民地，他们来到一处看似天堂般的星球，实则是黑暗、危险的地狱，在那里他们见到了“普罗米修斯”号唯一的幸存者——由迈克尔·法斯宾德饰演的生化人大卫，一场毁灭性的巨大灾难即将到来。'
});

_movie.save(function(error, movie) {
  if(error) {
    console.log(error)
  }
  res.redirect('/movie/' + movie.id)
})












































