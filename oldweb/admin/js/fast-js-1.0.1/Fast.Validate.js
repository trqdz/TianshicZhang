

/*
@Date:2014-4-28
@Author:涂仁铨
@Description:Fast前端验证类
*/
Fast.Validate={};


/*
需要验证的内容集合
*/
Fast.Validate.ValiArray=null;




/*
@Date:2014-4-28
@Author:涂仁铨
@Description:添加验证
@Example:obj：控件对象，valiType:验证方式，customMsg：自定义错误，valiMode：验证模式，warning/throwError
*/
Fast.Validate.AddValidation=function(obj,valiType,customMsg,valiMode)
{

	if(Fast.Validate.ValiArray==null)
	{
		Fast.Validate.ValiArray=new Array();
	}
	var valiModeStr="throwError";	//默认模式为，验证不通过阻止表单提交
	if(valiMode)	//该值不能为空
	{
		valiModeStr=valiMode;
	}
	Fast.Validate.ValiArray.push({ "obj": obj, "valiType": valiType, "customMsg": customMsg, "valiMode": valiModeStr });
	//obj.setAttribute("onclick", "Fast.Validate.ClearCss()");
	obj.setAttribute("onblur", "Fast.Validate.ClearCss()");
}



/*
@Date:2014-4-28
@Author:涂仁铨
@Description:验证
*/
Fast.Validate.Verify=function()
{
    Fast.Validate.ClearCss();//清除所有样式
    document.onmouseup = function ()
    {
        Fast.Validate.ClearCss();
    }

	var valiArray=Fast.Validate.ValiArray;
	for(var i=0;i<valiArray.length;i++)
	{
	    

		if(valiArray[i].valiType=="NOTNULL")		//不为空验证
		{
			if(valiArray[i].obj.value=="")
			{
				var customMsg="该项输入不可为空！";
				if(valiArray[i].customMsg)
				{
					customMsg=valiArray[i].customMsg;
				}
				Fast.Validate.SetCss(valiArray[i].obj,valiArray[i].valiMode,customMsg);
				if(valiArray[i].valiMode=="throwError")		//如果是抛出错误类型验证，则阻止表单提交
				{
					valiArray[i].obj.focus();
					return false;
				}
			}
		}
		else if(valiArray[i].valiType.split(":")[0]=="EQUAL")		//两个输入项比较验证
		{
			var equalObj=eval(valiArray[i].valiType.split(":")[1]);
			var customMsg="二次输入必须一致！";
			if(valiArray[i].customMsg)
			{
				customMsg=valiArray[i].customMsg;
			}
			if(valiArray[i].obj.value!=equalObj.value)
			{
				Fast.Validate.SetCss(valiArray[i].obj,valiArray[i].valiMode,customMsg);
				if(valiArray[i].valiMode=="throwError")		
				{
					valiArray[i].obj.focus();
					return false;
				}
			}
		}
		else if(valiArray[i].valiType=="EMAIL")		//电子邮件格式验证
		{
			if(valiArray[i].obj.value.match(/^(.+)@(.+)$/)==null)
			{
				var customMsg="数据类型必须为Email格式！";
				if(valiArray[i].customMsg)
				{
					customMsg=valiArray[i].customMsg;
				}
				Fast.Validate.SetCss(valiArray[i].obj,valiArray[i].valiMode,customMsg);
				if(valiArray[i].valiMode=="throwError")		
				{
					valiArray[i].obj.focus();
					return false;
				}
			}
		}
		else if(valiArray[i].valiType=="MOBILE")
		{
			var fvalue=valiArray[i].obj.value;
			if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(fvalue)))
			{
				var customMsg=valiArray[i].customMsg!=null?valiArray[i].customMsg:	"不是有效的手机号码！";
				Fast.Validate.SetCss(valiArray[i].obj,valiArray[i].valiMode,customMsg);
				if(valiArray[i].valiMode=="throwError")		
				{
					valiArray[i].obj.focus();
					return false;
				}
			}
		}
		else if(valiArray[i].valiType=="DATETIME")
		{
			var fvalue=valiArray[i].obj.value;
			
			var regex = new RegExp("^(?:(?:([0-9]{4}(-|\/)(?:(?:0?[1,3-9]|1[0-2])(-|\/)(?:29|30)|((?:0?[13578]|1[02])(-|\/)31)))|([0-9]{4}(-|\/)(?:0?[1-9]|1[0-2])(-|\/)(?:0?[1-9]|1\\d|2[0-8]))|(((?:(\\d\\d(?:0[48]|[2468][048]|[13579][26]))|(?:0[48]00|[2468][048]00|[13579][26]00))(-|\/)0?2(-|\/)29))))$"); 
			if (!regex.test(fvalue))
			{ 
				var customMsg=valiArray[i].customMsg!=null?valiArray[i].customMsg:	"不是合法的日期格式！";
				Fast.Validate.SetCss(valiArray[i].obj,valiArray[i].valiMode,customMsg);
				if(valiArray[i].valiMode=="throwError")		
				{
					valiArray[i].obj.focus();
					return false;
				}
			} 
		}
		else if(valiArray[i].valiType=="IDNUMBER")
		{
			var fvalue=valiArray[i].obj.value;
			var vresult=Fast.Validate.ValiIDNumber(fvalue);
			if(vresult!=true)
			{
				
				var customMsg=valiArray[i].customMsg!=null?valiArray[i].customMsg:	"不是有效的身份证号码！";
				Fast.Validate.SetCss(valiArray[i].obj,valiArray[i].valiMode,customMsg);
				if(valiArray[i].valiMode=="throwError")		
				{
					valiArray[i].obj.focus();
					return false;
				}
			}

		}
		
		
		
	}
	return true;
}




/*
@Date:2014-4-28
@Author:涂仁铨
@Description:设置验证CSS样式
*/
Fast.Validate.SetCss=function(obj,valiMode,msgValue)
{

	var scrollTop= document.documentElement.scrollTop!=0?document.documentElement.scrollTop:document.body.scrollTop;
    var parentAttr = obj.getBoundingClientRect();

    var validateDom=document.createElement("div");
	validateDom.className="fast_validate";
	validateDom.style.width=parentAttr.width+"px";
	validateDom.style.left=parentAttr.left+"px";
	validateDom.style.top=parseInt(scrollTop+parentAttr.top+parentAttr.height)+"px";
	validateDom.innerHTML='\
		<fieldset class="'+valiMode+'" style="z-index:999999">'+msgValue+'</fieldset>\
	';
	
	document.body.appendChild(validateDom);


//	var objInput=obj;
//	var objParent=obj.parentNode;
//	
//	var xPosition=objInput.offsetLeft		//X坐标
//	var yPosition=parseInt((objInput.offsetTop+2)+objInput.clientHeight);		//Y坐标
//	
//	
//	objParent.style.position="relative"
//	var objValidate=document.createElement("div");
//	objValidate.className="validate";
//	objValidate.setAttribute("style","left:"+xPosition+"px; top:"+yPosition+"px; ");
//
//	var validateHtml="";
//	validateHtml+="<div class=\""+valiMode+"\">";
//	validateHtml+="		<div class=\"vtop\"></div>";
//	validateHtml+="		<div class=\"vmiddle\"><fieldset>"+msgValue+"</fieldset></div>";
//	validateHtml+=" 	<div class=\"vbottom\"></div>";
//	validateHtml+="</div>";
//	objValidate.innerHTML=validateHtml;
//	objParent.appendChild(objValidate);
		
}



/*
@Date:2014-4-28
@Author:涂仁铨
@Description:清除所有的错误提示
*/
Fast.Validate.ClearCss=function()
{
	var objCollection=document.body.getElementsByTagName("div");
	for(var i=0;i<objCollection.length;i++)
	{
		if(objCollection[i].className=="fast_validate")
		{
			objCollection[i].parentNode.removeChild(objCollection[i]);
			i--;
		}
	}
}




/*
@Date:2014-4-28
@Author:涂仁铨
@Description:验证身份证号码
@From:http://www.nowamagic.net/librarys/veda/detail/214
*/
Fast.Validate.ValiIDNumber=function(code)
{
	var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
	  var tip = "";
	  var pass= true;
	  
	  if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
		  tip = "身份证号格式错误";
		  pass = false;
	  }
	  
	 else if(!city[code.substr(0,2)]){
		  tip = "地址编码错误";
		  pass = false;
	  }
	  else{
		  //18位身份证需要验证最后一位校验位
		  if(code.length == 18){
			  code = code.split('');
			  //∑(ai×Wi)(mod 11)
			  //加权因子
			  var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
			  //校验位
			  var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
			  var sum = 0;
			  var ai = 0;
			  var wi = 0;
			  for (var i = 0; i < 17; i++)
			  {
				  ai = code[i];
				  wi = factor[i];
				  sum += ai * wi;
			  }
			  var last = parity[sum % 11];
			  if(parity[sum % 11] != code[17]){
				  tip = "校验位错误";
				  pass =false;
			  }
		  }
	  }
	  return pass;
}




















