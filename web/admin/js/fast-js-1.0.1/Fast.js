

//选择器
function g$(Id)
{
	return document.getElementById(Id);
}

var Fast={};




//将自定义字符串转换成时间
Fast.parseDate=function(timeSpan){
	var result;
	timeSpan=timeSpan.replace(/.*\(|\+.*/g,"");
	result=new Date(parseInt(timeSpan));
	return result;
}



//对时间格式化
Fast.formatDate=function(date,formatStr){
	if(date.constructor!=Date){
		date=Fast.parseDate(date);
	}
	var result=formatStr!=null?formatStr:"MM-dd HH:mm:ss";
	var year=date.getFullYear();
	var month=parseInt(date.getMonth())+1; //<9?"0"+date.getMonth():date.getMonth();
	month=month<10?"0"+month:month;
	var day=date.getDate()<9?"0"+date.getDate():date.getDate();
	var hour=date.getHours()<9?"0"+date.getHours():date.getHours();
	var minute=date.getMinutes()<9?"0"+date.getMinutes():date.getMinutes();
	var second=date.getSeconds()<9?"0"+date.getSeconds():date.getSeconds();
	result=result.replace(/yyyy/g,year);
	result=result.replace(/MM/g,month);
	result=result.replace(/dd/g,day);
	result=result.replace(/HH/g,hour);
	result=result.replace(/mm/g,minute);
	result=result.replace(/ss/g,second);
	return result;
}



//分页控件
Fast.initPager=function($page,dataInfo,callBack){
	var liCount=8;
	var pagerHtml='\
		<div class="innerbox">\
            <span class="desc">第{{pageIndex}}页/共{{pageCount}}页</span>\
            <span class="link pageindex">首页</span>\
            <span class="link pagepre">上一页</span>\
            <span class="link pagenext">下一页</span>\
            <span class="link pagelast">末页</span>\
        </div>\
	';
	pagerHtml=pagerHtml.replace("{{pageIndex}}",dataInfo.PageIndex);
	pagerHtml=pagerHtml.replace("{{pageCount}}",dataInfo.PageCount);
	if(dataInfo.PageCount==0){
		$page.html("");
		return;
	}
	$page.html(pagerHtml);
	$page.attr("page",dataInfo.PageIndex);


	$page.undelegate(".pageindex","click").delegate(".pageindex","click",function(){
		callBack(0);
	})

	$page.undelegate(".pagepre","click").delegate(".pagepre","click",function(){
		var index=parseInt($page.attr("page"))-1;
		callBack(index);
	})

	$page.undelegate(".pagenext","click").delegate(".pagenext","click",function(){
		var index=parseInt($page.attr("page"))+1;
		callBack(index);
	})

	$page.undelegate(".pagelast","click").delegate(".pagelast","click",function(){
		callBack(dataInfo.PageCount);
	})
}





/*
@Date:2014-3-18
@Author:涂仁铨
@Description:获取鼠标X坐标
*/
Fast.GetMouseX=function(e)
{
	return e.pageX ? e.pageX: e.clientX + document.body.scrollLeft - document.body.clientLeft;
}


/*
@Date:2014-3-18
@Author:涂仁铨
@Description:获取鼠标Y坐标
*/
Fast.GetMouseY=function(e)
{
	return e.pageY ? e.pageY: e.clientY + document.body.scrollTop - document.body.clientTop;
}



/*
@Date:2014-3-19
@Author:涂仁铨
@Description:获取元素X坐标
*/
Fast.GetLeft=function(e)
{
	var offset=e.offsetLeft;
	if(e.offsetParent!=null)
	{
		offset+=Fast.GetLeft(e.offsetParent);
	}
    return offset;
}


/*
@Date:2014-3-19
@Author:涂仁铨
@Description:获取元素Y坐标
*/
Fast.GetTop=function(e)
{
	var offset=e.offsetTop;
	if(e.offsetParent!=null)
	{
		offset+=Fast.GetTop(e.offsetParent);
	}
    return offset;
}


/*
@Date:2014-3-20
@Author:涂仁铨
@Description:弹出警告框，实现类似alert功能
*/
Fast.Alert=function(msg)
{
	var win=window.top;
	//1.创建对话框背景
	var formBg=window.top.document.createElement("div");
	formBg.id="formBg";
	formBg.style.width="2000px";
	formBg.style.height="10000px";
	formBg.style.display="block";
	formBg.className="dailogBackground";
	win.document.getElementsByTagName('body')[0].scroll="no";
	win.document.body.style.overflowX="hidden";
	win.document.body.style.overflowY="hidden";
	win.document.body.insertBefore(formBg,null);
	
	//2.创建警示框容器
	var formBox=win.document.createElement("div");
	formBox.id="formBox";
	formBox.className="alertBox";
	formBox.style.position="absolute";
	
	win.document.body.insertBefore(formBox, null);
	
	//3.设定警示框里面的内容
	var formHtml='<table class="datable noselect">\
					<tr>\
						<td class="tr_title" onMouseDown="Fast.Contorls.StartDrag(this.parentNode.parentNode.parentNode.parentNode)">\
							<div class="title">来自网页的消息</div>\
							<div class="ctrlArea">\
								<div id="btnAlterClose" class="CloseDailog"></div>\
							</div>\
						</td>\
					</tr>\
					<tr>\
						<td class="tr_content">\
							<div class="txtContent">'+msg+'</div>\
							<div class="btnContent">\
								<div class="btnlist">\
									<div id="btnAlterDefine" class="btnconfirm">确定</div>\
								</div>\
							</div>\
						</td>\
					</tr>\
				</table>';
	formBox.innerHTML=formHtml;
	
	//4.调整容器样式
	var DomW=win.document.documentElement.clientWidth;
	var DomH=win.document.documentElement.clientHeight;
	var formW=300;
	var formH=formBox.clientHeight;
	formBox.style.width=formW+"px";
	formBox.style.left= parseInt(parseInt(DomW-formW)/2)+"px";
	formBox.style.top= parseInt(parseInt(DomH-formH)/2)+"px";
	
	//5.实现关闭功能
	win.g$("btnAlterClose").onclick=function()
	{
		formBg.parentNode.removeChild(formBg);
		formBox.parentNode.removeChild(formBox);
	}
	win.g$("btnAlterDefine").onclick=function()
	{
		formBg.parentNode.removeChild(formBg);
		formBox.parentNode.removeChild(formBox);
	}
}



/*
@Date:2014-3-25
@Author:涂仁铨
@Description:网页弹出层操作类
*/
Fast.Dailog = {
    CallBack: function () { },
    Close: function () {
        var win = window;
        win.Fast.Dailog.CallBack();


        win.g$("formBg").parentNode.removeChild(win.g$("formBg"));
        win.g$("dailogBox").parentNode.removeChild(win.g$("dailogBox"));
    },
    Show: function (data) {
        var html = data.html ? data.html : "";
        var url = data.url ? data.url : "";
        var title = data.title ? data.title : "";
        var width = data.width ? data.width : 300;
        var height = data.height ? data.height : 250;
        var formId = data.formId ? data.formId : "dailogBox";
        var btnList = data.btnList ? data.btnList : "";	//哪些按钮被显示，以,号隔开
        var callBack = data.callBack ? data.callBack : function () { };	//关闭弹层后的回调函数

        //1.创建弹出层背景
        var win = window;//window.top;
        var formBg = win.document.createElement("div");
        formBg.id = "formBg";
        formBg.className = "dailogBackground";
        formBg.style.display = "block";
        formBg.style.position = "absolute";
        formBg.style.left = "0px";
        formBg.style.top = "0px";
        formBg.style.width = "100%";
        formBg.style.height = "100%";
        formBg.style.backgroundColor = "#000000";
        formBg.style.opacity = 0.5;
        formBg.style.filter = "Alpha(opacity=50)"
        //formBg.className="dailogBackground";
        win.document.getElementsByTagName('body')[0].scroll = "no";
        win.document.body.style.overflowX = "hidden";
        win.document.body.style.overflowY = "hidden";
        win.document.body.insertBefore(formBg, null);
        //alert(formBg.parentNode.innerHTML);
        //2.创建对话框容器
        var dailogBox = win.document.createElement("div");
        dailogBox.id = formId;
        dailogBox.className = "dailogBox";
        dailogBox.style.position = "absolute";
        win.document.body.insertBefore(dailogBox, null);

        //3.设定对话框里面的内容
        var btnHtml = "";

        if (btnList.indexOf("btnAdd") != -1) {
            btnHtml += "<div id='btnAddSave'>提交</div>";
        }
        if (btnList.indexOf("btnSave") != -1) {
            btnHtml += "<div  id='btnDoSave'>保存</div>";
        }
        if (btnList.indexOf("btnCancel") != -1) {
            btnHtml += "<div id='btnCloseDailog'>取消</div>";
        }


        var dailogHtml = '<table class="datable noselect">\
						<tr>\
							<td class="tr_title" onMouseDown="Fast.Contorls.StartDrag(this.parentNode.parentNode.parentNode.parentNode)">\
								<div class="title">'+ title + '</div>\
								<div class="ctrlArea">\
									<div id="btnClosedailogBox" class="CloseDailog" ></div>\
								</div>\
							</td>\
						</tr>\
						<tr>\
							<td class="tr_content">\
								<div id="DailogtxtContent" class="txtContent"></div>\
								<div id="DailogbtnContent" class="btnContent">\
									<div class="btnlist">\
										'+ btnHtml + '\
									</div>\
								</div>\
							</td>\
						</tr>\
					</table>';
        dailogBox.innerHTML = dailogHtml;
        if (html) {
            win.g$("DailogtxtContent").innerHTML = html;
        }
        else {
            win.g$("DailogtxtContent").innerHTML = '<iframe  id="' + formId + 'frame" name="' + formId + 'frame" width="100%" height="100%" frameborder="0" src="' + url + '" class="iframe"></iframe>';
        }




        //4.调整容器样式
        dailogBox.style.width = width + "px";
        win.g$("DailogtxtContent").style.height = height + "px";

        var DomW = win.document.documentElement.clientWidth;
        var DomH = win.document.documentElement.clientHeight;
        var formW = dailogBox.clientWidth;
        var formH = dailogBox.clientHeight;
        dailogBox.style.left = parseInt(parseInt(DomW - formW) / 2) + "px";
        dailogBox.style.top = parseInt(parseInt(DomH - formH) / 2) + "px";
        if (btnList == "") {
            win.g$("DailogbtnContent").style.display = "none";
        }

        //5.实现按钮功能
        win.g$("btnClosedailogBox").onclick = function () {
            win.Fast.Dailog.Close();
        }
        if (win.g$("btnCloseDailog")) {
            win.g$("btnCloseDailog").onclick = function () {
                win.Fast.Dailog.Close();
            }
        }

        if (win.g$("btnAddSave")) {
            win.g$("btnAddSave").onclick = function () {
                alert("addsave");
            }
        }
        if (win.g$("btnDoSave")) //保存按钮事件
        {
            win.g$("btnDoSave").onclick = function () {
                var frames = win.document.frames ? win.document.frames : win.frames;
                frames[formId + "frame"].DoSave();
            }
        }


        if (win.g$("btnAddSave"))//添加按钮事件
        {
            win.g$("btnAddSave").onclick = function () {
                var frames = win.document.frames ? win.document.frames : win.frames;
                frames[formId + "frame"].AddSave();
            }
        }



        //6.设置回调函数
        win.Fast.Dailog.CallBack = callBack;
    }

};


/*
@Date:2014-3-18
@Author:涂仁铨
@Description:弹出对话框，实现类似window.confirm功能
*/
Fast.Confirm=function(data)
{
	var title=data.title?data.title:"网页对话框";
	var content=data.content?data.content:"";
	var successFun=data.success?data.success:function(){};
	var cancelFun=data.cancel?data.cancel:function(){};
	var win=window.top;
	
	//1.创建对话框背景
	var formBg=window.top.document.createElement("div");
	formBg.id="formBg";
	formBg.style.width="2000px";
	formBg.style.height="10000px";
	formBg.style.display="block";
	formBg.className="dailogBackground";
	win.document.getElementsByTagName('body')[0].scroll="no";
	win.document.body.style.overflowX="hidden";
	win.document.body.style.overflowY="hidden";
	win.document.body.insertBefore(formBg,null);
	
	
	
	//2.创建对话框容器
	var formBox=win.document.createElement("div");
	formBox.id="formBox";
	formBox.className="confirmBox";
	formBox.style.position="absolute";
	win.document.body.insertBefore(formBox, null);
	
	//
	//3.设定对话框里面的内容
	var formHtml='<table class="datable noselect">\
					<tr>\
						<td class="tr_title" onMouseDown="Fast.Contorls.StartDrag(this.parentNode.parentNode.parentNode.parentNode)">\
							<div class="title">'+title+'</div>\
							<div class="ctrlArea">\
								<div id="btnCloseBox" class="CloseDailog"></div>\
							</div>\
						</td>\
					</tr>\
					<tr>\
						<td class="tr_content">\
							<div class="txtContent">'+content+'</div>\
							<div class="btnContent">\
								<div class="btnlist">\
									<div id="btnConfirm" class="btnconfirm">确定</div>\
									<div id="btnCancel" class="btncancel">取消</div>\
								</div>\
							</div>\
						</td>\
					</tr>\
				</table>';
	formBox.innerHTML=formHtml;
	
	//4.调整容器样式
	var DomW=win.document.documentElement.clientWidth;
	var DomH=win.document.documentElement.clientHeight;
	var formW=300;
	var formH=formBox.clientHeight;
	formBox.style.width=formW+"px";
	formBox.style.left= parseInt(parseInt(DomW-formW)/2)+"px";
	formBox.style.top= parseInt(parseInt(DomH-formH)/2)+"px";
	
	//5.实现事件
	win.g$("btnConfirm").onclick=function()
	{
		win.g$("formBg").parentNode.removeChild(win.g$("formBg"));
		win.g$("formBox").parentNode.removeChild(win.g$("formBox"));
		successFun();
	}
	win.g$("btnCancel").onclick=function()
	{
		win.g$("formBg").parentNode.removeChild(win.g$("formBg"));
		win.g$("formBox").parentNode.removeChild(win.g$("formBox"));
		cancelFun();
	}
	win.g$("btnCloseBox").onclick=function()
	{
		win.g$("formBg").parentNode.removeChild(win.g$("formBg"));
		win.g$("formBox").parentNode.removeChild(win.g$("formBox"));
	}
}



/*
@Date:2014-3-19
@Author:涂仁铨
@Description:消息提示框
*/
Fast.ShowMsg=function(data)
{
	var title=data.title?data.title:"网页对话框";
	var content=data.content?data.content:"";
	var timeout=data.timeout!=null?data.timeout:5000;
	
	var win = window.top;
	//1.创建停靠层
	var parentForm = win.document.createElement("div");
	parentForm.className="docklayer";
	win.document.body.insertBefore(parentForm, null);
	
	
	//2.创建弹层元素
	
	var formBox=win.document.createElement("div");
	formBox.className="msgBox";
	formBox.style.position="absolute"; 
	
	//3.设定弹层内HTML内容
	var formHtml='<table class="datable noselect">\
					<tr>\
						<td class="tr_title">\
							<div class="title">'+title+'</div>\
							<div class="ctrlArea">\
								<div class="CloseDailog"></div>\
							</div>\
						</td>\
					</tr>\
					<tr>\
						<td class="tr_content">\
							<div class="msgContent">'+content+'</div>\
						</td>\
					</tr>\
				</table>';
	formBox.innerHTML = formHtml;
	
	//win.document.body.insertBefore(formBox,null);
	parentForm.insertBefore(formBox,null);
	
	//4.设置默认样式
	var boxWidth=formBox.clientWidth;
	var boxHeight=formBox.clientHeight;
	var animate=7;
	var animateCount=50;
	var counter=0;
	var loaded=false;
	formBox.style.opacity=0;
	formBox.style.right=-boxWidth+"px";
	formBox.style.bottom=-boxHeight+"px";

	
    //5.实现淡入效果

	var timer=setInterval(function()
	{
		counter++;
		if(counter<animateCount)
		{
			formBox.style.opacity=counter/(animateCount*1);
			formBox.style.right=counter*boxWidth/animateCount-boxWidth+"px";
			formBox.style.bottom=counter*boxHeight/animateCount-boxHeight+"px";
		}
		else
		{
			formBox.style.opacity=1;
			formBox.style.right="1px";
			formBox.style.bottom="1px";
			clearInterval(timer);
			loaded=true;
			counter = 0;

		}
	},animate);
	
	
    //6.实现淡出效果
	
	var closeBox=function()
	{

		counter=0;
		var timer2=setInterval(function()
		{
			counter++;
			if(counter<animateCount)
			{
				formBox.style.opacity=1-counter/(animateCount);
				formBox.style.right=-counter*boxWidth/animateCount+"px";
				formBox.style.bottom=-counter*boxHeight/animateCount+"px";
			}
			else
			{
				formBox.style.opacity=0;
				clearInterval(timer2);
				if(parentForm.parentNode)
				{
					parentForm.parentNode.removeChild(parentForm);
				}

				
			}
		},animate);
	}
	formBox.getElementsByTagName("td")[0].children[1].children[0].onclick=function()
	{
		closeBox();
	}

	//7.延时关闭对话框
	if(timeout!=0)
	{
		setTimeout(function()
		{
			closeBox();
		},timeout);
	}
	
}


/*
@Date:2014-2-10
@Author:涂仁铨
@Description:处理服务端返回的提示信息,如果成功处理okCallBack，失败则处理falseCallBack
*/
Fast.ExcuteServerMessage=function(data)
{
	var serverMsg=data.retJson;
	var okCallBack=data.success?data.success:function(){};
	var falseCallBack=data.failed;
	var timeout=data.timeout;
	if(serverMsg.IsSuccess==true)
	{
		if(okCallBack)
		{
			okCallBack();
		}
		else
		{
			Fast.ShowMsg({
				title:"操作成功",
				content:"<font color=green>操作成功！</font>",
				timeout:timeout
			});
		}
	}
	else
	{
		if(falseCallBack)
		{
			falseCallBack();
		}
		else
		{
			Fast.ShowMsg({
				title:"操作失败",
				content:"<font color=red>"+serverMsg.Description+"</font>",
				timeout:timeout
			});
		}
	}
}




/*
@Date:2013-11-25
@Author:涂仁铨
@Description:Ajax操作类
*/
Fast.Ajax=function()
{
		//MsgStr传递参数 ，SendUrl目标地址，ReqType提交方式，Bool是否异步
    this.Get = function (MsgStr,SendUrl, ReqType, Bool) {
		if(!ReqType)
		{
			ReqType="get";
		}
		if(Bool==null)
		{
			Bool=false;
		}
        var XMLHttp =null;
		if (window.XMLHttpRequest) {
           XMLHttp= new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {
            XMLHttp= new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (Bool == true) {
            XMLHttp.onreadystatechange = function () {
                if (XMLHttp.readyState == 4) {
                    if (XMLHttp.status == 200) {
                        var Resp = XMLHttp.responseText;
                       // Resp = Resp.replace(/\s/g, "");
                       // Resp = Resp.replace(/'/g, "\"");
                        return Resp;
                    }
                }
            }
        }
        XMLHttp.open(ReqType, SendUrl, Bool);
        if (ReqType.toUpperCase() == "POST") {
            XMLHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        }
        XMLHttp.send(MsgStr);
        if (Bool == false) {
            var Resp = XMLHttp.responseText;
           // Resp = Resp.replace(/\s/g, "");
           // Resp = Resp.replace(/'/g, "\"");
            return Resp;
        }
    }
	
}



/*
@Date:2013-11-26
@Author:涂仁铨
@Description:将字符串转换成JSON格式
*/
Fast.ParseJSON=function(str)
{
	var json=eval("("+str+")");
	return json;
}


/*
@Date:2014-1-14
@Author:涂仁铨
@Description:将字符串转换成短日期格式
*/
Fast.ParseShortDate=function(cellval)
{
	if (cellval == null||cellval=="null")
	{
		return "";
	}
	cellval = cellval.toLowerCase();
	 var date = new Date(parseInt(cellval.replace("/date(", "").replace(")/", ""), 10));
	 var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	 var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	 return date.getFullYear() + "-" + month + "-" + currentDate;
}



/*
@Date:2014-1-14
@Author:涂仁铨
@Description:将字符串转换成长日期格式
*/
Fast.ParseLongDate=function(cellval)
{
	if (cellval == null||cellval=="null")
	{
		return "";
	}
	cellval = cellval.toLowerCase();

	 var date = new Date(parseInt(cellval.replace("/date(", "").replace(")/", ""), 10));
	 var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	 var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	 var currentHour=date.getHours()<10?"0"+date.getHours():date.getHours();
	 var currentMinute=date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
	 var currentSecond=date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
	 return date.getFullYear() + "-" + month + "-" + currentDate+" "+currentHour+":"+currentMinute+":"+currentSecond;
}

/*
@Date:2013-12-6
@Author:涂仁铨
@Description:页面大小自适应函数
*/
Fast.AutoSetPage=function()
{
	var domWidth=document.documentElement.clientWidth;
	var domHeight=document.documentElement.clientHeight;
	g$("middle").style.height=domHeight-g$("top").clientHeight-g$("foot").clientHeight-17+"px";
	
	g$("mright").style.width=domWidth-g$("mleft").clientWidth-10+"px";
	
}





/*
@Date:2014-1-22
@Author:涂仁铨
@Description:转换类
*/
Fast.Translate = function () 
{
	var jsonTxt ="";
	var thisEntity=this;
	
	
	//Json数据转换成自定义样式
	this.JsonToFormat= function (jsonStr, jsonFormat)
    {
	    var jsonData = jsonStr;
	    if (jsonStr == null)
	    {
	        return;
	    }
	    //alert(jsonStr);
        if (jsonData.constructor == String)
        {
            jsonData = eval("(" + jsonData + ")");
        }
        if (jsonData.constructor == Object) {
            jsonTxt += "{";
            for (var format in jsonFormat) {
				//alert(format);
                //如果是自定义字符串的话，判断内容
                if (jsonFormat[format]=="[]")
                {
                    //var jsdataString=json2str(jsonData);
                    //jsonTxt += "\"" + format + "\":" + jsdataString + ",";;
                }
                else if (jsonFormat[format].constructor == String) {
                    //如果是自定义的格式就解析里面的内容
                    if (jsonFormat[format].indexOf(']') > 0) {
                        var jsPosition = jsonFormat[format].replace("[", "").replace("]", "").split('.');
                        var jsonPositionData = jsonData[jsPosition[0]];
                        for (var p_i = 1; p_i < jsPosition.length; p_i++) {
                            jsonPositionData = jsonPositionData[jsPosition[p_i]];
                        }
                        if (jsonPositionData == null)
                        {
                            jsonTxt += "\"" + format + "\":null,";
                            continue;
                        }
                        if (jsonPositionData.constructor == String) {
                            jsonTxt += "\"" + format + "\":\"" + jsonPositionData + "\",";
                        }
                        else if (jsonPositionData.constructor == Array) {
                            jsonTxt += "\"" + format + "\":";
                            thisEntity.JsonToFormat(jsonPositionData, jsonFormat);
                            jsonTxt += ",";
                        }
                        else
                        {
                            jsonTxt += "\"" + format + "\":" + jsonPositionData + ",";
                        }
                    }
                    else {
                        jsonTxt += "\"" + format + "\":\"" + jsonFormat[format] + "\",";;
                    }
                }
                else if (jsonFormat[format].constructor == Boolean) {
                    jsonTxt += "\"" + format + "\":" + jsonFormat[format] + ",";;
                }
            }
            jsonTxt = jsonTxt.substring(0, jsonTxt.length - 1);
            jsonTxt += "},";
            
        }
        else if (jsonData.constructor == Array)
        {
            jsonTxt += "[";
            for (var js_i = 0; js_i < jsonData.length; js_i++)
            {
                thisEntity.JsonToFormat(jsonData[js_i], jsonFormat);
            }
            if (jsonTxt.substring(jsonTxt.length - 1, jsonTxt.length) == ",")
            {
                jsonTxt = jsonTxt.substring(0, jsonTxt.length - 1);
            }
            jsonTxt += "]";
        }
        if (jsonTxt.substring(jsonTxt.length - 1, jsonTxt.length) == ",") {
            return jsonTxt.substring(0, jsonTxt.length - 1);
        }
        else
        {
            return jsonTxt;
        }
    }
}






