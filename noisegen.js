// noisegen.js
import { Noise } from 'https://cdn.skypack.dev/noisejs';

export const width = 128;
export const height = 128;
const scale = 0.05;
const speed = 0.01;

const canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');
const imageData = ctx.createImageData(width, height);
const noise = new Noise(Math.random());

let z = 0;

export function renderNoiseFrame(callback) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = noise.perlin3(x * scale, y * scale, z);
      const brightness = Math.floor((value + 1) * 127.5);
      const index = (y * width + x) * 4;
      imageData.data[index] = brightness;
      imageData.data[index + 1] = brightness;
      imageData.data[index + 2] = brightness;
      imageData.data[index + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  z += speed;

  callback(canvas);

  requestAnimationFrame(() => renderNoiseFrame(callback));
}