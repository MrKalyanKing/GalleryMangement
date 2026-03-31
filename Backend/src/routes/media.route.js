import express from "express"
import multer from "multer"
import path from "path"
import { deleteMedia, getMedia, uploadMedia } from "../controllers/mediaControllers.js"



const MediaRouter = express.Router()



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file.mimetype)
        if (file.mimetype.startsWith("image")) {
            cb(null, "uploads/image")
        } else if (file.mimetype.startsWith("video/")) {
            cb(null, "uploads/video")
        } else {
            cb(new Error("In valid file "))
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })


MediaRouter.post("/upload", upload.single("file"), uploadMedia)

MediaRouter.get("/media/", getMedia)

MediaRouter.delete("/media/:id", deleteMedia)

export default MediaRouter