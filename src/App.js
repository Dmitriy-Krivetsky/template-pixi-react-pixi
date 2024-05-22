import "./styles.css";
import {Stage} from "@pixi/react-pixi";
import {Characters} from "./components/Characters";
import {WINDOW_HEIGHT, WINDOW_WIDTH} from "./constants";

export const App = () => (
    <Stage
        width={WINDOW_WIDTH}
        height={WINDOW_HEIGHT}
        options={{
            backgroundColor: 0x012b30,
            antialias: true
        }}
    >
        <Characters />
    </Stage>
);
