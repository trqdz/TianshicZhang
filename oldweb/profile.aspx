<%@ Page Language="C#" AutoEventWireup="true" CodeFile="profile.aspx.cs" Inherits="profile" %>

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
    

        <div class="pitem">
            <div class="pl">账户名称：</div>
            <div class="pr"><span id="spnUserName" runat="server"></span></div>
            <div class="clearfix"></div>
        </div>
        <div class="pitem">
            <div class="pl">姓名：</div>
            <div class="pr"><span id="spnCNName" runat="server"></span></div>
            <div class="clearfix"></div>
        </div>
        <div class="pitem">
            <div class="pl">性别：</div>
            <div class="pr"><span id="spnGender" runat="server"></span></div>
            <div class="clearfix"></div>
        </div>
        <div class="pitem">
            <div class="pl">手机号码：</div>
            <div class="pr"><span id="spnPhone" runat="server"></span></div>
            <div class="clearfix"></div>
        </div>
        <div class="pitem">
            <div class="pl">QQ：</div>
            <div class="pr"><span id="spnQQ" runat="server"></span></div>
            <div class="clearfix"></div>
        </div>
        <div class="pitem">
            <div class="pl">Email：</div>
            <div class="pr"><span id="spnEmail" runat="server"></span></div>
            <div class="clearfix"></div>
        </div>
        <div class="pitem">
            <div class="pl">注册时间：</div>
            <div class="pr"><span id="spnCreateTime" runat="server"></span></div>
            <div class="clearfix"></div>
        </div>
        <div class="pitem">
            <div class="pl">上次登录：</div>
            <div class="pr"><span id="spnLastLoginTime" runat="server"></span></div>
            <div class="clearfix"></div>
        </div>
        <div class="pitem">
            <div class="pl">消费总额：</div>
            <div class="pr"><span id="spnXFTotal" runat="server"></span></div>
            <div class="clearfix"></div>
        </div>
    </div>



</body>
</html>
