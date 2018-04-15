<%@ Page Language="C#" AutoEventWireup="true" CodeFile="dashibuy.aspx.cs" Inherits="dashibuy" %>

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
    <form id="form1" runat="server">
    <header>
        <div class="goback"></div>
        <div class="htitle"><%=masterInfo.Name %>大师</div>

    </header>

    <div class="index masterinfo">
		<div class="pic">
			<img src="<%=masterInfo.ImgUrl %>" alt="" />
			<div class="clearfix"></div>
		</div>


        <div class="zixun">
            <p >咨询 <font color="red"><%=masterInfo.Name %></font> 大师 <font color="red"><%=zixunInfo.Title %></font></p>
            <p>输入您的电话或微信号</p>
            <asp:TextBox ID="txtPhone" runat="server"></asp:TextBox>
        </div>

		


	</div>

    <div class="btnpanel">
		<div class="buytext">
			需要支付：<font class="orange"><%=zixunInfo.Price.ToString("C") %>元</font>
		</div>
		<div>
            <asp:Button  ID="btnGoPay" runat="server"  CssClass="btnbuy" Text="立刻支付" OnClick="btnGoPay_Click" />
         </div>
	</div>

    </form>
</body>
</html>
