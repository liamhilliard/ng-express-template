import { Request, Response } from "express";
import express from 'express'
import helmet from 'helmet'
import dotenv from 'dotenv'

const config = dotenv.config()
if(config.error){
    throw config.error
}

const PORT:number = parseInt(process.env.PORT as string)

const app = express()
app.use(express.json())
app.use(helmet())

app.get('/', (req: Request, res: Response) => {
    res.send(`Express + TS`)
})
if(!module.parent){
    app.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`)
    })
}

export default app