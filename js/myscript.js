let app = angular.module("MyApp", []);

app.controller("MyCtrl", ($scope) => {
  $scope.title = "Stay Home Stay Safe";

  console.log("App Loaded");

  fetch("https://covid19.mathdro.id/api")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      $scope.all_data = data;
    });
});
