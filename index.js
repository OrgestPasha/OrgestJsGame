const blob = document.getElementById("blob");

let move = false;
let blobX = 0;
let blobY = 0;

let speed = 250; //this would be the interval we request the animation feature in turn allowing us to speed up in later levels

let direction = "";

//here we have the declaration of direction and assigning to it we have to do this before we request the animation
//since we have to know what to animate
document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "Space":
      move = !move;
      console.log("space has been pressed");
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
        console.log("w");
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

    blob.style.transform = `translate(${blobX}px, ${blobY}px)`;
  }

  //to get the retro feel and for better implementation we request frames at a certain lower speed
  setTimeout(() => {
    requestAnimationFrame(moveBlob);
  }, speed);
}

//initial call so our program animates when we initialize
moveBlob();
