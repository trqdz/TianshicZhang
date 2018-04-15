var util={};
util.alert=function(str){

	// $("body>.msgbox").remove();
	// $("body").append('<div class="msgbox"><span>'+str+'</span></div>');
	// setTimeout(function(){
	// 	$("body>.msgbox").remove();
	// },2000);
	// //$(".htitle").html(str)
	alert(str);
}

util.getParams = function (urls) {
    var url = urls != null ? urls : window.location.href;
    var params = {};
    url = url.split("?")[1];
    if (url != null && url != "") {
        var pList = url.split("&");
        for (var i = 0; i < pList.length; i++) {
            var pitem = pList[i].split("=");
            var key = pitem[0];
            params[key] = pList[i].replace(key + "=", "");
        }
    }
    return params;
}

util.getToken=function(callBack){
	if(!localStorage.getItem("token")){
		location.href=config.host+"login.html";
	}
	else if(!!callBack){
		callBack(localStorage.getItem("token"));
	}
}

util.parseDate=function(date,str){

	var result="";
	var dateStr=date.replace(/.*\(|\+.*/g,"");
	newDate = new Date();
	newDate.setTime(dateStr);

	var format=str;
	var date = {
          "M+": newDate.getMonth() + 1,
          "d+": newDate.getDate(),
          "H+": newDate.getHours(),
          "m+": newDate.getMinutes(),
          "s+": newDate.getSeconds(),
          "q+": Math.floor((newDate.getMonth() + 3) / 3),
          "S+": newDate.getMilliseconds()
   };
   if (/(y+)/i.test(format)) {
          format = format.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length));
   }
   for (var k in date) {
          if (new RegExp("(" + k + ")").test(format)) {
                 format = format.replace(RegExp.$1, RegExp.$1.length == 1
                        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
          }
   }
   return format;
}




util.showMenu=function(datalist){

	var listHtml='';
	for(var i=0;i<datalist.length;i++){
		listHtml+='<li><a '+(datalist[i].className=null?null:"class =\""+datalist[i].className+"\"")+' href="'+datalist[i].url+'">'+datalist[i].name+'</a></li>';
	}
	var html='<div class="beet-rig">\
		        <ul>\
		            '+listHtml+'\
		        </ul>\
		    </div>'
	$("body").append(html);

}



util.renderFooter=function(active){

	var tplHtml='<ul>\
					<li'+(active=="home"?" class=\"on\"":"")+'><a href="'+config.host+'cplist.html"><i class="home">游戏中心</i></a></li>\
					<li'+(active=="zoushi"?" class=\"on\"":"")+'><a href="'+config.host+'lotterylist.html"><i class="zoushi">开奖走势</i></a></li>\
					<li'+(active=="notice"?" class=\"on\"":"")+'><a href="'+config.host+'notice.html"><i class="notice">站内公告</i></a></li>\
					<li'+(active=="mine"?" class=\"on\"":"")+'><a href="'+config.host+'user/index.html"><i class="my">个人中心</i></a></li>\
				</ul>';
	$("#footer").html(tplHtml);
}

$(function () {
    $("body").on("click", ".goback", function () { history.back(); })
    $("body").on("click", ".refresh", function () { location.reload(); })
})