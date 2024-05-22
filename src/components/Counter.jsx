import {TextStyle} from "pixi.js";
import {Text} from "@pixi/react-pixi";
import {memo} from "react";

export const Counter = memo(({count, ...otherProps}) => {
    return (
        <Text
            text={count}
            anchor={0.5}
            {...otherProps}
            style={
                new TextStyle({
                    align: 'center',
                    fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                    fontSize: 50,
                    fontWeight: '400',
                    // fill: ['#ffffff', '#00ff99'], // gradient
                    fill: ['#ffffff'], // gradient
                    // stroke: '#01d27e',
                    strokeThickness: 5,
                    letterSpacing: 10,
                    dropShadow: true,
                    // dropShadowColor: '#ccced2',
                    dropShadowBlur: 4,
                    dropShadowAngle: Math.PI / 6,
                    dropShadowDistance: 6,
                    wordWrap: true,
                    wordWrapWidth: 440,
                })
            }
        />
    );
});