var app = angular.module('minmax',[]);

app.controller('PatientsController', function ($scope,$http){
	
    $http.get('http://ec2-54-218-126-159.us-west-2.compute.amazonaws.com:3029/list').
     success(function(data){
     	$scope.patients= data;

     }).error(function(data){
     	console.log("(:")

     });

	$scope.search="";
	$scope.order="firstname";
	$scope.selectedIndex=null;
	$scope.SelectedPatient=null;
	$scope.selectPatient=function(patient,index){
		$scope.selectedIndex=index;
		$scope.SelectedPatient=patient;
	};

	$scope.sensitiveSearch = function(patient){
		if($scope.search){
			return patient.firstname.indexOf($scope.search)==0 ||
			       patient.lastname.indexOf($scope.search)==0;

		}
		return true;	
	
	};


});