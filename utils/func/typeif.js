// 类型检测
module.exports = function typeIf(arg) {
    return Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();
};