'use strict';
import { readonly, nonconfigurable } from 'core-decorators';

export class Safe {

    constructor() {

    }

    /**
     * 禁止页面被别人使用iframe嵌套
     */
    @readonly
    @nonconfigurable
    forbidFrameNestOurPages() {
        if (window.location != window.parent.location) window.parent.location = window.location;
    }


}