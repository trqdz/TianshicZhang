<%@ Page Language="C#" AutoEventWireup="true" CodeFile="dashi.aspx.cs" Inherits="dashi" %>
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
        <div class="htitle">咨询大师</div>

    </header>

    <div class="index">

		<div class="dashilist">


            <asp:Repeater ID="repDaShi" runat="server">
                <ItemTemplate>

                    <a href="dashiinfo.aspx?id=<%#Eval("Id") %>" class="item">
	                    <img src="<%#Eval("ImgUrl") %>"/>
	                    <div class="attri">
	                        <div class="l1">
	                            <span class="name"><%#Eval("Name") %></span>
	                            <span class="dtitle"><%#Eval("Title") %></span>
	                            <div class="clearfix"></div>
	                        </div>
	                        <div class="l2"><%#Eval("Description") %> </div>
	                    </div>
	                </a>

                </ItemTemplate>
            </asp:Repeater>
		</div>



	</div>
    <asc:Footer runat="server" ID="ascFooter"  TabName="dashi" />
</body>
</html>