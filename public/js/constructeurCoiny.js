var ConstructeurCoiny = function (id) {
	var gameWidth = window.innerWidth;
	var gameHeight = document.getElementById('background').offsetHeight;
	var topBackground = document.getElementById('background').offsetTop;
    var leftBackground = document.getElementById('background').offsetLeft;
    var divScoreCoiny1 = window.document.getElementById('scoreCoiny1');

    // on cree la div qui va accueillir l image

    this.coiny = window.document.createElement('div');
    this.coiny.id = 'coinyContainer' + id;
    this.coiny.style.position = 'absolute';
    this.coiny.style.top = Math.random() * (gameHeight * 0.8 - topBackground) + topBackground + 'px';
    this.coiny.style.left = Math.random() * (gameWidth * 0.8 - leftBackground) + leftBackground + 'px';
    
    // on cree l image
    this.coinyContenuADeplacer = window.document.createElement('img');
    this.coinyContenuADeplacer.id = 'coinyContenu';
    this.coinyContenuADeplacer.src = '/Assets/images/Gold_Coin_PNG_Clipart-663.png';

    this.coiny.appendChild(this.coinyContenuADeplacer); // j insere le contenu recupere ds le container

    //On rattache le container créé dynamiquement au DOM
    window.document.getElementsByTagName('body')[0].appendChild(this.coiny);

    // Incrementation du score au clique et disparition de la piece
    document.getElementById('coinyContainer' + id).addEventListener('click', function () {
        divScoreCoiny1.innerHTML = ++divScoreCoiny1.innerHTML; // je remets le nouveau score ds la div score 1
        this.parentNode.removeChild(this);
    });
    this.continuerCreationCoiny = true;
}
