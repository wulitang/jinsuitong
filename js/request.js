function request(url,data,type){
	url  = 'http://192.168.0.100:8088'+url;
	type = type?type:'POST';
	data = data?data:[];
	var datas = {'code':500,'msg':'网络异常','data':''};
	$.ajax({
	    url:url,
	    type:type,         //GET
	    async:false,        //或false,是否异步
	    data:data,
	    timeout:5000,       //超时时间
	    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
	    beforeSend:function(xhr){
	    	//layer.load(1,{shade: [0.5, '#393D49']});
	    },
	    success:function(data,textStatus,jqXHR){
	    	if(data.code==416){
	    		window.location.href='/login.html';
	    	}else{
	    		datas = data;
	    	}
	    },
	    error:function(xhr,textStatus){
	    	//错误
	    },
	    complete:function(){
	    	//layer.closeAll('loading');
	    }
	});
	return datas;
}