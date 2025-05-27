import React, { useState } from 'react';

export default function UserForm() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', dob: '', gender: '', phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(form, null, 2));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg max-w-xl mx-auto space-y-4">
      <h3 className="text-xl font-semibold text-gray-700">Enter Your Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="First Name" required
          className="p-2 border rounded" value={form.firstName}
          onChange={e => setForm({ ...form, firstName: e.target.value })} />
        <input type="text" placeholder="Last Name" required
          className="p-2 border rounded" value={form.lastName}
          onChange={e => setForm({ ...form, lastName: e.target.value })} />
        <input type="date" placeholder="DOB" required
          className="p-2 border rounded" value={form.dob}
          onChange={e => setForm({ ...form, dob: e.target.value })} />
        <select className="p-2 border rounded" value={form.gender}
          onChange={e => setForm({ ...form, gender: e.target.value })} required>
          <option value="">Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>
        <input type="tel" placeholder="Phone Number" required
          className="p-2 border rounded col-span-2" value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })} />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Save Details
      </button>
    </form>
  );
}
