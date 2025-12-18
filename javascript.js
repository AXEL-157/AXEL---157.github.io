function rMe(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let roof = document.getElementById("roof");
let floor = document.getElementById("floor");

function randomWaves() {
  roof.setAttribute(
    "d",
    "M 0 0 V" + rMe(100, 110) +
    " M 20 0 V" + rMe(100, 120) +
    " M 40 0 V" + rMe(100, 130) +
    " M 60 0 V" + rMe(100, 150) +
    " M 80 0 V" + rMe(100, 130) +
    " M 100 0 V" + rMe(100, 150) +
    " M 120 0 V" + rMe(100, 140) +
    " M 140 0 V" + rMe(100, 130) +
    " M 160 0 V" + rMe(100, 120) +
    " M 180 0 V" + rMe(100, 110)
  );

  floor.setAttribute(
    "d",
    "M 10 200 V" + rMe(95, 100) +
    " M 30 200 V" + rMe(90, 100) +
    " M 50 200 V" + rMe(85, 100) +
    " M 70 200 V" + rMe(70, 100) +
    " M 90 200 V" + rMe(95, 100) +
    " M 110 200 V" + rMe(65, 100) +
    " M 130 200 V" + rMe(70, 100) +
    " M 150 200 V" + rMe(75, 100) +
    " M 170 200 V" + rMe(90, 100) +
    " M 190 200 V" + rMe(95, 100)
  );
}

randomWaves();
document.addEventListener("click", randomWaves);
setInterval(randomWaves, 400);
