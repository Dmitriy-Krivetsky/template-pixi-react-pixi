import {AVERAGE_SPEED, TYPE_DIRECTION} from "../constants";

export const randomDirection = () => Math.random() > 0.5 ? TYPE_DIRECTION.INCREMENT : TYPE_DIRECTION.DECREMENT;
export const getRandomSpeed = () => ({
    x: Math.random() * AVERAGE_SPEED,
    y: Math.random() * AVERAGE_SPEED,
})
export const getRandomDirection = () => ({
    x: randomDirection(),
    y: randomDirection(),
})
export const getRandomScale = () => Math.random() * 1.5 + 0.5;
