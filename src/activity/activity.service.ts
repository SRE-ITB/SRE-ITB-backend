import { db } from "../utils/db.server"
import { Activity, Documentation } from "@prisma/client"

export const getAllActivities = async (): Promise<Activity[]> => {
  return await db.activity.findMany({
    include: {
      documentation: true
    }
  })
}

export const getActivityById = async (id: number): Promise<Activity | null> => {
  return await db.activity.findUnique({
    where: {
      id
    },
    include: {
      documentation: true
    }
  })
}

export const getActivityByType = async (type: string): Promise<Activity[]> => {
  return await db.activity.findMany({
    where: {
      type
    },
    include: {
      documentation: true
    }
  })
}

export const createActivity = async (activity: Activity): Promise<Activity> => {
  return await db.activity.create({
    data: activity
  })
}

export const createDocumentation = async (
  documentation: Documentation[],
  activityId: number
): Promise<Documentation[]> => {
  return await Promise.all(
    documentation.map((doc) =>
      db.documentation.create({ data: { ...doc, activityId } })
    )
  )
}

export const updateActivity = async (
  id: number,
  activity: Activity
): Promise<Activity | null> => {
  return await db.activity.update({
    where: {
      id
    },
    data: activity
  })
}

export const deleteActivity = async (id: number): Promise<Activity | null> => {
  return await db.activity.delete({
    where: {
      id
    }
  })
}
