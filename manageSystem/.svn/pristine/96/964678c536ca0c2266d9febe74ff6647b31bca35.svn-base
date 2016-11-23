define(['main','js/service/classService.js'],function(app){
	app.controller('classCtrl',function($scope,classService){
		classService.list().then(function(succ){
			$scope.classList=succ.data;
		})
		
		// 添加类型
		$scope.addClass = function(id) {
			if(id == null) {
				$("#dialog_title").html("添加一级类型");
			} else {
				$("#dialog_title").html("添加【" + id + "】子类型");
			}
			
			var dialog = my.show_dialog($("#myModal"),{
				prevent_auto_hide : true,
				ok_fn : function() {
					//如果form表单验证未通过
					if($scope.classForm.$invalid) {
						$scope.state = true;//验证失败，显示错误信息
					} else {
						//ajax与后台进行数据交互
						var name = $("#className").val();
						var content = $("#classContent").val();
						classService.addClass(id,name,content).then(function(succ){
							dialog.modal("hide");
							my.alert("添加成功");
						})
					}
				}
			});	
		}
		
		// 编辑类型
		$scope.editClass = function(id) {
			$("#dialog_title").html("编辑类型" + id);
			
			var parent_id = 0;
			
			for(var i in $scope.classList) {
				var item = $scope.classList[i];
				if(item.t_id == id) {
					$("#className").val(item.t_name);
					$("#classContent").val(item.t_content);
					parent_id = item.t_parent;
				}
			}
			
			var dialog = my.show_dialog($("#myModal"),{
				prevent_auto_hide : true,
				ok_fn : function() {
					//ajax与后台进行数据交互
					var name = $("#className").val();
					var content = $("#classContent").val();
					classService.editClass(id,parent_id,name,content).then(function(succ){
						dialog.modal("hide");
						my.alert("编辑成功");
					})
				}
			});
		}
		
		// 删除类型
		$scope.delClass = function(id) {
			my.confirm('确定要删除' + id + '吗?', function() {
				classService.delClass(id).then(function(succ){
					my.alert("删除成功");
				})
			})
		}
	});
});
