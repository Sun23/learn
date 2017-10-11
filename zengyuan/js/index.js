var myApp = new Framework7({
    modalButtonCancel: '取消',
    modalButtonOk: '确定',
});
var $$ = Dom7;

// 获取必要参数
function getParam() {
    var param_obj = {};
    var param_hash = location.href;
    var param = param_hash.split("#")[1];
    var param_arr = param.split("&");
    var len = param_arr.length;
    var j;
    for (j = 0; j < len;j ++) {
        var temp = param_arr[j].split('=');
        param_obj[temp[0]] = temp[1];
        if(j > 0) {
            param_obj[temp[0]] = decodeURI(temp[1]);
        }
    }
    return param_obj;
}

//url 参数对象
var urlParam = getParam();
// 销售人员自动带出到推荐人（不可修改）
if(urlParam.name != '' && typeof urlParam.name != 'undefined') {
    $$('#referrer-name').val(urlParam.name.replace(/•/g,'·'));
    $$('#referrer-name').prop('disabled', true);
}

if(urlParam.tel != '' && urlParam.tel != 'undefined') {
    $$('#referrer-tel').val(urlParam.tel.substring(0,3) + " " + urlParam.tel.substring(3,7) + " " + urlParam.tel.substring(7));
    $$('#referrer-tel').prop('disabled', true)
}


if(urlParam.platform == 'android' || urlParam.platform == 'ios') {
    $$('.webview-navbar-inner').hide();
    $$('.index-navbar-inner').css('display','-webkit-flex').css('display','flex');
    $$('.ocr-btn').css('display','-webkit-flex').css('display','flex');
    $$('.wx-btn-box').hide();
    $$('.index-btn-box').css('display','-webkit-flex').css('display','flex');
    if(urlParam.platform == 'ios') {
        $$('.index-navbar-inner').css('background-color', '').css('color', '');
    }
}

$$('.upload-img').on('change', function() {
    if(this.files[0].size <= 0 ) {
        return false;
    }
    if($$(this).val() == null || $$(this).val() == '' || typeof $$(this).val() == 'undefined') {
        return;
    }
    var this_id = $$(this).attr('id');
    $$('.mask').removeClass('hidden');

    canvasResize(this.files[0], {
        crop: false, // 是否剪裁
        quality: 0.1, // 图片质量
        rotate: 0, // 旋转角度 
        callback: function(baseStr) {
            var canvas = document.getElementById(this_id + '-box');
            var ctx = canvas.getContext('2d');
            var img = new Image();
            img.src = baseStr;
            temp();
            // 替代onload事件（ios不支持onload）
            function temp() {
                if(img.complete == true) {
                    var nw = img.naturalWidth, nh = img.naturalHeight;
                    ctx.drawImage(img, 0, 0, nw, nh, 0, 0, img.width, img.height);
                    // 引入MegaPixImage.js 解决canvas绘制图片在ios无法正常显示 
                    var mpImg = new MegaPixImage(img);
                    mpImg.render(canvas, { width: img.width, height: img.height });
                    $$('.mask').addClass('hidden');
                } else {
                    setTimeout(temp, 100);
                }    
            }
        }
    })
});

// 提交信息
$$('.exam-btn').on('click', function() {
    toExam()
})
$$("#submit-btn").on("click", function() {
    toExam()
});

function toExam() {
    var id_card = $$("#id-card").val().trim().replace(/\s+/g,'');
    var user_name = $$("#user-name").val().trim().replace(/•/g,'·');
    var user_tel = $$("#user-tel").val().trim().replace(/\s+/g,'');
    var referrer_name = $$("#referrer-name").val().trim().replace(/•/g,'·');
    var referrer_tel = $$("#referrer-tel").val().trim().replace(/\s+/g,'');
    var img_1 = $$("#card-z")[0].files;
    var img_2 = $$("#card-f")[0].files;
    if (!idcards(id_card)) {
        myApp.alert("身份证格式错误！", "提示");
        return;
    }
    if(!testName(user_name)) {
        myApp.alert("代理人姓名格式错误！", "提示");
        return;
    } else {
        $$("#user-name").val(ToCDB(user_name));
    }

    if(!testTel(user_tel)) {
        myApp.alert('代理人电话格式错误！', '提示');
        return;
    }
    if(!testName(referrer_name)) {
        myApp.alert("推荐人姓名格式错误！", "提示");
        return;
    } else {
        $$("#referrer-name").val(ToCDB(referrer_name));
    }

    if(!testTel(referrer_tel)) {
        myApp.alert('推荐人电话格式错误！', '提示');
        return;
    }
    if(img_1.length <= 0 || img_2.length <= 0) {
        myApp.alert('请上传身份证图片！', '提示');
        return; 
    }
    
    myApp.confirm('是否开始考试？','提示',function(){
        location.href = 'examing.html';
    },function(){
        // 取消
    });
}

// 表单校验
// 失去焦点校验 
// $$("#id-card").on('blur', function() {
//     var id_card = $$(this).val().replace(/\s+/g,'');
//     if (!idcards(id_card)) {
//         var modal = myApp.modal({
//             title:  '提示',
//             text: '身份证格式错误',
//             buttons: [
//             ]
//         })
//         $$(this).val(id_card);
//         setTimeout(function() {
//             myApp.closeModal(modal);
//         }, 1000);
//         $$(this).focus();
//         return;
//     } else {
//         $$(this).val(id_card.substring(0,6) + " " + id_card.substring(6,14) + " " + id_card.substring(14))
//     }
// });

$$("#user-name").on('blur', function() {
    var user_name = $$("#user-name").val().trim().replace(/•/g,'·');
    $$("#user-name").val(user_name);
    if(!testName(user_name)) {
        var modal = myApp.modal({
            title:  '提示',
            text: '代理人名字格式错误',
            buttons: [
            ]
        })
        setTimeout(function() {
            myApp.closeModal(modal)
        }, 1000);
        $$(this).focus();
        return;
    } else {
        $$(this).val(ToCDB(user_name));
    }
});

// $$("#user-tel").on('blur', function() {
//     var user_tel = $$(this).val().replace(/\s+/g,'');
//     if(!testTel(user_tel)) {
//         var modal = myApp.modal({
//             title:  '提示',
//             text: '代理人电话格式错误',
//             buttons: [
//             ]
//         })
//         $$(this).val(user_tel);
//         setTimeout(function() {
//             myApp.closeModal(modal)
//         }, 1000);
//         $$(this).focus();
//         return;
//     } else {
//         $$(this).val(user_tel.substring(0,3) + " " + user_tel.substring(3,7) + " " + user_tel.substring(7));
//     }
// });

$$("#referrer-name").on('blur', function() {
    var referrer_name = $$("#referrer-name").val().trim().replace(/•/g,'·');
    $$("#referrer-name").val(referrer_name);
    if(!testName(referrer_name)) {
        var modal = myApp.modal({
            title:  '提示',
            text: '推荐人名字格式错误',
            buttons: [
            ]
        })
        setTimeout(function() {
            myApp.closeModal(modal)
        }, 1000);
        $$(this).focus();
        return;
    } else {
        $$(this).val(ToCDB(referrer_name));
    }
});

// $$("#referrer-tel").on('blur', function() {
//     var referrer_tel = $$(this).val().replace(/\s+/g,'');
//     if(!testTel(referrer_tel)) {
//         var modal = myApp.modal({
//             title:  '提示',
//             text: '推荐人电话格式错误',
//             buttons: [
//             ]
//         })
//         setTimeout(function() {
//             myApp.closeModal(modal)
//         }, 1000);
//         $$(this).focus();
//         return;
//     } else {
//         $$(this).val(referrer_tel.substring(0,3) + " " + referrer_tel.substring(3,7) + " " + referrer_tel.substring(7));
//     }
// });

// 身份证
function idcards(text) {
    var ValideCode, Wi, a_idCard, day, i, idCard, isValidityBrith, month, result, sum, valCodePosition, year, _i;
    result = true;
    idCard = ('' + text).toLowerCase();
    Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
    ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    sum = 0;
    isValidityBrith = function(year, month, day) {
        var temp_date, temp_year;
        temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
        if (year.length === 2) {
            temp_year = temp_date.getYear();
        } else if (year.length === 4) {
            temp_year = temp_date.getFullYear();
        } else {
            return false;
        }
        if (temp_year !== parseFloat(year) || temp_date.getMonth() !== (parseFloat(month) - 1) || temp_date.getDate() !== parseFloat(day)) {
            return false;
        } else {
            return true;
        }
    };
    if (idCard.length === 15) {
        year = idCard.substring(6, 8);
        month = idCard.substring(8, 10);
        day = idCard.substring(10, 12);
        result = isValidityBrith(year, month, day);
    } else if (idCard.length === 18) {
        a_idCard = idCard.split('');
        if (a_idCard[17] === 'x' || a_idCard[17] === 'X') {
            a_idCard[17] = 10;
        }
        for (i = _i = 0; _i < 17; i = ++_i) {
            sum += Wi[i] * a_idCard[i];
        }
        valCodePosition = sum % 11;
        year = idCard.substring(6, 10);
        month = idCard.substring(10, 12);
        day = idCard.substring(12, 14);
        result = +a_idCard[17] === ValideCode[valCodePosition] && isValidityBrith(year, month, day);
    } else {
        result = false;
    }
    return result;
}


// 姓名校验
function testName(val) {
    var reg = /^[\u4e00-\u9fa5A-Za-z\\·•]*$/;
    var newVal = ToCDB(val);
    if(reg.test(newVal)) {
        return true
    } else {
        return false
    }
}

// 手机号校验
function testTel(val) {
    var reg = /^1[34578]\d{9}$/;
    if(reg.test(val)) {
        return true
    } else {
        return false
    }
}

// 图片校验
function testImg(val1,val2) {
    var reg = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/; 
    if(arguments.length == 1) {
        // 上传时校验
        if(reg.test(val1)) {
            return true;
        } else {
            return false;
        }
    } else {
        // 提交时校验
        if(!reg.test(val1) || !reg.test(val2)) {
            return true;
        } else {
            return false;
        }
    }
}

// 全角转半角
function ToCDB(str) { 
    var tmp = ""; 
    for(var i=0;i<str.length;i++){ 
        if (str.charCodeAt(i) == 12288){
            tmp += String.fromCharCode(str.charCodeAt(i)-12256);
            continue;
        }
        if(str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375){ 
            tmp += String.fromCharCode(str.charCodeAt(i)-65248); 
        } 
        else{ 
            tmp += String.fromCharCode(str.charCodeAt(i)); 
        } 
    } 
    return tmp 
} 

// 针对原生的方法 分享页不考虑
// 点击分享
$$('.index-share').on('click', function() {
    shareProto()
})

$$('.share-btn').on('click', function() {
    shareProto()
})

function shareProto() {
    var referrer_name = $$("#referrer-name").val().trim();
    var referrer_tel = $$("#referrer-tel").val().trim().replace(/\s+/g,'');
    if(!testTel(referrer_tel)) {
        myApp.alert('请在代理人考试页面录入推荐人联系电话，再进行分享！', '提示');
        return;
    }
    if(typeof urlParam.usercode == 'undefinded') {
        urlParam.usercode = '';
    }
    var shareUrl = 'http://mob.mypicc.com.cn:7889/nr/examPage' + '#usercode=' + urlParam.usercode + '&name=' + encodeURI(referrer_name) + '&tel=' + referrer_tel;
    // 调用原生分享
    if(urlParam.platform == 'android') {
        AndroidWebView.shareLink(shareUrl); 
    } else if(urlParam.platform == 'ios') {
        iOSWebView.shareMethd(shareUrl);
    }
}

// 调用ocr功能
$$('.ocr-btn').on('click', function() {
    // 调用原生ocr方法
    if(urlParam.platform == 'android') {
        window.AndroidWebView.executeOcr('');
    } else if(urlParam.platform == 'ios') {
        iOSWebView.callOCRMethod();
    } 
})

// ocr功能获取的数据调用此方法
function getOcr(val) {
    // 接收返回数据
    var data = JSON.parse(val);
    $$('#id-card').val(data.id);
    $$('#user-name').val(data.name);
}

// 关闭webview
$$('.index-exit').on('click', function() {
    if(urlParam.platform == 'android') {
        window.AndroidWebView.finshWebView('');
    } else if(urlParam.platform == 'ios') {
        iOSWebView.goBack();
    }
});