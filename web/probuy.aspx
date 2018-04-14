<%@ Page Language="C#" AutoEventWireup="true" CodeFile="probuy.aspx.cs" Inherits="probuy" %>
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
        <div class="htitle">确认订单</div>
    </header>
    <form id="form1" runat="server">
    <div class="index orderconfirm">
		<div class="oitem">
			<div class="tit">宝物信息</div>
			<div class="oinfo">
				<img class="opic" src="<%=proInfo.ImgUrl %>" alt="" />
				<div class="oright">
					<div class="l1"><%=proInfo.Name %></div>
					<div class="l2">价格:<%=proInfo.Price.ToString("N") %>元</div>
				</div>
			</div>
		</div>
		<div class="oitem">
			<div class="tit">配送信息</div>
			<div class="otable">
				<div class="left">姓名:</div>
				<div class="right"><asp:TextBox ID="txtCNName" runat="server"></asp:TextBox></div> 
				<div class="clearfix"></div>
			</div>
			<div class="otable">
				<div class="left">联系电话:</div>
				<div class="right"><asp:TextBox ID="txtPhone" runat="server"></asp:TextBox></div>
				<div class="clearfix"></div>
			</div>
			<div class="otable">
				<div class="left">收货地址:</div>
				<div class="right"><asp:TextBox ID="txtAddress" runat="server" TextMode="MultiLine"></asp:TextBox></div>
				<div class="clearfix"></div>
			</div>
		</div>
		<div class="oitem">
			<div class="tit">支付方式</div>
			<div class="paytable">
				<div class="picon"></div>
				<div class="ptext">微信支付</div>
				<input type="radio" checked="checked" />
				<div class="clearfix"></div>
			</div>
		</div>
	</div>


	<div class="btnpanel">
		<div class="buytext">
			需要支付：<font class="orange"><%=proInfo.Price.ToString("C") %>元</font>
		</div>
		<div>
            <asp:Button  ID="btnGoPay" runat="server"  CssClass="btnbuy" Text="立刻支付" OnClick="btnGoPay_Click"/>
         </div>
	</div>
	</form>
</body>
</html>