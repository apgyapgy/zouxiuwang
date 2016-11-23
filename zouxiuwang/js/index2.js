$(function(){
	//底部选项点击
	$(".foot nav div").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
	window.addEventListener("DOMContentLoaded",init);
	var count = -1,iscro=null;
	function init(){console.log(1);
		iscro = new iScroll('list',{
			hScroll :false,
			onScrollEnd:function(){
				if((this.wrapperH - this.y)>=this.scrollerH){
					push(this);
				}
			}
		});
		addGoods(iscro);
	}
	//加载数据到列表中
	function push(obj){
		document.querySelector("#lastDemo").innerHTML = "<img src='imgs/jiazai.gif'/>";
		if(count == 4){
			document.querySelector("#lastDemo").innerHTML = "没有数据了^~^";
			return;
		}
		addGoods(obj);
	}
	//模糊查询
	$("#toSearch").on("touchstart",function(){
		var selectText = $("#search").val();
		if(selectText){
			$("#lis").innerHTML = '<li id="lastDemo"></li>';
			addGoods(iscro,selectText);
		}else{
			addGoods(iscro);
		}
	});
	/***********************************************从接口获取数据*******************************************************/
	function getInfo(){
		$.ajax({
			type:'get',
			url:'http://datainfo.duapp.com/shopdata/getBanner.php?callback=?',
			dataType:'json',
			success:function(bannerData){
				for(var key in bannerData){
					var src = JSON.parse(bannerData[key][3]);
					var str = '<img src="'+src[0]+'" class="swiper-slide"/>';
					$(str).appendTo($(".swiper-wrapper"));
				}
				//轮播图
				new Swiper('#demo',{ 
					loop : true,//循环
					autoplay:2000,
    				pagination: '.swiper-pagination'// 如果需要分页器
				});
			}
		})
	}getInfo();
	/************************************************获取商品列表*****************************************************/
	function getGoodList(num,dataList){
		$.ajax({
			type:'get',
			url:'http://datainfo.duapp.com/shopdata/getGoods.php?linenumber=num&callback=?',
			dataType:'json',
			success:function(goodList){
				dataList = goodList;
			}
		})
	}getGoodList();
	/*******************************************添加商品*******************************************************/
	function addGoods(obj,select){
		if(select){
			var _url = 'http://datainfo.duapp.com/shopdata/selectGoodes.php?selectText='+select+'&callback=?';
		}else{
			var _url = 'http://datainfo.duapp.com/shopdata/getGoods.php?callback=?';
		}
		$.ajax({
			type:'get',
			url:_url,
			dataType:'json',
			success:function(goodList){
				var str = "";
				for(var key in goodList){
					var discount = parseInt(goodList[key]['discount'])?parseInt(goodList[key]['discount']):10;
					str += '<li>'
								+'<img src="'+goodList[key]["goodsListImg"]+'" />'
								+'<div class="item">'
									+'<a href="#">'+goodList[key]["goodsName"]+'</a>'
									+'<div class="item_bottom">'
										+'<span class="now">￥'+parseInt(parseInt(goodList[key]["price"])*(discount/10))+'</span>'
										+'<span class="old">￥'+goodList[key]["price"]+'</span>'
										+'<span class="zhe">'+goodList[key]["discount"]+'折</span>'
										+'<span class="add"></span>'
									+'</div>'
								+'</div>'
						+'</li>';
				}
				$("#lastDemo").before(str);
				obj.refresh();
				document.querySelector("#lastDemo").innerHTML = "";
				count++;
			}
		})
	}
});
			