import { sketcher } from "./sketcher.js";

const target = document.querySelector(".sketcher-container");

target.addEventListener("mousedown", (e) => {
  sketcher({
    x: e.offsetX,
    y: e.offsetY,
    target,
  });
});
