'use strict';
import { readonly, nonconfigurable, time } from 'core-decorators';
/**
 * 管理类核心
 * @constructor WisdomManager
 */
export const wisdom = (() => {

    let _version = '1.0.0', // 版本

        _author = '西安康恩电子', // 作者

        _description = '核心管理库', // 描述

        _copyright = '', // 声明

        _events = {}, // 事件队列

        _data = {}, // 数据集合,

        _copyProperty = (Target, Source) => {
            // 属性复制
            for (let key of Reflect.ownKeys(Source)) {
                if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
                    let descriptor = Object.getOwnPropertyDescriptor(Source, key);
                    Object.defineProperty(Target, key, descriptor);
                }
            }
        },

        _dom = new Proxy({}, {
            get(target, property) {
                return function(attrs = {}, ...children) {
                    // 创建dom结构
                    const el = document.createElement(property);
                    for (let prop of Object.keys(attrs)) {
                        el.setAttribute(prop, attrs[prop]);
                    }
                    for (let child of children) {
                        if (typeof child === 'string') {
                            child = document.createTextNode(child);
                        }
                        el.appendChild(child);
                    }
                    return el;
                };
            }
        });

    @time
    class WisdomManager {

        constructor(...args) {
            // 自引用
            this.wisdomManager = this;

            // 自引用构造函数
            this._construct = WisdomManager;

            // 生成各种DOM节点的通用函数makeDOM
            this.makeDOM = _dom;

            _events[this] = {};

            _data[this] = {};

            this.call(this.initialize, ...args);

            return this;
        }

        /**
         * 返回函数名称
         */
        @readonly
        toString() {
            return this.constructor.name;
        }

        /**
         * 调用这个类中的某个函数与这个绑定
         * @param {function} factory 需要调用的函数的名称
         * @param {...} args 传递给要调用的factory的参数
         */
        @readonly
        call(factory, ...args) {
            factory.apply(this, args);
            return this;
        }

        /**
         * 初始化类方法，每次被初始化
         * @desc 在子类扩展时，不要使用构造函数
         */
        initialize() {}

        /**
         * 从数据管理器获取数据
         * @param {string} key
         */
        @readonly
        getter(key) {
            let target = _data[this];
            if (key.indexOf('.') === -1) return target[key];

            let nodes = key.split('.').filter(item => item && item !== '');
            if (nodes.length === 0) return;

            for (let node of nodes) {
                if (typeof target !== 'object' || !target[node]) return;
                target = target[node];
            }

            return target;
        }

        /**
         * 将数据保存到数据管理器
         * @param {string} key
         * @param {*} value  
         * @param {boolean} notify 是否触发数据更改事件
         */
        @readonly
        setter(key, value, notify = true) {
            if (!_data[this]) _data[this] = {};
            let target = _data[this];
            if (key.indexOf('.') === -1) {
                target[key] = value;
                if (notify) {
                    this.trigger('change:' + key, value);
                }
                return this;
            }

            let nodes = key.split('.').filter(item => item && item !== '');
            if (nodes.length === 0) return;

            let lastKey = nodes.pop();
            for (let node of nodes) {
                if (typeof target !== 'object') return;
                if (!target[node]) {
                    target[node] = {};
                }
                target = target[node];
            }
            target[lastKey] = value;

            if (notify) {
                nodes.push(lastKey);
                let event = nodes.shift();
                this.trigger('change:' + event, value);
                while (nodes.length > 0) {
                    event += '.' + nodes.shift();
                    this.trigger('change:' + event, value);
                }
            }

            return this;
        }

        /**
         * 在实例化对象上绑定事件
         * @param {string} evts  事件名称，多个时用' '分割
         * @param {function} handler 当事件触发时调用back
         * @param {number} order 数字顺序:调用函数的顺序。函数按顺序列出。
         */
        @readonly
        bind(evts, handler, order = 10) {
            if (!_events[this]) _events[this] = {};
            evts = evts.split(' ');
            let target = _events[this];

            for (let evt of evts) {
                if (!target[evt]) target[evt] = {};
                let node = target[evt];

                if (!node[order]) node[order] = [];
                let hdles = node[order];

                if (hdles.indexOf(handler) === -1) hdles.push(handler);
            }

            return this;
        }


        /**
         * 移除事件处理程序
         * @param {string} event 事件名称,只有一个事件支持
         * @param {function} handler 这个函数想要删除，注意:如果你把它传递了两次，所有的都将被删除。
         *                           如果您不通过处理程序，则该事件的所有处理程序将被删除。
         */
        @readonly
        unbind(event, handler) {
            if (!handler) {
                _events[this][event] = {};
                return;
            }

            let node = _events[this][event];
            if (!node) return;

            let orders = Object.keys(node);

            if (!orders || orders.length === 0) return;
            if (orders.length > 1) orders = orders.sort((a, b) => a - b);

            for (let order of orders) {
                let hdles = node[order];
                let index = hdles.indexOf(handler);
                if (index > -1) hdles.splice(index, 1);
                if (hdles.length === 0) delete node[order];
            }

            return this;
        }

        /**
         * 触发事件处理程序
         * @param {string} event  事件触发的名称
         * @param {} args: 传递给处理函数的参数
         */
        @readonly
        emit(event, ...args) {
            let node = _events[this][event];
            if (!node) return;

            let orders = Object.keys(node);

            if (!orders || orders.length === 0) return;
            if (orders.length > 1) orders = orders.sort((a, b) => a - b);

            let handlers = [];

            orders.forEach(order => {
                let hdles = node[order];
                handlers = [...handlers, ...hdles];
            });

            handlers.forEach(handler => {
                if (typeof handler === 'function') {
                    // this.call(handler, ...args) // 会绑定this
                    handler(...args); // 不会绑定this，其实可以在on的时候用bind去绑定
                }
            });

            return this;
        }

        /**
         * 链式调用
         * @param {*} value 
         */
        @readonly
        pipe(value) {
            let funcStack = [];
            let oproxy = new Proxy({}, {
                get(pipeObject, fnName) {
                    if (fnName === 'get') {
                        return funcStack.reduce(function(val, fn) {
                            return fn(val);
                        }, value);
                    }
                    funcStack.push(window[fnName]);
                    return oproxy;
                }
            });

            return oproxy;
        }

        /**
         * 创建一个可以用负索引调用的数组
         * @param {...} elements 数组元素
         */
        @readonly
        array(...elements) {
            let handler = {
                get(target, propKey, receiver) {
                    let index = Number(propKey);
                    if (index < 0) {
                        propKey = String(target.length + index);
                    }
                    return Reflect.get(target, propKey, receiver);
                }
            };

            let target = [];
            target.push(...elements);
            return new Proxy(target, handler);
        }

        /**
         * 将这个类与其他类混合，该类属性将永远不会被覆盖，最终的输出类包含某些属性以及该类的所有属性
         * @param {...} classes 类被传递到混合，以前的类不会被后面的类覆盖。
         */
        @readonly
        static mixin(...classes) {

            class TempClass {}

            classes.reverse();
            classes.push(this);
            for (let Mixin of classes) {
                _copyProperty(TempClass, Mixin);
                _copyProperty(TempClass.prototype, Mixin.prototype);
            }

            return TempClass;
        }


        /**
         * 将其他类混合到这个类中，属性可能会被经过的类覆盖，后面的类将覆盖以前的类
         * @param {...}  classes 类被传递到混合，以前的类会被后面的类覆盖。
         */
        @readonly
        static mixto(...classes) {
            class TempClass {}
            classes.unshift(this);
            for (let Mixin of classes) {
                _copyProperty(TempClass, Mixin);
                _copyProperty(TempClass.prototype, Mixin.prototype);
            }

            return TempClass;
        }

        @readonly
        @nonconfigurable
        static get version() {
            return _version;
        }

        @readonly
        @nonconfigurable
        static get author() {
            return _author;
        }

        @readonly
        @nonconfigurable
        static get description() {
            return _description;
        }

        @readonly
        @nonconfigurable
        static get _copyright() {
            return _copyright;
        }
        static set copyright(copyright) {
            _copyright = copyright;
        }
    }

    // 拦截规则
    let BlockingRule = {
        get(target, key) {
            invariant(key, 'get');
            return target[key];
        },
        set(target, key, value) {
            invariant(key, 'set');
            target[key] = value;
            return true;
        },
        has(target, key) {
            if (key[0] === '_') {
                return false;
            }
            return key in target;
        },
        deleteProperty(target, key) {
            invariant(key, 'delete');
            return true;
        },
        getOwnPropertyDescriptor(target, key) {
            if (key[0] === '_') {
                return;
            }
            return Object.getOwnPropertyDescriptor(target, key);
        },
        getPrototypeOf() {
            return null;
        },
        isExtensible: function() {
            return false;
        },
        ownKeys(target) {
            return Reflect.ownKeys(target).filter(key => key[0] !== '_');
        },
        preventExtensions: function(target) {
            Object.preventExtensions(target);
            return true;
        },
        setPrototypeOf(target, proto) {
            throw new Error(`禁止修改${target}的${proto}`);
        }
    };

    // 禁止读写内部属性
    function invariant(key, action) {
        if (key[0] === '_') {
            throw new Error(`禁止对内部属性 [[${key}]] 进行 "${action}" 操作！`);
        }
    }

    // 过滤拦截
    let ProxyWisdomManager = new Proxy(WisdomManager, BlockingRule);

    return new ProxyWisdomManager();
})();