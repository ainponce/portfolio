"use server"

import { getGoogleCalendarClient, CALENDAR_ID } from "@/lib/googleCalendar"
import { startOfDay, endOfDay, addMinutes, setHours, setMinutes, isBefore, isAfter, format, parseISO } from "date-fns"
import { toZonedTime, fromZonedTime } from "date-fns-tz"

const TIME_ZONE = "America/Argentina/Buenos_Aires"
const WORK_START_HOUR = 9
const WORK_END_HOUR = 18
const SLOT_DURATION = 30
const MEETING_DURATION = 45
const BUFFER_TIME = 10
const MIN_NOTICE_HOURS = 4

interface TimeSlot {
  time: string
  available: boolean
}

interface BusySlot {
  start: Date
  end: Date
}

export async function getAvailableSlots(dateString: string): Promise<TimeSlot[]> {
  const calendar = getGoogleCalendarClient()

  // Parse date and convert to Argentina timezone
  const selectedDate = parseISO(dateString)
  const zonedDate = toZonedTime(selectedDate, TIME_ZONE)

  // Get start and end of day in UTC for API call
  const dayStart = fromZonedTime(startOfDay(zonedDate), TIME_ZONE)
  const dayEnd = fromZonedTime(endOfDay(zonedDate), TIME_ZONE)

  // Fetch busy times from Google Calendar
  let busySlots: BusySlot[] = []
  try {
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: dayStart.toISOString(),
        timeMax: dayEnd.toISOString(),
        timeZone: TIME_ZONE,
        items: [{ id: CALENDAR_ID }],
      },
    })

    const busy = response.data.calendars?.[CALENDAR_ID]?.busy || []
    busySlots = busy.map((slot) => ({
      start: new Date(slot.start!),
      end: new Date(slot.end!),
    }))
  } catch (error) {
    console.error("Error fetching busy times:", error)
  }

  // Generate time slots
  const slots: TimeSlot[] = []
  const nowInArgentina = toZonedTime(new Date(), TIME_ZONE)
  const minBookingTime = addMinutes(nowInArgentina, MIN_NOTICE_HOURS * 60)

  // Start at work start hour
  let currentSlot = setMinutes(setHours(zonedDate, WORK_START_HOUR), 0)
  const workEnd = setMinutes(setHours(zonedDate, WORK_END_HOUR), 0)

  while (isBefore(currentSlot, workEnd)) {
    const slotEnd = addMinutes(currentSlot, MEETING_DURATION + BUFFER_TIME)

    // Check if slot is in the past or too soon
    const isTooSoon = isBefore(currentSlot, minBookingTime)

    // Check if slot would extend past work hours
    const exceedsWorkHours = isAfter(addMinutes(currentSlot, MEETING_DURATION), workEnd)

    // Check overlap with busy slots
    const slotStartUTC = fromZonedTime(currentSlot, TIME_ZONE)
    const slotEndUTC = fromZonedTime(slotEnd, TIME_ZONE)

    const hasOverlap = busySlots.some((busy) => {
      return slotStartUTC < busy.end && slotEndUTC > busy.start
    })

    const isAvailable = !isTooSoon && !exceedsWorkHours && !hasOverlap

    slots.push({
      time: format(currentSlot, "HH:mm"),
      available: isAvailable,
    })

    currentSlot = addMinutes(currentSlot, SLOT_DURATION)
  }

  return slots
}

interface BookingData {
  date: string
  time: string
  name: string
  email: string
  reason: string
}

export async function createBooking(data: BookingData): Promise<{ success: boolean; error?: string }> {
  const calendar = getGoogleCalendarClient()

  try {
    // Parse date and time
    const [hours, minutes] = data.time.split(":").map(Number)
    const selectedDate = parseISO(data.date)
    const zonedDate = toZonedTime(selectedDate, TIME_ZONE)
    const startTime = setMinutes(setHours(zonedDate, hours), minutes)
    const endTime = addMinutes(startTime, MEETING_DURATION)

    // Convert to UTC for Google Calendar
    const startUTC = fromZonedTime(startTime, TIME_ZONE)
    const endUTC = fromZonedTime(endTime, TIME_ZONE)

    // Create event with Google Meet
    await calendar.events.insert({
      calendarId: CALENDAR_ID,
      conferenceDataVersion: 1,
      sendUpdates: "all",
      requestBody: {
        summary: `Meeting with ${data.name}`,
        description: `Reason: ${data.reason}\n\nBooked via ainponce.com`,
        start: {
          dateTime: startUTC.toISOString(),
          timeZone: TIME_ZONE,
        },
        end: {
          dateTime: endUTC.toISOString(),
          timeZone: TIME_ZONE,
        },
        attendees: [{ email: data.email }],
        conferenceData: {
          createRequest: {
            requestId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error creating booking:", error)
    return { success: false, error: "Failed to create booking" }
  }
}
