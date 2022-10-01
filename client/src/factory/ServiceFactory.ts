import HttpClient from "../infra/http/httpClient";
import BoardService from "../service/BoardService";

export default class ServiceFactory {
    constructor(readonly httpClient: HttpClient, readonly baseUrl: string){
    }

    createBoardService(){
        return new BoardService(this.httpClient, this.baseUrl)
    }
}