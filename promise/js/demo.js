'use strict';

// function test(resolve, reject) {
//     var num = Math.random() * 2;
//     console.log('num: ' + num);
//     setTimeout(function() {
//         if(num > 1) {
//             console.log('call resolve()...');
//             resolve('200 OK');
//         } else {
//             console.log('call reject()...');
//             reject('timeout in ' + num + ' seconds.');
//         }
//     }, num * 1000)
// }

// var promise = new Promise(test);

// var p2 = promise.then(function (result) {
//     console.log('成功：' + result);
// })

// var p3 = promise.catch(function (reason) {
//     console.log('失败：' + reason);
// })




var logging = document.getElementById('test-promise2-log');
while (logging.children.length > 1) {
    logging.removeChild(logging.children[logging.children.length - 1]);
}

function log(s) {
    var p = document.createElement('p');
    p.innerHTML = s;
    logging.appendChild(p);
}

// 0.5秒后返回input*input的计算结果:
function multiply(input) {
    return new Promise(function (resolve, reject) {
        log('calculating ' + input + ' x ' + input + '...');
        setTimeout(resolve, 500, input * input);
    });
}

// 0.5秒后返回input+input的计算结果:
function add(input) {
    return new Promise(function (resolve, reject) {
        log('calculating ' + input + ' + ' + input + '...');
        setTimeout(resolve, 500, input + input);
    });
}

var p = new Promise(function (resolve, reject) {
    log('start new Promise...');
    resolve(123);
});

p.then(multiply)
 .then(add)
 .then(multiply)
 .then(add)
 .then(function (result) {
    log('Got value: ' + result);
});