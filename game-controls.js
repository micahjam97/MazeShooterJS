var controls = {
  up: false,
  down: false,
  left: false,
  right: false
};


window.addEventListener("keydown", function (e) {
  switch(e.key) {
    case "ArrowUp":
      controls.up = true;
      break;
    case "ArrowDown":
      controls.down = true;
      break;
    case "ArrowLeft":
      controls.left = true;
      break;
    case "ArrowRight":
      controls.right = true;
      break;
  };
}, false);


window.addEventListener("keyup", function (e) {
  switch(e.key) {
    case "ArrowUp":
      controls.up = false;
      break;
    case "ArrowDown":
      controls.down = false;
      break;
    case "ArrowLeft":
      controls.left = false;
      break;
    case "ArrowRight":
      controls.right = false;
      break;
  };
}, false);