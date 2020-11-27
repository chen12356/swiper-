//验证电话
function checktelephone() {
    var telephone = $("#telephone").val();
    if (!telephone) {
        document.getElementById("code").setAttribute("disabled", true);
        document.getElementById("login").setAttribute("disabled", true);
    }
    $('#telephone').keyup(function () {
        var telephone = $(this).val();
        var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        b = reg.test(telephone);
        if (b) {
            $(this).css({'color': 'black'});
            document.getElementById("code").removeAttribute("disabled");
            var code_num = $("#code_num").val();
            if (!code_num) {
                console.log('lail')
            } else {
                document.getElementById("login").removeAttribute("disabled");
            }
        } else {
            $(this).css({'color': 'red'});
            document.getElementById("code").setAttribute("disabled", true);
            document.getElementById("login").setAttribute("disabled", true);
        }
    });

}

//验证code
function checkCode() {
    var code_num = $("#code_num").val();
    if (!code_num) {
        document.getElementById("login").setAttribute("disabled", true);
    }
    $('#code_num').keyup(function () {
        var code_num = $(this).val();
        if (!code_num) {
            document.getElementById("login").setAttribute("disabled", true);
        } else {
            if (!$('#telephone').val()) {
                console.log('存在');
                // document.getElementById("login").removeAttribute("disabled");
            } else {
                console.log(code_num);
                document.getElementById("login").removeAttribute("disabled");
            }
        }
    });

}

//获取短信
function getCode() {
    var $zdc = $('#code');
    $zdc.click(function () {
        $.ajax({
            url: "http://127.0.0.1:8000/api/user/get_vcode",
            type: 'get',
            dataType: 'json',
            data: {
                "phonenum": $('#telephone').val(),
            },
            success: function (res) {
                if (res['code'] === 0) {
                    console.log('成功');
                    console.log(res)
                    $('#remind').text('验证码发送成功，3分钟内有效！！！');
                    $('#remind').show();
                    setTimeout(hide_, 2000)
                } else {
                    // alert("验证码发送失败");
                    $('#remind').text('验证码发送成功，3分钟内有效！！！');
                    $('#remind').show();
                    setTimeout(hide_, 2000)

                }
            }
        });

        function hide_() {

            $('#remind').hide()
        }

        setTime($zdc);//开始倒计时
        var countdown = 60;

        function setTime(obj) {
            if (countdown == 0) {
                obj.prop('disabled', false);
                obj.text("获取验证码");
                countdown = 60;//60秒过后button上的文字初始化,计时器初始化;
                return;
            } else {
                obj.prop('disabled', true);
                obj.text("(" + countdown + "s)后重新发送");
                countdown--;
            }
            setTimeout(function () {
                setTime(obj)
            }, 1000) //每1000毫秒执行一次
        }

    });

}

//点击登录按钮
function clickLogin() {
    $('#login').click(function () {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/user/submit_vcode',
            type: 'post',
            xhrFields: { withCredentials: true },
            data: {
                "phonenum": $('#telephone').val(),
                "vcode": $('#code_num').val(),
            },
            dataType: 'json',
            success: function (res) {
                // console.log(res);
                if (res['code'] == 0) {
                    console.log('成功');
                    // console.log(res['data']);
                    console.log(document.cookie)
                    var user_info = res['data']['id']
                    console.log(user_info)

                    sessionStorage.setItem('info', user_info)
                    $('#remind').text('登录成功,即将跳转新页面...');
                    $('#remind').show();
                    setTimeout(hide_, 2000);
                } else {
                    // alert("验证码发送失败");
                    $('#remind').text('登录失败,请检查验证码是否准确');
                    $('#remind').show();
                    setTimeout(hide__, 2000);
                }
            }

        });

        function hide_() {
            $('#remind').hide();
            location.href = 'mine.html'
        };

        function hide__() {
            $('#remind').hide();
        }
    })
}


$(function () {
    checktelephone();
    getCode();
    checkCode();
    clickLogin();
   
});