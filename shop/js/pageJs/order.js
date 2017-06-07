var laytpl    = '',
	postUrl   = 'http://192.168.0.102',
	imgUrl    = 'http://file.serv.cq196.cn:10000/',
	addrId    = 0,
	orderData = [];
layui.use('laytpl', function(){
	laytpl = layui.laytpl;
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
	var spm   = getUrlParam('spm');
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
		$('.balance .pay-btn').css('background','#ccc');
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
