import { db } from "../utils/db.server"
import { Activity, ActivityType } from "@prisma/client"

export const getAllActivities = async (
  sort: string | null
): Promise<Activity[]> => {
  return await db.activity.findMany({
    orderBy: sort ? { date: sort === "asc" ? "asc" : "desc" } : undefined
  })
}

export const getActivityById = async (id: number): Promise<Activity | null> => {
  return await db.activity.findUnique({
    where: {
      id
    }
  })
}

export const getActivityByType = async (
  type: ActivityType,
  sort: string | null
): Promise<Activity[]> => {
  return await db.activity.findMany({
    where: {
      type
    },
    orderBy: sort ? { date: sort === "asc" ? "asc" : "desc" } : undefined
  })
}

export const createActivity = async (activity: Activity): Promise<Activity> => {
  return await db.activity.create({
    data: activity
  })
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
