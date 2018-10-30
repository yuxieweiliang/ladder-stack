import mongoose, { Schema } from 'mongoose';
var async = require('async');
import { Book } from './book';
let db = mongoose.connect('mongodb://localhost/test');


db.connection.on("error", function (error) {
  console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
  console.log("------数据库连接成功！------");
});


const books = mongoose.model('Book');

books.create({name: 'fffff'}, function(err, docs) {
  console.log(docs);
  books.remove(function() {
    mongoose.disconnect();
  });

});


/*

let UserSchema = new Schema({
  name: String,
  age: Number,
  id: Schema.Types.ObjectId,
  address: String,
});
let user = db.model('User', UserSchema);


user.create([
  {name: '云若风生', age: 30},
  {name: '雨歇微凉', age: 20}
], function(err, docs) {

  console.log(docs)
});


*/
