import { nanoid } from "nanoid";
import { connectionDB } from "../databases/db.js";
import { urlSchema } from "../schemas/urls.schema.js";

export async function validateUrl (req, res, next) {
    const body = req.body
    const {id} = req.user

    const validation = urlSchema.validate(body, {abortEarly:false})
    if (validation.error) {
        const erros = validation.error.details.map((detail) => detail.message);
        res.status(422).send(erros);
        return;
      }

    const aux = {
        userId: id,
        usersLink: body.url, 
        newLink: nanoid()
    }

    req.url = aux
    next()
}

export async function validateDelete (req, res, next) {
    const user = req.user
    const urlId = req.params.id

    try {
        const urlDB = await connectionDB.query('SELECT * FROM urls WHERE id=$1',[urlId])
        if (urlDB.rowCount === 0) return res.status(404).send("URL não existe")
        const url = urlDB.rows[0]

        if (url.userId !== user.id) return res.sendStatus(401)

        next()
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}
