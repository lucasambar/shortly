import express from "express"
import { signin, signup } from "../controllers/users.controller.js"
import { confirmPassword, validateUser } from "../middlewares/users.middleware.js"

const router = express.Router()

router.post("/signup", validateUser, signup)
router.post("/signin", confirmPassword, signin)

export default router