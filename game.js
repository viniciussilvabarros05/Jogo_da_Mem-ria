let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    techs: ['bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'],

    cards: null,

    setCard: function (id) { //
        
        let card = this.cards.filter(card => card.id === id)[0] //buscando através do click o id e comparando com todos os id´s da array

        if (card.flipped || this.lockMode) { // se a carta estiver virada ou lockmode estiver true
            return false //retorne falso
        }

        if (!this.firstCard) { // se estiver nulo
            this.firstCard = card //recebe um booleano true
            this.firstCard.flipped = true
            return true
        } else {
            this.secondCard = card
            this.secondCard.flipped = true
            this.lockMode = true
            return true
        }
    },


    unflipCards() {
        this.firstCard.flipped = false
        this.secondCard.flipped = false
        this.clearCards()
    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false
        }
        return this.firstCard.icon === this.secondCard.icon
    },

    clearCards: function () {
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    checkGameOver(){
        return this.cards.filter(card => !card.flipped).length == 0
    },







    /*========================= Setando cards ========================= */


    createCardsFromTechs: function () {
        this.cards = []

        this.techs.forEach(tech => {
            this.cards.push(this.createPairFromTech(tech)) //Setando o array cards com os elementos da array techs
        })

        this.cards = this.cards.flatMap(pair => pair) //fletMap serve para desestruturar todas as arrays que estiverem dentro de uma array maior e rotorna
        this.shuffleCards()//o parâmetro pair serve como elemento de interação semelhante ao for(let pair in cards)
    },

    /*==================================================================== */





    /*============= criando atributos de identificação do card============= */
    createPairFromTech: function (tech) {
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,

        }]
    },
    /*==================================================================== */




    /*=============== função para gerar um id aleatório ================== */
    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000); //gerando id
    },


    /*===================================================================== */


    /*==================== Embaralhando os cards ====================== */
    shuffleCards: function () {
        let currentIndex = this.cards.length/*Pegando o tamanho do array e passando como id */
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--; /* pegando um valor randomico de acordo com o tamanho da array e aplicando um floor (pegando sempre o número anterior ex: 19.99, vai ser 19)*/


            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]] /*trocando as posições */
        }

    }
    /*================================================================== */


}
