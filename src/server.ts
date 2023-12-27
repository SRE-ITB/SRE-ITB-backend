import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { activityRoutes } from "./activity/activity.routes"
import { apiKeyMiddleware } from "./middlewares/apikeyMiddleware"

dotenv.config()

const app = express()
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000

app.use(cors())
app.use(express.json())
app.use(apiKeyMiddleware)
app.use("/api/activity", activityRoutes)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running on port ${PORT}`)
})
