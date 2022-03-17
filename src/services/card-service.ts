import moment from "moment";
import {ExtendedRecipe} from "./api/recipes/types";

export const parseTimeToCard = (time: number) => {
    const d = moment.duration(time * 1000);
    const minutes = d.minutes();
    const hours = moment.duration(time * 1000).asHours();
    if(hours >= 1) return hours + " hours";
    else if(minutes >= 1) return minutes + " min"
    return d;
}

export const useGetFields = (recipe: ExtendedRecipe | undefined) => {

}
