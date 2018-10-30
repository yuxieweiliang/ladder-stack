import mongoose, { Schema } from 'mongoose';
var UserSchema = new Schema({
  id: {user: Schema.Types.ObjectId, ref: 'user'},
  dates: {created: Date},
  account: {
    username: String,
    password: String
  },
  // 位置
  location: String,
  // 包含
  introduce: String,
  // 电话
  phone: String,
  // 锁定
  locked: Boolean,
  // 名字
  name: String,
  // 昵称
  nickname: String,
  // 权限
  permissions: String,
  // 网站管理员
  site_admin: String,
  // 类型
  type: "User",
  // 个人的连接
  urls: {
    // 作者
    avatar: String,
    // 简介
    profile: String,
    // 星星
    stars: String
  },
  // 已经认证
  verified: Boolean,
  // 个人网站地址
  website: String
});



export const User = mongoose.model('User', UserSchema);

