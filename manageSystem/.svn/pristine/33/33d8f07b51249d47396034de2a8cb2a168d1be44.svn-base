define(['main','js/service/colorService.js'],function(app){
	app.controller('colorCtrl',function($scope,colorService){
		$scope.getColorList = function(){
			colorService.list().then(function(succ){
				$scope.colorlist=succ.data;
			})
		}
		$scope.getColorList();
		
		// 添加颜色
		$scope.addColor = function() {
			var dialog = my.show_dialog($("#myModal"),{
				prevent_auto_hide : true,
				ok_fn : function() {
					//如果form表单验证未通过
					if($scope.colorForm.$invalid) {
						$scope.state = true;//验证失败，显示错误信息
					} else {
						//ajax与后台进行数据交互
						var name = $("#colorName").val();
						colorService.addColor(name).then(function(succ){
							dialog.modal("hide");
							my.alert("添加成功");
							//location.reload();
							$scope.getColorList();
						})
					}
				}
			});	
		}
		
		//修改颜色
		$scope.editColor = function(id) {
			$("#dialog_title").html("编辑颜色" + id);
			for(var i in $scope.colorlist) {
				var item = $scope.colorlist[i];
				if(item.c_id == id) {
					$("#colorName").val(item.c_name);
				}
			}
			var dialog = my.show_dialog($("#myModal"),{
				prevent_auto_hide : true,
				ok_fn : function() {
					//ajax与后台进行数据交互
					var name = $("#colorName").val();
					colorService.editColor(id,name).then(function(succ){
						dialog.modal("hide");
						my.alert("修改成功");
						$scope.getColorList();
					})
				}
			});
		}
		
		
		//删除颜色
		$scope.delColor = function(id) {
			my.confirm('确定要删除' + id + '吗?', function() {
				colorService.delColor(id).then(function(succ){
					my.alert("删除成功");
					$scope.getColorList();
				})
			})
		}
	});
});