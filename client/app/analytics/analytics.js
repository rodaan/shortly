angular.module('shortly.analytics', [])

.controller('AnalyticsController', function ($scope, Links) {
  $scope.data = {};

  $scope.getAll = function () {
    Links.getAll()
      .then(function(data) {
        console.log('This is the data from getAll', data);
        $scope.data.links = data;

        var siteData = data.map( function(siteObject) { 
          return [siteObject.url, siteObject.visits];
        });

        var visitData = siteData.map(function(siteInfo) {
          return siteInfo[1];
        });

        console.log('sitedata is:', visitData);

        var data = visitData;

        var width = 420;
        var barHeight = 20;

        var x = d3.scale.linear()
            .domain([0, d3.max(data)])
            .range([0, width]);

        var chart = d3.select(".chart")
            .attr("width", width)
            .attr("height", barHeight * data.length);

        var bar = chart.selectAll("g")
            .data(data)
          .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

        bar.append("rect")
            .attr("width", x)
            .attr("height", barHeight - 1);

        bar.append("text")
            .attr("x", function(d) { return x(d) - 3; })
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .text(function(d) { return d; });


      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.getAll();
  
});