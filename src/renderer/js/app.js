var app = angular.module('monitorApp', [
	'patternfly',
	'angular-electron',
	'patternfly.charts',
	'LocalStorageModule'
]);

app.config(function(remoteProvider){

	remoteProvider.register('systeminformation');
	//remoteProvider.register({name: 'cpu', require: 'cpu-usage'});
	remoteProvider.register('cpu', function(remote) {
    	return remote.require('cpu-usage');
  	});

	remoteProvider.register('diskspace');

});