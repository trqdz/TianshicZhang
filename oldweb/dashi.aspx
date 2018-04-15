<%@ Page Title="" Language="C#" MasterPageFile="~/page.master" AutoEventWireup="true" CodeFile="dashi.aspx.cs" Inherits="dashi" %>
<%@ Register Src="~/footer.ascx" TagName="Footer" TagPrefix="asc" %>
<asp:Content ID="Content1" ContentPlaceHolderID="bodyContent" Runat="Server">
    <header>
        <div class="goback"></div>
        <div class="htitle">咨询大师</div>

    </header>

    <div class="index">

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



	</div>
    <asc:Footer runat="server" ID="ascFooter"  TabName="dashi" />

</asp:Content>

