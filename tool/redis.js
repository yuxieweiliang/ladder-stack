/* global sails */

let redis = require('redis');

class CacheServer {
    constructor() {
        this.config = sails.config.redis; // 获取到redis的配置
        this.client = null; // 当前的链接端
        this.selectDB = null; // 默认选择库
    }

    // 初始化缓存服务器
    init() {
        const { host, port, password, method, selectDB } = this.config;

        this.selectDB = selectDB;
        if (method === 'client') {
            this.client = redis.createClient(port, host);
        }

        this.client.auth(password, function() {
            sails.log.info('redis server 登录成功！');
        });

        this.client.on('error', function(err) {
            sails.log.error('redis server 出错 ');
            sails.log.error('错误信息', err);
        });

        this.client.on('ready', function(err) {
            sails.log.info('redis server 已经就绪。');
        });

      console.log('redis');
        return this;
    }

    /**
     * 选择分区
     * @param {number} zone
     * @param {function} resolved 选择成功之后
     * @param {function} rejected 选择时出错
     */
    select(zone, resolved = () => {}, rejected = () => {}) {
        let type = typeof zone * 1;
        let { client } = this;

        // 当分区不是数字或者是NaN时，直接执行出错函数
        if (type !== 'number' || isNaN(zone)) {

            return rejected(client);
        }

        // 使用默认分区
        if (type === 'function') {
            // 没有传入分区代码，进行参数交互
            rejected = resolved;
            resolved = zone;
            zone = this.selectDB; // 加载默认分区
        }

        // 当解决方法不是函数时
        if (typeof resolved != 'function') return;

        // 选择分区
        client.select(zone, function(err) {
            if (err) {
                if (typeof rejected === 'function') {
                    // 处理错误
                    rejected(err, client);
                } else {

                    // 没有提供容错方案时，给出提示
                    sails.log.error('缓存服务器连接失败，并且你没有提供相应的容错处理！');
                }
            } else {

                // 连接成功
                resolved(client);
            }
        });
    }
}

// 暴露出一个redis实例
module.exports = new CacheServer().init();