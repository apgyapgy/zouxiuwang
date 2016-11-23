$(function(){
	var _goodName = localStorage["goodName"];
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/selectGoodes.php?selectText="+encodeURI(_goodName)+"&callback=?",
		success:function(data){
			//将商品信息拼接到页面中
			var price = data[0]["price"];
			var discount = data[0]["discount"]=='0'?10:data[0]["discount"];
			var goodsName = data[0]["goodsName"];
			var imgs = JSON.parse(data[0]["imgsUrl"]);
			$(".detail_introduce").find("img").attr("src",data[0]["goodsListImg"]);
			$("p.now .price").html("￥"+price*(discount/10)).siblings(".goodName").html(goodsName);
			$("p.other_info .oldPrice").html("￥"+price).find(".goodDiscount");
			$(".all_information p span.goodName").html('商品名称:'+goodsName);
			//添加实拍的图片
			var str = '';
			for(var key in imgs){
				str+='<img src="'+imgs[key]+'" class="swiper-slide"/>'
			}
			$(str).appendTo($(".swiper-wrapper"));
			var mySwiper = new Swiper ('.swiper-container', {
				direction: 'horizontal',
//				autoplay:5000,
			    loop: true,
			    // 如果需要分页器
			    pagination: '.swiper-pagination',
			});
		}
	});console.log($(".detail_foot p"));
	$(".detail_foot p").on("touchstart",function(){console.log($(this));
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".detail_main>div").each(function(){
			if($(this).index()==index){
				$(this).css("display","block");
			}else{
				$(this).css("display","none");
			}
		});
	});
	//点击返回按钮返回上一个页面
	$(".detail_head span.back").on("touchstart",function(){
		var _preHref = localStorage["preHref"]?localStorage["preHref"]:"../index.html";
		location.href = _preHref;
	})
});
