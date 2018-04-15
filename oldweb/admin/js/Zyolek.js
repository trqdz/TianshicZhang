


/*
@Date:2013-10-23
@Author:涂仁铨
@Description:整个项目的基础类库
*/
var Zyolek=
{
	ParseJSON:{},
}



//全局选择器
function g$(Id)
{
	return document.getElementById(Id);
}

/*
@Date:2013-10-24
@Author:涂仁铨
@Description:将数据类型转换成JSON格式，以后继续优化
*/
Zyolek.ParseJSON=function(jsonStr)
{
	return eval("("+jsonStr+")");;
}
