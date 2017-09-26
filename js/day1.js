// 数组内搜索(es6的方法)
var array = ['tom', 'sam', 'baby', 'and', 1, 500, 300];
var result = array.findIndex(function(ele, index, self) {
    return (ele > 150);
});
// console.log(result); // 5

// 运用apply 和 concat 讲一个二维数组扁平化
var secondArray = [];
secondArray[0] = ['a', 'b'];
secondArray[1] = ['c', 'd'];
secondArray[2] = ['e', 'f', 'g'];
secondArray[3] = ['h', 'i'];

var newArray = secondArray.concat.apply([], secondArray);
console.log(newArray); // [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ]

// slice和splice
// slice 可以用作浅复制 （不改变原数组）
var oArray = [];
oArray[0] = ['a', 'b'];
oArray[1] = ['c', 'd'];
oArray[2] = ['e', 'f'];
var nArray = oArray.slice(1,2);
// 如果浅复制内容是 引用类型 则修改会反应在原来的数组中体现出来 (如果是数值类型 则不会反应在就数组中)
nArray[0][0] = 'change';
console.log(nArray); // [ [ 'change', 'd' ] ]
console.log(oArray); // [ [ 'a', 'b' ], [ 'change', 'd' ], [ 'e', 'f' ] ]
