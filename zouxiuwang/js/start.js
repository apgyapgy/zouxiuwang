$(function(){
	var height = window.innerHeight;
	$("#nav").css("height",height+'px');
	$("#nav .startimg").css("height",height+"px");
	var mySwiper = new Swiper ('.swiper-container', {
	    // 如果需要分页器
	    pagination: '.swiper-pagination',
	    onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
		    swiperAnimateCache(swiper); //隐藏动画元素 
		    swiperAnimate(swiper); //初始化完成开始动画
		}, 
		onSlideChangeEnd: function(swiper){ 
		    swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
		} 
    });   
    document.querySelector("p").addEventListener("touchend",function(){
    	location.href = "../index.html";
    })
});
