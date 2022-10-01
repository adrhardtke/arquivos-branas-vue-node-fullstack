import axios from 'axios'
import HttpClient from "./httpClient";

export default class AxiosAdapter implements HttpClient {
    constructor() {

    }

    async get(url: string): Promise<any> {
        const response = await axios({
            url,
            method: 'get'
        })
        return response.data
    }
}