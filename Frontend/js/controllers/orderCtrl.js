app.controller('orderCtrl', function($scope, $rootScope, dbFactory) {
    $scope.rendelesek = [];
    $scope.rendelesTetelek = [];
    
    dbFactory.selectAll('rendelesInfo').then(function(res) {
        // ha adminisztrátor, akkor minden felhasználó rendelését listázzuk
        if ($rootScope.loggedUser.rights == 1)
        {
            $scope.rendelesek = res;
        }
        else
        {
            // ha nem adminisztrátor, akkor csak a saját rendeléseit listázzuk
            res.forEach(element => {
                if (element.nev == $rootScope.loggedUser.nev)
                {
                    $scope.rendelesek.push(element);
                }
            });
        }
    });

    $scope.rendelesinfo = function(rendelesId) {
        dbFactory.select('rendelesReszletek', 'rendelesID', rendelesId).then(function(res) {
                $scope.rendelesTetelek = res;
        });
    }
});