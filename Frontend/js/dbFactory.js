app.factory('dbFactory', function($http, $q) {
    let url = "192.168.88.252:5000";
    return {
        logincheck: function(tablename, email, pass) {
            let deferred = $q.defer();
            let data = {
                table: tablename,
                email: email,
                passwd: pass
            }
            $http.post(url + '/login', data).then(
                function(res) {
                    deferred.resolve(res);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // CREATE DATABASE
        createDB: function(databasename) {
            let deferred = $q.defer();

            $http.post(url + '/DB/' + databasename).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // CREATE DATABASE
        createUser: function(user) {
            let deferred = $q.defer();

            $http.post(url + '/DBuser/add', user).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // SELECT ALL
        selectAll: function(tablename) {
            let deferred = $q.defer();

            $http.get(url + '/' + tablename).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // SELECT ONE RECORD
        select: function(tablename, field, value) {
            let deferred = $q.defer();

            $http.get(url + '/' + tablename + '/' + field + '/' + value).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // INSERT ONE RECORD
        insert: function(tablename, values) {
            let deferred = $q.defer();

            $http.post(url + '/' + tablename, values).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // UPDATE ONE RECORDS
        update: function(tablename, id, values) {
            let deferred = $q.defer();

            $http.patch(url + '/' + tablename + '/' + id, values).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // DELETE ONE RECORDS
        delete: function(tablename, id) {
            let deferred = $q.defer();

            $http.delete(url + '/' + tablename + '/' + id).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        // DELETE ALL RECORDS
        deleteAll: function(tablename) {
            let deferred = $q.defer();
            $http.delete(url + '/' + tablename).then(
                function(res) {
                    deferred.resolve(res.data);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        },

        toChart: function(title, type, div, datapoints, theme, anim,
            exp) {
            var chart = new CanvasJS.Chart(div, {
                animationEnabled: anim,
                exportEnabled: exp,
                theme: theme, // "light1", "light2", "dark1", "dark2"
                title: {
                    text: title
                },
                axisY: {
                    includeZero: true
                },
                data: [{
                    // "bar", "column", "pie", "doughnut", "line", "spline", "splineArea", "area"
                    type: type,
                    dataPoints: datapoints
                }]
            });
            chart.render();
        },

        toCalendar: function(events, div, view, edit) {

            var calendarEl = document.getElementById(div);
            var today = new Date();
            var calendar = new FullCalendar.Calendar(calendarEl, {
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                },
                businessHours: {
                    // days of week. an array of zero-based day of week integers (0=Sunday)
                    daysOfWeek: [1, 2, 3, 4, 5], // Monday - Thursday

                    startTime: '07:00', // a start time (10am in this example)
                    endTime: '21:00', // an end time (6pm in this example)
                },
                initialDate: today,
                initialView: view, // dayGridMonth,timeGridWeek,timeGridDay,listMonth
                locale: 'hu',
                buttonIcons: false, // show the prev/next text
                weekNumbers: true,
                navLinks: true, // can click day/week names to navigate views
                editable: edit,
                dayMaxEvents: true, // allow \"more\" link when too many events
                events: events

            });

            calendar.render();

        },

        format: function(amount, decimalCount = 0, decimal = ",", thousands = ".") {
            var re = '\\d(?=(\\d{' + (3) + '})+' + (decimalCount > 0 ? '\\,' : '$') + ')';
            return amount.toFixed(Math.max(0, ~~decimalCount)).replace(new RegExp(re, 'g'), '$&.');
        }
    }
});