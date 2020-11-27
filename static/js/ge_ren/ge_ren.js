
function ge_ren() {
    $('#user').click(function () {
        location.href = 'ge_ren_info.html'
    });
}
function get_ajax(){
    $.ajax({
            url: 'http://127.0.0.1:8000/api/user/get_profile',
            type: 'get',
            xhrFields: { withCredentials: true },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                if (res['code'] == 0) {
                    $('#avatar').attr('src',res['data']['avatar'])
                    $('#name').text(res['data']['nickname'])
                    $('#phone').text(res['data']['phonenum'])
                    $('#level').text(vip_name(res['data']['vip_id']))
                    sessionStorage.user_id = res['data']['id']
                }
            }
        });
}
function vip_name(seq){
    console.log(seq)
    var name;
    if (seq==1){
        name = '普通会员'
    } else if (seq ==2){
        name = '黄金会员'
    } else if (seq ==3){
        name = '铂金会员'
    } else if (seq == 4){
        name = '钻石会员'
    }
    console.log(name)
    return name
}
$(function () {
    get_ajax();
    ge_ren();
    logout_()
    $('#you_hui').click(function () {
        alert('抱歉！该功能暂未开放！！！')
    })
        $('#xiao_fei').click(function () {
        alert('抱歉！该功能暂未开放！！！')
    })
        $('#tou_su').click(function () {
        alert('抱歉！该功能暂未开放！！！')
    });
    $('#avatar').click(function () {

    })
});

function logout_() {
    $('#logout').click(function () {
        $('#remind').text('登出成功,即将跳转登录页面...');
                    $('#remind').show();
                    setTimeout(hide_, 2000);
    })
}
function hide_() {
            $('#remind').hide();
            location.href = 'login.html'
        };