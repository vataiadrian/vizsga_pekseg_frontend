//
//  a kosár-kezelés kontrollere
//

app.controller('cartCtrl', function($scope, $rootScope, dbFactory) {
    
    $scope.db =  [];
    $scope.rendeles = {
        'nev': $rootScope.loggedUser.nev,
        'cim': $rootScope.loggedUser.cim,
        'tel': $rootScope.loggedUser.telefonszam,
        'vegosszeg': 0
    };

    $rootScope.rendelesek.forEach(item => {
        $scope.rendeles.vegosszeg += item.db * item.egys;
        $scope.db.push(item.db);
    });

    // a kosárban lévő tételek megrendelése
    $scope.megrendel = function() {
        if ($rootScope.loggedIn == false)
        {
            alert('A rendeléshez jelentkezz be!');
        }
        else
        {
            if ($scope.rendeles.cim == null || $scope.rendeles.tel == null || $scope.rendeles.cim == '' || $scope.rendeles.tel == '') {
                alert('Nem adtad meg a rendeléshez szükséges adatokat!');
            } else {

                if ($rootScope.loggedUser.cim == null)
                {
                    let data = {
                        'cim': $scope.rendeles.cim
                    }
                    dbFactory.update('felhasznalok', $rootScope.loggedUser.ID, data).then(function(res){
                        $rootScope.loggedUser.cim = $scope.rendeles.cim;
                    });
                }

                if ($rootScope.loggedUser.telefonszam == null)
                {
                    let data = {
                        'telefonszam': $scope.rendeles.tel
                    }
                    dbFactory.update('felhasznalok', $rootScope.loggedUser.ID, data).then(function(res){
                        $rootScope.loggedUser.telefonszam = $scope.rendeles.tel;
                    });;
                }
                
                let data = {
                   'felhID'  :	$rootScope.loggedUser.ID,
                   'datum' : 	moment(new Date()).format('YYYY-MM-DD H:m:s'),
                   'vegosszeg' : $scope.rendeles.vegosszeg
                }

                dbFactory.insert('rendelesek', data).then(function(res) {
                    let rendID = res.insertId;
                    $rootScope.rendelesek.forEach(item => {
                        let adat = {
                            rendelesID: rendID,
                            tetelID: item.id,
                            db: item.db
                        }
                        dbFactory.insert('rendelestetelek', adat).then(function(res) {});
                    });

                    $scope.rendeles.vegosszeg = 0;
                    $scope.rendelesek = [];
                    localStorage.removeItem('peksegkosar');
                    $rootScope.kosarDB = null;
                    alert('Köszönjük a rendelést!');
                });
            }
        }
    }

    // összes tétel törlése a kosárból
    $scope.kosarurites = function() {
        if (confirm('Biztosan törlöd az összes tételt a kosárból?'))
        {
            $rootScope.rendelesek = [];
            $scope.rendeles.vegosszeg = 0;
            $rootScope.kosarDB = null;
            localStorage.removeItem('peksegkosar');
        }
    }

    // megadott tétel törlése a kosárból
    $scope.delete = function(idx) {

        if (confirm('Biztosan törlöd a tételt a kosárból?'))
        {
            $rootScope.rendelesek.splice(idx, 1);
            $scope.rendeles.vegosszeg = 0;
            $rootScope.rendelesek.forEach(item => {
                $scope.rendeles.vegosszeg += item.db * item.egys;
            });
            $rootScope.kosarDB = $rootScope.rendelesek.length;
            localStorage.setItem('peksegkosar', angular.toJson($rootScope.rendelesek));
        }
    }

    // a kosárban lévő mennyiség módosítása egy tételnél
    $scope.update = function(idx) {
        $rootScope.rendelesek[idx].db = $scope.db[idx];
        $scope.rendeles.vegosszeg = 0;
        $rootScope.rendelesek.forEach(item => {
            $scope.rendeles.vegosszeg += item.db * item.egys;
        });
        $rootScope.kosarDB = $rootScope.rendelesek.length;
        localStorage.setItem('peksegkosar', angular.toJson($rootScope.rendelesek));
        alert('A kosárban lévő mennyiség módosítva!');
    }
});