import fs from "fs"
import path from "path"


let media = []
const uploadMedia = async (req, res) => {
    try {
        console.log(req.file)
        if (!req.file) {
            return res.status(400).json({
                sucees: false,
                msg: "No file uploaded"
            })
        }
        const allowedtype = ["image", "video"]
        const type = req.file.mimetype.split("/")[0]

        if (!allowedtype.includes(type)) {
            return res.status(400).json({
                sucees: false,
                msg: "No file uploaded"
            })
        }

        const mediaFile = {
            id: Date.now().toString(),
            name: req.file.originalname,
            type,
            path: req.file.path.replace(/\\/g, "/"),
            size: req.file.size,
            createdAt: new Date()
        }

        media.push(mediaFile)
        return res.status(200).json({
            success: true,
            msg: "file uploaded",
            data: mediaFile
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: "No file uploaded",
            err: err.message
        })
    }

}

const getMedia = async (req, res) => {
    try {

        let { search = "", page = 1, limit = 6 } = req.query
        console.log(search, page, limit)

        page = parseInt(page)
        limit = parseInt(limit)

        let filtered = media.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

        const start = (page - 1) * limit
        const pagination = filtered.slice(start, start + limit)

        return res.status(200).json({
            success: true,
            total: filtered.length,
            page,
            limit,
            data: pagination,

        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: "Err geting file",
            err: err.message
        })
    }
}

const deleteMedia = async (req, res) => {
    try {
        const { id } = req.params
        const idx = media.findIndex((i) => i.id === id)
        if (idx === -1) {
            return res.status(404).json({
                success: false,
                msg: "No file found"
            })
        }
        const file = media[idx]

        //unlink the file
        fs.unlink(file.path, (err) => {
            if (err) {
                console.error(`Error deleting file from disk: ${err.message}`);
                // Proceed to remove from memory anyway, or handle it as needed.
            } else {
                console.log(`File deleted successfully: ${file.path}`);
            }
        })

        media.splice(idx, 1)
        return res.status(200).json({
            success: true,
            msg: "File deleted successfully from memory and disk"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Error while deleting file",
            err: error.message
        })
    }
}

export { uploadMedia, getMedia, deleteMedia }