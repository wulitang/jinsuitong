var laytpl    = '',
    postUrl   = 'http://192.168.0.102',
    imgUrl    = 'http://file.serv.cq196.cn:10000/',
    addrId    = 0,
    spm       = '',
    layer     = '',
    wx        = 0,
    orderData = [];
var witch     =1;
layui.use(['laytpl','layer'], function(){
    laytpl = layui.laytpl;
    layer = layui.layer;
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
    spm   = getUrlParam('spm');
    if(!$.session.get(spm)){
        e404();return;
    }
    var data  = JSON.parse($.session.get(spm));
    if(!data){
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
        if(!data.ids){
            e404();return;
        }
        orderData = {
            'type':2,
            'cart_Ids':data.ids,
        }
        tplAddrView();
        var data = request('/order/shopping_order.json',{jst:'jstm.20170004502312366.yj',member_id:member_id,cart_Ids:data.ids},'POST');
        if(!data.data){
            if(!data.data.shoppingCartByList){
                e404();return;
            }
        }
        tplCartPay(data.data.shoppingCartByList);
    }
}

function tplAddrView(){
	pay();
	var data = request('/address/getEasyBuyList.json',{jst:'jstm.20170004502312366.yj',member_id:member_id},'POST');
	if(data.data){
        addrId = data.data[0]['addressId'];
        orderData['ordershippingId'] = addrId;
        var getTpl = address.innerHTML;
        laytpl(getTpl).render(data.data, function(html){
            addressView.innerHTML = html;
        });
        pay();
    }
}
$('#addressView').on('click','.check',function(){ //选择地址
    $('#addressView .check').removeClass('checked');
    $(this).addClass('checked');
    addrId = $(this).attr('data-id');
    orderData['ordershippingId'] = addrId;
    $('.balance .pay-btn').css('background','#ee692c');
    $('.balance .pay-btn').addClass('order-pay');
})

$('.balance').on('click','.order-pay',function(){
	$(this).removeClass('order-pay');
	$('.balance .pay-btn').css({'background':'#ccc','cursor':'no-drop'});
    var invoiceType    = $('.category option:selected').val(),
        invoiceHeader  = $('input[name="invoiceHeader"]').val(),
        buyerMessage   = $('textarea[name="buyerMessage"]').val(),
        channel        = $('.clearfix .active').attr('data-pay');
    orderData['invoiceType']   = invoiceType?invoiceType:'';
    orderData['invoiceHeader'] = invoiceHeader?invoiceHeader:'';
    orderData['buyerMessage']  = buyerMessage?buyerMessage:'';
    orderData['channel']       = channel;
    orderData['member_id']     = member_id;
    orderData['method']        = 'POST';
    orderData['jst']           = 'jstm.20170004502312366.yj';
    var data = request('/order/order_Pay.json',orderData,'POST');
	if(data.code==200){
		$.session.remove(spm);
        orderData = [];
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
                	witch = 2;
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
	}else{
		pay();
	}
})

function timer(order){
    if(witch==1){
    	setTimeout(function() {
    		var data = request('/api/payorder/payweixin.json',{jst:'jstm.20170004502312366.yj',orderNumber:order},'POST');
    		if(data.code==200){
    			if(witch==1){
            		tipAlert();
            		witch = 2;
            	}
    		}else{
    			timer(order);
    		}
        }, 2000);
    }
}
function tipAlert(){
    layer.closeAll();
    var html = '<div class="pop-info">'+
        '<div class="nav">请在您新打开的页面上完成付款。</div>'+
        '<div class="text">'+
        '<p>完成付款后请根据您的情况点击下面的按钮。</p>'+
        '</div>'+
        '<div class="btn"><a id="popPayConfirmLink" href="" class="ok paySuccess">已完成支付</a><a href="" class="qx">付款遇到问题</a></div>'+
        '</div>';
    layer.open({
        type: 1,
        title:'确认提示',
        skin:'payTip',
        area: ['330px', '200px'],
        content: html //这里content是一个普通的String
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
        $('.balance .pay-btn').css({'background':'#ccc','cursor':'no-drop'});
    }else{
    	$('.balance .pay-btn').css({'background':'#ee692c','cursor':'pointer'});
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
function tplCartPay(data){
    var data=data?data:'';
    var getTpl = cartPay.innerHTML;
    laytpl(getTpl).render(data, function(html){
        orderPayView.innerHTML = html;
    });
    settlement();
}

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
//404
function e404(){
	window.location.href='/404.html';
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

