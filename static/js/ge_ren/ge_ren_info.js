$(function () {

    $.ajax({
        url: 'http://127.0.0.1:8000/api/user/get_profile',
        type: 'get',
        xhrFields: {withCredentials: true},
        dataType: 'json',
        success: function (res) {
            console.log(res);
            if (res['code'] == 0) {
                $('#nickname').attr('value', res['data']['nickname'])
                $('.right_value').eq(1).text(get_sex(res['data']['gender']))
                $('.right_value').eq(2).text(get_age(res['data']['birthday']))

                $('.right_value').eq(3).text(res['data']['height'])
                $('.right_value').eq(4).text(res['data']['location'])
                $('.right_value').eq(5).text(res['data']['married'])
                $('#remack').attr('value', res['data']['describe'])
                $('.right_value').eq(7).text(res['data']['edu'])
                $('.right_value').eq(8).text(res['data']['occu'])
                // $('.right_value').eq(9).text(res['data']['birthday'])
                $('.right_value').eq(9).text(get_date(res['data']['birthday']))
                $('.right_value').eq(10).text(res['data']['weight'])
                $('.right_value').eq(11).text(res['data']['figure'])
                $('#qq').attr('value', res['data']['qq'])
                $('#phone_').attr('value', res['data']['phonenum'])

                $('.right_value').eq(14).text(get_sex(res['data']['dating_gender']))
                $('.right_value').eq(15).text(res['data']['dating_location'])
                $('.right_value').eq(16).text(res['data']['min_distance'])
                $('.right_value').eq(17).text(res['data']['max_distance'])
                $('.right_value').eq(18).text(res['data']['min_dating_age'])
                $('.right_value').eq(19).text(res['data']['max_dating_age'])
            }
        }

    });
    age()
    save()
});

function get_age(start_date) {
    var today = new Date();
    var end_year = today.getFullYear();
    var start_year = Number(start_date.split('-')[0]);
    var age = end_year - start_year;
    return age
}

function get_sex(gender) {
    if (gender == 'female') {
        var sex = '女'
    } else {
        var sex = '男'
    }
    return sex
}

function new_get_sex(gender) {
    if (gender == '女') {
        var sex = 'female'
    } else {
        var sex = 'male'
    }
    return sex
}

function get_date(date) {
    return date.split('-').join(' ')
}

function age() {
    $('#trigger6').click(function () {
        console.log($(this).text())
    })
}

function save() {
    $('#save_data').click(function () {
        var formData = new FormData()
        formData.append('nickname', document.getElementById('nickname').value)
        formData.append('gender', new_get_sex($('.right_value').eq(1).text()))
        formData.append('age', $('.right_value').eq(2).text())
        formData.append('height', $('.right_value').eq(3).text())
        formData.append('location', handler_city($('.right_value').eq(4).text()))
        formData.append('married', $('.right_value').eq(5).text())
        formData.append('describe', document.getElementById('remack').value)
        formData.append('edu', $('.right_value').eq(7).text())
        formData.append('occu', $('.right_value').eq(8).text())
        formData.append('birthday', $('.right_value').eq(9).text().split(' ').join('-'))
        formData.append('weight', $('.right_value').eq(10).text())
        formData.append('figure', $('.right_value').eq(11).text())
        formData.append('qq', document.getElementById('qq').value)
        formData.append('phonenum', document.getElementById('phone_').value)
        formData.append('dating_gender', new_get_sex($('.right_value').eq(14).text()))
        formData.append('dating_location', $('.right_value').eq(15).text())
        formData.append('min_distance', $('.right_value').eq(16).text())
        formData.append('max_distance', $('.right_value').eq(17).text())
        formData.append('min_dating_age', $('.right_value').eq(18).text())
        formData.append('max_dating_age', $('.right_value').eq(19).text())
        formData.append('vibration', 1)
        formData.append('only_matche', 1)
        formData.append('auto_paly', 1)
        $.ajax({
            url: 'http://127.0.0.1:8000/api/user/set_profile',
            type: 'post',
            data:formData,
            dataType: 'json',
            xhrFields: {withCredentials: true},
            cache: false,                      // 不缓存
    processData: false,                // jQuery不要去处理发送的数据
    contentType: false,
            success:function (res) {
                if (res['code']==0){
                    $('#remind').text('修改成功,即将跳转新页面...');
                    $('#remind').show();
                    setTimeout(hide_, 2000);
                } else {
                    // alert("验证码发送失败");
                    $('#remind').text('修改失败,请重试...');
                    $('#remind').show();
                    setTimeout(hide__, 2000);
                }
            }
        })
    })
}
function handler_city(city) {
    return city.split(' ').pop()
}
function hide_() {
            $('#remind').hide();
            location.href = 'ge_ren.html'
        };
function hide__() {
            $('#remind').hide();
        }