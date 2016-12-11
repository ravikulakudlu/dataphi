var app=angular.module('minmax',['jcs-autoValidate'
	]);

app.run(function(defaultErrorMessageResolver){

	defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages){

	errorMessages['fname']='fname only be character'
		errorMessages['lname']='lname only be character'
		errorMessages['min1']='age must be greater than 1'
		errorMessages['big']='age must not be less than 150'
        errorMessages['char']='cant be a char'
        errorMessages['min']='cant be <10'
        errorMessages['max']='cant be >10'
	});
  }

);


app.controller('MinMaxCtrl', function($scope,$http) {
	$scope.formModel={};

	$scope.onSubmit=function() {
     console.log("submitted!");
     console.log($scope.formModel);
    $http.post('http://ec2-54-218-126-159.us-west-2.compute.amazonaws.com:3029/submit',$scope.formModel).
     success(function(data){
      if(data == 'success')
	{
		window.location.href = "http://ec2-54-218-126-159.us-west-2.compute.amazonaws.com:3029/searchfun/search.html";
}
else
{
	alert("Email already exists");
}
     }).error(function(data){
     	console.log("(:")

     });

	};


});
