import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { 
  FiMail, 
  FiSearch, 
  FiFilter, 
  FiEye, 
  FiEdit, 
  FiTrash2,
  FiClock,
  FiCheckCircle,
  FiMessageSquare,
  FiUser,
  FiPhone,
  FiCalendar,
  FiRefreshCw,
  FiDownload,
  FiMoreVertical,
  FiX
} from 'react-icons/fi'
import { contactAPI } from '../../utils/api'
import LoadingSpinner from '../../components/ui/LoadingSpinner'

const AdminContacts = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('')
  const [selectedContact, setSelectedContact] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [adminNotes, setAdminNotes] = useState('')
  const [newStatus, setNewStatus] = useState('')

  const queryClient = useQueryClient()

  // Fetch contacts
  const { data: contactsData, isLoading, error, refetch } = useQuery(
    ['admin-contacts', searchQuery, statusFilter, subjectFilter],
    () => contactAPI.getContacts({
      search: searchQuery,
      status: statusFilter,
      subject: subjectFilter,
      limit: 50
    }),
    {
      refetchInterval: 30000, // Refetch every 30 seconds
      onError: (error) => {
        console.error('Admin contacts API error:', error)
        toast.error('Failed to load contact messages')
      }
    }
  )

  // Fetch stats
  const { data: statsData } = useQuery(
    'contact-stats',
    () => contactAPI.getStats(),
    {
      refetchInterval: 60000, // Refetch every minute
    }
  )

  // Update status mutation
  const updateStatusMutation = useMutation(
    ({ id, status, notes }) => contactAPI.updateStatus(id, { status, adminNotes: notes }),
    {
      onSuccess: () => {
        toast.success('Status updated successfully')
        queryClient.invalidateQueries(['admin-contacts'])
        queryClient.invalidateQueries('contact-stats')
        setIsDetailOpen(false)
        setSelectedContact(null)
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update status')
      }
    }
  )

  // Delete contact mutation
  const deleteContactMutation = useMutation(
    (id) => contactAPI.deleteContact(id),
    {
      onSuccess: () => {
        toast.success('Contact deleted successfully')
        queryClient.invalidateQueries(['admin-contacts'])
        queryClient.invalidateQueries('contact-stats')
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to delete contact')
      }
    }
  )

  const handleViewContact = (contact) => {
    setSelectedContact(contact)
    setAdminNotes(contact.adminNotes || '')
    setNewStatus(contact.status)
    setIsDetailOpen(true)
  }

  const handleUpdateStatus = () => {
    if (selectedContact) {
      updateStatusMutation.mutate({
        id: selectedContact._id,
        status: newStatus,
        notes: adminNotes
      })
    }
  }

  const handleDeleteContact = (contact) => {
    if (window.confirm('Are you sure you want to delete this contact message?')) {
      deleteContactMutation.mutate(contact._id)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-yellow-100 text-yellow-800'
      case 'read': return 'bg-blue-100 text-blue-800'
      case 'replied': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return <FiClock className="w-4 h-4" />
      case 'read': return <FiEye className="w-4 h-4" />
      case 'replied': return <FiCheckCircle className="w-4 h-4" />
      case 'closed': return <FiMessageSquare className="w-4 h-4" />
      default: return <FiClock className="w-4 h-4" />
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const contacts = contactsData?.data?.contacts || contactsData?.contacts || []
  const stats = statsData?.data?.stats || statsData?.stats || {}

  return (
    <>
      <Helmet>
        <title>Contact Messages - Admin Dashboard | Kommercen</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
                <p className="text-gray-600 mt-2">Manage customer inquiries and support requests</p>
              </div>
              <button
                onClick={() => refetch()}
                className="btn-outline flex items-center"
              >
                <FiRefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Messages</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total || 0}</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                  <FiMail className="w-6 h-6" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Messages</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.new || 0}</p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                  <FiClock className="w-6 h-6" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Replied</p>
                  <p className="text-2xl font-bold text-green-600">{stats.replied || 0}</p>
                </div>
                <div className="p-3 rounded-lg bg-green-100 text-green-600">
                  <FiCheckCircle className="w-6 h-6" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Closed</p>
                  <p className="text-2xl font-bold text-gray-600">{stats.closed || 0}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-100 text-gray-600">
                  <FiMessageSquare className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Subjects</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contacts Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Contact Messages</h2>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-12">
                <FiMail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No contact messages found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contacts.map((contact, index) => (
                      <motion.tr
                        key={contact._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {contact.firstName} {contact.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{contact.email}</div>
                            {contact.phone && (
                              <div className="text-sm text-gray-500">{contact.phone}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 capitalize">{contact.subject}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                            {getStatusIcon(contact.status)}
                            <span className="ml-1 capitalize">{contact.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(contact.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleViewContact(contact)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <FiEye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteContact(contact)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Contact Detail Modal */}
        {isDetailOpen && selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Contact Message Details</h3>
                  <button
                    onClick={() => setIsDetailOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FiUser className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {selectedContact.firstName} {selectedContact.lastName}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FiMail className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{selectedContact.email}</span>
                      </div>
                      {selectedContact.phone && (
                        <div className="flex items-center">
                          <FiPhone className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{selectedContact.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <FiCalendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{formatDate(selectedContact.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Message Details</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Subject:</span>
                        <span className="text-sm text-gray-900 ml-2 capitalize">{selectedContact.subject}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Status:</span>
                        <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedContact.status)}`}>
                          {getStatusIcon(selectedContact.status)}
                          <span className="ml-1 capitalize">{selectedContact.status}</span>
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">ID:</span>
                        <span className="text-sm text-gray-900 ml-2 font-mono">{selectedContact._id}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Message</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                {/* Admin Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add internal notes about this contact..."
                  />
                </div>

                {/* Status Update */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsDetailOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateStatus}
                    disabled={updateStatusMutation.isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {updateStatusMutation.isLoading ? (
                      <div className="flex items-center">
                        <LoadingSpinner size="sm" />
                        <span className="ml-2">Updating...</span>
                      </div>
                    ) : (
                      'Update Status'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  )
}

export default AdminContacts
