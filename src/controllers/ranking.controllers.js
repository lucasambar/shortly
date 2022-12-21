import {connectionDB} from "../databases/db.js"

export async function getRanking (req, res) {
    try {
        const {rows} = await connectionDB.query
        (`SELECT 
        urls."userId" AS id,
        u.name,
        COUNT(urls.id) AS "linksCount",
        SUM(urls.views) AS "visitCount"
        FROM urls 
        JOIN users u ON u.id = urls."userId"
        GROUP BY u.name, urls."userId"
        ORDER BY u.name DESC 
        LIMIT 10
        `)

        res.send(rows)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}