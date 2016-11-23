define(['main'],function(app){
	app.factory("sizeService",function($http,$q){
		var sizeService = {};
		var baseUrl = 'http://demoapptest.duapp.com';
		sizeService.list = function(){
			var d = $q.defer();
			$http({
				method:'get',
				url:baseUrl+'/size/list'
			}).then(function(succ){
				d.resolve(succ.data);
			},function(error){
				d.reject(error);
			});
			return d.promise;
		} 
		
		sizeService.addSize = function(name, content){
			var d = $q.defer();
			$http({
				method:'post',
				url:baseUrl+'/size/save',
				data:{
					s_name:name,
					s_content:content
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
		
		sizeService.editSize = function(id,name, content){
			var d = $q.defer();
			$http({
				method:'put',
				url:baseUrl+'/size/update',
				data:{
					s_id:id,
					s_name:name,
					s_content:content
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
		
		sizeService.delSize = function(id) {
			var d = $q.defer();
			$http({
				method:'delete',
				url:baseUrl+'/size/delete/' + id,
			}).then(function(succ){
				d.resolve(succ.data);
			},function(error){
				d.reject(error);
			});
			return d.promise;
		}
		
		return sizeService;
	});
	
	var mapping = {
        	color:{
        		id:"s_id",
        		name:'s_name'
        	}
        }
    //将前端的格式 转化为后台编写的格式
    function webToData(data,mapping) {
    	if(Array.isArray(data)) {
    		var arr= [];
    		for(var i=0;i<data.length;i++) {
    			var config =  {};
	        	for(var key in mapping) {
	        		var val = mapping[key];
	        		config[val] = data[i][key];
	        	}
	        	arr.push(config);
    		}
    		return arr;
    	} else {
    		var config =  {};
        	for(var key in mapping) {
        		var val = mapping[key];
        		config[val] = data[key];
        	}
        	return config;
    	}
    }
    //将后台返回的数据转化为前台自定义的格式
    // {c_id:'',c_name:""} => {id:'',name:''}
    function dataToWeb(data,mapping) {
    	if(Array.isArray(data)) {
    		var arr = [];
    		for(var i=0;i<data.length;i++) {
    			var obj = {}
	        	for(var key in mapping) {
	        		// key mapping[key]
	        		var val = mapping[key];
	        		obj[key] = data[i][val];
	        	}
	        	arr.push(obj);
    		}
    		return arr;
    	} else {
    		var obj = {}
        	for(var key in mapping) {
        		// key mapping[key]
        		var val = mapping[key];
        		obj[key] = data[val];
        	}
        	return obj; 
    	}
    }
	
});
