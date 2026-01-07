let rlS = require('readline-sync');

// ============================
// BOARD

function Board(n) {
  this.size = n
  this.board = Board.generate(n);
  this.winningLines = Board.winningLines(n);
}

Board.generate = function(n) {
  let b = []
  for (let r = 0; r < n; r++) {
    b.push([]);
    for (let c = 0; c < n; c++) {
      b[r].push(' ');
    }
  }
  return b;
}

Board.winningLines = function(n) {
  let winningLines = [];
  let diagonal1 = [];
  let diagonal2 = [];
  for (let a = 0; a < n; a++) {
    let horizontalLine = [];
    let verticalLine = [];
    for (let b = 0; b < n; b++) {
      horizontalLine.push(String(a + 1) + String(b + 1));
      verticalLine.push(String(b + 1) + String(a + 1));
    }
    winningLines.push(horizontalLine, verticalLine);
    diagonal1.push(String(a + 1) + String(a + 1));
    diagonal2.push(String(n - a) + String(a + 1));
  }
  winningLines.push(diagonal1, diagonal2);
  return winningLines;
}

Board.prototype.display = function() {

  const header      = `    ${Array.from({ length: this.size }, (_, i) => i + 1).join('   ')}  `;
  const outsideLine = `   -${Array(this.size).fill('-').join('---')}- `;
  const insideLine  = `  |-${Array(this.size).fill('-').join('-+-')}-|`;

  console.clear();
  console.log(header);
  console.log(outsideLine);
  for (let r = 0; r < this.size; r++) {
    console.log(`${r + 1} | ${this.board[r].join(' | ')} |`);
    if (r < this.size - 1) {
      console.log(insideLine);
    }
  }
  console.log(outsideLine);
}

Board.prototype.reset = function() {
  this.board = Board.generate(this.size)
}

Board.prototype.freeSquares = function() {
  let freeSquares = [];
  for (let r = 0; r < this.size; r++) {
    for (let c = 0; c < this.size; c++) {
      if (this.board[r][c] === ' ') {
        freeSquares.push(String(r + 1) + String(c + 1))
      }
    }
  }
  return freeSquares;
}

Board.prototype.isFull = function() {
  return this.freeSquares().length === 0;
}

Board.prototype.getWinner = function() {
  for (let i = 0; i < this.winningLines.length; i++) {
    
    let line = this.winningLines[i];
    if (line.every(c => this.getMarkerAt(c) === 'X')) return 'X';
    if (line.every(c => this.getMarkerAt(c) === 'O')) return 'O';
  }
  return false;
}

Board.prototype.getMarkerAt = function(coordinates) {
  let r = Number(coordinates[0]) - 1;
  let c = Number(coordinates[1]) - 1;
  return this.board[r][c];
}

Board.prototype.place = function(marker, coordinates) {
  let r = Number(coordinates[0]) - 1;
  let c = Number(coordinates[1]) - 1;
  this.board[r][c] = marker;
}
// ============================
// GAME

class Game {
  play() {
    this.#initializeBoard();
    this.#takeTurns();
    this.#displayResults();
  }
  
  // Private methods below

  #initializeBoard() {
    console.clear();
    console.log('------------------------------');
    let boardSize;
    do {
      console.log('What size board would you like to play on? (3 ~ 9)')
      boardSize = Number(rlS.question('>> '));
    } while (!([3, 4, 5, 6, 7, 8, 9].includes(boardSize)));
    this.board = new Board(boardSize);
    this.board.display();  
  }
  
  #takeTurns() {
    while (!this.board.isFull() && !this.board.getWinner()) {
      this.#playerTakeTurn();
      if (this.board.getWinner()) return;
      this.#computerTakeTurn();
    }
  }
  #playerTakeTurn() {
    console.log('------------------------------');
    let availableSquares = this.board.freeSquares();
    let chosenSquare;
    do {
      console.log(`Pick from available squares: ${availableSquares.join(', ')}`);
      chosenSquare = rlS.question('>> ');
    } while (!(availableSquares.includes(chosenSquare)));
    this.board.place('X', chosenSquare); 
    this.board.display();
    console.log(`Player places an X on ${chosenSquare}`);
  }
  
  #computerTakeTurn() {
    console.log('------------------------------');
    rlS.question(`Computer's turn! Press any key to continue...`);
    let freeSquares = this.board.freeSquares();
    let randIndex = Math.floor(Math.random() * freeSquares.length);
    let square = freeSquares[randIndex]
    this.board.place('O', square);
    this.board.display();
    console.log(`Computer places an O on ${square}`);
  }

  #displayResults() {
    let winner = this.board.getWinner();
    if (!winner) {
      console.log(`It's a tie!`);
    } else if (winner === 'X') {
      console.log(`Player wins!`);
    } else if (winner === 'O') {
      console.log(`Computer wins!`);
    }
  }
}

// ============================
// MAIN

console.clear();
let game = new Game();
game.play();