var usermessage = $.session.get('usermessage')?JSON.parse($.session.get('usermessage')):'';
var imgUrl='http://file.serv.cq196.cn:10000/';
var memberId = '';
if (!usermessage){
    location.href="login.html";
}
welcomeBox();
personNav();
foot();
/************顶部登录信息*************/
function welcomeBox(){
	 var data   = usermessage?usermessage:[];
	 var getTpl = welcomeData();
	 var getUTpl= personData();
	 	memberId = data.USER_ID;
	 layui.use('laytpl', function () {
		var laytpl = layui.laytpl;
			laytpl(getTpl).render(data, function (html) {
		         $('#welcomeBox').html(html);
		    });
			laytpl(getUTpl).render(data, function (html) {
		         $('#personBox').html(html);
		    });
	 });
}
function welcomeData(){
	return '<div class="ke-grid">'+
			    '<p class="over">欢迎光临金<em><a href="index.html">穗通官网</a></em></p>'+
			    '<div class="index-right fr">'+
			        '{{# if(d.userName){}}'+
			        '<a href="/person/index.html">{{d.userName}}</a>|<a class="login-out" href="javascript:;">退出</a>|'+
			        '<a href="/person/my-order.html">我的订单</a>|'+
			        '<a href="/person/my-message.html?pageNow=1&pageSize=5">消息</a>'+
			        '{{# } else { }}'+
			        '<a href="login.html">登录</a>|<a href="register.html">注册</a>'+
			        '{{# } }}'+
			    '</div>'+
			'</div>';
}

function personData(){
	return '<div class="ke-grid">'+
			    '<img src="{{d.memberHeadimg?(imgUrl+d.memberHeadimg):"/img/person.png"}}">'+
			    '<div class="person-message fl">'+
			        '<div class="person-name">{{d.userName}}</div>'+
			        '<div class="person-safe">'+
			            '<span>账户安全：</span>'+
			            '<div class="safe-grade fl">'+
			                '<em style="width: {{d.accountGrade}}%"></em>'+
			            '</div>'+
			            '<!--<em>中级</em>-->'+
			        '</div>'+
			    '</div>'+
			    '<div class="check-sever fr">'+
			        '<a href="">服务费查询</a>'+
			        '<a href="">续费缴费</a>'+
			    '</div>'+
			'</div>';
}

function personNav(){
	pIndex=pIndex?pIndex:1;
	navIndex=navIndex?navIndex:1;
	var html = '<ul class="person-left fl">'+
				    '<li '+(pIndex==1?' class="person-left-title"':'')+'>'+
				    	'<span>交易管理</span>'+
					'</li>'+
					'<li '+(navIndex==1?'class="active"':'')+'>'+
					    '<a href="person.html">我的订单</a>'+
					'</li>'+
					'<li '+(navIndex==2?'class="active"':'')+'>'+
					    '<a href="downloadhistory.html">下载记录</a>'+
					'</li>'+
					'<li '+(navIndex==3?'class="active"':'')+'>'+
					    '<a href="buyhistory.html">购买记录</a>'+
					'</li>'+
				'</ul>'+
				'<ul class="person-left fl">'+
					'<li '+(pIndex==2?' class="person-left-title"':'')+'>'+
					    '<span>账户管理</span>'+
					'</li>'+
					'<li '+(navIndex==4?'class="active"':'')+'>'+
					    '<a href="person-message.html">个人信息</a>'+
					'</li>'+
					'<li '+(navIndex==5?'class="active"':'')+'>'+
					    '<a href="safe-center.html">安全中心</a>'+
					'</li>'+
					'<li '+(navIndex==6?'class="active"':'')+'>'+
					    '<a href="my-address.html">收货地址</a>'+
					'</li>'+
					'<li '+(navIndex==7?'class="active"':'')+'>'+
					    '<a href="my-message.html">我的消息</a>'+
					'</li>'+
				'</ul>';
	$("#personNav").html(html);
}

function foot(){
	var html = '<div class="ke-grid">'+
		        '<ul>'+
				    '<li> <a href="">关于我们</a> </li>'+
				    '<li> <a href="">服务介绍</a> </li>'+
				    '<li> <a href="">新闻动态</a> </li>'+
				    '<li> <a href="">招聘信息</a> </li>'+
				    '<li> <a href="">税务服务</a> </li>'+
				'</ul>'+
				'<p>重庆远见金税通信息系统技术有限公司</p>'+
				'<p>邮箱：123456789@qq.com</p>'+
				'<p>地址：重庆北部新区人和街道镜泊中路5号 </p>'+
				'</div>'+
				'<div class="person-foot-bottom">'+
				'<div class="ke-grid">Copyright©2012-2013 GOTax.cn 渝ICP备13003631号-6  渝公网备：50019002500539</div>'+
				'</div>';
	$("#foot").html(html);
}

//格式化时间
function getLocalTime(nS) {
  return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ');
}
//获取地址栏参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = decodeURIComponent(window.location.search).substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}