import express from "express"
import MediaRouter from "./routes/media.route.js"
import cors from "cors"
const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use("/api", MediaRouter)
app.use("/uploads", express.static("uploads"))





export default app