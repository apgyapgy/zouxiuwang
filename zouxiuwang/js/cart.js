$(function(){
	init();
	var countMoney = 0;
	//设置底部标签的初始化状态
	$(".foot nav div:nth-child(3)").addClass("active").siblings().removeClass("active");
	//初始化iscroll
	function init(){
		window.cartscroll=new iScroll("list",{
		 	hScrollbar:false, 
		});
	}
	//查看缓存中已登录的用户，并判断用户是否已登录，若未登录则跳转到登录页面，登录后返回该页面
	if(localStorage['loginedUser']){
		var loginedUser = localStorage['loginedUser'];
		addGoods();
	}else{
		localStorage['preHref'] = location.href;
		location.href = './views/login.html';
	}
	
	//返回按钮的点击事件
	$(".cart_head .back").on("touchstart",function(){
		var preHref = localStorage['preHref']?localStorage['preHref']:'index.html#home';
		location.href = preHref;
	})
	//去逛逛按钮的点击事件
	$(".goShopping").on("touchstart",function(){
		location.href = 'index.html#home';
	});
	//添加购物车中的商品
	function addGoods(){
		$.ajax({
			type:'get',
			url:'http://datainfo.duapp.com/shopdata/getCar.php?userID=txy&callback=?',
			success:function(cart){
				$(".cart_load").css("display","none");
				if(cart){
					$(".cartGoods").css("display","block");
					$(".cart_empty").css("display","none");
					var str = '';
					for(var key in cart){
						var discount = parseInt(cart[key]['discount'])?parseInt(cart[key]['discount']):10;
						var price = parseInt(cart[key]['price'])*(discount/10);
						//更新总价
						countMoney += price*parseInt(cart[key]['number']);
						str += '<li>'
								+'<img src="'+cart[key]['goodsListImg']+'" />'
								+'<div class="cartGoodRight" data-goodId='+cart[key]['goodsID']+'>'
									+'<p class="goodName">'+cart[key]['goodsName']+'<span class="delete"></span></p>'
									+'<p class="goodType">'+cart[key]['className']+'</p>'
									+'<p class="goodPrice">单价：<span>￥'+price+'</span></p>'
									+'<p class="goodNum">数量：'
										+'<span class="minu">-</span>'
				  						+'<input type="text" value="'+cart[key]['number']+'" id="goodNum">'
										+'<span class="plus">+</span>'
									+'</p>'
								+'</div>'
								+'</li>';
					}
					$(str).appendTo($(".cartGoods #list .lis"));
					$("p.top span.totalMoney").html('￥'+countMoney.toFixed(2));
					addDeleteEvent();
					addPlusMinuEvent();
					cartscroll.refresh();
				}else{
					$(".cartGoods").css("display","none");
					$(".cart_empty").css("display","block");
				}
			}
		});
	}
	//点击删除按钮事件
	function addDeleteEvent(){
		$(".cartGoodRight").delegate("span.delete",'touchstart',function(){
			var goodId = $(this).parent().parent().attr("data-goodId");
			var _this = $(this);
			var _price = $(this).parent().siblings("p.goodPrice").find("span").html().replace("￥","");
			var _number =parseInt($(this).parent().siblings("p.goodNum").find("input").val());
			
			$.ajax({
				type:'get',
				data:{
					userID:loginedUser,
					goodsID:goodId,
					number:0
				},
				url:'http://datainfo.duapp.com/shopdata/updatecar.php',
				success:function(status){
					if(status == 1){//删除成功，移除元素
						countMoney -= _price*_number;
						_this.parents("li").remove();
						$("p.top .totalMoney").html('￥'+countMoney.toFixed(2));
						isEmpty();
						cartscroll.refresh();
					}
				}
			})
		});
	}
	//点击商品的减按钮
	function addPlusMinuEvent(){
		$(".minu").on("touchstart",function(){
			//获取当前数量
			var _number = parseInt($(this).siblings("input").val());
			if(_number > 0 ){
				editCartGoods($(this),loginedUser,_number,-1);
			}
		});
		$(".plus").on("touchstart",function(){
			//获取当前数量
			var _number = parseInt($(this).siblings("input").val());
			editCartGoods($(this),loginedUser,_number,1);
		});
	}
	//修改数据
	function editCartGoods($obj,_userId,_number,_type){
		_number += _type;
		var _goodId = $obj.parents("div").attr("data-goodId");
		var _price = parseInt($obj.parent().siblings(".goodPrice").find("span").html().replace("￥",""));
		var _data = {
			userID:_userId,
			goodsID:_goodId,
			number:_number
		};
		$.ajax({
			type:'get',
			data:_data,
			url:'http://datainfo.duapp.com/shopdata/updatecar.php',
			success:function(status){
				if(status==1){//购物车更新成功
					countMoney += _type*_price;
					//更改数量输入框中的数量 
					$obj.siblings("input").val(_number);
					//更新标题栏上总价
					$("p.top span.totalMoney").html('￥'+countMoney.toFixed(2));
					//如果_number为0，则删除该元素
					if(_number==0){
						$obj.parents("li").remove();
						isEmpty();
						cartscroll.refresh();
					}
				}
			},
			error:function(status){
				console.log("error",status);
			}
		})
	}
	//判断购物车中没商品时，显示购物车为空
	function isEmpty(){
		if($(".cartGoods #list .lis li").length == 0){
			$(".cartGoods").css("display","none").siblings(".cart_empty").css("display","block");
		}
	}
});
