<%@ Page Language="C#" AutoEventWireup="true" CodeFile="profileEdit.aspx.cs" Inherits="profileEdit" %>

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
        <div class="htitle">我的资料</div>
    </header>

    <div class="middlepanel profile">
    <form id="form1" runat="server">

        <div class="pitem">
            <div class="pl">账户名称：</div>
            <div class="pr"><span id="spnUserName" runat="server"></span></div>
            <div class="clearfix"></div>
        </div>
        <div class="pitem">
            <div class="pl">姓&nbsp;&nbsp;&nbsp;&nbsp;名：</div>
            <div class="pr"><input id="txtCNName" runat="server" type="text" /></div>
            <div class="clearfix"></div>
        </div>
        <div class="pitem">
            <div class="pl">性&nbsp;&nbsp;&nbsp;&nbsp;别：</div>
            <div class="pr">
                <asp:RadioButtonList ID="rdoGender" runat="server" RepeatDirection="Horizontal">
                    <asp:ListItem Text="男" Value="1"></asp:ListItem>
                    <asp:ListItem Text="女" Value="2"></asp:ListItem>
                </asp:RadioButtonList>

            </div>
            <div class="clearfix"></div>
        </div>
        <div class="pitem">
            <div class="pl">手机号码：</div>
            <div class="pr"><input id="txtPhone" type="text" runat="server" /></div>
            <div class="clearfix"></div>
        </div>
        <div class="pitem">
            <div class="pl">QQ：</div>
            <div class="pr"><input id="txtQQ" type="text" runat="server"/></div>
            <div class="clearfix"></div>
        </div>
        <div class="pitem">
            <div class="pl">Email：</div>
            <div class="pr"><input id="txtEmail" type="text" runat="server" /></div>
            <div class="clearfix"></div>
        </div>
        <div class="btnPanel">
            <asp:Button ID="btnModify" runat="server" CssClass="formbtn" Text="确定修改" OnClick="btnModify_Click" />
            
            
        </div>
    
        </form>
    </div>


</body>
</html>
