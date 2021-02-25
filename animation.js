let sketcher = document.querySelector(".sketcher");
let sketcherInfo = sketcher.getBoundingClientRect();
let x;
let y;
let yCopy;
let width = sketcherInfo.width;
width = width - 1500;
let appendTo = document.querySelector(".section1");
let opacity = 0.9;
let opacityCopy = opacity;
let yVel = 3.5;
let transparency = 0.015;
var i = 0;
sketcher.addEventListener("click", (e) => {
  x = e.x - 100;
  y = e.y - 50;
  i++;
  opacity = opacityCopy;
  var sketcherCopy = document.createElement("img");
  sketcherCopy.src = "/images/sketch.png";
  sketcherCopy.classList.add("sketcher");
  sketcherCopy.classList.add(`copy`);
  appendTo.appendChild(sketcherCopy);
  sketcherCopy.style.top = y + "px";
  sketcherCopy.style.left = x + "px";
  sketcherCopy.style.opacity = `${opacity}`;
  sketcherCopy.style.width = width + "px";

  function draw() {
    y = y - yVel;
    opacity = opacity - transparency;
    sketcherCopy.style.opacity = `${opacity}`;
    sketcherCopy.style.top = y + "px";
    if (opacity < 0) {
      sketcherCopy.remove();
      return 0;
    }
    requestAnimationFrame(draw);
  }
  draw();
});
