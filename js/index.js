import { Application, Graphics, Rectangle } from "./pixi.mjs";
import { assetsMap } from "./assetsMap.js";
import { Tank } from "./Tank.js";
import { TweenManager, Tween } from "./Tween.js"

// Create the application
const app = new Application({
    width: 800,
    height: 800,
    backgroundColor: 0xc2c2c2,
    view: document.getElementById("canvas"),
});

const runGame = () => {
    const marker = new Graphics();
    marker.beginFill(0xff0000, 1);
    marker.drawCircle(0, 0, 5);
    marker.endFill();


    const tank = new Tank();
    // don't render the tank
    tank.view.visible = false;
    app.stage.addChild(tank.view);
    app.stage.addChild(marker);

    app.stage.position.set(800 / 2, 800 / 2);

    window["TANK"] = tank;

    const onPointerDown = ({ data }) => {
        console.log(data);

        const positions = data.getLocalPosition(app.stage);
        app.stage.addChild(new Graphics().beginFill(0xff0000, 1).drawCircle(positions.x, positions.y, 5).endFill());
    };

    app.stage.on("pointerdown", onPointerDown, undefined);
    app.stage.interactive = true;
    app.stage.interactiveChildren = false;
    app.stage.hitArea = new Rectangle(-400, -400, 800, 800);

    const rectangle = new Graphics().beginFill(0x000000, 1).drawRect(0, 0, 100, 100).endFill();
    app.stage.addChild(rectangle);


    // let lastTime = 0;

    // app.ticker.add(() => {
    // const delta = (app.ticker.lastTime - lastTime) ; <= calculate  deltaMS
    // const delta = (app.ticker.lastTime - lastTime) / (1000 / 60) <= calculate normalized value deltaTime
    // lastTime = app.ticker.lastTime;
    // console.log(delta);
    // console.log(app.ticker.lastTime);
    // console.log(app.ticker.deltaTime);
    // console.log(app.ticker.deltaMS);
    // });


    // let value = 0;
    // const stepValue = 0.02;
    // const offset = 200;
    // app.ticker.add(() => {

    //     rectangle.alpha = Math.abs(Math.cos(value)); change the alpha from 1 to 0 and back
    //     rectangle.position.x = offset * Math.cos(value); change the offset from -200 to 200
    //     value += stepValue;
    // });

    const tweenManager = new TweenManager(app.ticker);

    window["testTweens"] = {
        moveTo(duration, position) {
            tweenManager.createTween(rectangle, duration, position);
        },
        rotateTo(duration, rotationData) {
            tweenManager.createTween(rectangle, duration, rotationData);
        },
        moveAndRotate(moveDuration, position, rotationDuration, rotationData) {
            this.moveTo(moveDuration, position);
            this.rotateTo(rotationDuration, rotationData);
        }
    };
};

assetsMap.sprites.forEach((value) => app.loader.add(value.name, value.url));
app.loader.load(runGame);