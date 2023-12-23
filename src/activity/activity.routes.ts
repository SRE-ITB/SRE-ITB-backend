import express from "express"
import type { Request, Response } from "express"
import { body, validationResult } from "express-validator"

import * as activityService from "./activity.service"
import { ActivityType } from "@prisma/client"
export const activityRoutes = express.Router()

// GET: List of all activities
activityRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const sorting = req.query.sort as string | null
    const activities = await activityService.getAllActivities(sorting)
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
    const activities = await activityService.getActivityByType(
      requestedType,
      sorting
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
activityRoutes.post(
  "/",
  [
    body("thumbnail").isString().notEmpty(),
    body("title").isString().notEmpty(),
    body("date").isString().notEmpty(),
    body("caption").isString().notEmpty(),
    body("description").isString().notEmpty(),
    body("type").isString().notEmpty(),
    body("documentation").isArray().notEmpty()
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation error",
          data: errors.array()
        })
      }

      if (!Object.values(ActivityType).includes(req.body.type)) {
        return res.status(400).json({
          message:
            "Activity type must be either: internal, external, learning, project",
          data: null
        })
      }

      const { documentation, ...activityData } = req.body
      const activity = await activityService.createActivity(activityData)

      try {
        const documentationRecords = await activityService.createDocumentation(
          documentation,
          activity?.id
        )
        res.status(201).json({
          message: "Success",
          data: { activity, documentation: documentationRecords }
        })
      } catch (error: any) {
        await activityService.deleteActivity(activity.id)
        res.status(500).json({
          message: `Failed to create documentation: ${error.message}`,
          data: null
        })
      }
    } catch (error: any) {
      res.status(500).json({
        message: `Failed to create activity: ${error.message}`,
        data: null
      })
    }
  }
)

// PATCH: Update an existing activity
activityRoutes.patch(
  "/:id",
  [
    body("thumbnail").isString().optional(),
    body("title").isString().optional(),
    body("date").isString().optional(),
    body("caption").isString().optional(),
    body("description").isString().optional(),
    body("type").isString().optional()
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation error",
          data: errors.array()
        })
      }

      if (!Object.values(ActivityType).includes(req.body.type)) {
        return res.status(400).json({
          message:
            "Activity type must be either: internal, external, learning, project",
          data: null
        })
      }

      const activity = await activityService.updateActivity(
        Number(req.params.id),
        req.body
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
