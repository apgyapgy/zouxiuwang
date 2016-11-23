$(function(){
	//$(".foot nav div:nth-child(2)").addClass("active").siblings().removeClass("active");
	//获取分类
	function getType(){
		$.ajax({
			type:'get',
			url:'http://datainfo.duapp.com/shopdata/getclass.php',
			dataType:'json',
			success:function(goodType){
				for(key in goodType){
					var str = '<li><span>'+goodType[key]["className"]
								+'</span><img src="imgs/jiantou.png"/></li>';
					$(str).appendTo($(".type"));
				}
			}
		})
	}getType();
	//全部折叠与展开
	$(".parent").on("touchstart",function(){
		if(parseInt($(".type").css("height"))>0){
			$(".type").addClass("active");
			$(this).find("img").css("transform","rotate(-90deg)");
		}else{
			$(".type").removeClass("active");
			$(this).find("img").css("transform","rotate(0deg)");
		}
		
	});
});
