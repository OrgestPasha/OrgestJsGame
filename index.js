const blob = document.getElementById("blob");
const food = document.getElementById("food");
const pointsElement = document.getElementById("score");

let move = false;

let blobX = Math.floor(Math.random() * 15) * 25;
let blobY = Math.floor(Math.random() * 23) * 25;

let foodX = Math.floor(Math.random() * 15) * 25;
let foodY = Math.floor(Math.random() * 23) * 25;

let speed = 200; //this would be the interval we request the animation feature in turn allowing us to speed up in later levels
//by decreasing this we actually increase speed , they have a negative relation

let direction = "";

let score = 0;

//here we have the declaration of direction and assigning to it we have to do this before we request the animation
//since we have to know what to animate
document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "Space":
      move = !move;
      break;

    case "KeyW":
      direction = "w";
      break;

    case "KeyA":
      direction = "a";
      break;

    case "KeyS":
      direction = "s";
      break;

    case "KeyD":
      direction = "d";
  }
});

//actual animation for movement
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

function eatfood() {
  score++;
  foodX = Math.floor(Math.random() * 15) * 25;
  foodY = Math.floor(Math.random() * 23) * 25;
  pointsElement.innerHTML = "Score: " + score;
}

//initial call so our program animates when we initialize
moveBlob();
