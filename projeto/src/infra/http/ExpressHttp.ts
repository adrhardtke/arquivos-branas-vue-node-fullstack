import Http from "./Http";
import express from 'express'

export default class ExpressHttp implements Http {
    app: any

    constructor(){
        this.app = express()
    }
    
    listen(port: number): void {
        this.app.listen(port, () => {
            console.log("Server start in port "+port)
        })
    }
    
    addRoute(method: string, url: string, callback: Function): void {
        this.app[method](url, async (req: any, res: any) => {
            const output = await callback(req.params, req.body)
            res.json(output)
        })
        
    }
}