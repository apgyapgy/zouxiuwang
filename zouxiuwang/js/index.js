$(function(){
	var selectText = "";
	init();
	var count = -1;
	window.iscro=null;
	function init(){
		iscro = new iScroll('list',{
			hScroll :false,
			onScrollEnd:function(){
				if((this.wrapperH - this.y)>=this.scrollerH){
					push(this);
				}
			}
		});
		addGoods(iscro,selectText);
	}
	//加载数据到列表中
	function push(obj){
		
		document.querySelector("#lastDemo").innerHTML = "<img src='imgs/jiazai.gif'/>";
		if(count == 4){
			document.querySelector("#lastDemo").innerHTML = "没有数据了^~^";
			return;
		}
		addGoods(obj,selectText);
	}
	//模糊查询
	$("#toSearch").on("touchstart",function(){
		selectText = $("#search").val()?$("#search").val():"";
		$("#lis").html('<li id="lastDemo"></li>');
		init();
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
	//事件委派
	$("#lis").delegate('li img,li .item a',"click",function(e){
		//获取点击商品的名称
		var goodName = $(this).parents("li").find("a.goodsName").html();
		//将点击商品的名称存储起来，以备以后查看商品详细使用
		localStorage['goodName'] = goodName;
		var _href = location.href;
		localStorage["preHref"] = _href;
		location.href = "views/detail.html";
	});
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
									+'<a href="javascript:;" class="goodsName">'+goodList[key]["goodsName"]+'</a>'
									+'<div class="item_bottom">'
										+'<span class="now">￥'+parseInt(parseInt(goodList[key]["price"])*(discount/10))+'</span>'
										+'<span class="old">￥'+goodList[key]["price"]+'</span>'
										+'<span class="zhe">'+goodList[key]["discount"]+'折</span>'
										+'<span class="add" data-goodId="'+goodList[key]["goodsID"]+'"></span>'
									+'</div>'
								+'</div>'
						+'</li>';
				}
				$("#lastDemo").before(str);
				addEvent();
				obj.refresh();
				//设置整个页面不再移动
				document.querySelector("#lastDemo").innerHTML = "";
				count++;
			}
		})
	}
	/*******************************************点击加入购物车按钮*********************************************************/
	function addEvent(){
		$("#lis li:not(#lastDemo)").delegate(".add","touchstart",function(){
			var goodName = $(this).parent().siblings("a").html();
			var cartStorage = localStorage["cart"]?localStorage["cart"]:"";
			var goodId = $(this).attr("data-goodId");
			var loginedUser = localStorage['loginedUser']?localStorage['loginedUser']:'';
			$.ajax({
				type:'get',
				data:{
					userID:loginedUser
				},
				url:'http://datainfo.duapp.com/shopdata/getuser.php?callback=?',
				success:function(userStatus){
					if(userStatus){
						//获取购物车信息
						$.ajax({
							type:'get',
							url:'http://datainfo.duapp.com/shopdata/getCar.php?userID='+loginedUser+'&callback=?',
							dataType:'jsonP',
							success:function(carts){
								if(carts == 0){//如果购物车为空，直接添加该商品
									$.ajax({
										type:'get',
										data:{
											userID:loginedUser,
											goodsID:goodId,
											number:'1'
										},
										url:'http://datainfo.duapp.com/shopdata/updatecar.php',
										success:function(status){
											if(status==1){//添加成功
												$(".addSuccess").html("添加购物车成功，可去购物车查看");
											}else{//添加失败
												$(".addSuccess").html("添加失败喽，重试一下吧");
											}
											addSuccess();
										}
									});
									return;
								}
								//获取该商品在carts中的下标
								var _index = 0;
								for(var i=0;i<carts.length;i++){
									if(carts[i]['goodsID']==goodId){
										_index = i;
										break;
									}
								}
								//如果我的购物车列表中没有这件商品
								if(_index==carts.length){//
									$.ajax({
										type:'get',
										data:{
											userID:loginedUser,
											goodsID:goodId,
											number:'1'
										},
										url:'http://datainfo.duapp.com/shopdata/updatecar.php',
										success:function(status){
											if(status==1){//添加成功
												$(".addSuccess").html("添加购物车成功，可去购物车查看");
											}else{//添加失败
												$(".addSuccess").html("添加失败喽，重试一下吧");
											}
											addSuccess();
										}
									});
									return;
								}
								var _number = carts[_index]['number']?parseInt(carts[_index]['number']):0;
								if(_number==0){
									_number = 1;
								}else if(_number>0){
									_number = _number+1;
								}
								$.ajax({
									type:'get',
									data:{
										userID:loginedUser,
										goodsID:goodId,
										number:_number
									},
									url:'http://datainfo.duapp.com/shopdata/updatecar.php',
									success:function(status){
										if(status==1){//添加成功
											$(".addSuccess").html("添加购物车成功，可去购物车查看");
										}else{//添加失败
											$(".addSuccess").html("添加失败喽，重试一下吧");
										}
										addSuccess();
									}
								});
							}
						})
					}else{
						//如果用户未登录 ，则跳转到登录 界面
						localStorage['preHref'] = location.href;
						location.href = 'views/login.html';
					}
				}
			})
		});
	}
	//更新购物车数据后显示然后两秒后隐藏
	function addSuccess(){
		$(".addSuccess").css("display","block");
		setTimeout(function(){
			$(".addSuccess").css("display","none");
		},2000);
	}
});
			