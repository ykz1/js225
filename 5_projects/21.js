let rlS = require('readline-sync');
/*

21 is a 1v1 game where players play against the dealer. Even in multi-player tables, each player plays an individual 1v1 game versus the dealer. 

The dealer has preset rules on when they can hit and when they need to sit. The dealer also has the advantage of going second.

The typical flow of 21 is:
- Shuffle deck
- Deal 2 cards to player and to dealer
- Player takes turn
- Dealer takes turn
- Compare hands and display game results

Simple implementation of 21:
- 
- Deck (class)
  - has...
    - deck: array of Card objects
  - behaviours...
    - deal: randomly select a card with position 'Deck', and change position to 'Player' or 'Dealer'
    - 
    - 
- Card (class)
  - has...
    - suit: 'Diamonds', 'Clubs', 'Spades', 'Hearts'
    - value: 2 through 10, Jack, Queen, King
    - possible points: e.g. [3], [1, 11]
  - behaviours...
    - initialize: take arguments suit, value, and position (default 'Deck')
Classes
- Deck
  - 
- Game
- Players: coll

*/

// =======================================================
// CARD CLASS

class Card {
  constructor(suit, rank, position='Deck') {
    this.name = `${rank} of ${suit}`;
    this.suit = suit;
    this.rank = rank;
    this.point = this.#getPoints();
  }
  
  #getPoints() {
    if (this.rank === 'Ace') {
      return 11;
    } else if (['10', 'Jack', 'Queen', 'King'].includes(this.rank)) {
      return 10;
    } else {
      return Number(this.rank);
    }
  }
}

// =======================================================
// DECK CLASS

class Deck {
  constructor() {
    this.reset();
  }
  draw() {
    const index = Math.floor(Math.random() * this.cards.length);
    const card = this.cards[index];
    this.cards.splice(index, 1);
    return card;
  }
  reset() {
    this.cards = Deck.#generateDeck();
  }
  
  // ======================================
  // Private and static properties and methods
  
  // Static class-level properties because we don't need copies of this with every Deck instance
  static #suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
  static #ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  
  static #generateDeck() {
    const deck = [];
    Deck.#suits.forEach(suit => {
      Deck.#ranks.forEach(rank => {
        deck.push(new Card(suit, rank, 'Deck'));
      });
    });
    return deck;
  }
}

// =======================================================
// PARTICIPANT / PLAYER / DEALER CLASSES
class Participant {
  constructor(name) {
    this.name = name;
    this.points = 0;
    this.wins = 0;
    this.hand = [];
  }
  add(card) {
    this.hand.push(card);
  }

  showCards() {
    const cards = this.hand.map(card => card.name);
    return cards.join(', ');
  }
  
  resetHand() {
    this.hand = [];
    this.points = 0;
  }
}
class Player extends Participant {}
class Dealer extends Participant {}


// =======================================================
// GAME CLASS

class Game {
  play() {
    this.#initializeGame();
    this.#selectSettings();
    this.#dealStartingCards();
    this.#playerTurn();
    this.#dealerTurn();
    this.#displayResults();
  }

  // ====================
  // Internal methods
  
  #selectSettings() {
    console.clear();
    console.log(`=== GAME SETTINGS ===`);
    this.#setBlackJack();
    this.#setPlayerName();
    this.#setDealerName();
    this.#displaySettings();
    console.log(`Press any key to continue...`);
    rlS.question(`>> `);
  }

  #setBlackJack() {
    // Assume valid input
    console.log();
    console.log(`What would you like to set BlackJack to? (regularly 21)`);
    let userInput = rlS.question(`>> `);
    this.blackjack = Number(userInput);
  }
  #setPlayerName() {
    console.log();
    console.log(`What is your name?`);
    let userInput = rlS.question(`>> `);
    this.player.name = userInput;
  }

  #dealerNames = ['Mr. Chat', 'Ms. Gemini', 'Sir Claude', 'Dr. LSBot']

  #setDealerName() {
    const randIndex = Math.floor(Math.random() * this.#dealerNames.length);
    this.dealer.name = this.#dealerNames[randIndex];
  }

  #displaySettings() {
    console.log(`${this.player.name} vs ${this.dealer.name} in a game with BlackJack set at ${this.blackjack}`)
  }

  #initializeGame() {
    this.deck = new Deck();
    this.player = new Player('Player');
    this.dealer = new Dealer('Dealer');
  }
  #dealStartingCards() {
    this.#deal(this.player, 2);
    this.#deal(this.dealer, 2);
  }

  #deal(participant, cards=1) {
    for (let i = 0; i < cards; i++) {
      const cardDrawn = this.deck.draw();
      participant.add(cardDrawn);
      participant.points = this.#calculatePoints(participant.hand);
    }
  }

  #calculatePoints(hand) {
    const rawPoints = hand.map(card => card.point);
    rawPoints.sort((a, b) => a - b);
    return rawPoints.reduce((acc, point) => {
      acc += point
      if (point === 11 && acc > this.blackjack) acc -= 10;
      return acc;
    }, 0);
  }

  #playerTurn() {
    this.#showPlayerTurn();
    while (true) {
      const playerAction = this.#getAction();
      if (playerAction === 'h') this.#deal(this.player);
      this.#showHand(this.player);
      
      if (playerAction === 's') break;
      if (this.#isBust(this.player)) break;
      if (this.#hasBlackJack(this.player)) break;
    }
  }

  #isBust(participant) {
    return participant.points > this.blackjack;
  }

  #hasBlackJack(participant) {
    return participant.points === this.blackjack;
  }

  #showPlayerTurn() {
    console.clear();
    console.log(`=== ${this.player.name}'s Turn ===`);
    console.log();
    console.log(`${this.dealer.name} has ${this.dealer.hand.length} cards and is showing: ${this.dealer.hand[0].name}`);
    this.#showHand(this.player);
  }

  #showHand(participant) {
    let status = `has ${participant.points} points`;

    if (participant.points === this.blackjack) {
      status = `has BlackJack`;
    } else if (participant.points > this.blackjack) {
      status = `is bust`;
    }
    
    console.log(`${participant.name} ${status} with: ${participant.showCards()}.`);
  }

  #getAction() {
    let playerInput;
    do {
      console.log(`Would you like to (h)it or (s)tay?`)
      playerInput = rlS.question('>> ');
      playerInput = playerInput[0].toLowerCase();
    } while (!(['h', 's'].includes(playerInput)));
    return playerInput;
  }

  #dealerTurn() {
    if (this.player.points > this.blackjack) return;
    
    this.#showDealerTurn();
    rlS.question('>> press any key to continue...');

    while (true) {
      if (this.dealer.points < (this.blackjack - 5)) {
        console.log(`${this.dealer.name} hits...`);
        rlS.question('>> press any key to continue...');
        this.#deal(this.dealer);
        this.#showHand(this.dealer);
      } else {
        break;
      }
    }
  }
  #showDealerTurn() {
    console.clear();
    console.log(`=== ${this.dealer.name}'s Turn ===`)
    console.log();
    this.#showTableFull();

  }
  #showTableFull() {
    this.#showHand(this.player);
    this.#showHand(this.dealer);
  }
  #displayResults() {
    console.clear();
    console.log(`=== Game Results ===`);
    console.log();
    this.#showTableFull();
    console.log();
    if (this.player.points <= this.blackjack && (this.player.points > this.dealer.points || this.dealer.points > this.blackjack)) {
      console.log(`${this.player.name} wins!`);
      this.player.wins += 1;
    } else {
      console.log(`${this.dealer.name} wins.`);
      this.dealer.wins += 1;
    }
  }
}


const game = new Game();
game.play();