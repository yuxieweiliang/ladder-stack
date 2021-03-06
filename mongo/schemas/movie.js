var mongoose = require('mongoose');
var MovieSchema = new mongoose.Schema({
  doctor: String,
  title: String,
  language: String,
  country: String,
  summary: String,
  flash: String,
  poster: String,
  year: Number,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

MovieSchema.pre('save', function(next) {
  console.log(this);
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }
  else {
    this.meta.updateAt = Date.now()
  }
  next()
});

MovieSchema.statics = {
  fetch: function (cd) {
    return this
      .find({})
      .sort('mate.updateAt')
      .exec(cd)
  },
  findById: function(id, cd) {
    return this
      .findOne({_id: id})
      .exec(cd)
  }
};
module.exports = MovieSchema;