import * as PIXI from "./pixi.mjs";
import { assetsMap } from "./assetsMap.js";

// Create the application
const app = new PIXI.Application({
    width: 800,
    height: 800,
    backgroundColor: 0xc2c2c2,
    view: document.getElementById("canvas"),
});

const runGame = () => {
    console.log("LOADED!");
};

assetsMap.sprites.forEach((value) => app.loader.add(value));
app.loader.load(runGame);
