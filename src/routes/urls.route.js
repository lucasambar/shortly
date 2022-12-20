import express from "express"

import { getUrlById, postShorten, redirectUrl } from "../controllers/urls.controller.js"
import { validateUrl } from "../middlewares/urls.middleware.js"
import { validateToken } from "../middlewares/users.middleware.js"

const router = express.Router()

router.post("/urls/shorten", validateToken, validateUrl, postShorten)
router.get("/urls/:id", getUrlById)
router.get("/urls/open/:shortUrl", redirectUrl)

export default router