import express, { Request, Response } from "express"
import * as documentationService from "./documentation.service"
import multer from "multer"
import { body, validationResult } from "express-validator"
import fs from "fs"

// const path = require("path")
import path from "path"
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "src/documentation/uploads/")
  },
  filename: function (req: any, file: any, cb: any) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    )
  }
})
const upload = multer({ storage: storage })

export const documentationRoutes = express.Router()

// GET: Get a list of all documentation for an activity from multer
documentationRoutes.get("/:activityId", async (req: Request, res: Response) => {
  try {
    const activityId = parseInt(req.params.activityId)
    const filePaths =
      documentationService.getDocumentationByActivityId(activityId)

    const filesNotFound: string[] = []
    const filesToSend: string[] = []

    for (const filePath of await filePaths) {
      const fullPath = path.join(__dirname, "uploads", filePath.url)

      if (fs.existsSync(fullPath)) {
        filesToSend.push(fullPath)
      } else {
        filesNotFound.push(fullPath)
      }
    }

    if (filesNotFound.length > 0) {
      res.status(404).json({
        message: "Some files not found",
        data: {
          filesNotFound
        }
      })
    } else {
      // Send each file individually
      filesToSend.forEach((file) => {
        res.sendFile(file, (err) => {
          if (err) {
            console.error("Error sending file:", err)
          }
        })
      })
    }
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
  upload.single("file"),
  body("title").isString().notEmpty(),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty() || !req.file) {
        return res.status(400).json({
          message: "Validation error",
          data: errors.array()
        })
      }
      const documentation = await documentationService.createDocumentation({
        title: req.body.title,
        url: req.file.filename,
        activityId: parseInt(req.params.activityId)
      })
      res.status(201).json({
        message: "Success",
        data: documentation
      })
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
        data: null
      })
    }
  }
)
