var laytpl    = '',
	laypage   = '',
	postUrl   = 'http://192.168.0.102',
	imgUrl    = 'http://file.serv.cq196.cn:10000/',
	searchKey = getUrlParam('searchKey')?getUrlParam('searchKey'):'',
	cl1Id     = getUrlParam('shopType')?getUrlParam('shopType'):'',
	cl2Id     = getUrlParam('classType')?getUrlParam('classType'):'',
	brandId   = '';
$('.logo-right .search-input').val(searchKey);
layui.use(['laytpl','laypage'], function(){
	laytpl = layui.laytpl;
	laypage= layui.laypage;
	  //使用方式跟独立组件完全一样
	searchKey = $('.logo-right .search-input').val();
	var postData = {
			method: 'get',
			type:2,
	        pageNow:1,
	        pageSize:20,
	        brandId:brandId,
	        cl2Id:cl2Id,
	        cl1Id:cl1Id,
	        searchKeyword:searchKey
	}
	$.ajax({
        url: postUrl+"/product/search_product.json",
        dataType: 'jsonp',
        method: 'get',
        data: postData,
        jsonp: 'callback',
        async: false,    //或false,是否异步
        timeout: 5000,    //超时时间
        success: function (data) {
        	if(data.data){
        		if(data.data.prductListInfo){
        			tplShopList(data.data.prductListInfo.list);
        			paeg(Math.ceil(data.data.prductListInfo.total/20),1);
        		}else{
        			tplShopList([]);
        			paeg(0,1);
        		}
        		if(data.data.producClassAndBandInfo){
        			tplScreenWhere(data.data.producClassAndBandInfo);
        		}else{
        			tplScreenWhere([]);
        		}
            	
        	}else{
        		tplShopList([]);
        		tplScreenWhere([]);
            	paeg(0,1);
        	}
        },
        error: function () {
            console.log('请求错误');
        }
    });
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
	searchKey = $('.logo-right .search-input').val();
	var postData = {
			method: 'get',
			type:2,
	        pageNow:1,
	        pageSize:20,
	        brandId:brandId,
	        cl2Id:cl2Id,
	        cl1Id:cl1Id,
	        searchKeyword:searchKey
	}
	$.ajax({
        url: postUrl+"/product/search_product.json",
        dataType: 'jsonp',
        method: 'get',
        data: postData,
        jsonp: 'callback',
        async: false,    //或false,是否异步
        timeout: 5000,    //超时时间
        success: function (data) {
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
        },
        error: function () {
            console.log('请求错误');
        }
    });
})
$('#screenWhereView').on('click','.shopType a',function(){
	searchKey = $('.logo-right .search-input').val();
	$(this).parents('.shopType').find('a').removeClass('active');
	$(this).addClass('active');
	cl2Id = $(this).attr('data-id')?$(this).attr('data-id'):'';
	var postData = {
			method: 'get',
			type:2,
	        pageNow:1,
	        pageSize:20,
	        brandId:brandId,
	        cl2Id:cl2Id,
	        cl1Id:cl1Id,
	        searchKeyword:searchKey
	}
	$.ajax({
        url: postUrl+"/product/search_product.json",
        dataType: 'jsonp',
        method: 'get',
        data: postData,
        jsonp: 'callback',
        async: false,    //或false,是否异步
        timeout: 5000,    //超时时间
        success: function (data) {
        	if(data.data){
        		if(data.data.prductListInfo){
        			tplShopList(data.data.prductListInfo.list);
        			paeg(Math.ceil(data.data.prductListInfo.total/20),1);
        		}else{
        			tplShopList([]);
        			paeg(0,1);
        		}
        		if(data.data.producClassAndBandInfo){
        			tplScreenWhere(data.data.producClassAndBandInfo);
        		}else{
        			tplScreenWhere([]);
        		}
        	}else{
        		tplShopList([]);
        		tplScreenWhere([]);
            	paeg(0,1);
        	}
        },
        error: function () {
            console.log('请求错误');
        }
    });
})
$('#screenWhereView').on('click','.classType a',function(){
	searchKey = $('.logo-right .search-input').val();
	$(this).parents('.classType').find('a').removeClass('active');
	$(this).addClass('active');
	brandId = $(this).attr('data-id')?$(this).attr('data-id'):'';
	var postData = {
			method: 'get',
			type:2,
	        pageNow:1,
	        pageSize:20,
	        brandId:brandId,
	        cl2Id:cl2Id,
	        cl1Id:cl1Id,
	        searchKeyword:searchKey
	}
	$.ajax({
        url: postUrl+"/product/search_product.json",
        dataType: 'jsonp',
        method: 'get',
        data: postData,
        jsonp: 'callback',
        async: false,    //或false,是否异步
        timeout: 5000,    //超时时间
        success: function (data) {
        	if(data.data){
        		if(data.data.prductListInfo){
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
        	}else{
        		tplShopList([]);
            	paeg(0,1);
        	}
        },
        error: function () {
            console.log('请求错误');
        }
    });
})
$('#screenWhereView').on('click','.reset',function(){
	searchKey = $('.logo-right .search-input').val();
	$("#screenWhereView .classType li a").removeClass('active');
	$("#screenWhereView .classType li:first-child a").addClass('active');
	$("#screenWhereView .shopType li a").removeClass('active');
	$("#screenWhereView .shopType li:first-child a").addClass('active');
	brandId = '';
	cl2Id   = '';
	var postData = {
			method: 'get',
			type:2,
	        pageNow:1,
	        pageSize:20,
	        brandId:brandId,
	        cl2Id:cl2Id,
	        cl1Id:cl1Id,
	        searchKeyword:searchKey
	}
	$.ajax({
        url: postUrl+"/product/search_product.json",
        dataType: 'jsonp',
        method: 'get',
        data: postData,
        jsonp: 'callback',
        async: false,    //或false,是否异步
        timeout: 5000,    //超时时间
        success: function (data) {
        	if(data.data){
        		if(data.data.prductListInfo){
        			if(data.data.prductListInfo){
        				tplShopList(data.data.prductListInfo.list);
            			paeg(Math.ceil(data.data.prductListInfo.total/20),1);
        			}else{
        				tplShopList([]);
            			paeg(0,1);
        			}
        			if(data.data.producClassAndBandInfo){
            			tplScreenWhere(data.data.producClassAndBandInfo);
            		}else{
            			tplScreenWhere([]);
            		}
        		}else{
        			tplShopList([]);
        			paeg(0,1);
        		}
        	}else{
        		tplShopList([]);
        		tplScreenWhere([]);
            	paeg(0,1);
        	}
        },
        error: function () {
            console.log('请求错误');
        }
    });
})

function tplScreenWhere(data){  //查询条件
	var data = data?data:[];
	var getTpl = screenWhere.innerHTML;
	laytpl(getTpl).render(data, function(html){
		screenWhereView.innerHTML = html;
	});
}
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
			type:2,
            pageNow:pageNow,
            pageSize:20,
            brandId:brandId,
	        cl2Id:cl2Id,
	        cl1Id:cl1Id,
	        searchKeyword:searchKey
	}
	postData[obyKey]=obyVal;
	$.ajax({
        url: postUrl+"/product/search_product.json",
        dataType: 'jsonp',
        method: 'get',
        data:postData,
        jsonp: 'callback',
        async: false,    //或false,是否异步
        timeout: 5000,    //超时时间
        success: function (data) {
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
        },
        error: function () {
            console.log('请求错误');
        }
    });
}
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = decodeURIComponent(window.location.search).substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}