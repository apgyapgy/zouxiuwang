define(['main','js/service/goodsService.js'],function(app){
	app.controller('goodsCtrl',function($scope,goodsService){
		var lparams = {
			pageIndex:0,
			pageSize:10,
			m_name:''
		}
		$scope.getLists = function(i){
			i = i || 0;
			lparams.pageIndex = i;
			lparams.m_name = $scope.selectCon?$scope.selectCon:'';
			goodsService.list(lparams).then(function(succ){
				$scope.goodsList = succ.data;
				$scope.bigTotalItems = succ.count;
			});
		}
		$scope.setpage = function(pageNo){
			$scope.currentPage = pageNo;
		}
		$scope.pageChanged = function(){
			
		}
		$scope.selectPage = function(){
			$scope.getLists($scope.bigCurrentPage - 1);
		}
		$scope.maxSize = 6;
		$scope.bigCurrentPage = 1;
		$scope.getLists();
		$scope.gClose = function(){
			$("#myModal").modal('hide');
		}
		$scope.gSave = function(){
			if(!$scope.addForm.$invalid){
				var datas = {
					m_name : $scope.addForm.gName.$modelValue,
					m_title : $scope.addForm.gTitle.$modelValue,
					m_content : $scope.addForm.gCon.$modelValue,
					m_detail : $scope.addForm.gDet.$modelValue,
					m_price : $scope.addForm.gPrice.$modelValue,
					m_number : $scope.addForm.gNum.$modelValue,
					m_size : $scope.addForm.gSize.$modelValue,
					m_color : $scope.addForm.gColor.$modelValue,
					m_type : $scope.addForm.gType.$modelValue
				};
				goodsService.save(datas).then(function(succ){
					alert("添加商品成功!");
					$("#myModal").modal('hide');
				},function(err){
					alert("添加商品失败，请重试!");
				});
			}
		}
		$scope.add = function(){
			goodsService.color().then(function(succ){
				$scope.color = succ;
			});
			goodsService.size().then(function(succ){
				$scope.size = succ;
			});
			goodsService.type().then(function(succ){
				$scope.type = succ;
			});
		}
		$scope.gDelete = function(id){
			var answer = window.confirm('你确定删除该商品吗？');
			if(answer){
				goodsService.deleteM(id).then(function(succ){
					alert("删除成功!");
					$scope.getLists();
				},function(err){
					alert("删除失败，请重试!");
				});
			}
		}
		$scope.gEdit = function(obj){
			goodsService.color().then(function(succ){
				$scope.color = succ;
			});
			goodsService.size().then(function(){
				$scope.size = succ;
			});
			goodsService.type().then(function(succ){
				$scope.type = succ;
			});
			$scope.m_id = obj.m_id;
			$scope.m_name = obj.m_name;
			$scope.m_title = obj.m_title;
			$scope.m_content = obj.m_content;
			$scope.m_detail = obj.m_detail;
			$scope.m_price = obj.m_price;
			$scope.m_number = obj.m_number;
			$scope.m_size = obj.m_size;
			$scope.m_color = obj.m_color;
			$scope.m_type = obj.m_type;
		}
		$scope.gUpdate = function(id){
			if(!$scope.editForm.$invalid){
				var dprice = parseFloat($scope.m_price);
				var datas = {
					m_id:$scope.m_id,
					m_name : $scope.m_name,
					m_title : $scope.m_title,
					m_content : $scope.m_content,
					m_detail : $scope.m_detail,
					m_price : dprice,
					m_number : $scope.m_number,
					m_size : $scope.m_size,
					m_color : $scope.m_color,
					m_type : $scope.m_type
				};
				goodsService.update(datas).then(function(succ){
					alert(succ.msg);
					$scope.getLists();
					$("#editModal").modal('hide');
				},function(err){
					alert("修改商品失败，请重试!");
				});
			}
		}
		$scope.searchT = function(){
			$scope.selectCon = $scope.searchForm.searchText.$viewValue;
			$scope.getLists();
		}
	});
})
