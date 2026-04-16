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
  
  // ✅ Store original counts for stats
  const [originalCounts, setOriginalCounts] = useState({
    registered: 0,
    appointments: 0
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
    total: 0
  });
  
  const [loading, setLoading] = useState(false);

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
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await fetchLaboratoryData();
      await loadRegisteredPatients();
      await loadAllAppointments();
    } catch (error) {
      console.error("❌ Error fetching all data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLaboratoryData = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/laboratory');
      const data = await response.json();
      
      if (data.success) {
        setLaboratoryPatients(data.groupedByTest || {
          "2D-Echocardiogram": [],
          "Electrocardiogram": [],
          "Treadmill Test": []
        });
        setStats({ total: data.stats?.total || 0 });
      }
    } catch (error) {
      console.error("❌ Error fetching lab data:", error);
    }
  };

  const loadRegisteredPatients = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/patients');
      const data = await response.json();
      
      if (data.success) {
        const allPatients = data.data || [];
        
        // Store original total count
        setOriginalCounts(prev => ({
          ...prev,
          registered: allPatients.length
        }));
        
        // Get all lab patient IDs from current state
        const allLabPatients = [
          ...(laboratoryPatients["2D-Echocardiogram"] || []),
          ...(laboratoryPatients["Electrocardiogram"] || []),
          ...(laboratoryPatients["Treadmill Test"] || [])
        ];
        
        const labPatientSourceIds = new Set(allLabPatients.map(p => p.sourceId));
        
        // Filter out patients that are already in laboratory
        const filteredPatients = allPatients.filter(patient => {
          const patientId = patient._id || patient.id;
          return !labPatientSourceIds.has(patientId);
        });
        
        setRegisteredPatients(filteredPatients);
        console.log(`✅ Registered: ${filteredPatients.length} available (${allPatients.length} total)`);
      }
    } catch (error) {
      console.error("❌ Error fetching patients:", error);
    }
  };

  const loadAllAppointments = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/appointments');
      const data = await response.json();
      
      if (data.success) {
        const allAppointments = data.appointments || [];
        
        // Store original total count
        setOriginalCounts(prev => ({
          ...prev,
          appointments: allAppointments.length
        }));
        
        // Get all lab patient IDs from current state
        const allLabPatients = [
          ...(laboratoryPatients["2D-Echocardiogram"] || []),
          ...(laboratoryPatients["Electrocardiogram"] || []),
          ...(laboratoryPatients["Treadmill Test"] || [])
        ];
        
        const labPatientSourceIds = new Set(allLabPatients.map(p => p.sourceId));
        
        // Filter out appointments that are already in laboratory
        const filteredAppointments = allAppointments.filter(apt => {
          const aptId = apt._id || apt.id;
          return !labPatientSourceIds.has(aptId);
        });
        
        setAppointments(filteredAppointments);
        console.log(`✅ Appointments: ${filteredAppointments.length} available (${allAppointments.length} total)`);
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
      
      // Store original total count
      setOriginalCounts(prev => ({
        ...prev,
        appointments: allAppointments.length
      }));
      
      // Get all lab patient IDs from current state
      const allLabPatients = [
        ...(laboratoryPatients["2D-Echocardiogram"] || []),
        ...(laboratoryPatients["Electrocardiogram"] || []),
        ...(laboratoryPatients["Treadmill Test"] || [])
      ];
      
      const labPatientSourceIds = new Set(allLabPatients.map(p => p.sourceId));
      
      const filteredAppointments = allAppointments.filter(apt => {
        const aptId = apt.id;
        return !labPatientSourceIds.has(aptId);
      });
      
      setAppointments(filteredAppointments);
    } catch (error) {
      console.error("❌ Error loading from localStorage:", error);
      setAppointments([]);
    }
  };

  // ==================== FETCH PATIENTS FOR A SPECIFIC TEST ====================
  const fetchTestPatients = async (testName) => {
    try {
      setLoading(true);
      // Map test name to URL parameter
      let urlParam = testName;
      if (testName === "2D-Echocardiogram") urlParam = "2D-Echocardiogram";
      else if (testName === "Electrocardiogram") urlParam = "Electrocardiogram";
      else if (testName === "Treadmill Test") urlParam = "Treadmill Test";
      
      const response = await fetch(`http://localhost:8001/api/laboratory/test/${urlParam}`);
      const data = await response.json();
      
      if (data.success) {
        setLaboratoryPatients(prev => ({
          ...prev,
          [testName]: data.patients || []
        }));
      }
    } catch (error) {
      console.error('Error fetching test patients:', error);
    } finally {
      setLoading(false);
    }
  };

  // ==================== HANDLE PATIENT CLICK ====================
  const handlePatientClick = (patient, sourceType = 'patient') => {
    setSelectedPatient({...patient, sourceType});
    setShowTestPopup(true);
  };

  // ==================== HANDLE TEST SELECTION - FIXED VERSION ====================
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
        // ✅ Get the patient ID to remove from source
        const patientId = selectedPatient.id || selectedPatient._id;
        
        // ✅ CRITICAL FIX: Remove patient from BOTH lists regardless of source type
        // Remove from appointments
        setAppointments(prevAppointments => {
          const filtered = prevAppointments.filter(apt => {
            const aptId = apt._id || apt.id;
            return aptId !== patientId;
          });
          console.log(`Removed from appointments: ${prevAppointments.length} -> ${filtered.length}`);
          return filtered;
        });
        
        // Remove from registered patients
        setRegisteredPatients(prevPatients => {
          const filtered = prevPatients.filter(p => {
            const pId = p._id || p.id;
            return pId !== patientId;
          });
          console.log(`Removed from registered: ${prevPatients.length} -> ${filtered.length}`);
          return filtered;
        });
        
        // ✅ Update laboratory patients with the COMPLETE data from backend
        setLaboratoryPatients(data.groupedByTest || {
          "2D-Echocardiogram": [],
          "Electrocardiogram": [],
          "Treadmill Test": []
        });
        
        // ✅ Update total stats
        setStats({ total: data.stats?.total || 0 });
        
        // ✅ Show success message and close popup
        alert(`✅ Patient added to ${testName} successfully!`);
        setShowTestPopup(false);
        setSelectedPatient(null);
        
        // ✅ Refresh the patient list popup if it's open
        if (showPatientListPopup && selectedTestForList === testName) {
          await fetchTestPatients(testName);
        }
        
        // ✅ Also refresh the main lab data to ensure counts are accurate
        await fetchLaboratoryData();
        
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

  // ==================== HANDLE CANCEL (Move back to registered) ====================
  const handleCancelPatient = async () => {
    if (!patientToCancel) return;

    try {
      setLoading(true);
      
      const response = await fetch(`http://localhost:8001/api/laboratory/${patientToCancel._id}/cancel`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (data.success) {
        // ✅ Update laboratory patients with data from backend
        setLaboratoryPatients(data.groupedByTest || {
          "2D-Echocardiogram": [],
          "Electrocardiogram": [],
          "Treadmill Test": []
        });
        
        // ✅ Update stats
        setStats({ total: data.stats?.total || 0 });
        
        // ✅ Immediately update registered patients list
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
        
        setRegisteredPatients(prev => {
          const exists = prev.some(p => p._id === cancelledPatient._id);
          if (exists) return prev;
          return [...prev, cancelledPatient];
        });
        
        // ✅ Refresh the test folder if it's open
        if (showPatientListPopup && selectedTestForList === patientToCancel.testName) {
          await fetchTestPatients(patientToCancel.testName);
        }
        
        alert(`✅ Patient ${patientToCancel.patientName} moved back to registered list`);
        setShowCancelConfirmPopup(false);
        setPatientToCancel(null);
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
      
      const response = await fetch(`http://localhost:8001/api/laboratory/${patientToDelete._id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        // ✅ Update laboratory patients with data from backend
        setLaboratoryPatients(data.groupedByTest || {
          "2D-Echocardiogram": [],
          "Electrocardiogram": [],
          "Treadmill Test": []
        });
        
        // ✅ Update stats
        setStats({ total: data.stats?.total || 0 });
        
        // ✅ Refresh the test folder if it's open
        if (showPatientListPopup && selectedTestForList === patientToDelete.testName) {
          await fetchTestPatients(patientToDelete.testName);
        }
        
        alert(`✅ Patient ${patientToDelete.patientName} deleted permanently`);
        setShowDeleteConfirmPopup(false);
        setPatientToDelete(null);
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
    
    // Fetch patients for this test
    await fetchTestPatients(testName);
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
    setPatientToCancel(patient);
    setShowCancelConfirmPopup(true);
  };

  const handleDeleteIconClick = (e, patient) => {
    e.stopPropagation();
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
        <div className="stat-card" style={{ borderLeft: "4px solid #667eea" }}>
          <div className="stat-icon">👤</div>
          <div className="stat-info">
            <span className="stat-label">Total Lab Patients</span>
            <span className="stat-value">{stats?.total || 0}</span>
          </div>
        </div>
        
        <div className="stat-card" style={{ borderLeft: "4px solid #ff9800" }}>
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <span className="stat-label">Registered Patients</span>
            <span className="stat-value">{originalCounts.registered}</span>
          </div>
        </div>

        <div className="stat-card" style={{ borderLeft: "4px solid #28a745" }}>
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <span className="stat-label">Total Appointments</span>
            <span className="stat-value">{originalCounts.appointments}</span>
          </div>
        </div>
      </div>

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
          <span className="badge">{appointments?.length || 0} available</span>
          <small className="total-count">(Total: {originalCounts.appointments})</small>
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
              <p>{appointmentSearchTerm ? "No matching appointments found" : "No available appointments"}</p>
              {originalCounts.appointments > 0 && (
                <small>{originalCounts.appointments} total appointments, but all are assigned to tests</small>
              )}
            </div>
          )}
        </div>
      </div>

      {/* REGISTERED PATIENTS SECTION */}
      <div className="registered-patients-section">
        <div className="section-header">
          <h2>📋 Registered Patients</h2>
          <span className="badge">{registeredPatients?.length || 0} available</span>
          <small className="total-count">(Total: {originalCounts.registered})</small>
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
              <p>{searchTerm ? "No matching patients found" : "No available patients"}</p>
              {originalCounts.registered > 0 && (
                <small>{originalCounts.registered} total patients, but all are assigned to tests</small>
              )}
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

      {/* TEST FOLDER POPUP */}
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
              {laboratoryPatients[selectedTestForList]?.length > 0 ? (
                <div className="patient-grid-2col">
                  {laboratoryPatients[selectedTestForList].map((patient) => (
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
                            <span>{patient.createdAt ? formatDate(patient.createdAt) : "-"}</span>
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
                        {/* Delete button for permanent deletion */}
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
                <button className="confirm-delete-btn" onClick={handleDeletePatient}>
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REPORT POPUP */}
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
                <span className="report-id">#{selectedReportPatient._id?.slice(-6)}</span>
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
                    <div className="detail-value">{formatDate(selectedReportPatient.createdAt)}</div>
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