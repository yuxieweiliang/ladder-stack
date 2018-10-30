/* global sails */
/**
 * 请求的权限控制
 ****** 权限控制与restful存在冲突
 * 原则上除过 view ，其他api必须通过fetch才能访问
 */

module.exports = function(req, res, next) {

  const { method, headers, options } = req;
  const { controller, prefix, action } = options;
  const { passage } = sails.config.system.options;

  sails.log.debug(method, action, controller);

  let passages = passage.split(':');
  let passageKey = passages[0];
  let passageVal = passages[1];

  if (passageKey in headers &&  headers[passageKey] === passageVal) {
    return  next();
  }
  return res.freeError('0016');
};