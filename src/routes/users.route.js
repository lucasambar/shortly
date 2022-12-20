import express from "express"
import { signup } from "../controllers/users.controller.js"
import { validateUser } from "../middlewares/users.middleware.js"

const router = express.Router()

router.post("/signup", validateUser, signup)

export default router