import { userSchema } from "../schemas/user.schema.js"
import {connectionDB} from "../databases/db.js"
import bcrypt from 'bcrypt';


export async function validateUser (req, res, next) {
    const user = req.body

    const validation = userSchema.validate(user, {abortEarly:false})
    if (validation.error) {
        const erros = validation.error.details.map((detail) => detail.message);
        res.status(422).send(erros);
        return;
      }

    try {
        const existance = await connectionDB.query("SELECT * FROM users WHERE email=$1", [user.email])
        if (existance.rowCount !== 0) {res.status(409).send("Email já cadastrado!"); return}

        const password = bcrypt.hashSync(user.password, 10);

        const aux = {
            name: user.name,
            email: user.email,
            password
        }

        req.user = aux
        next()
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}
