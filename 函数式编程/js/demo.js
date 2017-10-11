"use strict";
// 函数柯里化
var add = function(x) {
    return function(y) {
        return x + y;
    };
};

var add10 = add(10);
// ==> add10 = function(y) { return 10 + y; } (形成了一个闭包)

var result = add10(10); // 20

// 组合  
var compose = function(f, g) {
    return function(x) {
        return f(g(x));
    };
};

var toUpperCase = function(x) { return x.toUpperCase(); };
var exclaim = function(x) { return x + '!'; };
var shout = compose(exclaim, toUpperCase);

var result = shout("send in the clowns"); // ==> "SEND IN THE CLOWNS!"
console.log(result);

/**
 * reduce 方法中的回调函数 最多接受四个参数：
 * function callbackfn(previousValue, currentValue, currentIndex, array1)
 * previousValue: 通过上一次调用回调函数获得的值。如果向 reduce 方法提供 initialValue，则在首次调用函数时，previousValue 为 initialValue。
 * currentValue: 当前数组元素的值
 * currentIndex: 当前数组元素的索引
 * array1: 包含该元素的数组
 */

//  reduce 方法
// var testReduce = function(pre, cur) {
//     return pre+ "::" +cur;
// }
// var testResult = ['abc','def',1,2].reduce(testReduce);
// console.log(testResult); // ==> abc::def::1::2
