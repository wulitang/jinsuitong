var laytpl    = '',
	postUrl   = 'http://192.168.0.102',
	imgUrl    = 'http://file.serv.cq196.cn:10000/',
	addrId    = 0,
<<<<<<< HEAD
	orderData = [];
layui.use('laytpl', function(){
	laytpl = layui.laytpl;
=======
	spm       = '',
	layer     = '',
	wx        = 0,
	orderData = [];
layui.use(['laytpl','layer'], function(){
	laytpl = layui.laytpl;
	 layer = layui.layer;
>>>>>>> c21a84be432ecea0d1155aeac354ae8ef2db48a5
	  //使用方式跟独立组件完全一样
	tplComment();
	
}); 

$('.search-btn').click(function(){
	var key = $('.search-input').val();
		if(key){
			window.location.href = 'list.html?searchKey='+key;
		}else{
			window.location.href = 'list.html';
		}
})
function tplComment(){//评论
<<<<<<< HEAD
	var spm   = getUrlParam('spm');
=======
		spm   = getUrlParam('spm');
>>>>>>> c21a84be432ecea0d1155aeac354ae8ef2db48a5
	var data  = JSON.parse($.session.get(spm));
	if(data.list.length<1){
		e404();return;
	}
	if(data.type==1){
		if(!data.list.id){
			e404();return;
		}
		if(!data.list.goodsName){
			e404();return;
		}
		if(!data.list.gooosImg){
			e404();return;
		}
		if(!data.list.productNumber){
			e404();return;
		}
		orderData = {
			'product_id':data.list.id,
			'type':1,
			'skuId':data.list.sukId,
			'productAtter':data.list.snk,
			'productNumber':data.list.productNumber,
			'productName':data.list.goodsName,
			'priceImg':data.list.gooosImg
		}
		tplOrderPay([data.list]);
		tplAddrView();
	}else{
		
	}
}

function tplAddrView(){
	$.ajax({
        url: postUrl+"/address/getEasyBuyList.json",
        dataType: 'jsonp',
        method: 'POST',
        data: {
        	 method: 'POST',
             jst:'jstm.20170004502312366.yj',
             member_id:7
        },
        jsonp: 'callback',
        async: false,    //或false,是否异步
        timeout: 5000,    //超时时间
        success: function (data) {
        	if(data.data){
        		addrId = data.data[0]['addressId'];
        		orderData['ordershippingId'] = addrId;
        		var getTpl = address.innerHTML;
        		laytpl(getTpl).render(data.data, function(html){
        			addressView.innerHTML = html;
        		});
        		pay();
        	}
        },
        error: function () {
            console.log('请求错误');
        }
    });
}
$('#addressView').on('click','.check',function(){ //选择地址
	$('#addressView .check').removeClass('checked');
	$(this).addClass('checked');
	addrId = $(this).attr('data-id');
	orderData['ordershippingId'] = addrId;
	$('.balance .pay-btn').css('background','#ee692c');
	$('.balance .pay-btn').addClass('order-pay');
})

<<<<<<< HEAD
=======
$('.balance').on('click','.order-pay',function(){
	var invoiceType    = $('.category option:selected').val(),
		invoiceHeader  = $('input[name="invoiceHeader"]').val(),
		buyerMessage   = $('textarea[name="buyerMessage"]').val(),
		channel        = $('.clearfix .active').attr('data-pay');
		orderData['invoiceType']   = invoiceType?invoiceType:'';
		orderData['invoiceHeader'] = invoiceHeader?invoiceHeader:'';
		orderData['buyerMessage']  = buyerMessage?buyerMessage:'';
		orderData['channel']       = channel;
		orderData['member_id']     = 7;
		orderData['method']        = 'POST';
		orderData['jst']           = 'jstm.20170004502312366.yj';
		$.ajax({
	        url: postUrl+"/order/order_Pay.json",
	        dataType: 'jsonp',
	        method: 'POST',
	        data: orderData,
	        jsonp: 'callback',
	        async: false,    //或false,是否异步
	        timeout: 5000,    //超时时间
	        beforeSend: function(){
	        	layer.load(1,{shade: [0.5, '#393D49']});
        	},
	        success: function (data) {
	        	/*$.session.remove(spm);
	        	orderData = [];*/
	        	if(channel=='wechat_csb'){ //微信
	        		$("#code").empty();
	        		var str = toUtf8(data.data.charge.credential.wechat_csb.qr_code);
	        		$("#code").qrcode({
	        			render: "table",
	        			width: 300,
	        			height:300,
	        			text: str
	        		});
	        		wx = layer.open({
		        			  type: 1,
		        			  skin:'weixinPay',
		        			  area: ['400px', '400px'],
		        			  title:'微信扫码支付',
		        			  content: $("#idCode").html(), //这里content是一个普通的String
		        			  cancel: function(index, layero){
		        				  tipAlert();
		        			  }    
        				});
	        		timer(data.data.orderNumber); //定时器
	        	}else if(channel=='alipay_web'){ //支付宝
	        		newWin(data.data.charge.credential.alipay_web.orderInfo);
	        		tipAlert();
	        	}else if(channel=='lakala_web'){//拉卡拉
	        		var form = data.data.charge.credential.lakala_web;
	        			$("#orderPayForm").html(form);
	        			$("#orderPayForm form").attr('target','_blank');
	        			$("#orderPayForm form").submit();
	        			tipAlert();
	        	}else if(channel=='lakala_web_fast'){//快捷
	        		var form = data.data.charge.credential.lakala_web_fast;
	        			$("#orderPayForm").html(form);
	        			$("#orderPayForm form").attr('target','_blank');
	        			$("#orderPayForm form").submit();
	        			tipAlert();
	        	}
	        },
	        error: function () {
	            console.log('请求错误');
	        },
	        complete:function(){
	        	layer.closeAll('loading');
	        }
	    });
})

function timer(order){
	var witch=1;
		setTimeout(function() {
			$.ajax({
		        url: postUrl+"/Index/test.html",
		        dataType: 'jsonp',
		        method: 'POST',
		        data: {
		        	 method: 'POST',
		             jst:'jstm.20170004502312366.yj',
		             member_id:7
		        },
		        jsonp: 'callback',
		        async: false,    //或false,是否异步
		        timeout: 5000,    //超时时间
		        success: function (data) {
		        	if(data.code==200){
		        		tipAlert();
		        	}else{
		        		timer();
		        	}
		        },
		        error: function () {
		        	timer();
		        }
		    });
	    }, 2000);
}

function tipAlert(){
	layer.closeAll();
	layer.open({
		  type: 1, 
		  title:'支付信息'
		  area: ['500px', '300px'],
		  content: '支付成功' //这里content是一个普通的String
	});
}
function newWin(url) {   
      var a = document.createElement('a');    
      a.setAttribute('href', url);  
      a.setAttribute('style', 'display:none');    
      a.setAttribute('target', '_blank');    
      document.body.appendChild(a);  
      a.click();  
      a.parentNode.removeChild(a);   
      return ;
}
>>>>>>> c21a84be432ecea0d1155aeac354ae8ef2db48a5
function settlement(){
	var price = 0;
	var yf    = 0;
	$('#orderPayView .clearfix price').each(function(){
		var p  = parseFloat($(this).attr('data-price')),
			y  = parseFloat($(this).attr('data-yf')),
			n  = parseInt($(this).attr('data-number'));
		price = price+((p*n)+y)
		yf    = yf+y;
	});
	$('.balance .freight').html("￥"+formatCurrency(yf));
	$('.balance .total').html("￥"+formatCurrency(price));
}
function pay(){
	if(!addrId){
<<<<<<< HEAD
		$('.balance .pay-btn').css('background','#ccc');
=======
		$('.balance .pay-btn').css({'background':'#ccc','cursor':'no-drop'});
>>>>>>> c21a84be432ecea0d1155aeac354ae8ef2db48a5
	}else{
		$('.balance .pay-btn').addClass('order-pay');
	}
}
function tplOrderPay(data){
	var data=data?data:'';
	var getTpl = orderPay.innerHTML;
	laytpl(getTpl).render(data, function(html){
		orderPayView.innerHTML = html;
	});
	settlement();
}

<<<<<<< HEAD
=======
function toUtf8(str) {   
    var out, i, len, c;   
    out = "";   
    len = str.length;   
    for(i = 0; i < len; i++) {   
    	c = str.charCodeAt(i);   
    	if ((c >= 0x0001) && (c <= 0x007F)) {   
        	out += str.charAt(i);   
    	} else if (c > 0x07FF) {   
        	out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));   
        	out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));   
        	out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    	} else {   
        	out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));   
        	out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    	}   
    }   
    return out;   
}  
>>>>>>> c21a84be432ecea0d1155aeac354ae8ef2db48a5
//404
function e404(){
	alert('数据不存在');
}
function formatCurrency(num) {    
    num = num.toString().replace(/\$|\,/g,'');    
    if(isNaN(num))    
    num = "0";    
    sign = (num == (num = Math.abs(num)));    
    num = Math.floor(num*100+0.50000000001);    
    cents = num%100;    
    num = Math.floor(num/100).toString();    
    if(cents<10)    
    cents = "0" + cents;    
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)    
    num = num.substring(0,num.length-(4*i+3))+','+    
    num.substring(num.length-(4*i+3));    
    return (((sign)?'':'-') + num + '.' + cents);    
}   

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = decodeURIComponent(window.location.search).substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}
