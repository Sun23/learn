// 变量声明提升
console.log(a) //  
a() // 
var a = 3; 
function a() {
    console.log(10)
}

console.log(a) // 
a = 6 
a()  // 



// 等价于
// var a;
// function a() {
//     console.log(10);
// }
// console.log(a); 
// a();
// a = 3;
// console.log(a);
// a = 6;
// a();
