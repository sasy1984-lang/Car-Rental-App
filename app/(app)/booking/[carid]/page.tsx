"use client"

import { BookingForm } from "@/components/booking-form"
import { use } from "react"

export default function BookingPage({
  params,
}: {
  params: Promise<{ carid: string }>
}) {
  const { carid } = use(params)
  return <BookingForm carId={carid} />
}
