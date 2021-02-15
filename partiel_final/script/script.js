var verifStart = false; //on initialise le bouléen verifStart à false par défaut
var verifTimer = true; //on initialise le bouléen verifTimer à false par défaut

//on affiche que le chono et le bouton start
$("#stop").hide();
$("#reset").hide();
$("#img").hide();
$("#time").show();
$("#start").show();

var intervalId; //on initialise la variable intervalId

choseTime = { //on initalise le temps du timer choisi
    hours : 0,
    minutes : 5,
    seconds : 0
}





function startTimer(duration, display) { //on configure la fonction startTimer() avec les paramètres duration pour la durée en secondes et display pour l'affichage
    var timer = duration, hours, minutes, seconds; //on initialise la variable timer avec les valeur de duration, hours, minutes, secondes

    function bip () {
        --timer; // on fait reculer le timer de 1 à chaque fois

        hours = parseInt(timer / 3600, 10); //on donne pour valeur à hours, l'entier de timer / 3600 (pour avoir les heures) et avec une base décimal cad 10
        minutes = parseInt((timer / 60) % 60, 10); //on donne pour valeur à minutes, l'entier de timer / 60 (pour avoir les minutes) modulos 60 (pour le bloquer à 60 minutes) et avec une base décimal cad 10
        seconds = parseInt(timer % 60, 10); //on donne pour valeur à seconds, l'entier de timer modulos 60 (pour le bloquer à 60 secondes) et avec une base décimal cad 10

        // si le nombre et inéfieur à 10, alors on lui met un 0 devant
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = hours + " : " + minutes + " : " + seconds; //on affiche le chrono

        verifStart = true; //on met la valeur true au bouléen verifStart pour dire que le timer est en route

        if (timer < 0) { //si le timer est fini, ..
            verifTimer = false; //on met la valeur false au bouléen verifTimer pour dire que le timer est fini
    
            //on affiche que l'image et le bouton reset
            $("#reset").show();
            $("#img").show();
            $("#time").hide();
            $("#start").hide();
            $("#stop").hide();
        }
    
        if (verifTimer == false) { //si le timer est fini, ..
            clearInterval(intervalId); //on arrête l'avancement du timer
        }

        console.log(verifTimer);
    }

    intervalId = setInterval(bip, 1000); //la fonction s'exécute toutes les 1000ms c'est-à-dire toutes les secondes et on l'associe à la variable intevalId
}

function launch() {
    var time = choseTime.hours * 3600 + choseTime.minutes * 60 + choseTime.seconds; //on définie les valeurs du chrono que l'on veux à la variable time
    var display = document.querySelector('#time'); //on associe le chrono à la variable display pour pouvoir afficher son avancé
    
    verifTimer = true; //on met la valeur false au bouléen verifTimer pour dire que le timer se remet en route

    //on affiche que le chrono et le bouton stop
    $("#reset").hide();
    $("#img").hide();
    $("#time").show();
    $("#start").hide();
    $("#stop").show();

    if (verifStart == false) { //si mon chrono n'est pas déjà lancé
        startTimer(time, display); //alors on le lance
    }
}

function stop() {
    verifStart = false; //on met la valeur false au bouléen verifStart pour dire que le timer est arrêté
    clearInterval(intervalId); //on arrête l'avancement du timer
    
    //on affiche que le timer et le bouton start
    $("#reset").hide();
    $("#img").hide();
    $("#time").show();
    $("#start").show();
    $("#stop").hide();

    var duration = choseTime.hours * 3600 + choseTime.minutes * 60 + choseTime.seconds; //on définie les valeurs du chrono que l'on veux à la variable duration
    var display = document.querySelector('#time'); //on associe le chrono à la variable display pour pouvoir afficher son avancé
    var timer = duration, hours, minutes, seconds; //on initialise la variable timer avec les valeur de duration, hours, minutes, secondes

    hours = parseInt(timer / 3600, 10); //on donne pour valeur à hours, l'entier de timer / 3600 (pour avoir les heures) et avec une base décimal cad 10
    minutes = parseInt((timer / 60) % 60, 10); //on donne pour valeur à minutes, l'entier de timer / 60 (pour avoir les minutes) modulos 60 (pour le bloquer à 60 minutes) et avec une base décimal cad 10
    seconds = parseInt(timer % 60, 10); //on donne pour valeur à seconds, l'entier de timer modulos 60 (pour le bloquer à 60 secondes) et avec une base décimal cad 10

    // si le nombre et inéfieur à 10, alors on lui met un 0 devant
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = hours + " : " + minutes + " : " + seconds; //on affiche le chrono
}

function reset() {
    stop(); //on reset le timer, comme fait la fonction stop
}





document.addEventListener('DOMContentLoaded', function () {
    
    //on affiche le temps du timer choisi
    var duration = choseTime.hours * 3600 + choseTime.minutes * 60 + choseTime.seconds; //on définie les valeurs du chrono que l'on veux à la variable duration
    var display = document.querySelector('#time'); //on associe le chrono à la variable display pour pouvoir afficher son avancé
    var timer = duration, hours, minutes, seconds; //on initialise la variable timer avec les valeur de duration, hours, minutes, secondes

    hours = parseInt(timer / 3600, 10); //on donne pour valeur à hours, l'entier de timer / 3600 (pour avoir les heures) et avec une base décimal cad 10
    minutes = parseInt((timer / 60) % 60, 10); //on donne pour valeur à minutes, l'entier de timer / 60 (pour avoir les minutes) modulos 60 (pour le bloquer à 60 minutes) et avec une base décimal cad 10
    seconds = parseInt(timer % 60, 10); //on donne pour valeur à seconds, l'entier de timer modulos 60 (pour le bloquer à 60 secondes) et avec une base décimal cad 10

    // si le nombre et inéfieur à 10, alors on lui met un 0 devant
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = hours + " : " + minutes + " : " + seconds; //on affiche le chrono



    document.querySelector('#start').addEventListener('click', launch); //on récupère l'élément bouton avec l'id start et on lui met l'évenement click qui va lancer la fonction launch() et donc lancer le chrono

    document.querySelector('#stop').addEventListener('click', stop); //on récupère l'élément bouton avec l'id start et on lui met l'évenement click qui va lancer la fonction launch() et donc lancer le chrono

    document.querySelector('#reset').addEventListener('click', reset); //on récupère l'élément bouton avec l'id start et on lui met l'évenement click qui va lancer la fonction launch() et donc lancer le chrono
});