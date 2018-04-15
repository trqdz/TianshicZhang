<%@ Control Language="C#" AutoEventWireup="true" CodeFile="footer.ascx.cs" Inherits="footer" %>
<div id="footer">
	<ul>                      
        <li <%=(TabName=="index"?"class=\"on\"":null) %> ><a href="/index.aspx"><i class="home">首页</i></a></li>                
        <li <%=(TabName=="suanming"?"class=\"on\"":null) %>><a href="/suanming.aspx"><i class="suanming">算命大全</i></a></li>                      
        <li <%=(TabName=="dashi"?"class=\"on\"":null) %>><a href="/dashi.aspx"><i class="dashi">咨询大师</i></a></li>                        
        <li <%=(TabName=="product"?"class=\"on\"":null) %>><a href="/product.aspx"><i class="gaiming">旺运改命</i></a></li>    
        <li <%=(TabName=="mine"?"class=\"on\"":null) %>><a href="/mine.aspx"><i class="mine">我的</i></a></li>                    
    </ul>
</div>