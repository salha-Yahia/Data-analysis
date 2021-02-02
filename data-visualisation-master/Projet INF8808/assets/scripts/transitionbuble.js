"use strict";

/**
* Fichier permettant de gérer la transition entre les données.
*/

//Réalise une transition entre les données actuellement utilisées et les nouvelles qui doivent être utilisées.
function transition1(g, data,cancer, x, y, r) {
	g.selectAll("circle")
	 .data(data)
	 .transition()
	 .duration(1000)
	 .attr("cx", function(d,i) {   
                        return x(cancer[0])+ 67; 
                    })
	 .attr("cy", function(d){ return y(d.abreviation)+ 25;})
	 .attr("r", function(d){ return r(d.Sein); });                  
}

function transition2(g, data,cancer, x, y, r) {
	g.selectAll("circle")
	 .data(data)
	 .transition()
	 .duration(1000)
	 .attr("cx", function(d,i) {   
                        return x(cancer[1])+ 67; 
                    })
	 .attr("cy", function(d){ return y(d.abreviation)+ 25;})
	 .attr("r", function(d){ return r(d.Poumon); });                 
}

function transition3(g, data,cancer, x, y, r) {
	g.selectAll("circle")
	 .data(data)
	 .transition()
	 .duration(1000)
	 .attr("cx", function(d,i) {   
                        return x(cancer[2])+ 67; 
                    })
	 .attr("cy", function(d){ return y(d.abreviation)+ 25;})
	 .attr("r", function(d){ return r(d.Colorectal); });                   
}

function transition4(g, data,cancer, x, y, r) {
	g.selectAll("circle")
	 .data(data)
	 .transition()
	 .duration(1000)
	 .attr("cx", function(d,i) {   
                        return x(cancer[3])+ 67; 
                    })
	 .attr("cy", function(d){ return y(d.abreviation)+ 25;})
	 .attr("r", function(d){ return r(d.Thyroide); });                  
}

function transition5(g, data,cancer, x, y, r) {
	g.selectAll("circle")
	 .data(data)
	 .transition()
	 .duration(1000)
	 .attr("cx", function(d,i) {   
                        return x(cancer[4])+ 67; 
                    })
	 .attr("cy", function(d){ return y(d.abreviation)+ 25;})
	 .attr("r", function(d){ return r(d.Estomac); });                 
}

function transition6(g, data,cancer, x, y, r) {
	g.selectAll("circle")
	 .data(data)
	 .transition()
	 .duration(1000)
	 .attr("cx", function(d,i) {   
                        return x(cancer[5])+ 67; 
                    })
	 .attr("cy", function(d){ return y(d.abreviation)+ 25;})
	 .attr("r", function(d){ return r(d.Foie); });                  
}
