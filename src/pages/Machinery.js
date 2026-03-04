// // import React, { useState } from 'react';
// // import './Machinery.css';

// // const Machinery = () => {
// //   // Mock data for machinery
// //   const [machinery, setMachinery] = useState([
// //     {
// //       id: 'M001',
// //       name: 'X-Ray Machine',
// //       model: 'Siemens X200',
// //       purchaseDate: '2022-05-10',
// //       status: 'Operational',
// //       lastService: '2024-01-01',
// //       nextService: '2024-02-01',
// //       manufacturer: 'Siemens Healthineers',
// //       location: 'Radiology Dept',
// //       cost: '₹45,00,000',
// //       warranty: '2025-05-10'
// //     },
// //     {
// //       id: 'M002',
// //       name: 'MRI Scanner',
// //       model: 'GE Signa 3T',
// //       purchaseDate: '2021-11-20',
// //       status: 'Operational',
// //       lastService: '2023-12-15',
// //       nextService: '2024-01-15',
// //       manufacturer: 'GE Healthcare',
// //       location: 'Radiology Dept',
// //       cost: '₹2,50,00,000',
// //       warranty: '2024-11-20'
// //     },
// //     {
// //       id: 'M003',
// //       name: 'Ultrasound Machine',
// //       model: 'Philips HD15',
// //       purchaseDate: '2023-02-28',
// //       status: 'Under Maintenance',
// //       lastService: '2024-01-10',
// //       nextService: '2024-01-20',
// //       manufacturer: 'Philips Healthcare',
// //       location: 'OB/GYN Dept',
// //       cost: '₹28,00,000',
// //       warranty: '2026-02-28'
// //     },
// //     {
// //       id: 'M004',
// //       name: 'ECG Machine',
// //       model: 'BPL CardioArt',
// //       purchaseDate: '2022-08-15',
// //       status: 'Operational',
// //       lastService: '2023-12-20',
// //       nextService: '2024-01-20',
// //       manufacturer: 'BPL Medical',
// //       location: 'Cardiology Dept',
// //       cost: '₹85,000',
// //       warranty: '2024-08-15'
// //     },
// //     {
// //       id: 'M005',
// //       name: 'Ventilator',
// //       model: 'Hamilton C1',
// //       purchaseDate: '2023-01-10',
// //       status: 'Out of Service',
// //       lastService: '2023-12-01',
// //       nextService: '2024-01-01',
// //       manufacturer: 'Hamilton Medical',
// //       location: 'ICU',
// //       cost: '₹15,00,000',
// //       warranty: '2026-01-10'
// //     },
// //     {
// //       id: 'M006',
// //       name: 'Patient Monitor',
// //       model: 'Mindray PM50',
// //       purchaseDate: '2022-03-15',
// //       status: 'Operational',
// //       lastService: '2023-11-15',
// //       nextService: '2024-02-15',
// //       manufacturer: 'Mindray',
// //       location: 'ICU',
// //       cost: '₹2,50,000',
// //       warranty: '2025-03-15'
// //     }
// //   ]);

// //   const [showForm, setShowForm] = useState(false);
// //   const [showServiceModal, setShowServiceModal] = useState(null);
// //   const [showEditModal, setShowEditModal] = useState(null);
// //   const [filter, setFilter] = useState('all');
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     model: '',
// //     manufacturer: '',
// //     location: '',
// //     status: 'Operational',
// //     cost: '',
// //     warranty: ''
// //   });
// //   const [serviceData, setServiceData] = useState({
// //     lastService: '',
// //     nextService: ''
// //   });

// //   // Add new machinery
// //   const handleAddMachinery = (e) => {
// //     e.preventDefault();

// //     const newId = `M00${machinery.length + 1}`;
// //     const today = new Date().toISOString().split('T')[0];
// //     const nextServiceDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

// //     const newMachine = {
// //       id: newId,
// //       ...formData,
// //       purchaseDate: today,
// //       lastService: today,
// //       nextService: nextServiceDate
// //     };

// //     setMachinery([...machinery, newMachine]);
// //     setShowForm(false);
// //     setFormData({
// //       name: '',
// //       model: '',
// //       manufacturer: '',
// //       location: '',
// //       status: 'Operational',
// //       cost: '',
// //       warranty: ''
// //     });
// //     alert(`Equipment ${newId} added successfully!`);
// //   };

// //   // Edit machinery
// //   const handleEditMachinery = (e) => {
// //     e.preventDefault();

// //     setMachinery(machinery.map(m =>
// //       m.id === showEditModal ? { ...m, ...formData } : m
// //     ));

// //     setShowEditModal(null);
// //     setFormData({
// //       name: '',
// //       model: '',
// //       manufacturer: '',
// //       location: '',
// //       status: 'Operational',
// //       cost: '',
// //       warranty: ''
// //     });
// //     alert('Equipment updated successfully!');
// //   };

// //   // Update service record
// //   const handleUpdateService = (e) => {
// //     e.preventDefault();

// //     setMachinery(machinery.map(m =>
// //       m.id === showServiceModal ? {
// //         ...m,
// //         lastService: serviceData.lastService,
// //         nextService: serviceData.nextService,
// //         status: 'Operational'
// //       } : m
// //     ));

// //     setShowServiceModal(null);
// //     setServiceData({ lastService: '', nextService: '' });
// //     alert('Service record updated successfully!');
// //   };

// //   // Delete machinery
// //   const handleDelete = (id) => {
// //     const machineToDelete = machinery.find(m => m.id === id);

// //     if (window.confirm(`Are you sure you want to remove ${machineToDelete.name} (${id})?`)) {
// //       setMachinery(machinery.filter(m => m.id !== id));
// //       alert('Equipment removed successfully!');
// //     }
// //   };

// //   // Open edit modal
// //   const handleEdit = (machine) => {
// //     setShowEditModal(machine.id);
// //     setFormData({
// //       name: machine.name,
// //       model: machine.model,
// //       manufacturer: machine.manufacturer,
// //       location: machine.location,
// //       status: machine.status,
// //       cost: machine.cost || '',
// //       warranty: machine.warranty || ''
// //     });
// //   };

// //   // Filter machinery
// //   const filteredMachinery = machinery.filter(machine => {
// //     const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       machine.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       machine.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       machine.location.toLowerCase().includes(searchTerm.toLowerCase());
// //     const matchesFilter = filter === 'all' || machine.status === filter;
// //     return matchesSearch && matchesFilter;
// //   });

// //   // Statistics
// //   const stats = {
// //     total: machinery.length,
// //     operational: machinery.filter(m => m.status === 'Operational').length,
// //     maintenance: machinery.filter(m => m.status === 'Under Maintenance').length,
// //     outOfService: machinery.filter(m => m.status === 'Out of Service').length
// //   };

// //   // Check warranty status
// //   const checkWarranty = (warrantyDate) => {
// //     if (!warrantyDate) return null;
// //     const today = new Date();
// //     const warranty = new Date(warrantyDate);
// //     const daysLeft = Math.ceil((warranty - today) / (1000 * 60 * 60 * 24));

// //     if (daysLeft < 0) return 'expired';
// //     if (daysLeft < 30) return 'expiring-soon';
// //     return 'valid';
// //   };

// //   return (
// //     <div className="machinery-page">
// //       <div className="page-header">
// //         <h2>Machinery Management</h2>
// //         <button className="btn btn-primary" onClick={() => setShowForm(true)}>
// //           + Add Equipment
// //         </button>
// //       </div>

// //       {/* Statistics */}
// //       <div className="machinery-stats">
// //         <div className="stat-card">
// //           <span className="stat-label">Total Equipment</span>
// //           <span className="stat-value">{stats.total}</span>
// //         </div>
// //         <div className="stat-card operational">
// //           <span className="stat-label">Operational</span>
// //           <span className="stat-value">{stats.operational}</span>
// //         </div>
// //         <div className="stat-card maintenance">
// //           <span className="stat-label">Under Maintenance</span>
// //           <span className="stat-value">{stats.maintenance}</span>
// //         </div>
// //         <div className="stat-card out-of-service">
// //           <span className="stat-label">Out of Service</span>
// //           <span className="stat-value">{stats.outOfService}</span>
// //         </div>
// //       </div>

// //       {/* Search and Filter */}
// //       <div className="search-filter">
// //         <input
// //           type="text"
// //           placeholder="🔍 Search by name, model, ID, or location..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           className="search-input"
// //         />
// //         <select
// //           className="filter-select"
// //           value={filter}
// //           onChange={(e) => setFilter(e.target.value)}
// //         >
// //           <option value="all">All Equipment ({stats.total})</option>
// //           <option value="Operational">✅ Operational ({stats.operational})</option>
// //           <option value="Under Maintenance">🔄 Under Maintenance ({stats.maintenance})</option>
// //           <option value="Out of Service">❌ Out of Service ({stats.outOfService})</option>
// //         </select>
// //       </div>

// //       {/* Add Equipment Modal */}
// //       {showForm && (
// //         <div className="modal-overlay" onClick={() => setShowForm(false)}>
// //           <div className="modal" onClick={(e) => e.stopPropagation()}>
// //             <h3>➕ Add New Equipment</h3>
// //             <form onSubmit={handleAddMachinery}>
// //               <div className="form-row">
// //                 <div className="form-group">
// //                   <label>Equipment Name:</label>
// //                   <input
// //                     type="text"
// //                     value={formData.name}
// //                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                     placeholder="e.g., X-Ray Machine"
// //                     required
// //                   />
// //                 </div>
// //                 <div className="form-group">
// //                   <label>Model:</label>
// //                   <input
// //                     type="text"
// //                     value={formData.model}
// //                     onChange={(e) => setFormData({ ...formData, model: e.target.value })}
// //                     placeholder="e.g., Siemens X200"
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //               <div className="form-row">
// //                 <div className="form-group">
// //                   <label>Manufacturer:</label>
// //                   <input
// //                     type="text"
// //                     value={formData.manufacturer}
// //                     onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
// //                     placeholder="e.g., Siemens"
// //                     required
// //                   />
// //                 </div>
// //                 <div className="form-group">
// //                   <label>Location:</label>
// //                   <input
// //                     type="text"
// //                     value={formData.location}
// //                     onChange={(e) => setFormData({ ...formData, location: e.target.value })}
// //                     placeholder="e.g., Radiology Dept"
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //               <div className="form-row">
// //                 <div className="form-group">
// //                   <label>Cost (₹):</label>
// //                   <input
// //                     type="text"
// //                     value={formData.cost}
// //                     onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
// //                     placeholder="e.g., ₹45,00,000"
// //                   />
// //                 </div>
// //                 <div className="form-group">
// //                   <label>Warranty Until:</label>
// //                   <input
// //                     type="date"
// //                     value={formData.warranty}
// //                     onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
// //                   />
// //                 </div>
// //               </div>
// //               <div className="form-group">
// //                 <label>Status:</label>
// //                 <select
// //                   value={formData.status}
// //                   onChange={(e) => setFormData({ ...formData, status: e.target.value })}
// //                 >
// //                   <option value="Operational">✅ Operational</option>
// //                   <option value="Under Maintenance">🔄 Under Maintenance</option>
// //                   <option value="Out of Service">❌ Out of Service</option>
// //                 </select>
// //               </div>
// //               <div className="modal-actions">
// //                 <button type="submit" className="btn btn-primary">Add Equipment</button>
// //                 <button type="button" className="btn" onClick={() => setShowForm(false)}>Cancel</button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* Edit Equipment Modal */}
// //       {showEditModal && (
// //         <div className="modal-overlay" onClick={() => setShowEditModal(null)}>
// //           <div className="modal" onClick={(e) => e.stopPropagation()}>
// //             <h3>✏️ Edit Equipment</h3>
// //             <form onSubmit={handleEditMachinery}>
// //               <div className="form-row">
// //                 <div className="form-group">
// //                   <label>Equipment Name:</label>
// //                   <input
// //                     type="text"
// //                     value={formData.name}
// //                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                     required
// //                   />
// //                 </div>
// //                 <div className="form-group">
// //                   <label>Model:</label>
// //                   <input
// //                     type="text"
// //                     value={formData.model}
// //                     onChange={(e) => setFormData({ ...formData, model: e.target.value })}
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //               <div className="form-row">
// //                 <div className="form-group">
// //                   <label>Manufacturer:</label>
// //                   <input
// //                     type="text"
// //                     value={formData.manufacturer}
// //                     onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
// //                     required
// //                   />
// //                 </div>
// //                 <div className="form-group">
// //                   <label>Location:</label>
// //                   <input
// //                     type="text"
// //                     value={formData.location}
// //                     onChange={(e) => setFormData({ ...formData, location: e.target.value })}
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //               <div className="form-row">
// //                 <div className="form-group">
// //                   <label>Cost (₹):</label>
// //                   <input
// //                     type="text"
// //                     value={formData.cost}
// //                     onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
// //                   />
// //                 </div>
// //                 <div className="form-group">
// //                   <label>Warranty Until:</label>
// //                   <input
// //                     type="date"
// //                     value={formData.warranty}
// //                     onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
// //                   />
// //                 </div>
// //               </div>
// //               <div className="form-group">
// //                 <label>Status:</label>
// //                 <select
// //                   value={formData.status}
// //                   onChange={(e) => setFormData({ ...formData, status: e.target.value })}
// //                 >
// //                   <option value="Operational">✅ Operational</option>
// //                   <option value="Under Maintenance">🔄 Under Maintenance</option>
// //                   <option value="Out of Service">❌ Out of Service</option>
// //                 </select>
// //               </div>
// //               <div className="modal-actions">
// //                 <button type="submit" className="btn btn-primary">Update Equipment</button>
// //                 <button type="button" className="btn" onClick={() => setShowEditModal(null)}>Cancel</button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* Service Modal */}
// //       {showServiceModal && (
// //         <div className="modal-overlay" onClick={() => setShowServiceModal(null)}>
// //           <div className="modal" onClick={(e) => e.stopPropagation()}>
// //             <h3>🔧 Update Service Record</h3>
// //             <form onSubmit={handleUpdateService}>
// //               <div className="form-group">
// //                 <label>Last Service Date:</label>
// //                 <input
// //                   type="date"
// //                   value={serviceData.lastService}
// //                   onChange={(e) => setServiceData({ ...serviceData, lastService: e.target.value })}
// //                   max={new Date().toISOString().split('T')[0]}
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Next Service Date:</label>
// //                 <input
// //                   type="date"
// //                   value={serviceData.nextService}
// //                   onChange={(e) => setServiceData({ ...serviceData, nextService: e.target.value })}
// //                   min={new Date().toISOString().split('T')[0]}
// //                   required
// //                 />
// //               </div>
// //               <div className="modal-actions">
// //                 <button type="submit" className="btn btn-primary">Update Service</button>
// //                 <button type="button" className="btn" onClick={() => setShowServiceModal(null)}>Cancel</button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* Machinery Grid */}
// //       <div className="machinery-grid">
// //         {filteredMachinery.length > 0 ? (
// //           filteredMachinery.map(machine => {
// //             const warrantyStatus = checkWarranty(machine.warranty);

// //             return (
// //               <div key={machine.id} className={`machinery-card ${machine.status.toLowerCase().replace(' ', '-')}`}>
// //                 <div className="machinery-header">
// //                   <span className="machinery-id">{machine.id}</span>
// //                   <span className={`status-badge status-${machine.status.toLowerCase().replace(' ', '-')}`}>
// //                     {machine.status}
// //                   </span>
// //                 </div>
// //                 <h3 className="machinery-name">{machine.name}</h3>
// //                 <p className="machinery-model">{machine.model}</p>
// //                 <div className="machinery-details">
// //                   <p><span className="detail-label">🏭 Manufacturer:</span> {machine.manufacturer}</p>
// //                   <p><span className="detail-label">📍 Location:</span> {machine.location}</p>
// //                   <p><span className="detail-label">📅 Purchase:</span> {machine.purchaseDate}</p>
// //                   {machine.cost && (
// //                     <p><span className="detail-label">💰 Cost:</span> {machine.cost}</p>
// //                   )}
// //                   {machine.warranty && (
// //                     <p>
// //                       <span className="detail-label">📜 Warranty:</span> {machine.warranty}
// //                       {warrantyStatus === 'expired' && <span className="warranty-badge expired">Expired</span>}
// //                       {warrantyStatus === 'expiring-soon' && <span className="warranty-badge expiring">Expiring Soon</span>}
// //                     </p>
// //                   )}
// //                   <div className="service-info">
// //                     <p><span className="detail-label">🔧 Last Service:</span> {machine.lastService}</p>
// //                     <p><span className="detail-label">⏭️ Next Service:</span> {machine.nextService}</p>
// //                     {new Date(machine.nextService) < new Date() && (
// //                       <span className="service-warning">⚠️ Overdue</span>
// //                     )}
// //                   </div>
// //                 </div>
// //                 <div className="machinery-actions">
// //                   <button
// //                     className="btn-icon edit"
// //                     onClick={() => handleEdit(machine)}
// //                     title="Edit Equipment"
// //                   >
// //                     ✏️
// //                   </button>
// //                   <button
// //                     className="btn-icon service"
// //                     onClick={() => {
// //                       setShowServiceModal(machine.id);
// //                       setServiceData({
// //                         lastService: machine.lastService,
// //                         nextService: machine.nextService
// //                       });
// //                     }}
// //                     title="Update Service"
// //                   >
// //                     🔧
// //                   </button>
// //                   <button
// //                     className="btn-icon delete"
// //                     onClick={() => handleDelete(machine.id)}
// //                     title="Remove Equipment"
// //                   >
// //                     🗑️
// //                   </button>
// //                 </div>
// //               </div>
// //             );
// //           })
// //         ) : (
// //           <div className="no-results">
// //             <p>🔍 No equipment found matching your criteria.</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Machinery;


// import React, { useState, useEffect } from 'react';
// import './Machinery.css';

// const Machinery = () => {
//   const [machinery, setMachinery] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [showServiceModal, setShowServiceModal] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(null);
//   const [filter, setFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     total: 0,
//     operational: 0,
//     maintenance: 0,
//     outOfService: 0
//   });
  
//   const [formData, setFormData] = useState({
//     name: '',
//     model: '',
//     manufacturer: '',
//     location: '',
//     status: 'Operational',
//     cost: '',
//     warranty: '',
//     notes: ''
//   });
  
//   const [serviceData, setServiceData] = useState({
//     lastService: '',
//     nextService: ''
//   });

//   // ✅ Fetch all machinery from backend
//   const fetchMachinery = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
      
//       const response = await fetch('http://localhost:8001/api/machinery', {
//         headers: {
//           'Authorization': token ? `Bearer ${token}` : ''
//         }
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setMachinery(data.data);
//         setStats(data.stats || {
//           total: data.data.length,
//           operational: data.data.filter(m => m.status === 'Operational').length,
//           maintenance: data.data.filter(m => m.status === 'Under Maintenance').length,
//           outOfService: data.data.filter(m => m.status === 'Out of Service').length
//         });
//       } else {
//         console.error('Failed to fetch machinery:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching machinery:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Fetch statistics
//   const fetchStats = async () => {
//     try {
//       const response = await fetch('http://localhost:8001/api/machinery/stats');
//       const data = await response.json();
      
//       if (data.success) {
//         setStats(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   useEffect(() => {
//     fetchMachinery();
//     fetchStats();
//   }, []);

//   // ✅ Add new machinery
//   const handleAddMachinery = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch('http://localhost:8001/api/machinery', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token ? `Bearer ${token}` : ''
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert(`✅ Equipment ${data.data.equipmentId} added successfully!`);
//         fetchMachinery(); // Refresh the list
//         setShowForm(false);
//         setFormData({
//           name: '',
//           model: '',
//           manufacturer: '',
//           location: '',
//           status: 'Operational',
//           cost: '',
//           warranty: '',
//           notes: ''
//         });
//       } else {
//         alert(`❌ Error: ${data.message}`);
//       }
//     } catch (error) {
//       console.error('Error adding equipment:', error);
//       alert('❌ Failed to add equipment');
//     }
//   };

//   // ✅ Edit machinery
//   const handleEditMachinery = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch(`http://localhost:8001/api/machinery/${showEditModal}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token ? `Bearer ${token}` : ''
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert('✅ Equipment updated successfully!');
//         fetchMachinery(); // Refresh the list
//         setShowEditModal(null);
//         setFormData({
//           name: '',
//           model: '',
//           manufacturer: '',
//           location: '',
//           status: 'Operational',
//           cost: '',
//           warranty: '',
//           notes: ''
//         });
//       } else {
//         alert(`❌ Error: ${data.message}`);
//       }
//     } catch (error) {
//       console.error('Error updating equipment:', error);
//       alert('❌ Failed to update equipment');
//     }
//   };

//   // ✅ Update service record
//   const handleUpdateService = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch(`http://localhost:8001/api/machinery/${showServiceModal}/service`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token ? `Bearer ${token}` : ''
//         },
//         body: JSON.stringify(serviceData)
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert('✅ Service record updated successfully!');
//         fetchMachinery(); // Refresh the list
//         setShowServiceModal(null);
//         setServiceData({ lastService: '', nextService: '' });
//       } else {
//         alert(`❌ Error: ${data.message}`);
//       }
//     } catch (error) {
//       console.error('Error updating service:', error);
//       alert('❌ Failed to update service record');
//     }
//   };

//   // ✅ Delete machinery
//   const handleDelete = async (id) => {
//     const machineToDelete = machinery.find(m => m._id === id || m.id === id);

//     if (window.confirm(`Are you sure you want to remove ${machineToDelete?.name}?`)) {
//       try {
//         const token = localStorage.getItem('token');
        
//         const response = await fetch(`http://localhost:8001/api/machinery/${id}`, {
//           method: 'DELETE',
//           headers: {
//             'Authorization': token ? `Bearer ${token}` : ''
//           }
//         });

//         const data = await response.json();

//         if (data.success) {
//           alert('✅ Equipment removed successfully!');
//           fetchMachinery(); // Refresh the list
//         } else {
//           alert(`❌ Error: ${data.message}`);
//         }
//       } catch (error) {
//         console.error('Error deleting equipment:', error);
//         alert('❌ Failed to delete equipment');
//       }
//     }
//   };

//   // ✅ Open edit modal
//   const handleEdit = (machine) => {
//     setShowEditModal(machine._id || machine.id);
//     setFormData({
//       name: machine.name,
//       model: machine.model,
//       manufacturer: machine.manufacturer,
//       location: machine.location,
//       status: machine.status,
//       cost: machine.cost || '',
//       warranty: machine.warranty || '',
//       notes: machine.notes || ''
//     });
//   };

//   // Filter machinery
//   const filteredMachinery = machinery.filter(machine => {
//     const matchesSearch = machine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       machine.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       machine.equipmentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       machine.location?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = filter === 'all' || machine.status === filter;
//     return matchesSearch && matchesFilter;
//   });

//   // Check warranty status
//   const checkWarranty = (warrantyDate) => {
//     if (!warrantyDate) return null;
//     const today = new Date();
//     const warranty = new Date(warrantyDate);
//     const daysLeft = Math.ceil((warranty - today) / (1000 * 60 * 60 * 24));

//     if (daysLeft < 0) return 'expired';
//     if (daysLeft < 30) return 'expiring-soon';
//     return 'valid';
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//         <p>Loading equipment data...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="machinery-page">
//       <div className="page-header">
//         <h2>🏭 Machinery Management</h2>
//         <button className="btn btn-primary" onClick={() => setShowForm(true)}>
//           + Add Equipment
//         </button>
//       </div>

//       {/* Statistics */}
//       <div className="machinery-stats">
//         <div className="stat-card">
//           <span className="stat-label">Total Equipment</span>
//           <span className="stat-value">{stats.total}</span>
//         </div>
//         <div className="stat-card operational">
//           <span className="stat-label">✅ Operational</span>
//           <span className="stat-value">{stats.operational}</span>
//         </div>
//         <div className="stat-card maintenance">
//           <span className="stat-label">🔄 Under Maintenance</span>
//           <span className="stat-value">{stats.maintenance}</span>
//         </div>
//         <div className="stat-card out-of-service">
//           <span className="stat-label">❌ Out of Service</span>
//           <span className="stat-value">{stats.outOfService}</span>
//         </div>
//       </div>

//       {/* Search and Filter */}
//       <div className="search-filter">
//         <input
//           type="text"
//           placeholder="🔍 Search by name, model, ID, or location..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-input"
//         />
//         <select
//           className="filter-select"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         >
//           <option value="all">All Equipment ({stats.total})</option>
//           <option value="Operational">✅ Operational ({stats.operational})</option>
//           <option value="Under Maintenance">🔄 Under Maintenance ({stats.maintenance})</option>
//           <option value="Out of Service">❌ Out of Service ({stats.outOfService})</option>
//         </select>
//       </div>

//       {/* Add Equipment Modal */}
//       {showForm && (
//         <div className="modal-overlay" onClick={() => setShowForm(false)}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <h3>➕ Add New Equipment</h3>
//             <form onSubmit={handleAddMachinery}>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Equipment Name *</label>
//                   <input
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     placeholder="e.g., X-Ray Machine"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Model *</label>
//                   <input
//                     type="text"
//                     value={formData.model}
//                     onChange={(e) => setFormData({ ...formData, model: e.target.value })}
//                     placeholder="e.g., Siemens X200"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Manufacturer *</label>
//                   <input
//                     type="text"
//                     value={formData.manufacturer}
//                     onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
//                     placeholder="e.g., Siemens"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Location *</label>
//                   <input
//                     type="text"
//                     value={formData.location}
//                     onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//                     placeholder="e.g., Radiology Dept"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Cost (₹)</label>
//                   <input
//                     type="text"
//                     value={formData.cost}
//                     onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
//                     placeholder="e.g., ₹45,00,000"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Warranty Until</label>
//                   <input
//                     type="date"
//                     value={formData.warranty}
//                     onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
//                   />
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Notes</label>
//                 <textarea
//                   value={formData.notes}
//                   onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//                   placeholder="Additional notes..."
//                   rows="3"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Status</label>
//                 <select
//                   value={formData.status}
//                   onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                 >
//                   <option value="Operational">✅ Operational</option>
//                   <option value="Under Maintenance">🔄 Under Maintenance</option>
//                   <option value="Out of Service">❌ Out of Service</option>
//                 </select>
//               </div>
//               <div className="modal-actions">
//                 <button type="submit" className="btn btn-primary">Add Equipment</button>
//                 <button type="button" className="btn" onClick={() => setShowForm(false)}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Edit Equipment Modal */}
//       {showEditModal && (
//         <div className="modal-overlay" onClick={() => setShowEditModal(null)}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <h3>✏️ Edit Equipment</h3>
//             <form onSubmit={handleEditMachinery}>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Equipment Name:</label>
//                   <input
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Model:</label>
//                   <input
//                     type="text"
//                     value={formData.model}
//                     onChange={(e) => setFormData({ ...formData, model: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Manufacturer:</label>
//                   <input
//                     type="text"
//                     value={formData.manufacturer}
//                     onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Location:</label>
//                   <input
//                     type="text"
//                     value={formData.location}
//                     onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Cost (₹):</label>
//                   <input
//                     type="text"
//                     value={formData.cost}
//                     onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Warranty Until:</label>
//                   <input
//                     type="date"
//                     value={formData.warranty}
//                     onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
//                   />
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Notes</label>
//                 <textarea
//                   value={formData.notes}
//                   onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//                   rows="3"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Status:</label>
//                 <select
//                   value={formData.status}
//                   onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                 >
//                   <option value="Operational">✅ Operational</option>
//                   <option value="Under Maintenance">🔄 Under Maintenance</option>
//                   <option value="Out of Service">❌ Out of Service</option>
//                 </select>
//               </div>
//               <div className="modal-actions">
//                 <button type="submit" className="btn btn-primary">Update Equipment</button>
//                 <button type="button" className="btn" onClick={() => setShowEditModal(null)}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Service Modal */}
//       {showServiceModal && (
//         <div className="modal-overlay" onClick={() => setShowServiceModal(null)}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <h3>🔧 Update Service Record</h3>
//             <form onSubmit={handleUpdateService}>
//               <div className="form-group">
//                 <label>Last Service Date *</label>
//                 <input
//                   type="date"
//                   value={serviceData.lastService}
//                   onChange={(e) => setServiceData({ ...serviceData, lastService: e.target.value })}
//                   max={new Date().toISOString().split('T')[0]}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Next Service Date *</label>
//                 <input
//                   type="date"
//                   value={serviceData.nextService}
//                   onChange={(e) => setServiceData({ ...serviceData, nextService: e.target.value })}
//                   min={new Date().toISOString().split('T')[0]}
//                   required
//                 />
//               </div>
//               <div className="modal-actions">
//                 <button type="submit" className="btn btn-primary">Update Service</button>
//                 <button type="button" className="btn" onClick={() => setShowServiceModal(null)}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Machinery Grid */}
//       <div className="machinery-grid">
//         {filteredMachinery.length > 0 ? (
//           filteredMachinery.map(machine => {
//             const warrantyStatus = checkWarranty(machine.warranty);
//             const machineId = machine._id || machine.id;

//             return (
//               <div key={machineId} className={`machinery-card ${machine.status?.toLowerCase().replace(' ', '-')}`}>
//                 <div className="machinery-header">
//                   <span className="machinery-id">{machine.equipmentId || machineId}</span>
//                   <span className={`status-badge status-${machine.status?.toLowerCase().replace(' ', '-')}`}>
//                     {machine.status}
//                   </span>
//                 </div>
//                 <h3 className="machinery-name">{machine.name}</h3>
//                 <p className="machinery-model">{machine.model}</p>
//                 <div className="machinery-details">
//                   <p><span className="detail-label">🏭 Manufacturer:</span> {machine.manufacturer}</p>
//                   <p><span className="detail-label">📍 Location:</span> {machine.location}</p>
//                   <p><span className="detail-label">📅 Purchase:</span> {machine.purchaseDate}</p>
//                   {machine.cost && (
//                     <p><span className="detail-label">💰 Cost:</span> {machine.cost}</p>
//                   )}
//                   {machine.warranty && (
//                     <p>
//                       <span className="detail-label">📜 Warranty:</span> {machine.warranty}
//                       {warrantyStatus === 'expired' && <span className="warranty-badge expired">Expired</span>}
//                       {warrantyStatus === 'expiring-soon' && <span className="warranty-badge expiring">Expiring Soon</span>}
//                     </p>
//                   )}
//                   {machine.notes && (
//                     <p><span className="detail-label">📝 Notes:</span> {machine.notes}</p>
//                   )}
//                   <div className="service-info">
//                     <p><span className="detail-label">🔧 Last Service:</span> {machine.lastService}</p>
//                     <p><span className="detail-label">⏭️ Next Service:</span> {machine.nextService}</p>
//                     {new Date(machine.nextService) < new Date() && (
//                       <span className="service-warning">⚠️ Overdue</span>
//                     )}
//                   </div>
//                 </div>
//                 <div className="machinery-actions">
//                   <button
//                     className="btn-icon edit"
//                     onClick={() => handleEdit(machine)}
//                     title="Edit Equipment"
//                   >
//                     ✏️
//                   </button>
//                   <button
//                     className="btn-icon service"
//                     onClick={() => {
//                       setShowServiceModal(machineId);
//                       setServiceData({
//                         lastService: machine.lastService,
//                         nextService: machine.nextService
//                       });
//                     }}
//                     title="Update Service"
//                   >
//                     🔧
//                   </button>
//                   <button
//                     className="btn-icon delete"
//                     onClick={() => handleDelete(machineId)}
//                     title="Remove Equipment"
//                   >
//                     🗑️
//                   </button>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className="no-results">
//             <p>🔍 No equipment found matching your criteria.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Machinery;


import React, { useState, useEffect } from 'react';
import './Machinery.css';

// ✅ Use the same port as patients (8002)
const API_URL = 'http://localhost:8005';

const Machinery = () => {
  const [machinery, setMachinery] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    operational: 0,
    maintenance: 0,
    outOfService: 0
  });
  
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    manufacturer: '',
    location: '',
    status: 'Operational',
    cost: '',
    warranty: '',
    notes: ''
  });
  
  const [serviceData, setServiceData] = useState({
    lastService: '',
    nextService: ''
  });

  // ✅ Fetch all machinery from backend
  const fetchMachinery = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📤 Fetching machinery from:', `${API_URL}/api/machinery`);
      
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/api/machinery`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📥 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📥 Received machinery data:', data);
      
      if (data.success) {
        if (Array.isArray(data.data)) {
          setMachinery(data.data);
          
          // Calculate stats
          const newStats = {
            total: data.data.length,
            operational: data.data.filter(m => m.status === 'Operational').length,
            maintenance: data.data.filter(m => m.status === 'Under Maintenance' || m.status === 'Maintenance').length,
            outOfService: data.data.filter(m => m.status === 'Out of Service').length
          };
          
          setStats(newStats);
          console.log('✅ Stats calculated:', newStats);
        } else {
          console.error('Data.data is not an array:', data.data);
          setMachinery([]);
        }
      } else {
        console.error('Failed to fetch machinery:', data.message);
        setError(data.message || 'Failed to fetch machinery');
        setMachinery([]);
      }
    } catch (error) {
      console.error('❌ Error fetching machinery:', error);
      setError(error.message);
      setMachinery([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch statistics
  const fetchStats = async () => {
    try {
      console.log('📤 Fetching stats from:', `${API_URL}/api/machinery/stats`);
      
      const response = await fetch(`${API_URL}/api/machinery/stats`);
      const data = await response.json();
      
      console.log('📥 Stats response:', data);
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchMachinery();
    fetchStats();
  }, []);

  // ✅ Add new machinery
  const handleAddMachinery = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      
      const machineryData = {
        ...formData,
        equipmentId: `EQ-${Date.now()}`,
        purchaseDate: new Date().toISOString().split('T')[0],
        lastService: new Date().toISOString().split('T')[0],
        nextService: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 90 days later
      };
      
      console.log('📤 Adding machinery:', machineryData);
      
      const response = await fetch(`${API_URL}/api/machinery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(machineryData)
      });

      const data = await response.json();
      console.log('📥 Add response:', data);

      if (data.success) {
        alert(`✅ Equipment ${data.data.equipmentId} added successfully!`);
        fetchMachinery(); // Refresh the list
        
        // Notify dashboard
        if (window.EventBus) {
          window.EventBus.emit('machineryDataChanged');
        }
        
        setShowForm(false);
        resetForm();
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error adding equipment:', error);
      alert('❌ Failed to add equipment');
    }
  };

  // ✅ Edit machinery
  const handleEditMachinery = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const machineId = showEditModal._id || showEditModal;
      
      console.log('📤 Updating machinery:', machineId, formData);
      
      const response = await fetch(`${API_URL}/api/machinery/${machineId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('📥 Update response:', data);

      if (data.success) {
        alert('✅ Equipment updated successfully!');
        fetchMachinery(); // Refresh the list
        
        // Notify dashboard
        if (window.EventBus) {
          window.EventBus.emit('machineryDataChanged');
        }
        
        setShowEditModal(null);
        resetForm();
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating equipment:', error);
      alert('❌ Failed to update equipment');
    }
  };

  // ✅ Update service record
  const handleUpdateService = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const machineId = showServiceModal._id || showServiceModal;
      
      console.log('📤 Updating service for:', machineId, serviceData);
      
      const response = await fetch(`${API_URL}/api/machinery/${machineId}/service`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(serviceData)
      });

      const data = await response.json();
      console.log('📥 Service update response:', data);

      if (data.success) {
        alert('✅ Service record updated successfully!');
        fetchMachinery(); // Refresh the list
        
        // Notify dashboard
        if (window.EventBus) {
          window.EventBus.emit('machineryDataChanged');
        }
        
        setShowServiceModal(null);
        setServiceData({ lastService: '', nextService: '' });
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating service:', error);
      alert('❌ Failed to update service record');
    }
  };

  // ✅ Delete machinery
  const handleDelete = async (id) => {
    const machineToDelete = machinery.find(m => m._id === id || m.id === id);

    if (window.confirm(`Are you sure you want to remove ${machineToDelete?.name}?`)) {
      try {
        const token = localStorage.getItem('token');
        
        console.log('📤 Deleting machinery:', id);
        
        const response = await fetch(`${API_URL}/api/machinery/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': token ? `Bearer ${token}` : ''
          }
        });

        const data = await response.json();
        console.log('📥 Delete response:', data);

        if (data.success) {
          alert('✅ Equipment removed successfully!');
          fetchMachinery(); // Refresh the list
          
          // Notify dashboard
          if (window.EventBus) {
            window.EventBus.emit('machineryDataChanged');
          }
        } else {
          alert(`❌ Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Error deleting equipment:', error);
        alert('❌ Failed to delete equipment');
      }
    }
  };

  // ✅ Open edit modal
  const handleEdit = (machine) => {
    setShowEditModal(machine);
    setFormData({
      name: machine.name || '',
      model: machine.model || '',
      manufacturer: machine.manufacturer || '',
      location: machine.location || '',
      status: machine.status || 'Operational',
      cost: machine.cost || '',
      warranty: machine.warranty || '',
      notes: machine.notes || ''
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      model: '',
      manufacturer: '',
      location: '',
      status: 'Operational',
      cost: '',
      warranty: '',
      notes: ''
    });
  };

  // Filter machinery
  const filteredMachinery = machinery.filter(machine => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      (machine.name?.toLowerCase() || '').includes(searchLower) ||
      (machine.model?.toLowerCase() || '').includes(searchLower) ||
      (machine.equipmentId?.toLowerCase() || '').includes(searchLower) ||
      (machine.location?.toLowerCase() || '').includes(searchLower) ||
      (machine.manufacturer?.toLowerCase() || '').includes(searchLower);
      
    const matchesFilter = filter === 'all' || machine.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  // Check warranty status
  const checkWarranty = (warrantyDate) => {
    if (!warrantyDate) return null;
    const today = new Date();
    const warranty = new Date(warrantyDate);
    const daysLeft = Math.ceil((warranty - today) / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) return 'expired';
    if (daysLeft < 30) return 'expiring-soon';
    return 'valid';
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading equipment data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">❌</div>
        <h3>Error Loading Equipment Data</h3>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={fetchMachinery}>
          Try Again
        </button>
        <button 
          className="btn" 
          onClick={() => window.open(`${API_URL}/api/machinery`, '_blank')}
        >
          Check API Directly
        </button>
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <p>API URL: {API_URL}/api/machinery</p>
        </div>
      </div>
    );
  }

  return (
    <div className="machinery-page">
      <div className="page-header">
        <h2>🏭 Machinery Management {machinery.length > 0 && `(${machinery.length})`}</h2>
        <button className="btn btn-primary" onClick={() => {
          resetForm();
          setShowForm(true);
        }}>
          + Add Equipment
        </button>
      </div>

      {/* Statistics */}
      <div className="machinery-stats">
        <div className="stat-card">
          <span className="stat-label">Total Equipment</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-card operational">
          <span className="stat-label">✅ Operational</span>
          <span className="stat-value">{stats.operational}</span>
        </div>
        <div className="stat-card maintenance">
          <span className="stat-label">🔄 Under Maintenance</span>
          <span className="stat-value">{stats.maintenance}</span>
        </div>
        <div className="stat-card out-of-service">
          <span className="stat-label">❌ Out of Service</span>
          <span className="stat-value">{stats.outOfService}</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="🔍 Search by name, model, ID, manufacturer, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Equipment ({stats.total})</option>
          <option value="Operational">✅ Operational ({stats.operational})</option>
          <option value="Under Maintenance">🔄 Under Maintenance ({stats.maintenance})</option>
          <option value="Out of Service">❌ Out of Service ({stats.outOfService})</option>
        </select>
      </div>

      {/* Debug info - remove in production */}
      {machinery.length === 0 && !error && (
        <div className="debug-info" style={{ 
          padding: '20px', 
          background: '#f0f0f0', 
          margin: '20px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h4>No Equipment Found</h4>
          <p>API URL: {API_URL}/api/machinery</p>
          <p>Click below to add your first equipment</p>
          <button className="btn btn-primary" onClick={() => {
            resetForm();
            setShowForm(true);
          }}>
            + Add Equipment
          </button>
        </div>
      )}

      {/* Add Equipment Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>➕ Add New Equipment</h3>
            <form onSubmit={handleAddMachinery}>
              <div className="form-row">
                <div className="form-group">
                  <label>Equipment Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., X-Ray Machine"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Model *</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="e.g., Siemens X200"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Manufacturer *</label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    placeholder="e.g., Siemens"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Radiology Dept"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Cost (₹)</label>
                  <input
                    type="text"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                    placeholder="e.g., ₹45,00,000"
                  />
                </div>
                <div className="form-group">
                  <label>Warranty Until</label>
                  <input
                    type="date"
                    value={formData.warranty}
                    onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes..."
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Operational">✅ Operational</option>
                  <option value="Under Maintenance">🔄 Under Maintenance</option>
                  <option value="Out of Service">❌ Out of Service</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">Add Equipment</button>
                <button type="button" className="btn" onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Equipment Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>✏️ Edit Equipment</h3>
            <form onSubmit={handleEditMachinery}>
              <div className="form-row">
                <div className="form-group">
                  <label>Equipment Name:</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Model:</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Manufacturer:</label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location:</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Cost (₹):</label>
                  <input
                    type="text"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Warranty Until:</label>
                  <input
                    type="date"
                    value={formData.warranty}
                    onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Operational">✅ Operational</option>
                  <option value="Under Maintenance">🔄 Under Maintenance</option>
                  <option value="Out of Service">❌ Out of Service</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">Update Equipment</button>
                <button type="button" className="btn" onClick={() => {
                  setShowEditModal(null);
                  resetForm();
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Service Modal */}
      {showServiceModal && (
        <div className="modal-overlay" onClick={() => setShowServiceModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>🔧 Update Service Record</h3>
            <form onSubmit={handleUpdateService}>
              <div className="form-group">
                <label>Last Service Date *</label>
                <input
                  type="date"
                  value={serviceData.lastService}
                  onChange={(e) => setServiceData({ ...serviceData, lastService: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="form-group">
                <label>Next Service Date *</label>
                <input
                  type="date"
                  value={serviceData.nextService}
                  onChange={(e) => setServiceData({ ...serviceData, nextService: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">Update Service</button>
                <button type="button" className="btn" onClick={() => {
                  setShowServiceModal(null);
                  setServiceData({ lastService: '', nextService: '' });
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Machinery Grid */}
      <div className="machinery-grid">
        {filteredMachinery.length > 0 ? (
          filteredMachinery.map(machine => {
            const warrantyStatus = checkWarranty(machine.warranty);
            const machineId = machine._id || machine.id;

            return (
              <div key={machineId} className={`machinery-card ${machine.status?.toLowerCase().replace(' ', '-')}`}>
                <div className="machinery-header">
                  <span className="machinery-id">{machine.equipmentId || machineId.slice(-6)}</span>
                  <span className={`status-badge status-${machine.status?.toLowerCase().replace(' ', '-')}`}>
                    {machine.status}
                  </span>
                </div>
                <h3 className="machinery-name">{machine.name}</h3>
                <p className="machinery-model">{machine.model}</p>
                <div className="machinery-details">
                  <p><span className="detail-label">🏭 Manufacturer:</span> {machine.manufacturer}</p>
                  <p><span className="detail-label">📍 Location:</span> {machine.location}</p>
                  <p><span className="detail-label">📅 Purchase:</span> {formatDate(machine.purchaseDate)}</p>
                  {machine.cost && (
                    <p><span className="detail-label">💰 Cost:</span> {machine.cost}</p>
                  )}
                  {machine.warranty && (
                    <p>
                      <span className="detail-label">📜 Warranty:</span> {formatDate(machine.warranty)}
                      {warrantyStatus === 'expired' && <span className="warranty-badge expired">Expired</span>}
                      {warrantyStatus === 'expiring-soon' && <span className="warranty-badge expiring">Expiring Soon</span>}
                    </p>
                  )}
                  {machine.notes && (
                    <p><span className="detail-label">📝 Notes:</span> {machine.notes}</p>
                  )}
                  <div className="service-info">
                    <p><span className="detail-label">🔧 Last Service:</span> {formatDate(machine.lastService)}</p>
                    <p><span className="detail-label">⏭️ Next Service:</span> {formatDate(machine.nextService)}</p>
                    {machine.nextService && new Date(machine.nextService) < new Date() && (
                      <span className="service-warning">⚠️ Overdue</span>
                    )}
                  </div>
                </div>
                <div className="machinery-actions">
                  <button
                    className="btn-icon edit"
                    onClick={() => handleEdit(machine)}
                    title="Edit Equipment"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-icon service"
                    onClick={() => {
                      setShowServiceModal(machine);
                      setServiceData({
                        lastService: machine.lastService || '',
                        nextService: machine.nextService || ''
                      });
                    }}
                    title="Update Service"
                  >
                    🔧
                  </button>
                  <button
                    className="btn-icon delete"
                    onClick={() => handleDelete(machineId)}
                    title="Remove Equipment"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-results">
            <p>🔍 No equipment found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Machinery;