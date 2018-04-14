<%@ Page Language="C#" AutoEventWireup="true" CodeFile="reg.aspx.cs" Inherits="reg" %>

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
        <div class="htitle">快速注册</div>
    </header>
    <div class="login">
        <form id="form1" runat="server">
            <ul>
                <li>
                    <span class="listr">用户账号：</span>
                    <asp:TextBox ID="txtUserName" runat="server" placeholder="请输入用户名"></asp:TextBox>
                    
                </li>
                <li>
                    <span class="listr">登录密码：</span>
                    <asp:TextBox ID="txtPwd" runat="server" placeholder="请输入密码" TextMode="Password"></asp:TextBox>
                </li>
                <li>
                    <span class="listr">重复密码：</span>
                    <asp:TextBox ID="txtPwdConfirm" runat="server" placeholder="请再次输入密码" TextMode="Password"></asp:TextBox>
                </li>
            </ul>
            <div class="login-p">
                <label>
                    <input type="checkbox" id="is_read" checked="checked">
                    <span >我已年满18周岁，并且同意接受</span>
                </label>
                <a href="/help/readme.html" >《法律声明》</a>
            </div>
            <asp:Button ID="btnLogin" runat="server" CssClass="login-btn login-btn-no" Text="立即注册" OnClick="btnLogin_Click" />
        </form>
        <br>
        <div class="login-p"><a class="fr" href="login.aspx">已有帐号，直接登录</a></div>
        <div class="login-p">1.用户帐号请输入4-16个英文字母或数字，不能用中文。</div>
        <div class="login-p">2.登录密码请输入6-12个英文字母或数字。</div>
    </div>
</body>
</html>