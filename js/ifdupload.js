/*
Copyright 2015 www.iwoodleaf.com

*/

/*
  callback //回调函数
  submit //提交按钮 ID
  file //上传图片的 input元素
  setting //回调函数作用域 默认是 window
  url //提交的url地址
  callbackurl //回调地址 iframe 地址


##初始化代码
-example1:
    <a id="upfiletest" class="cross_upload_file" url="http://192.168.0.111:10000/upload.htm" callbackurl="http://127.0.0.1:8081/test.html"  callback="callback" beforeHandle="beforeHandle">上传</a>

##可以设置点击按钮，会检查文件是否可以选择
-example2:
    <a id="upfiletest" class="cross_upload_file" url="http://192.168.0.111:10000/upload.htm" callbackurl="http://127.0.0.1:8081/test.html" submit="testup"  callback="callback3" beforeHandle="beforeHandle">按钮提交</a>
    <button id="testup" type="submit">提交</button>
---------
##iframe提交页面试例
example:  callback.html
  <!DOCTYPE html>
  <html>
    <head>
      <title>ifdupload</title>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta charset="utf-8">
    </head>
    <body>
      <script type="text/javascript">   
        var data = window.location.search.split('?').slice(1);
        window.parent.crossfileCallback.execute(data);
      </script>
    </body>
  </html>

  #####
  调用上传文件后的回调函数;
  window.parent.crossfileCallback.execute(data);
---------
#可以单独设置回调函数和回调函数的使用环境
example：
    <a class="cross_upload_file" url="" callbackurl="" submit="testup"  callback="callback3" beforeHandle="beforeHandle">按钮提交</a>  
    在提交完成后执行的方法（错误 成功 都会返回，代码和远规范）
    function callback3(data){
      console.log();
    }
    在提交前执行的方法
    function beforeHandle(file){
  
    }
---------
#可以再页面前面加载 JS 代码
##在页面底部初始化代码
example：
  <!DOCTYPE html>
  <html>
    <head>
      <title>ifdupload</title>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta charset="utf-8">
      <script type="text/javascript" src="ifdupload.js"></script>
    </head>
    <body>
      ......
      <script type="text/javascript">   
        crossfile.init();
      </script>
    </body>
  </html>
#可以页面底部加载 JS 代码
example：
  <!DOCTYPE html>
  <html>
    <head>
      <title>ifdupload</title>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta charset="utf-8">  
    </head>
    <body>
      ......
      <script type="text/javascript" src="ifdupload.js"></script>
    </body>
  </html>
*/
(function(window){
	  var imgRootURL       = 'http://file.serv.cq196.cn:10000/';  //图片上传根目录
	  var fileUpSuccessURL = '';  //文件上传成功标识图地址
	  var videoUpSuccessURL= '';  //视频上传成功标识图地址
      var crossfile = function(options){

        /**
        IE 兼容办法
        
        */ 
        if(!document.getElementsByClassName){
          document.getElementsByClassName = function(className) {  
              var all = document.all ? document.all : document.getElementsByTagName('*');  
              var elements = new Array();  
              for (var e = 0; e < all.length; e++) {  
                  if (all[e].className == className) {  
                      elements[elements.length] = all[e];  
                  }
              }  
              return elements;  
          }
        }
        var forms = {}, files = {}, callbackurl = window.location.origin;
        function targethandle(form){        	
          if(form){
            form.submit();
          }
        }

        function setting(dom){
          var infos = {};
          infos.dom = dom,
          infos.iframeId = this.getIframeId(),
          infos.id = dom.getAttribute('id') || infos.iframeId,
          infos.url = dom.getAttribute('aurl'),
          infos.btn = dom.getAttribute('submit') || false,
          infos.pn = dom.getAttribute('pn') || 'test',
          infos.autopull = dom.getAttribute('autopull'),
          infos.beforeHandle = dom.getAttribute('beforeHandle'),
          infos.callback = dom.getAttribute('callback'),
          infos.up = dom.getAttribute('up'),
          infos.callbackurl = encodeURI(callbackurl + '/fileupload.html&handelid=' + infos.id + '&pn=' + infos.pn),
          forms[infos.id] = create(infos),
          infos.file = forms[infos.id].querySelector('input');
          if(infos.up=="many"){
        	  infos.file.setAttribute('multiple','multiple');
          }
          files[infos.id] = {
            form: forms,
            infos: infos
          }
          
          if(infos.btn){
            var btn = document.getElementById(infos.btn);
            if(btn.addEventListener){
              btn.addEventListener('click', function(){
                if(dohandle(window[infos.beforeHandle], infos) || validata(infos.file)) return false;
                targethandle(forms[infos.id], infos);
              });
            }else if(btn.attachEvent){
              btn.attachEvent('onclick', function(){
                if(dohandle(window[infos.beforeHandle], infos) || validata(infos.file)) return false;
                targethandle(forms[infos.id], infos);
              });
            }
          }else{
            if(infos.file.addEventListener){
              infos.file.addEventListener('change', function(){
                if(dohandle(window[infos.beforeHandle], infos) || validata(infos.file)) return false;
                targethandle(forms[infos.id], infos);
              });
            }else if(infos.file.attachEvent){
              infos.file.attachEvent('onchange', function(){
                if(dohandle(window[infos.beforeHandle], infos) || validata(infos.file)) return false;
                targethandle(forms[infos.id], infos);
              });
            }
          }
          if(infos.dom.addEventListener){
            infos.dom.addEventListener('click', function(){
              setTimeout(function(){
            	  infos.file.click();
            	 /* var a=document.createEvent("MouseEvents");//FF的处理 
            	  a.initEvent("click", true, true);  
            	  infos.file.dispatchEvent(a);*/
              }, 10);
            });
          }else if(infos.dom.attachEvent){
            infos.dom.attachEvent('onclick', function(){
              setTimeout(function(){
            		infos.file.click();
              }, 10);
            });
          }
        }
        function dohandle(handle, infos){
          if(handle && typeof handle == 'function'){
            if(handle.call(infos) == false){
              return !0;
            }
            return 0;
          }else{
            return 0;
          }
        }
        function validata(file){
          return file.value ? false : true;
        }
        function create(infos){
          var iframe = document.createElement('iframe'),
              form  = document.createElement('form'),
              file = document.createElement('input');

          //infos.dom.setAttribute('style', 'cursor: pointer'),
          infos.dom.setAttribute('readonly', 'true'),

          file.setAttribute('type', 'file'),
          file.setAttribute('name', 'file_' + infos.iframeId),
          file.setAttribute('id', 'file_' + infos.iframeId),
          
          form.setAttribute('action', infos.url + '?rederictUrl=' + infos.callbackurl),
          form.setAttribute('enctype', 'multipart/form-data'),
          form.setAttribute('method', 'post'),
          form.setAttribute('target', infos.iframeId),
          form.setAttribute('style', 'visibility: hidden; width: 0; height: 0;'),
          form.setAttribute('id', 'file_cross_form_' + infos.iframeId);

          iframe.setAttribute('name', infos.iframeId),
          iframe.setAttribute('id', infos.iframeId);
          
          // file = (function(dom){
          //   clone = dom.cloneNode();
          //   parent = dom.parentNode;
          //   prev = dom.previousElementSibling;
          //   return dom;
          // })(document.getElementById(options.file));
          // file.setAttribute('id', 'upfile_copy');
          // parent.insertBefore(clone, file);

          form.appendChild(iframe),
          form.appendChild(file),
          document.body.appendChild(form);

          return form;
        }

        function search(data){
            data = decodeURIComponent(data);
            data = data.toString().split('&');
            var result = {};
            for (var i in data) {
              var temp = data[i].split('=');
              if(temp.length > 1){
                try{
                  temp[1] = JSON.parse(temp[1]);
                }catch(e){
                  temp[1] = temp[1] || null;
                }
                result[temp[0]] = temp[1];
              }
            };
            //console.log(result);
            return result;
        }

        window.crossfileCallback = {
          execute: function(data){
            data = search(data);
            
            if(data.handelid){
            	if(data.data.code!=200){
            		alert(data.data.msg);
            	}else{
            		var infos = files[data.handelid].infos,
                    handle = files[data.handelid] && window[infos.callback];
	                if(infos.autopull && infos.autopull != 'auto'){
	                  document.getElementById(infos.autopull).value = data.data.data[0];
	                }else if(infos.autopull == 'auto'){
	                	var upQuantity = infos.dom.getAttribute('up');
	                	if(upQuantity=='many'){
	                		var imgs=data.data.data;
	                		for(var i in imgs){
	                			var img=imgs[i];
	                			var addImg = '<label class="showImg">'+
        						/*'<input type="hidden" name="allImg" value="'+data.data.data[0]+'"/>'+*/
							 	'<img data-src="'+img+'" src="'+imgRootURL+""+img+'">'+
							 	'<p class="oper">'+
							 		'<a class="edit" title="编辑（edit）"><i class="fa fa-edit"></i></a>'+
							 		'<a class="del" title="删除（delete）"><i class="fa fa-trash-o"></i></a>'+
							 	'</p>'+
							 	'<p class="imgname" title="暂无（NO）">暂无（NO）</p>'+
					 		  '</label>';
				        		var cid = infos.dom.getAttribute('id');
				        		$("#"+cid).parent().parent().prepend(addImg);
	                		}
	                	}else{
	                		var upType = infos.dom.getAttribute('upType');
		                	infos.dom.value = data.data.data[0];
		                    var inputFilePath = infos.dom.parentNode.getElementsByTagName("input")[0];
		                    inputFilePath.value=data.data.data[0];
		                    if(upType=='mp3'){
		                    	infos.dom.src='static/img/upSuccess.png';
	                		}else{
	                			infos.dom.src=imgRootURL+""+data.data.data[0];
	                		}
		                	if(infos.dom.alt=="mark"){ //需要标记特殊处理
	                			imgMark(imgRootURL+""+data.data.data[0],infos.dom.id);
		                	}
	                	}
	                }
	                if(handle && typeof handle == 'function'){
	                  handle.call(window,infos.dom,data.data);
	                }
            	}
            }
          }
        };
        this.init = function(){
          var uploads = document.getElementsByClassName('cross_upload_file');
            if(uploads.length){
            
              for (var i = uploads.length - 1; i >= 0; i--) {
                setting.call(this, uploads[i]);
              };
            }
        }
        this.init();
      }
      crossfile.prototype.formId = 0;
      crossfile.prototype.getIframeId = function(){
        return 'cross_frame' + (++crossfile.prototype.formId);
      }
      window.crossfile = new crossfile();
    })(window, undefined);
