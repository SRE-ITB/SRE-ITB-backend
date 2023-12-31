import path from "path"
import { google } from "googleapis"
import stream from "stream"

const KEYFILEPATH = path.join(__dirname, "../storage/cred.json")
const SCOPES = ["https://www.googleapis.com/auth/drive"]
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES
})
export const uploadFile = async (fileObject: any) => {
  const bufferStream = new stream.PassThrough()
  bufferStream.end(fileObject.buffer)
  try {
    const drive = google.drive({ version: "v3", auth })
    const { data } = await drive.files.create({
      media: {
        mimeType: fileObject.mimeType,
        body: bufferStream
      },
      requestBody: {
        name: fileObject.originalname,
        parents: ["1rDnwcbfPJSk_nD2jJ_m7oG3A0EXorNfL"]
      },
      fields: "id,name,webViewLink"
    })

    const fileId = data.id
    const embeddedPreviewUrl = `https://drive.google.com/uc?export=view&id=${fileId}`
    console.log("File uploaded to Google Drive:", embeddedPreviewUrl)

    return embeddedPreviewUrl
  } catch (error: any) {
    console.error("Error uploading file to Google Drive:", error.message)
    throw error
  }
}
