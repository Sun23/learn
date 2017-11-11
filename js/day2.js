// foreach
var arr1 = [1, 2, 3, 6];
/**
 * ele: 当前元素
 * index: 当前下标
 * arr:数组本身
 * 没有返回值
 */
arr1.forEach(function(ele, index, arr) {
    if(ele >= 3) {
        console.log(ele);
    }
})

// 利用call来遍历dom节点
// [].forEach.call(dom节点,function(){});

// map
var temp1 = arr1.map(function(ele, index, arr) {
    return ele.toString();
})

console.log(temp1); // 返回新数组

// 过滤新数组 filter
var temp2 = arr1.filter(function(ele, index, arr) {
    return ele >= 4
})

console.log(temp2); // [6]

// every 判断每一个元素是否满足条件 返回true 否则false
var temp3 = arr1.every(function(ele, index, arr) {
    return ele > 4
})

console.log(temp3);

//some 有元素符合条件  返回true 否则 false
var temp4 = arr1.some(function(ele, index, arr) {
    return ele > 4
})

console.log(temp4);

// dict模式： 防止对象已有属性扰乱程序
var newObj = Object.create(null);
console.log('toString' in newObj); // false
var secondObj = {};
console.log('toString' in secondObj);

// 函数表达式
function a() {} // 优点：调试JavaScript，命名的函数会通过名称显示在栈追踪中，而不是匿名函数
// 匿名函数
// function() {}
// 函数字面值
var b = function() {}
var c = function d() { console.log(typeof d) } // function
c()
// d() //d is not defined

// 函数式编程
// reduce es5 新增方法 
// array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
var res = arr1.reduce(function(total, current) {
    return total += current;
})

console.log(res); // 12

// 函数参数转化为数组
function aFunc() {
    var params = [].slice.call(arguments); 
    // 或者 var params = Array.prototype.slice.call(arguments);
    return params.reduce(function(total, current){
        return total += current;
    })
}
/**
 * 说明：arguments 是类数组只有length属性 
 *      slice对数组进行浅拷贝
 *      call() 第一个参数是this 通常是调用对象自身 
 */
console.log(aFunc(1, 2, 3, 15)); // 21

