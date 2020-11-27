$(function () {
    var user_id = sessionStorage.getItem('info');
    console.log(user_id)
    $.ajax({
        url: "http://127.0.0.1:8000/api/social/rcmd_users",
        type: 'get',
        dataType: 'json',
        xhrFields: {withCredentials: true},
        success: function (res) {
            console.log(res)
            if (res['code'] == 0) {
                console.log(get_age(res['data'][0]['birthday']))
                var data = res['data']

                var html_str = ''
                for (var i = 0; i < data.length; i++) {
                    var str = '<p class="rcmd_users" >' +
                        '                   <img class="icon"' +
                        '                        src="' + data[i]['avatar'] + '"' +
                        '                        alt="">' +
                        '                    <span class="name">' + data[i]['nickname'] + '</span>' +
                        '                    <span class="age">' +get_age(data[i]['birthday']) + '岁</span>' +
                        '            <span style="display: none;">'+data[i]['id']+'</span></p>'

                    html_str += str
                }
                // console.log(html_str)
                $('#users').prepend(html_str)
                // $('#users').children('p:last-child').style.marginBottom ='100px'
                $('#users p:last-child')[0].style.marginBottom = "100px"
                info();
            }


        }
    });
//    发起请求，获取推荐的用户
//    假设下面 data是获取的用户：头像、用户名、年龄
//     var data = [
//         {
//             'src': 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1107263072,1224997471&fm=26&gp=0.jpg',
//             'name': '天下无贼', 'age': 21
//         },
//         {
//             'src': 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3743111107,1940472030&fm=111&gp=0.jpg',
//             'name': '人在江湖', 'age': 22
//         },
//         {
//             'src': 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1306607258,967818222&fm=111&gp=0.jpg',
//             'name': '无敌', 'age': 25
//         },
//         {
//             'src': 'http://img2.imgtn.bdimg.com/it/u=2076373339,2173673275&fm=26&gp=0.jpg',
//             'name': '张无忌', 'age': 41
//         },
//         {
//             'src': 'http://img3.imgtn.bdimg.com/it/u=1152472852,1674093815&fm=26&gp=0.jpg',
//             'name': '韩信', 'age': 28
//         },
//         {
//             'src': 'http://img0.imgtn.bdimg.com/it/u=1856003585,2483764583&fm=11&gp=0.jpg',
//             'name': '赵云', 'age': 21
//         },
//         {
//             'src': 'http://img3.imgtn.bdimg.com/it/u=843732181,1717235150&fm=11&gp=0.jpg',
//             'name': '葵花宝典', 'age': 24
//         },
//         {
//             'src': 'http://img4.imgtn.bdimg.com/it/u=1478607241,116367429&fm=26&gp=0.jpg',
//             'name': '乾坤大挪移', 'age': 23
//         },
//         {
//             'src': 'http://img1.imgtn.bdimg.com/it/u=4088880661,1992564448&fm=11&gp=0.jpg',
//             'name': '秀润发', 'age': 17
//         },
//         {
//             'src': 'http://img2.imgtn.bdimg.com/it/u=3859800586,1907430584&fm=26&gp=0.jpg',
//             'name': '公孙离', 'age': 18
//         },
//         {
//             'src': 'http://img4.imgtn.bdimg.com/it/u=2436369410,2358044874&fm=11&gp=0.jpg',
//             'name': '法师', 'age': 12
//         },
//         {
//             'src': 'http://img0.imgtn.bdimg.com/it/u=3228116259,4263549157&fm=11&gp=0.jpg',
//             'name': '误伤', 'age': 24
//         },
//         {
//             'src': 'http://img2.imgtn.bdimg.com/it/u=1354268575,1268995723&fm=26&gp=0.jpg',
//             'name': '你好看哦', 'age': 21
//         },
//         {
//             'src': 'http://img5.imgtn.bdimg.com/it/u=65875722,3999159125&fm=11&gp=0.jpg',
//             'name': '无心师', 'age': 34
//         },
//         {
//             'src': 'http://img5.imgtn.bdimg.com/it/u=65875722,3999159125&fm=11&gp=0.jpg',
//             'name': '块后啊', 'age': 20
//         },
//         {
//             'src': 'http://img2.imgtn.bdimg.com/it/u=1306607258,967818222&fm=11&gp=0.jpg',
//             'name': '怎嘛底数', 'age': 19
//         },
//     ]
//     var html_str = ''
//     for (var i = 0; i < data.length; i++) {
//         console.log(data[i])
//         var str = '<p class="rcmd_users" >' +
//             '                   <img class="icon"' +
//             '                        src="' + data[i]['src'] + '"' +
//             '                        alt="">' +
//             '                    <span class="name">' + data[i]['name'] + '</span>' +
//             '                    <span class="age">' + data[i]['age'] + '岁</span>' +
//             '            </p>'
//         html_str += str
//     }
//     // console.log(html_str)
//     $('#users').prepend(html_str)
//     // $('#users').children('p:last-child').style.marginBottom ='100px'
//     $('#users p:last-child')[0].style.marginBottom = "100px"
//     info();

});

function get_age(start_date) {
    var today = new Date();
    var end_year = today.getFullYear();
    var start_year = Number(start_date.split('-')[0]);
    var age = end_year - start_year;
    return age
}

function info() {
    $('.rcmd_users').click(function () {
        //    发起ajax请求
        var rcmd_id = $(this).find('span:eq(2)').text()

        sessionStorage.setItem('rcmd_id', rcmd_id)
        console.log(rcmd_id)


        // localStorage.setItem()
        location.href = 'info.html'
    })
}