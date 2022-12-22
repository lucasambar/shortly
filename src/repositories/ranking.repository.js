import { connectionDB } from "../databases/db.js"


export function ranking () {
    return connectionDB.query
    (`SELECT 
    urls."userId" AS id,
    u.name,
    COUNT(urls.id) AS "linksCount",
    SUM(urls.views) AS "visitCount"
    FROM urls 
    JOIN users u ON u.id = urls."userId"
    GROUP BY u.name, urls."userId"
    ORDER BY SUM(urls.views) DESC 
    LIMIT 10
    `)
}