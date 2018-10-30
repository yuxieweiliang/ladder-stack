import React from 'react';
import mongoose from 'mongoose';
import _ from 'lodash';
import ReactServer from 'react-dom/server'
import BookPage from '../../../src/page/book'
import queryString from 'query-string'
import func from '../../../utils/func'

const User = mongoose.model('User')
/**
 * 书籍
 */
var getUser = async (ctx) => {
  let data = JSON.parse(ctx.request.body);
  let params = ctx.request.query || ctx.query;
  let users = await  User.find({'account.username': data.username });
  let message = null;

  if(_.isEmpty(users)) {
    message = '用户不存在'
  } else {
    message = users;
  }
  ctx.body = JSON.stringify({
    data: message
  });
};


var postUser = async ctx => {
  let data = JSON.parse(ctx.request.body);
  let params = ctx.request.query || ctx.query;
  let users = await  User.find({'account.username': data.username })
  let message = null;

  if(_.isEmpty(users)) {
    let createUser = await User.create({ account: data});
    message = (_.isEmpty(createUser) ? '用户创建失败！' : '用户创建成功！');
  } else {
    message = '用户已存在。';
  }

  ctx.body = JSON.stringify({message});
};
var updateUser = async ctx => {
  let data = JSON.parse(ctx.request.body);
  let params = ctx.request.query || ctx.query;
  let users = await  User.find({'account.username': data.username });
  let message = null;

  if(_.isEmpty(users)) {
    message = '用户不存在'
  } else {
    let update = await User.update({_id: doc[0]._id}, {'account.password': data.password}, {safe: true})
    if(_.isEmpty(users)) {
      message = '更新失败！'
    } else {
      message = {
        type: 'USER',
        container: update
      }
    }
  }
  ctx.body = JSON.stringify({
    data: message
  });
};

var deleteUser = async ctx => {
  let data = JSON.parse(ctx.request.body);
  let params = ctx.request.query || ctx.query
  let users = await  User.find({'account.username': data.username });
  let message = null;

  if(_.isEmpty(users)) {
    message = '用户不存在！'
  } else {

    let remove = await User.remove({_id: users[0]._id});
    if(remove) {
      message = '删除成功！'
    } else {
      message = '删除失败！'
    }
  }

  ctx.body = JSON.stringify({
    data: message
  });
};

module.exports = {
  'GET /api/user': getUser,
  'POST /api/user': postUser,
  'POST /api/user_update': updateUser,
  'POST /api/user_delete': deleteUser,
};