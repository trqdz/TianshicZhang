<%@ Page Language="C#" AutoEventWireup="true" CodeFile="suanming.aspx.cs" Inherits="suanming" %>
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
        <div class="htitle">算命大全</div>
        <div class="hright refresh"></div>
    </header>
    <div class="index">
		<div class="host-list-erect">
			<ul>
				<asp:Repeater ID="repSuanMing" runat="server">
                    <ItemTemplate>
                        <li>
					        <a href="<%#Eval("TargetUrl") %>?id=<%#Eval("Id") %>">
						        <div class="hot-icon new-list-img">
							        <img src="<%#Eval("ImgUrl") %>" />
						        </div>
						        <div class="hot-list-text border-right">
							        <p class="hot-text list-text"><%#Eval("Name") %></p>
						        </div>
					        </a>
				        </li>
                    </ItemTemplate>
                </asp:Repeater>
			</ul>
		</div>
	</div>
    <asc:Footer runat="server" ID="ascFooter"  TabName="suanming" />
</body>
</html>