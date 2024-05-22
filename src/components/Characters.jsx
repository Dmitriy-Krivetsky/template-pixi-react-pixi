import {CHARACTER, MAX_CHARACTERS, WINDOW_HEIGHT, WINDOW_WIDTH} from "../constants";
import {checkCollision, getInitCharacter, getNewCharacter, getNewPuf} from "../helpers";
import {AnimatedSprite, Sprite, useTick} from "@pixi/react-pixi";
import {useState} from "react";
import {Counter} from "./Counter";
import {useGetPufTexture} from "../hooks";

export const Characters = () => {
    const [characters, setCharacters] = useState([getInitCharacter()]);
    const [pufs, setPuf] = useState([]);
    const pufTexture = useGetPufTexture();
    const pufCountFrames = pufTexture?.textures.length  || 0;

    useTick((delta) => {
        const newListPuf = [];

        setCharacters((prevCharacters) => {
            let newCharactersList = prevCharacters;
            let sliceCount = 0;

            prevCharacters.forEach((character, index) => {
                const { direction: newDirection, shouldSplit } = checkCollision(character);
                const {position, direction} = character;

                newCharactersList[index] = {
                    ...character,
                    position: {
                        x: position.x + (direction.x * delta * character.speed.x),
                        y: position.y + (direction.y * delta * character.speed.y),
                    },
                    direction: newDirection,
                }

                if (!shouldSplit) return;
                if (!MAX_CHARACTERS && newCharactersList.length <= 2) {
                    newListPuf.push(getNewPuf({ character: newCharactersList[0] }));
                    newCharactersList = []
                    return;
                }

                const listIsFull = newCharactersList.length - sliceCount === MAX_CHARACTERS;
                const listIsOverfull = newCharactersList.length - sliceCount > MAX_CHARACTERS;

                const newCharacter = getNewCharacter({character, newDirection});

                const sliceIncrement = listIsOverfull ? 2 : listIsFull ? 1 : 0;
                sliceCount += sliceIncrement;
                Array.from({length: sliceIncrement}).forEach((_, index) => {
                    const characterOnRemove = newCharactersList[sliceCount + index - 1];
                    newListPuf.push(getNewPuf({ character: characterOnRemove }));
                })
                newCharactersList.push(newCharacter);
            });
            return newCharactersList.slice(sliceCount);
        });

        setPuf((prevPufs) => {
            const updatedPufs = prevPufs
                .filter(puf => puf.counterFrames <= pufCountFrames)
                .map((puf) => ({
                    ...puf,
                    counterFrames: puf.counterFrames + delta,
                }));
            return [...updatedPufs, ...newListPuf];
        });
    });

    return (
        <>
            {
                characters.map(({position, ...character}) => (
                    <Sprite
                        key={character.id}
                        {...position}
                        {...character}
                        width={CHARACTER.width * character.scale}
                        height={CHARACTER.height * character.scale}
                    />
                ))
            }
            {pufTexture &&
                pufs.map(({position, scale, ...puf}) => (
                    <AnimatedSprite
                        key={puf.id}
                        {...puf}
                        {...position}
                        textures={pufTexture?.textures}
                        animationSpeed={.9}
                        anchor={0.5}
                        isPlaying
                    />
                ))
            }
            <Counter
                count={characters.length}
                x={WINDOW_WIDTH / 2}
                y={WINDOW_HEIGHT / 2}
            />
        </>
    )
};