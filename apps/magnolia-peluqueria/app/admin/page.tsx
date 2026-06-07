import { Suspense } from 'react'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Revenue" value="$4,000" change="+12%" trend="up" />
        <StatCard title="Bookings" value="120" change="+8%" trend="up" />
        <StatCard title="Products Sold" value="45" change="+15%" trend="up" />
        <StatCard title="Active Users" value="89" change="-2%" trend="down" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentBookings />
        <TopProducts />
      </div>
    </div>
  )
}

function StatCard({ title, value, change, trend }: { 
  title: string; value: string; change: string; trend: 'up' | 'down' 
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      <p className={`text-sm mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {change} vs last month
      </p>
    </div>
  )
}

function RecentBookings() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b">
            <div>
              <p className="font-medium">Maria Gonzalez</p>
              <p className="text-sm text-gray-500">Haircut + Styling</p>
            </div>
            <div className="text-right">
              <p className="text-sm">Today, {2 + i}:00 PM</p>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Confirmed
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TopProducts() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Top Products</h3>
      <div className="space-y-4">
        {[
          { name: 'Hair Care Package', sales: 23, revenue: '$690' },
          { name: 'Gift Card - $50', sales: 18, revenue: '$900' },
          { name: 'Styling Products Set', sales: 15, revenue: '$375' },
          { name: 'Treatment Bundle', sales: 12, revenue: '$480' },
          { name: 'Accessories Pack', sales: 9, revenue: '$225' }
        ].map((product, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b">
            <div className="flex-1">
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-500">{product.sales} sold</p>
            </div>
            <p className="font-semibold text-gray-900">{product.revenue}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
