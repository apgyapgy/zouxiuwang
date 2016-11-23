define(['main'],function(app){
	app.factory("classService",function($http,$q){
		var classService = {};
		var baseUrl = 'http://demoapptest.duapp.com';
		classService.list = function(){
			var d = $q.defer();
			$http({
				method:'get',
				url:baseUrl+'/type/getByParentId',
				data:{
					id: 0
				},
			}).then(function(succ){
				d.resolve(succ.data);
			},function(error){
				d.reject(error);
			});
			return d.promise;
		} 
		
		classService.addClass = function(parent_id, name, content){
			var d = $q.defer();
			$http({
				method:'post',
				url:baseUrl+'/type/save',
				data:{
					t_name:name,
					t_content:content,
					t_parent: parent_id
				},
				headers: {
      				'Content-Type': 'application/x-www-form-urlencoded'
    			}
			}).then(function(succ){
				d.resolve(succ.data);
			},function(error){
				d.reject(error);
			});
			return d.promise;
		}
		
		classService.editClass = function(id,parent,name, content){
			var d = $q.defer();
			$http({
				method:'put',
				url:baseUrl+'/type/update',
				data:{
					t_id:id,
					t_name:name,
					t_content:content,
					t_parent: parent
				},
				headers: {
      				'Content-Type': 'application/x-www-form-urlencoded'
    			}
			}).then(function(succ){
				d.resolve(succ.data);
			},function(error){
				d.reject(error);
			});
			return d.promise;
		}
		
		classService.delClass = function(id) {
			var d = $q.defer();
			$http({
				method:'delete',
				url:baseUrl+'/type/delete/' + id,
			}).then(function(succ){
				d.resolve(succ.data);
			},function(error){
				d.reject(error);
			});
			return d.promise;
		}
		
		return classService;
	});
});