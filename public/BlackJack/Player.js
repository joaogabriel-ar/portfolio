import Deck from "./Deck.js";

export default class Player {
    constructor() {
        this.cards = [];
        this.points = 0;
    }

    drawCard(array) {
        const randomCard = array[Math.floor(Math.random() * array.length)];
        if (randomCard.name == 'A' && this.points + 11 <= 21) {
            this.points += randomCard.value
        }
        else if (randomCard.name == 'A'){
            this.points += 1;
        }
        else{
            this.points += randomCard.value
        }
        this.cards.push(randomCard);
        const indexCard = array.indexOf(randomCard);
        array.splice(indexCard, 1);
        return randomCard;
    }
    resetPlayer(){
        this.cards = [];
        this.points = 0;
    }
}