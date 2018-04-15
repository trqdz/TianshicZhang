<%@ Page Language="C#" AutoEventWireup="true" CodeFile="fileUpload.aspx.cs" Inherits="admin_fileUpload" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <asp:Literal ID="LiteralScript" runat="server"></asp:Literal>
<style>
body{margin:15px 5px 5px 5px; }
 .file{width:220px; height:22px; border:1px solid #0B8AFD; background:#ffffff; outline:none; float:left;}
 .btn{width:40px; height:22px; line-height:22px; margin-left:3px; cursor:pointer; color:#ffffff; background-color:#0B8AFD; text-align:center; border:1px solid #0B8AFD; float:left;}
</style>    
</head>
<body>
    <form id="form1" runat="server" >
        <asp:FileUpload ID="FileUpload1" runat="server" CssClass="file" />
        <asp:Button ID="Button1" runat="server" onclick="Button1_Click" Text="上传" CssClass="btn" />
    </form>
</body>
</html>
