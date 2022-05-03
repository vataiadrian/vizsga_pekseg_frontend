app.controller('productCtrl', function($scope, $rootScope, dbFactory) {

    $scope.termek = {};
    $scope.termekek = [];
    $scope.db = [];

    if ($rootScope.rendelesek = angular.fromJson(localStorage.getItem('peksegkosar'))) {
        $rootScope.kosarDB = $rootScope.rendelesek.length;
    } else {
        $rootScope.rendelesek = [];
        $rootScope.kosarDB = null;
    }

    dbFactory.selectAll('termekek').then(function(res) {
        $scope.termekek = res;
        for (let i = 0; i < $scope.termekek.length; i++) {
            $scope.db[i] = 0;
        }
    });

    $scope.addProduct = function() {
        $scope.pizza = {};
        $scope.modaltitle = 'Új termék felvétele';
        $scope.modalBtn = "Felvesz";
        $scope.modalType = "success";
        $scope.mode = 1;
    }

    $scope.modProduct = function(id) {
        $scope.modaltitle = 'Termék adatainak módosítása';
        $scope.modalBtn = "Módosít";
        $scope.modalType = "warning";
        $scope.mode = 2;
        dbFactory.select('termekek', 'ID', id).then(function(res) {
            $scope.termek = res[0];
        });
    }

    $scope.delProduct = function(id) {
        $scope.mode = 3;
        $scope.modaltitle = 'Termék törlése';
        $scope.modalBtn = "Töröl";
        $scope.modalType = "danger";
        dbFactory.select('termekek', 'ID', id).then(function(res) {
            console.log(res);
            $scope.termek = res[0];
        });
    }

    $scope.submit = function() {
        // insert 
        if ($scope.mode == 1) {
            if ($scope.termek.nev == null || $scope.termek.reszletek == null || $scope.termek.kaloria == null || $scope.termek.ar == null) {
                alert('Nem adtál meg minden adatot!');
            } else {
                dbFactory.insert('termekek', $scope.termek).then(function(res) {
                    $scope.termek.ID = res.insertId; 
                    $scope.termekek.push($scope.termek);
                    $scope.termek = {};
                    alert('A termék felvéve!');
                });
            }
        }

        // update
        if ($scope.mode == 2) {
            if ($scope.termek.nev == null || $scope.termek.reszletek == null || $scope.termek.kaloria == null || $scope.termek.ar == null) {
                alert('Nem adtál meg minden adatot!');
            } else {
                dbFactory.update('termekek', $scope.termek.ID, $scope.termek).then(function(res) {
                    let index = $scope.termekek.findIndex(item => item.ID === $scope.termek.ID);
                    $scope.termekek[index] = $scope.termek;
                    $scope.termek = {};
                    alert('A termék módosítva!');
                });
            }
        }

        // delete
        if ($scope.mode == 3) {
            dbFactory.delete('termekek', $scope.termek.ID).then(function(res) {
                let index = $scope.termekek.findIndex(item => item.ID === $scope.termek.ID);
                $scope.termekek.splice(index, 1);
                $scope.termek = {};
                alert('A termék törölve!');
            });
        }
    }

    $scope.kosarba = function(idx) {
        if ($scope.db[idx] == 0) {
            alert('Nem adtad meg a mennyiséget!');
        } else {
            let index = $rootScope.rendelesek.findIndex(item => item.id == $scope.termekek[idx].ID);
            if (index == -1) {
                // ha nincs még a kosárban, akkor felvesszük
                $rootScope.rendelesek.push({
                    id: $scope.termekek[idx].ID,
                    nev: $scope.termekek[idx].nev,
                    db: $scope.db[idx],
                    egys: $scope.termekek[idx].ar
                });
                localStorage.setItem('peksegkosar', angular.toJson($rootScope.rendelesek));
                alert('Kosárba téve!');
                $rootScope.kosarDB = $rootScope.rendelesek.length;
            } else {
                // ha benne van már a kosárban, csak a db számot frissítjük
                $rootScope.rendelesek[index].db += $scope.db[idx];
                localStorage.setItem('peksegkosar', angular.toJson($rootScope.rendelesek));
                alert('A kosárban lévő mennyiség frissítve!');
            }
            $scope.db[idx] = 0;
        }
    }
});