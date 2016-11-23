define(['main','js/service/userService.js'],function(app){
	app.controller('userCtrl',function($scope,userService){
		var params = {
			u_name:'',
			pageIndex:0
		};
		$scope.getList = function(i){
			i = i || 0;
			params:pageIndex = i;
			userService.list(params).then(function(succ){
				$scope.lists = succ.data;
				$scope.bigTotalItems = succ.count;
			});
		}
		$scope.setpage = function(pageNo){
			$scope.currentPage = pageNo;
		}
		$scope.selectPage = function(){
			$scope.getList($scope.bigCurrentPage - 1);
		}
		$scope.maxSize = 6;
		$scope.bigCurrentPage = 1;
		$scope.getList();
	});
});
