import { connectionDB } from "../databases/db.js"
import { v4 as uuid } from 'uuid';


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

export async function signin (req,res) {
    const {userId} = req.userId
    const token = uuid();

    try {
        await connectionDB.query('INSERT INTO sessions ("userId", token) VALUES ($1,$2)', [userId, token])
        res.status(200).send({token: token})
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}