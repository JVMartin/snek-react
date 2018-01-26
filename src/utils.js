export const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

export const coordsEqual = (coordsA, coordsB) =>
    (coordsA.x === coordsB.x && coordsA.y === coordsB.y);
