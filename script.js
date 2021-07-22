const FRONT = "card_front"
const BACK = "card_back"

let techs = ['bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'];

let cards = null
 
function initializeCards(cards){
    let gameboard = document.getElementById("gameBoard")
    for (let card in cards){
        let cardElement = document.createElement('div')
        cardElement = card.id
        cardElement.classList.add('card')
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)


        cardElement.addEventListener("click",flipCard)
        gameboard.appendChild(cardElement)
    }
}


function createCardContent(card, cardElement){
    createCardFace(FRONT, card, cardElement);
    createCardBack(BACK, card, cardElement)
}


function startGame(){
    cards = createCardsFromTechs(techs)
    shuffleCards(cards)
    initializeCards(cards)
}
/*==================== Embaralhando os cards ====================== */
function shuffleCards(cards){
    let currentIndex = cards.lenght; /*Pegando o tamanho do array e passando como id */
    let randomIndex= 0;
    
    while(currentIndex !==0){
        randomIndex = Math.floor(Math.random()*currentIndex) /* pegando um valor randomico de acordo com 
        o tamanho da array e aplicando um floo (pegando sempre o número anterior ex: 19.99, vai ser 19)
        */
        currentIndex--


        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]] /*trocando as posições */
    }
}
/*================================================================== */




/*========================= Setando cards ========================= */

function createCardsFromTechs(techs){
    let cards = []


    for(let tech of techs){
        cards.push(createPairFromTech(tech)) //Setando o array cards com os elementos da array techs
    }
    console.log(cards.flatMap(pair => pair)) //fletMap serve para desestruturar todas as arrays que estiverem dentro de uma array maior e rotorna
    //o parâmetro pair serve como elemento de interação semelhante ao for(let pair in cards)
}

/*==================================================================== */





/*============= criando atributos de identificação do card============= */
function createPairFromTech(tech){
    return[{
        id: createIdWithTech(tech),
        icon:tech,
        flipped:false,
    },{ id: createIdWithTech(tech),
        icon: tech,
        flipped:false,

    }]
}
/*==================================================================== */




/*=============== função para gerar um id aleatório ================== */
function createIdWithTech(tech){
    return  tech + parseInt(Math.random()*1000); //gerando id
}
createCardsFromTechs(techs)

/*===================================================================== */