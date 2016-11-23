$(function(){
	//底部选项点击
	$(".foot nav div").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		if($(this).index()==2){
			localStorage['preHref'] = location.href;
		}
	});
});
