var laytpl    = '',
	postUrl   = 'http://192.168.0.102',
	imgUrl    = 'http://file.serv.cq196.cn:10000/';
	orderData = [];
layui.use('laytpl', function(){
	laytpl = layui.laytpl;
	  //使用方式跟独立组件完全一样
	$.ajax({
        url: postUrl+"/cart/cartlist.json",
        dataType: 'jsonp',
        method: 'POST',
        data: {
            method: 'POST',
            member_id:7
        },
        jsonp: 'callback',
        async: false,    //或false,是否异步
        timeout: 5000,    //超时时间
        success: function (data) {
        	tplShopList(data.data);
        },
        error: function () {
            console.log('请求错误');
        }
    });
	
}); 

$('.search-btn').click(function(){
	var key = $('.search-input').val();
	if(key){
		window.location.href = 'list.html?searchKey='+key;
	}else{
		window.location.href = 'list.html';
	}
})
$('#shopListView').on('click','.clearfix .check',function(){
	$(this).hasClass('checked')?$(this).removeClass('checked'):$(this).addClass('checked');
	if($('#shopListView .checked').length>0){
		$('.all-check').addClass('checked');
		$('.pay-btn').addClass('submit');
		$('.pay-btn').css({'background':'#ee692c','cursor':'pointer'});
	}else{
		$('.all-check').removeClass('checked');
		$('.pay-btn').removeClass('submit');
		$('.pay-btn').css({'background':'#a7a7a7','cursor':'no-drop'});
	}
	settlement();
})
$('#shopListView').on('click','.clearfix .num .reduce',function(){
	var _this    = $(this);
	var numinput = parseInt($(this).parent('.num').find('.num-input').val()),
		cartId   = $(this).parents('.clearfix').find('i').attr('data-id');
		if(numinput>1){
			$.ajax({
		        url: postUrl+"/cart/updatecartitem.json",
		        dataType: 'jsonp',
		        method: 'POST',
		        data: {
		            method: 'POST',
		            cartId: cartId,
		            productNumber:numinput-1
		        },
		        jsonp: 'callback',
		        async: false,    //或false,是否异步
		        timeout: 5000,    //超时时间
		        success: function (data) {
		        	_this.parent('.num').find('.num-input').val(numinput-1)
		        	editGoodsNum(_this,numinput-1);
		        },
		        error: function () {
		            console.log('请求错误');
		        }
		    });
		}
})
$('#shopListView').on('click','.clearfix .num .add',function(){
	var _this    = $(this);
	var numinput = parseInt($(this).parent('.num').find('.num-input').val()),
		cartId   = $(this).parents('.clearfix').find('i').attr('data-id');
	var max      = $(this).attr('data-stock');
	if(numinput==max || numinput>max){
		return ;
	}
	$.ajax({
        url: postUrl+"/cart/updatecartitem.json",
        dataType: 'jsonp',
        method: 'POST',
        data: {
            method: 'POST',
            cartId: cartId,
            productNumber:numinput+1
        },
        jsonp: 'callback',
        async: false,    //或false,是否异步
        timeout: 5000,    //超时时间
        success: function (data) {
        	_this.parent('.num').find('.num-input').val(numinput+1)
        	editGoodsNum(_this,numinput+1);
        },
        error: function () {
            console.log('请求错误');
        }
    });
})
$('#shopListView').on('click','.operate',function(){ //删除购物车
	delCart($(this).parents('li').find('i').attr('data-id'));	
})

$('.balance .empty').click(function(){
	var ids = '';
	$('#shopListView .checked').each(function(i,v){
		ids +=i==0?$(this).attr('data-id'):','+$(this).attr('data-id');
	})
	delCart(ids);
})

function delCart(ids){
	if(!ids){
		return '';
	}
	$.ajax({
        url: postUrl+"/cart/delcart.json",
        dataType: 'jsonp',
        method: 'POST',
        data: {
            method: 'POST',
            cartIds: ids,
        },
        jsonp: 'callback',
        async: false,    //或false,是否异步
        timeout: 5000,    //超时时间
        success: function (data) {
        	history.go(0);
        },
        error: function () {
            console.log('请求错误');
        }
    });  
}

function editGoodsNum(obj,numinput){
	var dj = obj.parents('.clearfix').find('.unit-price .dj').attr('data-price'),
		yf = obj.parents('.clearfix').find('.unit-price .yf').attr('data-yf');
	obj.parents('.clearfix').find('.price price').html(formatCurrency(parseFloat(dj*numinput)+parseFloat(yf)));
	settlement();
}

$('.all-check').click(function(){
	$(this).hasClass('checked')?$('.all-check').removeClass('checked'):$('.all-check').addClass('checked');
	if($(this).hasClass('checked')){
		$('#shopListView .clearfix .check').addClass('checked');
		$('.pay-btn').addClass('submit');
		$('.pay-btn').css({'background':'#ee692c','cursor':'pointer'});
	}else{
		$('#shopListView .clearfix .check').removeClass('checked');
		$('.pay-btn').removeClass('submit');
		$('.pay-btn').css({'background':'#a7a7a7','cursor':'no-drop'});
	}
	settlement();
})

function settlement(){ //结算价格
	var num   = 0;
		price = 0;
	$("#shopListView .clearfix .checked").each(function(){
		var p = $(this).parent('.clearfix').find('.price price').text();
		price =price+parseFloat(p.replace(',','')); 
		num   =num+parseInt($(this).parent('.clearfix').find('.num .num-input').val()); 
	})
	$('.balance .total').html('￥'+formatCurrency(price));
	$('.balance .cart-num em').html(num);
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

function tplShopList(data){
	var data=data?data:[];
	var getTpl = shopList.innerHTML;
	laytpl(getTpl).render(data, function(html){
		shopListView.innerHTML = html;
	});
	settlement();
}


//404
function e404(){
	alert('数据不存在');
}

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = decodeURIComponent(window.location.search).substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}
