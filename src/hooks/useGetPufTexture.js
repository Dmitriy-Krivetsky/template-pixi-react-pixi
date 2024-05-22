import {useEffect, useState} from "react";
import {getPufTexture} from "../helpers";

export const useGetPufTexture = () => {
    const [pufTexture, setPufTexture] = useState();

    useEffect(() => {
        getPufTexture().then(setPufTexture);
    }, []);

    return pufTexture;
}