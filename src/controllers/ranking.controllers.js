import {connectionDB} from "../databases/db.js"
import { ranking } from "../repositories/ranking.repository.js"

export async function getRanking (req, res) {
    try {
        const {rows} = await ranking()

        res.send(rows)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}