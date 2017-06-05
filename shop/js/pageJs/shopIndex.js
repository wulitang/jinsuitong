var laytpl    = '',
	postUrl   = 'http://192.168.0.102',
	imgUrl    = 'http://file.serv.cq196.cn:10000/';
layui.use('laytpl', function(){
	laytpl = layui.laytpl;
	  //使用方式跟独立组件完全一样
	$.ajax({
        url: postUrl+"/product/product_homepage.json",
        dataType: 'jsonp',
        method: 'get',
        data: {
            method: 'get',
        },
        jsonp: 'callback',
        async: false,    //或false,是否异步
        timeout: 5000,    //超时时间
        success: function (data) {
        	tplNav(data.data.productClass);
        	tplBanner(data.data.shopmallAd);
        	tplNotice(data.data.noticeList);
        	tplRecAd(data.data.recommendAd);
        	tplRecShop(data.data.indexproduct);
        },
        error: function () {
            console.log('请求错误');
        }
    });
	$.ajax({
        url: postUrl+"/product/product_list.json",
        dataType: 'jsonp',
        method: 'get',
        data: {
            method: 'get',
        },
        jsonp: 'callback',
        async: false,    //或false,是否异步
        timeout: 5000,    //超时时间
        success: function (data) {
        	tplShopClass(data.data);
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
function tplNav(data){ //导航
	var data = data?data:[];
	var getTpl = nav.innerHTML;
	laytpl(getTpl).render(data, function(html){
		navView.innerHTML = html;
	});
}
function tplBanner(data){ //banner
	var data = data?data:[];
	var getTpl = banner.innerHTML;
	laytpl(getTpl).render(data, function(html){
		bannerView.innerHTML = html;
	});
	swiperBanner();
}
function tplNotice(data){ //公告
	var data = data?data:[];
	var getTpl = notice.innerHTML;
	laytpl(getTpl).render(data, function(html){
		noticeView.innerHTML = html;
	});
}
function tplRecAd(data){ //推荐广告
	var data = data?data:[];
	var getTpl = recAd.innerHTML;
	laytpl(getTpl).render(data, function(html){
		recAdView.innerHTML = html;
	});
}
function tplRecShop(data){ //推荐商品
	var data = data?data:[];
	var getTpl = recShop.innerHTML;
	laytpl(getTpl).render(data, function(html){
		recShopView.innerHTML = html;
	});
}
function tplShopClass(data){ //分类商品
	var data = data?data:[];
	var getTpl = shopClass.innerHTML;
	laytpl(getTpl).render(data, function(html){
		shopClassView.innerHTML = html;
	});
}
function swiperBanner(){
	var mySwiper1 = $('.swiper-one').swiper({
        loop: true,
        autoplay : 3000,//自动播放
        speed:800,//切换速度
        pagination : '.one-pagination',//轮播分页
        paginationClickable :true,//轮播分页可点击
    });
    var mySwiper2 = $('.swiper-groom').swiper({
        loop: true,
        autoplay : 3000,//自动播放
        speed:1500,//切换速度
    });
    $('.arrow-left').on('click', function(e){
        e.preventDefault()
        mySwiper2.swipePrev()
    });
    $('.arrow-right').on('click', function(e){
        e.preventDefault()
        mySwiper2.swipeNext()
    });
}

function formatDate(now) {
	var now=new Date(now); 
	var year=now.getYear();      //年
	var month=now.getMonth()+1;  //月
	var date=now.getDate();      //日
	var hour=now.getHours();     //时
	var minute=now.getMinutes(); //分 
	var second=now.getSeconds(); //秒
	return month+"/"+date;
	//return "20"+year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
} 
function Trim(str){ 
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
}