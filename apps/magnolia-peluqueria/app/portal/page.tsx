import Link from 'next/link'

export default function CustomerPortalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">My Portal</h1>
          <Link href="/" className="text-rose-600 hover:text-rose-700">
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-rose-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-rose-600">MG</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Maria Gonzalez</h2>
                <p className="text-gray-500">Premium Member</p>
              </div>

              <nav className="space-y-2">
                <Link href="/portal" className="block px-4 py-2 bg-rose-50 text-rose-600 rounded-lg font-medium">
                  Overview
                </Link>
                <Link href="/portal/bookings" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                  My Bookings
                </Link>
                <Link href="/portal/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                  My Orders
                </Link>
                <Link href="/portal/wishlist" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                  Wishlist
                </Link>
                <Link href="/portal/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                  Settings
                </Link>
              </nav>
            </div>

            {/* Loyalty Points */}
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-md p-6 mt-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Loyalty Points</h3>
                <span className="text-2xl">🏆</span>
              </div>
              <div className="text-4xl font-bold mb-2">1,250</div>
              <p className="text-rose-100 text-sm mb-4">Points earned</p>
              <div className="bg-white/20 rounded-full p-1">
                <div className="bg-white rounded-full h-2" style={{ width: '62%' }}></div>
              </div>
              <p className="text-sm mt-2 text-rose-100">2,000 points until Gold status</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500">Total Bookings</span>
                  <span className="text-2xl">📅</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">12</div>
                <p className="text-sm text-green-600 mt-1">+2 this month</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500">Total Spent</span>
                  <span className="text-2xl">💰</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">$890</div>
                <p className="text-sm text-green-600 mt-1">+$145 this month</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500">Next Booking</span>
                  <span className="text-2xl">✨</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">2d</div>
                <p className="text-sm text-gray-500 mt-1">Haircut & Styling</p>
              </div>
            </div>

            {/* Upcoming Booking */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Booking</h3>
              <div className="flex items-center justify-between bg-rose-50 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-rose-100 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">💇‍♀️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Haircut & Styling</h4>
                    <p className="text-gray-600">45 minutes • $45</p>
                    <p className="text-sm text-gray-500">
                      {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long' 
                      })} at 10:00 AM
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
                    Reschedule
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { type: 'booking', title: 'Booked Haircut & Styling', date: '2 hours ago', icon: '📅' },
                  { type: 'purchase', title: 'Purchased Hair Care Set', date: '3 days ago', icon: '🛒' },
                  { type: 'review', title: 'Left a 5-star review', date: '1 week ago', icon: '⭐' },
                  { type: 'points', title: 'Earned 50 points', date: '1 week ago', icon: '🏆' }
                ].map((activity, i) => (
                  <div key={i} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <span className="text-xl">{activity.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/booking" className="block text-center p-4 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors">
                  <div className="text-3xl mb-2">📅</div>
                  <div className="font-medium text-gray-900">Book Now</div>
                </Link>
                <Link href="/products" className="block text-center p-4 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors">
                  <div className="text-3xl mb-2">🛍️</div>
                  <div className="font-medium text-gray-900">Shop</div>
                </Link>
                <Link href="/gift-cards" className="block text-center p-4 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors">
                  <div className="text-3xl mb-2">🎁</div>
                  <div className="font-medium text-gray-900">Gift Cards</div>
                </Link>
                <Link href="/blog" className="block text-center p-4 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors">
                  <div className="text-3xl mb-2">📖</div>
                  <div className="font-medium text-gray-900">Blog</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
