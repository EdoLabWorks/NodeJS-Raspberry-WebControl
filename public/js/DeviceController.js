'use strict'

var device = angular.module('WebControlApp', []);
device.controller('DeviceController', ['$scope', 'ControlService', function ($scope, ControlService) {
var vm = {};
vm.result = [];
vm.sd = function (x) {
vm.result = [];
var ControlData = {d:x};
ControlService.sd(ControlData).then(function (r) {
vm.result = JSON.parse((r.data.item).toString()); 
});
};
vm.sd('pinstat');
$scope.vm = vm;
}]);
device.factory('ControlService', ['$http', function ($http) {
var url = '/device';
return { sd: function (payload) { 
return $http.post(url + '/data', payload);
} 
}
}]); 


