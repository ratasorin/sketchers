let sketcher = document.querySelector(".sketcher");
let sketcherInfo = sketcher.getBoundingClientRect();
let appendTo = document.querySelector(".section1");
var sketcherArr = [];
const sketcherClass = function (x, y, src, opacity, width, yVel, transparency) {
  this.src = src;
  this.x = x;
  this.y = y;
  this.opacity = opacity;
  this.width = width;
  this.yVel = yVel;
  this.transparency = transparency;
};
sketcherClass.prototype = {
  sketcherCopy: undefined,
  initializeOnClick() {
    this.sketcherCopy = document.createElement("img");
    this.sketcherCopy.src = this.src;
    this.sketcherCopy.classList.add("sketcher");
    this.sketcherCopy.classList.add(`copy`);
    appendTo.appendChild(this.sketcherCopy);
    this.sketcherCopy.style.top = this.y + "px";
    this.sketcherCopy.style.left = this.x + "px";
    this.sketcherCopy.style.opacity = `${this.opacity}`;
    this.sketcherCopy.style.width = this.width + "px";
  },
  updateThisSketcher() {
    this.y = this.y - this.yVel;
    this.opacity = this.opacity - this.transparency;
    this.sketcherCopy.style.opacity = `${this.opacity}`;
    this.sketcherCopy.style.top = this.y + "px";
    if (this.opacity <= 0) {
      this.sketcherCopy.remove();
      this.opacity = 0;
    }
  },
};
sketcher.addEventListener("click", (e) => {
  sketcherArr.push(
    new sketcherClass(
      e.x,
      e.y,
      "/images/sketch.png",
      0.9,
      sketcherInfo.width - 1500,
      3.5,
      0.015
    )
  );
  sketcherArr[sketcherArr.length - 1].initializeOnClick();
});

function draw() {
  for (var i = sketcherArr.length - 1; i >= 0; i--) {
    sketcherArr[i].updateThisSketcher();
  }
  requestAnimationFrame(draw);
}
draw();
