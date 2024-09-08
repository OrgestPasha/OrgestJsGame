const gameContainer = document.querySelector(".game-container");
const pointsElement = document.getElementById("score");
const gameOver = document.getElementById("gameOverText");
const snakecolordisplay = document.getElementById("snake-color-display");
const foodCountDisplay = document.getElementById("food-count");

let foodCountNum = 1; // Number of food items to generate
let foodElements = [];

const snakeColors = [
  "#2EAE00", // Light Green
  "#FF5733", // Vibrant Orange
  "#FFC300", // Bright Yellow
  "#C70039", // Deep Red
  "#900C3F", // Dark Magenta
  "#581845", // Rich Purple
  "#28B463", // Vivid Green
  "#1F618D", // Bold Blue
  "#F39C12", // Golden Yellow
  "#D35400", // Bright Burnt Orange
  "#5DADE2", // Bright Sky Blue
  "#A569BD",
];
let snakeColorPos = 0;
let snake = [createSegment()]; // Initialize snake with one segment
let move = false;
let previousDirection = "";
let direction = "";
let score = 0;
let speed = 150;
let isGameOver = false;
let animationId = null;

foodCountDisplay.innerHTML = foodCountNum;
snakecolordisplay.style.backgroundColor = snakeColors[snakeColorPos];

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
    case "ArrowUp":
      newDirection = "w";
      break;

    case "KeyA":
    case "ArrowLeft":
      newDirection = "a";
      break;

    case "KeyS":
    case "ArrowDown":
      newDirection = "s";
      break;

    case "KeyD":
    case "ArrowRight":
      newDirection = "d";
      break;
  }

  if (
    (newDirection === "w" && previousDirection === "s") ||
    (newDirection === "a" && previousDirection === "d") ||
    (newDirection === "s" && previousDirection === "w") ||
    (newDirection === "d" && previousDirection === "a")
  ) {
    console.log("Invalid direction change attempted!");
    return;
  }

  if (newDirection) {
    previousDirection = newDirection; // Set previous direction to current direction
    direction = newDirection; // Set current direction to the new direction
    move = true;
  }
});

function moveSnake() {
  if (animationId) {
    cancelAnimationFrame(animationId); // Cancel previous animation
  }
  let head = snake[0];
  head.classList.add("head");
  head.style.backgroundColor = snakeColors[snakeColorPos];
  if (!move) {
    animationId = requestAnimationFrame(moveSnake);
    return;
  }

  // Move each segment to the position of the previous one
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i].style.left = snake[i - 1].style.left;
    snake[i].style.top = snake[i - 1].style.top;
  }

  // Move the head of the snake based on the direction
  let headX = parseInt(head.style.left);
  let headY = parseInt(head.style.top);

  switch (direction) {
    case "w":
      headY -= 25;
      head.style.transform = `rotate(270deg)`;
      break;
    case "a":
      headX -= 25;
      head.style.transform = `rotate(180deg)`;
      break;
    case "s":
      headY += 25;
      head.style.transform = `rotate(90deg)`;
      break;
    case "d":
      headX += 25;
      head.style.transform = `rotate(0deg)`;
      break;
  }

  // Check boundary conditions
  if (headX >= 400 || headX < 0 || headY >= 400 || headY < 0) {
    gameOverFunction();
    return;
  }

  headX = Math.max(0, Math.min(headX, 375));
  headY = Math.max(0, Math.min(headY, 375));

  // Check collision with the snake itself
  for (let i = 1; i < snake.length; i++) {
    let segmentX = parseInt(snake[i].style.left);
    let segmentY = parseInt(snake[i].style.top);
    if (headX === segmentX && headY === segmentY) {
      gameOverFunction();
      return;
    }
  }

  head.style.left = `${headX}px`;
  head.style.top = `${headY}px`;

  // Check if the snake has eaten any food
  foodElements.forEach((food, index) => {
    let foodX = parseInt(food.style.left);
    let foodY = parseInt(food.style.top);
    if (headX === foodX && headY === foodY) {
      eatFood(food, index);
    }
  });

  setTimeout(() => {
    animationId = requestAnimationFrame(moveSnake);
  }, speed);
}

function eatFood(food, index) {
  score++;
  pointsElement.innerHTML = "Score: " + score;

  // Remove the eaten food element
  gameContainer.removeChild(food);
  foodElements.splice(index, 1);

  // Add a new segment to the snake
  let newSegment = createSegment();
  let lastSegment = snake[snake.length - 1];
  newSegment.style.left = lastSegment.style.left;
  newSegment.style.top = lastSegment.style.top;
  snake.push(newSegment);
  gameContainer.appendChild(newSegment);

  // Generate a new food item
  createFood();
}

function createFood() {
  const food = document.createElement("div");
  food.classList.add("food");
  let foodX, foodY;
  let overlapping;

  do {
    overlapping = false;
    foodX = Math.floor(Math.random() * 16) * 25; // Ensure positions are multiples of 25
    foodY = Math.floor(Math.random() * 16) * 25;

    console.log(`Food created at: X=${foodX}, Y=${foodY}`); // Add this line

    // Check if the food overlaps with the snake or other food
    snake.forEach((segment) => {
      if (
        parseInt(segment.style.left) === foodX &&
        parseInt(segment.style.top) === foodY
      ) {
        overlapping = true;
      }
    });

    foodElements.forEach((existingFood) => {
      if (
        parseInt(existingFood.style.left) === foodX &&
        parseInt(existingFood.style.top) === foodY
      ) {
        overlapping = true;
      }
    });
  } while (overlapping);

  food.style.left = `${foodX}px`;
  food.style.top = `${foodY}px`;
  gameContainer.appendChild(food);
  foodElements.push(food);
}

function createSegment() {
  const segment = document.createElement("div");
  segment.style.backgroundColor = snakeColors[snakeColorPos];
  segment.classList.add("ball");
  segment.style.left = "0px";
  segment.style.top = "0px";
  gameContainer.appendChild(segment);
  return segment;
}

function resetGame() {
  if (animationId) {
    cancelAnimationFrame(animationId); // Cancel previous animation
  }
  // Remove all snake segments
  snake.forEach((segment) => gameContainer.removeChild(segment));
  snake = [createSegment()]; // Reset snake with one segment

  // Remove all existing food elements
  foodElements.forEach((food) => gameContainer.removeChild(food));
  foodElements = [];

  // Set initial position of the snake
  let initialX, initialY;
  do {
    initialX = Math.floor(Math.random() * 16) * 25;
    initialY = Math.floor(Math.random() * 16) * 25;
  } while (isOccupied(initialX, initialY)); // Ensure the initial position doesn't overlap with food

  snake[0].style.left = `${initialX}px`;
  snake[0].style.top = `${initialY}px`;

  // Create multiple food items
  for (let i = 0; i < foodCountNum; i++) {
    createFood();
  }

  move = false;
  score = 0;
  pointsElement.innerHTML = "Score: " + score;
  gameOver.innerHTML = "";
  speed = 150;
  isGameOver = false;

  // Start moving the snake
  moveSnake();
}

function isOccupied(x, y) {
  // Check if any food is at the position
  for (let food of foodElements) {
    if (parseInt(food.style.left) === x && parseInt(food.style.top) === y) {
      return true;
    }
  }
  return false;
}

function gameOverFunction() {
  gameOver.innerHTML = "Game Over";
  isGameOver = true;
}

function winFunction() {
  gameOver.innerHTML = "You win";
  isGameOver = true;
}

function colorPlus() {
  snakeColorPos++;
  if (snakeColorPos >= snakeColors.length) {
    // Corrected comparison
    snakeColorPos = 0;
  }
  snakecolordisplay.style.backgroundColor = snakeColors[snakeColorPos];
}

function colorMinus() {
  snakeColorPos--;
  if (snakeColorPos < 0) {
    // Corrected to wrap around to the last color
    snakeColorPos = snakeColors.length - 1;
  }
  snakecolordisplay.style.backgroundColor = snakeColors[snakeColorPos];
}

function foodCountNumPlus() {
  foodCountNum++;
  foodCountDisplay.innerHTML = foodCountNum;
}

function foodCountNumMinus() {
  if (foodCountNum == 1) {
    return;
  }
  foodCountNum--;
  foodCountDisplay.innerHTML = foodCountNum;
}
