import {CHARACTER, TYPE_DIRECTION, WINDOW_HEIGHT, WINDOW_WIDTH} from "../constants";

export const  checkCollision = (character) => {
    const {x: xPosition, y: yPosition} = character.position;
    const {x: xDirection, y: yDirection} = character.direction;

    let newDirection = {...character.direction};
    if (xPosition <= 0 && xDirection === TYPE_DIRECTION.DECREMENT) {
        newDirection.x = TYPE_DIRECTION.INCREMENT;
    }
    if (xPosition + CHARACTER.width * character.scale >= WINDOW_WIDTH && xDirection === TYPE_DIRECTION.INCREMENT) {
        newDirection.x = TYPE_DIRECTION.DECREMENT;
    }
    if (yPosition <= 0 && yDirection === TYPE_DIRECTION.DECREMENT) {
        newDirection.y = TYPE_DIRECTION.INCREMENT;
    }
    if (yPosition + CHARACTER.height * character.scale >= WINDOW_HEIGHT && yDirection === TYPE_DIRECTION.INCREMENT) {
        newDirection.y = TYPE_DIRECTION.DECREMENT;
    }
    const shouldSplit = newDirection.x !== xDirection || newDirection.y !== yDirection;
    return { direction: newDirection, shouldSplit };
};