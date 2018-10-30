import mongoose, { Schema } from 'mongoose';


// 妖兽
var MonsterSchema = new Schema({
  name: String,
  type: String,
  // 能力
  ability: {
    name: String,
    // 种族
    race: String,
    // 等级
    grade: String
  },
  // 排行
  ranking: Number
});

export const Monster = mongoose.model('Monster', MonsterSchema);