// 模块化

// 异步加载脚本
// 1.defer 延迟加载脚本 直到页面的其他内容都加再完了
// 2.ansyc 页面加载的同时 异步加载脚本（页面会被内嵌的脚本阻塞 只对外部脚本有效）

// 创建可以在浏览器、commonJS、requireJS、node环境使用：
(function(global) {
    'use strict'

    var methodList = {};
    methodList.m1 = function() {
        return 1;
    }
    methodList.m2 = function() {
        return 2;
    }

    // 判断所在环境 
    if(typeof module != 'undefined' && module.exports) {
        // commonJS 环境(node 环境)
        module.exports = methodList;
    } else if(typeof define === 'function' && define.amd) {
        // requireJS 环境
        define('methodList',[],function() {
            return methodList;
        })
    } else {
        // 浏览器环境
        global.methodList = methodList;
    }
})(this)


// AMD写法 异步模块规范
// 文件名: foo.js
define(["jquery", "underscore"], function($, _) {
    // 方法
    function a() {} // 私有方法，因为没有被返回(见下面)
    function b() {} // 公共方法，因为被返回了
    function c() {} // 公共方法，因为被返回了
    //    暴露公共方法
    return {
        b: b,
        c: c
    };
});

// CMD CommonJS
var $ = require('jquery');
var _ = require('underscore');
 
//    methods
function a(){};    //    私有方法，因为它没在module.exports中 (见下面)
function b(){};    //    公共方法，因为它在module.exports中定义了
function c(){};    //    公共方法，因为它在module.exports中定义了
 
//    暴露公共方法
module.exports = {
    b: b,
    c: c
};

// UMD    它兼容了AMD和CommonJS，同时还支持老式的“全局”变量规范
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery', 'underscore'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require('jquery'), require('underscore'));
    } else {
        // 浏览器全局变量(root 即 window)
        root.returnExports = factory(root.jQuery, root._);
    }
}(this, function ($, _) {
    //    方法
    function a(){};    //    私有方法，因为它没被返回 (见下面)
    function b(){};    //    公共方法，因为被返回了
    function c(){};    //    公共方法，因为被返回了
 
    //    暴露公共方法
    return {
        b: b,
        c: c
    }
}));



