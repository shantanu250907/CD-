import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddBedForm.css';

const AddBedForm = () => {
    const [beds, setBeds] = useState([]);
    const [formData, setFormData] = useState({
        bedNumber: '',
        status: 'Available'
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const API_URL = 'http://localhost:8005/api/beds';
    const frontendPort = window.location.port;

    useEffect(() => {
        checkBackend();
        fetchBeds();
    }, []);

    const checkBackend = async () => {
        try {
            await axios.get('http://localhost:8005/test', { timeout: 2000 });
            setError('');
        } catch (err) {
            setError('❌ Backend not running on port 8005');
        }
    };

    const fetchBeds = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            const bedsData = response.data.data || response.data;
            
            // ✅ FIX: Sort by bedNumber first, then by createdAt for same bed numbers
            const sortedBeds = bedsData.sort((a, b) => {
                // Extract numbers from bedNumber
                const numA = parseInt(a.bedNumber.replace(/[^0-9]/g, '')) || 0;
                const numB = parseInt(b.bedNumber.replace(/[^0-9]/g, '')) || 0;
                
                if (numA !== numB) {
                    return numA - numB; // Numerical order (1,2,3...)
                } else {
                    // If same number (shouldn't happen), sort by creation date
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }
            });
            
            setBeds(sortedBeds);
            setError('');
        } catch (err) {
            setError('❌ Cannot connect to backend');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const submitData = {
                bedNumber: formData.bedNumber.trim(),
                status: formData.status,
                ward: 'General Ward'
            };
            
            console.log('📤 Sending:', submitData);

            if (editingId) {
                await axios.put(`${API_URL}/${editingId}`, submitData);
                setSuccess('✅ Updated successfully');
                setEditingId(null);
            } else {
                await axios.post(API_URL, submitData);
                setSuccess('✅ Added successfully');
            }
            
            setFormData({ bedNumber: '', status: 'Available' });
            
            // ✅ Add a small delay before fetching to ensure backend has updated
            setTimeout(() => {
                fetchBeds();
            }, 100);
            
            setTimeout(() => setSuccess(''), 3000);
            
        } catch (err) {
            console.error('❌ Error:', err.response?.data);
            setError(err.response?.data?.message || 'Operation failed');
            setTimeout(() => setError(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (id) => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/${id}`);
            const bed = res.data.data || res.data;
            setFormData({
                bedNumber: bed.bedNumber,
                status: bed.status
            });
            setEditingId(id);
        } catch (err) {
            setError('Cannot fetch bed details');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this bed?')) return;
        try {
            setLoading(true);
            await axios.delete(`${API_URL}/${id}`);
            setSuccess('✅ Deleted successfully');
            fetchBeds();
        } catch (err) {
            setError('Cannot delete bed');
        } finally {
            setLoading(false);
        }
    };

    // Table Style
    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    const thStyle = {
        padding: '12px',
        background: '#1976d2',
        color: 'white',
        border: '1px solid #1565c0',
        textAlign: 'left'
    };

    const tdStyle = {
        padding: '10px',
        border: '1px solid #dee2e6'
    };

    const getStatusBadgeStyle = (status) => ({
        padding: '4px 8px',
        borderRadius: '4px',
        fontWeight: 'bold',
        background: status === 'Available' ? '#d4edda' :
                   status === 'Occupied' ? '#f8d7da' :
                   status === 'Maintenance' ? '#fff3cd' : '#cce5ff',
        color: status === 'Available' ? '#155724' :
               status === 'Occupied' ? '#721c24' :
               status === 'Maintenance' ? '#856404' : '#004085'
    });

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ color: '#1976d2', borderBottom: '2px solid #1976d2', paddingBottom: '10px' }}>
                🛏️ Bed Management
                <span style={{ fontSize: '14px', marginLeft: '10px', color: '#666' }}>
                    (Port: {frontendPort} | Backend: 8005)
                </span>
            </h2>
            
            {/* Messages */}
            {error && (
                <div style={{ 
                    background: '#f8d7da', 
                    color: '#721c24', 
                    padding: '12px', 
                    borderRadius: '4px', 
                    marginBottom: '20px',
                    border: '1px solid #f5c6cb'
                }}>
                    ❌ {error}
                </div>
            )}
            
            {success && (
                <div style={{ 
                    background: '#d4edda', 
                    color: '#155724', 
                    padding: '12px', 
                    borderRadius: '4px', 
                    marginBottom: '20px',
                    border: '1px solid #c3e6cb'
                }}>
                    ✅ {success}
                </div>
            )}

            {/* Form - Only 2 fields */}
            <form onSubmit={handleSubmit} style={{ 
                background: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '8px',
                marginBottom: '30px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#495057' }}>
                    {editingId ? '✏️ Edit Bed' : '➕ Add New Bed'}
                </h3>
                
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
                    <div style={{ flex: 2 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Bed Number <span style={{ color: '#dc3545' }}>*</span>
                        </label>
                        <input 
                            placeholder="e.g., BED-101, ICU-01" 
                            value={formData.bedNumber} 
                            onChange={e => setFormData({...formData, bedNumber: e.target.value})} 
                            required 
                            style={{ 
                                width: '100%', 
                                padding: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ced4da'
                            }} 
                        />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Status <span style={{ color: '#dc3545' }}>*</span>
                        </label>
                        <select 
                            value={formData.status} 
                            onChange={e => setFormData({...formData, status: e.target.value})}
                            style={{ 
                                width: '100%', 
                                padding: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ced4da',
                                background: 'white'
                            }}
                        >
                            <option value="Available">✅ Available</option>
                            <option value="Occupied">👤 Occupied</option>
                            <option value="Maintenance">🔧 Maintenance</option>
                            <option value="Reserved">📅 Reserved</option>
                        </select>
                    </div>
                    
                    <div>
                        <button 
                            type="submit" 
                            disabled={loading}
                            style={{
                                padding: '10px 30px',
                                background: editingId ? '#ffc107' : '#28a745',
                                color: editingId ? '#000' : 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? '⏳...' : (editingId ? '✏️ Update' : '➕ Add')}
                        </button>
                    </div>
                    
                    {editingId && (
                        <div>
                            <button 
                                type="button"
                                onClick={() => {
                                    setEditingId(null);
                                    setFormData({ bedNumber: '', status: 'Available' });
                                }}
                                style={{
                                    padding: '10px 20px',
                                    background: '#6c757d',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                }}
                            >
                                ❌ Cancel
                            </button>
                        </div>
                    )}
                </div>
            </form>

            {/* TABLE FORMAT - Clean and Professional */}
            <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <h3 style={{ margin: '20px 20px 0 20px', color: '#495057' }}>
                    📋 Beds List 
                    <span style={{ fontSize: '14px', marginLeft: '10px', color: '#6c757d' }}>
                        (Total: {beds.length})
                    </span>
                </h3>
                
                {loading && <p style={{ textAlign: 'center', padding: '30px' }}>⏳ Loading...</p>}
                
                {!loading && (
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>S.No</th>
                                <th style={thStyle}>Bed Number</th>
                                <th style={thStyle}>Status</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {beds.length === 0 ? (
                                <tr>
                                    <td colSpan="4" style={{ 
                                        ...tdStyle, 
                                        textAlign: 'center', 
                                        padding: '40px',
                                        color: '#6c757d'
                                    }}>
                                        🛏️ No beds found. Add your first bed using the form above.
                                    </td>
                                </tr>
                            ) : (
                                beds.map((bed, index) => (
                                    <tr key={bed._id} style={{ 
                                        background: index % 2 === 0 ? '#fff' : '#f8f9fa'
                                    }}>
                                        <td style={tdStyle}>{index + 1}</td>
                                        <td style={{ ...tdStyle, fontWeight: 'bold' }}>{bed.bedNumber}</td>
                                        <td style={tdStyle}>
                                            <span style={getStatusBadgeStyle(bed.status)}>
                                                {bed.status === 'Available' && '✅ '}
                                                {bed.status === 'Occupied' && '👤 '}
                                                {bed.status === 'Maintenance' && '🔧 '}
                                                {bed.status === 'Reserved' && '📅 '}
                                                {bed.status}
                                            </span>
                                        </td>
                                        <td style={tdStyle}>
                                            <button 
                                                onClick={() => handleEdit(bed._id)}
                                                style={{
                                                    padding: '6px 12px',
                                                    background: '#ffc107',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    marginRight: '8px',
                                                    cursor: 'pointer',
                                                    color: '#000',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(bed._id)}
                                                style={{
                                                    padding: '6px 12px',
                                                    background: '#dc3545',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                🗑️ Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* System Status */}
            <div style={{ 
                marginTop: '20px', 
                padding: '15px', 
                background: '#e7f3ff', 
                borderRadius: '8px',
                border: '1px solid #b8daff'
            }}>
                
                
            </div>
        </div>
    );
};

export default AddBedForm;