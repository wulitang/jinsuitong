var laytpl    = '',
	laypage   ='',
	postUrl   = 'http://192.168.0.102',
	imgUrl    = 'http://file.serv.cq196.cn:10000/',
	searchKey =getUrlParam('searchKey')?getUrlParam('searchKey'):'';
$('.logo-right .search-input').val(searchKey);
layui.use(['laytpl','laypage'], function(){
	laytpl = layui.laytpl;
	laypage= layui.laypage;
	  //使用方式跟独立组件完全一样
	var searchKey = $('.logo-right .search-input').val();
	var postData = {
			method: 'get',
			type:1,
	        pageNow:1,
	        pageSize:20,
	}
	if(searchKey){
		postData['searchKeyword'] = searchKey;
	}
	var data = request('/product/search_product.json',postData,'get');
	if(data.data){
		if(data.data.prductListInfo){
			tplShopList(data.data.prductListInfo.list);
        	paeg(Math.ceil(data.data.prductListInfo.total/20),1);
		}else{
			tplShopList([]);
        	paeg(0,1);
		}
		
	}else{
		tplShopList([]);
    	paeg(0,1);
	}
}); 
$('.sort').click(function(){
	var _pthis = $(this).parent('.fl'),
		_this  = $(this),
		_uthis = $(this).find('.up'),
		_lthis = $(this).find('.low'),
		_authis= $(this).parent('.fl').find('.up'),
		_althis= $(this).parent('.fl').find('.low');
	_pthis.find('.sort').removeClass('active');
	_this.addClass('active');
	
	if(_this.hasClass('def')){
		_authis.show();
		_althis.show();
		_pthis.attr('data-attr','');
		_pthis.attr('data-val','');
	}
	if(_this.hasClass('price')){
		if(_pthis.attr('data-attr')=='productPrice'){
			_pthis.attr('data-val')==1?(_uthis.show(),_lthis.hide(),_pthis.attr('data-val','2')):(_uthis.hide(),_lthis.show(),_pthis.attr('data-val','1'));
		}else{
			_pthis.attr('data-attr','productPrice');
			_uthis.hide();_lthis.show();_pthis.attr('data-val','1');
		}
	}
	if(_this.hasClass('sales')){
		if(_pthis.attr('data-attr')=='salesVolume'){
			_pthis.attr('data-val')==1?(_uthis.show(),_lthis.hide(),_pthis.attr('data-val','2')):(_uthis.hide(),_lthis.show(),_pthis.attr('data-val','1'));
		}else{
			_pthis.attr('data-attr','salesVolume');
			_uthis.hide();_lthis.show();_pthis.attr('data-val','1');
		}
	}
	ajaxData(1,true);
})
$('.search-btn').click(function(){
	var secKey = $('.logo-right .search-input').val();
	if(secKey!=searchKey){
		searchKey = secKey;
		var postData = {
				method: 'get',
				type:1,
		        pageNow:1,
		        pageSize:20,
		}
		if(secKey){
			postData['searchKeyword'] = searchKey;
		}
		var data = request('/product/search_product.json',postData,'get');
		if(data.data){
    		if(data.data.prductListInfo){
    			tplShopList(data.data.prductListInfo.list);
            	paeg(Math.ceil(data.data.prductListInfo.total/20),1);
    		}else{
    			tplShopList([]);
            	paeg(0,1);
    		}
    		
    	}else{
    		tplShopList([]);
        	paeg(0,1);
    	}
	}
	
})
function tplShopList(data){ //导航
	var data = data?data:[];
	var getTpl = shopList.innerHTML;
	laytpl(getTpl).render(data, function(html){
		shopListView.innerHTML = html;
	});
}
function paeg(pages,curr){
	laypage({
	    cont: 'page'
	    ,pages: pages  //总页数
	    ,groups: 15    //连续显示分页数
	    //,curr:curr     //当前页
	    ,skin:'#ee692c'       //皮肤
	    ,jump:function(obj, first){
	    	if(curr!=obj.curr){
	    		ajaxData(obj.curr);
	    		curr=obj.curr;
	    	}
	    }
	});
}
function ajaxData(pageNow,order){
	var obyKey = $('.orderBy').attr('data-attr'),
		obyVal = $('.orderBy').attr('data-val'),
		searchKey = $('.logo-right .search-input').val();
	var postData = {
			method: 'get',
			type:1,
            pageNow:pageNow,
            pageSize:20,
	}
	if(obyKey){
		postData[obyKey] = obyVal;
	}
	if(searchKey){
		postData['searchKeyword'] = searchKey;
	}
	var data = request('/product/search_product.json',postData,'get');
	if(data.data){
		if(data.data.prductListInfo){
			tplShopList(data.data.prductListInfo.list);
    		if(order){
    			paeg(Math.ceil(data.data.prductListInfo.total/20),1);
    		}
		}else{
			tplShopList([]);
    		if(order){
    			paeg(0,1);
    		}
		}
		
	}else{
		tplShopList([]);
		if(order){
			paeg(Math.ceil(data.data.prductListInfo.total/20),1);
		}
	}
}
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = decodeURIComponent(window.location.search).substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}