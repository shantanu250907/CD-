import React, { createContext, useState, useContext, useEffect } from 'react';

const BedContext = createContext();

export const useBeds = () => {
  const context = useContext(BedContext);
  if (!context) {
    throw new Error('useBeds must be used within a BedProvider');
  }
  return context;
};

export const BedProvider = ({ children }) => {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [admissions, setAdmissions] = useState([]);

  // ==================== FETCH BEDS FROM BACKEND ====================
  const fetchBeds = async () => {
    try {
      console.log("🛏️ Fetching beds from backend...");
      const response = await fetch('http://localhost:8001/api/beds');
      const data = await response.json();

      if (data.success) {
        console.log(`✅ Loaded ${data.data.length} beds`);
        setBeds(data.data);
      } else {
        console.error("❌ Failed to fetch beds:", data.message);
        // Fallback to localStorage
        const savedBeds = JSON.parse(localStorage.getItem('beds') || '[]');
        if (savedBeds.length === 0) {
          // Default beds if nothing exists
          const defaultBeds = generateDefaultBeds();
          setBeds(defaultBeds);
          localStorage.setItem('beds', JSON.stringify(defaultBeds));
        } else {
          setBeds(savedBeds);
        }
      }
    } catch (error) {
      console.error("❌ Error fetching beds:", error);
      // Fallback to localStorage
      const savedBeds = JSON.parse(localStorage.getItem('beds') || '[]');
      if (savedBeds.length === 0) {
        const defaultBeds = generateDefaultBeds();
        setBeds(defaultBeds);
        localStorage.setItem('beds', JSON.stringify(defaultBeds));
      } else {
        setBeds(savedBeds);
      }
    } finally {
      setLoading(false);
    }
  };

  // ==================== FETCH ADMISSIONS ====================
  const fetchAdmissions = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/admitpatient');
      const data = await response.json();

      if (data.success) {
        const activeAdmissions = data.data.filter(adm => adm.status === "Admitted");
        setAdmissions(activeAdmissions);
      }
    } catch (error) {
      console.error("❌ Error fetching admissions:", error);
    }
  };

  // ==================== GENERATE DEFAULT BEDS ====================
  const generateDefaultBeds = () => {
    const defaultBeds = [];
    // Generate 20 beds: B1 to B20
    for (let i = 1; i <= 20; i++) {
      defaultBeds.push({
        id: `B${i}`,
        bedNumber: `B${i}`,
        type: i <= 15 ? 'General' : (i <= 18 ? 'ICU' : 'Emergency'),
        status: 'available',
        patient: null,
        assigned: null
      });
    }
    return defaultBeds;
  };

  // ==================== ADD BED ====================
  const addBed = async (bedData) => {
    try {
      // Try to add to backend
      const response = await fetch('http://localhost:8001/api/beds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bedData)
      });

      const data = await response.json();

      if (data.success) {
        console.log("✅ Bed added to backend:", data.data);
        // Update local state
        setBeds(prev => [...prev, data.data]);
        // Update localStorage
        const updatedBeds = [...beds, data.data];
        localStorage.setItem('beds', JSON.stringify(updatedBeds));
        return { success: true, data: data.data };
      } else {
        // Fallback to localStorage only
        console.warn("⚠️ Backend failed, saving to localStorage only");
        const newBed = {
          id: bedData.bedNumber || bedData.id,
          bedNumber: bedData.bedNumber || bedData.id,
          type: bedData.type || 'General',
          status: bedData.status || 'available',
          patient: null,
          assigned: null
        };
        setBeds(prev => [...prev, newBed]);
        const updatedBeds = [...beds, newBed];
        localStorage.setItem('beds', JSON.stringify(updatedBeds));
        return { success: true, data: newBed };
      }
    } catch (error) {
      console.error("❌ Error adding bed:", error);
      // Fallback to localStorage
      const newBed = {
        id: bedData.bedNumber || bedData.id,
        bedNumber: bedData.bedNumber || bedData.id,
        type: bedData.type || 'General',
        status: bedData.status || 'available',
        patient: null,
        assigned: null
      };
      setBeds(prev => [...prev, newBed]);
      const updatedBeds = [...beds, newBed];
      localStorage.setItem('beds', JSON.stringify(updatedBeds));
      return { success: true, data: newBed };
    }
  };

  // ==================== DELETE BED ====================
  const deleteBed = async (bedId) => {
    try {
      // Try to delete from backend
      const response = await fetch(`http://localhost:8001/api/beds/${bedId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log("✅ Bed deleted from backend");
      } else {
        console.warn("⚠️ Backend delete failed, removing from local only");
      }

      // Update local state regardless
      setBeds(prev => prev.filter(bed => bed.id !== bedId && bed.bedNumber !== bedId));
      
      // Update localStorage
      const updatedBeds = beds.filter(bed => bed.id !== bedId && bed.bedNumber !== bedId);
      localStorage.setItem('beds', JSON.stringify(updatedBeds));
      
      return { success: true };
    } catch (error) {
      console.error("❌ Error deleting bed:", error);
      // Fallback - remove from local state
      setBeds(prev => prev.filter(bed => bed.id !== bedId && bed.bedNumber !== bedId));
      const updatedBeds = beds.filter(bed => bed.id !== bedId && bed.bedNumber !== bedId);
      localStorage.setItem('beds', JSON.stringify(updatedBeds));
      return { success: true };
    }
  };

  // ==================== UPDATE BED STATUS ====================
  const updateBedStatus = async (bedId, newStatus, patientData = null) => {
    try {
      // Try to update in backend
      const response = await fetch(`http://localhost:8001/api/beds/${bedId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: newStatus,
          patient: patientData
        })
      });

      // Update local state
      setBeds(prev => prev.map(bed => 
        (bed.id === bedId || bed.bedNumber === bedId) 
          ? { 
              ...bed, 
              status: newStatus,
              patient: newStatus === 'occupied' ? patientData?.patientName || bed.patient : null,
              assigned: newStatus === 'occupied' ? new Date().toISOString().split('T')[0] : null
            } 
          : bed
      ));

      // Update localStorage
      const updatedBeds = beds.map(bed => 
        (bed.id === bedId || bed.bedNumber === bedId) 
          ? { 
              ...bed, 
              status: newStatus,
              patient: newStatus === 'occupied' ? patientData?.patientName || bed.patient : null,
              assigned: newStatus === 'occupied' ? new Date().toISOString().split('T')[0] : null
            } 
          : bed
      );
      localStorage.setItem('beds', JSON.stringify(updatedBeds));

      return { success: true };
    } catch (error) {
      console.error("❌ Error updating bed status:", error);
      // Fallback - update local state anyway
      setBeds(prev => prev.map(bed => 
        (bed.id === bedId || bed.bedNumber === bedId) 
          ? { 
              ...bed, 
              status: newStatus,
              patient: newStatus === 'occupied' ? patientData?.patientName || bed.patient : null,
              assigned: newStatus === 'occupied' ? new Date().toISOString().split('T')[0] : null
            } 
          : bed
      ));
      return { success: true };
    }
  };

  // ==================== GET OCCUPIED BEDS WITH PATIENT DATA ====================
  const getOccupiedBeds = () => {
    // Combine bed data with admission data
    const occupiedMap = {};
    
    admissions.forEach(admission => {
      if (admission.status === "Admitted" && admission.bedNo) {
        occupiedMap[admission.bedNo] = admission;
      }
    });

    return occupiedMap;
  };

  // ==================== GET BED STATISTICS ====================
  const getBedStats = () => {
    const total = beds.length;
    const available = beds.filter(b => b.status === 'available').length;
    const occupied = beds.filter(b => b.status === 'occupied').length;
    const maintenance = beds.filter(b => b.status === 'maintenance').length;
    
    // Also check admissions for occupied beds
    const admittedPatients = admissions.filter(adm => adm.status === "Admitted").length;
    
    return {
      total,
      available,
      occupied: Math.max(occupied, admittedPatients), // Use max of both
      maintenance
    };
  };

  // Load initial data
  useEffect(() => {
    fetchBeds();
    fetchAdmissions();

    // Refresh admissions every 30 seconds
    const interval = setInterval(() => {
      fetchAdmissions();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const value = {
    beds,
    admissions,
    loading,
    addBed,
    deleteBed,
    updateBedStatus,
    getOccupiedBeds,
    getBedStats,
    refreshBeds: fetchBeds,
    refreshAdmissions: fetchAdmissions
  };

  return (
    <BedContext.Provider value={value}>
      {children}
    </BedContext.Provider>
  );
};