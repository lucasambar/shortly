import { nanoid } from "nanoid";
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

