

$(function(){

	function changeSafeCode () {
		$(".safeCode").html('<img src="../inc/safeCodePic.aspx?'+(new Date()).valueOf()+'"/>');
		
	}

	function bindClearEvent(){
		$("#btnClear").click(function(){
			$(".textbox").val("");
		})
	}


	function bindTypeEvent(){
		$(".textbox").on("input",function(){
			$("#lblErrpanel").html("");
		})
	}




	function main(){
		changeSafeCode();
		$(".safeCode").click(function(){
			changeSafeCode();
		})
		bindClearEvent();
		bindTypeEvent();
	}

	main();

})

