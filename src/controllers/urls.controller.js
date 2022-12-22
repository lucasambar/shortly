import dayjs from "dayjs"
import { connectionDB } from "../databases/db.js"

export async function postShorten (req, res) {
    const {userId, usersLink, newLink} = req.url
    const cratedAt = dayjs()

    try {
        await connectionDB.query('INSERT INTO urls ("userId","userLink","newLink","views","createdAt") VALUES ($1,$2,$3,0,$4)',
        [userId, usersLink, newLink, cratedAt])
        res.status(201).send({shortUrl:newLink})
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}

export async function getUrlById (req, res) {
    const id = req.params.id

    try {
        const urlDB = await connectionDB.query('SELECT * FROM urls WHERE id=$1',[id])
        if (urlDB.rowCount === 0) return res.sendStatus(404)

        const url = urlDB.rows[0]
        res.status(200).send({id, 
            shortUrl:url.newLink, 
            url:url.userLink})
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}

export async function redirectUrl (req, res) {
    const short = req.params.shortUrl

    try {
        const urlDB = await connectionDB.query('SELECT * FROM urls WHERE "newLink"=$1',[short])
        if (urlDB.rowCount == 0) return res.sendStatus(404)

        const url = urlDB.rows[0]
        url.views ++

        await connectionDB.query('UPDATE urls SET views=$1 WHERE "newLink"=$2',
        [url.views, short])

        res.status(200).redirect(url.userLink)
        
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}

export async function deleteUrl (req, res) {
    const id = req.params.id

    try {
        await connectionDB.query('DELETE FROM urls WHERE id=$1',[id])
        res.sendStatus(204)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}