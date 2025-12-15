"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { DayPicker } from "react-day-picker"
import { format, isWeekend, isBefore, startOfToday } from "date-fns"
import { es } from "date-fns/locale"
import { X, Loader2, Check } from "lucide-react"
import { getAvailableSlots, createBooking } from "@/app/actions/booking"

interface BookingWidgetProps {
  isOpen: boolean
  onClose: () => void
}

type Step = "date" | "time" | "details" | "success"

interface TimeSlot {
  time: string
  available: boolean
}

export function BookingWidget({ isOpen, onClose }: BookingWidgetProps) {
  const [step, setStep] = useState<Step>("date")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string | undefined>()
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
  })

  // Reset state when closing
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep("date")
        setSelectedDate(undefined)
        setSelectedTime(undefined)
        setSlots([])
        setFormData({ name: "", email: "", reason: "" })
      }, 300)
    }
  }, [isOpen])

  // Fetch slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      setLoadingSlots(true)
      getAvailableSlots(format(selectedDate, "yyyy-MM-dd"))
        .then(setSlots)
        .finally(() => setLoadingSlots(false))
    }
  }, [selectedDate])

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      setStep("time")
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep("details")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return

    setSubmitting(true)
    const result = await createBooking({
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      ...formData,
    })

    if (result.success) {
      setStep("success")
    }
    setSubmitting(false)
  }

  const disabledDays = (date: Date) => {
    return isWeekend(date) || isBefore(date, startOfToday())
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-white z-50 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-black/10">
              <h2 className="font-mono text-sm uppercase tracking-wider">
                {step === "date" && "Select Date"}
                {step === "time" && "Select Time"}
                {step === "details" && "Your Details"}
                {step === "success" && "Confirmed"}
              </h2>
              <button onClick={onClose} className="p-1 hover:bg-black/5 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence mode="wait">
                {/* Step 1: Date Selection */}
                {step === "date" && (
                  <motion.div
                    key="date"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={disabledDays}
                      locale={es}
                      className="booking-calendar"
                      classNames={{
                        months: "flex flex-col",
                        month: "space-y-4",
                        caption: "flex justify-center relative items-center h-10",
                        caption_label: "font-mono text-sm uppercase tracking-wider",
                        nav: "flex items-center gap-1",
                        nav_button:
                          "h-7 w-7 bg-transparent p-0 hover:bg-black/5 inline-flex items-center justify-center",
                        nav_button_previous: "absolute left-0",
                        nav_button_next: "absolute right-0",
                        table: "w-full border-collapse",
                        head_row: "flex justify-between",
                        head_cell: "text-black/50 w-9 font-mono text-xs uppercase",
                        row: "flex w-full mt-2 justify-between",
                        cell: "text-center text-sm relative p-0",
                        day: "h-9 w-9 p-0 font-mono text-sm hover:bg-black hover:text-white transition-colors inline-flex items-center justify-center",
                        day_selected: "bg-black text-white",
                        day_today: "border border-black",
                        day_outside: "text-black/30",
                        day_disabled: "text-black/20 hover:bg-transparent hover:text-black/20 cursor-not-allowed",
                      }}
                    />
                  </motion.div>
                )}

                {/* Step 2: Time Selection */}
                {step === "time" && (
                  <motion.div
                    key="time"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <button
                      onClick={() => setStep("date")}
                      className="font-mono text-xs uppercase tracking-wider text-black/50 hover:text-black transition-colors"
                    >
                      ← Back
                    </button>

                    <p className="font-mono text-sm">
                      {selectedDate && format(selectedDate, "EEEE, d MMMM", { locale: es })}
                    </p>

                    {loadingSlots ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-5 h-5 animate-spin" />
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {slots.map((slot) => (
                          <button
                            key={slot.time}
                            onClick={() => slot.available && handleTimeSelect(slot.time)}
                            disabled={!slot.available}
                            className={`
                              py-2 px-3 font-mono text-sm border transition-colors
                              ${
                                slot.available
                                  ? "border-black hover:bg-black hover:text-white"
                                  : "border-black/20 text-black/30 cursor-not-allowed"
                              }
                            `}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 3: Details Form */}
                {step === "details" && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <button
                      onClick={() => setStep("time")}
                      className="font-mono text-xs uppercase tracking-wider text-black/50 hover:text-black transition-colors"
                    >
                      ← Back
                    </button>

                    <p className="font-mono text-sm">
                      {selectedDate && format(selectedDate, "EEEE, d MMMM", { locale: es })} at {selectedTime}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block font-mono text-xs uppercase tracking-wider mb-2">Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full border border-black px-3 py-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs uppercase tracking-wider mb-2">Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full border border-black px-3 py-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs uppercase tracking-wider mb-2">Reason</label>
                        <textarea
                          required
                          rows={3}
                          value={formData.reason}
                          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                          className="w-full border border-black px-3 py-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-black resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-black text-white py-3 font-mono text-sm uppercase tracking-wider hover:bg-black/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Booking...
                          </>
                        ) : (
                          "Confirm Booking"
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* Step 4: Success */}
                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif text-xl">Booking Confirmed</h3>
                      <p className="font-mono text-sm text-black/60">
                        {selectedDate && format(selectedDate, "EEEE, d MMMM", { locale: es })} at {selectedTime}
                      </p>
                    </div>

                    <p className="font-mono text-xs text-black/50">
                      Check your email for the meeting details and Google Meet link.
                    </p>

                    <button
                      onClick={onClose}
                      className="mt-4 border border-black px-6 py-2 font-mono text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
