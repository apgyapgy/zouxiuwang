define(['angularAMD', 'uiRouter','angularBootstrapUi'], function(angularAMD) {
	//angularAMD引入会自动引入angular全局变量
	//定义模块初始化
	var app = angular.module('myApp', ['ui.router','ui.bootstrap']);

	var loader = function($q, jsConfig) {
		//注入服务
		//require 加载js文件 加载时异步的
		var q = $q.defer();
		//加载一个当前文件所需要的js文件
		//依赖加载
		require(jsConfig, function() {
			q.resolve();
		});
		return q.promise;
	}

	app.config(["$stateProvider", "$urlRouterProvider", function($state, $url) {
			$state.state("home",{
				url:'/home',
				views:{
					'left':{
						templateUrl:'views/left.html',
						controller:function($scope){
							$scope.leftRoute = [
								{text:"用户管理",state:'home.user'},
								{text:"商品管理",state:'home.goods'},
								{text:"类型管理",state:'home.class'}
							];
						}
					}
				}
			}).state('home.user',{
				url:'/user',
				views:{
					'right':{
						controller:'userCtrl',
						templateUrl:'views/user.html'
					}
				},
				resolve:{
					load:function($q){
						var d = $q.defer();
						require(['js/controller/userCtrl.js'],function(){
							d.resolve();
						});
						return d.promise;
					}
				}
			}).state('home.goods',{
				url:'/goods',
				views:{
					'right':{
						controller:'goodsCtrl',
						templateUrl:'views/goods.html'
					}
				},
				resolve:{
					load:function($q){
						var d = $q.defer();
						require(['js/controller/goodsCtrl.js'],function(){
							d.resolve();
						});
						return d.promise;
					}
				}
			}).state('home.class',{
				url:'/class',
				views:{
					'right':{
						controller:'classCtrl',
						templateUrl:'views/class.html'
					}
				},
				resolve:{
					load:function($q){
						var d = $q.defer();
						require(['js/controller/classCtrl.js'],function(){
							d.resolve();
						});
						return d.promise;
					}
				}
			});
			//默认路由
			$url.otherwise('/home');
		}])
		//将angular模块 构建一个符合requirejs规范的模块 提供外部使用
	return angularAMD.bootstrap(app);
})
/*
define(['angularAMD','uiRouter','angularBootstrapUi'],function(angularAMD){
	var app = angular.module('myApp',['ui.router','ui.bootstrap']);
	//注入ui.bootstrap，不然分布显示不出来 
	app.config(["$stateProvider","$urlRouterProvider",function($state,$url){
		$state.state("home",{
			url:'/home',
			views:{
				'left':{
					templateUrl:'views/left.html',
					controller:function($scope){
						$scope.leftRoute = [
							{text:"用户管理",state:'home.user'},
							{text:"商品管理",state:'home.goods'},
							{text:"类型管理",state:'home.class'}
						];
					}
				}
			}
		})
		.state('home.user',{
			url:'/user',
			views:{
				'right':{
					controller:'userCtrl',
					templateUrl:'views/user.html'
				}
			},
			resolve:{
				load:function($q){
					var d = $q.defer();
					require(['js/controller/userCtrl.js'],function(){
						d.resolve();
					});
					return d.promise;
				}
			}
		}).state('home.goods',{
			url:'/goods',
			views:{
				'right':{
					controller:'goodsCtrl',
					templateUrl:'views/goods.html'
				}
			},
			resolve:{
				load:function($q){
					var d = $q.defer();
					require(['js/controller/goodsCtrl.js'],function(){
						d.resolve();
					});
					return d.promise;
				}
			}
		}).state('home.class',{
			url:'/class',
			views:{
				'right':{
					controller:'classCtrl',
					templateUrl:'views/class.html'
				}
			},
			resolve:{
				load:function($q){
					var d = $q.defer();
					require(['js/controller/classCtrl.js'],function(){
						d.resolve();
					});
					return d.promise;
				}
			}
		});
		$url.otherwise('/user');
	}]);
	//将angular模块构建一个符合requirejs规范的模块，提供外部使用
	return angularAMD.bootstrap(app);
});
*/