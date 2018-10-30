// mongod --dbpath E:\00_project\01_node\mong\db
let mongoose = require("mongoose");
// 连接数据库
let db = mongoose.connect("mongodb://127.0.0.1:27017/test");
let Schema = mongoose.Schema;

///   Schema  用来定义数据模型
let tschema = new Schema({date: { type: Date, default: Date.now }},{
  name : { type:String },
  age  : { type:Number, default:18 },
  gender : { type:Boolean, default:true },
  time : { type:Number, default:Date.now },
  email : { type:String }
});

let TestSchema= db.model("someOne", tschema);


let TestEntity = new TestSchema();
// 创建数据，因为上面的函数查询到是28所以这里添加的查不到，而且这里如果年龄变了，哪里也查不到。
/*TestSchema.create({
  name : "test_create",
  age  : 28,
  email: "tom@qq.com",
  'child.name': '的函数查询到'
},function(error,doc){
  console.log(doc);
});


TestEntity.save(function(error,doc) {
  console.log(doc);
});*/

TestEntity.update({ name: 'test_create' }, { 'age': 22 }, function(error, docs){
  if(error) {
    console.log(error);
    console.log('error');
  } else {
    console.log(docs);
    console.log('Update success!');
  }
});



//我们只需要把显示的属性设置为大于零的数就可以，当然1是最好理解的，
// _id是默认返回，如果不要显示加上("_id":0)，
// 但是，对其他不需要显示的属性且不是_id，如果设置为0的话将会抛异常或查询无果。

TestSchema.find({},function(err,docs){
  //docs 查询结果集
  console.log(docs)
});

/*TestSchema.findOne({ age: 27}, function (err, doc){
  // 查询符合age等于27的第一条数据
  // doc是查询结果
  // console.log(doc)
});*/


db.connection.on("error", function (error) {
  console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
  console.log("------数据库连接成功！------");
});


///     forever  nodemon