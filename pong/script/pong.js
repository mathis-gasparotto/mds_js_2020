//décalarations
var canvas; //on déclare la variable canvas
var game; //on déclare la variable game
const PLAYER_HEIGHT = 100; //on initialise la constante PLAYER_HEIGHT à 100px (hauteur de la raquette)
const PLAYER_WIDTH = 5; //on initialise la constante PLAYER_WIDTH à 5px (largeur de la raquette)
var anim; //on déclare la variable anim




//création des fonctions
function draw() { //on définie la fonction draw()
    var context = canvas.getContext('2d'); //la variable context prend pour valeur les données 2d de la variable canvas
    // dessin de la base (rectangle noir)
    context.fillStyle = 'black'; //met le rectangle en noir
    context.fillRect(0, 0, canvas.width, canvas.height); //créer le rectangle noir avec les même dimensions que le canvas (en reprenant sa hauteur et sa largeur et sans rognage)
    // dessin de la ligne du millieu
    context.strokeStyle = 'white'; //paramètre le trait en blanc
    context.beginPath(); //commencer le paramétrage du trait
    context.moveTo(canvas.width / 2, 0); //paramètre le trait blanc au milieu du canvas
    context.lineTo(canvas.width / 2, canvas.height); //paramètre le trait avec comme position le milieu horizontal du canvas et de la même hauteur que le canvas
    context.stroke(); //créer le trait
    // dessin des raquettes
    context.fillStyle = 'white'; //met la raquette en blanc
    context.fillRect(0, game.player.y, PLAYER_WIDTH, PLAYER_HEIGHT); //créer la raquette du joueur avec les bonnes dimensions est la bonne position
    context.fillRect(canvas.width - PLAYER_WIDTH, game.computer.y, PLAYER_WIDTH, PLAYER_HEIGHT); //créer la raquetter du BOT avec les bonnes dimensions est la bonne position
    // dessin de la balle
    context.beginPath(); //commencer le paramétrage de la balle
    context.fillStyle = 'white'; //paramètre la balle en blanc
    context.arc(game.ball.x, game.ball.y, game.ball.r, 0, Math.PI * 2, false); //paramètre la position et la forme de la balle
    context.fill(); //créer la balle
}

function play() { //on définie la fonction play()
    draw(); //on redessine pour que les déplacements soit visibles
    computerMove(); //on exécute les mouvements du bot
    ballMove(); //on exécute les mouvements de la balle
    anim = requestAnimationFrame(play); //on initialise la vrarible anim avec requestAnimationFrame(play) et on dit au navigateur qu'il y a des animations
}

function getRandomIntInclusive(min, max) { //on définie la fonction getRandomIntInclusive(min, max) pour générer un nombre aléatoire
    min = Math.ceil(min); //on définie la variable min comme l'intervalle inférieur
    max = Math.floor(max); //on définie la variable max comme l'intervalle supérieur
    return Math.floor(Math.random() * (max - min +1)) + min; // on retourne un nombre entier aléatoire dans cet intervalle
}

function collide(player) { //on définie la fonction collide(player) pour les collisions avec les joueurs
    if (game.ball.y < player.y || game.ball.y > player.y + PLAYER_HEIGHT) { //si le joueur ne touche pas la balle
        //on remet toute les positions à 0 pour recommencer une manche
        game.ball.x = canvas.width / 2;  //---\
        game.ball.y = canvas.height / 2; //---/  } on reset la position de la balle
        game.player.y = canvas.height / 2 - PLAYER_HEIGHT / 2; //on reset la position de la raquette du joueur
        game.computer.y = canvas.height / 2 - PLAYER_HEIGHT / 2; //on reset la position de la raquette du bot
        game.ball.speed.y = getRandomIntInclusive(-5, 5); //on donne une vitesse verticale aléatoire entre -5 et 5 à la balle 
        console.log(getRandomIntInclusive(-5, 5));

        // Mise à jour des scores
        if (player == game.player) { //et que si en même temps la balle est du coté du joueur, ..
            game.computer.score++; //.. alors game.computer.score = game.computer.score + 1 (on ajoute 1 au score du bot)
            document.querySelector('#computer-score').textContent = game.computer.score; //et on avec ce score à l'élement avec l'id computer-score dans l'html
            game.ball.speed.x = -2; //on reset la vitesse de la balle pour que ça soit le joueur qui commence
        } else { //sinon si en même temps la balle est du coté du bot, ..
            game.player.score++; //.. alors game.player.score = game.player.score + 1 (on ajoute 1 au score du joueur)
            document.querySelector('#player-score').textContent = game.player.score; //et on avec ce score à l'élement avec l'id player-score dans l'html
            game.ball.speed.x = 2; //on reset la vitesse de la balle pour que ça soit le bot qui commence
        }
    } else { //sinon, ..
        game.ball.speed.x *= -1.2; //.. on fait partir la balle dans l'autre sens et on la fait accélérer
        changeDirection(player.y); //et on rajoute une trajectoire aléatoire
    }
}

function ballMove() { //on définie la fonction ballMove()
    //rebonds en haut et en bas
    if (game.ball.y > canvas.height || game.ball.y < 0) { //si la balle touche le haut ou le bas, ..
        game.ball.speed.y *= -1; //.. alors on fait game.ball.speed.y = game.ball.speed.y * (-1)    c'est-à-dire qu'on fait partir le balle dans le sens opposé
    }
    game.ball.x += game.ball.speed.x; //game.ball.x = game.ball.x + game.ball.speed.x (pour les déplacements horizontaux)
    game.ball.y += game.ball.speed.y; //game.ball.y = game.ball.y + game.ball.speed.y (pour les déplacements verticaux)
    //rebonds avec les joueurs
    if (game.ball.x > canvas.width - PLAYER_WIDTH) { //si la balle est du côté du bot, ..
        collide(game.computer); //.. alors on exécute le rebond pour le bot
    } else if (game.ball.x < PLAYER_WIDTH) { //si la balle est du côté sur joueur, ..
        collide(game.player); //.. alors on exécute le rebond pour le joueur
    }
}

function playerMove(event) { //on définie la fonction playerMove(event)
    //on récupère la position de la souris dans le canvas
    var canvasLocation = canvas.getBoundingClientRect(); //on initialise la variable canvasLocation qui récupère la position du canvas
    var mouseLocation = event.clientY - canvasLocation.y; //on initialise la variable mouseLocation qui récupère la position de la souris dans le canvas
    game.player.y = mouseLocation - PLAYER_HEIGHT / 2; //on fait suivre le centre de la raquette avec la souris
    //collisions
    if (mouseLocation < PLAYER_HEIGHT / 2) { //si la souris fait monter le centre de la raquette tout en haut du canvas (et qu'il y ai la moitier de la raquette en dehors du canvas), ..
        game.player.y = 0; //.. alors on fixe la raquette au bors du canvas
    } else if (mouseLocation > canvas.height - PLAYER_HEIGHT / 2) { //si la souris fait descendre le centre de la raquette tout en bas du canvas (et qu'il y ai la moitier de la raquette en dehors du canvas), ..
        game.player.y = canvas.height - PLAYER_HEIGHT; //.. alors on fixe la raquette au bors du canvas
    } else { //sinon (si il n'y a pas besoin de sollisions), ..
        game.player.y = mouseLocation - PLAYER_HEIGHT / 2; //.. on refait des déplacements normaux
    }
}

function computerMove() { //on définie la fonction computerMove()
    game.computer.y += game.ball.speed.y * 0.74; //game.computer.y = game.computer.y + game.ball.speed.y * 0.85 (pour que le bot suive les déplacement verticaux de la balle mais en un peu plus lentement pour laisser une chance au joueur de gagner)
}

function changeDirection(playerPosition) { //on définie la fonction changeDirection(playerPosition)
    var impact = game.ball.y - playerPosition - PLAYER_HEIGHT / 2; //on initialise la variable impact à l'écart entre le centre de la raquette et la balle
    var ratio = 100 / (PLAYER_HEIGHT / 2); //on initialise la variable ratio au ratio de la taille de la raquette sur une échelle de 100
    game.ball.speed.y = Math.round(impact * ratio / 10); //arrondie à l'entier le plus proche de impact * ratio / 10 pour en faire la vitesse verticale de la balle pour que plus la balle est loin du centre de la raquette quand elle la touche, plus elle prend de la vitesse (vitesse verticale à 0 quand la balle touche le centre et 10 quand est est le plus écartée du centre que possible)
}

function verifPlay() { //on définie la fonction verifPlay()
    if (game.ball.speed.x == 0) { //si la balle est à l'arrêt, ..
        game.ball.speed.x = -2; //.. alors on met de la vitesse horizontale à la balle (-2 pour que ça soit le joueur qui commence)
        game.ball.speed.y = 2; //et on met de la vitesse verticale à la balle
        play(); //.. on exécute la fonction play() et donc on lance la partie
        canvas.addEventListener('mousemove', playerMove); //appelle la fonction playerMove pour les movement du joueur
    }
}

function stop () { //on définie la fonction stop()
    cancelAnimationFrame(anim); //on dit au navigateur qu'il n'y a plus d'animations
    
    game.ball.speed.x = 0; //on arrête la balle
    game.ball.speed.y = 0; //on arrête la balle

    game.ball.x = canvas.width / 2;  //---\
    game.ball.y = canvas.height / 2; //---/  } on reset la position de la balle
    game.player.y = canvas.height / 2 - PLAYER_HEIGHT / 2; //on reset la position de la raquette du joueur
    game.computer.y = canvas.height / 2 - PLAYER_HEIGHT / 2; //on reset la position de la raquette du bot
    
    game.computer.score = 0; //.. alors game.computer.score = game.computer.score + 1 (on ajoute 1 au score du bot)
    game.player.score = 0; //.. alors game.player.score = game.player.score + 1 (on ajoute 1 au score du joueur)

    document.querySelector('#computer-score').textContent = game.computer.score; //et on avec ce score à l'élement avec l'id computer-score dans l'html
    document.querySelector('#player-score').textContent = game.player.score; //et on avec ce score à l'élement avec l'id player-score dans l'html

    draw(); //on redessine tout avec les bonnes positions
}




//éxécution le tout
document.addEventListener('DOMContentLoaded', function () { //lorque les dom sont chargés,...
    canvas = document.getElementById('canvas'); //... on cible les éléments avec l'id canvas pour les lier à la variable canvas
    game = { //on commence l'initialisation de la variable game
        player: { //on commence l'initialisation de la variable game.player
            y: canvas.height / 2 - PLAYER_HEIGHT / 2, //on désigne le haut de la raquette du joueur (pour le décalage dans le fonction draw())
            score: 0 //on initialise le score du joueur à 0
        },
        computer: { //on commence l'initialisation de la variable game.computeur
            y: canvas.height / 2 - PLAYER_HEIGHT / 2, //on désigne le haut de la raquette du bot (pour le décalage dans le fonction draw())
            score: 0 //on initialise le score du bot à 0
        },
        ball: { //on commence l'initialisation de la variable game.ball
            x: canvas.width / 2,  //------\
            y: canvas.height / 2, //------/ } on met la balle au centre du canvas
            r: 5, //on lui met un rayon de 5px
            speed: { //on commence l'initialisation de la variable game.ball.speed
                x: 0, //vitesse des déplacements horizontaux de la balle (pour que ça soit le joueur qui commence)
                y: 0 //vitesse des déplacements verticaux de la balle
            }
        }
    }
    draw(); //on exécute la focntion draw()
    document.querySelector('#start-game').addEventListener('click', verifPlay); //on récupère l'élément bouton avec l'id start-game et on lui met l'évenement click qui va lancer la fonction verifPlay() et donc lancer la partie si elle n'est pas déjà lancée
    document.querySelector('#stop-game').addEventListener('click', stop); //on récupère l'élément bouton avec l'id stop-game et on lui met l'évenement click qui va lancer la fonction stop() et donc qui va arrêter la partie
});