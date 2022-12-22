import { connectionDB } from "../databases/db.js"

export function urlById (id) {
    return connectionDB.query('SELECT * FROM urls WHERE id=$1',[id])
}

export function insertShorten (userId, usersLink, newLink, cratedAt) {
    return connectionDB.query('INSERT INTO urls ("userId","userLink","newLink","views","createdAt") VALUES ($1,$2,$3,0,$4)',
    [userId, usersLink, newLink, cratedAt])
}

export function shortToUrl (short) {
    return connectionDB.query('SELECT * FROM urls WHERE "newLink"=$1',[short])
}

export function updateViews (views, short) {
    connectionDB.query('UPDATE urls SET views=$1 WHERE "newLink"=$2',
        [views, short])
}

export function deleteById (id) {
    return connectionDB.query('DELETE FROM urls WHERE id=$1',[id])
}