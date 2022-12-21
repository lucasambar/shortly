import express from "express"
import { getUsersUrl, signin, signup } from "../controllers/users.controller.js"
import { confirmPassword, validateToken, validateUser } from "../middlewares/users.middleware.js"

const router = express.Router()

router.post("/signup", validateUser, signup)
router.post("/signin", confirmPassword, signin)
router.get("/users/me", validateToken, getUsersUrl)

export default router