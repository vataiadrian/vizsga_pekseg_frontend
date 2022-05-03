var app = new angular.module('pekseg', ['ngRoute']);

app.run(function($rootScope, $locale) {
    $locale.NUMBER_FORMATS.GROUP_SEP = ".";
    $locale.NUMBER_FORMATS.DECIMAL_SEP = ",";

    $rootScope.title = .................................................;
    $rootScope.subtitle = .................................................;
    $rootScope.company = .................................................;
    $rootScope.author = .................................................;
    $rootScope.penznem = .................................................;

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
        ....................................
        ....................................
        ....................................
        ....................................
        ....................................
        ....................................
        ....................................
        ....................................
});