import express from "express"

import { postShorten } from "../controllers/urls.controller.js"
import { validateUrl } from "../middlewares/urls.middleware.js"
import { validateToken } from "../middlewares/users.middleware.js"

const router = express.Router()

router.post("/urls/shorten", validateToken, validateUrl, postShorten)

export default router