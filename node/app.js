var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3040;
var app = express();

var Movie = require('./moddel/movie');

// 为本地变量赋值
app.locals.moment = require('moment');

var dir = path.join(__dirname, './views/pages/');

// 使用html模板，需增加  app.engine('html', require('ejs').__express);使用EJS或jade模板，不用配置该项。
app.set('views', dir);
app.set('view engine', 'jade');// 设置模板引擎


// express 默认使用解析http请求的中间件之一
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'bower_components')));

// 首页 分割线
app.get('/', (req, res) => {
  console.log('fffffff');

  Movie.fetch(function(error, movie) {
    if(error) {
      console.log(error)
    }
    res.render('index', {
      title: '电影网站首页',
      movies: movie
    });
    if( movie.length > 1) {
      res.render('index', {
        title: '电影网站首页',
        movies: movie
      })
    } else {
      // 如果数据不存在，则显示 404页面
    }
  });
});

// 详情页
app.get('/movie/:id', (req, res) => {
  const id = req.params.id;
  /*Movie.findById(id, function(error, movie) {
    if(error) {
      console.log(error)
    }
    res.render('detail', {
      title: '电影详情页',
      movie: movie
    })
  });*/
  res.render('detail', {
    title: '电影详情',
    movie: {
      director: '雷德利·斯科特',
      country: '美国',
      title: '异形：契约',
      year: 2017,
      poster: 'https://img3.doubanio.com/img/celebrity/small/32214.jpg',
      language: '英语',
      flash: 'http://119.188.38.131/youku/65743530DBB4C838FBA166544F/0300080100585FB87B799839BBD120136343F3-AD4F-8451-FC2A-A9554D727689.mp4?sid=049846040186412f9e92c&ctype=12&ccode=0401&duration=133&expire=18000&psid=599c21659cf2ed62339a7ba955d34987&ups_client_netip=114.240.103.157&ups_ts=1498460401&ups_userid=&utid=LT%2FBEcSPnjsCAXt3LLqrfLyH&vid=XMTg4NTUxNjQ5Ng%3D%3D&vkey=A57113a190f13ec64fa327c44ec8d116e&nk=411351972806_24974340174&ns=0_22165960&special=true',
      summary:'“科幻之父”雷德利-斯科特将为他所开创的《异形》系列带来新篇章。《异形：契约》的故事发生在《普罗米修斯》10年后，一群新的宇航员乘坐着“契约号”飞船前往遥远的星系寻找殖民地，他们来到一处看似天堂般的星球，实则是黑暗、危险的地狱，在那里他们见到了“普罗米修斯”号唯一的幸存者——由迈克尔·法斯宾德饰演的生化人大卫，一场毁灭性的巨大灾难即将到来。'
    }
  });
});

app.post('admin/movie/new', function() {
  var id = req.body.movie.id;
  var movieObj = req.body.movie;
  var _movie;
  if(id != 'undefined') {
    Movie.findById(id, function(error, movie) {
      if(error) {
        console.log(error)
      }
      _movie = _.extend(movie, movieObj);
      _movie = Movie.save(function(error, movie) {
        if(error) { // 分卷  拖动
          console.log(error)
        }
        res.redirect('/movie/' + movie.id)
      })
    })
  } else {
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      country: movieObj.country,
      flash: movieObj.flash,
      poster: movieObj.poster,
      summary: movieObj.summary
    });
    _movie = Movie.save(function(error, movie) {
      if(error) {
        console.log(error)
      }
      res.redirect('/movie/' + movie.id)
    })
  }
});

// admin update
app.get('/admin/movie/update', (req, res) => {
  id = req.params.id;
  if(id) {
    Movie.findById(id, function(error, movie) {
      res.reader({
        title: '后台更新',
        movie
      })
    })
  }
});

// 后台录入页
app.get('/admin/movie', (req, res)=> {
  res.render('admin', {
    title: '电影录入',
    movie: {
      title: '',
      director: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  });
});

// 列表页
app.get('/admin/list', (req, res) => {
  res.render('list', {
    title: '电影列表',
    movies: [{
      title: '异形：契约',
      _id: 1,
      director: '雷德利·斯科特',
      country: '美国',
      year: 2017,
      poster: 'https://img3.doubanio.com/img/celebrity/small/32214.jpg',
      language: '英语',
      flash: 'http://119.188.38.131/youku/65743530DBB4C838FBA166544F/0300080100585FB87B799839BBD120136343F3-AD4F-8451-FC2A-A9554D727689.mp4?sid=049846040186412f9e92c&ctype=12&ccode=0401&duration=133&expire=18000&psid=599c21659cf2ed62339a7ba955d34987&ups_client_netip=114.240.103.157&ups_ts=1498460401&ups_userid=&utid=LT%2FBEcSPnjsCAXt3LLqrfLyH&vid=XMTg4NTUxNjQ5Ng%3D%3D&vkey=A57113a190f13ec64fa327c44ec8d116e&nk=411351972806_24974340174&ns=0_22165960&special=true',
      summary:'“科幻之父”雷德利-斯科特将为他所开创的《异形》系列带来新篇章。《异形：契约》的故事发生在《普罗米修斯》10年后，一群新的宇航员乘坐着“契约号”飞船前往遥远的星系寻找殖民地，他们来到一处看似天堂般的星球，实则是黑暗、危险的地狱，在那里他们见到了“普罗米修斯”号唯一的幸存者——由迈克尔·法斯宾德饰演的生化人大卫，一场毁灭性的巨大灾难即将到来。'
    }]
  });
});

app.listen(port);
//  console.log('Servet started on port ' + port);

/*
*
*
 写作：
 首先建立一张表单，然后每一张表单都会对应一个关系，首先分为敌我双方

 阵营图

 关系图

 等级图

 地理图

 资料库

 设定 -> 人物、兵器、科技、宠物等

 排行榜


 绘画



 * */