

import React, { useState, useEffect } from "react";
import "./Laboratory.css";

function Laboratory() {
  // ==================== STATE ====================
  const [appointments, setAppointments] = useState([]);
  const [registeredPatients, setRegisteredPatients] = useState([]);
  const [laboratoryPatients, setLaboratoryPatients] = useState({
    "2D-Echocardiogram": [],
    "Electrocardiogram": [],
    "Treadmill Test": []
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [appointmentSearchTerm, setAppointmentSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showTestPopup, setShowTestPopup] = useState(false);
  const [showPatientListPopup, setShowPatientListPopup] = useState(false);
  const [showReportPopup, setShowReportPopup] = useState(false);
  const [showCancelConfirmPopup, setShowCancelConfirmPopup] = useState(false);
  const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false);
  const [selectedTestForList, setSelectedTestForList] = useState(null);
  const [selectedReportPatient, setSelectedReportPatient] = useState(null);
  const [patientToCancel, setPatientToCancel] = useState(null);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [selectedTestType, setSelectedTestType] = useState("2D-Echocardiogram");
  
  const [stats, setStats] = useState({
    total: 0,
    male: 0,
    female: 0
  });
  
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState("all");

  // ==================== HELPER FUNCTIONS ====================
  const formatSymptoms = (symptoms) => {
    if (!symptoms) return 'No symptoms';
    if (Array.isArray(symptoms)) {
      const text = symptoms.join(', ');
      return text.length > 30 ? text.substring(0, 30) + '...' : text;
    }
    if (typeof symptoms === 'string') {
      return symptoms.length > 30 ? symptoms.substring(0, 30) + '...' : symptoms;
    }
    return 'Symptoms not specified';
  };

  const formatSymptomsFull = (symptoms) => {
    if (!symptoms) return 'No symptoms';
    if (Array.isArray(symptoms)) return symptoms.join(', ');
    if (typeof symptoms === 'string') return symptoms;
    return 'Symptoms not specified';
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // ==================== LOAD DATA ====================
  useEffect(() => {
    fetchLaboratoryData();
    loadRegisteredPatients();
    loadAllAppointments();
    
    const interval = setInterval(() => {
      loadAllAppointments();
      loadRegisteredPatients();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchLaboratoryData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8001/api/laboratory');
      const data = await response.json();
      
      if (data.success) {
        setLaboratoryPatients(data.groupedByTest || {
          "2D-Echocardiogram": [],
          "Electrocardiogram": [],
          "Treadmill Test": []
        });
        setStats(data.stats || { total: 0, male: 0, female: 0 });
      }
    } catch (error) {
      console.error("❌ Error fetching lab data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadRegisteredPatients = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/patients');
      const data = await response.json();
      
      if (data.success) {
        setRegisteredPatients(data.data || []);
        console.log(`✅ Loaded ${data.data?.length || 0} registered patients`);
      }
    } catch (error) {
      console.error("❌ Error fetching patients:", error);
    }
  };

  const loadAllAppointments = async () => {
    try {
      console.log("📅 Fetching ALL appointments from backend...");
      
      const response = await fetch('http://localhost:8001/api/appointments');
      const data = await response.json();
      
      console.log("📥 Backend response:", data);
      
      if (data.success) {
        const allAppointments = data.appointments || [];
        console.log(`✅ Found ${allAppointments.length} total appointments`);
        setAppointments(allAppointments);
      } else {
        loadAppointmentsFromLocalStorage();
      }
    } catch (error) {
      console.error("❌ Error fetching appointments:", error);
      loadAppointmentsFromLocalStorage();
    }
  };

  const loadAppointmentsFromLocalStorage = () => {
    try {
      const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      console.log(`✅ Loaded ${allAppointments.length} appointments from localStorage`);
      setAppointments(allAppointments);
    } catch (error) {
      console.error("❌ Error loading from localStorage:", error);
      setAppointments([]);
    }
  };

  // ==================== FILTER HANDLER ====================
  const handleFilterClick = (type) => {
    setFilterType(type);
  };

  const getFilteredLabCount = (gender) => {
    const allLabPatients = [
      ...(laboratoryPatients["2D-Echocardiogram"] || []),
      ...(laboratoryPatients["Electrocardiogram"] || []),
      ...(laboratoryPatients["Treadmill Test"] || [])
    ];
    
    if (gender === "all") return allLabPatients.length;
    return allLabPatients.filter(p => p?.gender === gender).length;
  };

  // ==================== HANDLE PATIENT CLICK ====================
  const handlePatientClick = (patient, sourceType = 'patient') => {
    setSelectedPatient({...patient, sourceType});
    setShowTestPopup(true);
  };

  // ==================== HANDLE TEST SELECTION ====================
  const handleTestSelect = async (testName) => {
    if (!selectedPatient) return;

    try {
      setLoading(true);
      
      const symptomsString = Array.isArray(selectedPatient.symptoms) 
        ? selectedPatient.symptoms.join(', ') 
        : selectedPatient.symptoms || '';

      const labPatient = {
        patientId: selectedPatient.id || selectedPatient._id,
        patientName: selectedPatient.patientName,
        age: parseInt(selectedPatient.age),
        gender: selectedPatient.gender,
        phone: selectedPatient.phone,
        email: selectedPatient.email || '',
        bloodGroup: selectedPatient.bloodGroup || '',
        symptoms: symptomsString,
        testName: testName,
        sourceId: selectedPatient.id || selectedPatient._id,
        sourceType: selectedPatient.sourceType || 'patient'
      };

      const response = await fetch('http://localhost:8001/api/laboratory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(labPatient)
      });

      const data = await response.json();

      if (data.success) {
        // Update laboratory patients with new data from backend
        setLaboratoryPatients(data.groupedByTest || {
          "2D-Echocardiogram": [],
          "Electrocardiogram": [],
          "Treadmill Test": []
        });
        setStats(data.stats || { total: 0, male: 0, female: 0 });
        
        // ✅ Remove patient from source list
        const patientId = selectedPatient.id || selectedPatient._id;
        
        if (selectedPatient.sourceType === 'appointment') {
          setAppointments(prevAppointments => 
            prevAppointments.filter(apt => (apt.id || apt._id) !== patientId)
          );
          console.log(`✅ Removed appointment with ID: ${patientId}`);
        } else {
          setRegisteredPatients(prevPatients => 
            prevPatients.filter(p => (p.id || p._id) !== patientId)
          );
          console.log(`✅ Removed registered patient with ID: ${patientId}`);
        }
        
        alert(`✅ Patient added to ${testName} successfully!`);
        setShowTestPopup(false);
        setSelectedPatient(null);
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("🔴 Error:", error);
      alert('Failed to add patient to laboratory');
    } finally {
      setLoading(false);
    }
  };

  // ==================== ✅ FIXED: HANDLE CANCEL (Move back to registered) ====================
  const handleCancelPatient = async () => {
    if (!patientToCancel) return;

    try {
      setLoading(true);
      
      console.log("🔄 Cancelling patient:", patientToCancel);
      
      const response = await fetch(`http://localhost:8001/api/laboratory/${patientToCancel._id}/cancel`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      console.log("📥 Cancel response:", data);

      if (data.success) {
        // Update laboratory patients
        setLaboratoryPatients(data.groupedByTest || {
          "2D-Echocardiogram": [],
          "Electrocardiogram": [],
          "Treadmill Test": []
        });
        setStats(data.stats || { total: 0, male: 0, female: 0 });
        
        // ✅ Add patient back to registered list
        const cancelledPatient = {
          _id: patientToCancel.sourceId,
          patientName: patientToCancel.patientName,
          age: patientToCancel.age,
          gender: patientToCancel.gender,
          phone: patientToCancel.phone,
          email: patientToCancel.email,
          bloodGroup: patientToCancel.bloodGroup,
          symptoms: patientToCancel.symptoms
        };
        
        console.log("✅ Adding patient back to registered list:", cancelledPatient);
        setRegisteredPatients(prev => {
          const newList = [...prev, cancelledPatient];
          console.log("Updated registered patients:", newList);
          return newList;
        });
        
        alert(`✅ Patient ${patientToCancel.patientName} moved back to registered list`);
        setShowCancelConfirmPopup(false);
        setPatientToCancel(null);
        setShowPatientListPopup(false);
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("🔴 Error in cancel:", error);
      alert('Failed to cancel patient');
    } finally {
      setLoading(false);
    }
  };

  // ==================== HANDLE DELETE (Permanent) ====================
  const handleDeletePatient = async () => {
    if (!patientToDelete) return;

    try {
      setLoading(true);
      
      console.log("🗑️ Deleting patient permanently:", patientToDelete);
      
      const response = await fetch(`http://localhost:8001/api/laboratory/${patientToDelete._id}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      console.log("📥 Delete response:", data);

      if (data.success) {
        setLaboratoryPatients(data.groupedByTest || {
          "2D-Echocardiogram": [],
          "Electrocardiogram": [],
          "Treadmill Test": []
        });
        setStats(data.stats || { total: 0, male: 0, female: 0 });
        
        alert(`✅ Patient ${patientToDelete.patientName} deleted permanently`);
        setShowDeleteConfirmPopup(false);
        setPatientToDelete(null);
        setShowPatientListPopup(false);
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("🔴 Error in delete:", error);
      alert('Failed to delete patient');
    } finally {
      setLoading(false);
    }
  };

  // ==================== HANDLE TEST BUTTON CLICK ====================
  const handleTestButtonClick = async (testName) => {
    setSelectedTestForList(testName);
    setShowPatientListPopup(true);
    
    try {
      const response = await fetch(`http://localhost:8001/api/laboratory/test/${testName}`);
      const data = await response.json();
      
      if (data.success) {
        setLaboratoryPatients(prev => ({
          ...prev,
          [testName]: data.data || []
        }));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // ==================== HANDLE PATIENT CARD CLICK ====================
  const handlePatientCardClick = (patient) => {
    setSelectedReportPatient(patient);
    setSelectedTestType(patient.testName);
    setShowReportPopup(true);
  };

  // ==================== HANDLE ICON CLICKS ====================
  const handleCancelIconClick = (e, patient) => {
    e.stopPropagation();
    console.log("🔵 Cancel icon clicked for:", patient);
    setPatientToCancel(patient);
    setShowCancelConfirmPopup(true);
  };

  const handleDeleteIconClick = (e, patient) => {
    e.stopPropagation();
    console.log("🔴 Delete icon clicked for:", patient);
    setPatientToDelete(patient);
    setShowDeleteConfirmPopup(true);
  };

  // ==================== FILTER PATIENTS ====================
  const filteredRegisteredPatients = (registeredPatients || []).filter(patient =>
    patient?.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient?.phone?.includes(searchTerm)
  );

  const filteredAppointments = (appointments || []).filter(apt =>
    apt?.patientName?.toLowerCase().includes(appointmentSearchTerm.toLowerCase()) ||
    apt?.phone?.includes(appointmentSearchTerm)
  );

  // ==================== TEST CONFIGURATION ====================
  const tests = [
    {
      id: "2D-Echocardiogram",
      name: "2D-Echocardiogram",
      icon: "📊",
      color: "#667eea",
      lightColor: "#e6edff",
      gradient: "linear-gradient(135deg, #667eea, #764ba2)",
      description: "Heart ultrasound imaging"
    },
    {
      id: "Electrocardiogram",
      name: "Electrocardiogram",
      icon: "📈",
      color: "#f093fb",
      lightColor: "#fef0ff",
      gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
      description: "Heart electrical activity"
    },
    {
      id: "Treadmill Test",
      name: "Treadmill Test",
      icon: "🏃",
      color: "#4facfe",
      lightColor: "#e6f2ff",
      gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
      description: "Stress test on treadmill"
    }
  ];

  const getReportDetails = (testType) => {
    switch(testType) {
      case "2D-Echocardiogram":
        return {
          title: "2D-ECHOCARDIOGRAM REPORT",
          icon: "📊",
          department: "Echocardiography Department"
        };
      case "Electrocardiogram":
        return {
          title: "ELECTROCARDIOGRAM (ECG) REPORT",
          icon: "📈",
          department: "Cardiology - ECG Department"
        };
      case "Treadmill Test":
        return {
          title: "TREADMILL TEST (TMT) REPORT",
          icon: "🏃",
          department: "Stress Testing Laboratory"
        };
      default:
        return {
          title: "MEDICAL REPORT",
          icon: "📋",
          department: "Laboratory Department"
        };
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="loading-spinner"></div>
        <p>Loading laboratory data...</p>
      </div>
    );
  }

  return (
    <div className="laboratory-page">
      {/* HEADER */}
      <div className="page-header">
        <h1>🔬 Laboratory Management</h1>
        <p className="page-subtitle">Manage patient laboratory tests</p>
      </div>

      {/* STATS CARDS */}
      <div className="stats-row">
        <div 
          className={`stat-card ${filterType === 'all' ? 'active-filter' : ''}`}
          style={{ borderLeft: "4px solid #667eea", cursor: "pointer" }}
          onClick={() => handleFilterClick('all')}
        >
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <span className="stat-label">Total Lab Patients</span>
            <span className="stat-value">{stats?.total || 0}</span>
          </div>
        </div>
        
        <div 
          className={`stat-card ${filterType === 'male' ? 'active-filter' : ''}`}
          style={{ borderLeft: "4px solid #4facfe", cursor: "pointer" }}
          onClick={() => handleFilterClick('male')}
        >
          <div className="stat-icon">👨</div>
          <div className="stat-info">
            <span className="stat-label">Male</span>
            <span className="stat-value">{stats?.male || 0}</span>
          </div>
        </div>
        
        <div 
          className={`stat-card ${filterType === 'female' ? 'active-filter' : ''}`}
          style={{ borderLeft: "4px solid #f093fb", cursor: "pointer" }}
          onClick={() => handleFilterClick('female')}
        >
          <div className="stat-icon">👩</div>
          <div className="stat-info">
            <span className="stat-label">Female</span>
            <span className="stat-value">{stats?.female || 0}</span>
          </div>
        </div>
        
        <div className="stat-card" style={{ borderLeft: "4px solid #ff9800" }}>
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <span className="stat-label">Registered Patients</span>
            <span className="stat-value">{registeredPatients?.length || 0}</span>
          </div>
        </div>

        <div className="stat-card" style={{ borderLeft: "4px solid #28a745" }}>
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <span className="stat-label">Total Appointments</span>
            <span className="stat-value">{appointments?.length || 0}</span>
          </div>
        </div>
      </div>

      {/* FILTER INDICATOR */}
      {/* {filterType !== 'all' && (
        <div className="filter-indicator">
          <span>🔍 Showing {filterType} patients only</span>
          <button className="clear-filter" onClick={() => setFilterType('all')}>
            Clear Filter ✕
          </button>
        </div>
      )} */}

      {/* TEST FOLDERS */}
      <div className="lab-tests-section">
        <h2>📁 Laboratory Test Folders</h2>
        <div className="test-buttons-row">
          {tests.map((test) => (
            <div
              key={test.id}
              className="test-button-card"
              onClick={() => handleTestButtonClick(test.id)}
              style={{ borderColor: test.color, backgroundColor: test.lightColor }}
            >
              <div className="test-icon" style={{ background: test.gradient }}>
                {test.icon}
              </div>
              <div className="test-info">
                <h3>{test.name}</h3>
                <p>{test.description}</p>
                <div className="patient-count">
                  {laboratoryPatients[test.id]?.length || 0} patients
                </div>
              </div>
              <div className="test-count" style={{ background: test.color }}>
                {laboratoryPatients[test.id]?.length || 0}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ALL APPOINTMENTS SECTION */}
      <div className="appointments-section">
        <div className="section-header">
          <h2>📋 All Appointments</h2>
          <span className="badge">{appointments?.length || 0} total</span>
        </div>

        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search appointments by name, phone, or date..."
            value={appointmentSearchTerm}
            onChange={(e) => setAppointmentSearchTerm(e.target.value)}
            className="search-input"
          />
          {appointmentSearchTerm && (
            <button className="clear-btn" onClick={() => setAppointmentSearchTerm("")}>×</button>
          )}
        </div>

        <div className="patient-list">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((apt) => (
              <div
                key={apt._id || apt.id || Math.random()}
                className="patient-item appointment-item"
                onClick={() => handlePatientClick(apt, 'appointment')}
              >
                <div className="patient-info">
                  <strong>{apt.patientName}</strong>
                  <span>
                    {apt.age}y / {apt.gender} • {apt.phone} • {apt.date}
                  </span>
                  <small className="appointment-time">⏰ {apt.time}</small>
                </div>
                <button className="assign-btn">Assign Test</button>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <span className="empty-icon">📋</span>
              <p>{appointmentSearchTerm ? "No matching appointments found" : "No appointments found"}</p>
            </div>
          )}
        </div>
      </div>

      {/* REGISTERED PATIENTS SECTION */}
      <div className="registered-patients-section">
        <div className="section-header">
          <h2>📋 Registered Patients</h2>
          <span className="badge">{registeredPatients?.length || 0} total</span>
        </div>

        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search patients by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm("")}>×</button>
          )}
        </div>

        <div className="patient-list">
          {filteredRegisteredPatients.length > 0 ? (
            filteredRegisteredPatients.map((patient) => (
              <div
                key={patient._id || patient.id || Math.random()}
                className="patient-item"
                onClick={() => handlePatientClick(patient, 'patient')}
              >
                <div className="patient-info">
                  <strong>{patient.patientName}</strong>
                  <span>
                    {patient.age}y / {patient.gender} • {patient.phone} • {patient.bloodGroup || "No BG"}
                  </span>
                </div>
                <button className="assign-btn">Assign Test</button>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <span className="empty-icon">📋</span>
              <p>{searchTerm ? "No matching patients found" : "No registered patients"}</p>
            </div>
          )}
        </div>
      </div>

      {/* TEST SELECTION POPUP */}
      {showTestPopup && selectedPatient && (
        <div className="popup-overlay" onClick={() => setShowTestPopup(false)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>🧪 Select Test for {selectedPatient.patientName}</h3>
              <button className="close-btn" onClick={() => setShowTestPopup(false)}>×</button>
            </div>
            <div className="popup-content">
              <div className="patient-summary">
                <p><strong>Age:</strong> {selectedPatient.age} | <strong>Gender:</strong> {selectedPatient.gender}</p>
                <p><strong>Phone:</strong> {selectedPatient.phone} | <strong>Blood Group:</strong> {selectedPatient.bloodGroup || "-"}</p>
                <p><strong>Symptoms:</strong> {formatSymptomsFull(selectedPatient.symptoms)}</p>
                <p><strong>Source:</strong> {selectedPatient.sourceType === 'appointment' ? '📋 Appointment' : '📋 Registered Patient'}</p>
              </div>
              <div className="test-options">
                {tests.map((test) => (
                  <button
                    key={test.id}
                    className="test-option"
                    style={{ borderColor: test.color }}
                    onClick={() => handleTestSelect(test.id)}
                  >
                    <span className="test-option-icon" style={{ background: test.gradient }}>
                      {test.icon}
                    </span>
                    <span className="test-option-name">{test.name}</span>
                    <span className="test-option-arrow">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TEST FOLDER POPUP with BOTH Cancel and Delete buttons */}
      {showPatientListPopup && selectedTestForList && (
        <div className="popup-overlay" onClick={() => setShowPatientListPopup(false)}>
          <div className="popup-card large-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header" style={{ 
              background: tests.find(t => t.id === selectedTestForList)?.gradient 
            }}>
              <h3>
                {tests.find(t => t.id === selectedTestForList)?.icon} {selectedTestForList}
                <span className="header-count">
                  ({laboratoryPatients[selectedTestForList]?.length || 0} patients)
                </span>
              </h3>
              <button className="close-btn" onClick={() => setShowPatientListPopup(false)}>×</button>
            </div>
            <div className="popup-content">
              {(laboratoryPatients[selectedTestForList] || []).length > 0 ? (
                <div className="patient-grid-2col">
                  {(laboratoryPatients[selectedTestForList] || [])
                    .filter(patient => filterType === 'all' || patient?.gender?.toLowerCase() === filterType)
                    .map((patient) => (
                      <div key={patient._id} className="patient-card-modern with-actions">
                        <div className="patient-card-main" onClick={() => handlePatientCardClick(patient)}>
                          <div className="patient-card-header">
                            <div className="patient-avatar-large">
                              {patient.gender === "Male" ? "👨" : "👩"}
                            </div>
                            <div className="patient-name-section">
                              <h4>{patient.patientName}</h4>
                              <span className="patient-age-gender">{patient.age}y • {patient.gender}</span>
                            </div>
                          </div>
                          <div className="patient-card-body">
                            <div className="info-row">
                              <span className="info-icon">📞</span>
                              <span>{patient.phone}</span>
                            </div>
                            <div className="info-row">
                              <span className="info-icon">⏰</span>
                              <span>{patient.testTime}</span>
                            </div>
                            {patient.symptoms && (
                              <div className="info-row">
                                <span className="info-icon">🩺</span>
                                <span>{formatSymptoms(patient.symptoms)}</span>
                              </div>
                            )}
                          </div>
                          <div className="patient-card-footer">
                            <span className="click-hint">Click to view report →</span>
                          </div>
                        </div>
                        <div className="action-buttons">
                          {/* ✅ Cancel button to move back to registered list */}
                          
                          {/* ✅ Delete button for permanent deletion */}
                          <button 
                            className="delete-btn-small"
                            onClick={(e) => handleDeleteIconClick(e, patient)}
                            title="Delete permanently"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="empty-state">
                  <span className="empty-icon">📭</span>
                  <p>No patients in this folder</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ✅ CANCEL CONFIRMATION POPUP */}
      {showCancelConfirmPopup && patientToCancel && (
        <div className="popup-overlay" onClick={() => setShowCancelConfirmPopup(false)}>
          <div className="popup-card confirm-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header" style={{ background: "linear-gradient(135deg, #ff9800, #f57c00)" }}>
              <h3>↩️ Confirm Move to Registered</h3>
              <button className="close-btn" onClick={() => setShowCancelConfirmPopup(false)}>×</button>
            </div>
            <div className="popup-content">
              <div className="confirm-icon">↩️</div>
              <p className="confirm-message">
                Move <strong>{patientToCancel.patientName}</strong> back to registered patients list?
              </p>
              <div className="confirm-actions">
                <button className="cancel-btn" onClick={() => setShowCancelConfirmPopup(false)}>
                  No
                </button>
                <button className="confirm-btn" onClick={handleCancelPatient}>
                  Yes, Move
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION POPUP */}
      {showDeleteConfirmPopup && patientToDelete && (
        <div className="popup-overlay" onClick={() => setShowDeleteConfirmPopup(false)}>
          <div className="popup-card confirm-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header" style={{ background: "linear-gradient(135deg, #dc3545, #c82333)" }}>
              <h3>⚠️ Confirm Permanent Deletion</h3>
              <button className="close-btn" onClick={() => setShowDeleteConfirmPopup(false)}>×</button>
            </div>
            <div className="popup-content">
              <div className="confirm-icon delete-icon">🗑️</div>
              <p className="confirm-message">
                Permanently delete <strong>{patientToDelete.patientName}</strong>?
              </p>
              <p className="confirm-note warning">This action cannot be undone!</p>
              <div className="confirm-actions">
                <button className="cancel-btn" onClick={() => setShowDeleteConfirmPopup(false)}>
                  Cancel
                </button>
                <br/>
                <button className="confirm-delete-btn" onClick={handleDeletePatient}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REPORT POPUP with Symptoms and Doctor Name */}
      {showReportPopup && selectedReportPatient && (
        <div className="popup-overlay" onClick={() => setShowReportPopup(false)}>
          <div className="popup-card report-popup" onClick={(e) => e.stopPropagation()}>
            <div className="report-header" style={{ 
              background: selectedTestType === "2D-Echocardiogram" ? "linear-gradient(135deg, #1e2b4a, #2a3b5c)" :
                          selectedTestType === "Electrocardiogram" ? "linear-gradient(135deg, #6b21a8, #86198f)" :
                          "linear-gradient(135deg, #0e7490, #0891b2)"
            }}>
              <div className="header-top">
                <div className="hospital-info">
                  <h2 style={{color:"white"}}>🏥 Medi Care Clinic</h2>
                  <p style={{color:"white"}}>{getReportDetails(selectedTestType).department}</p>
                </div>
                <button className="close-btn" onClick={() => setShowReportPopup(false)}>×</button>
              </div>
              <div className="report-title">
                <span className="title-icon">{getReportDetails(selectedTestType).icon}</span>
                <h1 style={{color:"white"}}>{getReportDetails(selectedTestType).title}</h1>
                <span className="report-id">#{selectedReportPatient.testId?.slice(-6)}</span>
              </div>
            </div>
            <div className="report-body">
              {/* Patient Information Card */}
              <div className="patient-info-card">
                <div className="card-header">
                  <span className="header-icon">👤</span>
                  <h3>PATIENT DETAILS</h3>
                </div>
                <div className="patient-details-grid">
                  <div className="detail-group">
                    <label>Patient Name</label>
                    <div className="detail-value">{selectedReportPatient.patientName}</div>
                  </div>
                  <div className="detail-group">
                    <label>Phone</label>
                    <div className="detail-value">{selectedReportPatient.phone}</div>
                  </div>
                  <div className="detail-group">
                    <label>Age / Gender</label>
                    <div className="detail-value">{selectedReportPatient.age}y / {selectedReportPatient.gender}</div>
                  </div>
                  <div className="detail-group">
                    <label>Test Date</label>
                    <div className="detail-value">{formatDate(selectedReportPatient.testDate)}</div>
                  </div>
                  <div className="detail-group">
                    <label>Blood Group</label>
                    <div className="detail-value">{selectedReportPatient.bloodGroup || "-"}</div>
                  </div>
                  
                  {/* Symptoms added here */}
                  {selectedReportPatient.symptoms && (
                    <div className="detail-group full-width">
                      <label>Presenting Symptoms</label>
                      <div className="detail-value symptoms-box">
                        <span className="value-icon">🩺</span>
                        {formatSymptomsFull(selectedReportPatient.symptoms)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer with Doctor Name */}
              <div className="report-footer-modern">
                <div className="doctor-signature">
                  <div className="signature-line"></div>
                  <span className="doctor-name">Dr. Pranjal Patil</span>
                  <span className="doctor-title">Consultant Cardiologist</span>
                </div>
                <div className="report-date-modern">
                  <span className="date-icon">📅</span>
                  {new Date().toLocaleDateString('en-IN')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Laboratory;