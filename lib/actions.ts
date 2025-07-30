"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

type BookingData = {
  checkIn: Date
  checkOut: Date
  guests: number
  userId: string
}

export async function createBooking(data: BookingData) {
  try {
    const supabase = createServerComponentClient({ cookies })

    // Check if dates are available
    const { data: existingBookings, error: checkError } = await supabase
      .from("bookings")
      .select("*")
      .or(`check_in.gte.${data.checkIn.toISOString()},check_out.lte.${data.checkOut.toISOString()}`)

    if (checkError) {
      console.error("Error checking availability:", checkError)
      return { success: false, error: "Error checking availability" }
    }

    if (existingBookings && existingBookings.length > 0) {
      return { success: false, error: "Selected dates are not available" }
    }

    // Create the booking
    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        user_id: data.userId,
        check_in: data.checkIn.toISOString(),
        check_out: data.checkOut.toISOString(),
        guests: data.guests,
        status: "pending",
        total_price: calculatePrice(data.checkIn, data.checkOut),
      })
      .select()

    if (error) {
      console.error("Error creating booking:", error)
      return { success: false, error: "Failed to create booking" }
    }

    // In a real app, you would create a Stripe checkout session here
    // const checkoutUrl = await createStripeCheckoutSession(booking)

    revalidatePath("/")

    return {
      success: true,
      booking,
      // checkoutUrl
    }
  } catch (error) {
    console.error("Booking error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

function calculatePrice(checkIn: Date, checkOut: Date): number {
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  const nightlyRate = 350
  const cleaningFee = 150
  const serviceFee = 75

  return nightlyRate * nights + cleaningFee + serviceFee
}
