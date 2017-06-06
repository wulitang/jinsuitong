var laytpl    = '',
	postUrl   = 'http://192.168.0.102',
	imgUrl    = 'http://file.serv.cq196.cn:10000/';
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
	}else{
		
	}
	
	debugger;
	/*var getTpl = commentList.innerHTML;
	laytpl(getTpl).render(data, function(html){
		commentListView.innerHTML = html;
	});*/
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
