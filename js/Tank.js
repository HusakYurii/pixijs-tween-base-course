import { Container, AnimatedSprite, Texture, Sprite } from "./pixi.mjs";

export const createAnimatedSprite = (textureNames, position = { x: 0, y: 0 }, anchor = { x: 0.5, y: 0.5 }) => {
    const textures = textureNames.map(name => Texture.from(name));

    const animatedSprite = new AnimatedSprite(textures);
    animatedSprite.position.copyFrom(position);
    animatedSprite.anchor.copyFrom(anchor);
    return animatedSprite;
};

export const createSprite = (textureName, position = { x: 0, y: 0 }, anchor = { x: 0.5, y: 0.5 }) => {
    const sprite = new Sprite(Texture.from(textureName));
    sprite.position.copyFrom(position);
    sprite.anchor.copyFrom(anchor);
    return sprite;
};

export class Tank {
    constructor() {
        this._view = new Container();

        this._bodyContainer = new Container();
        this._view.addChild(this._bodyContainer);

        /*===========================================
        1) move the left tracks to the bodyContainer;
        2) move the right tracks to the bodyContainer;
        3) move hull to the bodyContainer;
        4) remove the reference to the hull object, we don't need to store it as a private variableж
        5) use the rotateBodyBy method to check it the body rotates as it was shown in the vide
        */
        this._tracksLeft = createAnimatedSprite(["TrackСFrame1", "TrackСFrame2"], { x: 0, y: -80 });
        this._tracksRight = createAnimatedSprite(["TrackСFrame1", "TrackСFrame2"], { x: 0, y: 80 });
        this._tracksLeft.animationSpeed = 0.25;
        this._tracksRight.animationSpeed = 0.25;

        this._view.addChild(this._tracksLeft, this._tracksRight);

        this._hull = new Sprite(Texture.from("HeavyHullB"));
        this._hull.anchor.set(0.5);

        this._view.addChild(this._hull);


        /// ===========================================

        this._towerContainer = new Container();
        this._view.addChild(this._towerContainer);

        this._towerContainer.addChild(createSprite("HeavyGunB", { x: 140, y: -27 }));
        this._towerContainer.addChild(createSprite("HeavyGunB", { x: 160, y: 29 }));

        this._towerContainer.addChild(createSprite("GunConnectorD", { x: 80, y: 0 }));

        this._towerContainer.addChild(createSprite("HeavyTowerB"));

    }

    get view() {
        return this._view;
    }

    rotateTowerBy(angle) {
        this._towerContainer.rotation += angle;
    }

    rotateBodyBy(angle) {
        this._bodyContainer.rotation += angle;
    }

    startTracks() {
        this._tracksLeft.play();
        this._tracksRight.play();
    }

    stopTracks() {
        this._tracksLeft.stop();
        this._tracksRight.stop();
    }
}