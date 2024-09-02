const gameContainer = document.querySelector(".game-container");
const food = document.getElementById("food");
const pointsElement = document.getElementById("score");
const gameOver = document.getElementById("gameOverText");

let snake = [createSegment()]; // Initialize snake with one segment
let move = false;
let previousDirection = "";
let direction = "";
let score = 0;
let speed = 200;
let isGameOver = false;

resetGame();

document.addEventListener("keydown", (event) => {
  let newDirection = "";

  if (event.code === "KeyR") {
    resetGame(); // Reset the game even if the game is over
    return; // Stop further processing to avoid direction change after reset
  }

  if (isGameOver) return;

  switch (event.code) {
    case "KeyW":
      newDirection = "w";
      break;

    case "KeyA":
      newDirection = "a";
      break;

    case "KeyS":
      newDirection = "s";
      break;

    case "KeyD":
      newDirection = "d";
      break;
  }

  if (isGameOver) return;

  if (
    (newDirection === "w" && previousDirection === "s") ||
    (newDirection === "a" && previousDirection === "d") ||
    (newDirection === "s" && previousDirection === "w") ||
    (newDirection === "d" && previousDirection === "a")
  ) {
    console.log("Invalid direction change attempted!");
    return;
  }

  previousDirection = newDirection; // Set previous direction to current direction
  direction = newDirection; // Set current direction to the new direction
  move = true;
});

function moveSnake() {
  if (move) {
    // Move each segment to the position of the previous one
    for (let i = snake.length - 1; i > 0; i--) {
      snake[i].style.left = snake[i - 1].style.left;
      snake[i].style.top = snake[i - 1].style.top;
    }

    // Move the head of the snake based on the direction
    let head = snake[0];
    let headX = parseInt(head.style.left);
    let headY = parseInt(head.style.top);

    switch (direction) {
      case "w":
        headY -= 25;
        break;
      case "a":
        headX -= 25;
        break;
      case "s":
        headY += 25;
        break;
      case "d":
        headX += 25;
        break;
    }

    // Constrain the position within bound
    if (headX >= 400 || headX < 0 || headY >= 400 || headY < 0) {
      gameOverFunction();
    }

    headX = Math.max(0, Math.min(headX, 375));
    headY = Math.max(0, Math.min(headY, 375));

    for (let i = 1; i < snake.length; i++) {
      let segmentX = parseInt(snake[i].style.left);
      let segmentY = parseInt(snake[i].style.top);
      if (headX === segmentX && headY === segmentY) {
        gameOverFunction();
        // Exit the function to prevent further movement
      }
    }

    head.style.left = `${headX}px`;
    head.style.top = `${headY}px`;

    // Check if the snake has eaten the food
    if (headX == foodX && headY == foodY) {
      eatFood();
    }
  }

  food.style.transform = `translate(${foodX}px, ${foodY}px)`;

  setTimeout(() => {
    requestAnimationFrame(moveSnake);
  }, speed);
}

function eatFood() {
  score++;
  if (score == 255) {
    winFunction();
  }
  foodX = Math.floor(Math.random() * 15) * 25;
  foodY = Math.floor(Math.random() * 15) * 25;
  pointsElement.innerHTML = "Score: " + score;

  // Elongate the snake by adding a new segment
  let newSegment = createSegment();
  let lastSegment = snake[snake.length - 1];
  newSegment.style.left = lastSegment.style.left;
  newSegment.style.top = lastSegment.style.top;
  snake.push(newSegment);
  gameContainer.appendChild(newSegment);
}

function createSegment() {
  let segment = document.createElement("div");
  segment.classList.add("blob", "ball");
  segment.style.left = "0px";
  segment.style.top = "0px";
  gameContainer.appendChild(segment);
  return segment;
}

function resetGame() {
  // Remove all segments from the game area
  snake.forEach((segment) => gameContainer.removeChild(segment));
  snake = [createSegment()]; // Reset snake with one segment

  foodX = Math.floor(Math.random() * 15) * 25;
  foodY = Math.floor(Math.random() * 15) * 25;

  let initialX = Math.floor(Math.random() * 15) * 25;
  let initialY = Math.floor(Math.random() * 15) * 25;
  snake[0].style.left = `${initialX}px`;
  snake[0].style.top = `${initialY}px`;

  move = false;
  score = 0;
  pointsElement.innerHTML = "Score: " + score;
  gameOver.innerHTML = "";
  speed = 200;
  isGameOver = false;
}

function gameOverFunction() {
  gameOver.innerHTML = "Game Over";
  isGameOver = true;
}

function winFunction() {
  gameOver.innerHTML = "You win";
  isGameOver = true;
}

moveSnake();
