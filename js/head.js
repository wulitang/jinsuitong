var usermessage = $.session.get('usermessage')?JSON.parse($.session.get('usermessage')):'';
welcomeBox();
menuNav();
/************顶部登录信息*************/
function welcomeBox(){
	 var data   = usermessage
	 var getTpl = welcomeData();
	 layui.use('laytpl', function () {
		var laytpl = layui.laytpl;
			laytpl(getTpl).render(data, function (html) {
		         //welcomeBox.innerHTML = html;
		         $('#welcomeBox').html(html);
		    });
	 });
}
function welcomeData(){
	return '<div class="ke-grid">'+
			    '<p class="over">欢迎光临金<em><a href="index.html">穗通官网</a></em></p>'+
			    '<div class="index-right fr">'+
			        '{{# if(d.userName){}}'+
			        '<a href="person.html">{{d.userName}}</a>|<a class="login-out" href="javascript:;">退出</a>|'+
			        '<a href="my-order.html">我的订单</a>|'+
			        '<a href="my-message.html?pageNow=1&pageSize=5">消息</a>'+
			        '{{# } else { }}'+
			        '<a href="login.html">登录</a>|<a href="register.html">注册</a>'+
			        '{{# } }}'+
			    '</div>'+
			'</div>';
}

/************************导航菜单***********************/
function menuNav(){
	 var html ='<div class="ke-grid">'+
			     '<div class="index-logo"><a href="index.html"><img src="img/logo.png"></a></div>'+
			     '<ul class="index-menu">'+
			         '<li class="active"><a href="index.html">首页</a></li>'+
			         '<li><a href="about.html">关于我们</a></li>'+
			         '<li><a href="news.html">新闻动态</a></li>'+
			         '<li><a href="download.html">下载中心</a></li>'+
			         '<li><a href="/shop/index.html">商城</a></li>'+
			         '<li><a href="payment.html">服务缴费</a></li>'+
			     '</ul>'+
			     '<div class="top-phone">服务热线:<em>400-123-1234</em></div>'+
			 '</div>';
	 $('#menuNav').html(html);
}

//格式化时间
function getLocalTime(nS) {
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ');
}
