(function (d3, localization) {

"use strict";

var itemSize = 25,
      cellSize = itemSize - 1,
      margin = {top: 120, right: 20, bottom: 0, left: 320};
     
  var width = 1200 - margin.right - margin.left,
      height = 500 - margin.top - margin.bottom,  
      gridSize = Math.floor(width / 24),
          legendElementWidth = gridSize*2;

  var colors = ["#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]; 


  d3.queue()
    .defer(d3.csv, "./data/ASMRF.csv")
    .defer(d3.csv, "./data/ASMRH.csv")
    .awaitAll(function (error, response) {
      if (error || response.length !== 2) {
        throw error;
      }
      var currentYear = response[1];
      var dataa = response[0];

    var data = dataa.map(function( item ) {
        var newItem = {};
        newItem.area = item.region;
        newItem.year = item.annee;
        newItem.value = item.ASMR;

        return newItem;
    })

    var x_elements = d3.set(data.map(function( item ) { return item.year; } )).values(),
        y_elements = d3.set(data.map(function( item ) { return item.area; } )).values();

    var xScale = d3.scale.ordinal()
        .domain(x_elements)
        .rangeBands([0, x_elements.length * itemSize]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickFormat(function (d) {
            return d;
        })
        .orient("top");

    var yScale = d3.scale.ordinal()
        .domain(y_elements)
        .rangeBands([0, y_elements.length * itemSize]);

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");
  
var colorScale = d3.scale.quantile()
              .domain([140,400])
              .range(colors);

//var svg = d3.select("#chart").append("svg")
    var svg = d3.select('.heatmap')
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var cells = svg.selectAll('rect')
        .data(data)
        .enter().append('g').append('rect')
        .attr("class", "bordered")
        .attr('width', cellSize)
        .attr('height', cellSize)
        .attr('y', function(d) { return yScale(d.area); })
        .attr('x', function(d) { return xScale(d.year); })
        .attr('fill', function(d) { return colorScale(d.value); });

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .text("Province")
        .attr("text-anchor", "start")
         .attr("x",-10)
         .attr("y",270)
        //.attr("transform", "rotate(-90)")
        .selectAll('text')
        .attr('font-weight', 'normal');

    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .selectAll('text')
        .attr('font-weight', 'normal')
        .style("text-anchor", "start")
        .attr("dx", ".8em")
        .attr("dy", ".5em")
        .attr("transform", function (d) {
            return "rotate(-65)";  
        });


        svg.append("g")
        .attr("class", "x axis")
        .append("text")
        .text("année")
        .attr("text-anchor", "end") 
        .attr("y", 0)
        .attr("x", 800);
        


         cells.append("title");
         cells.select("title").text(function(d) { return d.value; });

           var legend = svg.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), function(d) { return d; })
              .enter().append("g")
              .attr("class", "legend");

         legend.append("rect")
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", "300")
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", function(d, i) { return colors[i]; });

          legend.append("text")
            .attr("class", "mono")
            .text(function(d) { return "≥ " + Math.round(d); })
            .attr("x", function(d, i) { return legendElementWidth * i+20; })
            .attr("y", 300 + gridSize);

              var toggleButtons = d3.selectAll(".toggle-buttons > button");
      toggleButtons.on("click", function(d, i) {
          currentYear = d3.select(this).text();
          dataa = response[i];
          toggleButtons.classed("active", function() {
            return currentYear === d3.select(this).text();
          });

var data = dataa.map(function( item ) {
        var newItem = {};
        newItem.area = item.region;
        newItem.year = item.annee;
        newItem.value = item.ASMR;

        return newItem;
    })
     cells= svg.selectAll('rect')
        .data(data)
        .transition()
        .duration(1000)
        .attr('y', function(d) { return yScale(d.area); })
        .attr('x', function(d) { return xScale(d.year); })
        .attr('fill', function(d) { return colorScale(d.value); })
         .append("title")
         .text(function(d) { return d.value; });


        });

        
    });

})(d3, localization);