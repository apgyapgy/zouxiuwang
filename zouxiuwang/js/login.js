$(function(){
	//点击返回按钮
	$(".login_head span.back").on("touchstart",function(){
		var beforeHref = localStorage["preHref"]?localStorage["preHref"]:"../index.html";
		location.href = beforeHref;
	});
	//点击注册按钮
	$(".login_head span.register").on("touchstart",function(){
		location.href = "./register.html";
	});
	//底部按钮点击事件
	$(".login_foot nav div").on("touchstart",function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
	//点击登录按钮
	$(".register_head span.register").on("touchstart",function(){
		var preHref = location.href;
		localStorage["preHref"] = preHref;
		location.href = "./login.html";
	});
	//底部按钮点击事件
	$(".register_foot nav div").on("touchstart",function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
	
	//用户名失去焦点事件
	$("#username").on("blur",function(){
		var username = $("#username").val();
		if(!username){
			$(".tip").html("用户名不能为空").css("display","block");
			return;
		}
	});
	//密码按钮的失去焦点事件
	$("#password").on("blur",function(){
		var username = $("#username").val();
		if(!username){
			$(".tip").html("用户名不能为空").css("display","block");
			return;
		}
	});
	//记住密码的按钮
	$("p.other span").click(function(){
		if($(this).html()){
			$(this).html('');
		}else{
			$(this).html('&#xe73a;');
		}
	})
	//点击登录按钮
	$("#login").on("touchstart",function(){
		var _username = encodeURIComponent($("#username").val());
		var _password = encodeURIComponent($("#password").val());
		if(!_username){
			$("#username").attr("data-flag",false);
		}else{
			$("#username").attr("data-flag",true);
		}if(!_password){
			$("#password").attr("data-flag",false);
		}else{
			$("#password").attr("data-flag",true);
		}
		if($("#username").attr("data-flag")&&$("#password").attr("data-flag")){
			$(this).removeClass("disable");
			$.ajax({
				type:'get',
				url:'http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID='+_username+'&password='+_password,
				success:function(data){
					if(data==0){
						$(".tip").html("用户名不存在，请重试!").css("display","block");
					}else if(data==2){
						$(".tip").html("用户名与密码不符，请重试!").css("display","block");
					}else{
						localStorage['loginedUser'] = _username;
						location.href = localStorage['preHref'];
					}
				}
			});
		}else{
			$(".tip").html("用户名与密码为必填项");
		}
	});
})