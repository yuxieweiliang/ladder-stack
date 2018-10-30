import React from 'react'
import mongoose from 'mongoose';
import ReactServer from 'react-dom/server'
import BookPage from '../../../src/page/book'
import queryString from 'query-string'
import func from '../../../utils/func'

const book = mongoose.model('Book')

var get_book = async (ctx, next) => {
  let postdata = '';
  let params = ctx.request.query || ctx.query || func.getParams(ctx.request.url) || func.getParams(ctx.req._parsedUrl.query)

  /*
  */
  // 从数据库中查找
  console.log(ctx.request.body)
  var getBook = function() {
    return new Promise((resolve, reject) => {
      book.find({name: 'book'}, function(err, doc) {
        if(err || !doc) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  };
  var books = await getBook()
  ctx.body = JSON.stringify(books);
};

module.exports = {
  'get /doc/book': get_book,
};