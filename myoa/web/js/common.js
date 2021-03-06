/**
 * Created by Administrator on 2017/6/19.
 */
function show_date() {
    var week = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
    t = setInterval(function () {
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        var h = date.getHours();
        var i = date.getMinutes();
        var s = date.getSeconds();
        var w = date.getDay();
        var str = y + '年' + check_time(m) + '月' + check_time(d) + '日 ' + check_time(h) + '时' + check_time(i) + '分' + check_time(s) + '秒 ' + week[w];
        $('#clock').html(str);
    },1000);
}
/*格式化前导零*/
function check_time(i) {
    var num;
    if(i<10) {
        num = '0' + i;
    }else {
        num = i;
    }
    return num;
}
/*时钟显示*/
show_date();
/*修改密码*/
function alter_passwd(url) {
    layer.prompt({title:'请输入旧密码',formType:1},function(oldPass,index){
        $.ajax({
            url:url,
            type:'post',
            data:{passwd:oldPass,type:0},
            success:function(msg){
                if(msg.status){
                    layer.close(index);
                    layer.prompt({title:'请输入新密码',formType:1},function(newPass,index){
                        console.log(newPass.length);
                        if(newPass.length<6 && newPass.length > 18) {
                            layer.msg('密码不能少于6位或大于18位',{anim:6});
                            return false;
                        }
                        if(newPass == oldPass) {
                            layer.msg('与旧密码相同，未修改', {anim:6});
                            return false;
                        }
                        $.ajax({
                            url:url,
                            type:'post',
                            data:{passwd:newPass,type:1},
                            success:function(msg){
                                layer.close(index);
                                if(msg.status){
                                    layer.msg(msg.msg,{anim:1});
                                    window.location.href = msg.url;
                                }else {
                                    layer.msg(msg.msg,{anim:6});
                                }
                            }
                        });
                    });
                }else {
                    layer.msg(msg.msg,{anim:6});
                }
            }
        });
    });
}
/*增加分类*/
function add_cate(url) {
    layer.prompt({title:'请输入分类名称'}, function(text, index) {
        $.ajax({
            url:url,
            type:'post',
            data:{name:text},
            success:function (msg) {
                if(msg.status) {
                    layer.msg(msg.msg);
                    window.location.reload();
                }else {
                    layer.msg(msg.msg, {anim:6});
                }
            }
        });
    });
}
/*返回顶部*/
var main_navbar_height = $('#main_navbar').height();
$(window).scroll(function () {
    var scroll = $(this).scrollTop();
    if(scroll > main_navbar_height) {
        $('.back-to-top').fadeIn();
    }else {
        $('.back-to-top').fadeOut();
    }
});
$('.back-to-top').on('click', function () {
    $('html,body').animate({'scrollTop': 0}, 300);
});