(function(d3, localization) {
  "use strict";

  /********************************************************************
            BAR CHART DES PRINCIPALES CAUSES DE MORTALITE
   *******************************************************************/
var margin = {top: 80, right: 180, bottom: 80, left: 180},
    width = 980 - margin.left - margin.right,
    height = 530 - margin.top - margin.bottom;

var svg = d3.select("#dropdown1")
	.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("./data/CausesDeces.csv", function(error, data) {
    if (error) {
      throw error;
    }
	var elements = Object.keys(data[0])
		.filter(function(d){
			return (d != "Causes");
		});
	var selection = elements[0];

	var y = d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return +d[selection];
			})])
			.range([height, 0]);

	var x = d3.scale.ordinal()
			.domain(data.map(function(d){ return d.Causes;}))
			.rangeBands([0, width]);


	var xAxis = d3.svg.axis()
		.scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
	    .orient("left");


	svg.append("g")
    	.attr("class", "x axis")
    	.attr("transform", "translate(0," + height + ")")
    	.call(xAxis)
    	.selectAll("text")
    	.style("font-size", "12.2px")
      	.style("text-anchor", "end")
      	.attr("dx", "-.8em")
      	.attr("dy", "-.55em")
        .attr("transform", "rotate(-30)" );

	svg.append("text")
	    .attr("transform", "translate(" + width + ",50)")
    	.attr("transform", "translate(750," + height + ")")
	    .attr("dy", "0.5em")
	    .style("text-anchor", "end")
	    .text("Causes de décès");

 	svg.append("g")
    	.attr("class", "y axis")
    	.call(yAxis)
    	.append("text")
        .attr("y", -10)
        .attr("x",-10)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Nombre de décès"); 

	svg.selectAll("rectangle")
		.data(data)
		.enter()
		.append("rect")
		.attr("class","rectangle")
		.attr("width", 50)
		.attr("height", function(d){
			return height - y(+d[selection]);
		})
		.attr("x", function(d, i){
			return (width / data.length) * i +5;
		})
		.attr("y", function(d){
			return y(+d[selection]);
		})
		.append("title")
		.text(function(d){
			return d.Causes + " : " + d[selection] + " décès " ;
		});


	var selector = d3.select("#drop1")
    	.append("select")
    	.attr("id","dropdown1")
    	.on("change", function(d){
        	selection = document.getElementById("dropdown1");

        	y.domain([0, d3.max(data, function(d){
				return +d[selection.value];})]);

        	yAxis.scale(y);

        	d3.selectAll(".rectangle")
           		.transition()
	            .attr("height", function(d){
					return height - y(+d[selection.value]);
				})
				.attr("x", function(d, i){
					return (width / data.length) * i +5;
				})
				.attr("y", function(d){
					return y(+d[selection.value]);
				})
           		.ease("linear")
           		.select("title")
           		.text(function(d){
           			return d.Causes + " : " + d[selection.value] + " décès " ;
           		});
      
           	d3.selectAll("g.y.axis")
           		.transition()
           		.call(yAxis);

         });

    selector.selectAll("option")
      .data(elements)
      .enter().append("option")
      .attr("value", function(d){
        return d;
      })
      .text(function(d){
        return d;
      })
});

})(d3, localization);