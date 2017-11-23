'use strict'

// document.defaultView 在浏览器中，该属性返回当前 document 对象所关联的 window 对象，如果没有，会返回 null。 ie9以下不支持该属性

// 把一个库转换成jQuery的插件 （不加入jquery链）
$.fn.setColor = function(color) {
    this.css('color', color);
}

// 加入jquery链
$.fn.m1 = function() {
    return this.each(function() {
        //...
    })
}

// 如果该插件需要使用$ 那么需要
;(function($) {
    $.fn.newMethod = function() {
        return this.each(function() {
            //...
        })
    }
})(jQuery)

// this.each() 作用是 可以让该方法在选择器返回的任何内容上工作 无论是数组还是单独的一项

// 自调用函数前面的分号作用是：确保任何一个插件忘记分号来终止函数或方法的话 该函数也不会失效

// jquery 的命名空间替换
var $j = jQuery.noConflict();

function ajax() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    } else {
        // IE6, IE5 浏览器执行代码 (可以不考虑)
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = url;
    xmlhttp.open(method, url, true); // 请求的方法 请求接口地址  是否为异步（true 异步 false 同步）
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = Json.parse(xmlhttp.responseText);
            success();
        } else {
            var data = Json.parse(xmlhttp.responseText);
            fail();
        }
    }
    xmlhttp.send();
}
