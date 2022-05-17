var app = new angular.module('pekseg', ['ngRoute']);

app.run(function($rootScope, $locale) {
    $locale.NUMBER_FORMATS.GROUP_SEP = ".";
    $locale.NUMBER_FORMATS.DECIMAL_SEP = ",";

    $rootScope.title = "Házi Pékség";
    $rootScope.subtitle = "Szoftverfejlesztő és tesztekő Vizsgafeladat";
    $rootScope.company = "Bajai SZC Türr István Technikum";
    $rootScope.author = "Az Ön neve"
    $rootScope.penznem = "Ft"

    $rootScope.rendelesek = [];
    if (sessionStorage.getItem('peksegUser')) {
        $rootScope.loggedIn = true;
        $rootScope.loggedUser = angular.fromJson(sessionStorage.getItem('peksegUser'));
    } else {
        $rootScope.loggedIn = false;
        $rootScope.loggedUser = "";
    }
});

app.config(function($routeProvider) {
    $routeProvider
    .when({
        "path": "/",
        "templateUrl": "views/termeklista.html",
        "controller": "productCtrl"
    })
    .when({
        "path": "/reg",
        "templateUrl": "views/regisztracio.html",
        "controller": "loginCtrl"
    })
    .when({
        "path": "/kosar",
        "templateUrl": "views/kosar.html",
        "controller": "cartCtrl"
    })
    .when({        
        "path": "/",
        "templateUrl": "views/termekek.html",
        "controller": "productCtrl"
    })
    .when({
        "path": "/",
        "templateUrl": "views/felhasznalok.html",
        "controller": "userCtrl"
    })
    .when({
        "path": "/",
        "templateUrl": "views/rendelesek.html",
        "controller": "orderCtrl"
    })
    .when({
        "path": "/",
        "templateUrl": "views/statisztika.html",
        "controller": "statCtrl"
    })

});