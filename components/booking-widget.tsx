"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { createBooking } from "@/lib/actions"

export default function BookingWidget() {
  const [date, setDate] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [guests, setGuests] = useState(2)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const supabase = createClientComponentClient()

  const handleBooking = async () => {
    if (!date.from || !date.to) {
      setMessage("Please select check-in and check-out dates")
      return
    }

    setIsLoading(true)
    setMessage("")

    try {
      // Check if the user is authenticated
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        // Redirect to sign in or show sign in modal
        setMessage("Please sign in to complete your booking")
        setIsLoading(false)
        return
      }

      // Create the booking
      const result = await createBooking({
        checkIn: date.from,
        checkOut: date.to,
        guests,
        userId: session.user.id,
      })

      if (result.success) {
        setMessage("Booking successful! Redirecting to payment...")
        // In a real app, redirect to Stripe checkout
        // window.location.href = result.checkoutUrl
      } else {
        setMessage(result.error || "Something went wrong")
      }
    } catch (error) {
      console.error("Booking error:", error)
      setMessage("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-muted sticky top-24">
      <h3 className="text-2xl font-bold mb-6 text-dark">Book Your Stay</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-darkgray">Dates</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-muted",
                  !date.from && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "MMM d, yyyy")} - {format(date.to, "MMM d, yyyy")}
                    </>
                  ) : (
                    format(date.from, "MMM d, yyyy")
                  )
                ) : (
                  "Select dates"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-darkgray">Guests</label>
          <div className="flex items-center border border-muted rounded-md">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-darkgray"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              disabled={guests <= 1}
            >
              -
            </Button>
            <div className="flex-1 flex items-center justify-center">
              <Users className="h-4 w-4 mr-2 text-darkgray" />
              <span>
                {guests} {guests === 1 ? "Guest" : "Guests"}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-darkgray"
              onClick={() => setGuests(Math.min(8, guests + 1))}
              disabled={guests >= 8}
            >
              +
            </Button>
          </div>
        </div>

        {date.from && date.to && (
          <div className="border-t border-muted pt-4 mt-4">
            <div className="flex justify-between mb-2">
              <span>
                $500-$2,500 x {Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))} days
              </span>
              <span>${2000 * Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Cleaning fee</span>
              <span>$150</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Service fee</span>
              <span>$75</span>
            </div>
            <div className="flex justify-between font-bold border-t border-muted pt-2 mt-2">
              <span>Total</span>
              <span>
                ${350 * Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)) + 150 + 75}
              </span>
            </div>
          </div>
        )}

        <Button
          className="w-full bg-accent hover:bg-accent/90 text-white"
          onClick={handleBooking}
          disabled={!date.from || !date.to || isLoading}
        >
          {isLoading ? "Processing..." : "Book Now"}
        </Button>

        {message && (
          <p className={`text-sm text-center ${message.includes("successful") ? "text-green-600" : "text-primary"}`}>
            {message}
          </p>
        )}

        <p className="text-xs text-center text-darkgray mt-2">
          5 hour minimum booking required. You won't be charged yet. Payment will be processed upon confirmation.
        </p>
      </div>
    </div>
  )
}
