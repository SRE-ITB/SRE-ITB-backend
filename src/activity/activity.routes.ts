import express from "express"
import type { Request, Response } from "express"
import { body, validationResult } from "express-validator"
import multer from "multer"
import * as activityService from "./activity.service"
import { ActivityType } from "@prisma/client"
import { uploadFile } from "../storage/storage"
export const activityRoutes = express.Router()
const upload = multer()

// GET: List of all activities
activityRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const sorting = req.query.sort as string | null
    const limit = Number(req.query.limit) || 100
    const activities = await activityService.getAllActivities(sorting, limit)
    res.status(200).json({
      message: "Success",
      data: activities
    })
  } catch (error: any) {
    res.status(500).json({
      message: "Error",
      data: null
    })
  }
})

// GET: Latest activities for each type
activityRoutes.get("/latest", async (req: Request, res: Response) => {
  try {
    const activities = await Promise.all(
      Object.values(ActivityType).map(async (type: ActivityType) => {
        const activity = await activityService.getActivityByType(
          type,
          "desc",
          1
        )
        return activity[0]
      })
    )

    res.status(200).json({
      message: "Success",
      data: activities.filter((activity) => activity)
    })
  } catch (error: any) {
    res.status(500).json({
      message: "Error",
      data: null
    })
  }
})

// GET: Activity by id
activityRoutes.get("/:id", async (req: Request, res: Response) => {
  try {
    const activity = await activityService.getActivityById(
      Number(req.params.id)
    )
    if (activity) {
      res.status(200).json({
        message: "Success",
        data: activity
      })
    } else {
      res.status(404).json({
        message: "Activity not found",
        data: null
      })
    }
  } catch (error: any) {
    res.status(500).json({
      message: "Error",
      data: null
    })
  }
})

// GET: Activities by type, type is enum: internal, external, learning, project
activityRoutes.get("/type/:type", async (req: Request, res: Response) => {
  try {
    const requestedType = req.params.type as ActivityType
    if (!Object.values(ActivityType).includes(requestedType)) {
      return res.status(400).json({
        message:
          "Activity type must be either: internal, external, learning, project",
        data: null
      })
    }
    const sorting = req.query.sort as string | null
    const limit = Number(req.query.limit) || 100
    const activities = await activityService.getActivityByType(
      requestedType,
      sorting,
      limit
    )
    res.status(200).json({
      message: "Success",
      data: activities
    })
  } catch (error: any) {
    res.status(500).json({
      message: "Error",
      data: null
    })
  }
})

// POST: Create a new activity
activityRoutes.post("/", upload.any(), async (req: Request, res: Response) => {
  try {
    const { body, files } = req

    if (!Object.values(ActivityType).includes(body.type)) {
      return res.status(400).json({
        message:
          "Activity type must be either: internal, external, learning, project",
        data: null
      })
    }

    if (!files) {
      return res.status(400).json({
        message: "No thumbnail uploaded",
        data: null
      })
    }

    const uploadedFiles = await Promise.all(
      (files as Array<any>).map(async (file: any) => {
        const uploadedFile = await uploadFile(file)
        return uploadedFile
      })
    )

    body.date = new Date(body.date)

    const activity = await activityService.createActivity({
      ...body,
      thumbnail: uploadedFiles[0]
    })

    res.status(200).json({
      message: "Success",
      data: activity
    })
  } catch (error: any) {
    res.status(500).json({
      message: "Error",
      data: null
    })
  }
})

// PATCH: Update an existing activity
activityRoutes.patch(
  "/:id",
  upload.any(),
  async (req: Request, res: Response) => {
    try {
      const { body, files } = req

      if (!Object.values(ActivityType).includes(req.body.type)) {
        return res.status(400).json({
          message:
            "Activity type must be either: internal, external, learning, project",
          data: null
        })
      }

      if (files) {
        const uploadedFiles = await Promise.all(
          (files as Array<any>).map(async (file: any) => {
            const uploadedFile = await uploadFile(file)
            return uploadedFile
          })
        )
        body.thumbnail = uploadedFiles[0]
      }

      body.date = new Date(body.date)
      console.log(body)
      const activity = await activityService.updateActivity(
        Number(req.params.id),
        body
      )
      if (activity) {
        res.status(200).json({
          message: "Success",
          data: activity
        })
      } else {
        res.status(404).json({
          message: "Activity not found",
          data: null
        })
      }
    } catch (error: any) {
      res.status(500).json({
        message: "Error",
        data: null
      })
    }
  }
)

// DELETE: Delete an existing activity
activityRoutes.delete("/:id", async (req: Request, res: Response) => {
  try {
    const activity = await activityService.deleteActivity(Number(req.params.id))
    if (activity) {
      res.status(200).json({
        message: "Success",
        data: activity
      })
    } else {
      res.status(404).json({
        message: "Activity not found",
        data: null
      })
    }
  } catch (error: any) {
    res.status(500).json({
      message: "Error",
      data: null
    })
  }
})
