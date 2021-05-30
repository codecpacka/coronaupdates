

let app = angular.module("MyApp", []);

app.controller("MyCtrl", ($scope, $http) => {
  $scope.title = "Stay Home Stay Safe";

  console.log("App Loaded");

  $scope.get_s_data = () => {
    let state = $scope.s;
    if(state == '')
    {
      return;
    }

    fetch('https://api.postalpincode.in/pincode/{PINCODE}')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((po) => {
        for (post in po) {
          for(subpost in po[post]) {
            console.log(po[post][subpost]);
          }
        }
      });
    });
});
