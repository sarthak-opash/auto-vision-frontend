import { useState, useEffect } from 'react'
import { useAuth } from '../context/auth-context'
import { Users, Mail, Shield, Calendar, User as UserIcon } from 'lucide-react'

export function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const { token, user } = useAuth()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/data/users', {
          headers: { 'x-auth-token': token || '' }
        })
        const data = await res.json()
        if (Array.isArray(data)) {
          setUsers(data)
        }
      } catch (err) {
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    if (user?.role === 'admin') {
      fetchUsers()
    }
  }, [token, user])

  if (user?.role !== 'admin') {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="text-slate-500 mt-2">You do not have permission to view this page.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">User Management</h1>
          <p className="text-slate-500 font-medium">Manage all registered users and their roles</p>
        </div>
        <div className="px-4 py-2 bg-brand-50 rounded-full border border-brand-100 flex items-center gap-2">
          <Users className="text-[#984216]" size={16} />
          <span className="text-xs font-bold text-[#984216] uppercase tracking-wider">{users.length} Total Users</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <p className="text-slate-400 font-medium">Loading users...</p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">User</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Contact</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((u: any) => (
                <tr key={u._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-[#984216]">
                        <UserIcon size={18} />
                      </div>
                      <span className="font-bold text-slate-900">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail size={14} className="text-slate-400" />
                      {u.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      u.role === 'admin' ? 'bg-[#984216]/10 text-[#984216]' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Shield size={10} />
                      {u.role}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" />
                      {new Date(u.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
