'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import usersData from '@/data/users.json';
import adminsData from '@/data/admins.json';

export default function UsersPage() {
  const [allUsers, setAllUsers] = useState([...usersData, ...adminsData]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    role: 'initiator',
    branch: 'Head Office',
    password: 'password123',
  });

  const handleAddUser = () => {
    // In a real app, this would hit an API
    const addedUser = {
      ...newUser,
      id: Math.random().toString(36).substr(2, 9),
    };
    setAllUsers([...allUsers, addedUser]);
    setShowAddForm(false);
    setNewUser({
      name: '',
      username: '',
      email: '',
      role: 'initiator',
      branch: 'Head Office',
      password: 'password123',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-800">User Management</h2>
          <p className="text-sm text-slate-500 mt-1">Manage staff access and roles.</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : '+ Add Staff'}
        </Button>
      </div>

      {showAddForm && (
        <Card className="bg-slate-50/50 border-slate-200">
          <CardHeader>
            <CardTitle>Add New Staff Member</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
                <Input value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Username</label>
                <Input value={newUser.username} onChange={(e) => setNewUser({...newUser, username: e.target.value})} placeholder="e.g. jdoe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                <Input type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} placeholder="email@bank.com.np" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Role</label>
                <Select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})}>
                  <option value="initiator">Initiator</option>
                  <option value="supporter">Supporter</option>
                  <option value="reviewer">Reviewer</option>
                  <option value="approver">Approver</option>
                </Select>
                <p className="text-[10px] text-slate-400 mt-1">Admins cannot create other Admin roles.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Branch</label>
                <Input value={newUser.branch} onChange={(e) => setNewUser({...newUser, branch: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Default Password</label>
                <Input value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} />
              </div>
            </div>
            <Button onClick={handleAddUser}>Create Staff User</Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>System Users</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Username</th>
                  <th className="px-6 py-3 font-medium">Branch</th>
                  <th className="px-6 py-3 font-medium">Role</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-medium text-slate-800">{user.name}</td>
                    <td className="px-6 py-3 text-slate-500">{user.username}</td>
                    <td className="px-6 py-3 text-slate-600">{user.branch}</td>
                    <td className="px-6 py-3">
                      <Badge variant={user.role === 'super_admin' ? 'warning' : user.role === 'super_staff' ? 'success' : user.role === 'admin' ? 'danger' : 'info'}>
                        {user.role.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-3">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
