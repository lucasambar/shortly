import express from "express"

import { deleteUrl, getUrlById, postShorten, redirectUrl } from "../controllers/urls.controller.js"
import { validateDelete, validateUrl } from "../middlewares/urls.middleware.js"
import { validateToken } from "../middlewares/users.middleware.js"

const router = express.Router()

router.post("/urls/shorten", validateToken, validateUrl, postShorten)
router.get("/urls/:id", getUrlById)
router.get("/urls/open/:shortUrl", redirectUrl)
router.delete("/urls/:id",validateToken, validateDelete, deleteUrl)

export default router