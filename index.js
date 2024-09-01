const blob = document.getElementById("blob");
const food = document.getElementById("food");
const pointsElement = document.getElementById("score");

let move = false;

let blobX;
let blobY;

let foodX;
let foodY;

let speed = 200; //this would be the interval we request the animation feature in turn allowing us to speed up in later levels
//by decreasing this we actually increase speed , they have a negative relation

let direction = "";

let score = 0;

resetGame();

//here would be all the possible inputs a user can put
document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "Space":
      move = !move;
      break;

    case "KeyW":
      direction = "w";
      move = true;
      break;

    case "KeyA":
      direction = "a";
      move = true;
      break;

    case "KeyS":
      direction = "s";
      move = true;
      break;

    case "KeyD":
      direction = "d";
      move = true;
      break;
    case "KeyR":
      resetGame();
  }
});

//here we write the things that should be checked or updated each frame
function moveBlob() {
  if (move) {
    switch (direction) {
      case "w":
        blobY -= 25;
        break;

      case "a":
        blobX -= 25;
        break;

      case "s":
        blobY += 25;
        break;

      case "d":
        blobX += 25;
        break;
    }

    //constricting the position of the snake within bounds
    blobX = Math.max(0, Math.min(blobX, 375));
    blobY = Math.max(0, Math.min(blobY, 575));
  }

  if (blobX == foodX && blobY == foodY) {
    eatfood();
  }

  blob.style.transform = `translate(${blobX}px, ${blobY}px)`;
  food.style.transform = `translate(${foodX}px, ${foodY}px)`;

  //to get the retro feel and for better implementation we request frames at a certain lower speed
  setTimeout(() => {
    requestAnimationFrame(moveBlob);
  }, speed);
}

//functions of diferent interactions

function eatfood() {
  score++;
  foodX = Math.floor(Math.random() * 15) * 25;
  foodY = Math.floor(Math.random() * 23) * 25;
  pointsElement.innerHTML = "Score: " + score;
}

function resetGame() {
  blobX = Math.floor(Math.random() * 15) * 25;
  blobY = Math.floor(Math.random() * 23) * 25;

  foodX = Math.floor(Math.random() * 15) * 25;
  foodY = Math.floor(Math.random() * 23) * 25;

  move = false;
  score = 0;
  pointsElement.innerHTML = "Score: " + score;
}

//initial call so our program animates when we initialize
moveBlob();
