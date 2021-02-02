(function(d3, localization) {
  "use strict";
  /***************************************************************************
            BAR CHART DU TAUX D'INCIDENCE EN 2017 SELON LES CATEGORIES D'AGE
   ***************************************************************************/

var margin = {top: 80, right: 180, bottom: 80, left: 180},
    width = 980 - margin.left - margin.right,
    height = 530 - margin.top - margin.bottom;

var svg = d3.select("#dropdown")
	.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("./data/nvCasParAge.csv", function(error, data) {
    if (error) {
      throw error;
    }
	// filter year
	//var data = data.filter(function(d){return d.Year == '2012';});
	// Get every column value
	var elements = Object.keys(data[0])
		.filter(function(d){
			return (d != "Age");
		});
	var selection = elements[0];

	var y = d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return +d[selection];
			})])
			.range([height, 0]);

	var x = d3.scale.ordinal()
			.domain(data.map(function(d){ return d.Age;}))
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
    	.style("font-size", "15px")
      	.style("text-anchor", "end")
      	.attr("dx", "-.8em")
      	.attr("dy", "-.55em")
        .attr("transform", "rotate(-40)" );

	svg.append("text")
	    .attr("transform", "translate(" + width + ",60)")
    	.attr("transform", "translate(750," + height + ")")
	    .attr("dy", "0.71em")
	    .style("text-anchor", "end")
	    .style("font-size", "15px")
	    .text("Catégorie d'âge");

 	svg.append("g")
    	.attr("class", "y axis")
    	.call(yAxis)
    	.append("text")
        .attr("y",-18)
        .attr("x",-10)
        .attr("dy", ".9em")
        .style("text-anchor", "end")
        .text("Nouveaux cas"); 

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
			return (width / data.length) * i +5 ;
		})
		.attr("y", function(d){
			return y(+d[selection]);
		})
		.append("title")
		.text(function(d){
			return d.Age + "  ans : " + d[selection]+ " cas " ;
		});


	var selector = d3.select("#drop")
    	.append("select")
    	.attr("id","dropdown")
    	.on("change", function(d){
        	selection = document.getElementById("dropdown");

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
           			if(d.Age=="80 ans et plus")
           				{return d.Age + ": " + d[selection.value] + " cas" ;}
           			else
           			return d.Age + " ans  : " + d[selection.value] + " cas" ;
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