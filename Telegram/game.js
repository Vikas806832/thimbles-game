const tg = window.Telegram?.WebApp;
if (tg) {
  tg.expand();
  tg.ready();
}

const board = document.getElementById("board");
const THIMBLES = 3;

let mode = 1; // 1 or 2 balls
let positions = [];
let gameActive = false;

function setMode(ballCount) {
  mode = ballCount;
  alert(`Mode set to ${mode} ball(s)`);
}

function createBoard() {
  board.innerHTML = "";
  positions = [];

  for (let i = 0; i < THIMBLES; i++) {
    const div = document.createElement("div");
    div.classList.add("thimble");
    div.dataset.index = i;

    const ball = document.createElement("div");
    ball.classList.add("ball");
    div.appendChild(ball);

    div.onclick = () => pickThimble(i);

    board.appendChild(div);
  }
}

// Fisher-Yates / Durstenfeld Shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startGame() {
  createBoard();
  gameActive = true;

  // create array like [1,0,0] or [1,1,0]
  positions = new Array(THIMBLES).fill(0);

  for (let i = 0; i < mode; i++) {
    positions[i] = 1;
  }

  shuffle(positions);

  console.log("Shuffled positions:", positions);
}

function pickThimble(index) {
  if (!gameActive) return;

  const thimbles = document.querySelectorAll(".thimble");

  if (positions[index] === 1) {
    thimbles[index].querySelector(".ball").style.display = "block";
    alert("You Win!");
  } else {
    // reveal all balls
    positions.forEach((val, i) => {
      if (val === 1) {
        thimbles[i].querySelector(".ball").style.display = "block";
      }
    });
    alert("You Lose!");
  }

  gameActive = false;
}

createBoard();
