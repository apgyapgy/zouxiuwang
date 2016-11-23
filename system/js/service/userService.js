define(['main'],function(app){
	app.factory('userService',function($http,$q){
		var user = {};
		var baseUrl = 'http://demoapptest.duapp.com';
		user.list = function(obj){
			var q = $q.defer();
			$http({
				method:'GET',
				url:baseUrl + '/user/list',
				params:obj
			}).then(function(succ){
				q.resolve(succ.data);
			},function(err){
				
			});
			return q.promise;
		}
		return user;
	});
});
