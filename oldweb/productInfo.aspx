<%@ Page Language="C#" AutoEventWireup="true" CodeFile="productInfo.aspx.cs" Inherits="productInfo" %>
<%@ Register Src="~/footer.ascx" TagName="Footer" TagPrefix="asc" %>
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
        <div class="htitle">旺命改运</div>

    </header>

    <div class="index proinfo">
		<div class="pic">
			<img src="<%=proInfo.ImgUrl %>" alt="" />
			<div class="clearfix"></div>
		</div>
		<div class="ptitle">
			<p class="title"><%=proInfo.Name %></p>
			<p><span class="price">结缘价：￥<%=proInfo.Price %></span><span class="mktprice">原价：￥<%=proInfo.MktPrice %></span></p>
		</div>

		<div class="switchtab">
			<div class="on">宝贝详情</div>
			<div>用户评价</div>
			<div>常见问题</div>
		</div>
		<div class="switchcont">
			<div class="on">
				<%=proInfo.Description %>
			</div>
			<div>
				<div class="plitem">
					<div class="l1"><span class="name">周龙健</span><span class="time">2017-11-17 00:00:00</span></div>
					<div class="l2">老公外面有个小三，以前就有 我装作不知道，最近突然要跟我离婚！我舍不得孩子，舍不得这个家！闺蜜推荐天机妙算给我，说挺有效果的！我就找了大师测算，大师推荐我姻缘人锦囊、鸳鸯和合阵，还有斩小三的黑狐狸，没想到最近老公确实有些变化，对我的关心多了起来，六一儿童节，还带我跟儿子出去玩，以前根本不会的，前两天喝多酒还说要照顾我们一辈子，也不知道是不是真心的 要是真的那就太好了，估计是小三那边真的斩掉了，所以老公才回心转意了</div>
				</div>
				<div class="plitem">
					<div class="l1"><span class="name">周龙健</span><span class="time">2017-11-17 00:00:00</span></div>
					<div class="l2">我老公就和我见面了，只是还不肯复婚至少还是见面了。很开心</div>
				</div>
			</div>
			<div>
				<p class="strong">1、吉祥物摆放、佩戴的时间和地点：</p>
				<p class="desc">吉祥物第一次摆放、佩戴，最好选择在早上七点到九点之间，此时刚好为一天中的龙抬头时间。摆放地点，如无特别要求，一般摆放在办公桌或是梳妆台的左手边。</p>
				<p class="strong">2、我选择的这款吉祥物有货吗？什么时候发货？</p>
				<p class="desc">在售的吉祥物均为开过光的现货，可直接下单，当天17点前下单的当天发货，17点后下单的第二天发货，节假日照常发货。</p>
				<p class="strong">3、我请购的吉祥物什么时候可以到？</p>
				<p class="desc">天机妙算吉祥物运输方式式选择的是顺丰快递，正常情况下广东省内1天可以到，外省2天左右即可收到。吉祥物均采用坚固的专业物流包装，物流安全可靠。</p>
				<p class="strong">4、吉祥物日常注意事项</p>
				<p class="desc">吉祥物沾有灰尘应用干净毛巾擦拭，勿用清水浸泡；沐浴时应取下来放好。吉祥物若有损坏，要及时更换新的来代替；自身吉祥物忌讳其他孕产妇或重病之人触摸，以免影响吉祥物气场。吉祥物都是经过正规开光的，通常风水摆件在无意间被人抚摸了，几乎没有什么影响，但是不要经常如此即可。</p>
				<p class="strong">5、搬迁、不再佩戴使用须知</p>
				<p class="desc">如果搬家，需将已使用的吉祥物放好，用干净的布轻擦后在早上的七点之九点之间重新摆放在新家，继续使用。不方便继续佩戴在身上，可将吉祥物放在随身包包里，或放在枕头下面、挂在床头等，是不会影响到它的效果。</p>
				<p class="strong">6、吉祥物为什么要开光加持？</p>
				<p class="desc">珠宝材质娇贵，必须避免发生化学反应。汗渍、香水、清洁剂、漂白水、海水、化妆水等都有可能导致金饰变色，因此在做清洁、游泳时，都应取下金饰。如因污渍及灰尘的沾染而失去光泽，可于稀释温和的肥皂温水中软刷清洗，然后用软布拭干。避免把金银首饰与其他首饰摆放在一起，特别是钻石，因其硬度会引致互相摩擦而刮花，故应用布盒子独立存放。大个的彩金首饰最好佩戴在衣服的外面，避免贴身佩戴与汗渍发生化学反应，不带时包装好保存，如有变色可就近去珠宝店清洗。</p>

			</div>

		</div>
		


		
		

	</div>

	<div class="btnpanel">
		<div><a href="javascript:" class="btnkefu">客服电话</a></div>
		<div><a href="probuy.aspx?id=<%=proInfo.Id %>" class="btnbuy">立刻申购</a></div>
	</div>



	
</body>
</html>