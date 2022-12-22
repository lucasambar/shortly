import { connectionDB } from "../databases/db.js"
import { v4 as uuid } from 'uuid';
import dayjs from "dayjs";


export async function signup (req, res) {
    const {name, email, password} = req.user
    const createdAt = dayjs()

    try {
        await connectionDB.query('INSERT INTO users (name, email, password, "createdAt") VALUES ($1,$2,$3,$4);',
        [name, email, password, createdAt])
        res.sendStatus(201)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}

export async function signin (req,res) {
    const {userId} = req.userId
    const token = uuid();
    const createdAt = dayjs()

    try {
        await connectionDB.query('INSERT INTO sessions ("userId", token, "createdAt") VALUES ($1,$2,$3)', [userId, token, createdAt])
        res.status(200).send({token: token})
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}

export async function getUsersUrl (req, res) {
    const {id, name} = req.user
    
    try {
        const {rows} = await connectionDB.query('SELECT SUM(views) AS "visitCount" FROM urls WHERE "userId"=$1',[id])
        const visitCount = Number(rows[0].visitCount)

        const urlsDB = await connectionDB.query
            (`SELECT id, 
            "newLink" AS "shortUrl",
            "userLink" AS "url",
            "views" AS "visitCount" 
            FROM urls
            WHERE "userId"=$1`,[id])
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