import { connectionDB } from "../databases/db.js"

export async function postShorten (req, res) {
    const {userId, usersLink, newLink} = req.url

    try {
        await connectionDB.query('INSERT INTO urls ("userId","userLink","newLink","views") VALUES ($1,$2,$3,1)',
        [userId, usersLink, newLink])
        res.status(201).send({shortUrl:newLink})
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}