import {FC, useCallback, useEffect, useState} from "react";
import {ExtendedRecipe} from "../../../services/api/recipes/types";
import DifficultyIconDefault from "../../../assets/icons/difficultyIconDefault.svg";
import DifficultyIconEasy from "../../../assets/icons/difficultyIconEasy.svg";
import DifficultyIconMedium from "../../../assets/icons/difficultyIconMedium.svg";
import DifficultyIconHard from "../../../assets/icons/difficultyIconHard.svg";
import {useEvent} from "../../../hooks/use-event";
import {EVENTS} from "../../../constants/app";
import {RecipeBadge} from "./recipe-badge";

export const DifficultyBadge: FC = (props) => {
    const images: {[T in ExtendedRecipe['difficulty'] | "default"]: string} = {
        "default": DifficultyIconDefault,
        "easy": DifficultyIconEasy,
        "medium": DifficultyIconMedium,
        "hard": DifficultyIconHard,
    }

    const colors: {[T in ExtendedRecipe['difficulty'] | "default"]: string} = {
        "default": "colors.text.primary",
        "easy": "colors.easy",
        "medium": "colors.medium",
        "hard": "colors.hard",
    }

    const [state, setState] = useState<ExtendedRecipe['difficulty'] | "default">("default");
    const {listen, omit} = useEvent();

    const ContentLoadedCallback = useCallback((e) => {
        setState(e.detail.difficulty);
    }, []);

    useEffect(() => {
        listen(EVENTS.RECIPE_LOADED, ContentLoadedCallback);
        return () => omit(EVENTS.RECIPE_LOADED, ContentLoadedCallback);
    }, []);

    return (
        <RecipeBadge
            Icon={() => <img src={images[state]} alt=""/>}
            colorText={colors[state]}
            {...props}
        />
    )
}
