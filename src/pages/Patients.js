

import React, { useState, useEffect } from 'react';
import './Patients.css';

const API_URL = 'http://localhost:8002';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    male: 0,
    female: 0,
    other: 0,
    admitted: 0,
    icu: 0,
    discharged: 0,
    emergency: 0,
    regular: 0
  });

  // Fetch patients
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/patients`);
      const data = await response.json();
      
      if (data.success) {
        setPatients(data.data);
        calculateStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Calculate stats
  const calculateStats = (patientsData) => {
    const newStats = {
      total: patientsData.length,
      male: patientsData.filter(p => p.gender === 'Male').length,
      female: patientsData.filter(p => p.gender === 'Female').length,
      other: patientsData.filter(p => p.gender === 'Other').length,
      admitted: patientsData.filter(p => p.status === 'Admitted').length,
      icu: patientsData.filter(p => p.status === 'ICU').length,
      discharged: patientsData.filter(p => p.status === 'Discharged').length,
      emergency: patientsData.filter(p => p.admissionType === 'Emergency').length,
      regular: patientsData.filter(p => p.admissionType === 'Regular').length
    };
    setStats(newStats);
  };

  // Filter patients
  const filteredPatients = patients.filter(patient => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      (patient.patientName || '').toLowerCase().includes(searchLower) ||
      (patient.age?.toString() || '').includes(searchLower) ||
      (patient.gender || '').toLowerCase().includes(searchLower) ||
      (patient.email || '').toLowerCase().includes(searchLower) ||
      (patient.phone || '').includes(searchLower) ||
      (patient.bloodGroup || '').toLowerCase().includes(searchLower) ||
      (patient.profession || '').toLowerCase().includes(searchLower) ||
      (patient.address || '').toLowerCase().includes(searchLower);
    
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    const matchesGender = filterGender === 'all' || patient.gender === filterGender;
    const matchesAdmissionType = filterStatus === 'emergency' ? patient.admissionType === 'Emergency' : 
                                 filterStatus === 'regular' ? patient.admissionType === 'Regular' : true;
    
    return matchesSearch && matchesStatus && matchesGender && matchesAdmissionType;
  });

  // Handle stat click
  const handleStatClick = (type, value) => {
    switch(type) {
      case 'gender':
        setFilterGender(value);
        setFilterStatus('all');
        break;
      case 'status':
        setFilterStatus(value);
        setFilterGender('all');
        break;
      case 'admission':
        setFilterStatus(value);
        setFilterGender('all');
        break;
      case 'all':
        setFilterStatus('all');
        setFilterGender('all');
        break;
      default:
        break;
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Admitted': return '#4CAF50';
      case 'ICU': return '#F44336';
      case 'Discharged': return '#9E9E9E';
      default: return '#2196F3';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Admitted': return '✅';
      case 'ICU': return '🆘';
      case 'Discharged': return '🏠';
      default: return '🏥';
    }
  };

  // Get admission type color
  const getAdmissionTypeColor = (type) => {
    switch(type) {
      case 'Emergency': return '#F44336';
      case 'Regular': return '#4CAF50';
      case 'ICU': return '#FF9800';
      default: return '#2196F3';
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/patients/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      
      if (data.success) {
        alert('✅ Patient deleted successfully!');
        fetchPatients();
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('❌ Failed to delete patient');
    }
  };

  // Handle discharge
  const handleDischarge = async (id) => {
    if (!window.confirm('Discharge this patient?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/patients/${id}/discharge`, {
        method: 'PUT'
      });
      const data = await response.json();
      
      if (data.success) {
        alert('✅ Patient discharged successfully!');
        fetchPatients();
      }
    } catch (error) {
      console.error('Error discharging patient:', error);
      alert('❌ Failed to discharge patient');
    }
  };

  if (loading) {
    return (
      <div className="enhanced-loading">
        <div className="loading-spinner"></div>
        <p>Loading patient data...</p>
      </div>
    );
  }

  return (
    <div className="enhanced-patients-page">
      {/* Header */}
      <div className="enhanced-header">
        <div className="header-content">
          <div className="header-title">
            <h1>🏥 Patient Dashboard</h1>
            <p>Welcome back • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="header-actions">
            <button className="action-btn" onClick={() => window.open('http://localhost:3000/reception/patients', '_blank')}>
              <span className="btn-icon">➕</span>
              New Patient
            </button>
            <button className="action-btn secondary" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
              <span className="btn-icon">{viewMode === 'grid' ? '📋' : '🔲'}</span>
              {viewMode === 'grid' ? 'List View' : 'Grid View'}
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards - Clickable */}
      <div className="enhanced-stats-grid">
        <div 
          className={`enhanced-stat-card total ${filterStatus === 'all' && filterGender === 'all' ? 'active-filter' : ''}`}
          onClick={() => handleStatClick('all')}
          style={{ cursor: 'pointer' }}
        >
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <span className="stat-label">Total Patients</span>
            <span className="stat-value">{stats.total}</span>
          </div>
        </div>

        <div 
          className={`enhanced-stat-card ${filterGender === 'Male' ? 'active-filter' : ''}`}
          style={{ borderLeft: '5px solid #0d6efd', cursor: 'pointer' }}
          onClick={() => handleStatClick('gender', 'Male')}
        >
          <div className="stat-icon">👨</div>
          <div className="stat-content">
            <span className="stat-label">Male</span>
            <span className="stat-value">{stats.male}</span>
          </div>
        </div>

        <div 
          className={`enhanced-stat-card ${filterGender === 'Female' ? 'active-filter' : ''}`}
          style={{ borderLeft: '5px solid #d63384', cursor: 'pointer' }}
          onClick={() => handleStatClick('gender', 'Female')}
        >
          <div className="stat-icon">👩</div>
          <div className="stat-content">
            <span className="stat-label">Female</span>
            <span className="stat-value">{stats.female}</span>
          </div>
        </div>

        <div 
          className={`enhanced-stat-card ${filterGender === 'Other' ? 'active-filter' : ''}`}
          style={{ borderLeft: '5px solid #6c757d', cursor: 'pointer' }}
          onClick={() => handleStatClick('gender', 'Other')}
        >
          <div className="stat-icon">🧑</div>
          <div className="stat-content">
            <span className="stat-label">Other</span>
            <span className="stat-value">{stats.other}</span>
          </div>
        </div>

        <div 
          className={`enhanced-stat-card admitted ${filterStatus === 'Admitted' ? 'active-filter' : ''}`}
          onClick={() => handleStatClick('status', 'Admitted')}
          style={{ cursor: 'pointer' }}
        >
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <span className="stat-label">Admitted</span>
            <span className="stat-value">{stats.admitted}</span>
          </div>
        </div>

        <div 
          className={`enhanced-stat-card icu ${filterStatus === 'ICU' ? 'active-filter' : ''}`}
          onClick={() => handleStatClick('status', 'ICU')}
          style={{ cursor: 'pointer' }}
        >
          <div className="stat-icon">🆘</div>
          <div className="stat-content">
            <span className="stat-label">In ICU</span>
            <span className="stat-value">{stats.icu}</span>
          </div>
        </div>

        <div 
          className={`enhanced-stat-card emergency ${filterStatus === 'emergency' ? 'active-filter' : ''}`}
          onClick={() => handleStatClick('admission', 'emergency')}
          style={{ cursor: 'pointer' }}
        >
          <div className="stat-icon">🚑</div>
          <div className="stat-content">
            <span className="stat-label">Emergency</span>
            <span className="stat-value">{stats.emergency}</span>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filterStatus !== 'all' || filterGender !== 'all') && (
        <div className="active-filters">
          <span className="active-filters-label">Active Filters:</span>
          {filterStatus !== 'all' && filterStatus !== 'emergency' && filterStatus !== 'regular' && (
            <span className="filter-tag">
              Status: {filterStatus} 
              <button onClick={() => setFilterStatus('all')}>×</button>
            </span>
          )}
          {filterStatus === 'emergency' && (
            <span className="filter-tag">
              Admission: Emergency 
              <button onClick={() => setFilterStatus('all')}>×</button>
            </span>
          )}
          {filterStatus === 'regular' && (
            <span className="filter-tag">
              Admission: Regular 
              <button onClick={() => setFilterStatus('all')}>×</button>
            </span>
          )}
          {filterGender !== 'all' && (
            <span className="filter-tag">
              Gender: {filterGender} 
              <button onClick={() => setFilterGender('all')}>×</button>
            </span>
          )}
          <button className="clear-all-filters" onClick={() => {
            setFilterStatus('all');
            setFilterGender('all');
          }}>Clear All</button>
        </div>
      )}

      {/* Search Section */}
      <div className="enhanced-search-section">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, age, gender, phone, email, blood group, profession..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="enhanced-search"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="results-count">
        Showing {filteredPatients.length} of {stats.total} patients
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="patients-grid">
          {filteredPatients.map(patient => (
            <div 
              key={patient.id || patient._id} 
              className="patient-card"
              onClick={() => setSelectedPatient(patient)}
            >
              <div className="card-header">
                <div className="patient-avatar">
                  {patient.patientName?.[0] || '👤'}
                </div>
                <div className="patient-badges">
                  <span className="badge" style={{ backgroundColor: getAdmissionTypeColor(patient.admissionType) + '20', color: getAdmissionTypeColor(patient.admissionType) }}>
                    {patient.admissionType === 'Emergency' ? '🚑' : '📅'} {patient.admissionType}
                  </span>
                </div>
              </div>

              <div className="card-body">
                <h3 className="patient-name">{patient.patientName}</h3>
                
                <div className="patient-details">
                  <div className="detail-item">
                    <span className="detail-label">Age/Gender</span>
                    <span className="detail-value">{patient.age} / {patient.gender}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Blood</span>
                    <span className="detail-value blood-badge">{patient.bloodGroup || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone</span>
                    <span className="detail-value">{patient.phone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Profession</span>
                    <span className="detail-value">{patient.profession || 'N/A'}</span>
                  </div>
                </div>

                <div className="patient-footer">
                  <span className="admission-date">
                    📅 {patient.admitted || patient.registeredDate || 'N/A'}
                  </span>
                  <span 
                    className="status-badge-enhanced" 
                    style={{ backgroundColor: getStatusColor(patient.status) + '20', color: getStatusColor(patient.status) }}
                  >
                    {getStatusIcon(patient.status)} {patient.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="patients-list">
          <table className="enhanced-table">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Patient Name</th>
                <th>Age/Gender</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Blood Group</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <tr key={patient.id || patient._id}>
                  <td style={{ fontWeight: '500', color: '#666', textAlign: 'center' }}>{index + 1}</td>
                  <td>
                    <div className="table-patient-info">
                      <div className="table-avatar">
                        {patient.patientName?.[0] || '👤'}
                      </div>
                      <div>
                        <div className="table-name">{patient.patientName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{patient.age} / {patient.gender}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.email}</td>
                  <td><span className="blood-badge-table">{patient.bloodGroup || 'N/A'}</span></td>
                  <td>
                    <span className="status-badge-table" style={{ backgroundColor: getStatusColor(patient.status) + '20', color: getStatusColor(patient.status) }}>
                      {getStatusIcon(patient.status)} {patient.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="action-icon view" onClick={(e) => { e.stopPropagation(); setSelectedPatient(patient); }} title="View Details">👁️</button>
                      <button className="action-icon edit" onClick={(e) => { e.stopPropagation(); alert('Edit functionality'); }} title="Edit">✏️</button>
                      {patient.status !== 'Discharged' && (
                        <button className="action-icon discharge" onClick={(e) => { e.stopPropagation(); handleDischarge(patient.id || patient._id); }} title="Discharge">🏠</button>
                      )}
                      <button className="action-icon delete" onClick={(e) => { e.stopPropagation(); handleDelete(patient.id || patient._id); }} title="Delete">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="enhanced-modal-overlay" onClick={() => setSelectedPatient(null)}>
          <div className="enhanced-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPatient(null)}>✕</button>
            
            <div className="modal-header">
              <div className="modal-avatar">
                {selectedPatient.patientName?.[0] || '👤'}
              </div>
              <div className="modal-title">
                <h2>{selectedPatient.patientName}</h2>
                <p>Patient ID: #{String(selectedPatient.id || selectedPatient._id).slice(-6)}</p>
              </div>
            </div>

            <div className="modal-body">
              <h3>Personal Information</h3>
              <div className="detail-grid">
                <div className="detail-card">
                  <span className="detail-icon">📊</span>
                  <span className="detail-label">Age & Gender</span>
                  <span className="detail-value">{selectedPatient.age} years / {selectedPatient.gender}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">🩸</span>
                  <span className="detail-label">Blood Group</span>
                  <span className="detail-value">{selectedPatient.bloodGroup || 'N/A'}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">📞</span>
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{selectedPatient.phone}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">📧</span>
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{selectedPatient.email}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">📞</span>
                  <span className="detail-label">Alternate Phone</span>
                  <span className="detail-value">{selectedPatient.alternatePhone || 'N/A'}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">👥</span>
                  <span className="detail-label">Profession</span>
                  <span className="detail-value">{selectedPatient.profession || 'N/A'}</span>
                </div>
              </div>

              <h3>Emergency Contact</h3>
              <div className="detail-grid">
                <div className="detail-card">
                  <span className="detail-icon">👤</span>
                  <span className="detail-label">Kin Name</span>
                  <span className="detail-value">{selectedPatient.kinName || 'N/A'}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">📞</span>
                  <span className="detail-label">Kin Contact</span>
                  <span className="detail-value">{selectedPatient.kinContact || 'N/A'}</span>
                </div>
              </div>

              <h3>Medical Information</h3>
              <div className="info-section">
                <div className="info-row">
                  <strong>Address:</strong> {selectedPatient.address || 'Not specified'}
                </div>
                <div className="info-row">
                  <strong>Assigned Doctor:</strong> {selectedPatient.doctor || 'Not assigned'}
                </div>
                <div className="info-row">
                  <strong>Admission Type:</strong> 
                  <span className="admission-tag" style={{ backgroundColor: getAdmissionTypeColor(selectedPatient.admissionType) + '20', color: getAdmissionTypeColor(selectedPatient.admissionType) }}>
                    {selectedPatient.admissionType}
                  </span>
                </div>
                <div className="info-row">
                  <strong>Admitted On:</strong> {selectedPatient.admitted || selectedPatient.registeredDate}
                </div>
                {selectedPatient.dischargedDate && (
                  <div className="info-row">
                    <strong>Discharged On:</strong> {selectedPatient.dischargedDate}
                  </div>
                )}
                <div className="info-row">
                  <strong>Bed Number:</strong> {selectedPatient.bed || 'Not assigned'}
                </div>
                <div className="info-row">
                  <strong>Status:</strong>
                  <span className="status-tag" style={{ backgroundColor: getStatusColor(selectedPatient.status) + '20', color: getStatusColor(selectedPatient.status) }}>
                    {getStatusIcon(selectedPatient.status)} {selectedPatient.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-btn primary" onClick={() => {
                alert('Edit functionality');
                setSelectedPatient(null);
              }}>
                ✏️ Edit Patient
              </button>
              {selectedPatient.status !== 'Discharged' && (
                <button className="modal-btn success" onClick={() => {
                  handleDischarge(selectedPatient.id || selectedPatient._id);
                  setSelectedPatient(null);
                }}>
                  🏠 Discharge Patient
                </button>
              )}
              <button className="modal-btn secondary" onClick={() => setSelectedPatient(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No Patients Found</h3>
          <p>No patients match your current filters.</p>
          <button className="empty-btn" onClick={() => {
            setSearchTerm('');
            setFilterStatus('all');
            setFilterGender('all');
          }}>
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Patients;