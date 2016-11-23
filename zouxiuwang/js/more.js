$(function(){
	//设置底部标签的初始化状态
	$(".foot nav div:nth-child(5)").addClass("active").siblings().removeClass("active");
	//点击返回按钮按钮
	$(".show_head .back").on("touchstart",function(){
		var preHref = localStorage['preHref'];
		if(preHref){
			localStorage.removeItem("preHref");
		}
	});
	//点击“退出登录”按钮退出登录
	$("p.quit").on("touchstart",function(){
		localStorage.removeItem("loginedUser");
		location.href = "views/login.html";
	});
});
