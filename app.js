const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
let lengthOfRain = 400;

function randomNumber(b, a) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function createObject(x, y, color, width, height) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

class Rain {
  constructor() {
    this.x = randomNumber(canvas.width, 1);
    this.y = randomNumber(1000, 1) * -1;
    this.color = this.x % 2 == 0 ? "white" : "#999";
    this.width = randomNumber(8, 5);
    this.height = this.width * 6;
    this.rotate = randomNumber(3, 1);
  }
  draw() {
    createObject(this.x, this.y, this.color, this.width, this.height);
  }
}

function fall() {
  const rain = new Rain();
  const speed = randomNumber(20, 30);

  function updateRainPosition() {
    rain.y += speed;

    if (rain.rotate % 2 === 0) {
      rain.x += 1;
    } else {
      rain.x -= 1;
    }

    if (rain.y > canvas.height) {
      resetRain();
    }

    rain.draw();
  }

  function resetRain() {
    rain.x = randomNumber(canvas.width, 1);
    rain.y = randomNumber(1000, 1) * -1;
    rain.rotate = randomNumber(3, 1);
  }

  function loop() {
    updateRainPosition();
    window.requestAnimationFrame(loop);
  }

  loop();
}

function run() {
  createObject(0, 0, "#333", canvas.width, canvas.height);
  window.requestAnimationFrame(run);
}

window.addEventListener("load", () => {
  for (let i = 0; i < lengthOfRain; i++) {
    setTimeout(() => {
      fall();
    }, 1000);
  }
});

run();
