import { Suspense } from 'react'

export default function AdminBookings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Booking
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium">{['MG', 'LC', 'JR', 'AS', 'PM'][i % 5]}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {['Maria Gonzalez', 'Laura Caceres', 'Juan Ramirez', 'Ana Silva', 'Pedro Martinez'][i % 5]}
                      </div>
                      <div className="text-sm text-gray-500">
                        {['maria@email.com', 'laura@email.com', 'juan@email.com', 'ana@email.com', 'pedro@email.com'][i % 5]}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{['Haircut', 'Hair Color', 'Treatment', 'Styling', 'Package'][i % 5]}</div>
                  <div className="text-sm text-gray-500">45 min</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">2026-05-{20 + (i % 10)} {9 + (i % 8)}:{(i * 7) % 60} AM</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    i % 3 === 0 ? 'bg-yellow-100 text-yellow-800' : 
                    i % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {i % 3 === 0 ? 'Pending' : i % 2 === 0 ? 'Confirmed' : 'Completed'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Edit</a>
                  <a href="#" className="text-red-600 hover:text-red-900">Cancel</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
