import Deck from "./Deck.js";
import Player from "./Player.js";
import Dealer from "./Dealer.js";

const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content')
const startGame = document.getElementById('start-game');
const hit = document.getElementById('hit');
const stand = document.getElementById('stand');
const newGame = document.getElementById('new-game');
const gameContainer = document.getElementById('game-container');
const menuGame = document.getElementById("menu-container")
const playerCardsContainer = document.getElementById('player-cards');
const dealerCardsContainer = document.getElementById('dealer-cards');
const playerPointsSpan = document.getElementById('player-points');
const dealerPointsSpan = document.getElementById('dealer-points');
const spanLose = document.createElement('span');
spanLose.setAttribute('id', 'spanLose');
gameContainer.appendChild(spanLose);
const player = new Player();
const dealer = new Dealer();

const rules = document.getElementById('rules');
rules.addEventListener('click', ()=>{
    modal.style.display = "block";
})

document.getElementById('close-modal').addEventListener('click',()=>{
    modal.style.display = 'none';
})

const startingGame = function start() {
    let deck = new Deck().createDeck();
    menuGame.style.display = 'none';
    gameContainer.style.display = 'block';
    player.resetPlayer();
    dealer.resetDealer();


    console.log(player.cards);
    console.log(dealer.cards);


    for (let i = 0; i <= 1; i++) {
        player.drawCard(deck);
        const playerCardImage = document.createElement('img');
        playerCardImage.src = `./imgs/${player.cards[i].name}${player.cards[i].suit}.png`;
        playerPointsSpan.innerHTML = "Points: " + player.points;
        playerCardsContainer.appendChild(playerCardImage);
        if (player.points == 21) {
            spanLose.innerHTML = "YOU WIN";
            hit.style.display = 'none';
            stand.style.display = 'none';
            newGame.style.display = 'block'
        }
    }

    dealer.drawCard(deck);
    const dealerCardImage = document.createElement('img');
    dealerCardImage.src = `./imgs/${dealer.cards[0].name}${dealer.cards[0].suit}.png`;
    dealerPointsSpan.innerHTML = "Points: " + dealer.points;
    dealerCardsContainer.appendChild(dealerCardImage);

    hit.addEventListener('click', () => {
        player.drawCard(deck);
        const playerCardImage = document.createElement('img');
        playerCardImage.src = `./imgs/${player.cards[player.cards.length - 1].name}${player.cards[player.cards.length - 1].suit}.png`;
        playerPointsSpan.innerHTML = "Points: " + player.points;
        playerCardsContainer.appendChild(playerCardImage);

        if (player.points > 21) {
            spanLose.innerHTML = "DEALER WINS";
            hit.style.display = 'none';
            stand.style.display = 'none';
            newGame.style.display = 'block'

        } else if (player.points == 21) {
            spanLose.innerHTML = "YOU WIN";
            hit.style.display = 'none';
            stand.style.display = 'none';
            newGame.style.display = 'block'
        }
    })

    stand.addEventListener('click', () => {
        while (dealer.points <= 17) {
            dealer.drawCard(deck);
            const dealerCardImage = document.createElement('img');
            dealerCardImage.src = `./imgs/${dealer.cards[dealer.cards.length - 1].name}${dealer.cards[dealer.cards.length - 1].suit}.png`;
            dealerPointsSpan.innerHTML = "Points: " + dealer.points;
            dealerCardsContainer.appendChild(dealerCardImage);
        }

        if (dealer.points > 21) {
            spanLose.innerHTML = "YOU WIN";
            hit.style.display = 'none';
            stand.style.display = 'none';
            newGame.style.display = 'block'

        } else if (dealer.points > player.points) {
            spanLose.innerHTML = "DEALER WINS";
            hit.style.display = 'none';
            stand.style.display = 'none';
            newGame.style.display = 'block'

        } else if (dealer.points == player.points) {
            spanLose.innerHTML = "DRAW";
            hit.style.display = 'none';
            stand.style.display = 'none';
            newGame.style.display = 'block'

        } else {
            spanLose.innerHTML = "YOU WIN";
            hit.style.display = 'none';
            stand.style.display = 'none';
            newGame.style.display = 'block'
        }
    })

    console.log(deck);

    newGame.addEventListener('click', () => {
        window.location.reload();
    })

}

startGame.addEventListener('click', startingGame)