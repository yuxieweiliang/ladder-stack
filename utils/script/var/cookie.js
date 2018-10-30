'use strict';
import { readonly, nonconfigurable } from 'core-decorators';
/**
 * cookie 相关操作
 *        增删改查
 * @constructor Cookies
 */
export class Cookies {
    constructor() {}

    /**
     * 获取一条cookie
     * @param {string} key 名称
     */
    @readonly
    @nonconfigurable
    lookover(key) {
        if (typeof key !== 'string') return '';
        const cookie = document.cookie;
        if (cookie.length > 0) {
            let start = cookie.indexOf(key + '=');
            if (start > -1) {
                start = start + key.length + 1;
                let end = cookie.indexOf(';', start);
                if (end < 0) {
                    end = cookie.length;
                }
                return decodeURIComponent(cookie.substring(start, end));
            }
        }
        return '';
    }

    /**
     * 新增一条cookie
     * @param {string} key 名称
     * @param {string} value 值
     * @param {number} timer 过期时间
     */
    @readonly
    @nonconfigurable
    increase(key, value, timer = 1) {
        if (typeof key === 'number') return;
        if (typeof value === 'string') {
            let expires = '';
            let date = new Date();
            date.setTime(date.getTime() + (timer * 24 * 60 * 60 * 1000));
            expires = ';expires=' + date.toGMTString();
            document.cookie = [key, '=', encodeURIComponent(value), expires].join('');
        }
    }

    /**
     * 删除指定名称的cookie
     * @param {string} key 
     */
    @readonly
    @nonconfigurable
    delete(key) {
        if (typeof key !== 'undefined' && this.lookover(key) !== '') {
            this.increase(key, '', -1);
        }
    }

    /**
     * 清空本地所有cookie
     */
    clear() {
        let regExp = new RegExp('/[^ =;]+(?=\=)/g');
        var keys = document.cookie.match(regExp);
        if (keys) {
            for (let key of keys) {
                this.delete(key);
            }
        }
    }
}