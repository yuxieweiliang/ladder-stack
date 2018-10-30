'use strict';
import { readonly, nonconfigurable } from 'core-decorators';
/**
 * 控制台输出
 * @constructor Logs
 */
/* eslint no-console:off */
@readonly
@nonconfigurable
export class Logs {

    constructor() {
        this._log = console.log;
        this._errorStyle = 'font-size:14px;color:#f50c0c;border-bottom:1px solid #f50c0c;padding:5px;';
        this._warnStyle = 'font-size:14px;color:#b9a23a;border-bottom:1px solid #b9a23a;padding:5px;';
        this._infoStyle = 'font-size:14px;color:#3EAF0E;border-bottom:1px solid #3EAF0E;padding:5px;';
    }

    /**
     * 错误
     */
    @readonly
    @nonconfigurable
    error(...args) {
        this._log.call(console, '%c[Wisdom-error]\n' + args.join(' '), this._infoStyle);
    }

    /**
     * 警告
     * @param {*} args 
     */
    @readonly
    @nonconfigurable
    warn(...args) {
        this._log.call(console, '%c[Wisdom-warn]\n' + args.join(' '), this._infoStyle);
    }

    /**
     * 信息
     * @param {*} args 
     */
    @readonly
    @nonconfigurable
    info(...args) {
        this._log.call(console, '%c[Wisdom-info]\n' + args.join(' '), this._infoStyle);
    }

    /**
     * 信息
     * @param {*} args 
     */
    @readonly
    @nonconfigurable
    table(...args) {
        console.table('Data Table', args.join(' '));
    }
}