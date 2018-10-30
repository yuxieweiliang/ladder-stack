/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.connections.html
 */

module.exports.connections = {

    /***************************************************************************
     *                                                                          *
     * Local disk storage for DEVELOPMENT ONLY                                  *
     *                                                                          *
     * Installed by default.                                                    *
     *                                                                          *
     ***************************************************************************/
    localDiskDb: {
        adapter: 'sails-disk'
    },

    /**************************************************************************
     * Redis 连接                                                               
     * 
     * 
     ***************************************************************************/
    redisServer: {

        adapter: 'sails-redis',

        // 端口
        port: 7879,

        // 主机
        host: '10.0.0.103',

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
    },

    /***************************************************************************
     *                                                                          *
     * MySQL is the world's most popular relational database.                   *
     * http://en.wikipedia.org/wiki/MySQL                                       *
     *                                                                          *
     * Run: npm install sails-mysql                                             *
     *                                                                          *
     ***************************************************************************/
    mysql: {
        module: 'sails-mysql',
        host: '10.0.0.103',
        port: 7384,
        user: 'root',
        password: 'as123456',
        database: 'test',
        charset: 'utf8',
        collation: 'utf8_swedish_ci'
    }

    /***************************************************************************
     *                                                                          *
     * MongoDB is the leading NoSQL database.                                   *
     * http://en.wikipedia.org/wiki/MongoDB                                     *
     *                                                                          *
     * Run: npm install sails-mongo                                             *
     *                                                                          *
     ***************************************************************************/
    // someMongodbServer: {
    //   adapter: 'sails-mongo',
    //   host: 'localhost',
    //   port: 27017,
    //   user: 'username', //optional
    //   password: 'password', //optional
    //   database: 'your_mongo_db_name_here' //optional
    // },

    /***************************************************************************
     *                                                                          *
     * PostgreSQL is another officially supported relational database.          *
     * http://en.wikipedia.org/wiki/PostgreSQL                                  *
     *                                                                          *
     * Run: npm install sails-postgresql                                        *
     *                                                                          *
     *                                                                          *
     ***************************************************************************/
    // somePostgresqlServer: {
    //   adapter: 'sails-postgresql',
    //   host: 'YOUR_POSTGRES_SERVER_HOSTNAME_OR_IP_ADDRESS',
    //   user: 'YOUR_POSTGRES_USER', // optional
    //   password: 'YOUR_POSTGRES_PASSWORD', // optional
    //   database: 'YOUR_POSTGRES_DB' //optional
    // }


    /***************************************************************************
     *                                                                          *
     * More adapters: https://github.com/balderdashy/sails                      *
     *                                                                          *
     ***************************************************************************/

};