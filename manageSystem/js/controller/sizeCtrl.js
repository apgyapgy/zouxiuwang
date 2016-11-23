define(['main','js/service/sizeService.js'],function(app){
	app.controller('sizeCtrl',function($scope,sizeService){
		$scope.getList = function(){
			sizeService.list().then(function(succ){
				$scope.sizelist=succ.data;
			})
		}
		$scope.getList();
		
		// 添加尺寸
		$scope.addSize = function() {
			var dialog = my.show_dialog($("#myModal"),{
				prevent_auto_hide : true,
				ok_fn : function() {
					//如果form表单验证未通过
					if($scope.sizeForm.$invalid) {
						$scope.state = true;//验证失败，显示错误信息
					} else {
						//ajax与后台进行数据交互
						var name = $("#sizeName").val();
						var content = $("#sizeContent").val();
						sizeService.addSize(name,content).then(function(succ){
							dialog.modal("hide");
							my.alert("添加成功");
							$scope.getList();
						})
					}
				}
			});	
		}
		
		// 编辑尺寸
		$scope.editSize = function(id) {
			$("#dialog_title").html("编辑尺寸" + id);
			
			for(var i in $scope.sizelist) {
				var item = $scope.sizelist[i];
				if(item.s_id == id) {
					$("#sizeName").val(item.s_name);
					$("#sizeContent").val(item.s_content);
				}
			}
			
			var dialog = my.show_dialog($("#myModal"),{
				prevent_auto_hide : true,
				ok_fn : function() {
					//ajax与后台进行数据交互
					var name = $("#sizeName").val();
					var content = $("#sizeContent").val();
					sizeService.editSize(id, name,content).then(function(succ){
						dialog.modal("hide");
						my.alert("修改成功");
						$scope.getList();
					})
				}
			});
		}
		
		// 删除尺寸
		$scope.delSize = function(id) {
			my.confirm('确定要删除' + id + '吗?', function() {
				sizeService.delSize(id).then(function(succ){
					my.alert("删除成功");
				});
				$scope.getList();
			})
		}
	});
});
