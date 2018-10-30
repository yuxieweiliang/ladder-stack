
// 参数转换为数组格式
module.exports = function (args, index = 0) {
    if (!args) return;
    return Array.prototype.slice.call(args, index);
};