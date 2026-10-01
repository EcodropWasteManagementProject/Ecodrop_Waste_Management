import StatusBadge from '../../components/common/StatusBadge'
import { useAppData } from '../../context/AppDataContext'
import { useState } from 'react'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import EmptyState from '../../components/common/EmptyState'

export default function Users() {
  const { users, updateUserStatus } = useAppData()
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('')
  const [pendingUser, setPendingUser] = useState(null)
  const visible = users.filter((user) => `${user.name} ${user.email}`.toLowerCase().includes(query.toLowerCase()) && (!role || user.role === role))
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Users</h2>
      <div className="mt-4 flex flex-wrap gap-3"><input aria-label="Search users" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search users..." className="rounded-xl border border-slate-200 px-4 py-2" /><select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-2"><option value="">All roles</option><option>CITIZEN</option><option>VENDOR</option><option>ADMIN</option></select></div>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Name</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Email</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Role</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {visible.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3 text-sm text-slate-900">{user.name}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{user.email}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{user.role}</td>
                <td className="px-4 py-3"><StatusBadge status={user.status === 'ACTIVE' ? 'APPROVED' : 'PENDING'} /> <button onClick={() => setPendingUser(user)} className="ml-3 text-sm font-medium text-emerald-700">{user.status === 'ACTIVE' ? 'Suspend' : 'Activate'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!visible.length && <EmptyState title="No users found" description="Try a different search or role filter." />}
      <ConfirmDialog isOpen={Boolean(pendingUser)} title={pendingUser?.status === 'ACTIVE' ? 'Suspend user?' : 'Activate user?'} message="This mock account status will be updated immediately." onCancel={() => setPendingUser(null)} onConfirm={() => { updateUserStatus(pendingUser.id); setPendingUser(null) }} />
    </div>
  )
}
