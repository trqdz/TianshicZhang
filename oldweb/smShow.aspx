<%@ Page Language="C#" AutoEventWireup="true" CodeFile="smShow.aspx.cs" Inherits="smShow" %>
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

    <%if(smInfo.Price>0&&orderInfo.PayState==0){ %>
    <div class="index orderconfirm">
    <%}else{ %>
        <div class="index orderconfirm" style="bottom:0">
    <%} %>
        <div class="stit" id="txtOrderDesc" runat="server"></div>

        <asp:Repeater ID="repKeyList" runat="server">
                <ItemTemplate>
                    <div class="sitem">
                        <div class="tit"><%#Eval("Title") %></div>
                        <div class="desc"><%#Eval("Description") %></div>
                       <%# bindSMValue(Convert.ToInt32( Eval("Id")),Convert.ToInt32( Eval("IsFree"))) %>
                    </div>
                </ItemTemplate>
        </asp:Repeater>




        <%if(smInfo.Price>0&&orderInfo.PayState==0){ %>
		<div class="needPay">付款后查看全部结果，不准可马上退款</div>
        <div class="oitem">
			<div class="tit">支付方式</div>
			<div class="paytable">
				<div class="picon"></div>
				<div class="ptext">微信支付</div>
				<input type="radio" checked="checked" />
				<div class="clearfix"></div>
			</div>
		</div>
        <%} %>

	</div>


    
    <%if(smInfo.Price>0&&orderInfo.PayState==0){ %>
    <div class="btnpanel">
		<div class="buytext">
			需要支付：<font class="orange"><%=smInfo.Price.ToString("N") %>元</font>
		</div>
		<div><span class="btnbuy">立刻支付</span></div>
	</div>
    <%} %>
</body>
</html>