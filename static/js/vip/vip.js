$(function () {
    $.ajax({
        url: 'http://127.0.0.1:8000/api/user/get_profile',
        type: 'get',
        xhrFields: {withCredentials: true},
        dataType: 'json',
        success: function (res) {
            console.log(res);
            if (res['code'] == 0) {

                $('#icon').attr('src', res['data']['avatar'])
                $('#nickname').text(res['data']['nickname'])
                $('#vip_level').text(vip_name(res['data']['vip_id']))
                $('#vip_end').text(res['data']['vip_end'] + '会员到期')
                sessionStorage.user_id = res['data']['id']
            }
        }

    });
    $('#sub').click(function () {
        var money = $('#money').text()
        var vip_id = 1
        if (money == 10) {
            vip_id = 2
        } else if (money == 20) {
            vip_id = 3
        } else if (money == 30) {
            vip_id = 4
        }
        $.ajax({
            url: 'http://127.0.0.1:8000/api/vip/set_vip',
            type: 'post',
            data: {'vip_id':vip_id},
            xhrFields: {withCredentials: true},
            dataType: 'json',

            success: function (res) {
                console.log(res);
                if (res['code'] == 0) {
                    $('#remind').text('会员开通/续费成功，即将跳转新页面...');
                    $('#remind').show();
                    setTimeout(hide_, 3000);
                }
            }

        });


    })
})
function hide_() {
            $('#remind').hide();
            location.href = 'ge_ren.html'
        };
function vip_name(seq) {
    console.log(seq)
    var name;
    if (seq == 1) {
        name = '普通用户'
    } else if (seq == 2) {
        name = '黄金会员'
    } else if (seq == 3) {
        name = '铂金会员'
    } else if (seq == 4) {
        name = '钻石会员'
    }
    console.log(name)
    return name
}