/* global sails */

/**
 * 所有的API请求过来时，都要执行token校验
 */
module.exports = function(req, res, next) {
    const jwt = require('jwt-simple');
    const token = (req.body && req.body.token) || req.query.token || req.headers['x-token'];

    if (token) {
        try {

            // 对比token
            const decoded = jwt.decode(token, sails.config.system.options.tokenSecret);
            if (decoded.exp <= Date.now()) {

                // token 过期 需要重新登陆，返回到登录试图

                return res.freeError('00002');
            }
            req.appid = decoded.iss;
            return next();
        } catch (err) {
            // token错误
            return res.freeError('00003');
        }
    } else {

        // token不存在时
        return res.freeError('00004');
    }
};