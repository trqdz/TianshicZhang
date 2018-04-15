<%@ Page Title="" Language="C#" MasterPageFile="~/page.master" AutoEventWireup="true"  CodeFile="dashibuy.aspx.cs" Inherits="dashibuy" %>
<asp:Content ID="Content1" ContentPlaceHolderID="bodyContent" Runat="Server">
    <form id="form1" runat="server">
    <header>
        <div class="goback"></div>
        <div class="htitle"><%=masterInfo.Name %>大师</div>

    </header>

    <div class="index masterinfo">
		<div class="pic">
			<img src="<%=masterInfo.ImgUrl %>" alt="" />
			<div class="clearfix"></div>
		</div>


        <div class="zixun">
            <p >咨询 <font color="red"><%=masterInfo.Name %></font> 大师 <font color="red"><%=zixunInfo.Title %></font></p>
            <p>输入您的电话或微信号</p>
            <asp:TextBox ID="txtPhone" runat="server"></asp:TextBox>
        </div>

		


	</div>

    <div class="btnpanel">
		<div class="buytext">
			需要支付：<font class="orange"><%=zixunInfo.Price.ToString("C") %>元</font>
		</div>
		<div>
            <asp:Button  ID="btnGoPay" runat="server"  CssClass="btnbuy" Text="立刻支付" OnClick="btnGoPay_Click" />
         </div>
	</div>

    </form>

</asp:Content>