import mongoose, { Schema } from 'mongoose';

var RoleSchema = new Schema({
  // 名字
  name: String,
  // 年龄
  age: Number,
  // 头像
  img: String,
  // 种族
  race: String,
  // 性别
  gender: String,
  // 性格
  character: String,
  // 介绍
  introduce: String,
  // 背景
  background: String,
  // 权重 人物的主次关系
  weight: Number,
  // 关系
  relationship: [{
    role: {id: Schema.Types.ObjectId, ref: 'role'},
    relation: String
  }],
  // 出场时间
  startDate: {
    time: Date,
    describe: String
  },
  // 结局时间
  endDate: {
    time: Date,
    describe: String
  },
  // 包含 能力，等级
  include: [{
    key: String,
    value: String
  }],
  // 名次
  ranking: [{
    key: String,
    value: String
  }]
});

export const Role = mongoose.model('Role', RoleSchema);