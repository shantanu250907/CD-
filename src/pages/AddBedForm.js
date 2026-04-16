// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AddBedForm.css';

// const AddBedForm = () => {
//     const [beds, setBeds] = useState([]);
//     const [formData, setFormData] = useState({
//         status: 'Available',
//         maintenanceNote: ''
//     });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [occupiedBeds, setOccupiedBeds] = useState([]);
    
//     const [showEditPopup, setShowEditPopup] = useState(false);
//     const [editBedData, setEditBedData] = useState({
//         id: null,
//         bedNumber: '',
//         status: '',
//         maintenanceNote: ''
//     });

//     const API_URL = 'http://localhost:8005/api/beds';
//     const ADMIT_API_URL = 'http://localhost:8001/api/admitpatient';
//     const frontendPort = window.location.port;
//     const MAX_BEDS = 15;

//     const maintenanceOptions = [
//         "Cleaning",
//         "Repair",
//         "Painting",
//         "Sanitization",
//         "Inspection",
//         "Fixing",
//         "Replacement",
//         "Service"
//     ];

//     useEffect(() => {
//         checkBackend();
//         fetchBeds();
//         fetchOccupiedBeds();
//     }, []);

//     const checkBackend = async () => {
//         try {
//             await axios.get('http://localhost:8005/test', { timeout: 2000 });
//             setError('');
//         } catch (err) {
//             setError('❌ Backend not running on port 8005');
//         }
//     };

//     const fetchOccupiedBeds = async () => {
//         try {
//             const response = await fetch(ADMIT_API_URL);
//             const data = await response.json();
//             if (data.success) {
//                 const occupied = data.data
//                     .filter(patient => patient.status === 'Admitted' && patient.bedNo)
//                     .map(patient => patient.bedNo);
//                 setOccupiedBeds(occupied);
//             }
//         } catch (error) {
//             console.error('Error fetching occupied beds:', error);
//         }
//     };

//     const fetchBeds = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get(API_URL);
//             const bedsData = response.data.data || response.data;
            
//             const sortedBeds = bedsData.sort((a, b) => {
//                 const numA = parseInt(a.bedNumber.replace(/[^0-9]/g, '')) || 0;
//                 const numB = parseInt(b.bedNumber.replace(/[^0-9]/g, '')) || 0;
//                 return numA - numB;
//             });
            
//             setBeds(sortedBeds);
//             setError('');
//         } catch (err) {
//             setError('❌ Cannot connect to backend');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getNextBedNumber = () => {
//         if (beds.length === 0) return 'B1';
        
//         const bedNumbers = beds.map(bed => {
//             const num = parseInt(bed.bedNumber.replace(/[^0-9]/g, '')) || 0;
//             return num;
//         });
        
//         const maxNumber = Math.max(...bedNumbers);
//         return `B${maxNumber + 1}`;
//     };

//     const getLastBed = () => {
//         if (beds.length === 0) return null;
//         return beds[beds.length - 1];
//     };

//     const handleDeleteLastBed = async () => {
//         const lastBed = getLastBed();
        
//         if (!lastBed) {
//             setError('❌ No beds to delete');
//             setTimeout(() => setError(''), 3000);
//             return;
//         }
        
//         if (occupiedBeds.includes(lastBed.bedNumber)) {
//             setError(`❌ Cannot delete - Bed ${lastBed.bedNumber} is currently occupied by a patient`);
//             setTimeout(() => setError(''), 3000);
//             return;
//         }
        
//         if (window.confirm(`Are you sure you want to delete bed ${lastBed.bedNumber}?`)) {
//             try {
//                 setLoading(true);
//                 await axios.delete(`${API_URL}/${lastBed._id}`);
//                 setSuccess(`✅ Bed ${lastBed.bedNumber} deleted successfully`);
//                 fetchBeds();
//                 fetchOccupiedBeds();
//                 setTimeout(() => setSuccess(''), 3000);
//             } catch (err) {
//                 setError('Failed to delete bed');
//                 setTimeout(() => setError(''), 3000);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (beds.length >= MAX_BEDS) {
//             setError(`❌ Maximum ${MAX_BEDS} beds allowed. Cannot add more beds.`);
//             setTimeout(() => setError(''), 3000);
//             return;
//         }
        
//         const nextBedNumber = getNextBedNumber();
        
//         if (formData.status === 'Maintenance' && !formData.maintenanceNote) {
//             setError('❌ Please select a maintenance reason');
//             setTimeout(() => setError(''), 3000);
//             return;
//         }
        
//         setLoading(true);
//         try {
//             const submitData = {
//                 bedNumber: nextBedNumber,
//                 status: formData.status,
//                 ward: 'General Ward',
//                 maintenanceNote: formData.status === 'Maintenance' ? formData.maintenanceNote : ''
//             };
            
//             await axios.post(API_URL, submitData);
//             setSuccess(`✅ Bed ${nextBedNumber} added successfully`);
            
//             setFormData({ status: 'Available', maintenanceNote: '' });
            
//             setTimeout(() => {
//                 fetchBeds();
//                 fetchOccupiedBeds();
//             }, 100);
            
//             setTimeout(() => setSuccess(''), 3000);
            
//         } catch (err) {
//             setError(err.response?.data?.message || 'Operation failed');
//             setTimeout(() => setError(''), 3000);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const openEditPopup = (bed) => {
//         if (occupiedBeds.includes(bed.bedNumber)) {
//             setError('❌ Cannot edit - Bed is currently occupied by a patient');
//             setTimeout(() => setError(''), 3000);
//             return;
//         }
        
//         setEditBedData({
//             id: bed._id,
//             bedNumber: bed.bedNumber,
//             status: bed.status,
//             maintenanceNote: bed.maintenanceNote || ''
//         });
//         setShowEditPopup(true);
//     };

//     const handleSaveEdit = async () => {
//         if (editBedData.status === 'Maintenance' && !editBedData.maintenanceNote) {
//             setError('❌ Please select a maintenance reason');
//             setTimeout(() => setError(''), 3000);
//             return;
//         }
        
//         try {
//             setLoading(true);
            
//             const submitData = {
//                 bedNumber: editBedData.bedNumber,
//                 status: editBedData.status,
//                 ward: 'General Ward',
//                 maintenanceNote: editBedData.status === 'Maintenance' ? editBedData.maintenanceNote : ''
//             };
            
//             await axios.put(`${API_URL}/${editBedData.id}`, submitData);
//             setSuccess(`✅ Bed ${editBedData.bedNumber} updated successfully`);
//             fetchBeds();
//             fetchOccupiedBeds();
//             setShowEditPopup(false);
//             setEditBedData({ id: null, bedNumber: '', status: '', maintenanceNote: '' });
//         } catch (err) {
//             setError('Failed to update bed status');
//         } finally {
//             setLoading(false);
//             setTimeout(() => setSuccess(''), 3000);
//         }
//     };

//     const isBedOccupied = (bedNumber) => {
//         return occupiedBeds.includes(bedNumber);
//     };

//     return (
//         <div className="bedview-container">
//             <div className="bedview-header">
//                 <h2>
//                     🛏️ Bed Management
//                     <span className="bedview-port">
//                         (Port: {frontendPort} | Backend: 8005)
//                     </span>
//                 </h2>
//                 <div className="bedview-stats">
//                     <span className="stat-available">✅ Available: {beds.filter(b => b.status === 'Available' && !isBedOccupied(b.bedNumber)).length}</span>
//                     <span className="stat-occupied">👤 Occupied: {beds.filter(b => isBedOccupied(b.bedNumber)).length}</span>
//                     <span className="stat-maintenance">🔧 Maintenance: {beds.filter(b => b.status === 'Maintenance' && !isBedOccupied(b.bedNumber)).length}</span>
//                     <span className="stat-total">📊 Total: {beds.length}/{MAX_BEDS}</span>
//                 </div>
//             </div>

//             {error && <div className="bedview-message error">{error}</div>}
//             {success && <div className="bedview-message success">{success}</div>}

//             <form onSubmit={handleSubmit} className="bedview-form">
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
//                     <h3 style={{ margin: 0 }}>➕ Add New Bed</h3>
//                     {beds.length > 0 && (
//                         <button
//                             type="button"
//                             onClick={handleDeleteLastBed}
//                             disabled={loading}
//                             style={{
//                                 padding: "8px 16px",
//                                 background: "#dc3545",
//                                 color: "white",
//                                 border: "none",
//                                 borderRadius: "6px",
//                                 cursor: "pointer",
//                                 fontSize: "14px",
//                                 fontWeight: "600"
//                             }}
//                         >
//                             🗑️ Delete Last Bed ({getLastBed()?.bedNumber || ''})
//                         </button>
//                     )}
//                 </div>
                
//                 {beds.length >= MAX_BEDS ? (
//                     <div style={{ 
//                         padding: '10px', 
//                         background: '#fff3cd', 
//                         border: '1px solid #ffc107',
//                         borderRadius: '6px',
//                         color: '#856404',
//                         marginBottom: '15px'
//                     }}>
//                         ⚠️ Maximum limit of {MAX_BEDS} beds reached. Cannot add more beds.
//                     </div>
//                 ) : (
//                     <>
//                         <p style={{ marginBottom: '15px', color: '#0d6efd', fontSize: '14px' }}>
//                             Next bed number will be: <strong>{getNextBedNumber()}</strong>
//                             <span style={{ marginLeft: '10px', color: '#666' }}>({beds.length}/{MAX_BEDS} beds used)</span>
//                         </p>
                        
//                         <div className="form-row">
//                             <div className="form-group">
//                                 <label>Status <span className="required">*</span></label>
//                                 <select 
//                                     value={formData.status} 
//                                     onChange={e => setFormData({...formData, status: e.target.value, maintenanceNote: e.target.value === 'Available' ? '' : formData.maintenanceNote})}
//                                     style={{
//                                         padding: "10px",
//                                         borderRadius: "6px",
//                                         border: "1px solid #ddd",
//                                         fontSize: "14px",
//                                         width: "100%"
//                                     }}
//                                 >
//                                     <option value="Available">✅ Available</option>
//                                     <option value="Maintenance">🔧 Maintenance</option>
//                                 </select>
//                             </div>
                            
//                             {formData.status === 'Maintenance' && (
//                                 <div className="form-group">
//                                     <label>Maintenance Reason <span className="required">*</span></label>
//                                     <select
//                                         value={formData.maintenanceNote}
//                                         onChange={e => setFormData({...formData, maintenanceNote: e.target.value})}
//                                         style={{
//                                             padding: "10px",
//                                             borderRadius: "6px",
//                                             border: "1px solid #ddd",
//                                             fontSize: "14px",
//                                             width: "100%"
//                                         }}
//                                         required
//                                     >
//                                         <option value="">-- Select Reason --</option>
//                                         {maintenanceOptions.map(option => (
//                                             <option key={option} value={option}>{option}</option>
//                                         ))}
//                                     </select>
//                                     <small style={{color: '#666', fontSize: '11px'}}>Select maintenance reason (required)</small>
//                                 </div>
//                             )}
                            
//                             <div className="form-actions" style={{ marginTop: formData.status === 'Maintenance' ? '0' : '20px' }}>
//                                 <button 
//                                     type="submit" 
//                                     disabled={loading || (formData.status === 'Maintenance' && !formData.maintenanceNote)}
//                                     style={{
//                                         padding: "10px 20px",
//                                         background: (loading || (formData.status === 'Maintenance' && !formData.maintenanceNote)) ? "#6c757d" : "#28a745",
//                                         color: "white",
//                                         border: "none",
//                                         borderRadius: "6px",
//                                         cursor: (loading || (formData.status === 'Maintenance' && !formData.maintenanceNote)) ? "not-allowed" : "pointer",
//                                         fontSize: "14px",
//                                         fontWeight: "600"
//                                     }}
//                                 >
//                                     {loading ? '⏳...' : `➕ Add Bed ${getNextBedNumber()}`}
//                                 </button>
//                             </div>
//                         </div>
//                     </>
//                 )}
//             </form>

//             <div className="bedview-table-container">
//                 <div className="table-header">
//                     <h3>📋 Beds List</h3>
//                     <span className="total-beds">Total: {beds.length}/{MAX_BEDS}</span>
//                 </div>
                
//                 {loading ? (
//                     <div className="bedview-loading">
//                         <div className="loading-spinner"></div>
//                         <p>Loading beds...</p>
//                     </div>
//                 ) : (
//                     <table className="bedview-table">
//                         <thead>
//                             <tr>
//                                 <th>S.No</th>
//                                 <th>Bed Number</th>
//                                 <th>Status</th>
//                                 <th>Occupied By</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {beds.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="5" className="no-data">
//                                         🛏️ No beds found. Add your first bed using the form above.
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 beds.map((bed, index) => {
//                                     const occupied = isBedOccupied(bed.bedNumber);
//                                     const canEdit = !occupied && bed.status !== 'Occupied';
                                    
//                                     return (
//                                         <tr key={bed._id} className={occupied ? 'occupied-row' : ''}>
//                                             <td>{index + 1}</td>
//                                             <td className="bed-number"><strong>{bed.bedNumber}</strong></td>
//                                             <td>
//                                                 <span className={`status-badge ${occupied ? 'occupied' : bed.status.toLowerCase()}`}>
//                                                     {occupied ? '👤 Occupied' : 
//                                                      bed.status === 'Available' ? '✅ Available' :
//                                                      bed.status === 'Maintenance' ? '🔧 Maintenance' : bed.status}
//                                                 </span>
//                                             </td>
//                                             <td>
//                                                 {occupied ? (
//                                                     <span style={{color: '#dc3545', fontWeight: '500'}}>👤 Gokul</span>
//                                                 ) : (
//                                                     <span style={{color: '#6c757d'}}>-</span>
//                                                 )}
//                                             </td>
//                                             <td className="actions">
//                                                 {canEdit ? (
//                                                     <button 
//                                                         onClick={() => openEditPopup(bed)}
//                                                         style={{
//                                                             background: "none",
//                                                             border: "none",
//                                                             cursor: "pointer",
//                                                             fontSize: "18px",
//                                                             padding: "5px 8px",
//                                                             borderRadius: "4px"
//                                                         }}
//                                                         title="Edit bed status"
//                                                     >
//                                                         ✏️
//                                                     </button>
//                                                 ) : (
//                                                     <span style={{color: '#6c757d', fontSize: '12px'}}>🔒 Locked</span>
//                                                 )}
//                                             </td>
//                                         </tr>
//                                     );
//                                 })
//                             )}
//                         </tbody>
//                     </table>
//                 )}
//             </div>

//             {showEditPopup && (
//                 <div className="popup-overlay" style={{
//                     position: "fixed",
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     background: "rgba(0,0,0,0.5)",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     zIndex: 1000
//                 }}>
//                     <div className="popup-content" style={{
//                         background: "white",
//                         padding: "30px",
//                         borderRadius: "12px",
//                         width: "500px",
//                         maxWidth: "90%",
//                         boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
//                     }}>
//                         <h3 style={{ marginTop: 0, color: "#0d6efd" }}>✏️ Edit Bed Status</h3>
//                         <p><strong>Bed Number:</strong> {editBedData.bedNumber}</p>
                        
//                         <div className="form-group" style={{ marginBottom: "15px" }}>
//                             <label>Status <span className="required">*</span></label>
//                             <select
//                                 value={editBedData.status}
//                                 onChange={(e) => setEditBedData({ ...editBedData, status: e.target.value, maintenanceNote: e.target.value === 'Available' ? '' : editBedData.maintenanceNote })}
//                                 style={{
//                                     width: "100%",
//                                     padding: "10px",
//                                     borderRadius: "6px",
//                                     border: "1px solid #ddd",
//                                     fontSize: "14px"
//                                 }}
//                             >
//                                 <option value="Available">✅ Available</option>
//                                 <option value="Maintenance">🔧 Maintenance</option>
//                             </select>
//                         </div>
                        
//                         <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "20px" }}>
//                             <button
//                                 onClick={() => {
//                                     setShowEditPopup(false);
//                                     setEditBedData({ id: null, bedNumber: '', status: '', maintenanceNote: '' });
//                                 }}
//                                 style={{
//                                     padding: "8px 20px",
//                                     background: "#6c757d",
//                                     color: "white",
//                                     border: "none",
//                                     borderRadius: "6px",
//                                     cursor: "pointer"
//                                 }}
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleSaveEdit}
//                                 disabled={editBedData.status === 'Maintenance' && !editBedData.maintenanceNote}
//                                 style={{
//                                     padding: "8px 20px",
//                                     background: (editBedData.status === 'Maintenance' && !editBedData.maintenanceNote) ? "#6c757d" : "#28a745",
//                                     color: "white",
//                                     border: "none",
//                                     borderRadius: "6px",
//                                     cursor: (editBedData.status === 'Maintenance' && !editBedData.maintenanceNote) ? "not-allowed" : "pointer"
//                                 }}
//                             >
//                                 Save Changes
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AddBedForm;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddBedForm.css';

const AddBedForm = () => {
    const [beds, setBeds] = useState([]);
    const [formData, setFormData] = useState({
        status: 'Available',
        maintenanceNote: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [occupiedBeds, setOccupiedBeds] = useState([]);
    const [bedPatientMap, setBedPatientMap] = useState({}); // New state to store bed -> patient mapping
    
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editBedData, setEditBedData] = useState({
        id: null,
        bedNumber: '',
        status: '',
        maintenanceNote: ''
    });

    const API_URL = 'http://localhost:8005/api/beds';
    const ADMIT_API_URL = 'http://localhost:8001/api/admitpatient';
    const frontendPort = window.location.port;
    const MAX_BEDS = 15;

    const maintenanceOptions = [
        "Cleaning",
        "Repair",
        "Painting",
        "Sanitization",
        "Inspection",
        "Fixing",
        "Replacement",
        "Service"
    ];

    useEffect(() => {
        checkBackend();
        fetchBeds();
        fetchOccupiedBeds();
    }, []);

    const checkBackend = async () => {
        try {
            await axios.get('http://localhost:8005/test', { timeout: 2000 });
            setError('');
        } catch (err) {
            setError('❌ Backend not running on port 8005');
        }
    };

    const fetchOccupiedBeds = async () => {
        try {
            const response = await fetch(ADMIT_API_URL);
            const data = await response.json();
            if (data.success) {
                // Get admitted patients with bed numbers
                const admittedPatients = data.data.filter(patient => patient.status === 'Admitted' && patient.bedNo);
                
                // Create mapping of bed number to patient name
                const mapping = {};
                const occupied = [];
                
                admittedPatients.forEach(patient => {
                    occupied.push(patient.bedNo);
                    mapping[patient.bedNo] = patient.patientName;
                });
                
                setOccupiedBeds(occupied);
                setBedPatientMap(mapping);
            }
        } catch (error) {
            console.error('Error fetching occupied beds:', error);
        }
    };

    const fetchBeds = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            const bedsData = response.data.data || response.data;
            
            const sortedBeds = bedsData.sort((a, b) => {
                const numA = parseInt(a.bedNumber.replace(/[^0-9]/g, '')) || 0;
                const numB = parseInt(b.bedNumber.replace(/[^0-9]/g, '')) || 0;
                return numA - numB;
            });
            
            setBeds(sortedBeds);
            setError('');
        } catch (err) {
            setError('❌ Cannot connect to backend');
        } finally {
            setLoading(false);
        }
    };

    const getNextBedNumber = () => {
        if (beds.length === 0) return 'B1';
        
        const bedNumbers = beds.map(bed => {
            const num = parseInt(bed.bedNumber.replace(/[^0-9]/g, '')) || 0;
            return num;
        });
        
        const maxNumber = Math.max(...bedNumbers);
        return `B${maxNumber + 1}`;
    };

    const getLastBed = () => {
        if (beds.length === 0) return null;
        return beds[beds.length - 1];
    };

    const handleDeleteLastBed = async () => {
        const lastBed = getLastBed();
        
        if (!lastBed) {
            setError('❌ No beds to delete');
            setTimeout(() => setError(''), 3000);
            return;
        }
        
        if (occupiedBeds.includes(lastBed.bedNumber)) {
            setError(`❌ Cannot delete - Bed ${lastBed.bedNumber} is currently occupied by a patient`);
            setTimeout(() => setError(''), 3000);
            return;
        }
        
        if (window.confirm(`Are you sure you want to delete bed ${lastBed.bedNumber}?`)) {
            try {
                setLoading(true);
                await axios.delete(`${API_URL}/${lastBed._id}`);
                setSuccess(`✅ Bed ${lastBed.bedNumber} deleted successfully`);
                fetchBeds();
                fetchOccupiedBeds();
                setTimeout(() => setSuccess(''), 3000);
            } catch (err) {
                setError('Failed to delete bed');
                setTimeout(() => setError(''), 3000);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (beds.length >= MAX_BEDS) {
            setError(`❌ Maximum ${MAX_BEDS} beds allowed. Cannot add more beds.`);
            setTimeout(() => setError(''), 3000);
            return;
        }
        
        const nextBedNumber = getNextBedNumber();
        
        if (formData.status === 'Maintenance' && !formData.maintenanceNote) {
            setError('❌ Please select a maintenance reason');
            setTimeout(() => setError(''), 3000);
            return;
        }
        
        setLoading(true);
        try {
            const submitData = {
                bedNumber: nextBedNumber,
                status: formData.status,
                ward: 'General Ward',
                maintenanceNote: formData.status === 'Maintenance' ? formData.maintenanceNote : ''
            };
            
            await axios.post(API_URL, submitData);
            setSuccess(`✅ Bed ${nextBedNumber} added successfully`);
            
            setFormData({ status: 'Available', maintenanceNote: '' });
            
            setTimeout(() => {
                fetchBeds();
                fetchOccupiedBeds();
            }, 100);
            
            setTimeout(() => setSuccess(''), 3000);
            
        } catch (err) {
            setError(err.response?.data?.message || 'Operation failed');
            setTimeout(() => setError(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    const openEditPopup = (bed) => {
        if (occupiedBeds.includes(bed.bedNumber)) {
            setError('❌ Cannot edit - Bed is currently occupied by a patient');
            setTimeout(() => setError(''), 3000);
            return;
        }
        
        setEditBedData({
            id: bed._id,
            bedNumber: bed.bedNumber,
            status: bed.status,
            maintenanceNote: bed.maintenanceNote || ''
        });
        setShowEditPopup(true);
    };

    const handleSaveEdit = async () => {
        if (editBedData.status === 'Maintenance' && !editBedData.maintenanceNote) {
            setError('❌ Please select a maintenance reason');
            setTimeout(() => setError(''), 3000);
            return;
        }
        
        try {
            setLoading(true);
            
            const submitData = {
                bedNumber: editBedData.bedNumber,
                status: editBedData.status,
                ward: 'General Ward',
                maintenanceNote: editBedData.status === 'Maintenance' ? editBedData.maintenanceNote : ''
            };
            
            await axios.put(`${API_URL}/${editBedData.id}`, submitData);
            setSuccess(`✅ Bed ${editBedData.bedNumber} updated successfully`);
            fetchBeds();
            fetchOccupiedBeds();
            setShowEditPopup(false);
            setEditBedData({ id: null, bedNumber: '', status: '', maintenanceNote: '' });
        } catch (err) {
            setError('Failed to update bed status');
        } finally {
            setLoading(false);
            setTimeout(() => setSuccess(''), 3000);
        }
    };

    const isBedOccupied = (bedNumber) => {
        return occupiedBeds.includes(bedNumber);
    };

    const getPatientNameForBed = (bedNumber) => {
        return bedPatientMap[bedNumber] || 'Unknown';
    };

    return (
        <div className="bedview-container">
            <div className="bedview-header">
                <h2>
                    🛏️ Bed Management
                    <span className="bedview-port">
                        (Port: {frontendPort} | Backend: 8005)
                    </span>
                </h2>
                <div className="bedview-stats">
                    <span className="stat-available">✅ Available: {beds.filter(b => b.status === 'Available' && !isBedOccupied(b.bedNumber)).length}</span>
                    <span className="stat-occupied">👤 Occupied: {beds.filter(b => isBedOccupied(b.bedNumber)).length}</span>
                    <span className="stat-maintenance">🔧 Maintenance: {beds.filter(b => b.status === 'Maintenance' && !isBedOccupied(b.bedNumber)).length}</span>
                    <span className="stat-total">📊 Total: {beds.length}/{MAX_BEDS}</span>
                </div>
            </div>

            {error && <div className="bedview-message error">{error}</div>}
            {success && <div className="bedview-message success">{success}</div>}

            <form onSubmit={handleSubmit} className="bedview-form">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ margin: 0 }}>➕ Add New Bed</h3>
                    {beds.length > 0 && (
                        <button
                            type="button"
                            onClick={handleDeleteLastBed}
                            disabled={loading}
                            style={{
                                padding: "8px 16px",
                                background: "#dc3545",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: "600"
                            }}
                        >
                            🗑️ Delete Last Bed ({getLastBed()?.bedNumber || ''})
                        </button>
                    )}
                </div>
                
                {beds.length >= MAX_BEDS ? (
                    <div style={{ 
                        padding: '10px', 
                        background: '#fff3cd', 
                        border: '1px solid #ffc107',
                        borderRadius: '6px',
                        color: '#856404',
                        marginBottom: '15px'
                    }}>
                        ⚠️ Maximum limit of {MAX_BEDS} beds reached. Cannot add more beds.
                    </div>
                ) : (
                    <>
                        <p style={{ marginBottom: '15px', color: '#0d6efd', fontSize: '14px' }}>
                            Next bed number will be: <strong>{getNextBedNumber()}</strong>
                            <span style={{ marginLeft: '10px', color: '#666' }}>({beds.length}/{MAX_BEDS} beds used)</span>
                        </p>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label>Status <span className="required">*</span></label>
                                <select 
                                    value={formData.status} 
                                    onChange={e => setFormData({...formData, status: e.target.value, maintenanceNote: e.target.value === 'Available' ? '' : formData.maintenanceNote})}
                                    style={{
                                        padding: "10px",
                                        borderRadius: "6px",
                                        border: "1px solid #ddd",
                                        fontSize: "14px",
                                        width: "100%"
                                    }}
                                >
                                    <option value="Available">✅ Available</option>
                                    <option value="Maintenance">🔧 Maintenance</option>
                                </select>
                            </div>
                            
                            {formData.status === 'Maintenance' && (
                                <div className="form-group">
                                    <label>Maintenance Reason <span className="required">*</span></label>
                                    <select
                                        value={formData.maintenanceNote}
                                        onChange={e => setFormData({...formData, maintenanceNote: e.target.value})}
                                        style={{
                                            padding: "10px",
                                            borderRadius: "6px",
                                            border: "1px solid #ddd",
                                            fontSize: "14px",
                                            width: "100%"
                                        }}
                                        required
                                    >
                                        <option value="">-- Select Reason --</option>
                                        {maintenanceOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                    <small style={{color: '#666', fontSize: '11px'}}>Select maintenance reason (required)</small>
                                </div>
                            )}
                            
                            <div className="form-actions" style={{ marginTop: formData.status === 'Maintenance' ? '0' : '20px' }}>
                                <button 
                                    type="submit" 
                                    disabled={loading || (formData.status === 'Maintenance' && !formData.maintenanceNote)}
                                    style={{
                                        padding: "10px 20px",
                                        background: (loading || (formData.status === 'Maintenance' && !formData.maintenanceNote)) ? "#6c757d" : "#28a745",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "6px",
                                        cursor: (loading || (formData.status === 'Maintenance' && !formData.maintenanceNote)) ? "not-allowed" : "pointer",
                                        fontSize: "14px",
                                        fontWeight: "600"
                                    }}
                                >
                                    {loading ? '⏳...' : `➕ Add Bed ${getNextBedNumber()}`}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </form>

            <div className="bedview-table-container">
                <div className="table-header">
                    <h3>📋 Beds List</h3>
                    <span className="total-beds">Total: {beds.length}/{MAX_BEDS}</span>
                </div>
                
                {loading ? (
                    <div className="bedview-loading">
                        <div className="loading-spinner"></div>
                        <p>Loading beds...</p>
                    </div>
                ) : (
                    <table className="bedview-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Bed Number</th>
                                <th>Status</th>
                                <th>Occupied By</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {beds.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="no-data">
                                        🛏️ No beds found. Add your first bed using the form above.
                                    </td>
                                </tr>
                            ) : (
                                beds.map((bed, index) => {
                                    const occupied = isBedOccupied(bed.bedNumber);
                                    const canEdit = !occupied && bed.status !== 'Occupied';
                                    const patientName = occupied ? getPatientNameForBed(bed.bedNumber) : null;
                                    
                                    return (
                                        <tr key={bed._id} className={occupied ? 'occupied-row' : ''}>
                                            <td>{index + 1}</td>
                                            <td className="bed-number"><strong>{bed.bedNumber}</strong></td>
                                            <td>
                                                <span className={`status-badge ${occupied ? 'occupied' : bed.status.toLowerCase()}`}>
                                                    {occupied ? '👤 Occupied' : 
                                                     bed.status === 'Available' ? '✅ Available' :
                                                     bed.status === 'Maintenance' ? '🔧 Maintenance' : bed.status}
                                                </span>
                                            </td>
                                            <td>
                                                {occupied ? (
                                                    <span style={{color: '#dc3545', fontWeight: '500'}}>
                                                        👤 {patientName}
                                                    </span>
                                                ) : (
                                                    <span style={{color: '#6c757d'}}>-</span>
                                                )}
                                            </td>
                                            <td className="actions">
                                                {canEdit ? (
                                                    <button 
                                                        onClick={() => openEditPopup(bed)}
                                                        style={{
                                                            background: "none",
                                                            border: "none",
                                                            cursor: "pointer",
                                                            fontSize: "18px",
                                                            padding: "5px 8px",
                                                            borderRadius: "4px"
                                                        }}
                                                        title="Edit bed status"
                                                    >
                                                        ✏️
                                                    </button>
                                                ) : (
                                                    <span style={{color: '#6c757d', fontSize: '12px'}}>🔒 Locked</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {showEditPopup && (
                <div className="popup-overlay" style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000
                }}>
                    <div className="popup-content" style={{
                        background: "white",
                        padding: "30px",
                        borderRadius: "12px",
                        width: "500px",
                        maxWidth: "90%",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
                    }}>
                        <h3 style={{ marginTop: 0, color: "#0d6efd" }}>✏️ Edit Bed Status</h3>
                        <p><strong>Bed Number:</strong> {editBedData.bedNumber}</p>
                        
                        <div className="form-group" style={{ marginBottom: "15px" }}>
                            <label>Status <span className="required">*</span></label>
                            <select
                                value={editBedData.status}
                                onChange={(e) => setEditBedData({ ...editBedData, status: e.target.value, maintenanceNote: e.target.value === 'Available' ? '' : editBedData.maintenanceNote })}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: "6px",
                                    border: "1px solid #ddd",
                                    fontSize: "14px"
                                }}
                            >
                                <option value="Available">✅ Available</option>
                                <option value="Maintenance">🔧 Maintenance</option>
                            </select>
                        </div>
                        
                        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "20px" }}>
                            <button
                                onClick={() => {
                                    setShowEditPopup(false);
                                    setEditBedData({ id: null, bedNumber: '', status: '', maintenanceNote: '' });
                                }}
                                style={{
                                    padding: "8px 20px",
                                    background: "#6c757d",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer"
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                disabled={editBedData.status === 'Maintenance' && !editBedData.maintenanceNote}
                                style={{
                                    padding: "8px 20px",
                                    background: (editBedData.status === 'Maintenance' && !editBedData.maintenanceNote) ? "#6c757d" : "#28a745",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: (editBedData.status === 'Maintenance' && !editBedData.maintenanceNote) ? "not-allowed" : "pointer"
                                }}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddBedForm;