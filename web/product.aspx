<%@ Page Language="C#" AutoEventWireup="true" CodeFile="product.aspx.cs" Inherits="product" %>
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
        <!-- <div class="goback"></div> -->
        <div class="htitle">旺命改运</div>
        <!-- <div class="hright menu"></div> -->
    </header>

    <div class="index">
		<div class="productlist">
             <asp:Repeater ID="repProduct" runat="server">
                <ItemTemplate>
                    <a href="productInfo.aspx?id=<%#Eval("Id") %>"  class="li">
				        <div>
					        <img src="<%#Eval("ImgUrl") %>"/>
					        <div class="tit1"><%#Eval("Name") %></div>
					        <div class="tit2"><%#Eval("Title") %></div>
				        </div>
			        </a>
                </ItemTemplate>
              </asp:Repeater>
		</div>

	</div>
    <asc:Footer runat="server" ID="ascFooter"  TabName="product" />
</body>
</html>