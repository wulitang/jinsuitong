$(function () {
    //首页选项卡
    $(".about-top li").hover(function () {
            $(this).addClass("active").siblings().removeClass('active');
            $(".aboout-tab .news-item").eq($(this).index()).addClass("active").siblings().removeClass('active');
    });
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
});
