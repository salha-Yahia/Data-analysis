"use strict";

/**
 * Fichier permettant de traiter les données provenant des fichiers CSV.
 */
function initializeData(data) {
  data.forEach(function(d){
  	d.Foie=parseFloat(d.Foie);
  	d.Estomac=parseFloat(d.Estomac);
  	d.PoumonEtBranches=parseFloat(d.PoumonEtBranches);
    d.Sein=parseFloat(d.Sein);
    d.Thyroide=parseFloat(d.Thyroide);
    d.Colorectal=parseFloat(d.Colorectal);
    d.TousLesCancers=parseFloat(d.TousLesCancers);
  });
}

//Précise le domaine de l'échelle utilisée pour l'axe X du nuage de points.
function domainX(x,data) {
x.domain(data);
}

//Précise le domaine de l'échelle utilisée pour l'axe Y du nuage de points.
function domainY(y,data) {
var reg = [];
data.forEach(function(d){ 
    reg.push(d.abreviation);
  });
y.domain(reg);
}

//Précise le domaine de l'échelle de couleurs qui est utilisée pour distinguer chaque type de cancer
function domainColor(color, data) {
color.domain(data);
}


//Précise le domaine de l'échelle du rayon des cercles qui est utilisée pour représenter le nombre de nouveaux cas
function domainRadius(r, data) {
  var a=d3.min(data, function(d) {return d.Foie;});
  var b= d3.max(data, function(d) {return d.Foie;});
  r.domain([a,b]);
}
function legend(svg,color,cancer) {
var legend = svg.append("g")
          .attr("class","legend")
          .attr("transform","translate(840,40)")
          .style("font-size","12px");
              
var rect = legend.selectAll("rect")
        .data(cancer)
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', function(d, i){ return i *  20;})
        .attr('width', 10)
        .attr('height', 10)
        .attr("stroke","black")
        .attr('fill', function(d) { 
          return color(d);});

   legend.selectAll("text")
        .data(cancer)
        .enter()
        .append('text')
        .attr('x',  40)
        .attr('y', function(d, i){ return (i *  20) + 9;})
        .text(function(d){ return d; });
}
