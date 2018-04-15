<%@ Page Language="C#" AutoEventWireup="true" CodeFile="myOrders.aspx.cs" Inherits="myOrders" %>

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
        <div class="htitle">订单记录</div>
        <div class="hright refresh"></div>
    </header>
    <div class="middlepanel orderlistpage">
        <ul id="divDataList">

            <asp:Repeater ID="repDatalist" runat="server">
                <ItemTemplate>
                    <li class="betitem" data-id="124">                            
                        <div class="order-list-tit">
                            <%# getOrderType(Convert.ToInt32( Eval("OrderType"))) %>
                            <span class="fr c-red"><%#Convert.ToDecimal( Eval("PayTotal")).ToString("C") %></span>
                        </div>
                        <div class="c-gary">
                            <span class="fr">
                                <%#getPayState(Convert.ToInt32(Eval("PayState"))) %>
                            </span>
                            <p class="order-time"><%#Eval("CreateTime") %></p>
                        </div>                        
                    </li>
                </ItemTemplate>
            </asp:Repeater>
        </ul>
    </div>

</body>
</html>
