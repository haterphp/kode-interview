import {$app} from "../api";
import {GetAllRecipesResponse, GetRecipeDto, GetRecipeResponse, Recipe} from "./types";

const Actions = {
    async getAll() {
        return await $app.get<GetAllRecipesResponse>('list.json');
    },
    async getById({ id }: GetRecipeDto) {
        return await $app.get<GetRecipeResponse>(`detail_${id}.json`);
    }
}

export default Actions;
