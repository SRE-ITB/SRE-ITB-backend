import { db } from "../src/utils/db.server"
import { ActivityType } from "@prisma/client"

async function main() {
  const activity1 = await db.activity.create({
    data: {
      thumbnail: "https://example.com/thumbnail.jpg",
      title: "Internal Program",
      date: new Date(2024, 0, 1),
      caption: "This is the internal program caption",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies.",
      type: ActivityType.internal,
      documentation: {
        create: [
          {
            title: "Documentation 1",
            url: "https://example.com/doc1.pdf"
          },
          {
            title: "Documentation 2",
            url: "https://example.com/doc2.pdf"
          }
        ]
      }
    }
  })

  const activity2 = await db.activity.create({
    data: {
      thumbnail: "https://example.com/thumbnail2.jpg",
      title: "External Program",
      date: new Date(2024, 0, 2),
      caption: "This is the external program caption",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies.",
      type: ActivityType.external,
      documentation: {
        create: [
          {
            title: "Documentation 3",
            url: "https://example.com/doc3.pdf"
          },
          {
            title: "Documentation 4",
            url: "https://example.com/doc4.pdf"
          }
        ]
      }
    }
  })

  const activity3 = await db.activity.create({
    data: {
      thumbnail: "https://example.com/thumbnail3.jpg",
      title: "Learning Program",
      date: new Date(2024, 0, 3),
      caption: "This is the Learning program caption",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies.",
      type: ActivityType.learning,
      documentation: {
        create: [
          {
            title: "Documentation 5",
            url: "https://example.com/doc5.pdf"
          },
          {
            title: "Documentation 6",
            url: "https://example.com/doc6.pdf"
          }
        ]
      }
    }
  })

  const activity4 = await db.activity.create({
    data: {
      thumbnail: "https://example.com/thumbnail4.jpg",
      title: "Project Program",
      date: new Date(2024, 0, 4),
      caption: "This is the Project program caption",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies.",
      type: ActivityType.project,
      documentation: {
        create: [
          {
            title: "Documentation 7",
            url: "https://example.com/doc7.pdf"
          },
          {
            title: "Documentation 8",
            url: "https://example.com/doc8.pdf"
          }
        ]
      }
    }
  })

  console.log({ activity1, activity2, activity3, activity4 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
