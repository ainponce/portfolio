import { google } from "googleapis"

const SCOPES = ["https://www.googleapis.com/auth/calendar"]

export function getGoogleCalendarClient() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: privateKey,
    scopes: SCOPES,
  })

  return google.calendar({ version: "v3", auth })
}

export const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "primary"
