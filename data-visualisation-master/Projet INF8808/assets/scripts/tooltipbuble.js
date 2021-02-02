"use strict";

/**
 * Fichier permettant de définir le texte à afficher dans l'infobulle.
 */

//Obtenir le texte associé à l'infobulle.
function getToolTipText1(d, formatNumber) {
  
     return "Type de cancer: cancer du Sein "+"<br>"
     +"Nombre de nouveaux cas: <b>" + formatNumber(d.Sein) + "</b><br>"
     +"Province: <b>" + d.region + "</b><br>";
 }

function getToolTipText2(d, formatNumber) {
 
     return "Type de cancer: cancer du Poumon  "+"<br>"
     +"Nombre de nouveaux cas: <b>" + formatNumber(d.Poumon) + "</b><br>"
     +"Province: <b>" + d.region + "</b><br>";
    

}
function getToolTipText3(d, formatNumber) {
    return "Type de cancer: cancer de Colorectal "+"<br>"
     +"Nombre de nouveaux cas: <b>" + formatNumber(d.Colorectal) + "</b><br>"
     +"Province: <b>" + d.region + "</b><br>";
    

}
function getToolTipText4(d, formatNumber) {
     return "Type de cancer: cancer de Thyroïde "+"<br>"
     +"Nombre de nouveaux cas: <b>" + formatNumber(d.Thyroide) + "</b><br>"
     +"Province: <b>" + d.region + "</b><br>";
    

}
function getToolTipText5(d, formatNumber) {
     return "Type de cancer: cancer d'Estomac "+"<br>"
     +"Nombre de nouveaux cas: <b>" + formatNumber(d.Estomac) + "</b><br>"
     +"Province: <b>" + d.region + "</b><br>";
    

}
function getToolTipText6(d, formatNumber) {
     return "Type de cancer: cancer de Foie "+"<br>"
     +"Nombre de nouveaux cas: <b>" + formatNumber(d.Foie) + "</b><br>"
     +"Province: <b>" + d.region + "</b><br>";
    

}