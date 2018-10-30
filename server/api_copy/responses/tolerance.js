/**
 * 根据既定的code代码，返回经过容错处理的数据给到前端
 * 
 * 所有经服务的引起的错误，均视为无错，返回状态200
 */

module.exports = function tolerance(code, data) {
    const typeIf = require('../../tool/typeif.js');

    // 参数检测
    const codeType = typeIf(code);
    if (codeType === 'array') {
        data = code;
        // 默认为处理成功
        code = '0000';
    } else {

    }

    /* global sails */
    // 获取到errorCode
    const errorCode = sails.config.errorCode;

    // 获取当前请求环境中 req 、res
    const req = this.req;
    const res = this.res;

};