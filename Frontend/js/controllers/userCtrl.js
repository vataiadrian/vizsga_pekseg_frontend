app.controller('userCtrl', function($scope, $rootScope, dbFactory) {

    $scope.felhasznalok = [];
    $scope.jogosultsagok = ['Vásárló', 'Adminisztrátor'];
    
    dbFactory.selectAll('felhasznalok').then(function(res){
        $scope.felhasznalok = res;
    });

});