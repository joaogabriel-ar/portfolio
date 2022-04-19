import Deck from './Deck.js';
import Player from './Player.js';


export default class Dealer extends Player{
    constructor(){
        super()
        this.name = "Dealer"
        this.cards = [];
        this.points = 0;
        
    }
    resetDealer(){
        this.name = "Dealer"
        this.cards = [];
        this.points = 0;
    }
}
