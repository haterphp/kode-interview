import axios, {AxiosResponse} from "axios";

export const $app = axios.create({
    baseURL: process.env.REACT_APP_API_HOST
});

export const makeRequest = async <Response = unknown, Dto = unknown>(
    request: (props: Dto) => Promise<AxiosResponse<Response>>,
    args?: Dto
) => {
    try {
        const response = await request(args as Dto);
        return response.data;
    } catch (e) {
        throw e;
    }
}

/**
 * Тут могли бы быть интерсепторы, но не в этом проекте :(
 */
