// 局部函数工厂
function partial(fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
        return fn.apply(this, args.concat([].slice.call(arguments)));
    };
}
var add = function(a, b) {
    return a + b;
};
var add10 = partial(add, 114);
console.log(add10(10)); // 124

// bind bind() 函数会创建一个新函数（称为绑定函数），新函数与被调函数（绑定函数的目标函数）
// 具有相同的函数体（在 ECMAScript 5 规范中内置的call属性）。当新函数被调用时 this 值绑定到 bind() 的第一个参数，
// 该参数不能被重写。绑定函数被调用时，bind() 也接受预设的参数提供给原函数。一个绑定函数也能使用new操作符创建对象：
// 这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

// fun.bind(thisArg[, arg1[, arg2[, ...]]])

/**
 * 参数

    thisArg
    当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用new 操作符调用绑定函数时，该参数无效。
    arg1, arg2, ...
    当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。
    返回值

    返回由指定的this值和初始化参数改造的原函数拷贝
 */

//  使用bind()来局部提供参数
function makeStr(ldelim, rdelim, str) {
    return ldelim + str + rdelim;
}

var newBindFunc = makeStr.bind(undefined, "###", "!");
console.log(newBindFunc);
var temp = newBindFunc("ff6700");

console.log(temp);

// bind 快捷调用 类数组
// Array.prototype.slice.call(arguments)
// 使用bind :
/**
 *  var unboundSlice = Array.prototype.slice;
    var slice = Function.prototype.apply.bind(unboundSlice);
    slice(arguments);
*/

// 缓存计算提升性能
var fibonacci = (function() {
    var meno = [0, 1];
    var fib = function(n) {
        var result = meno[n];
        if (typeof result != "number") {
            result = fib(n - 1) + fib(n - 2);
            meno[n] = result;
        }
        return result;
    };
    return fib;
})();

console.log(fibonacci(10));

// 保持对象成员私有性（建立私有数据不要使用this关键字）
function Tune(song,artile,kk) {
    // 私有属性命名规则 前面加 _
    var _title = song; // ==> 私有属性
    this.kk = kk; // ==> 公有属性
    this.concat = function() { // ==> 特权方法
        return _title + " " + artile;
    }
}

var happySongs = [];
happySongs[0] = new Tune("new song", "xixi","public");
console.log(happySongs[0]._title); // undefined
console.log(happySongs[0].kk); // public

console.log(happySongs[0].concat()); // new song xixi

// 通过Object.create() 实现继承
function orginObj() {
    this.value1 = 'a';
    this.value2 = 'b';
}

orginObj.prototype.returnValue = function() {
    return this.value1;
}

orginObj.returnValue2 = function() {
    return this.value2;
}

function newObj() {
    this.value3 = 'c';
    orginObj.call(this); // 注意 否则value1和value2为undefined
}

newObj.prototype = Object.create(orginObj.prototype);
newObj.prototype.constructor = newObj;

newObj.prototype.getValue = function() {
    return this.value1 + " " + this.value2 + " " + this.value3;
}

var obj = new newObj();

console.log(obj instanceof newObj); // true
console.log(obj instanceof orginObj); // true
console.log(obj.getValue()); // a b c

// Object.create('新创建对象的原型对象','该对象定义的一组属性')
//第二个参数等同于Object.defineProperties()的第二个参数
// Object.defineProperties()

var obj = {};
Object.defineProperties(obj, {
    newDataProperty: {
        value: 101,
        writable: true,
        enumerable: true,
        configurable: true
    }
})

console.log(obj);

