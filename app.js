var app = angular.module('myApp', []);

app.controller('testController', ['$scope', function($scope) {


    $scope.aVal = 10;
    $scope.bVal = 0;
    var countA = 0, countB = 0, countAvg = 0;
    var latestA = $scope.aVal, latestB = $scope.bVal, latestAvg = $scope.avg;
    var currentTime = new Date().getTime();
    $scope.$watch('aVal', function(newVal) {
    	latestA = newVal;
        aLineChart.data.datasets[0].data.push(newVal);
         aLineChart.data.labels.push(countA);
        aLineChart.update();
        calcAvg();
    });
    $scope.$watch('bVal', function(newVal) {
    	latestB = newVal;
        bLineChart.data.datasets[0].data.push(newVal);
       bLineChart.data.labels.push(countB);
        bLineChart.update();
        calcAvg();
    });

    var calcAvg = function() {
        console.log("in here");
        $scope.avg = (Number($scope.aVal) + Number($scope.bVal)) / 2;
        latestAvg = $scope.avg;
        avgLineChart.data.datasets[0].data.push($scope.avg);
        avgLineChart.data.labels.push(countAvg);
        avgLineChart.update();

    }

    setInterval(function(){updateCharts()}, 1000);

    var updateCharts = function() {
    	countA++;
    	countB++;
    	countAvg++;
    	 aLineChart.data.datasets[0].data.push(latestA);
    	  aLineChart.data.labels.push(countA);
    	  bLineChart.data.datasets[0].data.push(latestB);
    	  bLineChart.data.labels.push(countB);
    	  avgLineChart.data.datasets[0].data.push(latestAvg);
    	  avgLineChart.data.labels.push(countAvg);
		 aLineChart.update();
		 bLineChart.update();
		 avgLineChart.update();
    }

    var aChart = document.getElementById('aChart').getContext('2d');
    var aLineChart = new Chart(aChart, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'aVal',
                data: [],
                backgroundColor: [
                    'red'
                ],
                fill: false,
                borderColor: 'black'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'aVal Chart'
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'TimeStamp'
                    }
                }]
            }
        }
    });

    var bChart = document.getElementById('bChart').getContext('2d');
    var bLineChart = new Chart(bChart, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'bVal',
                data: [],
                backgroundColor: [
                    'blue'
                ],
                fill: false,
                borderColor: 'black'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'bVal Chart'
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'TimeStamp'
                    }
                }]
            }
        }
    });

    var avgChart = document.getElementById('avgChart').getContext('2d');
    var avgLineChart = new Chart(avgChart, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Average',
                data: [],
                backgroundColor: [
                    'green'
                ],
                fill: false,
                borderColor: 'black'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Chart for Average'
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'TimeStamp'
                    }
                }]
            }
        }
    });
}]);