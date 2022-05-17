app.controller('loginCtrl', function($scope, $rootScope, dbFactory, $location) {
    $scope.user = {};

    $scope.login = function() {
        if ($scope.email == null || $scope.passwd == null) {
            alert('Nem adtál meg minden belépési adatot!');
        } else {
            dbFactory.logincheck('felhasznalok', $scope.email, CryptoJS.SHA1($scope.passwd).toString()).then(function(res) {
                if (res.data.length > 0) {
                    $rootScope.loggedIn = true;
                    $rootScope.loggedUser = res.data[0];
                    sessionStorage.setItem('peksegUser', angular.toJson( $rootScope.loggedUser));

                } else {
                    alert('Hibás belépési adatok!');
                }
            });
        }
    }

    $scope.logout = function() {
        sessionStorage.removeItem('peksegJog');
        $rootScope.loggedUser = "";
        $rootScope.loggedIn = false;
        $rootScope.jog = "";
        $location.path('#!/');
    }

    $scope.regist = function(){
       if ($scope.user.name == null || $scope.user.email == null || $scope.user.pass1 == null || $scope.user.pass2 == null )
       {
           alert('Nem adtál meg minden kötelezős adatot!');
       }
       else
       {
            if ($scope.user.pass1 != $scope.user.pass2)
            {
                alert('A megadott jelszavak nem egyeznek!');
            }
            else
            {
                dbFactory.select('felhasznalok', 'email', $scope.user.email).then(function(res){
                        if (res.length > 0)
                        {
                            alert('Ez az e-mail cím már foglalt!');
                        }
                        else
                        {
                            let data = {
                                'nev' : $scope.user.name, 	
                                'email'  : $scope.user.email,	
                                'cim' : $scope.user.address, 	
                                'telefonszam' : $scope.user.phone,	
                                'jelszo' : CryptoJS.SHA1($scope.user.pass1).toString(),
                                'rights' : 0 	
                            }
                            dbFactory.insert('felhasznalok', data).then(function(res){
                                $scope.user = {};
                                alert('A regisztráció sikeres! Bejelentkezhet!');
                            });
                        }
                });
            }
        }
    }
})