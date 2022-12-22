import { userSchema } from "../schemas/user.schema.js"
import {connectionDB} from "../databases/db.js"
import bcrypt from 'bcrypt';
import { sessionByToken, userByEmail, userById } from "../repositories/users.repository.js";


export async function validateUser (req, res, next) {
      const user = req.body

    const validation = userSchema.validate(user, {abortEarly:false})
    if (validation.error) {
        const erros = validation.error.details.map((detail) => detail.message);
        res.status(422).send(erros);
        return;
      }

    try {
        const existance = await userByEmail(user.email)
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

export async function confirmPassword (req, res, next) {
    const {email, password} = req.body
    if (!email || !password) {res.status(422).send("Verifique se preencheu email e senha e tente novamente."); return}

    try {
        const existance = await userByEmail(email)
        if (existance.rowCount === 0) {res.status(401).send("Usuário não encontrado, tente novamente!"); return}
        
        const user = existance.rows[0]
        const crypt = bcrypt.compareSync(password, user.password); 

        if (!crypt) {res.status(401).send("Senha inválida, tente novamente!"); return}

        req.userId = {userId:user.id, name:user.name}
        next()
    } catch (erro){
      res.sendStatus(500)
      console.log(erro)   
    }
}

export async function validateToken (req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(!token) return res.sendStatus(401);

    try {
        const session = await sessionByToken(token)
        if (session.rowCount == 0) return res.status(401).send("Sessão não encontrada.")
        const userId = session.rows[0].userId

        const userDB = await userById(userId)
        if (userDB.rowCount == 0) return res.status(401).send("Usuário não encontrado")
        const user = userDB.rows[0]

        req.user = user
        next()
        
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}
