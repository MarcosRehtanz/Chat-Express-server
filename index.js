import express, { response } from 'express'
import cors from 'cors'
import 'dotenv/config'
const app = express()
const port = process.env.PORT ?? 3000

app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }))
app.get('/', (req, res) => {
    res.status(200).json('Hello Word!')
})

app.listen(port, () => {
    console.log(`Server listen on port ${port}`);
})