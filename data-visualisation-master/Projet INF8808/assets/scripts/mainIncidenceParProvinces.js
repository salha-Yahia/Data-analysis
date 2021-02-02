/**
 * Fichier principal permettant de dessiner le graphique demandé. Ce fichier utilise les autres fichiers
 * que vous devez compléter.
 *
 * /!\ Aucune modification n'est nécessaire dans ce fichier!
 */
(function (d3, localization) {
  "use strict";

  /***** Configuration *****/
  var margin = {
    top: 30,
    right: 100,
    bottom: 50,
    left: 80
  };
  var width = 1000 - margin.left - margin.right;
  var height = 700 - margin.top - margin.bottom;


  /***** Échelles *****/
  var color = d3.scale.category10();
 var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);
 var y = d3.scale.ordinal().rangeRoundBands([0, height], 0.05);
  //var x = d3.scale.linear().range([0, width]);
  //var y = d3.scale.linear().range([height, 0]);
  var r = d3.scale.sqrt().range([5, 10]);
var formatAxis = d3.format("  0");
  var xAxis = d3.svg.axis().scale(x).orient("bottom");
  var yAxis = d3.svg.axis().scale(y).orient("left"); //.tickFormat(localization.getFormattedNumber);

  /***** Création des éléments *****/
  var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right+100)
    .attr("height", height + margin.top + margin.bottom);

  var bubbleChartGroup1 = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "Groups1");
     var bubbleChartGroup2 = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "Groups2");
     var bubbleChartGroup3 = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "Groups3");
 var bubbleChartGroup4 = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "Groups4");
 var bubbleChartGroup5 = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "Groups5");
 var bubbleChartGroup6 = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "Groups6");

  /***** Chargement des données *****/
  //var cancer = ["Sein","PoumonEtBranches","Colorectal","Thyroide","Estomac","Foie"];



  d3.queue()
    .defer(d3.csv, "./data/IncidenceFemme2017.csv")
    .defer(d3.csv, "./data/IncidenceHommes2017.csv")
    .awaitAll(function (error, results) {
      if (error || results.length !== 2) {
        throw error;
      }
      var currentYear = results[1];
      var currentData = results[0];
///
      var cancer = Object.keys(currentData[0])
    .filter(function(d){
      return ((d != "region") &(d != "abreviation") &(d != "TousLesCancers"));
    });
  
console.log(cancer)
///
      var tip1 = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0]);
         var tip2 = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0]);
         var tip3 = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0]);
         var tip4 = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0]);
         var tip5 = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0]);
         var tip6 = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0]);

      /***** Prétraitement des données *****/

      results.forEach(function (data) {
        initializeData(data);
        data.sort(function(a, b) {
          return d3.ascending(a.region, b.region);
        })
      });
      domainX(x,cancer);
      domainY(y, currentData);
      domainColor(color, cancer);
      domainRadius(r, currentData);
      legend(bubbleChartGroup1, color,cancer);
      /***** Création du graphique à bulles *****/

      createAxes(bubbleChartGroup1, xAxis, yAxis, height, width);

      createBubbleChart1(bubbleChartGroup1, currentData,cancer, x, y, r, color, tip1);
      createBubbleChart2(bubbleChartGroup2, currentData,cancer, x, y, r, color, tip2);
      createBubbleChart3(bubbleChartGroup3, currentData,cancer, x, y, r, color, tip3);
      createBubbleChart4(bubbleChartGroup4, currentData,cancer, x, y, r, color, tip4);
      createBubbleChart5(bubbleChartGroup5, currentData,cancer, x, y, r, color, tip5);
      createBubbleChart6(bubbleChartGroup6, currentData,cancer, x, y, r, color, tip6);
     




      /***** Transition entre les données de sexe: homme et femme *****/
      var toggleButtons = d3.selectAll(".toggle-buttons > button");
      toggleButtons.on("click", function(d, i) {
          currentYear = d3.select(this).text();
          currentData = results[i];
          toggleButtons.classed("active", function() {
            return currentYear === d3.select(this).text();
          });

          domainRadius(r, currentData);
          transition1(bubbleChartGroup1,currentData,cancer, x, y, r);
           transition2(bubbleChartGroup2,currentData,cancer, x, y, r);
           transition3(bubbleChartGroup3,currentData,cancer, x, y, r);
           transition4(bubbleChartGroup4,currentData,cancer, x, y, r);
           transition5(bubbleChartGroup5,currentData,cancer, x, y, r);
           transition6(bubbleChartGroup6,currentData,cancer, x, y, r);

        });

     
      /***** Création de l'infobulle *****/
      tip1.html(function(d) {
        return getToolTipText1.call(this, d, localization.getFormattedNumber)
      });
      bubbleChartGroup1.call(tip1);

      tip2.html(function(d) {
        return getToolTipText2.call(this, d, localization.getFormattedNumber)
      });
      bubbleChartGroup2.call(tip2);
      tip3.html(function(d) {
        return getToolTipText3.call(this, d, localization.getFormattedNumber)
      });
      bubbleChartGroup3.call(tip3);
      tip4.html(function(d) {
        return getToolTipText4.call(this, d, localization.getFormattedNumber)
      });
      bubbleChartGroup4.call(tip4);
      tip5.html(function(d) {
        return getToolTipText5.call(this, d, localization.getFormattedNumber)
      });
      bubbleChartGroup5.call(tip5);
      tip6.html(function(d) {
        return getToolTipText6.call(this, d, localization.getFormattedNumber)
      });
      bubbleChartGroup6.call(tip6);


    });

     

})(d3, localization);
