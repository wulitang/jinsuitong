var usermessage = $.session.get('usermessage')?JSON.parse($.session.get('usermessage')):'';
var member_id = usermessage.USER_ID?usermessage.USER_ID:0;
head();
function head(){
	var head = '';
		if(usermessage){
			head += '<!--顶部-->'+
			'<div class="top clearfix">'+
			    '<div class="con top-con">'+
			    	'<span class="fl">欢迎光临<em>金税通官网</em></span>'+
			        '<span class="fr"><a href="/person/index.html">'+usermessage.userName+'</a>|<a class="login-out" href="javascript:outLogin()">退出</a>|<a href="/person/index.html">我的订单</a>|<a href="/person/my-message.html">消息</a></span>'+
			    '</div>'+
			'</div>';
		}else{
			head += '<!--顶部-->'+
					'<div class="top clearfix">'+
					    '<div class="con top-con">'+
					        '<span class="fl">欢迎光临<em>金税通官网</em></span>'+
					        '<span class="fr"><a href="/login.html">登录</a>|<a href="/register.html">注册</a></span>'+
					    '</div>'+
					'</div>';
		}
		
		head +='<!--商城头部-->'+
				'<div class="mall-top">'+
				    '<div class="con clearfix">'+
				        '<a href="/"><img src="img/logo.png" class="logo fl"></a>'+
				        '<div class="fr logo-right">'+
				            '<input type="text" placeholder="请输入关键词" class="search-input">'+
				            '<input type="submit" class="search-btn" value="">'+
				            '<a class="shop-cart" href="cart.html">我的购物车<!-- （0） --></a>'+
				        '</div>'+
				    '</div>'+
				    '<div class="two-block con">'+
				        '<span class="all-classify">全部分类</span>'+
				        '<a href="">商城首页</a>'+
				    '</div>'+
				'</div>';
	$('#head').html(head);
}

function outLogin(){
	var data       = request('/persion/sign_out.json',{},'GET');
	$.session.remove('usermessage');
	window.location.href = '/shop/index.html';
}