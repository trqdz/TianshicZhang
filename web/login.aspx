<%@ Page Language="C#" AutoEventWireup="true" CodeFile="login.aspx.cs" Inherits="login" %>

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
        <div class="htitle">登录</div>
    </header>
    
    <div class="login">
        <form id="form1" runat="server">
            <ul>
                <li>
                    <span class="login-peo"></span>
                    <asp:TextBox ID="txtUserName" runat="server" placeholder="请输入用户账号"></asp:TextBox>
   
                </li>
                <li>
                    <span class="login-pass"></span>
                    <asp:TextBox ID="txtPwd" runat="server" placeholder="请输入密码" TextMode="Password"></asp:TextBox>
                </li>
            </ul>
            <asp:Button ID="btnLogin" runat="server" CssClass="login-btn" Text="登录" OnClick="btnLogin_Click" />
            <asp:Button ID="btnReg" runat="server" CssClass="reg-btn" Text="立即注册" OnClick="btnReg_Click" />

        </form>
    </div>
</body>
</html>