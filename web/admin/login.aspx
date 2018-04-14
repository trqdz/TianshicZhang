<%@ Page Language="C#" AutoEventWireup="true" CodeFile="login.aspx.cs" Inherits="admin_login" %>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>无标题文档</title>
<link href="css/login.css" rel="stylesheet" type="text/css">
<script src="../js/libs/jquery-1.9.1.min.js"></script>
<script src="js/login.js"></script>
</head>

<body>

    <form id="form1" runat="server">
	<div class="topbg"></div>
    <div class="logintitle"></div>
	<div class="loginbox">
    	<div class="innerBox">
            <div class="form">
            	<div class="txtPanel">
                	<div class="li">
                    	<span>帐&nbsp;&nbsp;&nbsp;号：</span>
                        <asp:TextBox  ID="txtUserName" runat="server" CssClass="textbox userName"></asp:TextBox>
            
                    	
                    </div>
                	<div class="li">
                    	<span>密&nbsp;&nbsp;&nbsp;码：</span>
                        <asp:TextBox  ID="txtPwd" runat="server" CssClass="textbox userPwd" TextMode="Password"></asp:TextBox>
      
                    </div>
                    <div class="li">
                    	<span>验证码：</span>
                        <asp:TextBox  ID="txtSafeCode" runat="server" CssClass="textbox userPwd" style="width:76px;"></asp:TextBox>
                        <div class="safeCode"><img src="../inc/safeCodePic.aspx"/></div>
                    </div>
                	
                </div>
            	
                <div class="btnPanel">
                    <asp:Button ID="btnLogin" runat="server" Text="登录" CssClass="button btnLogin" OnClick="btnLogin_Click" />
                    <input id="btnClear" type="reset" class="button btnCancel" value="重置" />
                </div>
                <label id="lblErrpanel" runat="server" class="errorPanel"></label>
            </div>
        </div>
    </div>
        </form>
	<div class="footer">
    	版权所有：<br>
    	<font color="#333333">建议在ie8及以上浏览器下登录该系统</font>
    </div>
</body>
</html>
