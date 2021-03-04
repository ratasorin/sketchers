/**
 * **SketcherConstructor** is the type of the parameter
 * object passed to the Sketcher constructor.
 *
 * The parameters are described as following:
 * * _x_: the position of the Sketcher on the horizontal axis,
 *   relative to the target.
 * * _y_: the position of the Sketcher on the vertical axis,
 *   relative to the target.
 * * _target_: the node to append the Sketcher DOM element to
 * * _opacity_ (default: 0.9): the starting point of the opacity
 * * _velocity_ (default: 0.35): the amount of pixels to move
 *   on each update
 * * _transparency_ (default: 0.015): the amount of opacity to
 *   subtract on each update
 *
 * @type {{
 *   x: number,
 *   y: number,
 *   target: Node,
 *   opacity?: number,
 *   velocity?: number,
 *   transparency?: number,
 * }}
 */
export var SketcherConstructor;

/**
 * **defaults** holds the implicit values of the
 * Sketcher constructor parameters.
 *
 * @type {SketcherConstructor}
 */
const constructorDefaults = {
  opacity: 0.9,
  velocity: 1,
  transparency: 0.015,
};

/**
 * **IMAGE_SOURCE** is the location of the Sketcher image.
 */
const IMAGE_SOURCE = "/images/sketch.png";

/**
 * **FRAME_DURATION** is the duration of a frame, in milliseconds.
 */
const FRAME_DURATION = 1000 / 60;

export default class Sketcher {
  /**
   * @param {SketcherConstructor} props The constructor parameters
   */
  constructor(props) {
    const { x, y, target, opacity, velocity, transparency } = {
      ...constructorDefaults,
      ...props,
    };

    this.velocity = velocity;
    this.transparency = transparency;

    const element = new Image();
    element.classList.add("sketcher", "copy");
    element.src = IMAGE_SOURCE;
    element.style.top = `${Math.floor(y)}px`;
    element.style.left = `${Math.floor(x)}px`;
    element.style.opacity = opacity;
    this.element = target.appendChild(element);
  }

  /**
   * **animate** animates the sketcher.
   *
   * @returns {Promise<void>} The animation ended.
   */
  animate() {
    return new Promise((resolve) => {
      /**
       * **prev** is the previos timestamp at which
       * requestAnimationFrame was called.
       *
       * @type {number}
       */
      let prev;
      /**
       * **handle** is the requestAnimationFrame frame ID,
       * used to cancel the animation.
       *
       * @type {number}
       */
      let handle;
      /**
       * @param {number} timestamp
       */
      const frame = (timestamp) => {
        // Find the percentage of this.velocity and this.transparency
        // to apply.
        let progress = 1;
        if (prev) {
          progress = (timestamp - prev) / FRAME_DURATION;
        }
        prev = timestamp;
        const top =
          parseFloat(this.element.style.top) - this.velocity * progress;
        const opacity =
          parseFloat(this.element.style.opacity) - this.transparency * progress;
        if (opacity <= 0) {
          // the element is invisible now, remove
          this.element.remove();
          resolve();
        } else {
          this.element.style.top = `${Math.floor(top)}px`;
          this.element.style.opacity = opacity;
          handle = requestAnimationFrame(frame);
        }
      };

      handle = requestAnimationFrame(frame);
    });
  }
}

const defaults = {
  duration: 1000,
  distance: 50,
  opacity: 0.9,
};

/**
 * **sketcher** creates and animates an image
 * with a Sketcher.
 *
 * @param {{
 *   x: number,
 *   y: number,
 *   target: Node,
 *   duration?: number,
 *   distance?: number,
 *   opacity?: number,
 * }} props The position of the image, the target
 * to append to, the animation duration, the
 * animation travel distance in pixels, and the starting
 * opacity value.
 * @returns {Animation} The sketcher's animation handler.
 */
export function sketcher(props) {
  const { x, y, target, duration, distance, opacity } = {
    ...defaults,
    ...props,
  };

  const image = new Image();
  image.classList.add("sketcher", "copy");
  image.src = IMAGE_SOURCE;

  const animation = target.appendChild(image).animate(
    [
      { opacity, left: `${x}px`, top: `${y}px` },
      { opacity: 0, left: `${x}px`, top: `${y - distance}px` },
    ],
    { duration }
  );
  animation.addEventListener("finish", () => image.remove());
  return animation;
}
