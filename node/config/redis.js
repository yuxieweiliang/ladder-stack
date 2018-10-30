/**
 * redis配置文件
 */

module.exports.redis = {

    // 端口
    port: 7879,

    // 主机
    host: '127.0.0.1',

    // 密码
    password: 'as123456',

    // 选择分区
    database: 1,

    options: {
        parser: 'hiredis',
        return_buffers: false,
        detect_buffers: false,
        socket_nodelay: true,
        no_ready_check: false,
        enable_offline_queue: true
    }

};