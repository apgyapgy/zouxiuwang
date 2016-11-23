define(['angularAMD','uiRouter','angularBootstrapUi','jquery','bootstrap',"my"],function(angularAMD){
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
							{text:"商品尺寸",state:'home.size'},
							{text:"商品颜色",state:'home.color'},
							{text:"商品类型",state:'home.class'}
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
		}).state('home.color',{
			url:'/color',
			views:{
				'right':{
					controller:'colorCtrl',
					templateUrl:'views/color.html'
				}
			},
			resolve:{
				load:function($q){
					var d = $q.defer();
					require(['js/controller/colorCtrl.js'],function(){
						d.resolve();
					});
					return d.promise;
				}
			}
		}).state('home.size',{
			url:'/size',
			views:{
				'right':{
					controller:'sizeCtrl',
					templateUrl:'views/size.html'
				}
			},
			resolve:{
				load:function($q){
					var d = $q.defer();
					require(['js/controller/sizeCtrl.js'],function(){
						d.resolve();
					});
					return d.promise;
				}
			}
		});
		$url.otherwise('/home/user');
	}]);
	//将angular模块构建一个符合requirejs规范的模块，提供外部使用
	return angularAMD.bootstrap(app);
});