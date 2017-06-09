if (!$.session.get('usermessage')){
    location.href="login.html";
}
layui.use('laytpl', function() {
    laytpl = layui.laytpl;
    var data = JSON.parse($.session.get('usermessage'));
    //var getTpl = personData.innerHTML;
    var getTpl = personData();
    laytpl(getTpl).render(data, function (html) {
        personBox.innerHTML = html;
    });
    personNav();
});
function personData(){
	return '<div class="ke-grid">'+
			    '<img src="img/person.png">'+
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
	var html = '<ul class="person-left fl">'+
				    '<li class="person-left-title">'+
				    '<span>交易管理</span>'+
				'</li>'+
				'<li>'+
				    '<a href="person.html">我的订单</a>'+
				'</li>'+
				'<li class="active">'+
				    '<a href="downloadhistory.html?&pageNow=1&pageSize=10">下载记录</a>'+
				'</li>'+
				'<li>'+
				    '<a href="buyhistory.html?pageNow=1&pageSize=10">购买记录</a>'+
				'</li>'+
				'</ul>'+
				'<ul class="person-left fl">'+
				'<li class="person-left-title">'+
				    '<span>账户管理</span>'+
				'</li>'+
				'<li>'+
				    '<a href="person-message.html">个人信息</a>'+
				'</li>'+
				'<li>'+
				    '<a href="safe-center.html">安全中心</a>'+
				'</li>'+
				'<li>'+
				    '<a href="my-address.html">收货地址</a>'+
				'</li>'+
				'<li>'+
				    '<a href="my-message.html?pageNow=1&pageSize=5">我的消息</a>'+
				'</li>'+
				'</ul>';
	$("#personNav").html(html);
}