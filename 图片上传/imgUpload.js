// canvas 实现图片压缩
var reader = new FileReader(), img = new Image(),
    inputEle = document.getElementById('file-reader'),
    canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    file = null;

// ios 不支持此事件。。
// base64地址图片加载完毕后
img.onload = function() {
    // 原始图片大小
    var originWidth = this.width;
    var originHeight = this.height;
    // 要缩放的图片大小
    var maxWidth = 160,maxHeight = 90;
    // 目标尺寸
    var targetWidth = originWidth, targetHeight = originHeight;
    // 图片尺寸超过400x400的限制
    if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
    }
        
    // canvas对图片进行缩放
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    // 清除画布
    context.clearRect(0, 0, targetWidth, targetHeight);
    // 图片压缩
    context.drawImage(img, 0, 0, targetWidth, targetHeight);

    // console.log(canvas.toDataURL());
    document.getElementsByClassName('container')[0].appendChild(canvas);
    // 上传代码
    // canvas转为blob并上传
    canvas.toBlob(function (blob) {
        // 图片ajax上传
        // var xhr = new XMLHttpRequest();
        // 文件上传成功
        // xhr.onreadystatechange = function() {
        //     if (xhr.status == 200) {
        //         // xhr.responseText就是返回的数据
        //     }
        // };
        // 开始上传
        // xhr.open("POST", '', true);
        // xhr.send(blob);    

        console.log(blob);
    }, file.type || 'image/png');
} 

reader.onload = function(e) {
    console.log(e.target.result);
    img.src = e.target.result;
}

inputEle.addEventListener('change', function(e) {
    console.log(event.target.files[0].size);
    file = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
});

// 实现的基本流程 
//  input 接收上传文件   filereader转为base64  利用canvas做图片压缩 