import express from "express";
import cors from "cors"
import dotenv from "dotenv"

import usersRoute from "./routes/users.route.js"
import urlsRoute from "./routes/urls.route.js"
import rankingRoute from "./routes/ranking.route.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use(usersRoute)
app.use(urlsRoute)
app.use(rankingRoute)

const port =  process.env.PORT || 4000
app.listen(port, () => console.log("Projeto rodando na porta " + port))

