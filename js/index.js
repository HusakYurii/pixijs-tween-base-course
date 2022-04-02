import * as PIXI from "./pixi.mjs";
import { User, Admin } from "./prototypes.js";
import { getPrototypeChain } from "./getPrototypeChain.js";

// Create the application
const app = new PIXI.Application({
    view: document.getElementById("canvas"),
});

console.log(
    getPrototypeChain(app.view).join(" => ")
);

console.log(
    getPrototypeChain(new User()).join(" => ")
);

console.log(
    getPrototypeChain(new Admin()).join(" => ")
);