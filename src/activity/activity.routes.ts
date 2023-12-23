import express from "express"
import type { Request, Response } from "express"
import { body, validationResult } from "express-validator"

import * as activityService from "./activity.service"
export const activityRoutes = express.Router()

// GET: List of all activities
activityRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const activities = await activityService.getAllActivities()
    res.status(200).json(activities)
  } catch (error: any) {
    res.status(500).send(error.message)
  }
})

// GET: Activity by id
activityRoutes.get("/:id", async (req: Request, res: Response) => {
  try {
    const activity = await activityService.getActivityById(
      Number(req.params.id)
    )
    if (activity) {
      res.status(200).json(activity)
    } else {
      res.status(404).send("Activity not found")
    }
  } catch (error: any) {
    res.status(500).send(error.message)
  }
})

// GET: Activities by type
activityRoutes.get("/type/:type", async (req: Request, res: Response) => {
  try {
    const activities = await activityService.getActivityByType(req.params.type)
    res.status(200).json(activities)
  } catch (error: any) {
    res.status(500).send(error.message)
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
        return res.status(400).send(errors.array())
      }

      const { documentation, ...activityData } = req.body
      const activity = await activityService.createActivity(activityData)

      try {
        const documentationRecords = await activityService.createDocumentation(
          documentation,
          activity?.id
        )
        res.status(201).json({ activity, documentation: documentationRecords })
      } catch (error: any) {
        await activityService.deleteActivity(activity.id)
        res.status(500).send(`Failed to create documentation: ${error.message}`)
      }
    } catch (error: any) {
      res.status(500).send(`Failed to create activity: ${error.message}`)
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
        return res.status(400).send(errors.array())
      }
      const activity = await activityService.updateActivity(
        Number(req.params.id),
        req.body
      )
      if (activity) {
        res.status(200).json(activity)
      } else {
        res.status(404).send("Activity not found")
      }
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }
)

// DELETE: Delete an existing activity
activityRoutes.delete("/:id", async (req: Request, res: Response) => {
  try {
    const activity = await activityService.deleteActivity(Number(req.params.id))
    if (activity) {
      res.status(200).json(activity)
    } else {
      res.status(404).send("Activity not found")
    }
  } catch (error: any) {
    res.status(500).send(error.message)
  }
})
