$(function () {
    //获取用户信息JSON.stringify(obj)将JSON转为字符串。JSON.parse(string)将字符串转为JSON格式；
    if($.cookie('usermessage')){
        var data = JSON.parse($.cookie('usermessage'));
        console.log(data);
    }else {

    }

    //下载页关闭弹窗
    $(".success span").click(function () {
        $(".windows").hide();
    });
    //是否阅读协议
    $(".detail i").click(function () {
        $(this).toggleClass("active");
    });
    //选择缴费产品
    $(".choose-list li").click(function () {
        $(this).addClass("active").siblings().removeClass('active');
    });
    //选择支付方式
    $(".pay-way div").click(function () {
        $(this).addClass("active").siblings().removeClass('active');
    });
    //选择快递方式
    $(".ems-way li").click(function () {
        $(this).addClass("active").siblings().removeClass('active');
    });
    // var layer, laytpl;
    // layui.use(['layer','laytpl'], function(){
    //     layer = layui.layer;
    //     laytpl = layui.laytpl;
    // });
    // $('#test1').on('click', function(){
    //     layer.msg('Hello layer');
    // });
    // function getServerData(url,data,method){
    //     var postData = {},ret;
    //
    //     method = method?method:'POST';
    //     if(data){
    //         postData = data;
    //         postData['postUrl'] = 'http://192.168.0.100:8088'+url,
    //             postData['method']  = method;
    //     }else{
    //         postData['postUrl'] = 'http://192.168.0.100:8088'+url,
    //             postData['method']  = method;
    //     }
    //     $.ajax({
    //         url:"http://192.168.0.102",
    //         dataType: 'jsonp',
    //         data:postData,
    //         type: "post",
    //         jsonp: 'callback',
    //         async:false,    //或false,是否异步
    //         timeout:5000,    //超时时间
    //         success: function (retData) {
    //             ret = retData;
    //         },
    //         error: function () {
    //             //console.log('请求错误');
    //         }
    //     });
    //     return ret;
    // };
    //

});
