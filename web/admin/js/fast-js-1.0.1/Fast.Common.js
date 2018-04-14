


Fast.Common={};





//点击该元素之外的区域隐藏该元素
function AfterExitDom(Obj)
{
	
	document.onmouseup = function(e)
	{   
		e=window.event?window.event:e;
		srcE=e.srcElement?e.srcElement:e.target;
		if(srcE!=Obj)
		{
			Obj.style.display="none";
		}
	}
}



/*
@Date:2014-1-21
@Author:涂仁铨
@Description:点击该元素之外的区域隐藏该元素
*/
Fast.Common.AfterExitDomById=function(objId)
{
	var Obj=g$(objId);
	document.onmouseup = function(e)
	{   
		e=window.event?window.event:e;
		srcE=e.srcElement?e.srcElement:e.target;
		if(srcE!=Obj)
		{
			Obj.style.display="none";
		}
	}
}


/*
@Date:2014-4-3
@Author:涂仁铨
@Description:获取超链接传过来的参数
*/
Fast.Common.GetParam = function (pparam)
{
	var localurl=location.href.toLowerCase();
	var param=pparam.toLowerCase();
    var paramStr = localurl.split("?")[1];
    var value = "";
    if (paramStr != null) {
        var params = paramStr.split("&");
        for (var i = 0; i < params.length; i++) {
            if (params[i].indexOf(param) != -1) {
                value = params[i].split("=")[1];
            }
        }
    }
    return decodeURI(value);
}



/*
@Date:2013-12-26
@Auhor:涂仁铨
@Description:替换掉旧的select控件
@Paramters: oldDom:旧的select控件元素,	callBack:回调函数,	cssStyle:css样式 	
@Example: common.ReplaceSelect(g$("selfontSize"),callback,{selWidth:100,contWidth:160,itemWidth:50});
*/
Fast.Common.ReplaceSelect=function(oldDom,callBack,cssStyle)
{
	var defValue=oldDom.children[oldDom.selectedIndex]?oldDom.children[oldDom.selectedIndex].value:"";
	defValue="<input name='"+oldDom.id+"' type='hidden' value='"+defValue+"' />"
	var defText=oldDom.children[oldDom.selectedIndex]?oldDom.children[oldDom.selectedIndex].innerHTML:"";
	var domHtml='	<div class="selHeader">\
                    	<div class="innerTxt">'+defText+'</div>\
                        <div class="innerCtrl" onClick="this.parentNode.parentNode.children[1].style.display=&quot;block&quot;; "></div>\
						<div class="hidValue">'+defValue+'</div>\
                    </div>\
					<div class="selCont" style="width:150px; z-index:10;">';
	for(var i=0;i<oldDom.length;i++)
	{
		var itemHtml='<div class="item" svalue="'+oldDom.children[i].value+'" >'+oldDom.children[i].innerHTML+'</div>';
		domHtml	 +=itemHtml;
	}				
	domHtml	 +='	</div>';
	var newDom=document.createElement("div");
	newDom.className="userSelect";
	newDom.innerHTML=domHtml;
	
	oldDom.parentNode.replaceChild(newDom,oldDom);
	AfterExitDom(newDom.children[1]);
	if(cssStyle)
	{
		newDom.children[0].style.width=cssStyle.selWidth+"px";
		//newDom.children[1].style.width=parseInt(cssStyle.contWidth+2)+"px";
	}

	var contPanel=newDom.children[1]
	for(var i=0;i<contPanel.children.length;i++)
	{
		contPanel.children[i].onclick=function()
		{
			newDom.children[0].children[0].innerHTML=this.innerHTML;
			newDom.children[1].style.display="none";
			var itemValue=this.getAttribute("svalue");
			newDom.children[0].children[2].children[0].value=itemValue;
			if(callBack)
			{
				callBack(this.getAttribute("svalue"));
			}
		}
	}
}






/*
@Date:2014-1-13
@Author:涂仁铨
@Description:获取指定区域中的文本框内容
*/
Fast.Common.GetData = function (obj)
{
	var valueStr = "";
	var inputType = "input|select|textarea";
	var inptCollect = inputType.split("|");
	var inptDom;
	for (i = 0; i < inptCollect.length; i++) 
	{
		inptDom = obj.getElementsByTagName(inptCollect[i]);
		for (j = 0; j < inptDom.length; j++) {
			//如果当前的input还没有被添加上
			if (valueStr.indexOf(inptDom[j].name, 0) < 0) {
				
				
				
				if (inptDom[j].getAttribute("type") == "radio") {
					if (inptDom[j].checked) {
						valueStr += inptDom[j].name + "=" + inptDom[j].value + "&";
					}
				}
				else if (inptDom[j].constructor=="HTMLSelectElement"||inptDom[j].type.indexOf("select")!=-1) {
					if( inptDom[j].children.length>0)
					{
						valueStr += inptDom[j].name + "=" + inptDom[j].children[inptDom[j].selectedIndex].value + "&";
					}
					else
					{
						valueStr += inptDom[j].name + "=&";
					}
				}
				else if(inptDom[j].type=="checkbox")
				{
					var ckb_value="";
					var ckb_name=inptDom[j].name;
					if(valueStr.indexOf(ckb_name)==-1)
					{
					    var ckb_nameCollect = Fast.Common.GetElemetsByName(ckb_name);

						for(var k=0;k<ckb_nameCollect.length;k++)
						{
							if(ckb_nameCollect[k].checked==true)
							{
								ckb_value+=ckb_nameCollect[k].value+",";
							}
						}
						if(ckb_value.length>0)
						{
							ckb_value=ckb_value.substring(0,ckb_value.length-1);
						}
					}
					valueStr += inptDom[j].name + "=" + ckb_value + "&";
				}
				else {
					valueStr += inptDom[j].name + "=" + encodeURIComponent(inptDom[j].value) + "&";
				}
			}
		}

	}
	return valueStr;
}





/*
@Date:2013-11-20
@Author:涂仁铨
@Description:仿照.NET实现的Repeater数据绑定功能 注：前台页面必须已 <!--[rep id="idName"]-->开始  <!--[/rep]--> 结束
*/
Fast.Common.Repeater = function () 
{
	this.Bind=function(tempObjId,JsData,parentObj)
	{
		var parantDom=parentObj;
		if(!parantDom)
		{
			parantDom=document.body;
		}
		var json = JsData;
		if(!parantDom.prototype)
		{
			parantDom.prototype={};
			parantDom.prototype.defaultHtml=parantDom.innerHTML;
		}
		var domHtml=parantDom.prototype.defaultHtml; 
		
		var domStartHtml;
		var domMidHtml;
		var domEndHtml;
		var oStart=0;
		var oEnd=0;
		
		//找到<!--[rep id=""-->之前的标签
		if(domHtml.indexOf(tempObjId)!=-1)
		{
			 oStart=domHtml.indexOf(tempObjId,oStart);			//找到标签在页面中的起始位置
			 oStart=domHtml.lastIndexOf("<!--[rep",oStart);
			 oEnd=domHtml.indexOf("-->",oStart)+3;
			 domStartHtml=domHtml.substring(0,oStart);
		}
		else
		{
			alert("找不到被绑定的ID");
			return;
		}
		if(json)
		{
			if (json.constructor == String) {
	        json = eval("(" + json + ")");
	   		}
		}
		else
		{
			domEndHtml=domHtml.substring(domHtml.indexOf("<!--[/rep]-->")+13,domHtml.length);
			parentObj.innerHTML=domStartHtml+domEndHtml;
			return;
		}
		//获取中间部分html
		oStart=oEnd;
		oEnd=domHtml.indexOf("<!--[/rep]-->",oStart);
		domMidHtml=domHtml.substring(oStart,oEnd);
		//对中间部分html代码进行替换重组
		var jsreg=/\[.{1,}?\]/g;		//匹配方括号里面的字符
		var bindItem=domMidHtml.match(jsreg);
		//alert(bindItem);
		//return;
		var copyhtml="";
		for(i=0;i<json.length;i++)
		{
		    copytemp = domMidHtml;
		    if (bindItem != null)
		    {
				for(var j=0;j<bindItem.length;j++)
				{
					var htmlItem=bindItem[j].replace('[',"").replace(']',"");	
					
					
						
						
						
						
						
					var newHtmlStr="";		//新内容	
					var itemObj=htmlItem.split(":");	//绑定自定义数据	Example:"add:a,b,c"
					var itemFunc=null;			//自定义函数		Example:"add"
					var paramStr=null;			//参数字符串	Example:"a,b,c"
					var itemParamName=null;		//参数数组名称		Example:[a,b,c]
					var itemParamValue="";			//参数数组值字符串		Example:11,32,45
					if(itemObj.length==1)
					{
						paramStr=itemObj[0];
					}
					else if(itemObj.length==2)
					{
						itemFunc=itemObj[0];
						paramStr=itemObj[1];
					}
					var itemParamName=paramStr.split(",");
					for(var k=0;k<itemParamName.length;k++)
					{
						if(itemParamName[k].indexOf("@")==-1)
						{
							itemParamValue+="'"+Fast.Common.GetJsonValue(json[i],itemParamName[k])+"',";
						}
						else
						{
							if(itemParamName[k]=="@Increment")
							{	
								itemParamValue+="'"+parseInt(i+1)+"',";
							}
						}
					}
					if(itemParamValue.length>0)
					{
						itemParamValue=itemParamValue.substring(0,itemParamValue.length-1);
					}
					if(itemFunc==null)
					{
						newHtmlStr=itemParamValue.replace("'","").replace("'","");
					}
					else
					{
						newHtmlStr=eval(itemFunc+"("+itemParamValue+")");
					}
					if(newHtmlStr.length>0)
					{
						newHtmlStr=newHtmlStr.replace("null","");
					}
					
					copytemp=copytemp.replace(bindItem[j],newHtmlStr);
					
					
					
					
					
					
					
					
					
//					if(htmlItem.indexOf("@Increment")!=-1)	//自增为1的ID
//					{
//						copytemp=copytemp.replace(bindItem[j],parseInt(i+1));
//					}
//					else if(htmlItem.indexOf(":")!=-1)	//如果遇到 Sum:a,b这种类型的参数，sum是函数，a和b是参数
//					{
//						var Fun=htmlItem.split(":")[0];
//						var params=htmlItem.split(":")[1].split(",");
//						var paramsValue="";
//						for(var h=0;h<params.length;h++)
//						{
//							paramsValue+="'"+Fast.Common.GetJsonValue(json[i],params[h])+"',";
//						}
//						paramsValue=paramsValue.substring(0,paramsValue.length-1);
//						
//						var bindHtmlStr=eval(Fun+"("+paramsValue+")");
//						copytemp=copytemp.replace(bindItem[j],bindHtmlStr);
//					}
//					else
//					{
//						var bindHtmlStr=Fast.Common.GetJsonValue(json[i],htmlItem);
//						copytemp=copytemp.replace(bindItem[j],bindHtmlStr);
//					}
					
				}
		    }
			copyhtml+=copytemp;
		}
		domMidHtml=copyhtml;
		//获取结束部分html
		oStart=domHtml.indexOf("-->",oStart)+3;
		domEndHtml=domHtml.substring(oStart,domHtml.length);
		parantDom.innerHTML=domStartHtml+domMidHtml+domEndHtml;
	}
}





/*
@Date:2014-1-14
@Author:涂仁铨
@Description:取出JSON数据里面的值
*/
Fast.Common.GetJsonValue=function(json,key)
{
	var keys=key.split(".");
	var value=json;
	for(var i=0; i<keys.length;i++)
	{
		value=value[keys[i]]
	}
	return value;
}









/*
@Date:2014-1-14
@Author:涂仁铨
@Description:修复浏览器不支持getElementsByName函数
*/
Fast.Common.GetElemetsByName=function(name)
{
    var elements = new Array();
    var allElements = document.getElementsByTagName("input");
    for (var i = 0; i < allElements.length; i++)
    {
        if (allElements[i].name == name)
        {
            elements.push(allElements[i]);
        }
    }
    return elements;
}






/*
@Date:2014-1-21
@Author:涂仁铨
@Description:分页控件
*/
//html分页控件
Fast.Common.HtmlPager=
{	
	CurrentPage:1,		//当前页
	PrePage:0,			//上一页
	NextPage:0,			//下一页
	PageSize:10,			//页大小
	PageCount:0,		//页总数
	RecordCount:0,		//记录总数
	CallBackHandler:null,	//回调函数
	
	
	
	
	
	//设置分页各变量数值
	//pageIndex当前页ID，pageCount：页面总数，recordCount：记录集总数
	SetPagerParam:function(pageIndex,pageCount,recordCount)
	{
		if(pageIndex>pageCount)
		{
			pageIndex=pageCount;
		}
		Fast.Common.HtmlPager.CurrentPage=pageIndex;
		Fast.Common.HtmlPager.PageCount=pageCount;
		Fast.Common.HtmlPager.RecordCount=recordCount;
		Fast.Common.HtmlPager.PrePage=parseInt(pageIndex-1);
		Fast.Common.HtmlPager.NextPage=parseInt(pageIndex+1);
		
		if(Fast.Common.HtmlPager.PrePage<1)
		{
			Fast.Common.HtmlPager.PrePage=1;
		}
		if(Fast.Common.HtmlPager.NextPage>pageCount)
		{
			Fast.Common.HtmlPager.NextPage=pageCount;
		}
	},
	
	//显示页面分页内容	
	ShowPagerHtml:function(oldObj,callBackHandler)
	{
		var obj=oldObj;
		Fast.Common.HtmlPager.CallBackHandler=callBackHandler;
		if(!callBackHandler)
		{
			Fast.Common.HtmlPager.CallBackHandler=function(a){};
		}
		if(!obj)
		{
			alert("初始化缺少必要参数");	
		}
		var pageHtml="";

		
		
		pageHtml+="<div class=\"pgtxt\">共有"+Fast.Common.HtmlPager.RecordCount+"条记录 每页记录数</div>";
		pageHtml+="<div class=\"pgsize\">";
		pageHtml+="	<div class=\"selected\"  onclick=\"Fast.Common.HtmlPager.OpenPageSizePanel('"+obj.id+"sizePanel',this)\">"+Fast.Common.HtmlPager.PageSize+"</div>";
		pageHtml+="	<div class=\"options\"  id='"+obj.id+"sizePanel'\">";
		pageHtml+="		<div class=\"options_top\"></div>";
		pageHtml+="		<div class=\"options_mid\">";
		pageHtml+="			<div class=\"mli\" onclick=\"Fast.Common.HtmlPager.SetPageSize(this)\">5</div> ";
		pageHtml+="			<div class=\"mli\" onclick=\"Fast.Common.HtmlPager.SetPageSize(this)\">10</div>";
		pageHtml+="			<div class=\"mli\" onclick=\"Fast.Common.HtmlPager.SetPageSize(this)\">15</div>";
		pageHtml+="			<div class=\"mli\" onclick=\"Fast.Common.HtmlPager.SetPageSize(this)\">30</div>";
		pageHtml+="			<div class=\"mli\" onclick=\"Fast.Common.HtmlPager.SetPageSize(this)\">50</div>";
		pageHtml+="		</div>";
		pageHtml+="		<div class=\"options_foot\"></div>";
		pageHtml+="	</div>";
		pageHtml+="</div>";
		pageHtml+="<div class=\"pgindex\" onclick=\"Fast.Common.HtmlPager.CallBackHandler.Transfer(1)\"></div>";
		pageHtml+="<div class=\"pgprevious\" onclick=\"Fast.Common.HtmlPager.CallBackHandler.Transfer("+Fast.Common.HtmlPager.PrePage+")\"></div>";
		pageHtml+="<div class=\"pgtxt\">第</div>";
		pageHtml+="<input class=\"pginput\" value=\""+Fast.Common.HtmlPager.CurrentPage+"\" onkeydown=\"Fast.Common.HtmlPager.PageTransfer(this)\" />";
		pageHtml+="<div class=\"pgtxt\">页</div>";
		pageHtml+="<div class=\"pgnext\" onclick=\"Fast.Common.HtmlPager.CallBackHandler.Transfer("+Fast.Common.HtmlPager.NextPage+")\"></div>";
		pageHtml+="<div class=\"pglast\" onclick=\"Fast.Common.HtmlPager.CallBackHandler.Transfer("+Fast.Common.HtmlPager.PageCount+")\"></div>";
		
		obj.innerHTML=pageHtml;
	},
	//显示设置页大小的下拉
	OpenPageSizePanel:function(obj,positionObj)
	{
		if(g$(obj))
		{
			var positionAttr=positionObj.getBoundingClientRect();			
			if(parseInt(150+positionAttr.top)>document.documentElement.offsetHeight)
			{
				 g$(obj).style.top="auto";
				 g$(obj).style.bottom="23px";
			}
			else
			{
				g$(obj).style.bottom="auto";
				g$(obj).style.top="23px";
			}
			g$(obj).style.display = "block";
			Fast.Common.AfterExitDomById(obj);
		}
	},
	
	//设置页大小
	SetPageSize:function(Obj)
	{
		
		if(Obj.parentNode.parentNode.parentNode.children[0])
		{
			Obj.parentNode.parentNode.parentNode.children[0].innerHTML=Obj.innerHTML+"";
			Fast.Common.HtmlPager.PageSize=Obj.innerHTML;
			Fast.Common.HtmlPager.CallBackHandler.SetPageSize(Obj.innerHTML);
		}
		else
		{
			alert("获取元素失败")
		}
	},
	//使用文本框跳转
	PageTransfer:function(obj)
	{
		if(event.keyCode==13)
		{
			var value=obj.value;
			var reg=new RegExp(/[0-9]{0,2}/);
			if(reg.test(value))
			{
				Fast.Common.HtmlPager.CallBackHandler.Transfer(value);
			}
		}
	}
	
}





/*
@Date:2014-1-22
@Author:涂仁铨
@Description:填充并绑定Select控件中的数据	selobj:下拉列表控件对象	json：json数据	value:绑定值
*/
Fast.Common.BindSelect=function(selobj,json,value)
{
	var selDom=selobj;
	var data=json;
	//selDom.options.length=0;
	
	for(var i=0;i<data.length;i++)
	{
		var varItem = new Option(data[i].text, data[i].value); 
		if(data[i].value==value)
		{
			varItem.selected=true; 
		}
		selobj.options.add(varItem);
	}
}



/*
@Date:2014-3-5
@Author:涂仁铨
@Description:根据最初始和最终列表，取得增加和删除的列表数据
@Params:defList,初始列表字符串  finalList,最终列表字符串
@Returns:返回json格式数据，实例{addList:'',delList:''}
*/
Fast.Common.GetChangeList = function (defList, finalList) {
    var addList = "";
    var delList = "";
    var defCollect = defList.split(",");
    var finalCollect = finalList.split(',');

    //1.在最终的列表中的某个值，如果在初始列表中不存在，则视为被添加的部分
    for (var i = 0; i < finalCollect.length; i++) {
        if (finalCollect[i] != "" && defList.indexOf(finalCollect[i]) == -1) {
            addList += finalCollect[i] + ",";
        }
    }
    //2.在初始的列表中的某个值，如果在最终列表中搜索不到，则视为被删除的部分
    for (var i = 0; i < defCollect.length; i++) {
        if (defCollect[i] != "" && finalList.indexOf(defCollect[i]) == -1) {
            delList += defCollect[i] + ",";
        }
    }
    if (addList.length > 0) {
        addList = addList.substring(0, addList.length - 1);
    }
    if (delList.length > 0) {
        delList = delList.substring(0, delList.length - 1);
    }
    var result = { addList: addList, delList: delList };
    return result;
}



































