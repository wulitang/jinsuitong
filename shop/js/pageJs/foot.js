var postUrl   = 'http://192.168.0.102';
$.ajax({
    url: postUrl+"/hepl/O2Ohelp.json",
    dataType: 'jsonp',
    method: 'get',
    data: {
    	method:'get'
    },
    jsonp: 'callback',
    async: false,    //或false,是否异步
    timeout: 5000,    //超时时间
    success: function (data) {
    	var html = footHtml(data.data);
    	$('#footView').html(html);
    },
    error: function () {
        console.log('请求错误');
    }
});
function footHtml(data){
	var html = '<div class="con con-bottom">'+
				    '<ul class="clearfix ensure">'+
					    '<li class="fl"><img class="fl" src="img/zpbz-footer.png"><div class="fl"><h4>正品保障</h4><p>正品行货，100%质量保证</p></div></li>'+
					    '<li class="fl"><img class="fl" src="img/jsps-footer.png"><div class="fl"><h4>极速配送</h4><p>下单24小时内立即发货</p></div></li>'+
					    '<li class="fl"><img class="fl" src="img/wyth-footer.png"><div class="fl"><h4>无忧退货</h4><p>无忧售后，7日无理由退换</p></div></li>'+
					    '<li class="fl"><img class="fl" src="img/wxbz-footer.png"><div class="fl"><h4>维修保障</h4><p>官方授权，全国联保</p></div></li>'+
				    '</ul>'+
				    '<ul class="bottom-link">';
						if(data){
							$.each(data,function(index,item){
								html +='<li class="fl"><h4>'+item.helpclassName+'</h4>';
									        $.each(item.helpClasssTwo,function(k,v){
									        	html +='<a href="content.html?helpclassId='+v.id+'">'+v.helpclassName+'</a>';
									        })
								html +='</li>';
							});
						}
		html    +=	'</ul>';
		html    +=  '<div class="contact fl">'+
					    '<span class="tel">400-123-1234</span>'+
					    '<span class="work-time">周一至周五 09:00-18:00</span>'+
					    '<img src="img/wx.png">'+
					    '<img src="img/qq.png">'+
					    '<img src="img/wb.png">'+
					'</div>'+
					'<div class="ewm fl">'+
					    '<img src="img/ewm.png">'+
					    '<p>微信二维码</p>'+
					'</div>'+
				'</div>'+
				'<div class="footer">'+
					'<div class="link-box">'+
					    '<div class="footer-link">'+
					        '<a href="">关于我们</a>'+
					        '<a href="">服务介绍</a>'+
					        '<a href="">新闻动态</a>'+
					        '<a href="">招聘信息</a>'+
					        '<a href="">税务服务</a>'+
					    '</div>'+
					'</div>'+
					'<div class="company-info">'+
					    '<p>重庆远见金税通信息系统技术有限公司</p>'+
					    '<p>邮箱：123456789@qq.com</p>'+
					    '<p>地址：重庆北部新区人和街道镜泊中路5号 </p>'+
					'</div>'+
					'<p class="filing">Copyright©2012-2013 GOTax.cn 渝ICP备13003631号-6  渝公网备：50019002500539</p>'+
				'</div>';
		return html;
}