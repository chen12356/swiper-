/**
 * Created by 2017 helang.love@qq.com on 2017/12/2.
 */
function json_data() {
    $.ajax({
        url: "http://127.0.0.1:8000/api/social/rcmd_users",
        type: 'get',
        dataType: 'json',
        xhrFields: {withCredentials: true},
        success: function (res) {
            console.log('狗东西')
            if (res['code'] == 0) {
                var data = res['data']
                var need_str = JSON.stringify(data)
                sessionStorage.data = need_str
            }
        }
    })
}

var photoSwipe = {
    /*用户信息数组*/
    imgArr: [],
    /*元素位置*/
    site: {
        _x_start: 0,
        _y_start: 0,
        _x_move: 0,
        _y_move: 0,
        _x_end: 0,
        _y_end: 0,
        top_val: 0,
        left_val: 0
    },
    /*当前下标*/
    index: 0,
    /*是否允许动画*/
    run: true,
    /*是否加载完成*/
    load: false,
    /*初始化*/
    init: function () {
        document.querySelector("#photo_box>div>ul").innerHTML = this.imgHtml();
    },
    /*图片HTML*/
    imgHtml: function () {
         json_data();
        var data = get_data(this.index);
        var str = '<li id="ind-' + this.index + '" class="card" style="background-color: white;">' +
            '                        <span style="width: 100%;height: 73%;position: absolute;bottom:27% ;margin-top: 0">' +
            '                            <img style="width: 100%;height: 250px;border-radius: 10px;"' +
            '                                 src="' + data['avatar'] + '"' +
            '                                 alt=""></span>' +
            '                        <p style="height:30px;position:absolute;left:5%;bottom:15%;font-size: 18px;margin-bottom: 0">' + data['nickname'] + '' +
            '                            <span style="width: 60px;font-size: 16px;color: white;margin-left: 15px;margin-top: 2.5px;border-radius:10px;background-color: hotpink;float: right">' +
            '                            <span style="margin-left: 8px">' + get_sex(data['gender']) + '</span>' +
            '                            <span style="margin-left: 6px">' + get_age(data['birthday']) + '</span>' +
            '                        </span>' +
            '                        </p>' +
            '                        <p style="height:30px;position:absolute;padding-top: 4px;;right:5%;bottom:15%;font-size: 14px;margin-bottom: 0">' + data['location'] +
            '                        </p>' +
            '                        <p style="position:absolute;left:5%;bottom:2%;font-size: 14px">' + data['describe'] + '</p>' +
            '<span style="display: none">' + data['id'] + '</span>' +
            '                    </li>';

        // console.log(str)
        return str;


    },
    /*移动动画*/
    animateMove: function (el, val, status) {
        if (!this.run) {
            return;
        }
        this.run = false;
        if (status == 0) {
            console.log('上下滑动')
            el.css({
                "transform": "translate3d(0px," + photoSwipe.top_val * 4 + "px,0px)",
                "transition-duration": "0.8s"
            });
        } else {
            /*CSS3动画方式*/
            el.css({
                "transform": "translate3d(" + doc_width * val + "px," + photoSwipe.top_val * 2.2 + "px,0px)",
                "transition-duration": "0.3s"
            });
        }

        var moveTime = setTimeout(function () {
            el.remove();
            var ind_el = $("#ind-" + (photoSwipe.index));

            photoSwipe.activeEl(ind_el);
            photoSwipe.index++;
            // console.log('来了')
            $("#photo_box>div>ul").append(photoSwipe.imgHtml());
            photoSwipe.run = true;
        }, 800);
    },
    /*复位动画*/
    animateReset: function (el) {
        /*CSS3动画方式*/
        el.css({"transform": "translate3d(0px,0px,0px)", "transition-duration": "0.3s"});
        var resetTime = setTimeout(function () {
            el.css("transition-duration", "0s");
        }, 1000);
    },
    /*激活层*/
    activeEl: function (el) {
        el.css("z-index", "2");
    },
    /*清除位置*/
    clearLocation: function () {
        this.left_val = 0;
    }

};


photoSwipe.init();

var doc_width = $(document).width(), doc_height = $(document).height();

photoSwipe.activeEl($("#ind-0"));
photoSwipe.index++;
$("#photo_box>div>ul").append(photoSwipe.imgHtml());

$("#photo_box").on("touchstart", function (e) {
    if (!photoSwipe.load || !photoSwipe.run) {
        return;
    }

    var ev = e || window.event;
    photoSwipe._x_start = ev.touches[0].pageX;
    photoSwipe._y_start = ev.touches[0].pageY;
    var act_el = $("#ind-" + (photoSwipe.index - 1).toString(10));
});
$("#photo_box").on("touchmove", function (e) {
    if (!photoSwipe.load || !photoSwipe.run) {
        return;
    }
    var ev = e || window.event;
    photoSwipe._x_move = ev.touches[0].pageX;
    photoSwipe._y_move = ev.touches[0].pageY;

    var act_el = $("#ind-" + (photoSwipe.index - 1).toString(10));
    photoSwipe.top_val = parseFloat(photoSwipe._y_move) - parseFloat(photoSwipe._y_start);
    photoSwipe.left_val = parseFloat(photoSwipe._x_move) - parseFloat(photoSwipe._x_start);

    act_el.css({
        "transform": "translate3d(" + photoSwipe.left_val + "px," + photoSwipe.top_val + "px,0px)",
        "transition-duration": "0s"
    });
});
$("#photo_box").on("touchend", function (e) {
    if (!photoSwipe.load || !photoSwipe.run) {
        return;
    }
    var ev = e || window.event;
    photoSwipe._x_end = ev.changedTouches[0].pageX;
    photoSwipe._y_end = ev.changedTouches[0].pageY;
    // console.log(photoSwipe._x_end)
    // console.log(photoSwipe._y_end)
    // console.log(photoSwipe.top_val)
    // console.log(doc_height / 3 - doc_height / 5.5)
    // console.log(-doc_height / 3 + doc_height / 5.5)
    var act_el = $("#ind-" + (photoSwipe.index - 1).toString(10));
    if (photoSwipe.left_val > 0 && photoSwipe.left_val > doc_width / 2 - doc_width / 4.5) {
        var r_type = 'like';
        send_req(r_type);
        photoSwipe.animateMove(act_el, 1);

    } else if (photoSwipe.left_val < 0 && photoSwipe.left_val < -doc_width / 2 + doc_width / 4.5) {
        var r_type = 'dislike';
        send_req(r_type);
        photoSwipe.animateMove(act_el, -1);
    } else if (photoSwipe.top_val < 0 && photoSwipe.top_val < -doc_height / 3 + doc_height / 5.5) {
        var r_type = 'superlike';
        var flag = send_req(r_type);
        console.log(flag)
        if (flag === true) {
            photoSwipe.animateMove(act_el, 1, 0);
        } else {
            photoSwipe.animateReset(act_el)
            $('#remind').text('提示：非常抱歉，超级喜欢权限不足!!!');
            $('#remind').show();
            setTimeout(hide_, 2000)
        }

    } else if (photoSwipe.top_val > 0 && photoSwipe.top_val > doc_height / 3 - doc_height / 5.5) {
        var r_type = 'superlike';
        var flag = send_req(r_type);

        if (flag === true) {
            photoSwipe.animateMove(act_el, 1, 0);
        } else {
            photoSwipe.animateReset(act_el)
            $('#remind').text('提示：非常抱歉，超级喜欢权限不足!!!');
            $('#remind').show();
            setTimeout(hide_, 2000)
        }
    } else {
        photoSwipe.animateReset(act_el);
    }
});

function hide_() {

    $('#remind').hide()
}

$(function () {

    photoSwipe.load = true;
    $('#rewind').click(function () {

//        rewind请求反悔接口，获取剩余的返回次数,改变次数
        $.ajax({
            url: "http://127.0.0.1:8000/api/social/rewind",
            type: 'get',
            dataType: 'json',
            xhrFields: {withCredentials: true},
            success: function (res) {
                console.log(res)
                if (res['code'] == 0) {
                    json_data();
                    $('#remind').text('提示：反悔成功，上一次操作已无效!!!');
                    $('#remind').show();
                    setTimeout(hide_, 2000)
                    var html_str = '今日反悔滑动次数(' + res['data']['rewind_times'] + '/' + res['data']['rewind_count'] + ')'
                    con.innerHTML = html_str
                } else if (res['code'] == 1010) {
                    // alert("验证码发送失败");
                    $('#remind').text('提示：非常抱歉，反悔权限不足!!!');
                    $('#remind').show();
                    setTimeout(hide_, 2000)
                } else if (res['code'] == 1008) {
                    $('#remind').text('提示：距上次操作时间超过5分钟，不支持反悔!!!');
                    $('#remind').show();
                    setTimeout(hide_, 2000)
                } else if (res['code'] == 1007) {
                    sessionStorage.rewind_times = 5
                    sessionStorage.rewind_count = 5
                    $('#remind').text('提示：今日反悔次数已使用完!!!');
                    $('#remind').show();
                    setTimeout(hide_, 2000)
                    var html_str = '今日反悔滑动次数(' + 5 + '/' + 5 + ')'
                    con.innerHTML = html_str
                }
            }
        })
        // var con = document.getElementById('con')
        // var html_str = '今日反悔滑动次数(' + sessionStorage.rewind_times + '/' + sessionStorage.rewind_count + ')'
        // con.innerHTML = html_str

        function hide_() {

            $('#remind').hide()
        }

        console.log('请求返回接口，获取剩余的次数')
    })

});

function get_data(idx) {
    var data = JSON.parse(sessionStorage.data).reverse()
    var len = data.length
    console.log(idx % len)
    return data[idx % len]

}

function send_req(r_type) {
    console.log(r_type)
    var flag = true;
    var rcmd_id = $('#ul_list li:first-child span:eq(4)').text()
    console.log(rcmd_id)
    if (r_type === 'superlike') {
        $.ajax({
            url: "http://127.0.0.1:8000/api/social/superlike",
            type: 'POST',
            data: {
                'sid': rcmd_id
            },
            dataType: 'json',
            async: false,
            xhrFields: {withCredentials: true},
            success: function (res) {
                if (res['code'] == 0) {
                    console.log('超级喜欢成功')
                    json_data();
                } else if (res['code'] == 1010) {
                    flag = false
                    console.log('对不起，您的权限不足，请开通会员！！！')

                }
            }
        })
    } else if (r_type === 'like') {
        $.ajax({
            url: "http://127.0.0.1:8000/api/social/like",
            type: 'POST',
            data: {
                'sid': rcmd_id
            },
            dataType: 'json',
            xhrFields: {withCredentials: true},
            success: function (res) {
                if (res['code'] == 0) {
                    json_data();
                    console.log('喜欢成功')
                } else if (res['code'] == 1010) {
                    console.log('对不起')
                }
            }
        })
    } else if (r_type === 'dislike') {
        $.ajax({
            url: "http://127.0.0.1:8000/api/social/dislike",
            type: 'POST',
            data: {
                'sid': rcmd_id
            },
            dataType: 'json',
            xhrFields: {withCredentials: true},
            success: function (res) {
                if (res['code'] == 0) {
                    json_data();
                    console.log('不喜欢成功')
                } else if (res['code'] == 1010) {
                    console.log('对不起')
                }
            }
        })
    }
    //需要获取服务器上用户滑动的次数
    //需要判断 r_type的值：like请求喜欢接口、superlike请求超级喜欢、dislike不喜欢接口、黑名单、点击x提示已取消对上一用户的所有滑动操作

    return flag
//    发起对应的请求，并且获取滑动的次数

}


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