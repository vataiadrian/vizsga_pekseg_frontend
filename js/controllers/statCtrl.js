app.controller('statCtrl', function($scope, $rootScope, dbFactory) {
    $scope.eladasok = [];
    $scope.osszbevetel = 0;
    $scope.osszdb = 0;
    dbFactory.selectAll('eladasok').then(function(res) {
        $scope.eladasok = res;

        $scope.eladasok.forEach(element => {
            $scope.osszbevetel += element.ossz;
            $scope.osszdb += element.menny;
        });
    });

    dbFactory.selectAll('statisztika').then(function(res) {
        $scope.rendelesek = res;
        let datapoints = [];
        let events = [];

        $scope.rendelesek.forEach(rendeles => {
            rendeles.datum = rendeles.datum.substring(0, 10);
            datapoints.push({ label: rendeles.datum, y: rendeles.bevetel });
            events.push({
                title: dbFactory.format(rendeles.bevetel) + ' ' + $rootScope.penznem,
                start: rendeles.datum
            });
        });

        dbFactory.toChart("Napi eladások grafikonja", "column", "grafikon", datapoints, "light1", true, true);
        dbFactory.toCalendar(events, "naptar", "dayGridMonth", false);
    });

});