export default function processImage(src) {
  if (src.includes("=w")) {
    var main = src.split("=w")[0];
    return {
      default: main,
      "1920x1080": main + "=w1920-h1080-k-no",
      "1280x720": main + "=w1280-h720-k-no",
      "640x360": main + "=w640-h360-k-no",
      "180x120": main + "=w180-h120-k-no",
    };
  } else {
    return {
      default: src,
    };
  }
}
