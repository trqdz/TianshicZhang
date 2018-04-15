


Fast.Contorls={};





/*
@Date:2014-3-24
@Author:涂仁铨
@Description:树形控件操作类
*/
Fast.Contorls.Tree=
{
	//展示树形菜单
	Show:function(data)
	{
		var treeDom=data.treeDom;
		var showIcon=data.showIcon!=null?data.showIcon:false;
		var treeJson=data.treeJson?data.treeJson:[];
		var depth=data.depth!=null?data.depth:0;
		var showChild=data.showChild;

		
		
		
		
		
		
		
		
		
		/*
		example treeJson={id:1,text:'root',state:open,iconSrc:'',children:null}
		*/
		//设定内容展开和闭合方式
		var itemDisplay="";
		if(showChild==false||showChild=="false")
		{
			itemDisplay="none";
		}
		else
		{
			itemDisplay="block";
		}
		var tempHtml='<div class="fast_tree_list" style=" display:'+itemDisplay+'">';
		for(var i=0;i<treeJson.length;i++)
		{
			//遍历JSON数据，绑定子项
			tempHtml+='<div id="tree'+treeJson[i].id+'" class="fast_tree_item">';
			tempHtml+='		<div class="fast_tree_option">';
			//根据深度进行缩进
			for(var j=0;j<depth;j++)
			{
				tempHtml+='<div class="fast_tree_split"></div>';
			}
			var showChildList=true;
			var stateClass="";
			//如果该项包含子项，设定其展开闭合方式
			if(treeJson[i].children!=null&&treeJson[i].children.length>0)
			{
				if(treeJson[i].state==false||treeJson[i].state=="false")
				{
					showChildList=false;
					stateClass="fast_tree_ctrlclose";
				}
				else
				{
					showChildList=true;
					stateClass="fast_tree_ctrlopen";
				}
				tempHtml+='			<div class="fast_tree_ctrl '+stateClass+'" onClick="Fast.Contorls.Tree.SetChildren(this);"></div>';
			}
			else
			{
				tempHtml+='			<div class="fast_tree_ctrl" ></div>';
			}
			if(showIcon==true)
			{
				tempHtml+='			<div class="fast_tree_icon" style=" background-image:url('+treeJson[i].iconSrc+')"></div>';
			}
			tempHtml+='			<div class="fast_tree_span">'+treeJson[i].text+'</div>';
			tempHtml+='		</div>';
			//如果子项不为空，则递归
			if(treeJson[i].children!=null&&treeJson[i].children.length>0)
			{
				tempHtml+=Fast.Contorls.Tree.Show({treeJson:treeJson[i].children,depth:depth+1,showIcon:showIcon,state:treeJson[i].state,showChild:showChildList});
			}
			tempHtml+='</div>';
			//var dom=
		}
		tempHtml+='</div>';
		if(treeDom)
		{
			treeDom.innerHTML=tempHtml;
		}
		else
		{
			return tempHtml;
		}
		
		
	},
	SetChildren:function(obj)
	{
		if(obj.parentNode.parentNode.children[1].style.display!="none")
		{
			obj.parentNode.parentNode.children[1].style.display="none";
			obj.className="fast_tree_ctrl fast_tree_ctrlclose";
		}
		else
		{
			obj.parentNode.parentNode.children[1].style.display="block";
			obj.className="fast_tree_ctrl fast_tree_ctrlopen";
		}
	}
}














/*
@Date:2013-12-9
@Author:涂仁铨
@Description:初始化功能项菜单
*/
Fast.Contorls.InitMenu=function(dom,json)
{
	var domhtml="";
	for(var i=0;i<json.length;i++)
	{
		
		
		var childhtml='';
		var collapes="";
		if(json[i].children!=null&&json[i].children.length>0)
		{
			childhtml+='<div class="childMenu">';
			for(var j=0;j<json[i].children.length;j++)
			{
				childhtml+='<div class="vicemenu" onClick="Fast.Contorls.Redirect(&quot;'+json[i].children[j].url+'&quot;)">';
				if(j!=json[i].children.length-1)
				{
					childhtml+='<div class="vicon"></div>';
				}
				else
				{
					childhtml+='<div class="vicon2"></div>';
				}
				childhtml+='<div class="sptxt">'+json[i].children[j].title+'</div>\
						</div>';
			}
			childhtml+='</div>';
			collapes="fold";
		}	
		
		
		
		var lihtml='<div class="mli">\
						<div class="mainItem" onClick="Fast.Contorls.Redirect(&quot;'+json[i].url+'&quot;)">\
							<div class="collapes '+collapes+'" onClick="Fast.Contorls.CollapesMenu(this);"></div>\
							<div class="icon" style="background-image:url('+json[i].icon+');"></div>\
							<div class="span">'+json[i].title+'</div>\
						</div>';
		lihtml+=childhtml;		
		lihtml+="</div>";	
		domhtml+=	lihtml;		
	}
	dom.innerHTML=domhtml;

}



/*
@Date:2014-1-8
@Author:涂仁铨
@Description:使网页中的Iframe页面重定向
*/
Fast.Contorls.Redirect=function(url)
{

	if(url=="#")
	{
		return;
	}
	else if(url!=null&&url.length>0)
	{
		g$("mright").innerHTML="<iframe name='midframe' src='"+url+"'></iframe>";
	}

}















/*
@Date:2014-2-21
@Author:涂仁铨
@Description:页签控制类
*/
Fast.Contorls.TabContorl=
{
	TabPanel:null,				//页签标题容器元素
	TabContentPanel:null,		//页签内容区容器元素
	DelayPrompt:null,			//是否开启延迟提示
	CloseAnimation:null,		//是否开启关闭动画效果
	//初始化页签控制类，如果未初始化，则无法使用该对象
	Init:function(tabPanel,tabContentPanel,delayPrompt,closeAnimation)
	{
		
		Fast.Contorls.TabContorl.TabPanel=tabPanel;
		Fast.Contorls.TabContorl.TabContentPanel=tabContentPanel;
		Fast.Contorls.TabContorl.DelayPrompt=delayPrompt;
		Fast.Contorls.TabContorl.CloseAnimation=closeAnimation;
	},
	
	//打开新页签
	Open:function(tabObj)
	{
		var Obj=tabObj;
		var tabListDom=Fast.Contorls.TabContorl.TabPanel;					//页签标题存放区域对象
		var tabContDom=Fast.Contorls.TabContorl.TabContentPanel;			//页签内容存放区域对象
		var delayPrompt=Fast.Contorls.TabContorl.DelayPrompt;				//是否显示延迟效果
		
		//如果页签未读，则在幕后开启页签
		if(tabObj.whetherRead=="false")
		{
			Fast.Contorls.TabContorl.BackstageOpen(tabObj);
			return;
		}
		
		
		
		//如果页签已被打开，则展示
		if(g$(tabObj.tabId))
		{
			Fast.Contorls.TabContorl.SetFocus(tabObj.tabId);
			return;
		}
		
		
		
		
		if(!tabListDom)
		{
			alert("也签容器对象为空！");
			return 1;
		}
		if(!Obj.tabType)
		{
			alert("页签样式不可为空");
			return 2;
		}
		var tabAreaObj=g$(Obj.tabType);
		if(!tabAreaObj)		//如果不存在该对象，则创建
		{
			var tabElement=document.createElement("div");
			tabElement.className=Obj.tabType;
			tabElement.id=Obj.tabType;
			tabListDom.appendChild(tabElement);
			tabAreaObj=tabElement;
		}
		
		//1.用二次循环使页签和功能区失去焦点或隐藏
		for(var i=0;i<tabListDom.children.length;i++)
		{
			
			for(var j=0;j<tabListDom.children[i].children.length;j++)
			{
				if(tabListDom.children[i].children[j].children[0].className=="tabFocus")//如果该页签状态为未读，禁止切换效果
				{
					tabListDom.children[i].children[j].children[0].className="tabBlur";
				}
			}
		}

		for(var i=0;i<tabContDom.children.length;i++)
		{
			tabContDom.children[i].style.display="none";
		}
		
		
		
		
		//2.展示页签标题
		var newTab=document.createElement("div");
		newTab.className="li";
		var newTabHtml="";
		var tabClass="tabFocus";
		newTabHtml+="<div class=\""+tabClass+"\" id=\""+Obj.tabId+"\">";
		newTabHtml+="	<div class=\"tabtit\"   onclick=\"Fast.Contorls.TabContorl.SetFocus('"+Obj.tabId+"')\" >";
		if(Obj.tabIcon!=null&&Obj.tabIcon!='')
		{
			newTabHtml+="		<div class=\"icon\"><img src=\""+Obj.tabIcon+"\"></div>";
		}
		newTabHtml+="		<div class=\"txt\">"+Obj.title+"</div>";
	//	newTabHtml+="		<div class=\"change\">*</div>";
		newTabHtml+="	</div>";
		newTabHtml+="	<div class=\"ctrl\" onclick=\"Fast.Contorls.TabContorl.Close('"+Obj.tabId+"')\" ><div class=\"close\"></div></div>";
		newTabHtml+="</div>";
		newTab.innerHTML  =newTabHtml;
		tabAreaObj.appendChild(newTab);

		
		//3.页签内容展示
		var contHtml=document.createElement("div");
		contHtml.id=Obj.tabId+"cont";
		contHtml.className="itemPage";
		if(delayPrompt=="true")
		{
			contHtml.innerHTML+="<div class=\"loading\"><div class=\"loadingBox\">加载中稍后</div></div>";
		}
		contHtml.innerHTML+="<div class=\"ifram\"><iframe id='"+Obj.tabId+"fram' tabId='"+Obj.tabId+"' tabId='"+Obj.tabId+"' saveBeforeClosing='"+Obj.saveBeforeClosing+"' src=\""+Obj.url+"\" frameborder=\"0\" width=\"100%\" height=\"100%;\"></iframe> </div>";
		tabContDom.appendChild(contHtml);
		
		
		
		
		//4.关闭等待遮罩层
		g$(Obj.tabId+"fram").onload=function() 
		{
			if (this.readyState&&this.readyState != 'complete')
			{
				
				return;
			} 
			else
			{
				try
				{
					if(g$(Obj.tabId+"cont").children[0].className=="loading")
					{
						
						g$(Obj.tabId+"cont").removeChild(g$(Obj.tabId+"cont").children[0]);
	
					}
				}
				catch(ex){}
			}
		}
		

	},
	
	//幕后打开页签
	BackstageOpen:function(tabObj)
	{
		var Obj=tabObj;
		var tabListDom=Fast.Contorls.TabContorl.TabPanel;					//页签标题存放区域对象
		var tabContDom=Fast.Contorls.TabContorl.TabContentPanel;			//页签内容存放区域对象
		var delayPrompt=Fast.Contorls.TabContorl.DelayPrompt;				//是否显示延迟效果
		
		if(g$(tabObj.tabId))
		{
			return;
		}
		
		var tabAreaObj=g$(Obj.tabType);
		if(!tabAreaObj)		//如果不存在该对象，则创建
		{
			var tabElement=document.createElement("div");
			tabElement.className=Obj.tabType;
			tabElement.id=Obj.tabType;
			tabListDom.appendChild(tabElement);
			tabAreaObj=tabElement;
		}
		
		
		
		//展示页签标题
		var newTab=document.createElement("div");
		newTab.className="li";
		var newTabHtml="";
		var tabClass="tabUnRead";
		newTabHtml+="<div class=\""+tabClass+"\" id=\""+Obj.tabId+"\">";
		newTabHtml+="	<div class=\"tabtit\"   onclick=\"Fast.Contorls.TabContorl.SetFocus('"+Obj.tabId+"')\" >";
		newTabHtml+="		<div class=\"icon\"><img src=\""+Obj.tabIcon+"\"></div>";
		newTabHtml+="		<div class=\"txt\">"+Obj.title+"</div>";
	//	newTabHtml+="		<div class=\"change\">*</div>";
		newTabHtml+="	</div>";
		newTabHtml+="	<div class=\"ctrl\" onclick=\"Fast.Contorls.TabContorl.Close('"+Obj.tabId+"')\" ><div class=\"close\"></div></div>";
		newTabHtml+="</div>";
		newTab.innerHTML  =newTabHtml;
		tabAreaObj.appendChild(newTab);
		
		
		
		
		//页签内容展示
		var contHtml=document.createElement("div");
		contHtml.id=Obj.tabId+"cont";
		contHtml.className="itemPage";
		contHtml.style.display="none";
		if(delayPrompt=="true")
		{
			contHtml.innerHTML+="<div class=\"loading\"><div class=\"loadingBox\">加载中稍后</div></div>";
		}
		contHtml.innerHTML+="<div class=\"ifram\"><iframe id='"+Obj.tabId+"fram' tabId='"+Obj.tabId+"' tabId='"+Obj.tabId+"' saveBeforeClosing='"+Obj.saveBeforeClosing+"' src=\""+Obj.url+"\" frameborder=\"0\" width=\"100%\" height=\"100%;\"></iframe> </div>";
		tabContDom.appendChild(contHtml);
		
		
		
		
		//关闭等待遮罩层
		g$(Obj.tabId+"fram").onload=function() 
		{
			if (this.readyState&&this.readyState != 'complete')
			{
				
				return;
			} 
			else
			{
				try
				{
					if(g$(Obj.tabId+"cont").children[0].className=="loading")
					{
						
						g$(Obj.tabId+"cont").removeChild(g$(Obj.tabId+"cont").children[0]);
	
					}
				}
				catch(ex){}
			}
		}
		
		
	},
	
	//获取当前已打开的页签总数
	GetTabCount:function()
	{
		var tCount=0;
		for(var i=0;i<tabListDom.children.length;i++)
		{
			
			for(var j=0;j<tabListDom.children[i].children.length;j++)
			{
				tCount++;
			}
		}
		return tCount;
	},
	
	//使页签获得焦点
	SetFocus:function(tabId)
	{
		
		//alert(g$(tabId).className);
		var tabListDom=Fast.Contorls.TabContorl.TabPanel;					//页签标题存放区域对象
		var tabContDom=Fast.Contorls.TabContorl.TabContentPanel;			//页签内容存放区域对象
		//含有多级子对象，故用二次循环
		for(var i=0;i<tabListDom.children.length;i++)
		{
			for(var j=0;j<tabListDom.children[i].children.length;j++)
			{
				if(tabListDom.children[i].children[j].children[0].className=="tabFocus")//如果该页签状态为未读，禁止切换效果
				{
					tabListDom.children[i].children[j].children[0].className="tabBlur";
				}
			}
		}
		//将原有页签中的内容全部隐藏
		for(var i=0;i<tabContDom.children.length;i++)
		{
			tabContDom.children[i].style.display="none";
		}
		
		
		if(g$(tabId))
		{
			
			g$(tabId).className="tabFocus";
			//alert(g$(tabId).parentNode.innerHTML);
			g$(tabId+"cont").style.display="";
		}

	},
	//关闭页签,带有动态效果
	Close:function(tabId)
	{
		
		var tabid=tabId
		var closeAnimation=Fast.Contorls.TabContorl.CloseAnimation;
		//alert(document.documentMode)
		if(closeAnimation=="true")
		{

			g$(tabid).children[1].onclick=function(){return false;};
			var r_i=0;
			var speedTimer=50;//config.global.TabSettings.animationSpeed;
			if(speedTimer==null)
			{
				speedTimer=50;
			}
			var timerRoate= setInterval(function()
			{
				var valueStr=" filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);-webkit-transform: rotate("+r_i*20+"deg); -moz-transform: rotate("+r_i*20+"deg); -o-transform: rotate("+r_i*20+"deg);transform: rotate("+r_i*20+"deg);";
				g$(tabid).children[1].setAttribute("style",valueStr);
				r_i++;
				
				var maxanimation=36;//config.global.TabSettings.animationCount;
				if(maxanimation==null)
				{
					maxanimation=18;
				}
				//如果已旋转次数超过指定值，则关闭页签
				if(r_i>=maxanimation)
				{
					clearInterval(timerRoate);
					Fast.Contorls.TabContorl.DoClose(tabid);
					
					//thisFun.doExit(obj);
				}
			}
			,1000/speedTimer);
		}
		else
		{
			Fast.Contorls.TabContorl.DoClose(tabid);
		}
		
		
	},
	//直接关闭页签
	DoClose:function(tabId)
	{
		
		
		var tabListDom=Fast.Contorls.TabContorl.TabPanel;		
		//删除该对象
		g$(tabId).parentNode.parentNode.removeChild(g$(tabId).parentNode);
		g$(tabId+"cont").parentNode.removeChild(g$(tabId+"cont"));
		
		//使所有页签失去焦点
		for(var i=0;i<tabListDom.children.length;i++)
		{
			
			for(var j=0;j<tabListDom.children[i].children.length;j++)
			{
			
				if(tabListDom.children[i].children[j].children[0].className=="tabFocus")//如果该页签状态为未读，禁止切换效果
				{
					tabListDom.children[i].children[j].children[0].className="tabBlur";
					g$(tabListDom.children[i].children[j].children[0].id+"cont").style.display="none";
				}
			}
		}
		
		//使最后一个页签获得焦点
		
		for(var i=0;i<tabListDom.children.length;i++)
		{
			var lastTabIndex=tabListDom.children[i].children.length-1;
			if(lastTabIndex>=0)
			{
				tabListDom.children[i].children[lastTabIndex].children[0].className="tabFocus";
				g$(tabListDom.children[i].children[lastTabIndex].children[0].id+"cont").style.display="";
				return;
			}


		}
		
		return;
		//使第一个页签获得焦点
//		for(var i=0;i<tabListDom.children.length;i++)
//		{
//			for(var j=0;j<tabListDom.children[i].children.length;j++)
//			{
//				if(tabListDom.children[i].children[j].children[0].className=="tabBlur")
//				{
//					tabListDom.children[i].children[j].children[0].className="tabFocus";
//					g$(tabListDom.children[i].children[j].children[0].id+"cont").style.display="";
//					return;
//				}
//				
//			}
//		}
	}
	
}





/*
@Date:2014-3-19
@Author:涂仁铨
@Description:拖动控件
*/
Fast.Contorls.StartDrag=function(obj)
{
	
	obj.style.cursor="move";
	var win=window;
	var defaultX=event.x-Fast.GetLeft(obj)
	var defaultY=event.y-Fast.GetTop(obj)

	win.document.onmousemove=function()
	{
		obj.style.cursor="move";
		var absoluteX=Fast.GetMouseX(event)-defaultX;
		var absoluteY=Fast.GetMouseY(event)-defaultY;
		obj.style.left=absoluteX+"px";
		obj.style.top=absoluteY+"px";
	}
	
	win.document.onmouseup=function()
	{
		obj.style.cursor="";
		win.document.onmousemove=function()
		{
			return false;
		}
	}
}



/*
@Date:2014-4-18
@Author:涂仁铨
@Description:显示下拉更多列表
@Params:targetDom,目标对象|width,控件宽度|height,控件高度|callBack,回调函数|data,下拉数据{text:名称,value:值}
*/
Fast.Contorls.ShowDropList=function(param)
{	
	var parentDom=param.targetDom;
	if(parentDom==null)
	{
		Fast.Alert("参数非法！");
		return;
	}
	
	var parentDomAttr=parentDom.getBoundingClientRect();
	var width=param.width?param.width:parentDomAttr.width;
	var height=param.height?param.height:100;
	var data=param.data;
	var callBack=param.callBack?param.callBack:function(){}; 
	
	if(g$("fastDroplistDom"))
	{
		g$("fastDroplistDom").parentNode.removeChild(g$("fastDroplistDom"));
	}
	var dropListDom=document.createElement("div");
	
	
	
	if (data == null) { return}
	for(var i=0;i<data.length;i++)
	{
		var dataItem=document.createElement("div");
		dataItem.className="dropli";
		dataItem.innerHTML="<span>"+data[i].text+"</span>";
		dataItem.setAttribute("attrText",data[i].text);
		dataItem.setAttribute("attrValue",data[i].value);
		
		dataItem.onclick=function(obj)
		{
			var attrText=this.getAttribute("attrText");
			var attrValue=this.getAttribute("attrValue");
			callBack(attrText,attrValue);
		}
		dropListDom.appendChild(dataItem);
	}
	
	document.body.appendChild(dropListDom);
	dropListDom.id="fastDroplistDom";
	dropListDom.className="fast_droplist";

	dropListDom.style.width=(width-2)+"px";
	dropListDom.style.height=height+"px";
	dropListDom.style.top = document.body.scrollTop+parentDomAttr.top + parentDomAttr.height + "px";
	dropListDom.style.left=parentDomAttr.left+"px";
	
	Fast.Common.AfterExitDomById("fastDroplistDom");
	
}








































