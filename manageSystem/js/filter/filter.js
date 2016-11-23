var ngFilter = angular.module("ng.filter",[]);
//angular.module("ng.filter",[])  []是当前模块工作时需要引入的模块
ngFilter.filter('priceFilter',function(){
	return function(val){
		return parseInt(val*100)/100;
	}
});
