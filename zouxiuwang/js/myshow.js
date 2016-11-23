$(function(){
	//设置底部标签的初始化状态
	$(".foot nav div:nth-child(4)").addClass("active").siblings().removeClass("active");
	//点击登录按钮
	$(".login").on("touchstart",function(){
		localStorage['preHref'] = location.href;
		location.href = "views/login.html";
	});
	//点击注册按钮
	$(".register").on("touchstart",function(){
		localStorage['preHref'] = location.href;
		location.href = "views/register.html";
	});
	//设置如果用户已登录的显示状态
	if(localStorage['loginedUser']){
		$("p.niciname span").html(localStorage['loginedUser']);
		$("p.opeations").remove();
	}
});
