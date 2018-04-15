<%@ Page Language="C#" AutoEventWireup="true" CodeFile="sm1.aspx.cs" Inherits="sm1" %>
<%@ Register Src="~/footer.ascx" TagName="Footer" TagPrefix="asc" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<title>XXX算命网</title>
	<link rel="stylesheet" type="text/css" href="css/style.css" />
    <script src="js/libs/zepto.min.js"></script>
    <script src="js/libs/Util.js"></script>
</head>
<body>
	<header>
        <div class="goback"></div>
        <div class="htitle"><%=smInfo.Name %></div>

    </header>

    <div class="sminfo">
        <form <%--action="smShow.aspx"--%> method="post">
		<div class="desc"><%=smInfo.Description %></div>
		<div class="li">
			<div class="key">姓名：</div>
			<div class="value"><input class="xingming" name="CNName" type="text"></div>
			<div class="clearfix"></div>
		</div>
		<div class="li">
			<div class="key">性别：</div>
			<div class="value">
				<span class="rdoitem"><input name="gender" type="radio" checked="checked" value="男">男</span>
				<span class="rdoitem"><input name="gender" type="radio" value="女">女</span>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="li">
			<div class="key">历法：</div>
			<div class="value">
				<span class="rdoitem"><input name="lifa" value="农历" checked="checked" type="radio">农历</span>
				<span class="rdoitem"><input name="lifa" value="阳历" type="radio">阳历</span>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="li">
			<div class="key">出生：</div>
			<div class="value">
				<span class="yearitem">
					<select id="selYear" runat="server" name="selYear"></select>
                    <select id="selMonth" runat="server" name="selMonth"></select>
                    <select id="selDay" runat="server" name="selDay"></select>
                    <select id="selHour" runat="server" name="selHour"></select>
				</span>
			</div>
			<div class="clearfix"></div>
		</div>
	
		
		<div class="btns">
            <input type="hidden" name="id" value="<%=smInfo.Id %>" />
            <input type="hidden" name="action" value="gosuanming" />
            <input class="btnbuy" type="submit"  value="<%=smInfo.BtnName %>" />
		</div>
		</form>

	</div>

    <asc:Footer runat="server" ID="ascFooter"  TabName="suanming" />
</body>
</html>