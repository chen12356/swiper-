$(function () {
    console.log("来详情页面了")

    //发情请求，利用name进行发起查询
    var rcmd_id = sessionStorage.getItem('rcmd_id')
    $.ajax({
        url: "http://127.0.0.1:8000/api/user/get_profile",
        type: 'get',
        dataType: 'json',
        data: {
            'uid': rcmd_id
        },
        xhrFields: {withCredentials: true},

        success: function (res) {
            console.log(res)
            if (res['code'] == 0) {
                $('#avatar').attr('src', res['data']['avatar'])
                var str1 = '<p style="margin-top: 5px">' + res["data"]["nickname"] +
                    '<span style="margin-left: 25px">' + get_age(res["data"]["birthday"]) + '</span>' +
                    '<span style="float: right">真人认证 <span class="glyphicon glyphicon-grain" style="color: hotpink"> </span></span>' +
                    '</p> <p class="title">TA的联系方式</p><p>手机<span  class="show_right search">查看</span>' +
                    ' <span class="check">手机已认证 </span></p><hr><p>微信<span class="show_right search">查看</span>' +
                    '<span class="check">微信已认证</span></p><hr><p>QQ<span class="show_right search">查看</span>' +
                    '<span class="check">QQ已认证 </span></p>' +
                    '<p class="title">TA的基本资料</p>' +
                    '        <p>昵称' +
                    '<span class="show_right">' + res["data"]['nickname'] + '</span>' +
                    '</p><hr><p>性别<span class="show_right">' + get_sex(res["data"]["gender"]) + '</span>' +
                    '</p><hr><p>年龄 <span class="show_right">' + get_age(res["data"]["birthday"]) + '</span></p><hr>' +
                    '<p>身高<span class="show_right">' + res["data"]["height"] + '</span>' +
                    ' </p><hr><p>个性签名<span class="show_right">' + res["data"]["describe"] + '</span>' +
                    '</p><hr><p>婚姻状况<span class="show_right">' + res["data"]["married"] + '</span>' +
                    '</p><p class="title">TA的详细资料</p>' +
                    '<p>学历<span class="show_right">' + res["data"]["edu"] + '</span>' +
                    ' </p><hr><p>职业<span class="show_right">' + res["data"]["occu"] + '</span>' +
                    ' </p><hr><p>生日<span class="show_right">' + res["data"]["birthday"] + '</span>' +
                    '</p><hr><p>体重<span class="show_right">' + res["data"]["weight"] + '</span></p>' +
                    '<p style="margin-bottom: 10px">身材<span class="show_right"' +
                    '>' + res["data"]["figure"] + '</span> </p>' +
                    '\n' +
                    '        <p>\n' +
                    '            <span id="add_friend" class="glyphicon glyphicon-comment"></span>\n' +
                    '            <span id="no_friend" class="glyphicon glyphicon-share-alt"></span>\n' +
                    '        </p>'


                $('#info').prepend(str1)
                search_data(res["data"]["qq"],res["data"]['phonenum']);
                like(res['data']['id'])
                dislike(res['data']['id'])
            }
        }

    });
})

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

function search_data(qq,wx) {
    console.log('laol')
    $('.search').click(function () {
        console.log('检查权限')
        var oper = $(this).parent().text().substring(0,2);
        if (oper === 'QQ'){
            $(this).text(qq)
        } else {
            $(this).text(wx)
        }

        //发起请求，检查权限问题
    //    如歌有权限，让其看

    })
}

function like(id) {
    $('#add_friend').click(function () {
        alert('聊天功能暂未开放，敬请期待！！！')
    })
//    提交：表示喜欢该好友
//    发起ajax请求
}
function dislike(id) {
//    提交：表示不喜欢该好友
//    发起ajax请求
    $('#no_friend').click(function () {
        alert('分享好友功能暂未开放，敬请期待！！！')
    })
}

function hide_() {

            $('#remind').hide()
    location.href = 'haoyou.html'
        }