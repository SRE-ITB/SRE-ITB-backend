import { db } from "../src/utils/db.server"

type Activity = {
  thumbnail: string
  title: string
  date: Date
  caption: string
  description: string
  type: string
}

type Documentation = {
  title: string
  url: string
}

async function seed() {
  await Promise.all(
    seedActivities().map(async (activity) => {
      await db.activity.create({ data: activity })
    })
  )

  const activity = await db.activity.findFirst({
    where: {
      title: "Title 1"
    }
  })

  await Promise.all(
    seedDocumentations().map(async (documentation) => {
      await db.documentation.create({
        data: {
          ...documentation,
          activity: {
            connect: {
              id: activity?.id
            }
          }
        }
      })
    })
  )
}

seed()

function seedActivities() {
  return [
    {
      thumbnail: "https://picsum.photos/200",
      title: "Title 1",
      date: new Date(),
      caption: "Caption 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      type: "activity"
    },
    {
      thumbnail: "https://picsum.photos/200",
      title: "Title 2",
      date: new Date(),
      caption: "Caption 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      type: "activity"
    },
    {
      thumbnail: "https://picsum.photos/200",
      title: "Title 3",
      date: new Date(),
      caption: "Caption 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      type: "activity"
    }
  ]
}

function seedDocumentations() {
  return [
    {
      title: "Documentation 1",
      url: "https://picsum.photos/200"
    },
    {
      title: "Documentation 2",
      url: "https://picsum.photos/200"
    },
    {
      title: "Documentation 3",
      url: "https://picsum.photos/200"
    },
    {
      title: "Documentation 4",
      url: "https://picsum.photos/200"
    },
    {
      title: "Documentation 5",
      url: "https://picsum.photos/200"
    }
  ]
}
