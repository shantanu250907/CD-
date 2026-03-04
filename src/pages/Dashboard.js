import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// ✅ Use port 8002 to match your patients API
const API_URL = 'http://localhost:8002';

// Simple event bus for component communication
const EventBus = {
  events: {},
  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    return () => {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    };
  },
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
};

// Make EventBus globally available so other components can access it
window.EventBus = EventBus;

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState({
    staff: 0,
    beds: 0,
    patients: 0,
    laboratory: 0,
    machinery: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);

  // Format date
  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return currentTime.toLocaleDateString('en-US', options);
  };

  // Format time ago
  const timeAgo = (timestamp) => {
    if (!timestamp) return 'recently';
    
    const now = new Date();
    const past = new Date(timestamp);
    const seconds = Math.floor((now - past) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  // Helper function to extract count from API response
  const extractCount = (responseData) => {
    if (!responseData) return 0;
    
    console.log('🔍 Extracting count from:', responseData);
    
    // If it's a number
    if (typeof responseData === 'number') return responseData;
    
    // If it has count property
    if (responseData.count !== undefined) return responseData.count;
    
    // If it has total property
    if (responseData.total !== undefined) return responseData.total;
    
    // If it has data array
    if (responseData.data && Array.isArray(responseData.data)) return responseData.data.length;
    
    // If it has patients array (for laboratory)
    if (responseData.patients && Array.isArray(responseData.patients)) return responseData.patients.length;
    
    // If it has groupedByTest (for laboratory)
    if (responseData.groupedByTest) {
      const grouped = responseData.groupedByTest;
      return (
        (grouped["2D-Echocardiogram"]?.length || 0) +
        (grouped["Electrocardiogram"]?.length || 0) +
        (grouped["Treadmill Test"]?.length || 0)
      );
    }
    
    // If it's an array itself
    if (Array.isArray(responseData)) return responseData.length;
    
    // If it has length property
    if (responseData.length !== undefined) return responseData.length;
    
    return 0;
  };

  // Fetch all stats from backend
  const fetchAllStats = async () => {
    try {
      setLoading(true);
      console.log('📊 Fetching dashboard stats from:', API_URL);
      
      // Parallel API calls for better performance
      const [
        staffRes,
        bedsRes,
        patientsRes,
        labRes,
        machineryRes
      ] = await Promise.allSettled([
        fetch(`${API_URL}/api/staff`),
        fetch(`${API_URL}/api/beds`),
        fetch(`${API_URL}/api/patients`),
        fetch(`${API_URL}/api/laboratory`),
        fetch(`${API_URL}/api/machinery`)
      ]);

      // Process staff data
      let staffCount = 0;
      let staffData = [];
      if (staffRes.status === 'fulfilled' && staffRes.value.ok) {
        const data = await staffRes.value.json();
        console.log('📥 Staff API response:', data);
        staffCount = extractCount(data);
        staffData = data.data || (Array.isArray(data) ? data : []);
        console.log('👥 Staff count extracted:', staffCount);
      } else {
        console.warn('Failed to fetch staff data');
      }

      // Process beds data
      let bedsCount = 0;
      let bedsData = [];
      if (bedsRes.status === 'fulfilled' && bedsRes.value.ok) {
        const data = await bedsRes.value.json();
        console.log('📥 Beds API response:', data);
        bedsCount = extractCount(data);
        bedsData = data.data || (Array.isArray(data) ? data : []);
        console.log('🛏️ Beds count extracted:', bedsCount);
      } else {
        console.warn('Failed to fetch beds data');
      }

      // Process patients data
      let patientsCount = 0;
      let patientsData = [];
      if (patientsRes.status === 'fulfilled' && patientsRes.value.ok) {
        const data = await patientsRes.value.json();
        console.log('📥 Patients API response:', data);
        patientsCount = extractCount(data);
        patientsData = data.data || (Array.isArray(data) ? data : []);
        console.log('👥 Patient count extracted:', patientsCount);
      } else {
        console.warn('Failed to fetch patients data');
      }

      // Process laboratory data
      let labCount = 0;
      let labData = [];
      if (labRes.status === 'fulfilled' && labRes.value.ok) {
        const data = await labRes.value.json();
        console.log('📥 Laboratory API response:', data);
        labCount = extractCount(data);
        
        // Extract lab data based on structure
        if (data.data) {
          labData = data.data;
        } else if (data.groupedByTest) {
          labData = [
            ...(data.groupedByTest["2D-Echocardiogram"] || []),
            ...(data.groupedByTest["Electrocardiogram"] || []),
            ...(data.groupedByTest["Treadmill Test"] || [])
          ];
        } else if (Array.isArray(data)) {
          labData = data;
        } else if (data.patients) {
          labData = data.patients;
        }
        
        console.log('🔬 Lab count extracted:', labCount);
      } else {
        console.warn('Failed to fetch laboratory data');
      }

      // Process machinery data
      let machineryCount = 0;
      let machineryData = [];
      if (machineryRes.status === 'fulfilled' && machineryRes.value.ok) {
        const data = await machineryRes.value.json();
        console.log('📥 Machinery API response:', data);
        machineryCount = extractCount(data);
        machineryData = data.data || (Array.isArray(data) ? data : []);
        console.log('⚙️ Machinery count extracted:', machineryCount);
      } else {
        console.warn('Failed to fetch machinery data');
      }

      // Update stats with actual counts
      const newStats = {
        staff: staffCount,
        beds: bedsCount,
        patients: patientsCount,
        laboratory: labCount,
        machinery: machineryCount
      };

      console.log('📊 Final stats object:', newStats);
      setStats(newStats);

      // Generate recent activities from real data
      if (patientsData.length > 0 || staffData.length > 0 || bedsData.length > 0 || labData.length > 0 || machineryData.length > 0) {
        generateRecentActivities({
          staff: staffData,
          beds: bedsData,
          patients: patientsData,
          laboratory: labData,
          machinery: machineryData
        });
      } else {
        generateMockActivities();
      }

    } catch (error) {
      console.error('❌ Error fetching stats:', error);
      // Fallback to mock data if APIs fail
      const mockStats = {
        staff: 24,
        beds: 45,
        patients: 189,
        laboratory: 89,
        machinery: 15
      };
      console.log('📊 Using mock stats:', mockStats);
      setStats(mockStats);
      generateMockActivities();
    } finally {
      setLoading(false);
    }
  };

  // Generate recent activities from real data
  const generateRecentActivities = (data) => {
    const activities = [];

    // Add recent patients
    if (data.patients && data.patients.length > 0) {
      data.patients.slice(-3).reverse().forEach(patient => {
        const patientName = patient.patientName || patient.name || 'Unknown';
        const patientId = patient._id || patient.id;
        const createdAt = patient.createdAt || patient.registeredDate || patient.admitted;
        
        activities.push({
          id: `pat-${patientId || Date.now()}-${Math.random()}`,
          type: 'patient',
          title: `New patient registered: ${patientName}`,
          time: timeAgo(createdAt),
          icon: '👤',
          color: '#4CAF50',
          timestamp: createdAt ? new Date(createdAt).getTime() : Date.now()
        });
      });
    }

    // Add recent lab tests
    if (data.laboratory && data.laboratory.length > 0) {
      data.laboratory.slice(-3).reverse().forEach(test => {
        const testId = test._id || test.id;
        const updatedAt = test.updatedAt || test.createdAt;
        const patientName = test.patientName || test.patient || 'patient';
        
        if (test.status === 'Completed') {
          activities.push({
            id: `lab-${testId || Date.now()}-${Math.random()}`,
            type: 'lab',
            title: `Lab test completed for ${patientName}`,
            time: timeAgo(updatedAt),
            icon: '🔬',
            color: '#FF9800',
            timestamp: updatedAt ? new Date(updatedAt).getTime() : Date.now()
          });
        } else {
          activities.push({
            id: `lab-${testId || Date.now()}-${Math.random()}`,
            type: 'lab',
            title: `New lab test requested for ${patientName}`,
            time: timeAgo(test.createdAt),
            icon: '🔬',
            color: '#FF9800',
            timestamp: test.createdAt ? new Date(test.createdAt).getTime() : Date.now()
          });
        }
      });
    }

    // Add recent machinery updates
    if (data.machinery && data.machinery.length > 0) {
      data.machinery.slice(-3).reverse().forEach(machine => {
        const machineId = machine._id || machine.id;
        const machineName = machine.name || 'Equipment';
        const updatedAt = machine.updatedAt || machine.createdAt;
        
        if (machine.status === 'Under Maintenance') {
          activities.push({
            id: `mac-${machineId || Date.now()}-${Math.random()}`,
            type: 'machinery',
            title: `${machineName} is under maintenance`,
            time: timeAgo(updatedAt),
            icon: '⚙️',
            color: '#607D8B',
            timestamp: updatedAt ? new Date(updatedAt).getTime() : Date.now()
          });
        } else if (machine.lastService) {
          activities.push({
            id: `mac-${machineId || Date.now()}-${Math.random()}`,
            type: 'machinery',
            title: `${machineName} service completed`,
            time: timeAgo(machine.lastService),
            icon: '⚙️',
            color: '#607D8B',
            timestamp: new Date(machine.lastService).getTime()
          });
        }
      });
    }

    // Add recent bed updates
    if (data.beds && data.beds.length > 0) {
      data.beds.slice(-3).reverse().forEach(bed => {
        const bedId = bed._id || bed.id;
        const bedNumber = bed.bedNumber || bed.bedId || bed.bed_number;
        const updatedAt = bed.updatedAt || bed.createdAt;
        
        if (bed.status === 'Occupied') {
          activities.push({
            id: `bed-${bedId || Date.now()}-${Math.random()}`,
            type: 'bed',
            title: `Bed ${bedNumber} occupied`,
            time: timeAgo(updatedAt),
            icon: '🛏️',
            color: '#2196F3',
            timestamp: updatedAt ? new Date(updatedAt).getTime() : Date.now()
          });
        } else if (bed.status === 'Available') {
          activities.push({
            id: `bed-${bedId || Date.now()}-${Math.random()}`,
            type: 'bed',
            title: `Bed ${bedNumber} is now available`,
            time: timeAgo(updatedAt),
            icon: '🛏️',
            color: '#2196F3',
            timestamp: updatedAt ? new Date(updatedAt).getTime() : Date.now()
          });
        }
      });
    }

    // Add recent staff updates
    if (data.staff && data.staff.length > 0) {
      data.staff.slice(-3).reverse().forEach(member => {
        const memberId = member._id || member.id;
        const memberName = member.name || 'Unknown';
        const createdAt = member.createdAt || member.joinDate;
        
        activities.push({
          id: `stf-${memberId || Date.now()}-${Math.random()}`,
          type: 'staff',
          title: `New staff member joined: ${memberName}`,
          time: timeAgo(createdAt),
          icon: '👥',
          color: '#9C27B0',
          timestamp: createdAt ? new Date(createdAt).getTime() : Date.now()
        });
      });
    }

    // Sort by timestamp (newest first) and take top 8
    const sortedActivities = activities
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 8);

    if (sortedActivities.length > 0) {
      setRecentActivities(sortedActivities);
    } else {
      generateMockActivities();
    }
  };

  // Generate mock activities as fallback
  const generateMockActivities = () => {
    const mockActivities = [
      {
        id: 1,
        type: 'patient',
        title: 'New patient registered: Rahul Sharma',
        time: '10 minutes ago',
        icon: '👤',
        color: '#4CAF50',
        timestamp: Date.now() - 10 * 60 * 1000
      },
      {
        id: 2,
        type: 'lab',
        title: 'Lab test completed for patient #2345',
        time: '25 minutes ago',
        icon: '🔬',
        color: '#FF9800',
        timestamp: Date.now() - 25 * 60 * 1000
      },
      {
        id: 3,
        type: 'machinery',
        title: 'X-Ray Machine service completed',
        time: '1 hour ago',
        icon: '⚙️',
        color: '#607D8B',
        timestamp: Date.now() - 60 * 60 * 1000
      },
      {
        id: 4,
        type: 'bed',
        title: 'Patient admitted to Bed B12',
        time: '2 hours ago',
        icon: '🛏️',
        color: '#2196F3',
        timestamp: Date.now() - 2 * 60 * 60 * 1000
      },
      {
        id: 5,
        type: 'staff',
        title: 'New staff member joined: Priya Singh',
        time: '3 hours ago',
        icon: '👥',
        color: '#9C27B0',
        timestamp: Date.now() - 3 * 60 * 60 * 1000
      }
    ];
    setRecentActivities(mockActivities);
  };

  // Listen for data changes
  useEffect(() => {
    // Initial fetch
    fetchAllStats();
    
    // Listen for data changes from other components
    const handleDataChange = () => {
      console.log('🔄 Data changed, refreshing dashboard...');
      fetchAllStats();
    };

    // Subscribe to global events
    if (window.EventBus) {
      window.EventBus.subscribe('patientDataChanged', handleDataChange);
      window.EventBus.subscribe('staffDataChanged', handleDataChange);
      window.EventBus.subscribe('laboratoryDataChanged', handleDataChange);
      window.EventBus.subscribe('bedsDataChanged', handleDataChange);
      window.EventBus.subscribe('machineryDataChanged', handleDataChange);
    }

    // Auto-refresh every 30 seconds as backup
    const refreshInterval = setInterval(() => {
      console.log('🔄 Auto-refreshing dashboard...');
      fetchAllStats();
    }, 30000);

    // Update time every minute
    const timeTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Cleanup
    return () => {
      clearInterval(refreshInterval);
      clearInterval(timeTimer);
    };
  }, []);

  // Navigation handlers
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Stat cards data - using actual stats from state
  const statCards = [
    {
      id: 1,
      title: 'Staff',
      value: stats.staff,
      icon: '👥',
      color: '#2196F3',
      bgColor: '#E3F2FD',
      path: '/staff'
    },
    {
      id: 2,
      title: 'Beds',
      value: stats.beds,
      icon: '🛏️',
      color: '#FF9800',
      bgColor: '#FFF3E0',
      path: '/beds'
    },
    {
      id: 3,
      title: 'Patients',
      value: stats.patients,
      icon: '🏥',
      color: '#4CAF50',
      bgColor: '#E8F5E9',
      path: '/patients'
    },
    {
      id: 4,
      title: 'Laboratory',
      value: stats.laboratory,
      icon: '🔬',
      color: '#F44336',
      bgColor: '#FFEBEE',
      path: '/laboratory'
    },
    {
      id: 5,
      title: 'Machinery',
      value: stats.machinery,
      icon: '⚙️',
      color: '#607D8B',
      bgColor: '#ECEFF1',
      path: '/machinery'
    }
  ];

  // Quick actions - THIS WAS MISSING!
  const quickActions = [
    {
      id: 1,
      title: 'Add Staff',
      icon: '👥',
      color: '#2196F3',
      action: () => handleNavigation('/staff')
    },
    {
      id: 2,
      title: 'Manage Beds',
      icon: '🛏️',
      color: '#FF9800',
      action: () => handleNavigation('/beds')
    },
    {
      id: 3,
      title: 'New Patient',
      icon: '🏥',
      color: '#4CAF50',
      action: () => handleNavigation('/patients')
    },
    {
      id: 4,
      title: 'Lab Test',
      icon: '🔬',
      color: '#F44336',
      action: () => handleNavigation('/laboratory')
    },
    {
      id: 5,
      title: 'Add Machinery',
      icon: '⚙️',
      color: '#607D8B',
      action: () => handleNavigation('/machinery')
    },
    {
      id: 6,
      title: 'Settings',
      icon: '⚙️',
      color: '#9E9E9E',
      action: () => handleNavigation('/settings')
    }
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Debug: Log the stats right before rendering
  console.log('🎨 Rendering with stats:', stats);

  return (
    <div className="dashboard-container">
      {/* Welcome Header */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, Admin</h1>
          <p className="date">{formatDate()}</p>
        </div>
        <div className="header-actions">
          <div className="profile-mini">
            <span className="profile-avatar">👤</span>
          </div>
        </div>
      </div>

      {/* Statistics Cards - Now showing actual counts */}
      <div className="stats-grid">
        {statCards.map(stat => (
          <div 
            key={stat.id} 
            className="stat-card"
            onClick={() => handleNavigation(stat.path)}
            style={{ cursor: 'pointer' }}
          >
            <div className="stat-icon" style={{ backgroundColor: stat.bgColor, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="dashboard-grid">
        {/* Quick Actions Section */}
        <div className="quick-actions-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="quick-actions-grid">
            {quickActions.map(action => (
              <button
                key={action.id}
                className="quick-action-card"
                onClick={action.action}
              >
                <div className="action-icon" style={{ backgroundColor: `${action.color}20`, color: action.color }}>
                  {action.icon}
                </div>
                <span className="action-title">{action.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="recent-activity-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="activity-list">
            {recentActivities.length > 0 ? (
              recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon" style={{ backgroundColor: `${activity.color}20`, color: activity.color }}>
                    {activity.icon}
                  </div>
                  <div className="activity-content">
                    <p className="activity-title">{activity.title}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-activities">
                <p>No recent activities</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chart Section - You can remove this if not needed */}
      <div className="chart-section">
        <div className="section-header">
          <h2>Weekly Overview</h2>
          <div className="chart-filters">
            <button className="filter-btn active">Week</button>
            <button className="filter-btn">Month</button>
            <button className="filter-btn">Year</button>
          </div>
        </div>
        <div className="chart-placeholder">
          <div className="mock-chart">
            <div className="chart-bar" style={{ height: '60%' }}></div>
            <div className="chart-bar" style={{ height: '80%' }}></div>
            <div className="chart-bar" style={{ height: '45%' }}></div>
            <div className="chart-bar" style={{ height: '70%' }}></div>
            <div className="chart-bar" style={{ height: '55%' }}></div>
            <div className="chart-bar" style={{ height: '90%' }}></div>
            <div className="chart-bar" style={{ height: '65%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;