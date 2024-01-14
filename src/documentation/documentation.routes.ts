import express, { Request, Response } from "express"
import * as documentationService from "./documentation.service"
import multer from "multer"
import { uploadFile } from "../storage/storage"

export const documentationRoutes = express.Router()
const upload = multer()

// GET: Get a list of all documentation for an activity from multer
documentationRoutes.get("/:activityId", async (req: Request, res: Response) => {
  try {
    const activityId = Number(req.params.activityId)
    const documentation =
      await documentationService.getDocumentationByActivityId(activityId)
    res.status(200).json({
      message: "Success",
      data: documentation
    })
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      data: null
    })
  }
})

// POST: Create documentation
documentationRoutes.post(
  "/:activityId",
  upload.any(),
  async (req: Request, res: Response) => {
    try {
      const { files } = req
      if (!files || files.length === 0) {
        res.status(400).json({
          message: "No files uploaded",
          data: null
        })
      }
      const activityId = Number(req.params.activityId)
      const documentationFiles = files as Express.Multer.File[]
      documentationFiles.forEach(async (file) => {
        const uploadedFile = await uploadFile(file)
        await documentationService.createDocumentation({
          title: file.originalname,
          url: uploadedFile,
          activityId
        })
      })
      res.status(200).json({
        message: "Success",
        data: null
      })
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
        data: null
      })
    }
  }
)
