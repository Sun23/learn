// Object.defineProperty()
var data = {};
Object.defineProperty(data,'add',{
    value: 'addProperty', // 初始值
    writable: false, // 默认是false 控制值是否可以通过赋值来修改      
    configurable: true, // 默认是false 控制属性描述是否可以修改
    enumerable: true, // 默认false 是否可以枚举
    // get: function() {

    // }, // 默认undefined 属性的getter
    // set: function() {

    // } // 默认undefined 属性的setter
})

data.add = 'change'; // writable true 可以修改 false 不可修改
for(item in data) {
    console.log(item); // enumerable: false时不可枚举 true 可以枚举 
}

delete data.add; // configurable true 时候可以删除 false 不可删除 

console.log(data)

// 禁止对象拓展 Object.preventExtensions(obj) ==> 不允许添加新属性 但可以修改已有属性 或 修饰符；
// 检查对象是否有可拓展性 Object.isExtensions(obj) 

// 防止对象做任何和所有修改 Object.freeze(obj) ==> 不允许拓展对象 限制修改对象修饰符 也阻止对已有属性做任何修改

// Object.seal() ==> 阻止描述符做修改 也阻止添加属性 但可以对已有的属性进行修改

// 单体模式(其中一种)
var mySingleton = (function() {
    // 存储单体引用
    var instance;

    function init() {
        // 单体

        // 私有变量 和 方法
        function privateMethod() {
            console.log('i am private');
        }

        var privateVariable = 'i am private value';

        var privateRandom = Math.random();

        return {
            publicMethod: function() {
                console.log('i am public');
            },
            publicValue: 'i am public value',
            getRandom: function() {
                return privateRandom;
            }
        }

    }

    return {
        getInstance: function() {
            if(!instance) {
                instance = init();
            }

            return instance;
        }
    }
})();

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();

console.log(singleA.getRandom() === singleB.getRandom()); // true

// exp:立即调用的函数表达式返回一个实例

// Property.bind() this解析
window.onload = function() {
    window.name = 'global';

    var newObj = {
        name: 'objname',
        sayGreeting: function() {
            console.log(this.name); // objname
            nextGreeting = function() {
                console.log(this.name); // global 原因在于嵌套函数与包围的对象的内部函数分离了成为无作用域函数 会自动变成窗口函数
            }.bind(this);

            nextGreeting()
        }
    }

    newObj.sayGreeting();
}