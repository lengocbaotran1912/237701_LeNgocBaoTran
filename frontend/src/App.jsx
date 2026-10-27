import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ employeeId: '', fullName: '', email: '', position: '', department: '', salary: '' });

  // Địa chỉ API backend của bạn
  const API_URL = 'http://localhost:5000/api/employees';

  // Lấy danh sách nhân viên từ Backend
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API_URL);
      setEmployees(res.data);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Thêm nhân viên mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, form);
      setForm({ employeeId: '', fullName: '', email: '', position: '', department: '', salary: '' });
      fetchEmployees();
      alert("Thêm nhân viên thành công!");
    } catch (err) {
      alert("Lỗi khi thêm nhân viên!");
    }
  };

  // Xóa nhân viên
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này không?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchEmployees();
      } catch (err) {
        alert("Lỗi khi xóa nhân viên!");
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>HỆ THỐNG QUẢN LÝ NHÂN SỰ</h2>

      {/* Form thêm nhân viên */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input placeholder="Mã NV" value={form.employeeId} onChange={e => setForm({...form, employeeId: e.target.value})} required />
        <input placeholder="Họ tên" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} required />
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        <input placeholder="Chức vụ" value={form.position} onChange={e => setForm({...form, position: e.target.value})} required />
        <input placeholder="Phòng ban" value={form.department} onChange={e => setForm({...form, department: e.target.value})} required />
        <input placeholder="Lương" type="number" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} required />
        <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer' }}>
          Thêm nhân viên
        </button>
      </form>

      {/* Bảng danh sách nhân viên */}
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Mã NV</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Chức Vụ</th>
            <th>Phòng Ban</th>
            <th>Lương</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.employeeId}</td>
              <td>{emp.fullName}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>{emp.salary}</td>
              <td>
                <button onClick={() => handleDelete(emp._id)} style={{ color: 'white', backgroundColor: 'red', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;