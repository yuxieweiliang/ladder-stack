/**
 * @desc 所有借口均可视为 200 ，所有错误均已人类能看懂的文字描述进行返回
 * @param {*} data action产生的数据，理论上可以接受任何类型，实际上最终返回的时候都会转为数组
 * @param {string} code action 生产的错误代码，可以转为非NAN的其他数字,默认为0000，表示成功
 */
module.exports = function freeError(data, code = '0000') {
    /* global sails */
    const res = this.res;
    const util = require('util');
    let errorCode = sails.config.errorCode;

    if (!isNaN(data * 1) && util.isString(data)) {
        // 此时认为data 就是code,无需返回数据
        code = data;
        data = [];
    } else if (!util.isArray(data)) {
        data = [data];
    }

    // 返回一个 状态为200的json数据
    return res.ok({
        code: code,
        msg: errorCode[code],
        data: data
    });
};