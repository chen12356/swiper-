function Img_HD() {
    //发起请求，获取到数据


    var data = [{
        'src': 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1482625914,1494515278&fm=26&gp=0.jpg',
        'name': '1', 'sex': '男', 'nian': 25, 'city': '福州', 'remark': '老板你太jainle'
    },
        {
            'src': 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1482625914,1494515278&fm=26&gp=0.jpg',
            'name': '2', 'sex': '男', 'nian': 25, 'city': '上海', 'remark': '老板你太jainle'
        },
        {
            'src': 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1482625914,1494515278&fm=26&gp=0.jpg',
            'name': '3', 'sex': '男', 'nian': 25, 'city': '宁德', 'remark': '老板你太jainle'
        },{
            'src': 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1482625914,1494515278&fm=26&gp=0.jpg',
            'name': '4', 'sex': '男', 'nian': 27, 'city': '宁德', 'remark': '老板你太jainle'
        }];
    console.log(data);
    var data_len = data.length;
    var html_str = '<ul class="card-list" id="ul_list">';
    for (var i = 0; i < data.length; i++) {
        var str = '<li class="card" style="background-color: white;">' +
            '                        <span style="width: 100%;height: 73%;position: absolute;bottom:27% ;margin-top: 0">' +
            '                            <img style="width: 100%;height: 250px;border-radius: 10px;"' +
            '                                 src="' + data[i]['src'] + '"' +
            '                                 alt=""></span>' +
            '                        <p style="height:30px;position:absolute;left:5%;bottom:15%;font-size: 18px;margin-bottom: 0">' + data[i]['name'] + '' +
            '                            <span style="width: 60px;font-size: 16px;color: white;margin-left: 15px;margin-top: 2.5px;border-radius:10px;background-color: hotpink;float: right">' +
            '                            <span style="margin-left: 8px">' + data[i]['sex'] + '</span>' +
            '                            <span style="margin-left: 6px">' + data[i]['nian'] + '</span>' +
            '                        </span>' +
            '                        </p>' +
            '                        <p style="height:30px;position:absolute;padding-top: 4px;;right:5%;bottom:15%;font-size: 14px;margin-bottom: 0">' + data[i]['city'] +
            '                        </p>' +
            '                        <p style="position:absolute;left:5%;bottom:2%;font-size: 14px">' + data[i]['remark'] + '</p>' +
            '                    </li>';
        html_str += str
    }
    html_str = html_str + '</ul>';
    $('#div1').append(html_str);
    // console.log($('#ul_list li:last-child').html())
    $('#ul_list li:last-child').on('touchend',function(e) {
        var _touch = e.originalEvent.changedTouches[0];
        var _x= _touch.pageX;
        var _y = _touch.pageY;
        console.log(_x,_y);
        console.log('nihao ')
        // data_len = data_len - 1;
        // if (data_len >= 0){
        //     var prependList = function () {
        //     if ($('.card').hasClass('activeNow')) {
        //         var lastCard = $(".card-list .card").length - 1;
        //         // console.log(lastCard);
        //         var $slicedCard = $('.card').slice(lastCard).removeClass('transformThis activeNow');
        //             $('ul').prepend($slicedCard);
        //
        //
        //         // 此处发起请求
        //         console.log($slicedCard.html());
        //         if (data_len == 0){
        //             window.location.reload();
        //         }
        //
        //     }
        // }
        // $('li').last().addClass('transformThis').prev().addClass('activeNow');
        //
        // setTimeout(function () {
        //     prependList();
        // }, 800);
        // //删除点击的一条，发起请，
        //
        // }



    })


    // $('.next').click(function () {
    //     data_len = data_len - 1;
    //     if (data_len >= 0){
    //         var prependList = function () {
    //         if ($('.card').hasClass('activeNow')) {
    //             var lastCard = $(".card-list .card").length - 1;
    //             // console.log(lastCard);
    //             var $slicedCard = $('.card').slice(lastCard).removeClass('transformThis activeNow');
    //                 $('ul').prepend($slicedCard);
    //
    //
    //             // 此处发起请求
    //             console.log($slicedCard.html());
    //             if (data_len == 0){
    //                 window.location.reload();
    //             }
    //
    //         }
    //     }
    //     $('li').last().addClass('transformThis').prev().addClass('activeNow');
    //
    //     setTimeout(function () {
    //         prependList();
    //     }, 800);
    //     //删除点击的一条，发起请，
    //
    //     }
    // });
}

$(function () {

    Img_HD();
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