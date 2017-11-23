// 创建非重复集合
var col1 = new Set();
col1.add('new');
col1.add('xixi');
console.log(col1.size); // 2

col1.add('new');
col1.add('new');
console.log(col1.size); // 2  ==> 前面的两个都被忽略

// 检验是否有特定的值
console.log(col1.has('new')); // true
console.log(col1.has('x')); // false

// 删除
col1.delete('new');
console.log(col1.size); // 1

// 遍历成员
col1.forEach(function(value) {
    console.log(value); // xixi
})

// es6 展开符
var arr1 = [...col1];
console.log(arr1); // ['xixi']

// 也可以
var col2 = new Set(['aa', 'bb', 'cc', 'dd']);
console.log(col2.size); // 4
console.log([...col2]); // ['aa', 'bb', 'cc', 'dd']

// new Set() 可以接收任何类型的参数 如 函数 对象。。。

// 删除所有成员
col2.clear();
console.log(col2.size); // 0

// new WeakSet() 只能存储对象 对象是弱引用  不能遍历


// new Map() 创建键值不全是字符串的键值对
var myMap = new Map();
myMap.set('key1', 'value1');
myMap.set(NaN, 'KEY IS NaN');
myMap.set(true, 'is window');
myMap.set(1, 'is number');

myMap.set('key1', 'value2'); // 相同的键会覆盖

console.log(myMap); 
/**
 * Map {
    'key1' => 'value2',
    NaN => 'KEY IS NaN',
    true => 'is window',
    1 => 'is number' }
 */

// 根据键获取value
console.log(myMap.get(NaN)); // 'KEY IS NaN'

console.log(myMap.size); // 获取对象长度

// es6之前我们可以这么创建对象（对象非常干净）
var oldObj = Object.create(null, { // 用null做为第一个参数是 确保对象不会继承propertype对象
    'prop1': {
        value: 1,
        writable: true,
        enumerable: true,
        configurable: true,
    },
    'prop2': {
        value: 2,
        writable: true,
        enumerable: true,
        configurable: true,
    }
})

// 设置第三个参数
oldObj.prop3 = 3;

// 这样
var obj = {}
obj.NaN = 'is NaN';

for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
        console.log(typeof key); // string  NaN会被转换成字符串
    }
}

// obj.5 = 's';
// obj.function name(params) {} 报错

// 但是对于 new Map() 函数 字符串 对象 数字 都是可以的 

// 对象是否包含该键
myMap.has('key1'); // true

console.log(myMap.keys(), myMap.values());
/**
 * MapIterator { 'key1', NaN, true, 1 } MapIterator { 'value2', 'KEY IS NaN', 'is window', 'is number' }
 */

// 遍历对象
for(var [key, value] of myMap.entries()) {
    console.log(key, value);
}

console.log(myMap.entries()); // 返回对象的迭代器
/**
 * MapIterator {
  [ 'key1', 'value2' ],
  [ NaN, 'KEY IS NaN' ],
  [ true, 'is window' ],
  [ 1, 'is number' ] }
 */

for(var key of myMap.keys()) {

}

for(var value of myMap.values()) {

}

// 迭代器
var mapIterator = myMap.keys();
console.log(mapIterator.next().value); // key1
console.log(mapIterator.next().value); // NaN
console.log(mapIterator.next().value); // true
console.log(mapIterator.next().value);  // 1
console.log(mapIterator.next().value); // undefined 没有了就是undefined

// 一些复杂的情况
var aa = {a:1,b:2};
var bb = [1, 2];
var cc = aa;

var otherMap = new Map();
otherMap.set(aa, 'first');
otherMap.set(bb, 'second');

console.log(otherMap.get([1, 2])); // undefined
console.log(otherMap.get(aa)); // first
console.log(otherMap.get(bb)); // second
console.log(otherMap.get(cc)); // first

// new WeakMap() 只接受对象键 对象键也是弱引用 不可遍历

// Symbol 创建唯一键
var uniqueId = Symbol();
var unObj = {};
unObj[uniqueId] = 'like this';
console.log(uniqueId); // Symbol()
console.log(unObj); // {}
console.log(unObj[uniqueId]); // like this
var uniqueId2 = Symbol();
var uniqueId3 = Symbol('one');

console.log(uniqueId === uniqueId2); // false

// 遍历出symbol
for( let prop of Object.getOwnPropertySymbols(unObj) ) {
    //prop就是Symbol的名字
    console.log( prop ); // Symbol()
};


var red = Symbol();
var green = Symbol();

function m1(light) {
    if(light == red) {
        console.log('aa');
        light = green;
    } else {
        console.log('bb');
        light = red;
    }
    return light;
}

var light = green;

light = m1(light); // red
light = m1(light); // green

// Symbol.for(val) 先全局中搜索val为参数的Symbol值 找到就返回找到的值 没找到久创建并返回以val名称的Symbol值
var symbol1 = Symbol.for('aa');
var symbol2 = Symbol.for('aa');
console.log(symbol1 === symbol2); // true

// Symbol.keyFor()  方法返回一个已登记的Symbol类型值的key。实质就是检测该Symbol是否已创建
var s1 = Symbol.for('aa');
console.log(Symbol.keyFor(s1)); // aa

var s2 = Symbol('ss');
console.log(Symbol.keyFor(s2)); // undefined

// 迭代器
function iterator(arr) {
    var nextIndex = 0;
    return {
        next: function() {
            return nextIndex < arr.length ? {value: arr[nextIndex ++], done: false} : {done: true};
        }
    }
}

var values = [
    {
        value: function() {
            console.log('value1');
        }
    },
    {
        value: function() {
            console.log('value2');
        }
    }
]

var valuesTask = iterator(values);
valuesTask.next().value.value(); // value1
valuesTask.next().value.value(); // value2

// 生成器函数
// 定义 function*关键字可以在表达式内部定义一个生成器函数。

function* taskRunner() {
    console.log('start');
    // yield 关键字是函数暂停 yield关键字后面的表达式的值返回给生成器的调用者 与return 相似
    // yield关键字实际返回一个IteratorResult对象，它有两个属性，value和done。value属性是对yield表达式求值的结果，
    // 而done是false，表示生成器函数尚未完全完成。
    yield function() {
        console.log('first');
    }
    yield function() {
        console.log('second');
    }
    console.log('finish');
}

let tasks = taskRunner();
tasks.next().value(); // 执行到第一个yield后面函数    ==>  start  ==> first
tasks.next().value(); // 向下执行 ==> second
tasks.next(); // 执行结尾 ==> finish  此时返回的是{value: undifined, done: true}


function* g1() {
    yield 2;
    yield 3;
    yield 4;
}
  
function* g2() {
    yield 1;
    // yield* 进入另一个生成器函数
    yield* g1();
    yield 5;
}
  
var iterator = g2();
  
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 4, done: false }
console.log(iterator.next()); // { value: 5, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// 委托其他可迭代对象
function* g3() {
    yield* [1, 2];
    yield* "34";
    yield* arguments;
}

var iterator = g3(5, 6);

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: "3", done: false }
console.log(iterator.next()); // { value: "4", done: false }
console.log(iterator.next()); // { value: 5, done: false }
console.log(iterator.next()); // { value: 6, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// yield* 是一个表达式，不是语句，所以它会有自己的值。
function* g4() {
    yield* [1, 2, 3];
    return "foo";
}

var result;

function* g5() {
    result = yield* g4();
}

var iterator = g5();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }, 
                              // 此时 g4() 返回了 { value: "foo", done: true }

console.log(result);          // "foo"