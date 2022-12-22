import dayjs from "dayjs"
import { deleteById, insertShorten, shortToUrl, updateViews, urlById } from "../repositories/urls.repository.js"

export async function postShorten (req, res) {
    const {userId, usersLink, newLink} = req.url
    const cratedAt = dayjs()

    try {
        await insertShorten(userId, usersLink, newLink, cratedAt)
        res.status(201).send({shortUrl:newLink})
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}

export async function getUrlById (req, res) {
    const id = req.params.id

    try {
        const urlDB = await urlById(id)
        if (urlDB.rowCount === 0) return res.sendStatus(404)

        const url = urlDB.rows[0]
        res.status(200).send({
            id, 
            shortUrl: url.newLink, 
            url: url.userLink
        })
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}

export async function redirectUrl (req, res) {
    const short = req.params.shortUrl

    try {
        const urlDB = await shortToUrl(short)
        if (urlDB.rowCount == 0) return res.sendStatus(404)

        const url = urlDB.rows[0]
        url.views ++

        await updateViews(url.views, short)

        res.status(200).redirect(url.userLink)
        
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}

export async function deleteUrl (req, res) {
    const id = req.params.id

    try {
        await deleteById(id)
        res.sendStatus(204)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}