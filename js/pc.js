$(function () {
    // //获取用户信息JSON.stringify(obj)将JSON转为字符串。JSON.parse(string)将字符串转为JSON格式；
    // if($.session.get('usermessage')){
    //     var data = JSON.parse($.session.get('usermessage'));
    //     console.log(data);
    // }else {
    //
    // }

    //下载页关闭弹窗
    $(".success span").click(function () {
        $(".windows").hide();
    });
    //是否阅读协议
    $(".detail i").click(function () {
        $(this).toggleClass("active");
    });
    //选择缴费产品
    $(".choose-list li").click(function () {
        $(this).addClass("active").siblings().removeClass('active');
    });
    //选择支付方式
    $(".pay-way div").click(function () {
        $(this).addClass("active").siblings().removeClass('active');
    });
    //选择快递方式
    $(".ems-way li").click(function () {
        $(this).addClass("active").siblings().removeClass('active');
    });
});
layui.use(['laytpl','laypage'], function(){
    laytpl = layui.laytpl;
    laypage= layui.laypage;
    //使用方式跟独立组件完全一样
    //获取用户信息JSON.stringify(obj)将JSON转为字符串。JSON.parse(string)将字符串转为JSON格式；
    if($.session.get('usermessage')){
        var data = JSON.parse($.session.get('usermessage'));
        /*var getTpl = welcomeData.innerHTML;*/
        var getTpl = welcomeDataInnerHTML();
        laytpl(getTpl).render(data, function (html) {
            welcomeBox.innerHTML = html;
        });
    }else {
        var data = [];
        var getTpl = welcomeData.innerHTML;
        laytpl(getTpl).render(data, function (html) {
            welcomeBox.innerHTML = html;
        });
    }
    $("#welcomeBox").on('click','.login-out',function () {
        $.ajax({
            url: "http://192.168.0.102/persion/sign_out.json",
            dataType: 'jsonp',
            method: '',
            data: {
                method: 'get',
            },
            jsonp: 'callback',
            async: false,    //或false,是否异步
            timeout: 5000,    //超时时间
            success: function (data) {
                $.session.clear();
                location.href='index.html'
            },
            error: function () {
                console.log('请求错误');
            }
        });
        
    });
});

function welcomeDataInnerHTML(){
	return '<div class="ke-grid">'+
			    '<p class="over">欢迎光临金<em><a href="index.html">穗通官网</a></em></p>'+
			    '<div class="index-right fr">'+
			        '{{# if(d.userName){}}'+
			        '<a href="person.html">{{d.userName}}</a>|<a class="login-out" href="javascript:;">退出</a>|<a href="my-order.html">我的订单</a>|<a href="my-message.html?pageNow=1&pageSize=5">消息</a>'+
			        '{{# } else { }}'+
			        '<a href="login.html">登录</a>|<a href="register.html">注册</a>'+
			        '{{# } }}'+
			    '</div>'+
			'</div>';
}