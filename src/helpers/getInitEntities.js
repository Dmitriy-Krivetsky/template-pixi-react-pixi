import {CHARACTER, PUF_ACTION, WINDOW_HEIGHT, WINDOW_WIDTH} from "../constants";
import {getRandomDirection, getRandomScale, getRandomSpeed, randomDirection} from "./random";

export const getInitCharacter = () => ({
    id: 1,
    image: CHARACTER.img,
    position: {
        x: WINDOW_WIDTH / 2,
        y: WINDOW_HEIGHT / 2,
    },
    direction: getRandomDirection(),
    speed: getRandomSpeed(),
    scale: getRandomScale(),
});

export const getNewCharacter = ({ character, newDirection }) => {
    const {x: xDirection, y: yDirection} = character.direction;

    return {
        ...character,
        direction: {
            x: xDirection === newDirection.x ? xDirection * randomDirection() : newDirection.x,
            y: yDirection === newDirection.y ? yDirection * randomDirection() : newDirection.y,
        },
        tint: Math.random() * 0xffffff,
        id: Math.random() * 1000,
        speed: getRandomSpeed(),
        scale: getRandomScale(),
    }
}

export const getNewPuf = ({ character }) => ({
    position: character.position,
    counterFrames: 0,
    id: Math.random() * 1000,
    scale: character.scale,
    rotation: Math.random() * Math.PI,
    width: PUF_ACTION.width * character.scale,
    height: PUF_ACTION.height * character.scale,
})