$(function(){
	//点击返回按钮
	$(".register_head span.back").on("touchstart",function(){
		var beforeHref = localStorage["preHref"]?localStorage["preHref"]:"../index.html";
		location.href = beforeHref;
	});
	//点击登录按钮
	$(".register_head span.register").on("touchstart",function(){
		location.href = "./login.html";
	});
	//底部按钮点击事件
	$(".register_foot nav div").on("touchstart",function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
	//用户名失去焦点事件
	$("#username").on("blur",function(){
		var username = $("#username").val();
		$(this).attr("data-flag",true);
		if(!username){
			$(".tip").html("用户名不能为空").css("display","block");
			$(this).attr("data-flag",false);
		}
		$.ajax({
			type:'get',
			url:'http://datainfo.duapp.com/shopdata/getuser.php?userID='+username+'&callback=?',
			success:function(data){
				if(data){
					$(".tip").html("用户名已存在!").css("display","block");
					$("#user").attr("data-flag",false);
				}
			}
		});
	});
	//密码按钮的失去焦点事件
	$("#password").on("blur",function(){
		var password = $("#password").val();
		$(this).attr("data-flag",true);
		if(!password){
			$(".tip").html("密码不能为空").css("display","block");
			$(this).attr("data-flag",false);
		}
	});
	//确认密码的失去焦点事件
	$("#confirm").on("blur",function(){
		var confirm = $("#confirm").val();
		var password = $("#password").val();
		$(this).attr("data-flag",true);
		if(!confirm){
			$(".tip").html("确认密码不能为空!").css("display","block");
			$(this).attr("data-flag",false);
		}
		if(password != confirm){
			$(this).attr("data-flag",false);
			$(".tip").html("密码与确认密码不一致!").css("display","block");
			return;
		}
	});
	//点击注册按钮
	$("#register").on("click",function(){
		var _username = $("#username").val();
		var _password = $("#password").val();
		console.log($("#username").attr("data-flag"),$("#password").attr("data-flag"),$("#confirm").attr("data-flag"))
		if($("#username").attr("data-flag")&&$("#password").attr("data-flag")&&$("#confirm").attr("data-flag")){
			var _registerData = {
				status:'register',
				userID:_username,
				password:_password,
			}
			console.log(_registerData);
			$.ajax({
				type:'get',
				url:'http://datainfo.duapp.com/shopdata/userinfo.php',
				data:_registerData,
				success:function(data){
					if(data==0){
						$(".tip").html("用户名已存在，请重试!").css("display","block");
					}else if(data==1){
						alert("注册成功,点击跳转!");
						location.href = "./login.html";
					}else{
						$(".tip").html("呜呜，注册失败了,重试一下吧!").css("display","block");
					}
				}
			});
		}
	});
})