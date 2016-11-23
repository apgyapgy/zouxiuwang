define(['main'],function(app){
	app.factory("goodsService",function($http,$q){
		var baseUrl = 'http://demoapptest.duapp.com';
		var goods = {};
		//获取商品列表
		goods.list = function(obj){
			var q = $q.defer();
			$http({
				method:"GET",
				url:baseUrl + '/mall/list',
				params:obj
			}).then(function(succ){
				q.resolve(succ.data);
			},function(err){});
			return q.promise;
		}
		//保存商品
		goods.save = function(obj){
			var q = $q.defer();
			$http({
				method:"POST",
				url:baseUrl + '/mall/save',
				data:obj,
				headers: {
      				'Content-Type': 'application/x-www-form-urlencoded'
    			}
			}).then(function(succ){
				q.resolve(succ.data);
			},function(err){
				q.reject(err);
			});
			return q.promise;
		}
		//删除商品
		goods.deleteM = function(id){
			var q = $q.defer();
			$http({
				method:"DELETE",
				url:baseUrl+'/mall/delete/'+ id,
				params:goods
			}).then(function(succ){
				q.resolve(succ);
			},function(err){});
			return q.promise;
		}
		//更新商品
		goods.update = function(obj){
			var q = $q.defer();
			$http({
				method:"PUT",
				url:baseUrl + '/mall/update',
				params:obj,
				headers: {
      				'Content-Type': 'application/x-www-form-urlencoded'
    			}
			}).then(function(succ){
				q.resolve(succ.data);
			},function(err){
				q.reject(err);
			});
			return q.promise;
		}
		//获取商品颜色
		goods.color = function(){
			var q = $q.defer();
			$http({
				method:"GET",
				url:baseUrl + '/color/list'
			}).then(function(succ){
				q.resolve(succ.data.data);
			},function(err){});
			return q.promise;
		}
		//获取商品类型
		goods.type = function(){
			var q = $q.defer();
			$http({
				method:"GET",
				url:baseUrl + '/type/getByParentId'
			}).then(function(succ){
				q.resolve(succ.data.data);
			},function(err){});
			return q.promise;
		}
		//获取商品大小
		goods.size = function(){
			var q = $q.defer();
			$http({
				method:"GET",
				url:baseUrl + '/size/list'
			}).then(function(succ){
				q.resolve(succ.data.data);
			},function(err){});
			return q.promise;
		}
		return goods;
	});
});
