import { connectionDB } from "../databases/db.js"

export async function signup (req, res) {
    const {name, email, password} = req.user
    
    try {
        await connectionDB.query('INSERT INTO users (name, email, password) VALUES ($1,$2,$3);',
        [name, email, password])
        res.sendStatus(201)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}