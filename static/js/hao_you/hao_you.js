$(function () {
    // 默认展示好友列表的数据
    $.ajax({
        url: "http://127.0.0.1:8000/api/social/friend_list",
        type: 'get',
        dataType: 'json',
        xhrFields: {withCredentials: true},
        success: function (res) {
            console.log(res)
            if (res['code'] == 0) {
                var data = res['data']
                console.log(data)
                var need_str = JSON.stringify(data)
                sessionStorage.friend_data = need_str
                $('#user_list').html(html_str(data))
                oper()
            }
        }
    })
    //  $("#friend").trigger('click')
    //  $('#friend').style.backgroundColor = 'red';
    document.getElementById('who_like').style.backgroundColor = '#eee'
    $('#friend').click(function () {

        //发起ajax,请求好友列表的成员
        document.getElementById('friend').style.backgroundColor = 'white'
        document.getElementById('who_like').style.backgroundColor = '#eee'
        console.log('好友列表')
        var data = JSON.parse(sessionStorage.friend_data)

        $('#user_list').html(html_str(data))
        oper()
    });
    $('#who_like').click(function () {
        //发起ajax,请求who_like_me接口

        document.getElementById('friend').style.backgroundColor = '#eee'
        document.getElementById('who_like').style.backgroundColor = 'white'
        console.log('谁喜欢过我')
        $.ajax({
            url: "http://127.0.0.1:8000/api/social/who_liked_me",
            type: 'get',
            dataType: 'json',
            xhrFields: {withCredentials: true},
            success: function (res) {
                console.log(res)
                if (res['code'] == 0) {
                    var data = res['data']
                    console.log(data)
                    var need_str = JSON.stringify(data)
                    sessionStorage.who_like_me_data = need_str
                    $('#user_list').html(html_str(data))
                    f()
                } else if (res['code'] == 1010) {
                    $('#user_list').html('<p style="color: red;font-size: 18px;text-align: center;padding-bottom: 10px">非常抱歉，会员等级不足！！！</p>')
                    console.log('对不起，会员等级不足')
                }
            }
        })
    });
    $('.user_friend').click(function () {
        alert($(this).text())
    })
});
function html_str(list) {
    var str = ''
    for (var i = 0; i < list.length; i++) {
        str += '<div class="user_friend">' + '<span hidden>' +list[i]['id']+'</span>'+
            '<p style="float: left;position: absolute;left: 150px;margin-top: 20px;font-size: 20px">' + list[i]['nickname'] + '</p>' +
            '<p style="float: left;position: absolute;left: 150px;margin-top: 55px;font-size: 18px">'+list[i]['location']+'</p>' +
            '<p style="border-radius: 100%;background-color: hotpink;width: 100px;height: 100px;margin-left: 5%;margin-bottom: 15px">' +
            '<img src="' + list[i]["avatar"] + '"' +
            'alt="" style="width:100px; height:100px; border-radius:50%; "> ' +
            '</p> ' +
            '</div>'
    }
    return str
}

function oper() {
    $('.user_friend').click(function () {
        var $oper = this;
        $(this).prepend('<p id="show_info" style="float: right;position: absolute;right: 20px;margin-top: 20px;font-size: 12px"><span >查看详情</span></p>\n' +
            '            <p id="remove" style="float: right;position: absolute;right: 20px;margin-top: 55px;font-size: 12px"><span >解除关系</span></p>')
        $('#remove').click(function () {
            var rm_id = $($oper).find('span:eq(2)').text()
            $.ajax({
            url: "http://127.0.0.1:8000/api/social/remove_friend",
            type: 'get',
                data:{
                    'friend_id':rm_id
                },
            dataType: 'json',
            xhrFields: {withCredentials: true},
            success: function (res) {
                console.log('解除好友')
                console.log(res)
                if (res['code'] == 0) {
                    console.log('xxx')
                     location.href = 'hao_you.html'
                }
            }
        })


        })
          $('#show_info').click(function () {
            var rcmd_id = $($oper).find('span:eq(2)').text()
            sessionStorage.setItem('rcmd_id', rcmd_id)
            location.href = 'info2.html'
        })
    })
}
function f() {
      $('.user_friend').click(function () {
          var $oper = this;
          $(this).prepend('<p id="show_info" style="float: right;position: absolute;right: 20px;margin-top: 30px;font-size: 12px"><span >查看详情</span></p>\n')

          $('#show_info').click(function () {
              var rcmd_id = $($oper).find('span:eq(1)').text()
              console.log(rcmd_id)
              sessionStorage.setItem('rcmd_id', rcmd_id)
              location.href = 'info2.html'
          })
      })
}
