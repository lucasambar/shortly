import { connectionDB } from "../databases/db.js"

export function userByEmail (email) {
    return connectionDB.query("SELECT * FROM users WHERE email=$1", [email])
}

export function sessionByToken (token) {
    return connectionDB.query('SELECT * FROM sessions WHERE token=$1',[token])
}

export function userById (id) {
    return connectionDB.query('SELECT * FROM users WHERE id=$1',[id])
}

export function insertUser (name, email, password, createdAt) {
    return connectionDB.query('INSERT INTO users (name, email, password, "createdAt") VALUES ($1,$2,$3,$4);',
    [name, email, password, createdAt])
}

export function insertSession (userId, token, createdAt) {
    return connectionDB.query('INSERT INTO sessions ("userId", token, "createdAt") VALUES ($1,$2,$3)', [userId, token, createdAt])
}

export function sumViews (id) {
    return connectionDB.query('SELECT SUM(views) AS "visitCount" FROM urls WHERE "userId"=$1',[id])
}

export function urlsByUserId (id) {
    return connectionDB.query
    (`SELECT id, 
    "newLink" AS "shortUrl",
    "userLink" AS "url",
    "views" AS "visitCount" 
    FROM urls
    WHERE "userId"=$1`,[id])
}