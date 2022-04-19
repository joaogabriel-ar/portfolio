import Card from "./Card.js";

export default class Deck{
    createDeck(){
        const value = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]
        const suit = ["C", "D", "H", "S"]
        const array = [];
        let cont = 1;
        for(let i=0; i<value.length; i++){
            for(let j=0; j<suit.length; j++){
                array.push(new Card(cont,value[i],suit[j]))
                cont++
            }
        }
        return array
    }
}

