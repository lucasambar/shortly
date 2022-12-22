import { connectionDB } from "../databases/db.js"
import { v4 as uuid } from 'uuid';
import dayjs from "dayjs";
import { insertSession, insertUser, sumViews, urlsByUserId } from "../repositories/users.repository.js";


export async function signup (req, res) {
    const {name, email, password} = req.user
    const createdAt = dayjs()

    try {
        await insertUser(name, email, password, createdAt)
        res.sendStatus(201)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}

export async function signin (req,res) {
    const {userId, name} = req.userId
    const token = uuid();
    const createdAt = dayjs()

    try {
        await insertSession(userId, token, createdAt)
        res.status(200).send({token: token, name: name})
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}

export async function getUsersUrl (req, res) {
    const {id, name} = req.user
    
    try {
        const {rows} = await sumViews(id)
        const visitCount = Number(rows[0].visitCount)

        const urlsDB = await urlsByUserId(id)
        const shortenedUrls = urlsDB.rows
        
        const response = {
            id, name, visitCount, shortenedUrls
        }
        res.send(response)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }


}
