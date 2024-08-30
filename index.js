const blob = document.getElementById("blob");

let move = false;
let blobX = 0;
let blobY = 0;

let direction = "";

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

function moveBlob() {
  if (move) {
    switch (direction) {
      case "w":
        console.log("w");
        blobY -= 5;
        break;

      case "a":
        blobX -= 5;
        break;

      case "s":
        blobY += 5;
        break;

      case "d":
        blobX += 5;
        break;
    }

    blob.style.transform = `translate(${blobX}px, ${blobY}px)`;
  }
  requestAnimationFrame(moveBlob);
}
moveBlob();
