let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let human = 'X';
let ai = 'O';
let currentPlayer = human;
let gameOver = false;
let resultMessage = '';
let playAgainButton;
//Background image
let bgImage;
//Move sounds
let moveSound;

function preload() {
  bgImage = loadImage('Tictactoe.jpg');
  moveSound = loadSound('Movemade.wav');
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent(document.body);
  textFont('Arial');
  textAlign(CENTER, CENTER);
  noLoop(); // Prevent continuous drawing
  loop();   // Restart loop when needed
}

function draw() {
  image(bgImage, 0, 0, width, height);
  drawBoard();

  if (gameOver) {
    textSize(32);
    fill(255, 165, 0);
    text(resultMessage, width / 2, height / 2 - 20);
  }
}

function drawBoard() {
  strokeWeight(4);
  for (let i = 1; i < 3; i++) {
    line((width / 3) * i, 0, (width / 3) * i, height);
    line(0, (height / 3) * i, width, (height / 3) * i);
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = width / 3 * j + width / 6;
      let y = height / 3 * i + height / 6;
      let spot = board[i][j];
      textSize(64);
      if (spot === human) {
        fill(255, 0, 0);
      } else if (spot === ai) {
        fill(0, 0, 255);
      }
      text(spot, x, y);
    }
  }
}

function mousePressed() {
  if (gameOver) return;

  let i = floor(mouseY / (height / 3));
  let j = floor(mouseX / (width / 3));

  if (board[i][j] === '') {
    board[i][j] = human;
    moveSound.play(); // Play move sound
    currentPlayer = ai;

    let result = checkWinner();
    if (result !== null) {
      endGame(result);
      return;
    }

    setTimeout(() => {
      bestMove();
      let result = checkWinner();
      if (result !== null) {
        endGame(result);
      }
    }, 600); // slight delay for realism
  }
}

function bestMove() {
  let move;
  let chance = random();

  if (chance < 0.35) {
    // 35% chance: random AI move
    let available = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          available.push({ i, j });
        }
      }
    }
    move = random(available);
  } else {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = ai;
          let score = minimax(board, 0, false);
          board[i][j] = '';
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
  }

  if (move) {
    board[move.i][move.j] = ai;
    moveSound.play(); // Play move sound after AI makes its move
    currentPlayer = human;
  }
}

let scores = {
  X: -1,
  O: 1,
  tie: 0
};

function minimax(board, depth, isMaximizing) {
  let result = checkWinner();
  if (result !== null) return scores[result];

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);
          board[i][j] = '';
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);
          board[i][j] = '';
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

function checkWinner() {
  let winner = null;

  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== '' &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]) {
      winner = board[i][0];
    }

    if (board[0][i] !== '' &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i]) {
      winner = board[0][i];
    }
  }

  if (board[0][0] !== '' &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]) {
    winner = board[0][0];
  }

  if (board[0][2] !== '' &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]) {
    winner = board[0][2];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (board[i][j] === '') openSpots++;

  if (winner == null && openSpots === 0) return 'tie';
  else return winner;
}

function endGame(result) {
  gameOver = true;
  if (result === 'tie') {
    resultMessage = 'It\'s a Draw!';
  } else if (result === human) {
    resultMessage = 'You Win!';
  } else {
    resultMessage = 'You Lose!';
  }

  playAgainButton = createButton('Play Again');
  playAgainButton.position(width / 2 - 40, height / 2 + 40);
  playAgainButton.mousePressed(resetGame);
}

function resetGame() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer = human;
  gameOver = false;
  resultMessage = '';
  if (playAgainButton) playAgainButton.remove();
  loop(); // Restart the game loop
}
