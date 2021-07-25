const FRONT = "card_front"
const BACK = "card_back"
const ICON = 'icon'


startGame()

function startGame() {
    game.createCardsFromTechs()
    initializeCards(game.cards)
}


/*================= adicionando cards no tabuleiro============ */
function initializeCards(cards) {
    let gameboard = document.getElementById("GameBoard")
    gameboard.innerHTML = ''
    
    game.cards.forEach((card) => {

        let cardElement = document.createElement('div')
        cardElement.id = card.id //recebendo o id randomico 
        cardElement.classList.add('card') //formatando card
        cardElement.dataset.icon = card.icon // setando com o icone 

        createCardContent(card, cardElement)


        cardElement.addEventListener("click", flipCard)
        gameboard.appendChild(cardElement)
    })
}


function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK,card, cardElement)
}


/*==================criando front do card ===================== */
function createCardFace(face, card, element) {


    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)
    if (face === FRONT) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = "./imagens/" + card.icon + ".png"
        cardElementFace.appendChild(iconElement)
    } else {
        cardElementFace.innerHTML = "&lt/&gt"
    }

    element.appendChild(cardElementFace)
}

/*==================== Criando back do card ==================== */


/*===================================================================== */


function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add("flip")
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards()
               if(game.checkGameOver()){
                   let gameOverLayer = document.getElementById("gameOver")
                   gameOverLayer.style.display = "flex";
               }
            } else {
               setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firstCardView.classList.remove('flip')
                    secondCardView.classList.remove('flip')
                    game.unflipCards()
                }, 1000)

            }
        }
        


    }
}


function restart(){
    game.clearCards()
    startGame()
    let gameOverLayer = document.getElementById("gameOver")
    gameOverLayer.style.display = "none";
}

