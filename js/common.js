var html = common();
$('#footBox').html(html);
function common() {
    var html = '<div class="ke-grid clearfix"><div class="foot-left"><ul>' +
        '<li> <a href="about.html?type=1">关于我们</a></li> <li> <a href="">服务介绍</a> </li>' +
        ' <li><a href="news.html?newType=0&pageNow=1&pageSize=10">新闻动态</a> </li>' +
        '<li> <a href="center.html?pageNow=1&pageSize=10">招聘信息</a> </li>' +
        '<li> <a target="_blank" href="http://12366.cqsw.gov.cn/">税务服务</a> </li> </ul>' + '<div>重庆远见金税通信息系统技术有限公司<br>邮箱：123456789@qq.com<br>地址：重庆北部新区人和街道镜泊中路5号 </div></div>' +
        '<div class="foot-center"><p class="phone-namber">400-123-1234 </p><div class="work-time">周一至周五 09:00-18:00</div><ul class="foot-icon"><li><img src="img/wechat.png"></li>' +
        '<li class="center"><img src="img/qq.png"></li><li><img src="img/weibo.png"></li></ul></div>' + '<div class="foot-right fr"><img src="img/conde.png"><p>微信二维码</p></div></div></div>' +
        '<div class="foot-bottom"><p class="ke-grid">Copyright©2012-2013 GOTax.cn 渝ICP备13003631号-6 渝公网备：50019002500539 </p></div>'
    return html;
}
