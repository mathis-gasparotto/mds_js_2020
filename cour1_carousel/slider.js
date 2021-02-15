function boutons(n) { //délare ce que fait la fonction boutons() pour n
    affichage(diaporama += n); //la fonction boutons(n) exécute la foncrion affichage avec diaporama += n donc diaporama = diaporama + n
}

function actifIndic(n) { //déclare ce que fait la fonction actifIndic() pour n
    affichage(diaporama = n);// la focntion actifIndic(n) exécute la fonction affichage avec diaporama = n
}

function affichage(n) { //déclare ce que fait la focntion affichage()
    let i; //déclare la variable i
    let diapoImg = document.getElementsByClassName("diapo"); // je selectionne un element du DOM par la class "diapo" et je le mets dans la variable diapoImg
    let indic = document.getElementsByClassName("demo"); // je selectionne un element du DOM par la class "demo" et je le mets dans la variable indic
    if (n > diapoImg.length) {diaporama = 1} //si n est supérieur au nombre d'image du diaporama, alors mettre la variable diporama à 1 (si j'arrive tout à droite du diaporama, je reviens à gauche)
    if (n < 1) {diaporama = diapoImg.length} //si n est inférieur à 1, alors mettre le nombre d'image du diporama comme valeur de la variable diaporama (si j'arrive tout à gauche du diaporama, je reviens à droite)
    for (i = 0; i < diapoImg.length; i++) { //pour i=0 et avec une incrémentation de 1 et tant que i est inférieur au nombre d'image du diporama, faire ce qu'il y a entre accolades
        diapoImg[i].style.opacity = "0"; //mettre l'opacité à 0 pour l'image i (pour toutes les images du diaporama)
    }
    for (i = 0; i < indic.length; i++) { //pour i=0 et avec une invrémenttation de 1 et tant que i est inférieur à la longueur de l'indicateur, faire ce qu'il y a entre accolades
        indic[i].className = indic[i].className.replace(" numeros", ""); //supprime " numeros" dans la classe de l'indicateur i (pour tous les indicateurs)
    }
    diapoImg[diaporama-1].style.opacity = "1"; //met l'opacité à 1 pour l'image d'index diaporama-1
    indic[diaporama-1].className += " numeros"; //ajoute " numeros" à la classe de l'indicacteur d'index diaporama-1
}

var diaporama = 1; // déclare la variable diaporama lui donne comme valeur 1
affichage(diaporama); //exécute la fonction affichage pour la variable diaporama