'use client'

import { useState } from 'react'
import { Calendar, Clock, User, Phone, Mail, CreditCard } from 'lucide-react'

interface BookingState {
  step: 'service' | 'datetime' | 'personal' | 'confirmation'
  service: string
  date: string
  time: string
  name: string
  email: string
  phone: string
  notes: string
}

export default function AdvancedBookingPage() {
  const [booking, setBooking] = useState<BookingState>({
    step: 'service',
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  })

  const services = [
    { id: 'haircut', name: 'Haircut & Styling', duration: 45, price: 45, description: 'Professional cut and styling tailored to your face shape and preferences' },
    { id: 'color', name: 'Hair Coloring', duration: 120, price: 120, description: 'Full color, highlights, or balayage using premium products' },
    { id: 'treatment', name: 'Hair Treatment', duration: 60, price: 75, description: 'Deep conditioning and repair treatments for damaged hair' },
    { id: 'styling', name: 'Special Occasion Styling', duration: 90, price: 95, description: 'Wedding, party, or event styling' },
    { id: 'consultation', name: 'Free Consultation', duration: 30, price: 0, description: 'Discuss your hair goals and get expert recommendations' }
  ]

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ]

  const getNext7Days = () => {
    const days: { value: string; label: string }[] = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })
      })
    }
    return days
  }

  const next7Days = getNext7Days()

  const handleServiceSelect = (service: typeof services[0]) => {
    setBooking({ ...booking, service: service.id, step: 'datetime' })
  }

  const handleDateTimeSelect = (date: string, time: string) => {
    setBooking({ ...booking, date, time, step: 'personal' })
  }

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBooking({ ...booking, step: 'confirmation' })
  }

  const handleConfirm = () => {
    // Here you would submit to Supabase
    alert('Booking confirmed! You will receive a confirmation email shortly.')
    window.location.href = '/'
  }

  const selectedService = services.find(s => s.id === booking.service)

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-12">
          {['service', 'datetime', 'personal', 'confirmation'].map((step, i) => (
            <div key={step} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                booking.step === step ? 'bg-rose-500 text-white' :
                i < ['service', 'datetime', 'personal', 'confirmation'].indexOf(booking.step) ? 'bg-green-500 text-white' :
                'bg-gray-200 text-gray-600'
              }`}>
                {i < ['service', 'datetime', 'personal', 'confirmation'].indexOf(booking.step) ? '✓' : i + 1}
              </div>
              {i < 3 && <div className="w-20 h-1 bg-gray-200 mx-2" />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {booking.step === 'service' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Choose Your Service</h2>
            <div className="grid gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className="border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-rose-500 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-gray-600 mt-2">{service.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-rose-600">${service.price}</div>
                      <div className="text-sm text-gray-500">{service.duration} min</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {booking.step === 'datetime' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Select Date & Time</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Date</label>
                <div className="space-y-2">
                  {next7Days.map((day) => (
                    <button
                      key={day.value}
                      onClick={() => setBooking({ ...booking, date: day.value })}
                      className={`w-full text-left p-4 rounded-lg border-2 ${
                        booking.date === day.value ? 'border-rose-500 bg-rose-50' : 'border-gray-200'
                      } hover:border-rose-500 transition-colors`}
                    >
                      <div className="font-semibold capitalize">{day.label}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Time</label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setBooking({ ...booking, time })}
                      disabled={!booking.date}
                      className={`p-3 rounded-lg border-2 ${
                        booking.time === time ? 'border-rose-500 bg-rose-50' : 'border-gray-200'
                      } ${!booking.date ? 'opacity-50 cursor-not-allowed' : 'hover:border-rose-500'} transition-colors`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {booking.date && booking.time && (
              <button
                onClick={() => setBooking({ ...booking, step: 'personal' })}
                className="mt-6 w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition-colors"
              >
                Continue
              </button>
            )}
            <button
              onClick={() => setBooking({ ...booking, step: 'service' })}
              className="mt-3 w-full text-gray-600 py-2 hover:text-gray-900"
            >
              ← Back to Services
            </button>
          </div>
        )}

        {booking.step === 'personal' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Information</h2>
            <form onSubmit={handlePersonalSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline w-4 h-4 mr-1" /> Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={booking.name}
                    onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline w-4 h-4 mr-1" /> Email
                  </label>
                  <input
                    type="email"
                    required
                    value={booking.email}
                    onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-1" /> Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={booking.phone}
                    onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  value={booking.notes}
                  onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Any special requests or preferences..."
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setBooking({ ...booking, step: 'datetime' })}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition-colors"
                >
                  Continue →
                </button>
              </div>
            </form>
          </div>
        )}

        {booking.step === 'confirmation' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Confirm Your Booking</h2>
            <div className="bg-rose-50 rounded-lg p-6 mb-6">
              <div className="grid gap-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-semibold">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold">
                    {new Date(booking.date).toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      day: 'numeric', 
                      month: 'long' 
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-semibold">{booking.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">{selectedService?.duration} minutes</span>
                </div>
                <div className="flex justify-between border-t pt-4 mt-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold text-rose-600">${selectedService?.price}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-3">Contact Information</h3>
              <div className="grid gap-2">
                <div><span className="text-gray-600">Name:</span> {booking.name}</div>
                <div><span className="text-gray-600">Email:</span> {booking.email}</div>
                <div><span className="text-gray-600">Phone:</span> {booking.phone}</div>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setBooking({ ...booking, step: 'personal' })}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                <CreditCard className="inline w-4 h-4 mr-2" />
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
