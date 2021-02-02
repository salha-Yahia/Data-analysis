"use strict";

/**
 * Fichier permettant de dessiner le graphique à bulles.
 */

// Créer les axes du graphique à bulles.
function createAxes(g, xAxis, yAxis, height, width) {
  g.append("g")
	  .attr("class", "axis y")
	  .call(yAxis) 
	  .append("text")
	  .text("Region")
	  .attr("text-anchor", "end")
	  .attr("x",30)
    .attr("y",-10); 
	}

//Créer le graphique à bulles.
function createBubbleChart1(g, data,cancer, x, y, r, color, tip) {
 // Dessiner les cercles du graphique en utilisant les échelles spécifiées.
  var circles = g.selectAll("circle")
                    .data(data)
                    .enter() 
                    .append("g")   
                    .append("circle")
                    .attr("r",function(d) {  
                        return r(d.Sein);
                    })
                    .attr("cx", function(d,i) {   
                        return x(cancer[0])+ 64; 
                    })
                    .attr("cy", function(d) {
                        return y(d.abreviation)+25;
                    })
                    .attr("fill", function(){ return color(cancer[0]);})   // couleur coresspond au type de cancer
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide);  
}

function createBubbleChart2(g, data,cancer, x, y, r, color, tip) {
  // Dessiner les cercles du graphique en utilisant les échelles spécifiées.
  var circles = g.selectAll("circle")
                    .data(data)
                    .enter() 
                    .append("g")   
                    .append("circle")
                    .attr("r",function(d) {  
                        return r(d.Poumon);
                    })
                    .attr("cx", function() {   
                        return x(cancer[1])+ 64; 
                    })
                    .attr("cy", function(d) {
                        return y(d.abreviation)+ 25;
                    })
                    .attr("fill", function(){ return color(cancer[1]);})  
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide);
   
               
}
function createBubbleChart3(g, data,cancer, x, y, r, color, tip) {
 // Dessiner les cercles du graphique en utilisant les échelles spécifiées.
  var circles = g.selectAll("circle")
                    .data(data)
                    .enter() 
                    .append("g")   
                    .append("circle")
                    .attr("r",function(d) {  
                        return r(d.Colorectal);
                    })
                    .attr("cx", function(d,i) {   
                        return x(cancer[2])+ 64; 
                    })
                    .attr("cy", function(d) {
                        return y(d.abreviation)+ 25;
                    })
                    .attr("fill", function(){ return color(cancer[2]);})  
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide);             
}

function createBubbleChart4(g, data,cancer, x, y, r, color, tip) {
  // Dessiner les cercles du graphique en utilisant les échelles spécifiées.
  var circles = g.selectAll("circle")
                    .data(data)
                    .enter() 
                    .append("g")   
                    .append("circle")
                    .attr("r",function(d) {  
                        return r(d.Thyroide);
                    })
                    .attr("cx", function(d,i) {   
                        return x(cancer[3])+ 64; 
                    })
                    .attr("cy", function(d) {
                        return y(d.abreviation)+ 25;
                    })
                    .attr("fill", function(){ return color(cancer[3]);})   
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide);              
}

function createBubbleChart5(g, data,cancer, x, y, r, color, tip) {
 // Dessiner les cercles du graphique en utilisant les échelles spécifiées.
  var circles = g.selectAll("circle")
                    .data(data)
                    .enter() 
                    .append("g")   
                    .append("circle")
                    .attr("r",function(d) {  
                        return r(d.Estomac);
                    })
                    .attr("cx", function(d,i) {   
                        return x(cancer[4])+ 64; 
                    })
                    .attr("cy", function(d) {
                        return y(d.abreviation)+ 25;
                    })
                    .attr("fill", function(){ return color(cancer[4]);})  
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide);            
}

function createBubbleChart6(g, data,cancer, x, y, r, color, tip) {
  var circles = g.selectAll("circle")
                    .data(data)
                    .enter() 
                    .append("g")   
                    .append("circle")
                    .attr("r",function(d) {  
                        return r(d.Foie);
                    })
                    .attr("cx", function(d,i) {   
                        return x(cancer[5])+ 64; 
                    })
                    .attr("cy", function(d) {
                        return y(d.abreviation)+ 25;
                    })
                    .attr("fill", function(){ return color(cancer[5]);})  
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide);
   
               
}