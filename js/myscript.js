let app = angular.module("MyApp", []);

app.controller("MyCtrl", ($scope) => {
  $scope.title = "Stay Home Stay Safe";

  console.log("App Loaded");

  fetch("https://covid19.mathdro.id/api")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //   console.log("confirmed case are " + data.confirmed.value);
      //   console.log("death cases are " + data.deaths.value);
      //   console.log("recovered cases are " + data.recovered.value);
    });
  $scope.ccase = data.confirmed.value;
  $scope.rcase = data.recovered.value;
  $scope.dcase = data.deaths.value;
});
