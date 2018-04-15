<%@ Page Language="C#" AutoEventWireup="true" CodeFile="dashiinfo.aspx.cs" Inherits="dashiinfo" %>
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
        <div class="htitle"><%=masterInfo.Name %>大师</div>

    </header>

    <div class="index masterinfo">
		<div class="pic">
			<img src="<%=masterInfo.ImgUrl %>" alt="" />
			<div class="clearfix"></div>
		</div>
		<div class="mtitle"><%=masterInfo.Name %>：<%=masterInfo.Description %></div>
		<div class="case">服务项目:</div>
		<div class="fwlist">

            <asp:Repeater ID="repDataList" runat="server">
                <ItemTemplate>
                    <div class="li">
				        <div class="left">
					        <div class="l1"><span class="name"><%#Eval("Title") %></span><span class="price"><%#Convert.ToDecimal( Eval("Price")).ToString("N") %>一次</span></div>
					        <div class="l2"><%#Eval("Description") %></div>
				        </div>
				        <div class="right"><a href="dashibuy.aspx?id=<%=masterInfo.Id %>&zxid=<%#Eval("Id") %>">立刻咨询</a></div>
			        </div>
                </ItemTemplate>
            </asp:Repeater>

		</div>
		<div class="case">用户评价:</div>
		<div>
			<div class="plitem">
				<div class="l1"><span class="name">周龙健</span><span class="time">2017-11-17 00:00:00</span></div>
				<div class="l2">我老公就和我见面了，只是还不肯复婚至少还是见面了。很开心</div>
			</div>

		</div>

	</div>

	<asc:Footer runat="server" ID="ascFooter"  TabName="dashi" />


	
</body>
</html>