<%@ Page Language="C#" AutoEventWireup="true" CodeFile="mine.aspx.cs" Inherits="mine" %>
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
        <div class="htitle">个人中心</div>
    </header>

    <div class="index minepage">
        <div class="mine-top">
            <div class="mine-head">
                <div id="divUserImage" class="mine-img"><img src="images/userImage.jpg" /></div>
                <div id="spnCNName" runat="server" class="mine-name">涂仁铨</div>
            </div>
            <div class="mine-info">
                <ul>
                    <li>
                        <div class="orange"><span id="spnXFTotal" runat="server">0</span></div>
                        <p><a href="javascript:">消费总额</a></p>
                    </li>
                    <li>
                        <div class="grey" style="height:21px;"><span id="spnLastLoginTime" runat="server" style="font-size:12px;"></span></div>
                        <p><a href="tixianList.html">最后登录</a></p>
                    </li>
                </ul>
            </div>
        </div>

        <div class="mine-list">
            <ul>
                <li>
                    <a href="profile.aspx">
                        <img src="../images/green_tubiao_01.png" alt="">个人资料
                    </a>
                </li>
                <li>
                    <a href="myOrders.aspx">
                        <img src="../images/geren_tubiao_13.png" alt="">订单记录
                    </a>
                </li>
                <li>
                    <a href="profileEdit.aspx">
                        <img src="../images/geren_tubiao_04.png" alt="">修改资料
                    </a>
                </li>
                <li>
                    <a href="pwdReset.aspx">
                        <img src="../images/shezhi_03.png" alt="">修改密码
                    </a>
                </li>
            </ul>

            <a href="logout.aspx" class="login-btn-no" id="loginOut">退出登录</a>
        </div>
    </div>

    <asc:Footer runat="server" ID="ascFooter"  TabName="mine" />
</body>
</html>