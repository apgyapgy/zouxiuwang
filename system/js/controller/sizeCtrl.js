define(['main','js/service/sizeService.js'],function(app){
	app.controller('sizeCtrl',function($scope,sizeService){
		$scope.getList = function(){
			sizeService.list().then(function(succ){
				$scope.sizelist = succ.data;
			});
		}
		$scope.getList();
		
	});
});
