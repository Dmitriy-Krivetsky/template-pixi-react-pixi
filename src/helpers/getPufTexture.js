import * as PIXI from "pixi.js";

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const imageElement = document.createElement("img");
        imageElement.addEventListener("load", function () {
            resolve(imageElement);
        });
        imageElement.crossOrigin = "anonymous";
        imageElement.src = url;
    });
}

const parseSpriteSheet = async (
    texture,
    json
) => {
    const spritesheet = new PIXI.Spritesheet(texture, json);
    const parsedSpritesheet = await spritesheet.parse(() => spritesheet);

    const frameCount = Object.keys(json.frames).length
    const frameName = (number) => `Explosion_Sequence_A ${number}.png`
    return Array.from({length: frameCount}, (_, i) => parsedSpritesheet[frameName(i + 1)])
}

export const getPufTexture = async () => {
    const spriteSheetURL =
        "https://pixijs.io/examples/examples/assets/spritesheet/mc.png";
    const spriteSheetJSON =
        "https://pixijs.io/examples/examples/assets/spritesheet/mc.json";

    const imageElement = await loadImage(spriteSheetURL);
    const response = await fetch(spriteSheetJSON);
    const ssJSON = await response.json();

    const imageElementTexture = PIXI.Texture.from(imageElement);

    const textures = await parseSpriteSheet(imageElementTexture, ssJSON);

    return {
        image: imageElement,
        json: ssJSON,
        textures
    };
}
