'use strict';
import { readonly, nonconfigurable } from 'core-decorators';
/* eslint no-debugger:off */

/**
 * 页面测试
 */
@readonly
@nonconfigurable
export class Debug {

    constructor() {}

    /**
     * 打一个断点
     */
    debugger() {
        debugger;
    }

    /**
     * json字符串美化
     */
    beautifulJsonString(...args) {
        if (!args) return;
        let div = document.createElement('div');
        div.style.cssText = 'overflow:auto;position:fixed;bottom:10px;left:10px;height:auto;width:auto;max-height:100%;max-width:50%;padding:10px;color:#f60;background-color:#fff;white-space: pre;border: 1px solid #aaa;border-radius: 4px;box-shadow: inset 0 0 50px #aaa;font-size:20px;';
        let divHtml = '';
        let n = 1;
        for (let json of args) {
            divHtml += `<br/> Data-${n}=`;
            divHtml += JSON.stringify(json, null, 6);
            divHtml += '<br/>';
            n++;
        }
        div.innerHTML = divHtml;
        document.body.style.paddingBottom = '320px';
        document.body.appendChild(div);
    }

    /**
     * 查看当前url包含的信息
     */
    viewCurrentUrlContainedInfo(url) {
        let a = document.createElement('a');
        if (typeof url !== 'string') url = location.href;
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function() {
                let ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length,
                    i = 0,
                    s;
                for (; i < len; i++) {
                    if (!seg[i]) { continue; }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
    }

    /**
     * 直接编辑页面资源
     */
    editPageResourcesDirectly() {
        /* eslint no-console:off*/
        console.log(document.body.contentEditable = 'true');
    }

    /**
     * 页面直接编辑样式
     */
    pageDirectEditStyle() {
        let style = document.createElement('style');
        style.style.cssText = 'display: block;position: fixed;width: 100%;height: 240px;border-top: 2px solid rgb(170, 170, 170);background-color: rgb(255, 255, 255);overflow-x: hidden;overflow-y: auto;z-index: 9999;bottom: 0;left: 0;';
        style.setAttribute('contentEditable', true);
        document.body.style.paddingBottom = '300px';
        document.body.appendChild(style);
    }

    /**
     * 让所有元素显示边框
     */
    allEmementsDisplayBorders() {
        /* global $$ */
        [].forEach.call($$('*'), function(a) {
            a.style.outline = '1px solid #' + (~~(Math.random() * (1 << 24))).toString(16);
        });
    }

    /**
     * 打开一个可编辑的窗口
     */
    openNewWindowEditable() {
        return open('data:text/html, <html contenteditable>');
    }

}