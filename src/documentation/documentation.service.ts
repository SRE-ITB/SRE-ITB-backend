import { db } from "../utils/db.server"
import { Documentation } from "@prisma/client"

type DocumentationData = {
  title: string
  url: string
  activityId: number
}

export const createDocumentation = async (
  data: DocumentationData
): Promise<Documentation> => {
  return await db.documentation.create({
    data: data
  })
}

export const getDocumentationByActivityId = async (
  activityId: number
): Promise<Documentation[]> => {
  return await db.documentation.findMany({
    where: {
      activityId
    }
  })
}
