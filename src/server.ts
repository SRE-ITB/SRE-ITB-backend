import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import swaggerRoutes from "./swagger"

import { activityRoutes } from "./activity/activity.routes"
import { documentationRoutes } from "./documentation/documentation.routes"
import { apiKeyMiddleware } from "./middlewares/apiKeyMiddleware"

dotenv.config()

const app = express()
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000

app.use(cors())
app.use(express.static("static"))
app.use(express.json())
app.use("/api/activity",apiKeyMiddleware, activityRoutes)
app.use("/api/documentation",apiKeyMiddleware, documentationRoutes)
app.use("/doc", swaggerRoutes)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running on port ${PORT}`)
})
