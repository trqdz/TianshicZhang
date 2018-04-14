<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="admin_index" %>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>网站后台管理系统</title>
<link href="css/index.css" rel="stylesheet" type="text/css">
<script src="../js/libs/jquery-1.9.1.min.js"></script>
<link href="js/fast-js-1.0.1/themes/Fast.css" rel="stylesheet" type="text/css" />
<script src="js/fast-js-1.0.1/Fast.js"></script>
<script src="js/fast-js-1.0.1/Fast.Common.js"></script>
<script src="js/fast-js-1.0.1/Fast.Contorls.js"></script>
</head>

<body scroll="no" onResize="">


	<div class="top"><img src="images/logo2.png" /></div>
	<div class="middle">
    	<div class="left">
        	<div class="header">
            	<div class="sdiv">系统主菜单</div>
                <div style="width:100%;"><a href="loginOut.aspx" style=" color:#000; text-decoration:none; margin-left:50px; ">退出系统</a></div>
            </div>
            <div class="menuList">
                <div class="menuItem"  href="modules/charts/index.aspx">
                    <div class="icon" style=" background-image:url(images/photos.png)"></div>
                    <span>今日运营信息</span>
                </div>
<%--		<div class="menuItem"  href="modules/system/sysSetting.aspx">
                    <div class="icon" style=" background-image:url(images/icon_Pwd.png)"></div>
                    <span>系统开奖设置</span>
                </div>   --%>
                <div class="menuItem" href="modules/resetPwd.aspx">
                    <div class="icon" style=" background-image:url(images/account.png)"></div>
                    <span>帐号密码管理</span>
                </div>
                
                <div class="menuItem"  href="modules/member/userList.aspx">
                    <div class="icon" style=" background-image:url(images/group.png)"></div>
                    <span>会员信息维护</span>
                </div>
                <div class="menuItem"  href="modules/lottery/lotteryList.aspx">
                    <div class="icon" style=" background-image:url(images/document.png)"></div>
                    <span>开奖排期管理</span>
                </div>
<%--                <div class="menuItem"  href="/scripts/ckfinder/ckfinder.html?Type=Images&CKEditor=NewsContent&CKEditorFuncNum=1&langCode=zh-cn">
                    <div class="icon" style=" background-image:url(images/photos.png)"></div>
                    <span>会员提现管理</span>
                </div>   --%> 
<%--                <div class="menuItem" href="modules/plSettings.aspx">
                    <div class="icon" style=" background-image:url(images/comment.png)"></div>
                    <span>游戏赔率设置</span>
                </div>--%>
                <div class="menuItem" href="modules/eventlog/logList.aspx">
                    <div class="icon" style=" background-image:url(images/comment.png)"></div>
                    <span>系统操作日志</span>
                </div>
            </div>
        </div>
        <div class="right">
        	<iframe id="modules" name="modules" src="modules/charts/index.aspx"></iframe>
        </div>
        
    </div>




	<div class="foot"><span>维多利亚娱乐城-网站后台管理系统</span></div>

</body>
</html>
<script>

$(function()
{
	var offsetHeight=91;
	$(window).resize(function()
	{
		$("iframe").height(document.documentElement.clientHeight-offsetHeight)
	});
	$("iframe").height(document.documentElement.clientHeight-offsetHeight)
})





$(".menuItem").click(function()
{
	$(".menuItem").removeClass("focus");
	$(this).addClass("focus")
	document.getElementById("modules").src=$(this).attr("href");
});






</script>











