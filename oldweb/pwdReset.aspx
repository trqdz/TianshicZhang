<%@ Page Language="C#" AutoEventWireup="true" CodeFile="pwdReset.aspx.cs" Inherits="pwdReset" %>

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
        <div class="htitle">修改登录密码</div>
    </header>
    <div class="middlepanel">
        <form id="form1" runat="server">
            <div class="login">
                <ul>
                    <li>
                        <span class="logi">旧密码</span>
                        <asp:TextBox ID="txtOldPwd" runat="server" placeholder="请输入旧密码" TextMode="Password"></asp:TextBox>
                    </li>
                    <li>
                        <span class="logi">新密码</span>
                        <asp:TextBox ID="txtNewPwd" runat="server" placeholder="请输入新密码" TextMode="Password"></asp:TextBox>
                    </li>
                    <li>
                        <span class="logi">确认密码</span>
                        <asp:TextBox ID="txtNewPwdConfirm" runat="server" placeholder="请再次输入新密码" TextMode="Password"></asp:TextBox>
                    </li>
                </ul>
                <asp:Button ID="btnReset" runat="server" Text="立即修改" CssClass="login-btn" OnClick="btnReset_Click" />
            </div>
        </form>
    </div>
</body>
</html>
