<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="index" %>
<%@ Register Src="~/footer.ascx" TagName="Footer" TagPrefix="asc" %>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<title>张天师算命网</title>
	<link rel="stylesheet" type="text/css" href="css/style.css" />
    <script src="js/libs/zepto.min.js"></script>
    <script src="js/libs/Util.js"></script>
</head>
<body>
    <header>
        <!-- <div class="goback"></div> -->
        <div class="htitle">首页</div>
        <!-- <div class="hright menu"></div> -->
    </header>

    <div class="index">
		<div class="banner"><img src="images/banner1.jpg" /></div>
		<div class="bulletin" onclick="location.href='/help/notice.html'">
			<i class="bull-ila"></i>
			<marquee behavior="scroll">
				<span id="horse">著名大师精准算命、改运，不准可马上退款！</span>
			</marquee>
			<i class="bull-arrow"></i>
		</div>

		<div class="hot-new-tit"><span class="hot-tit-img"></span><a class="hot-tit-text" href="javascript:;">精准算命</a></div>
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


		<div class="hot-new-tit"><span class="hot-tit-img"></span><a class="hot-tit-text" href="javascript:;">人气大师</a></div>
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

		<div class="hot-new-tit"><span class="hot-tit-img"></span><a class="hot-tit-text" href="javascript:;">旺运改命</a></div>
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
		<div class="clearfix"></div>
	</div>

	<asc:Footer runat="server" ID="ascFooter"  TabName="index" />
</body>
</html>
