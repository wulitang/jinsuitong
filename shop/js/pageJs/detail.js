var laytpl    = '',
	postUrl   = 'http://192.168.0.102',
	imgUrl    = 'http://file.serv.cq196.cn:10000/';
	productId = getUrlParam('shopId'),
	suk       = [],
	sukId     = '';
	sukKey    = '';
	goodsName = '';
	gooosImg  = '';
	goodsNum  = 0;
	snk       = '';
	dprice    = 0;
	yf        = 0;
layui.use('laytpl', function(){
	laytpl = layui.laytpl;
	  //使用方式跟独立组件完全一样
	$.ajax({
        url: postUrl+"/product/item.json",
        dataType: 'jsonp',
        method: 'get',
        data: {
            method: 'get',
            jst:'jstm.20170004502312366.yj',
            product_id:productId
        },
        jsonp: 'callback',
        async: false,    //或false,是否异步
        timeout: 5000,    //超时时间
        success: function (data) {
        	if(!data.data){  //数据不存在
        		e404();
        		return '';
        	}
        	if(data.data.pruductPsukInfo){
        		$.each(data.data.pruductPsukInfo,function(i,v){
        			suk[v.propertiesAttr] = {"price":v.prPrice,'id':v.sukId,'number':v.prNumber};
        		})
        	}
        	tplCarousel(data.data.pictureTable);
        	tplDetail(data.data);
        	tplDelevantShop(data.data.relatedProducts);
        	tplShopInf(data.data.productDescribe);
        	tplcommentInfShop(data.data);
        },
        error: function () {
            console.log('请求错误');
        }
    });
	
	$.ajax({
        url: postUrl+"/product/comment_info.json",
        dataType: 'jsonp',
        method: 'get',
        data: {
            method: 'get',
            jst:'jstm.20170004502312366.yj',
            product_id:productId,
            pageNow:1,
            pageSize:15
        },
        jsonp: 'callback',
        async: false,    //或false,是否异步
        timeout: 5000,    //超时时间
        success: function (data) {
        	if(data.data){
        		if(data.data){
        			tplComment(data.data);
        		}else{
        			tplComment([]);
        		}
        	}
        	if(Math.ceil(data.total/15)==1){
        		$("#page").hide();
        	}
        },
        error: function () {
            console.log('请求错误');
        }
    });
}); 
$('#page').click(function(){
	var pageNow = $(this).attr('data-page');
		page(parseInt(pageNow)+1);
})
$('#tplDetailView').on('click','.ljgm',function(){ //立即购买
	var numinput = parseInt($('#tplDetailView .number .num-input').val());
	if(!sukId || !sukKey ||!numinput){
		var ak = 0; 
		$('#tplDetailView .option .attr-name').each(function(index,item){
			ak++;
		})
		if(ak){
			$('#tplDetailView .option').css({'border':'2px solid #ee692c','padding':'5px'});
			setInterval(function(){
				$('#tplDetailView .option').css({'border':'0px','padding':'0px'});
			},2000);
			return ;
		}
	}
	var data = {
	            'type':1,
	            'list':{
						'id':productId,
						'sukId':sukId,
						'sukKey':sukKey,
						'goodsName':goodsName,
						'gooosImg':gooosImg,
						'goodsNum':goodsNum,
						'snk':snk,
						'productNumber':numinput,
						'productPrice':dprice,
						'yf':yf
            		}
	};
	$.getScript("js/md5.js",function(){  //加载test.js,成功后，并执行回调函数
		$.getScript("js/jquerysession.js",function(){  //加载test.js,成功后，并执行回调函数
			var  timestamp = (new Date()).valueOf(),
			 	 spKey     = $.md5('shop'+timestamp);
				 $.session.set(spKey,JSON.stringify(data));
				 window.location.href='order.html?spm='+spKey;
		});
	});
})
$('#tplDetailView').on('click','.jrgwc',function(){ //加入购物车
	var numinput = parseInt($('#tplDetailView .number .num-input').val());
	if(!sukId || !sukKey ||!numinput){
		var ak = 0; 
		$('#tplDetailView .option .attr-name').each(function(index,item){
			ak++;
		})
		if(ak){
			$('#tplDetailView .option').css({'border':'2px solid #ee692c','padding':'5px'});
			setInterval(function(){
				$('#tplDetailView .option').css({'border':'0px','padding':'0px'});
			},2000);
			return ;
		}
	}
	$.ajax({
        url: postUrl+"/cart/addcart.json",
        dataType: 'jsonp',
        method: 'POST',
        data: {
            method: 'POST',
            jst:'jstm.20170004502312366.yj',
            productId:productId,
            member_id:7,
            skuId:sukId,
            productAtter:snk,
            productNumber:numinput,
            productName:goodsNum,
            priceImg:gooosImg
        },
        jsonp: 'callback',
        async: false,    //或false,是否异步
        timeout: 5000,    //超时时间
        success: function (data) {
        	gwcDH();
        },
        error: function () {
            console.log('请求错误');
        }
    });
})

function gwcDH(){ //购物车动画
	$.getScript("js/fly.js",function(){  //加载test.js,成功后，并执行回调函数
		$.getScript("js/requestAnimationFrame.js",function(){  //加载test.js,成功后，并执行回调函数
			var st = $('#tplDetailView .jrgwc').offset().top,
			sl = $('#tplDetailView .jrgwc').offset().left,
			et = $('.shop-cart').offset().top,
			el = $('.shop-cart').offset().left,
			img= $('#ban_pic1 li:first img').attr('src');
			$('<div id="jrgwcdh"><img src="'+img+'"></div>').fly({
			      start: {top: st, left: sl},
			      end: {top: et, left: el, width: 40, height: 40},
			      onEnd: function(){
			    	$('#jrgwcdh').remove();  
			      }
			});
		});
	});
	var num = parseInt($('.shop-cart span').text());
	$('.shop-cart span').html((num+1))
}

$('#tplDetailView').on('click','.number .reduce',function(){ //减少
	var numinput = parseInt($('#tplDetailView .number .num-input').val());
		if(numinput>1){
			$('#tplDetailView .number .num-input').val(numinput-1);
		}
})
$('#tplDetailView').on('click','.number .add',function(){//添加
	var numinput = parseInt($('#tplDetailView .number .num-input').val());
	var max      = $(this).attr('data-stock');
	if(numinput>max || numinput==max){return ;}
	$('#tplDetailView .number .num-input').val(numinput+1);
})
function page(pageNow){
	$.ajax({
        url: postUrl+"/product/comment_info.json",
        dataType: 'jsonp',
        method: 'get',
        data: {
            method: 'get',
            jst:'jstm.20170004502312366.yj',
            product_id:productId,
            pageNow:pageNow,
            pageSize:15
        },
        jsonp: 'callback',
        async: false,    //或false,是否异步
        timeout: 5000,    //超时时间
        success: function (data) {
        	if(data.data){
        		var html = "";
        		$.each(data.data,function(index,item){
        			var star= '';
        			for(var i=0;i<parseInt(item.connentNumber);i++){
        				star +='<i class="star"></i>';
        			}
        			html +='<li>'+
			                    '<img class="fl" src="'+(item.memberHeadimg?item.memberHeadimg:'img/touxiang.png')+'">'+
			                    '<div class="eva-detail fl">'+
			                        '<span class="user-name">'+item.nickName+'</span>'+
			                        '<span class="star-box">'+star+'</span>'+
			                        '<span>'+item.commentContent+'</span>'+
			                    '</div>'+
			                    '<span class="eva-time fr">评价时间：'+formatDate(item.createDate)+'</span>'+
			                '</li>';
        			$("#commentListView").append(html);
        			$('#page').attr('data-page',pageNow);
        		})
        	}
        	if(Math.ceil(data.total/15)==pageNow){
        		$("#page").hide();
        	}
        },
        error: function () {
            console.log('请求错误');
        }
    });
}
$('.search-btn').click(function(){
	var key = $('.search-input').val();
		if(key){
			window.location.href = 'list.html?searchKey='+key;
		}else{
			window.location.href = 'list.html';
		}
})
$('#tplDetailView').on('click','.option .choose-xh .choose',function(){
	var _this = $(this),
		_pThis= $(this).parent();
		_pThis.find('.choose').removeClass('active');
		_this.addClass('active');
		var key = '',price='',tcolor='',nKey='';
		$('#tplDetailView .option .choose-xh .active').each(function(i,v){
			if(i==0){
				tcolor +='已选择：“<em class="xinghao">'+$(this).text()+'</em>”';
				key += $(this).attr('data-id');
				nKey+= $(this).attr('data-name');
			}else{
				key += '|'+$(this).attr('data-id');
				tcolor +='，“<em class="xinghao">'+$(this).text()+'</em>”';
				nKey+= '|'+$(this).attr('data-name');
			}
		})
		price = suk[key];
		if(price){
			$('#tplDetailView .info-titile .price').text('￥'+price['price']);
			$('#tplDetailView .option .number .add').attr('data-stock',price['number']);
			$('#tplDetailView .option stock').html(price['number']);
			sukId = price['id'];
			sukKey= key;
			snk   = nKey;
			dprice= price['price'];
			goodsNum = price['number'];
		}
		$('#tplDetailView .t-color').html(tcolor);
})
function tplcommentInfShop(data){ //评论头部
	var datas = [];
	if(data){
		datas = {
		        'ProductComments':data['getProductComments']['connentNumber'],
		        'reviewTimes':data['reviewTimes'],
		        'getProductComments':data['getProductComments']
		};
	}
	var getTpl = commentInfShop.innerHTML;
	laytpl(getTpl).render(datas, function(html){
		commentInfShopView.innerHTML = html;
	});
}

function tplComment(data){//评论
	var data=data?data:'';
	var getTpl = commentList.innerHTML;
	laytpl(getTpl).render(data, function(html){
		commentListView.innerHTML = html;
	});
}

function tplShopInf(data){ //商品详情
	var data=data?data:'';
	var getTpl = shopInf.innerHTML;
	laytpl(getTpl).render(data, function(html){
		shopInfView.innerHTML = html;
	});
}
function tplDelevantShop(data){ //相关商品
	var data = data?data:[];
	var getTpl = relevantShop.innerHTML;
	laytpl(getTpl).render(data, function(html){
		relevantShopView.innerHTML = html;
	});
}
function tplDetail(data){
	var datas = [];
	if(data){
		datas = {
		        'commodityPrice':data['commodityPrice'],
		        'productPrice':data['productPrice'],
		        'productName':data['productName'],
		        'prPostage':data['prPostage']?data['prPostage']:0,
		        'isPost':data['isPost'],
		        'productStock':data['productStock'],
		        'list':data['picattrMiddle'],
		        'ProductComments':data['getProductComments']['connentNumber'],
		        'reviewTimes':data['reviewTimes']
		};
		goodsName = data['productName'];
		goodsNum  = data['productStock'];
		dprice    = data['productPrice'];
		yf        = (data['isPost']==2 && data['prPostage']>0)?data['prPostage']:0
	}
	var getTpl = tplDetailHtml.innerHTML;
	laytpl(getTpl).render(datas, function(html){
		tplDetailView.innerHTML = html;
	});
}
function tplCarousel(data){ //图片
	var data = data?data:[];
	if(data.length>0){
		gooosImg = data[0]['picturetImg'];
	}
	var getTpl = carousel.innerHTML;
	laytpl(getTpl).render(data, function(html){
		carouselView.innerHTML = html;
	});
	carouselPic();
}
//404
function e404(){
	alert('数据不存在');
}
//图片轮播JS
function carouselPic(){
	$('#carouselView').banqh({
        box:"#carouselView",//总框架
        pic:"#ban_pic1",//大图框架
        pnum:"#ban_num1",//小图框架
        prev_btn:"#prev_btn1",//小图左箭头
        next_btn:"#next_btn1",//小图右箭头
        pop_prev:"#prev2",//弹出框左箭头
        pop_next:"#next2",//弹出框右箭头
        prev:"#prev1",//大图左箭头
        next:"#next1",//大图右箭头
        pop_div:"#demo2",//弹出框框架
        pop_pic:"#ban_pic2",//弹出框图片框架
        pop_xx:".pop_up_xx",//关闭弹出框按钮
        mhc:".mhc",//朦灰层
        autoplay:true,//是否自动播放
        interTime:5000,//图片自动切换间隔
        delayTime:400,//切换一张图片时间
        pop_delayTime:400,//弹出框切换一张图片时间
        order:0,//当前显示的图片（从0开始）
        picdire:true,//大图滚动方向（true为水平方向滚动）
        mindire:true,//小图滚动方向（true为水平方向滚动）
        min_picnum:5,//小图显示数量
        pop_up:false//大图是否有弹出框
    })
}
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = decodeURIComponent(window.location.search).substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}
function formatDate(now) {
	var now=new Date(now); 
	var year=now.getYear();      //年
	var month=now.getMonth()+1;  //月
	var date=now.getDate();      //日
	var hour=now.getHours();     //时
	var minute=now.getMinutes(); //分 
	var second=now.getSeconds(); //秒
	return year+"-"+month+"-"+date+" "+hour+":"+minute;
	//return "20"+year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
}