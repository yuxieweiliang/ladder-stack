'use strict';
import { readonly, nonconfigurable } from 'core-decorators';

export class Encrypt {

    constructor() {}

    /**
     * 将字符串转换为 base64
     * @param str
     * @returns {string}
     */
    @readonly
    @nonconfigurable
    enB64(str) {
        return btoa(encodeURIComponent(str)
            .replace(/%([0-9A-F]{2})/g, (match, p1) => {
                return String.fromCharCode('0x' + p1);
            })
        );
    }

    /**
     * 将base64转为中文
     * @param str
     * @returns {string}
     */
    @readonly
    @nonconfigurable
    deB64(str) {
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
}