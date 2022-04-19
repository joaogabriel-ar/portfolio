export default class Card {
    constructor(id, name, suit) {
        this.id = id;
        this.name = name;
        this.suit = suit;
        this.value = this.defineValue();
    }

    defineValue() {
        if (this.name > 1 && this.name < 11) {
            return this.name;
        } else if (this.name == "J" || this.name == "Q" || this.name == "K") {
            return 10;
        }
        else{
            return 11;
        }
    }
}