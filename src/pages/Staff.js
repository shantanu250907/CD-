// // import React, { useState } from 'react';
// // import './Staff.css';

// // const Staff = () => {
// //   // Mock data for staff with additional fields
// //   const [staff, setStaff] = useState([
// //     {
// //       id: 1,
// //       name: 'Vikram Singh',
// //       role: 'Receptionist',
// //       department: 'Front Office',
// //       shift: 'Morning (8am-4pm)',
// //       status: 'On Duty',
// //       attendance: '98%',
// //       contact: '+91 98765 43210',
// //       email: 'vikram.singh@medcare.com',
// //       joinDate: '2022-06-15',
// //       salary: '₹25,000',
// //       image: 'https://via.placeholder.com/50'
// //     },
// //     {
// //       id: 2,
// //       name: 'Rahul Verma',
// //       role: 'Nurse',
// //       department: 'Nursing',
// //       shift: 'Evening (4pm-12am)',
// //       status: 'On Duty',
// //       attendance: '95%',
// //       contact: '+91 98765 43211',
// //       email: 'rahul.verma@medcare.com',
// //       joinDate: '2023-01-10',
// //       salary: '₹28,000',
// //       image: 'https://via.placeholder.com/50'
// //     },
// //     {
// //       id: 3,
// //       name: 'Deepa Krishnan',
// //       role: 'Lab Technician',
// //       department: 'Laboratory',
// //       shift: 'Morning (8am-4pm)',
// //       status: 'On Leave',
// //       attendance: '92%',
// //       contact: '+91 98765 43212',
// //       email: 'deepa.k@medcare.com',
// //       joinDate: '2021-11-20',
// //       salary: '₹32,000',
// //       image: 'https://via.placeholder.com/50'
// //     },
// //     {
// //       id: 4,
// //       name: 'Sanjay Gupta',
// //       role: 'Accountant',
// //       department: 'Finance',
// //       shift: 'General (10am-6pm)',
// //       status: 'On Duty',
// //       attendance: '100%',
// //       contact: '+91 98765 43213',
// //       email: 'sanjay.g@medcare.com',
// //       joinDate: '2022-03-05',
// //       salary: '₹35,000',
// //       image: 'https://via.placeholder.com/50'
// //     },
// //     {
// //       id: 5,
// //       name: 'Meera Nair',
// //       role: 'Pharmacist',
// //       department: 'Pharmacy',
// //       shift: 'Morning (8am-4pm)',
// //       status: 'On Duty',
// //       attendance: '97%',
// //       contact: '+91 98765 43214',
// //       email: 'meera.nair@medcare.com',
// //       joinDate: '2023-05-12',
// //       salary: '₹30,000',
// //       image: 'https://via.placeholder.com/50'
// //     }
// //   ]);

// //   const [showForm, setShowForm] = useState(false);
// //   const [showDetails, setShowDetails] = useState(null);
// //   const [editingStaff, setEditingStaff] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [filterRole, setFilterRole] = useState('all');
// //   const [filterStatus, setFilterStatus] = useState('all');
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     role: '',
// //     department: '',
// //     shift: '',
// //     status: 'On Duty',
// //     contact: '',
// //     email: '',
// //     salary: '',
// //     joinDate: ''
// //   });

// //   // Get unique roles for filter
// //   const roles = ['all', ...new Set(staff.map(s => s.role))];

// //   // Handle form input change
// //   const handleInputChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   // Add new staff
// //   const handleAddStaff = (e) => {
// //     e.preventDefault();

// //     if (editingStaff) {
// //       // Update existing staff
// //       setStaff(staff.map(s =>
// //         s.id === editingStaff.id ? { ...s, ...formData } : s
// //       ));
// //       alert('✅ Staff member updated successfully!');
// //     } else {
// //       // Add new staff
// //       const newStaff = {
// //         id: staff.length + 1,
// //         ...formData,
// //         attendance: '100%',
// //         image: 'https://via.placeholder.com/50'
// //       };
// //       setStaff([...staff, newStaff]);
// //       alert('✅ Staff member added successfully!');
// //     }

// //     setShowForm(false);
// //     setEditingStaff(null);
// //     setFormData({
// //       name: '', role: '', department: '', shift: '',
// //       status: 'On Duty', contact: '', email: '', salary: '', joinDate: ''
// //     });
// //   };

// //   // Edit staff
// //   const handleEdit = (member) => {
// //     setEditingStaff(member);
// //     setFormData({
// //       name: member.name,
// //       role: member.role,
// //       department: member.department || '',
// //       shift: member.shift,
// //       status: member.status,
// //       contact: member.contact,
// //       email: member.email || '',
// //       salary: member.salary || '',
// //       joinDate: member.joinDate || ''
// //     });
// //     setShowForm(true);
// //   };

// //   // Delete staff
// //   const handleDelete = (id) => {
// //     const memberToDelete = staff.find(s => s.id === id);

// //     if (window.confirm(`Are you sure you want to delete ${memberToDelete.name}?`)) {
// //       setStaff(staff.filter(s => s.id !== id));
// //       alert('✅ Staff member deleted successfully!');
// //     }
// //   };

// //   // View staff details
// //   const handleViewDetails = (member) => {
// //     setShowDetails(member);
// //   };

// //   // Toggle status
// //   const handleToggleStatus = (id) => {
// //     setStaff(staff.map(member => {
// //       if (member.id === id) {
// //         const newStatus = member.status === 'On Duty' ? 'Off Duty' :
// //           member.status === 'Off Duty' ? 'On Leave' : 'On Duty';
// //         return { ...member, status: newStatus };
// //       }
// //       return member;
// //     }));
// //   };

// //   // Filter staff
// //   const filteredStaff = staff.filter(member => {
// //     const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       member.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       member.contact.includes(searchTerm);

// //     const matchesRole = filterRole === 'all' || member.role === filterRole;
// //     const matchesStatus = filterStatus === 'all' || member.status === filterStatus;

// //     return matchesSearch && matchesRole && matchesStatus;
// //   });

// //   // Statistics
// //   const stats = {
// //     total: staff.length,
// //     onDuty: staff.filter(s => s.status === 'On Duty').length,
// //     offDuty: staff.filter(s => s.status === 'Off Duty').length,
// //     onLeave: staff.filter(s => s.status === 'On Leave').length
// //   };

// //   return (
// //     <div className="staff-page">
// //       <div className="page-header">
// //         <h2>👥 Staff Management</h2>
// //         <button className="btn btn-primary" onClick={() => {
// //           setEditingStaff(null);
// //           setFormData({ name: '', role: '', department: '', shift: '', status: 'On Duty', contact: '', email: '', salary: '', joinDate: '' });
// //           setShowForm(true);
// //         }}>
// //           + Add Staff Member
// //         </button>
// //       </div>

// //       {/* Statistics Cards */}
// //       <div className="staff-stats">
// //         <div className="stat-card">
// //           <span className="stat-label">Total Staff</span>
// //           <span className="stat-value">{stats.total}</span>
// //         </div>
// //         <div className="stat-card on-duty">
// //           <span className="stat-label">On Duty</span>
// //           <span className="stat-value">{stats.onDuty}</span>
// //         </div>
// //         <div className="stat-card off-duty">
// //           <span className="stat-label">Off Duty</span>
// //           <span className="stat-value">{stats.offDuty}</span>
// //         </div>
// //         <div className="stat-card on-leave">
// //           <span className="stat-label">On Leave</span>
// //           <span className="stat-value">{stats.onLeave}</span>
// //         </div>
// //       </div>

// //       {/* Search and Filters */}
// //       <div className="filters-section">
// //         <div className="search-bar">
// //           <input
// //             type="text"
// //             placeholder="🔍 Search by name, role, department, or contact..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             className="search-input"
// //           />
// //         </div>

// //         <div className="filter-buttons">
// //           <select
// //             className="filter-select"
// //             value={filterRole}
// //             onChange={(e) => setFilterRole(e.target.value)}
// //           >
// //             <option value="all">All Roles</option>
// //             {roles.filter(r => r !== 'all').map(role => (
// //               <option key={role} value={role}>{role}</option>
// //             ))}
// //           </select>

// //           <select
// //             className="filter-select"
// //             value={filterStatus}
// //             onChange={(e) => setFilterStatus(e.target.value)}
// //           >
// //             <option value="all">All Status</option>
// //             <option value="On Duty">On Duty</option>
// //             <option value="Off Duty">Off Duty</option>
// //             <option value="On Leave">On Leave</option>
// //           </select>
// //         </div>
// //       </div>

// //       {/* Add/Edit Modal */}
// //       {showForm && (
// //         <div className="modal-overlay" onClick={() => setShowForm(false)}>
// //           <div className="modal" onClick={(e) => e.stopPropagation()}>
// //             <h3>{editingStaff ? '✏️ Edit Staff Member' : '➕ Add New Staff Member'}</h3>
// //             <form onSubmit={handleAddStaff}>
// //               <div className="form-row">
// //                 <div className="form-group">
// //                   <label>Full Name *</label>
// //                   <input
// //                     type="text"
// //                     name="name"
// //                     value={formData.name}
// //                     onChange={handleInputChange}
// //                     placeholder="Enter full name"
// //                     required
// //                   />
// //                 </div>
// //                 <div className="form-group">
// //                   <label>Role *</label>
// //                   <select name="role" value={formData.role} onChange={handleInputChange} required>
// //                     <option value="">Select Role</option>
// //                     <option value="Receptionist">Receptionist</option>
// //                     <option value="Nurse">Nurse</option>
// //                     <option value="Lab Technician">Lab Technician</option>
// //                     <option value="Pharmacist">Pharmacist</option>
// //                     <option value="Accountant">Accountant</option>
// //                     <option value="Cleaner">Cleaner</option>
// //                     <option value="Security">Security</option>
// //                   </select>
// //                 </div>
// //               </div>

// //               <div className="form-row">
// //                 <div className="form-group">
// //                   <label>Department</label>
// //                   <input
// //                     type="text"
// //                     name="department"
// //                     value={formData.department}
// //                     onChange={handleInputChange}
// //                     placeholder="e.g., Nursing, Front Office"
// //                   />
// //                 </div>
// //                 <div className="form-group">
// //                   <label>Shift *</label>
// //                   <select name="shift" value={formData.shift} onChange={handleInputChange} required>
// //                     <option value="">Select Shift</option>
// //                     <option value="Morning (8am-4pm)">Morning (8am-4pm)</option>
// //                     <option value="Evening (4pm-12am)">Evening (4pm-12am)</option>
// //                     <option value="Night (12am-8am)">Night (12am-8am)</option>
// //                     <option value="General (10am-6pm)">General (10am-6pm)</option>
// //                   </select>
// //                 </div>
// //               </div>

// //               <div className="form-row">
// //                 <div className="form-group">
// //                   <label>Contact Number *</label>
// //                   <input
// //                     type="text"
// //                     name="contact"
// //                     value={formData.contact}
// //                     onChange={handleInputChange}
// //                     placeholder="+91 98765 43210"
// //                     required
// //                   />
// //                 </div>
// //                 <div className="form-group">
// //                   <label>Email</label>
// //                   <input
// //                     type="email"
// //                     name="email"
// //                     value={formData.email}
// //                     onChange={handleInputChange}
// //                     placeholder="email@example.com"
// //                   />
// //                 </div>
// //               </div>

// //               <div className="form-row">
// //                 <div className="form-group">
// //                   <label>Join Date</label>
// //                   <input
// //                     type="date"
// //                     name="joinDate"
// //                     value={formData.joinDate}
// //                     onChange={handleInputChange}
// //                   />
// //                 </div>
// //                 <div className="form-group">
// //                   <label>Salary (₹)</label>
// //                   <input
// //                     type="text"
// //                     name="salary"
// //                     value={formData.salary}
// //                     onChange={handleInputChange}
// //                     placeholder="e.g., ₹25,000"
// //                   />
// //                 </div>
// //               </div>

// //               <div className="form-group">
// //                 <label>Status</label>
// //                 <select name="status" value={formData.status} onChange={handleInputChange}>
// //                   <option value="On Duty">On Duty</option>
// //                   <option value="Off Duty">Off Duty</option>
// //                   <option value="On Leave">On Leave</option>
// //                 </select>
// //               </div>

// //               <div className="modal-actions">
// //                 <button type="submit" className="btn btn-primary">
// //                   {editingStaff ? 'Update Staff' : 'Add Staff'}
// //                 </button>
// //                 <button type="button" className="btn" onClick={() => {
// //                   setShowForm(false);
// //                   setEditingStaff(null);
// //                 }}>Cancel</button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* Staff Details Modal */}
// //       {showDetails && (
// //         <div className="modal-overlay" onClick={() => setShowDetails(null)}>
// //           <div className="modal" onClick={(e) => e.stopPropagation()}>
// //             <h3>👤 Staff Details</h3>
// //             <div className="staff-details">
// //               <div className="detail-avatar">
// //                 <img src={showDetails.image} alt={showDetails.name} />
// //               </div>
// //               <div className="detail-info">
// //                 <div className="detail-row">
// //                   <strong>Name:</strong> {showDetails.name}
// //                 </div>
// //                 <div className="detail-row">
// //                   <strong>Role:</strong> {showDetails.role}
// //                 </div>
// //                 <div className="detail-row">
// //                   <strong>Department:</strong> {showDetails.department || 'N/A'}
// //                 </div>
// //                 <div className="detail-row">
// //                   <strong>Shift:</strong> {showDetails.shift}
// //                 </div>
// //                 <div className="detail-row">
// //                   <strong>Status:</strong>
// //                   <span className={`status-badge status-${showDetails.status.toLowerCase().replace(' ', '-')}`}>
// //                     {showDetails.status}
// //                   </span>
// //                 </div>
// //                 <div className="detail-row">
// //                   <strong>Attendance:</strong> {showDetails.attendance}
// //                 </div>
// //                 <div className="detail-row">
// //                   <strong>Contact:</strong> {showDetails.contact}
// //                 </div>
// //                 <div className="detail-row">
// //                   <strong>Email:</strong> {showDetails.email || 'N/A'}
// //                 </div>
// //                 <div className="detail-row">
// //                   <strong>Join Date:</strong> {showDetails.joinDate || 'N/A'}
// //                 </div>
// //                 <div className="detail-row">
// //                   <strong>Salary:</strong> {showDetails.salary || 'N/A'}
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="modal-actions">
// //               <button className="btn" onClick={() => setShowDetails(null)}>Close</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Staff Table */}
// //       <div className="table-container">
// //         {filteredStaff.length > 0 ? (
// //           <table>
// //             <thead>
// //               <tr>
// //                 <th>Staff Member</th>
// //                 <th>Role</th>
// //                 <th>Department</th>
// //                 <th>Shift</th>
// //                 <th>Status</th>
// //                 <th>Attendance</th>
// //                 <th>Contact</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredStaff.map(member => (
// //                 <tr key={member.id}>
// //                   <td>
// //                     <div className="staff-info">
// //                       <img src={member.image} alt={member.name} className="staff-image" />
// //                       <div className="staff-name">
// //                         <span>{member.name}</span>
// //                         <small>{member.email}</small>
// //                       </div>
// //                     </div>
// //                   </td>
// //                   <td>
// //                     <span className={`role-badge role-${member.role.toLowerCase().replace(' ', '-')}`}>
// //                       {member.role}
// //                     </span>
// //                   </td>
// //                   <td>{member.department || '-'}</td>
// //                   <td>{member.shift}</td>
// //                   <td>
// //                     <span className={`status-badge status-${member.status.toLowerCase().replace(' ', '-')}`}>
// //                       {member.status}
// //                     </span>
// //                   </td>
// //                   <td>
// //                     <div className="attendance-cell">
// //                       <span className="attendance-value">{member.attendance}</span>
// //                       <div className="attendance-bar">
// //                         <div
// //                           className="attendance-progress"
// //                           style={{ width: member.attendance }}
// //                         ></div>
// //                       </div>
// //                     </div>
// //                   </td>
// //                   <td>{member.contact}</td>
// //                   <td>
// //                     <div className="action-buttons">
// //                       <button
// //                         className="btn-icon view"
// //                         onClick={() => handleViewDetails(member)}
// //                         title="View Details"
// //                       >
// //                         👁️
// //                       </button>
// //                       <button
// //                         className="btn-icon edit"
// //                         onClick={() => handleEdit(member)}
// //                         title="Edit"
// //                       >
// //                         ✏️
// //                       </button>
// //                       <button
// //                         className="btn-icon toggle"
// //                         onClick={() => handleToggleStatus(member.id)}
// //                         title="Toggle Status"
// //                       >
// //                         🔄
// //                       </button>
// //                       <button
// //                         className="btn-icon delete"
// //                         onClick={() => handleDelete(member.id)}
// //                         title="Delete"
// //                       >
// //                         🗑️
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         ) : (
// //           <div className="no-results">
// //             <p>🔍 No staff members found matching your criteria.</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Staff;


// import React, { useState, useEffect } from 'react';
// import './Staff.css';

// const Staff = () => {
//   const [staff, setStaff] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [showDetails, setShowDetails] = useState(null);
//   const [editingStaff, setEditingStaff] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterRole, setFilterRole] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     name: '',
//     role: '',
//     department: '',
//     shift: '',
//     status: 'On Duty',
//     contact: '',
//     email: '',
//     salary: '',
//     joinDate: ''
//   });

//   // ==================== FETCH STAFF FROM BACKEND ====================
//   const fetchStaff = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:8001/api/staff');
//       const data = await response.json();

//       if (data.success) {
//         setStaff(data.data);
//       } else {
//         console.error('Failed to fetch staff:', data.message);
//         // Fallback to mock data
//         setStaff(mockStaff);
//       }
//     } catch (error) {
//       console.error('Error fetching staff:', error);
//       // Fallback to mock data
//       setStaff(mockStaff);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Mock data for fallback
//   const mockStaff = [
    
//   ];

//   useEffect(() => {
//     fetchStaff();
//   }, []);

//   // Get unique roles for filter
//   const roles = ['all', ...new Set(staff.map(s => s.role))];

//   // Handle form input change
//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Add new staff
//   const handleAddStaff = async (e) => {
//     e.preventDefault();

//     try {
//       const staffData = {
//         ...formData,
//         attendance: '100%',
//         image: 'https://via.placeholder.com/50'
//       };

//       const response = await fetch('http://localhost:8001/api/staff', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(staffData)
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert('✅ Staff member added successfully!');
//         fetchStaff(); // Refresh the list
//       } else {
//         alert(`❌ Error: ${data.message}`);
//       }
//     } catch (error) {
//       console.error('Error adding staff:', error);
//       alert('❌ Failed to add staff member');
//     }

//     setShowForm(false);
//     setEditingStaff(null);
//     setFormData({
//       name: '', role: '', department: '', shift: '',
//       status: 'On Duty', contact: '', email: '', salary: '', joinDate: ''
//     });
//   };

//   // Edit staff
//   const handleEdit = (member) => {
//     setEditingStaff(member);
//     setFormData({
//       name: member.name,
//       role: member.role,
//       department: member.department || '',
//       shift: member.shift,
//       status: member.status,
//       contact: member.contact,
//       email: member.email || '',
//       salary: member.salary || '',
//       joinDate: member.joinDate || ''
//     });
//     setShowForm(true);
//   };

//   // Update staff
//   const handleUpdateStaff = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`http://localhost:8001/api/staff/${editingStaff.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert('✅ Staff member updated successfully!');
//         fetchStaff(); // Refresh the list
//       } else {
//         alert(`❌ Error: ${data.message}`);
//       }
//     } catch (error) {
//       console.error('Error updating staff:', error);
//       alert('❌ Failed to update staff member');
//     }

//     setShowForm(false);
//     setEditingStaff(null);
//     setFormData({
//       name: '', role: '', department: '', shift: '',
//       status: 'On Duty', contact: '', email: '', salary: '', joinDate: ''
//     });
//   };

//   // Delete staff
//   const handleDelete = async (id) => {
//     const memberToDelete = staff.find(s => s.id === id);

//     if (window.confirm(`Are you sure you want to delete ${memberToDelete.name}?`)) {
//       try {
//         const response = await fetch(`http://localhost:8001/api/staff/${id}`, {
//           method: 'DELETE'
//         });

//         const data = await response.json();

//         if (data.success) {
//           alert('✅ Staff member deleted successfully!');
//           fetchStaff(); // Refresh the list
//         } else {
//           alert(`❌ Error: ${data.message}`);
//         }
//       } catch (error) {
//         console.error('Error deleting staff:', error);
//         alert('❌ Failed to delete staff member');
//       }
//     }
//   };

//   // View staff details
//   const handleViewDetails = (member) => {
//     setShowDetails(member);
//   };

//   // Toggle status
//   const handleToggleStatus = async (id) => {
//     const member = staff.find(s => s.id === id);
//     const newStatus = member.status === 'On Duty' ? 'Off Duty' :
//       member.status === 'Off Duty' ? 'On Leave' : 'On Duty';

//     try {
//       const response = await fetch(`http://localhost:8001/api/staff/${id}/status`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status: newStatus })
//       });

//       const data = await response.json();

//       if (data.success) {
//         fetchStaff(); // Refresh the list
//       } else {
//         alert(`❌ Error: ${data.message}`);
//       }
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   // Filter staff
//   const filteredStaff = staff.filter(member => {
//     const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       member.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       member.contact.includes(searchTerm);

//     const matchesRole = filterRole === 'all' || member.role === filterRole;
//     const matchesStatus = filterStatus === 'all' || member.status === filterStatus;

//     return matchesSearch && matchesRole && matchesStatus;
//   });

//   // Statistics
//   const stats = {
//     total: staff.length,
//     onDuty: staff.filter(s => s.status === 'On Duty').length,
//     offDuty: staff.filter(s => s.status === 'Off Duty').length,
//     onLeave: staff.filter(s => s.status === 'On Leave').length
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//         <p>Loading staff data...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="staff-page">
//       <div className="page-header">
//         <h2>👥 Staff Management</h2>
//         <button className="btn btn-primary" onClick={() => {
//           setEditingStaff(null);
//           setFormData({ name: '', role: '', department: '', shift: '', status: 'On Duty', contact: '', email: '', salary: '', joinDate: '' });
//           setShowForm(true);
//         }}>
//           + Add Staff Member
//         </button>
//       </div>

//       {/* Statistics Cards */}
//       <div className="staff-stats">
//         <div className="stat-card total">
//           <span className="stat-label">Total Staff</span>
//           <span className="stat-value">{stats.total}</span>
//         </div>
//         <div className="stat-card on-duty">
//           <span className="stat-label">On Duty</span>
//           <span className="stat-value">{stats.onDuty}</span>
//         </div>
//         <div className="stat-card off-duty">
//           <span className="stat-label">Off Duty</span>
//           <span className="stat-value">{stats.offDuty}</span>
//         </div>
//         <div className="stat-card on-leave">
//           <span className="stat-label">On Leave</span>
//           <span className="stat-value">{stats.onLeave}</span>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="filters-section">
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="🔍 Search by name, role, department, or contact..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />
//         </div>

//         <div className="filter-buttons">
//           <select
//             className="filter-select"
//             value={filterRole}
//             onChange={(e) => setFilterRole(e.target.value)}
//           >
//             <option value="all">All Roles</option>
//             {roles.filter(r => r !== 'all').map(role => (
//               <option key={role} value={role}>{role}</option>
//             ))}
//           </select>

//           <select
//             className="filter-select"
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//           >
//             <option value="all">All Status</option>
//             <option value="On Duty">On Duty</option>
//             <option value="Off Duty">Off Duty</option>
//             <option value="On Leave">On Leave</option>
//           </select>
//         </div>
//       </div>

//       {/* Add/Edit Modal */}
//       {showForm && (
//         <div className="modal-overlay" onClick={() => setShowForm(false)}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <h3>{editingStaff ? '✏️ Edit Staff Member' : '➕ Add New Staff Member'}</h3>
//             <form onSubmit={editingStaff ? handleUpdateStaff : handleAddStaff}>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Full Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Enter full name"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Role *</label>
//                   <select name="role" value={formData.role} onChange={handleInputChange} required>
//                     <option value="">Select Role</option>
//                     <option value="Receptionist">Receptionist</option>
//                     <option value="Nurse">Nurse</option>
//                     <option value="Lab Technician">Lab Technician</option>
//                     <option value="Pharmacist">Pharmacist</option>
//                     <option value="Accountant">Accountant</option>
//                     <option value="Cleaner">Cleaner</option>
//                     <option value="Security">Security</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Department</label>
//                   <input
//                     type="text"
//                     name="department"
//                     value={formData.department}
//                     onChange={handleInputChange}
//                     placeholder="e.g., Nursing, Front Office"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Shift *</label>
//                   <select name="shift" value={formData.shift} onChange={handleInputChange} required>
//                     <option value="">Select Shift</option>
//                     <option value="Morning (8am-4pm)">Morning (8am-4pm)</option>
//                     <option value="Evening (4pm-12am)">Evening (4pm-12am)</option>
//                     <option value="Night (12am-8am)">Night (12am-8am)</option>
//                     <option value="General (10am-6pm)">General (10am-6pm)</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Contact Number *</label>
//                   <input
//                     type="text"
//                     name="contact"
//                     value={formData.contact}
//                     onChange={handleInputChange}
//                     placeholder="+91 98765 43210"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="email@example.com"
//                   />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Join Date</label>
//                   <input
//                     type="date"
//                     name="joinDate"
//                     value={formData.joinDate}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Salary (₹)</label>
//                   <input
//                     type="text"
//                     name="salary"
//                     value={formData.salary}
//                     onChange={handleInputChange}
//                     placeholder="e.g., ₹25,000"
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label>Status</label>
//                 <select name="status" value={formData.status} onChange={handleInputChange}>
//                   <option value="On Duty">On Duty</option>
//                   <option value="Off Duty">Off Duty</option>
//                   <option value="On Leave">On Leave</option>
//                 </select>
//               </div>

//               <div className="modal-actions">
//                 <button type="submit" className="btn btn-primary">
//                   {editingStaff ? 'Update Staff' : 'Add Staff'}
//                 </button>
//                 <button type="button" className="btn" onClick={() => {
//                   setShowForm(false);
//                   setEditingStaff(null);
//                 }}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Staff Details Modal */}
//       {showDetails && (
//         <div className="modal-overlay" onClick={() => setShowDetails(null)}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <h3>👤 Staff Details</h3>
//             <div className="staff-details">
//               <div className="detail-avatar">
//                 <img src={showDetails.image} alt={showDetails.name} />
//               </div>
//               <div className="detail-info">
//                 <div className="detail-row">
//                   <strong>Name:</strong> {showDetails.name}
//                 </div>
//                 <div className="detail-row">
//                   <strong>Role:</strong> {showDetails.role}
//                 </div>
//                 <div className="detail-row">
//                   <strong>Department:</strong> {showDetails.department || 'N/A'}
//                 </div>
//                 <div className="detail-row">
//                   <strong>Shift:</strong> {showDetails.shift}
//                 </div>
//                 <div className="detail-row">
//                   <strong>Status:</strong>
//                   <span className={`status-badge status-${showDetails.status.toLowerCase().replace(' ', '-')}`}>
//                     {showDetails.status}
//                   </span>
//                 </div>
//                 <div className="detail-row">
//                   <strong>Attendance:</strong> {showDetails.attendance}
//                 </div>
//                 <div className="detail-row">
//                   <strong>Contact:</strong> {showDetails.contact}
//                 </div>
//                 <div className="detail-row">
//                   <strong>Email:</strong> {showDetails.email || 'N/A'}
//                 </div>
//                 <div className="detail-row">
//                   <strong>Join Date:</strong> {showDetails.joinDate || 'N/A'}
//                 </div>
//                 <div className="detail-row">
//                   <strong>Salary:</strong> {showDetails.salary || 'N/A'}
//                 </div>
//               </div>
//             </div>
//             <div className="modal-actions">
//               <button className="btn" onClick={() => setShowDetails(null)}>Close</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Staff Table */}
//       <div className="table-container">
//         {filteredStaff.length > 0 ? (
//           <table>
//             <thead>
//               <tr>
//                 <th>Staff Member</th>
//                 <th>Role</th>
//                 <th>Department</th>
//                 <th>Shift</th>
//                 <th>Status</th>
//                 <th>Attendance</th>
//                 <th>Contact</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredStaff.map(member => (
//                 <tr key={member.id}>
//                   <td>
//                     <div className="staff-info">
//                       <img src={member.image} alt={member.name} className="staff-image" />
//                       <div className="staff-name">
//                         <span>{member.name}</span>
//                         <small>{member.email}</small>
//                       </div>
//                     </div>
//                   </td>
//                   <td>
//                     <span className={`role-badge role-${member.role.toLowerCase().replace(' ', '-')}`}>
//                       {member.role}
//                     </span>
//                   </td>
//                   <td>{member.department || '-'}</td>
//                   <td>{member.shift}</td>
//                   <td>
//                     <span className={`status-badge status-${member.status.toLowerCase().replace(' ', '-')}`}>
//                       {member.status}
//                     </span>
//                   </td>
//                   <td>
//                     <div className="attendance-cell">
//                       <span className="attendance-value">{member.attendance}</span>
//                       <div className="attendance-bar">
//                         <div
//                           className="attendance-progress"
//                           style={{ width: member.attendance }}
//                         ></div>
//                       </div>
//                     </div>
//                   </td>
//                   <td>{member.contact}</td>
//                   <td>
//                     <div className="action-buttons">
//                       <button
//                         className="btn-icon view"
//                         onClick={() => handleViewDetails(member)}
//                         title="View Details"
//                       >
//                         👁️
//                       </button>
//                       <button
//                         className="btn-icon edit"
//                         onClick={() => handleEdit(member)}
//                         title="Edit"
//                       >
//                         ✏️
//                       </button>
//                       <button
//                         className="btn-icon toggle"
//                         onClick={() => handleToggleStatus(member.id)}
//                         title="Toggle Status"
//                       >
//                         🔄
//                       </button>
//                       <button
//                         className="btn-icon delete"
//                         onClick={() => handleDelete(member.id)}
//                         title="Delete"
//                       >
//                         🗑️
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <div className="no-results">
//             <p>🔍 No staff members found matching your criteria.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Staff;


import React, { useState, useEffect } from 'react';
import './Staff.css';

// ✅ Use the same port as your backend (check which one is working)
// Try both ports to see which one works
const API_URL = 'http://localhost:8005';

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [editingStaff, setEditingStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    shift: '',
    status: 'On Duty',
    contact: '',
    email: '',
    salary: '',
    joinDate: ''
  });

  // ==================== FETCH STAFF FROM BACKEND ====================
  const fetchStaff = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('📤 Fetching staff from:', `${API_URL}/api/staff`);
      
      const response = await fetch(`${API_URL}/api/staff`);
      console.log('📥 Response status:', response.status);
      
      const data = await response.json();
      console.log('📥 Received data:', data);

      if (data.success) {
        // Check if data.data is array
        if (Array.isArray(data.data)) {
          setStaff(data.data);
          console.log(`✅ ${data.data.length} staff members loaded`);
        } else {
          console.error('Data.data is not an array:', data.data);
          setStaff([]);
        }
      } else {
        console.error('Failed to fetch staff:', data.message);
        setError(data.message || 'Failed to fetch staff');
        // Don't use mock data, show empty state
        setStaff([]);
      }
    } catch (error) {
      console.error('❌ Error fetching staff:', error);
      setError(error.message);
      setStaff([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Get unique roles for filter
  const roles = ['all', ...new Set(staff.map(s => s.role).filter(Boolean))];

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Add new staff
  const handleAddStaff = async (e) => {
    e.preventDefault();

    try {
      const staffData = {
        ...formData,
        attendance: '100%',
        image: `https://ui-avatars.com/api/?name=${formData.name.replace(' ', '+')}&background=2196F3&color=fff&size=50`
      };

      console.log('📤 Adding staff:', staffData);

      const response = await fetch(`${API_URL}/api/staff`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(staffData)
      });

      const data = await response.json();
      console.log('📥 Add response:', data);

      if (data.success) {
        alert('✅ Staff member added successfully!');
        fetchStaff(); // Refresh the list
        
        // Notify dashboard to update
        if (window.EventBus) {
          window.EventBus.emit('staffDataChanged');
        }
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error adding staff:', error);
      alert('❌ Failed to add staff member');
    }

    setShowForm(false);
    setEditingStaff(null);
    resetForm();
  };

  // Edit staff
  const handleEdit = (member) => {
    setEditingStaff(member);
    setFormData({
      name: member.name || '',
      role: member.role || '',
      department: member.department || '',
      shift: member.shift || '',
      status: member.status || 'On Duty',
      contact: member.contact || '',
      email: member.email || '',
      salary: member.salary || '',
      joinDate: member.joinDate || ''
    });
    setShowForm(true);
  };

  // Update staff
  const handleUpdateStaff = async (e) => {
    e.preventDefault();

    try {
      const staffId = editingStaff._id || editingStaff.id;
      console.log('📤 Updating staff:', staffId, formData);

      const response = await fetch(`${API_URL}/api/staff/${staffId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('📥 Update response:', data);

      if (data.success) {
        alert('✅ Staff member updated successfully!');
        fetchStaff(); // Refresh the list
        
        // Notify dashboard
        if (window.EventBus) {
          window.EventBus.emit('staffDataChanged');
        }
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating staff:', error);
      alert('❌ Failed to update staff member');
    }

    setShowForm(false);
    setEditingStaff(null);
    resetForm();
  };

  // Delete staff
  const handleDelete = async (id) => {
    const memberToDelete = staff.find(s => (s._id === id || s.id === id));

    if (window.confirm(`Are you sure you want to delete ${memberToDelete?.name}?`)) {
      try {
        console.log('📤 Deleting staff:', id);

        const response = await fetch(`${API_URL}/api/staff/${id}`, {
          method: 'DELETE'
        });

        const data = await response.json();
        console.log('📥 Delete response:', data);

        if (data.success) {
          alert('✅ Staff member deleted successfully!');
          fetchStaff(); // Refresh the list
          
          // Notify dashboard
          if (window.EventBus) {
            window.EventBus.emit('staffDataChanged');
          }
        } else {
          alert(`❌ Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Error deleting staff:', error);
        alert('❌ Failed to delete staff member');
      }
    }
  };

  // View staff details
  const handleViewDetails = (member) => {
    setShowDetails(member);
  };

  // Toggle status
  const handleToggleStatus = async (id) => {
    const member = staff.find(s => s._id === id || s.id === id);
    const statusCycle = {
      'On Duty': 'Off Duty',
      'Off Duty': 'On Leave',
      'On Leave': 'On Duty'
    };
    const newStatus = statusCycle[member.status] || 'On Duty';

    try {
      console.log('📤 Toggling status:', id, newStatus);

      const response = await fetch(`${API_URL}/api/staff/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();
      console.log('📥 Status update response:', data);

      if (data.success) {
        fetchStaff(); // Refresh the list
        
        // Notify dashboard
        if (window.EventBus) {
          window.EventBus.emit('staffDataChanged');
        }
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '', role: '', department: '', shift: '',
      status: 'On Duty', contact: '', email: '', salary: '', joinDate: ''
    });
  };

  // Filter staff
  const filteredStaff = staff.filter(member => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      (member.name?.toLowerCase() || '').includes(searchLower) ||
      (member.role?.toLowerCase() || '').includes(searchLower) ||
      (member.department?.toLowerCase() || '').includes(searchLower) ||
      (member.contact || '').includes(searchTerm) ||
      (member.email?.toLowerCase() || '').includes(searchLower);

    const matchesRole = filterRole === 'all' || member.role === filterRole;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Statistics
  const stats = {
    total: staff.length,
    onDuty: staff.filter(s => s.status === 'On Duty').length,
    offDuty: staff.filter(s => s.status === 'Off Duty').length,
    onLeave: staff.filter(s => s.status === 'On Leave').length
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading staff data...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">❌</div>
        <h3>Error Loading Staff</h3>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={fetchStaff}>
          Try Again
        </button>
        <button 
          className="btn" 
          onClick={() => window.open('http://localhost:8002/api/staff', '_blank')}
        >
          Check API Directly
        </button>
      </div>
    );
  }

  return (
    <div className="staff-page">
      <div className="page-header">
        <h2>👥 Staff Management {staff.length > 0 && `(${staff.length})`}</h2>
        <button className="btn btn-primary" onClick={() => {
          setEditingStaff(null);
          resetForm();
          setShowForm(true);
        }}>
          + Add Staff Member
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="staff-stats">
        <div className="stat-card total">
          <span className="stat-label">Total Staff</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-card on-duty">
          <span className="stat-label">On Duty</span>
          <span className="stat-value">{stats.onDuty}</span>
        </div>
        <div className="stat-card off-duty">
          <span className="stat-label">Off Duty</span>
          <span className="stat-value">{stats.offDuty}</span>
        </div>
        <div className="stat-card on-leave">
          <span className="stat-label">On Leave</span>
          <span className="stat-value">{stats.onLeave}</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search by name, role, department, or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          <select
            className="filter-select"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            {roles.filter(r => r !== 'all').map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>

          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="On Duty">On Duty</option>
            <option value="Off Duty">Off Duty</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>
      </div>

      {/* Debug Info - Remove in production */}
      {staff.length === 0 && (
        <div className="debug-info" style={{ padding: '20px', background: '#f0f0f0', margin: '20px', borderRadius: '8px' }}>
          <h4>Debug Information:</h4>
          <p>API URL: {API_URL}/api/staff</p>
          <p>Staff Array Length: {staff.length}</p>
          <p>Check browser console for more details (F12)</p>
          <button 
            className="btn btn-primary" 
            onClick={() => window.open(`${API_URL}/api/staff`, '_blank')}
          >
            Test API in New Tab
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingStaff ? '✏️ Edit Staff Member' : '➕ Add New Staff Member'}</h3>
            <form onSubmit={editingStaff ? handleUpdateStaff : handleAddStaff}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Role *</label>
                  <select name="role" value={formData.role} onChange={handleInputChange} required>
                    <option value="">Select Role</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Lab Technician">Lab Technician</option>
                    <option value="Pharmacist">Pharmacist</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Cleaner">Cleaner</option>
                    <option value="Security">Security</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="e.g., Nursing, Front Office"
                  />
                </div>
                <div className="form-group">
                  <label>Shift *</label>
                  <select name="shift" value={formData.shift} onChange={handleInputChange} required>
                    <option value="">Select Shift</option>
                    <option value="Morning (8am-4pm)">Morning (8am-4pm)</option>
                    <option value="Evening (4pm-12am)">Evening (4pm-12am)</option>
                    <option value="Night (12am-8am)">Night (12am-8am)</option>
                    <option value="General (10am-6pm)">General (10am-6pm)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Contact Number *</label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Join Date</label>
                  <input
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Salary (₹)</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="e.g., ₹25,000"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="On Duty">On Duty</option>
                  <option value="Off Duty">Off Duty</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">
                  {editingStaff ? 'Update Staff' : 'Add Staff'}
                </button>
                <button type="button" className="btn" onClick={() => {
                  setShowForm(false);
                  setEditingStaff(null);
                  resetForm();
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Staff Details Modal */}
      {showDetails && (
        <div className="modal-overlay" onClick={() => setShowDetails(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>👤 Staff Details</h3>
            <div className="staff-details">
              <div className="detail-avatar">
                <img 
                  src={showDetails.image || `https://ui-avatars.com/api/?name=${showDetails.name?.replace(' ', '+')}&background=2196F3&color=fff&size=100`} 
                  alt={showDetails.name} 
                />
              </div>
              <div className="detail-info">
                <div className="detail-row">
                  <strong>Name:</strong> {showDetails.name}
                </div>
                <div className="detail-row">
                  <strong>Role:</strong> {showDetails.role}
                </div>
                <div className="detail-row">
                  <strong>Department:</strong> {showDetails.department || 'N/A'}
                </div>
                <div className="detail-row">
                  <strong>Shift:</strong> {showDetails.shift}
                </div>
                <div className="detail-row">
                  <strong>Status:</strong>
                  <span className={`status-badge status-${showDetails.status?.toLowerCase().replace(' ', '-')}`}>
                    {showDetails.status}
                  </span>
                </div>
                <div className="detail-row">
                  <strong>Attendance:</strong> {showDetails.attendance || 'N/A'}
                </div>
                <div className="detail-row">
                  <strong>Contact:</strong> {showDetails.contact}
                </div>
                <div className="detail-row">
                  <strong>Email:</strong> {showDetails.email || 'N/A'}
                </div>
                <div className="detail-row">
                  <strong>Join Date:</strong> {showDetails.joinDate || 'N/A'}
                </div>
                <div className="detail-row">
                  <strong>Salary:</strong> {showDetails.salary || 'N/A'}
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={() => setShowDetails(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Staff Table */}
      <div className="table-container">
        {filteredStaff.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Staff Member</th>
                <th>Role</th>
                <th>Department</th>
                <th>Shift</th>
                <th>Status</th>
                <th>Attendance</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map(member => (
                <tr key={member._id || member.id}>
                  <td>
                    <div className="staff-info">
                      <img 
                        src={member.image || `https://ui-avatars.com/api/?name=${member.name?.replace(' ', '+')}&background=2196F3&color=fff&size=50`} 
                        alt={member.name} 
                        className="staff-image" 
                      />
                      <div className="staff-name">
                        <span>{member.name}</span>
                        <small>{member.email}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge role-${member.role?.toLowerCase().replace(' ', '-')}`}>
                      {member.role}
                    </span>
                  </td>
                  <td>{member.department || '-'}</td>
                  <td>{member.shift}</td>
                  <td>
                    <span className={`status-badge status-${member.status?.toLowerCase().replace(' ', '-')}`}>
                      {member.status}
                    </span>
                  </td>
                  <td>
                    <div className="attendance-cell">
                      <span className="attendance-value">{member.attendance || '100%'}</span>
                      <div className="attendance-bar">
                        <div
                          className="attendance-progress"
                          style={{ width: member.attendance || '100%' }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>{member.contact}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon view"
                        onClick={() => handleViewDetails(member)}
                        title="View Details"
                      >
                        👁️
                      </button>
                      <button
                        className="btn-icon edit"
                        onClick={() => handleEdit(member)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-icon toggle"
                        onClick={() => handleToggleStatus(member._id || member.id)}
                        title="Toggle Status"
                      >
                        🔄
                      </button>
                      <button
                        className="btn-icon delete"
                        onClick={() => handleDelete(member._id || member.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-results">
            <p>🔍 No staff members found matching your criteria.</p>
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              + Add First Staff Member
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Staff;