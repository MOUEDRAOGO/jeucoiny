/**** Gestion de la compatibilité */
if (!window.document.getElementsByClassName) {
    // Si la méthode getElementsByClassName n'existe pas sur le navigateur
    window.document.getElementsByClassName = function (nomDeClasse) {
        // Ma propre implémentation de la méthode getElementsByClassName
    }
}


/****  fin Gestion de la compatibilité */

window.addEventListener('DOMContentLoaded', function () {

    var socket = io();
    var setIntervalCoiny = null;

    socket.on('wait', function () {
        console.log('wait message');
    });

    socket.on('startGame', function () {
        
        console.log('startGame message');
        var setIntervalCountDown = null;
        var countDown = document.getElementById('compteARebours');
        var countDownCounter = 3;
        countDown.innerHTML = countDownCounter;
        var countDownFunc = function(){
            if(countDownCounter > 0) { // definit le nbre de pieces a creer
                countDownCounter--;
                countDown.innerHTML = countDownCounter;
            } else {
                clearInterval(setIntervalCountDown);
                createCoins();
            }
        };
        setIntervalCountDown = setInterval(countDownFunc, 1000);

        /**** on recupere les éléments pour creer 1 piece ****/
        var createCoins = function () {
            var formulaireCoiny1 = window.document.getElementById('formPseudoCoiny1');
            var formulaireCoiny2 = window.document.getElementById('formPseudoCoiny2');

            var delaiCreationCoiny = 500; // ttes les 0,5s = creation d 1 piece

            var varCounter = 0;
            var varName = function(){
                    varCounter++;
                    new ConstructeurCoiny(varCounter);
            };

            setIntervalCoiny = setInterval(varName, delaiCreationCoiny);
        } 
        
    });

    socket.on('endGame', function () {
        console.log('game timeout');

        // timing du gameover
    // setTimeout(function() {
    //     //au bout de 30s on recupere le meilleur score
    //     if (document.getElementById('score').innerHTML < 10) {
    //         document.getElementById('gameover').style.display = "block";
    //     }
    // }, 30000);
        clearInterval(setIntervalCoiny);
        socket.emit('nbCoinsClicked', document.getElementById('scoreCoiny1').innerText);
    });

    document.getElementById('formPseudoCoiny1').addEventListener("submit", function () {
        var pseudo = document.getElementById('pseudoCoiny1').value;
        socket.emit('pseudo', pseudo);
        var overlay = this.parentNode.parentNode;
        overlay.parentNode.removeChild(overlay);
    });
    

    var largeurEcran = window.innerWidth; //recupere automatiquement la valeur de l'ecran du joueur
    var gameHeight = document.getElementById('background').offsetHeight; //definit la hauteur d evolution du jeu
    var topBackground = document.getElementById('background').offsetTop; // definit le top a partir duquel commence la hauteur d 'evolution du jeu

    document.getElementById('regleJeu').addEventListener('click', function () { // fermeture du panneau regle du jeu et lancement du jeu au clic sur le panneau regle du jeu
        //var websocketConnexion = io('http://localhost:8888');
        socket.emit('clickRules', 'kikou');

        var divRegleJeu = document.getElementById('regleJeu');
        divRegleJeu.style.display = "none"; // fermeture du panneau regle du jeu 
    }); 

    rejouer = document.getElementById("boutonRejouer");
    rejouer.addEventListener("click", function () { // relance une partie au clic sur le bouton rejouer
        window.location.reload();

        dataReload = {
            propReload: window.location.reload()
        };

        // A chaque clic de souris sur la div boutonRejouer on envoie l'action au back end.
        websocketConnexion.emit('boutonRejouer', dataReload); // .emit boutonRejouer
    });

    /**** end of relancer une partie   ****/




    /**** afficher les regles du jeu avec le bouton interrogation  ****/

    document.getElementById('boutonInterrogation').addEventListener('click', function () { // affiche le panneau regle du jeu qd on clique sur le bouton '?'

        divRegleJeu = document.getElementById('regleJeu');

        if (divRegleJeu.style.display == 'none')
            divRegleJeu.style.display = 'block';
        else
            divRegleJeu.style.display = 'none';

        window.location.reload(); // recharge le jeu qd on clique sur le bouton regles du jeu 

        //console.log(window.document.getElementById('regleJeu').style.display)

        dataBoutonInterrogation = {
            propDivRegleJeu: divRegleJeu,
            propReload: window.location.reload()
        }

    });
    /**** end of afficher les regles du jeu avec le bouton interrogation  ****/





}); // fin window.addEventListener DomContentLoaded
