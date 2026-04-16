// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import './Dashboard.css';

// // // ✅ Use port 8002 to match your patients API
// // const API_URL = 'http://localhost:8002';

// // // Simple event bus for component communication
// // const EventBus = {
// //   events: {},
// //   subscribe(event, callback) {
// //     if (!this.events[event]) {
// //       this.events[event] = [];
// //     }
// //     this.events[event].push(callback);
// //     return () => {
// //       this.events[event] = this.events[event].filter(cb => cb !== callback);
// //     };
// //   },
// //   emit(event, data) {
// //     if (this.events[event]) {
// //       this.events[event].forEach(callback => callback(data));
// //     }
// //   }
// // };

// // // Make EventBus globally available so other components can access it
// // window.EventBus = EventBus;

// // const Dashboard = () => {
// //   const navigate = useNavigate();
// //   const [currentTime, setCurrentTime] = useState(new Date());
// //   const [stats, setStats] = useState({
// //     staff: 0,
// //     beds: 0,
// //     Doctor: 0,
// //     Information: 0
// //   });
// //   const [loading, setLoading] = useState(true);
// //   const [recentActivities, setRecentActivities] = useState([]);

// //   // Format date
// //   const formatDate = () => {
// //     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// //     return currentTime.toLocaleDateString('en-US', options);
// //   };

// //   // Format time ago
// //   const timeAgo = (timestamp) => {
// //     if (!timestamp) return 'recently';
    
// //     const now = new Date();
// //     const past = new Date(timestamp);
// //     const seconds = Math.floor((now - past) / 1000);
    
// //     if (seconds < 60) return `${seconds} seconds ago`;
// //     if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
// //     if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
// //     return `${Math.floor(seconds / 86400)} days ago`;
// //   };

// //   // Helper function to extract count from API response
// //   const extractCount = (responseData) => {
// //     if (!responseData) return 0;
    
// //     console.log('🔍 Extracting count from:', responseData);
    
// //     // If it's a number
// //     if (typeof responseData === 'number') return responseData;
    
// //     // If it has count property
// //     if (responseData.count !== undefined) return responseData.count;
    
// //     // If it has total property
// //     if (responseData.total !== undefined) return responseData.total;
    
// //     // If it has data array
// //     if (responseData.data && Array.isArray(responseData.data)) return responseData.data.length;
    
// //     // If it has patients array (for Doctor)
// //     if (responseData.patients && Array.isArray(responseData.patients)) return responseData.patients.length;
    
// //     // If it has groupedByTest (for Doctor)
// //     if (responseData.groupedByTest) {
// //       const grouped = responseData.groupedByTest;
// //       return (
// //         (grouped["2D-Echocardiogram"]?.length || 0) +
// //         (grouped["Electrocardiogram"]?.length || 0) +
// //         (grouped["Treadmill Test"]?.length || 0)
// //       );
// //     }
    
// //     // If it's an array itself
// //     if (Array.isArray(responseData)) return responseData.length;
    
// //     // If it has length property
// //     if (responseData.length !== undefined) return responseData.length;
    
// //     return 0;
// //   };

// //   // Fetch all stats from backend
// //   const fetchAllStats = async () => {
// //     try {
// //       setLoading(true);
// //       console.log('📊 Fetching dashboard stats from:', API_URL);
      
// //       // Parallel API calls for better performance
// //       const [
// //         staffRes,
// //         bedsRes,
// //         labRes,
// //         InformationRes
// //       ] = await Promise.allSettled([
// //         fetch(`${API_URL}/api/staff`),
// //         fetch(`${API_URL}/api/beds`),
// //         fetch(`${API_URL}/api/Doctor`),
// //         fetch(`${API_URL}/api/Information`)
// //       ]);

// //       // Process staff data
// //       let staffCount = 0;
// //       let staffData = [];
// //       if (staffRes.status === 'fulfilled' && staffRes.value.ok) {
// //         const data = await staffRes.value.json();
// //         console.log('📥 Staff API response:', data);
// //         staffCount = extractCount(data);
// //         staffData = data.data || (Array.isArray(data) ? data : []);
// //         console.log('👤 Staff count extracted:', staffCount);
// //       } else {
// //         console.warn('Failed to fetch staff data');
// //       }

// //       // Process beds data
// //       let bedsCount = 0;
// //       let bedsData = [];
// //       if (bedsRes.status === 'fulfilled' && bedsRes.value.ok) {
// //         const data = await bedsRes.value.json();
// //         console.log('📥 Beds API response:', data);
// //         bedsCount = extractCount(data);
// //         bedsData = data.data || (Array.isArray(data) ? data : []);
// //         console.log('🛏️ Beds count extracted:', bedsCount);
// //       } else {
// //         console.warn('Failed to fetch beds data');
// //       }

// //       // Process Doctor data
// //       let labCount = 0;
// //       let labData = [];
// //       if (labRes.status === 'fulfilled' && labRes.value.ok) {
// //         const data = await labRes.value.json();
// //         console.log('📥 Doctor API response:', data);
// //         labCount = extractCount(data);
        
// //         // Extract lab data based on structure
// //         if (data.data) {
// //           labData = data.data;
// //         } else if (data.groupedByTest) {
// //           labData = [
// //             ...(data.groupedByTest["2D-Echocardiogram"] || []),
// //             ...(data.groupedByTest["Electrocardiogram"] || []),
// //             ...(data.groupedByTest["Treadmill Test"] || [])
// //           ];
// //         } else if (Array.isArray(data)) {
// //           labData = data;
// //         } else if (data.patients) {
// //           labData = data.patients;
// //         }
        
// //         console.log('🔬 Lab count extracted:', labCount);
// //       } else {
// //         console.warn('Failed to fetch Doctor data');
// //       }

// //       // Process Information data
// //       let InformationCount = 0;
// //       let InformationData = [];
// //       if (InformationRes.status === 'fulfilled' && InformationRes.value.ok) {
// //         const data = await InformationRes.value.json();
// //         console.log('📥 Information API response:', data);
// //         InformationCount = extractCount(data);
// //         InformationData = data.data || (Array.isArray(data) ? data : []);
// //         console.log('⚙️ Information count extracted:', InformationCount);
// //       } else {
// //         console.warn('Failed to fetch Information data');
// //       }

// //       // Update stats with actual counts
// //       const newStats = {
// //         staff: staffCount,
// //         beds: bedsCount,
// //         Doctor: labCount,
// //         Information: InformationCount
// //       };

// //       console.log('📊 Final stats object:', newStats);
// //       setStats(newStats);

// //       // Generate recent activities from real data
// //       if (staffData.length > 0 || bedsData.length > 0 || labData.length > 0 || InformationData.length > 0) {
// //         generateRecentActivities({
// //           staff: staffData,
// //           beds: bedsData,
// //           Doctor: labData,
// //           Information: InformationData
// //         });
// //       } else {
// //         generateMockActivities();
// //       }

// //     } catch (error) {
// //       console.error('❌ Error fetching stats:', error);
// //       // Fallback to mock data if APIs fail
// //       const mockStats = {
// //         staff: 24,
// //         beds: 45,
// //         Doctor: 89,
// //         Information: 15
// //       };
// //       console.log('📊 Using mock stats:', mockStats);
// //       setStats(mockStats);
// //       generateMockActivities();
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Generate recent activities from real data
// //   const generateRecentActivities = (data) => {
// //     const activities = [];

// //     // Add recent lab tests
// //     if (data.Doctor && data.Doctor.length > 0) {
// //       data.Doctor.slice(-3).reverse().forEach(test => {
// //         const testId = test._id || test.id;
// //         const updatedAt = test.updatedAt || test.createdAt;
// //         const patientName = test.patientName || test.patient || 'patient';
        
// //         if (test.status === 'Completed') {
// //           activities.push({
// //             id: `lab-${testId || Date.now()}-${Math.random()}`,
// //             type: 'lab',
// //             title: `Lab test completed for ${patientName}`,
// //             time: timeAgo(updatedAt),
// //             icon: '👨‍⚕️',
// //             color: '#7c3aed',
// //             timestamp: updatedAt ? new Date(updatedAt).getTime() : Date.now()
// //           });
// //         } else {
// //           activities.push({
// //             id: `lab-${testId || Date.now()}-${Math.random()}`,
// //             type: 'lab',
// //             title: `New lab test requested for ${patientName}`,
// //             time: timeAgo(test.createdAt),
// //             icon: '👨‍⚕️',
// //             color: '#7c3aed',
// //             timestamp: test.createdAt ? new Date(test.createdAt).getTime() : Date.now()
// //           });
// //         }
// //       });
// //     }

// //     // Add recent Information updates
// //     if (data.Information && data.Information.length > 0) {
// //       data.Information.slice(-3).reverse().forEach(machine => {
// //         const machineId = machine._id || machine.id;
// //         const machineName = machine.name || 'Equipment';
// //         const updatedAt = machine.updatedAt || machine.createdAt;
        
// //         if (machine.status === 'Under Maintenance') {
// //           activities.push({
// //             id: `mac-${machineId || Date.now()}-${Math.random()}`,
// //             type: 'Information',
// //             title: `${machineName} is under maintenance`,
// //             time: timeAgo(updatedAt),
// //             icon: '💻',
// //             color: '#64748b',
// //             timestamp: updatedAt ? new Date(updatedAt).getTime() : Date.now()
// //           });
// //         } else if (machine.lastService) {
// //           activities.push({
// //             id: `mac-${machineId || Date.now()}-${Math.random()}`,
// //             type: 'Information',
// //             title: `${machineName} service completed`,
// //             time: timeAgo(machine.lastService),
// //             icon: '💻',
// //             color: '#64748b',
// //             timestamp: new Date(machine.lastService).getTime()
// //           });
// //         }
// //       });
// //     }

// //     // Add recent bed updates
// //     if (data.beds && data.beds.length > 0) {
// //       data.beds.slice(-3).reverse().forEach(bed => {
// //         const bedId = bed._id || bed.id;
// //         const bedNumber = bed.bedNumber || bed.bedId || bed.bed_number;
// //         const updatedAt = bed.updatedAt || bed.createdAt;
        
// //         if (bed.status === 'Occupied') {
// //           activities.push({
// //             id: `bed-${bedId || Date.now()}-${Math.random()}`,
// //             type: 'bed',
// //             title: `Bed ${bedNumber} occupied`,
// //             time: timeAgo(updatedAt),
// //             icon: '🛏️',
// //             color: '#ff9800',
// //             timestamp: updatedAt ? new Date(updatedAt).getTime() : Date.now()
// //           });
// //         } else if (bed.status === 'Available') {
// //           activities.push({
// //             id: `bed-${bedId || Date.now()}-${Math.random()}`,
// //             type: 'bed',
// //             title: `Bed ${bedNumber} is now available`,
// //             time: timeAgo(updatedAt),
// //             icon: '🛏️',
// //             color: '#ff9800',
// //             timestamp: updatedAt ? new Date(updatedAt).getTime() : Date.now()
// //           });
// //         }
// //       });
// //     }

// //     // Add recent staff updates
// //     if (data.staff && data.staff.length > 0) {
// //       data.staff.slice(-3).reverse().forEach(member => {
// //         const memberId = member._id || member.id;
// //         const memberName = member.name || 'Unknown';
// //         const createdAt = member.createdAt || member.joinDate;
        
// //         activities.push({
// //           id: `stf-${memberId || Date.now()}-${Math.random()}`,
// //           type: 'staff',
// //           title: `New staff member joined: ${memberName}`,
// //           time: timeAgo(createdAt),
// //           icon: '👤',
// //           color: '#9c27b0',
// //           timestamp: createdAt ? new Date(createdAt).getTime() : Date.now()
// //         });
// //       });
// //     }

// //     // Sort by timestamp (newest first) and take top 8
// //     const sortedActivities = activities
// //       .sort((a, b) => b.timestamp - a.timestamp)
// //       .slice(0, 8);

// //     if (sortedActivities.length > 0) {
// //       setRecentActivities(sortedActivities);
// //     } else {
// //       generateMockActivities();
// //     }
// //   };

// //   // Generate mock activities as fallback
// //   const generateMockActivities = () => {
// //     const mockActivities = [
// //       {
// //         id: 1,
// //         type: 'lab',
// //         title: 'Lab test completed for patient #2345',
// //         time: '25 minutes ago',
// //         icon: '👨‍⚕️',
// //         color: '#7c3aed',
// //         timestamp: Date.now() - 25 * 60 * 1000
// //       },
// //       {
// //         id: 2,
// //         type: 'Information',
// //         title: 'X-Ray Machine service completed',
// //         time: '1 hour ago',
// //         icon: '💻',
// //         color: '#64748b',
// //         timestamp: Date.now() - 60 * 60 * 1000
// //       },
// //       {
// //         id: 3,
// //         type: 'bed',
// //         title: 'Patient admitted to Bed B12',
// //         time: '2 hours ago',
// //         icon: '🛏️',
// //         color: '#ff9800',
// //         timestamp: Date.now() - 2 * 60 * 60 * 1000
// //       },
// //       {
// //         id: 4,
// //         type: 'staff',
// //         title: 'New staff member joined: Priya Singh',
// //         time: '3 hours ago',
// //         icon: '👤',
// //         color: '#9c27b0',
// //         timestamp: Date.now() - 3 * 60 * 60 * 1000
// //       }
// //     ];
// //     setRecentActivities(mockActivities);
// //   };

// //   // Listen for data changes
// //   useEffect(() => {
// //     // Initial fetch
// //     fetchAllStats();
    
// //     // Listen for data changes from other components
// //     const handleDataChange = () => {
// //       console.log('🔄 Data changed, refreshing dashboard...');
// //       fetchAllStats();
// //     };

// //     // Subscribe to global events
// //     if (window.EventBus) {
// //       window.EventBus.subscribe('staffDataChanged', handleDataChange);
// //       window.EventBus.subscribe('DoctorDataChanged', handleDataChange);
// //       window.EventBus.subscribe('bedsDataChanged', handleDataChange);
// //       window.EventBus.subscribe('InformationDataChanged', handleDataChange);
// //     }

// //     // Auto-refresh every 30 seconds as backup
// //     const refreshInterval = setInterval(() => {
// //       console.log('🔄 Auto-refreshing dashboard...');
// //       fetchAllStats();
// //     }, 30000);

// //     // Update time every minute
// //     const timeTimer = setInterval(() => {
// //       setCurrentTime(new Date());
// //     }, 60000);

// //     // Cleanup
// //     return () => {
// //       clearInterval(refreshInterval);
// //       clearInterval(timeTimer);
// //     };
// //   }, []);

// //   // Navigation handlers
// //   const handleNavigation = (path) => {
// //     navigate(path);
// //   };

// //   // Handle summary card click
// //   const handleStatCardClick = (title) => {
// //     switch(title) {
// //       case 'Doctor':
// //         navigate('/Doctor');
// //         break;
// //       case 'Information':
// //         navigate('/Information');
// //         break;
// //       case 'Staff':
// //         navigate('/staff');
// //         break;
// //       case 'Beds':
// //         navigate('/beds');
// //         break;
// //       default:
// //         break;
// //     }
// //   };

// //   // Handle logout
// //   const handleLogout = () => {
// //     // Clear any auth tokens/session data here
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('user');
// //     navigate('/login');
// //   };

// //   // Stat cards data - 4 cards
// //   const statCards = [
// //     {
// //       id: 1,
// //       title: 'Staff',
// //       value: stats.staff,
// //       icon: '👤',
// //       color: '#2196F3',
// //       bgColor: '#E3F2FD',
// //     },
// //     {
// //       id: 2,
// //       title: 'Beds',
// //       value: stats.beds,
// //       icon: '🛏️',
// //       color: '#FF9800',
// //       bgColor: '#FFF3E0',
// //     },
// //     {
// //       id: 3,
// //       title: 'Doctor',
// //       value: stats.Doctor,
// //       icon: '👨‍⚕️',
// //       color: '#7c3aed',
// //       bgColor: '#ede9fe',
// //     },
// //     {
// //       id: 4,
// //       title: 'Information',
// //       value: stats.Information,
// //       icon: '💻',
// //       color: '#64748b',
// //       bgColor: '#f1f5f9',
// //     }
// //   ];

// //   // Quick actions
// //   const quickActions = [
// //     {
// //       id: 1,
// //       title: 'Add Staff',
// //       icon: '👤',
// //       color: '#2196F3',
// //       path: '/staff'
// //     },
// //     {
// //       id: 2,
// //       title: 'Manage Beds',
// //       icon: '🛏️',
// //       color: '#FF9800',
// //       path: '/beds'
// //     },
// //     {
// //       id: 3,
// //       title: 'Doctor',
// //       icon: '👨‍⚕️',
// //       color: '#7c3aed',
// //       path: '/Doctor'
// //     },
// //     {
// //       id: 4,
// //       title: 'Add Information',
// //       icon: '💻',
// //       color: '#64748b',
// //       path: '/Information'
// //     },
// //     {
// //       id: 5,
// //       title: 'Dashboard',
// //       icon: '📊',
// //       color: '#9E9E9E',
// //       path: '/'
// //     }
// //   ];

// //   if (loading) {
// //     return (
// //       <div className="loading-container">
// //         <div className="loading-spinner"></div>
// //         <p>Loading dashboard...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="dashboard-wrapper">
// //       {/* Simple Header with Logout */}
// //       <div className="dashboard-top-bar">
// //         <div className="top-bar-left">
// //           <div className="hospital-name">
// //             <span className="hospital-icon">🏥</span>
// //             <h2>City Hospital - Admin Panel</h2>
// //           </div>
// //         </div>
// //         <div className="top-bar-right">
// //           <div className="admin-profile">
// //             <span className="admin-name">Admin</span>
// //             <div className="profile-icon">👤</div>
// //           </div>
// //           <button className="logout-top-btn" onClick={handleLogout}>
// //             <span className="logout-icon">🚪</span>
// //             <span>Logout</span>
// //           </button>
// //         </div>
// //       </div>

// //       {/* Main Dashboard Content */}
// //       <div className="dashboard-container">
// //         {/* Welcome Header */}
// //         <div className="dashboard-header">
// //           <div className="welcome-section">
// //             <h1>Welcome back, Admin</h1>
// //             <p className="date">{formatDate()}</p>
// //           </div>
// //         </div>

// //         {/* Statistics Cards - 4 cards in a row */}
// //         <div className="stats-row">
// //           {statCards.map(stat => (
// //             <div 
// //               key={stat.id} 
// //               className="stat-card-large"
// //               onClick={() => handleStatCardClick(stat.title)}
// //               style={{ cursor: 'pointer' }}
// //             >
// //               <div className="stat-icon-large" style={{ backgroundColor: stat.bgColor, color: stat.color }}>
// //                 {stat.icon}
// //               </div>
// //               <div className="stat-content-large">
// //                 <h3>{stat.value.toLocaleString()}</h3>
// //                 <p>{stat.title}</p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Quick Actions and Recent Activity */}
// //         <div className="dashboard-grid">
// //           {/* Quick Actions Section */}
// //           <div className="quick-actions-section">
// //             <div className="section-header">
// //               <h2>Quick Actions</h2>
// //             </div>
// //             <div className="quick-actions-grid">
// //               {quickActions.map(action => (
// //                 <button
// //                   key={action.id}
// //                   className="quick-action-card"
// //                   onClick={() => handleNavigation(action.path)}
// //                 >
// //                   <div className="action-icon" style={{ backgroundColor: `${action.color}20`, color: action.color }}>
// //                     {action.icon}
// //                   </div>
// //                   <span className="action-title">{action.title}</span>
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Recent Activity Section */}
// //           <div className="recent-activity-section">
// //             <div className="section-header">
// //               <h2>Recent Activity</h2>
// //               <button className="view-all-btn">View All</button>
// //             </div>
// //             <div className="activity-list">
// //               {recentActivities.length > 0 ? (
// //                 recentActivities.map(activity => (
// //                   <div key={activity.id} className="activity-item">
// //                     <div className="activity-icon" style={{ backgroundColor: `${activity.color}20`, color: activity.color }}>
// //                       {activity.icon}
// //                     </div>
// //                     <div className="activity-content">
// //                       <p className="activity-title">{activity.title}</p>
// //                       <span className="activity-time">{activity.time}</span>
// //                     </div>
// //                   </div>
// //                 ))
// //               ) : (
// //                 <div className="no-activities">
// //                   <p>No recent activities</p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Dashboard.css';

// // ✅ Use port 8005 to match your backend
// const API_URL = 'http://localhost:8005';

// // Simple event bus for component communication
// const EventBus = {
//   events: {},
//   subscribe(event, callback) {
//     if (!this.events[event]) {
//       this.events[event] = [];
//     }
//     this.events[event].push(callback);
//     return () => {
//       this.events[event] = this.events[event].filter(cb => cb !== callback);
//     };
//   },
//   emit(event, data) {
//     console.log(`📢 Event emitted: ${event}`, data);
//     if (this.events[event]) {
//       this.events[event].forEach(callback => callback(data));
//     }
//   }
// };

// // Make EventBus globally available
// window.EventBus = EventBus;

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [stats, setStats] = useState({
//     staff: 0,
//     beds: 0,
//     Doctor: 0,
//     Information: 0
//   });
//   const [loading, setLoading] = useState(true);
//   const [recentActivities, setRecentActivities] = useState([]);
//   const [error, setError] = useState(null);

//   // Format date
//   const formatDate = () => {
//     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//     return currentTime.toLocaleDateString('en-US', options);
//   };

//   // Format time ago
//   const timeAgo = (timestamp) => {
//     if (!timestamp) return 'recently';
    
//     const now = new Date();
//     const past = new Date(timestamp);
//     const seconds = Math.floor((now - past) / 1000);
    
//     if (seconds < 60) return `${seconds} seconds ago`;
//     if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
//     if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
//     return `${Math.floor(seconds / 86400)} days ago`;
//   };

//   // Helper function to extract count from API response
//   const extractCount = (responseData) => {
//     if (!responseData) return 0;
    
//     console.log('🔍 Extracting count from:', responseData);
    
//     // If it's a number
//     if (typeof responseData === 'number') return responseData;
    
//     // If it has count property
//     if (responseData.count !== undefined) return responseData.count;
    
//     // If it has total property
//     if (responseData.total !== undefined) return responseData.total;
    
//     // If it has data array
//     if (responseData.data && Array.isArray(responseData.data)) return responseData.data.length;
    
//     // If it has patients array
//     if (responseData.patients && Array.isArray(responseData.patients)) return responseData.patients.length;
    
//     // If it has groupedByTest
//     if (responseData.groupedByTest) {
//       const grouped = responseData.groupedByTest;
//       return (
//         (grouped["2D-Echocardiogram"]?.length || 0) +
//         (grouped["Electrocardiogram"]?.length || 0) +
//         (grouped["Treadmill Test"]?.length || 0)
//       );
//     }
    
//     // If it's an array itself
//     if (Array.isArray(responseData)) return responseData.length;
    
//     // If it has length property
//     if (responseData.length !== undefined) return responseData.length;
    
//     return 0;
//   };

//   // Fetch all stats from backend
//   const fetchAllStats = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       console.log('📊 Fetching dashboard stats from:', API_URL);
      
//       // Test if server is running
//       try {
//         const testRes = await fetch(`${API_URL}/test`);
//         const testData = await testRes.json();
//         console.log('✅ Server test response:', testData);
//       } catch (e) {
//         console.warn('⚠️ Server test failed:', e.message);
//       }
      
//       // Parallel API calls for better performance
//       const [
//         staffRes,
//         bedsRes,
//         labRes,
//         machineryRes
//       ] = await Promise.allSettled([
//         fetch(`${API_URL}/api/staff`),
//         fetch(`${API_URL}/api/beds`),
//         fetch(`${API_URL}/api/laboratory`),  // ✅ Fixed: /api/Doctor → /api/laboratory
//         fetch(`${API_URL}/api/machinery`)    // ✅ Fixed: /api/Information → /api/machinery
//       ]);

//       // Process staff data
//       let staffCount = 0;
//       let staffData = [];
//       if (staffRes.status === 'fulfilled' && staffRes.value.ok) {
//         const data = await staffRes.value.json();
//         console.log('📥 Staff API response:', data);
//         staffCount = extractCount(data);
//         staffData = data.data || (Array.isArray(data) ? data : []);
//         console.log('👤 Staff count:', staffCount);
//       } else {
//         console.warn('Failed to fetch staff data');
//       }

//       // Process beds data
//       let bedsCount = 0;
//       let bedsData = [];
//       if (bedsRes.status === 'fulfilled' && bedsRes.value.ok) {
//         const data = await bedsRes.value.json();
//         console.log('📥 Beds API response:', data);
//         bedsCount = extractCount(data);
//         bedsData = data.data || (Array.isArray(data) ? data : []);
//         console.log('🛏️ Beds count:', bedsCount);
//       } else {
//         console.warn('Failed to fetch beds data');
//       }

//       // Process laboratory data
//       let labCount = 0;
//       let labData = [];
//       if (labRes.status === 'fulfilled' && labRes.value.ok) {
//         const data = await labRes.value.json();
//         console.log('📥 Laboratory API response:', data);
//         labCount = extractCount(data);
        
//         // Extract lab data based on structure
//         if (data.data) {
//           labData = data.data;
//         } else if (data.groupedByTest) {
//           labData = [
//             ...(data.groupedByTest["2D-Echocardiogram"] || []),
//             ...(data.groupedByTest["Electrocardiogram"] || []),
//             ...(data.groupedByTest["Treadmill Test"] || [])
//           ];
//         } else if (Array.isArray(data)) {
//           labData = data;
//         } else if (data.patients) {
//           labData = data.patients;
//         }
        
//         console.log('🔬 Laboratory count:', labCount);
//       } else {
//         console.warn('Failed to fetch laboratory data');
//       }

//       // Process machinery data
//       let machineryCount = 0;
//       let machineryData = [];
//       if (machineryRes.status === 'fulfilled' && machineryRes.value.ok) {
//         const data = await machineryRes.value.json();
//         console.log('📥 Machinery API response:', data);
//         machineryCount = extractCount(data);
//         machineryData = data.data || (Array.isArray(data) ? data : []);
//         console.log('⚙️ Machinery count:', machineryCount);
//       } else {
//         console.warn('Failed to fetch machinery data');
//       }

//       // Update stats with actual counts
//       const newStats = {
//         staff: staffCount,
//         beds: bedsCount,
//         Doctor: labCount,
//         Information: machineryCount
//       };

//       console.log('📊 Final stats:', newStats);
//       setStats(newStats);

//       // Generate recent activities from real data
//       generateRecentActivities({
//         staff: staffData,
//         beds: bedsData,
//         Doctor: labData,
//         Information: machineryData
//       });

//     } catch (error) {
//       console.error('❌ Error fetching stats:', error);
//       setError('Failed to load dashboard data');
      
//       // Fallback to mock data if APIs fail
//       const mockStats = {
//         staff: 24,
//         beds: 45,
//         Doctor: 89,
//         Information: 15
//       };
//       console.log('📊 Using mock stats:', mockStats);
//       setStats(mockStats);
//       generateMockActivities();
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Generate recent activities from real data
//   const generateRecentActivities = (data) => {
//     const activities = [];

//     // Add recent lab tests
//     if (data.Doctor && data.Doctor.length > 0) {
//       data.Doctor.slice(-3).reverse().forEach(test => {
//         const testId = test._id || test.id;
//         const updatedAt = test.updatedAt || test.createdAt;
//         const patientName = test.patientName || test.patient || 'patient';
        
//         if (test.status === 'Completed') {
//           activities.push({
//             id: `lab-${testId || Date.now()}-${Math.random()}`,
//             type: 'lab',
//             title: `Lab test completed for ${patientName}`,
//             time: timeAgo(updatedAt),
//             icon: '👨‍⚕️',
//             color: '#7c3aed',
//             timestamp: updatedAt ? new Date(updatedAt).getTime() : Date.now()
//           });
//         } else {
//           activities.push({
//             id: `lab-${testId || Date.now()}-${Math.random()}`,
//             type: 'lab',
//             title: `New lab test requested for ${patientName}`,
//             time: timeAgo(test.createdAt),
//             icon: '👨‍⚕️',
//             color: '#7c3aed',
//             timestamp: test.createdAt ? new Date(test.createdAt).getTime() : Date.now()
//           });
//         }
//       });
//     }

//     // Add recent machinery updates
//     if (data.Information && data.Information.length > 0) {
//       data.Information.slice(-3).reverse().forEach(machine => {
//         const machineId = machine._id || machine.id;
//         const machineName = machine.name || machine.machineName || 'Equipment';
//         const updatedAt = machine.updatedAt || machine.createdAt;
        
//         if (machine.status === 'Under Maintenance') {
//           activities.push({
//             id: `mac-${machineId || Date.now()}-${Math.random()}`,
//             type: 'machinery',
//             title: `${machineName} is under maintenance`,
//             time: timeAgo(updatedAt),
//             icon: '💻',
//             color: '#64748b',
//             timestamp: updatedAt ? new Date(updatedAt).getTime() : Date.now()
//           });
//         } else if (machine.lastService) {
//           activities.push({
//             id: `mac-${machineId || Date.now()}-${Math.random()}`,
//             type: 'machinery',
//             title: `${machineName} service completed`,
//             time: timeAgo(machine.lastService),
//             icon: '💻',
//             color: '#64748b',
//             timestamp: new Date(machine.lastService).getTime()
//           });
//         }
//       });
//     }

//     // Add recent bed updates
//     if (data.beds && data.beds.length > 0) {
//       data.beds.slice(-3).reverse().forEach(bed => {
//         const bedId = bed._id || bed.id;
//         const bedNumber = bed.bedNumber || bed.bedId || bed.bed_number;
//         const updatedAt = bed.updatedAt || bed.createdAt;
        
//         if (bed.status === 'Occupied') {
//           activities.push({
//             id: `bed-${bedId || Date.now()}-${Math.random()}`,
//             type: 'bed',
//             title: `Bed ${bedNumber} occupied`,
//             time: timeAgo(updatedAt),
//             icon: '🛏️',
//             color: '#ff9800',
//             timestamp: updatedAt ? new Date(updatedAt).getTime() : Date.now()
//           });
//         } else if (bed.status === 'Available') {
//           activities.push({
//             id: `bed-${bedId || Date.now()}-${Math.random()}`,
//             type: 'bed',
//             title: `Bed ${bedNumber} is now available`,
//             time: timeAgo(updatedAt),
//             icon: '🛏️',
//             color: '#ff9800',
//             timestamp: updatedAt ? new Date(updatedAt).getTime() : Date.now()
//           });
//         }
//       });
//     }

//     // Add recent staff updates
//     if (data.staff && data.staff.length > 0) {
//       data.staff.slice(-3).reverse().forEach(member => {
//         const memberId = member._id || member.id;
//         const memberName = member.name || member.fullName || 'Unknown';
//         const createdAt = member.createdAt || member.joinDate;
        
//         activities.push({
//           id: `stf-${memberId || Date.now()}-${Math.random()}`,
//           type: 'staff',
//           title: `New staff member joined: ${memberName}`,
//           time: timeAgo(createdAt),
//           icon: '👤',
//           color: '#9c27b0',
//           timestamp: createdAt ? new Date(createdAt).getTime() : Date.now()
//         });
//       });
//     }

//     // Sort by timestamp (newest first) and take top 8
//     const sortedActivities = activities
//       .sort((a, b) => b.timestamp - a.timestamp)
//       .slice(0, 8);

//     if (sortedActivities.length > 0) {
//       setRecentActivities(sortedActivities);
//     } else {
//       generateMockActivities();
//     }
//   };

//   // Generate mock activities as fallback
//   const generateMockActivities = () => {
//     const mockActivities = [
//       {
//         id: 1,
//         type: 'lab',
//         title: 'Lab test completed for patient #2345',
//         time: '25 minutes ago',
//         icon: '👨‍⚕️',
//         color: '#7c3aed',
//         timestamp: Date.now() - 25 * 60 * 1000
//       },
//       {
//         id: 2,
//         type: 'machinery',
//         title: 'X-Ray Machine service completed',
//         time: '1 hour ago',
//         icon: '💻',
//         color: '#64748b',
//         timestamp: Date.now() - 60 * 60 * 1000
//       },
//       {
//         id: 3,
//         type: 'bed',
//         title: 'Patient admitted to Bed B12',
//         time: '2 hours ago',
//         icon: '🛏️',
//         color: '#ff9800',
//         timestamp: Date.now() - 2 * 60 * 60 * 1000
//       },
//       {
//         id: 4,
//         type: 'staff',
//         title: 'New staff member joined: Priya Singh',
//         time: '3 hours ago',
//         icon: '👤',
//         color: '#9c27b0',
//         timestamp: Date.now() - 3 * 60 * 60 * 1000
//       }
//     ];
//     setRecentActivities(mockActivities);
//   };

//   // Listen for data changes
//   useEffect(() => {
//     // Initial fetch
//     fetchAllStats();
    
//     // Listen for data changes from other components
//     const handleDataChange = (data) => {
//       console.log('🔄 Data changed, refreshing dashboard...', data);
//       fetchAllStats();
//     };

//     // Subscribe to global events
//     const unsubscribeStaff = window.EventBus?.subscribe('staffDataChanged', handleDataChange);
//     const unsubscribeLab = window.EventBus?.subscribe('laboratoryDataChanged', handleDataChange);
//     const unsubscribeBeds = window.EventBus?.subscribe('bedsDataChanged', handleDataChange);
//     const unsubscribeMachinery = window.EventBus?.subscribe('machineryDataChanged', handleDataChange);

//     // Auto-refresh every 30 seconds as backup
//     const refreshInterval = setInterval(() => {
//       console.log('🔄 Auto-refreshing dashboard...');
//       fetchAllStats();
//     }, 30000);

//     // Update time every minute
//     const timeTimer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000);

//     // Cleanup
//     return () => {
//       clearInterval(refreshInterval);
//       clearInterval(timeTimer);
//       if (unsubscribeStaff) unsubscribeStaff();
//       if (unsubscribeLab) unsubscribeLab();
//       if (unsubscribeBeds) unsubscribeBeds();
//       if (unsubscribeMachinery) unsubscribeMachinery();
//     };
//   }, []);

//   // Navigation handlers
//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   // Handle summary card click
//   const handleStatCardClick = (title) => {
//     switch(title) {
//       case 'Doctor':
//         navigate('/laboratory');  // Fixed: /Doctor → /laboratory
//         break;
//       case 'Information':
//         navigate('/machinery');   // Fixed: /Information → /machinery
//         break;
//       case 'Staff':
//         navigate('/staff');
//         break;
//       case 'Beds':
//         navigate('/beds');
//         break;
//       default:
//         break;
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   // Stat cards data - 4 cards
//   const statCards = [
//     {
//       id: 1,
//       title: 'Staff',
//       value: stats.staff,
//       icon: '👤',
//       color: '#2196F3',
//       bgColor: '#E3F2FD',
//     },
//     {
//       id: 2,
//       title: 'Beds',
//       value: stats.beds,
//       icon: '🛏️',
//       color: '#FF9800',
//       bgColor: '#FFF3E0',
//     },
//     {
//       id: 3,
//       title: 'Laboratory',  // Fixed: Doctor → Laboratory
//       value: stats.Doctor,
//       icon: '🔬',
//       color: '#7c3aed',
//       bgColor: '#ede9fe',
//     },
//     {
//       id: 4,
//       title: 'Machinery',   // Fixed: Information → Machinery
//       value: stats.Information,
//       icon: '⚙️',
//       color: '#64748b',
//       bgColor: '#f1f5f9',
//     }
//   ];

//   // Quick actions
//   const quickActions = [
//     {
//       id: 1,
//       title: 'Add Staff',
//       icon: '👤',
//       color: '#2196F3',
//       path: '/staff'
//     },
//     {
//       id: 2,
//       title: 'Manage Beds',
//       icon: '🛏️',
//       color: '#FF9800',
//       path: '/beds'
//     },
//     {
//       id: 3,
//       title: 'Laboratory',
//       icon: '🔬',
//       color: '#7c3aed',
//       path: '/laboratory'
//     },
//     {
//       id: 4,
//       title: 'Machinery',
//       icon: '⚙️',
//       color: '#64748b',
//       path: '/machinery'
//     },
//     {
//       id: 5,
//       title: 'Dashboard',
//       icon: '📊',
//       color: '#9E9E9E',
//       path: '/'
//     }
//   ];

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//         <p>Loading dashboard...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="error-container">
//         <div className="error-icon">⚠️</div>
//         <h3>Error Loading Dashboard</h3>
//         <p>{error}</p>
//         <button onClick={fetchAllStats} className="retry-btn">
//           🔄 Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-wrapper">
//       {/* Simple Header with Logout */}
//       <div className="dashboard-top-bar">
//         <div className="top-bar-left">
//           <div className="hospital-name">
//             <span className="hospital-icon">🏥</span>
//             <h2>City Hospital - Admin Panel</h2>
//           </div>
//         </div>
//         <div className="top-bar-right">
//           <div className="admin-profile">
//             <span className="admin-name">Admin</span>
//             <div className="profile-icon">👤</div>
//           </div>
//           <button className="logout-top-btn" onClick={handleLogout}>
//             <span className="logout-icon">🚪</span>
//             <span>Logout</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Dashboard Content */}
//       <div className="dashboard-container">
//         {/* Welcome Header */}
//         <div className="dashboard-header">
//           <div className="welcome-section">
//             <h1>Welcome back, Admin</h1>
//             <p className="date">{formatDate()}</p>
//           </div>
//         </div>

//         {/* Statistics Cards - 4 cards in a row */}
//         <div className="stats-row">
//           {statCards.map(stat => (
//             <div 
//               key={stat.id} 
//               className="stat-card-large"
//               onClick={() => handleStatCardClick(stat.title)}
//               style={{ cursor: 'pointer' }}
//             >
//               <div className="stat-icon-large" style={{ backgroundColor: stat.bgColor, color: stat.color }}>
//                 {stat.icon}
//               </div>
//               <div className="stat-content-large">
//                 <h3>{stat.value.toLocaleString()}</h3>
//                 <p>{stat.title}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Quick Actions and Recent Activity */}
//         <div className="dashboard-grid">
//           {/* Quick Actions Section */}
//           <div className="quick-actions-section">
//             <div className="section-header">
//               <h2>Quick Actions</h2>
//             </div>
//             <div className="quick-actions-grid">
//               {quickActions.map(action => (
//                 <button
//                   key={action.id}
//                   className="quick-action-card"
//                   onClick={() => handleNavigation(action.path)}
//                 >
//                   <div className="action-icon" style={{ backgroundColor: `${action.color}20`, color: action.color }}>
//                     {action.icon}
//                   </div>
//                   <span className="action-title">{action.title}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Recent Activity Section */}
//           <div className="recent-activity-section">
//             <div className="section-header">
//               <h2>Recent Activity</h2>
//               <button className="view-all-btn">View All</button>
//             </div>
//             <div className="activity-list">
//               {recentActivities.length > 0 ? (
//                 recentActivities.map(activity => (
//                   <div key={activity.id} className="activity-item">
//                     <div className="activity-icon" style={{ backgroundColor: `${activity.color}20`, color: activity.color }}>
//                       {activity.icon}
//                     </div>
//                     <div className="activity-content">
//                       <p className="activity-title">{activity.title}</p>
//                       <span className="activity-time">{activity.time}</span>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="no-activities">
//                   <p>No recent activities</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// ✅ Use port 8005 to match your backend
const API_URL = 'http://localhost:8005';

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
    console.log(`📢 Event emitted: ${event}`, data);
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
};

// Make EventBus globally available
window.EventBus = EventBus;

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState({
    staff: 0,
    beds: 0,
    Doctor: 0
    // Information hata diya
  });
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);
  const [error, setError] = useState(null);

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
    
    // If it has patients array
    if (responseData.patients && Array.isArray(responseData.patients)) return responseData.patients.length;
    
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
      setError(null);
      console.log('📊 Fetching dashboard stats from:', API_URL);
      
      // Test if server is running
      try {
        const testRes = await fetch(`${API_URL}/test`);
        const testData = await testRes.json();
        console.log('✅ Server test response:', testData);
      } catch (e) {
        console.warn('⚠️ Server test failed:', e.message);
      }
      
      // Parallel API calls for better performance
      const [
        staffRes,
        bedsRes,
        doctorsRes
      ] = await Promise.allSettled([
        fetch(`${API_URL}/api/staff`),
        fetch(`${API_URL}/api/beds`),
        fetch(`${API_URL}/api/doctors`)  // ✅ Doctors API
      ]);

      // Process staff data
      let staffCount = 0;
      let staffData = [];
      if (staffRes.status === 'fulfilled' && staffRes.value.ok) {
        const data = await staffRes.value.json();
        console.log('📥 Staff API response:', data);
        staffCount = extractCount(data);
        staffData = data.data || (Array.isArray(data) ? data : []);
        console.log('👤 Staff count:', staffCount);
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
        console.log('🛏️ Beds count:', bedsCount);
      } else {
        console.warn('Failed to fetch beds data');
      }

      // Process doctors data
      let doctorsCount = 0;
      let doctorsData = [];
      if (doctorsRes.status === 'fulfilled' && doctorsRes.value.ok) {
        const data = await doctorsRes.value.json();
        console.log('📥 Doctors API response:', data);
        doctorsCount = extractCount(data);
        doctorsData = data.data || (Array.isArray(data) ? data : []);
        console.log('👨‍⚕️ Doctors count:', doctorsCount);
      } else {
        console.warn('Failed to fetch doctors data');
      }

      // Update stats with actual counts - only 3 stats
      const newStats = {
        staff: staffCount,
        beds: bedsCount,
        Doctor: doctorsCount
      };

      console.log('📊 Final stats:', newStats);
      setStats(newStats);

      // Generate recent activities from real data
      generateRecentActivities({
        staff: staffData,
        beds: bedsData,
        Doctor: doctorsData
      });

    } catch (error) {
      console.error('❌ Error fetching stats:', error);
      setError('Failed to load dashboard data');
      
      // Fallback to mock data if APIs fail - only 3 stats
      const mockStats = {
        staff: 24,
        beds: 45,
        Doctor: 12
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

    // Add recent doctor updates
    if (data.Doctor && data.Doctor.length > 0) {
      data.Doctor.slice(-3).reverse().forEach(doctor => {
        const doctorId = doctor._id || doctor.id;
        const doctorName = doctor.name || doctor.fullName || 'Doctor';
        const createdAt = doctor.createdAt || doctor.joinDate;
        
        activities.push({
          id: `doc-${doctorId || Date.now()}-${Math.random()}`,
          type: 'doctor',
          title: `New doctor joined: ${doctorName}`,
          time: timeAgo(createdAt),
          icon: '👨‍⚕️',
          color: '#7c3aed',
          timestamp: createdAt ? new Date(createdAt).getTime() : Date.now()
        });
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
            color: '#ff9800',
            timestamp: updatedAt ? new Date(updatedAt).getTime() : Date.now()
          });
        } else if (bed.status === 'Available') {
          activities.push({
            id: `bed-${bedId || Date.now()}-${Math.random()}`,
            type: 'bed',
            title: `Bed ${bedNumber} is now available`,
            time: timeAgo(updatedAt),
            icon: '🛏️',
            color: '#ff9800',
            timestamp: updatedAt ? new Date(updatedAt).getTime() : Date.now()
          });
        }
      });
    }

    // Add recent staff updates
    if (data.staff && data.staff.length > 0) {
      data.staff.slice(-3).reverse().forEach(member => {
        const memberId = member._id || member.id;
        const memberName = member.name || member.fullName || 'Unknown';
        const createdAt = member.createdAt || member.joinDate;
        
        activities.push({
          id: `stf-${memberId || Date.now()}-${Math.random()}`,
          type: 'staff',
          title: `New staff member joined: ${memberName}`,
          time: timeAgo(createdAt),
          icon: '👤',
          color: '#9c27b0',
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
        type: 'doctor',
        title: 'Dr. Pranjal Patil joined Cardiology',
        time: '25 minutes ago',
        icon: '👨‍⚕️',
        color: '#7c3aed',
        timestamp: Date.now() - 25 * 60 * 1000
      },
      {
        id: 2,
        type: 'bed',
        title: 'Bed B12 occupied',
        time: '1 hour ago',
        icon: '🛏️',
        color: '#ff9800',
        timestamp: Date.now() - 60 * 60 * 1000
      },
      {
        id: 3,
        type: 'staff',
        title: 'New staff member joined: Priya Singh',
        time: '2 hours ago',
        icon: '👤',
        color: '#9c27b0',
        timestamp: Date.now() - 2 * 60 * 60 * 1000
      }
    ];
    setRecentActivities(mockActivities);
  };

  // Listen for data changes
  useEffect(() => {
    // Initial fetch
    fetchAllStats();
    
    // Listen for data changes from other components
    const handleDataChange = (data) => {
      console.log('🔄 Data changed, refreshing dashboard...', data);
      fetchAllStats();
    };

    // Subscribe to global events
    const unsubscribeStaff = window.EventBus?.subscribe('staffDataChanged', handleDataChange);
    const unsubscribeBeds = window.EventBus?.subscribe('bedsDataChanged', handleDataChange);
    const unsubscribeDoctors = window.EventBus?.subscribe('doctorsDataChanged', handleDataChange);

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
      if (unsubscribeStaff) unsubscribeStaff();
      if (unsubscribeBeds) unsubscribeBeds();
      if (unsubscribeDoctors) unsubscribeDoctors();
    };
  }, []);

  // Navigation handlers
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Handle summary card click
  const handleStatCardClick = (title) => {
    switch(title) {
      case 'Doctor':
        navigate('/doctors');  // Doctors page
        break;
      case 'Staff':
        navigate('/staff');
        break;
      case 'Beds':
        navigate('/beds');
        break;
      default:
        break;
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Stat cards data - 3 cards only
  const statCards = [
    {
      id: 1,
      title: 'Staff',
      value: stats.staff,
      icon: '👤',
      color: '#2196F3',
      bgColor: '#E3F2FD',
    },
    {
      id: 2,
      title: 'Beds',
      value: stats.beds,
      icon: '🛏️',
      color: '#FF9800',
      bgColor: '#FFF3E0',
    },
    {
      id: 3,
      title: 'Doctor',
      value: stats.Doctor,
      icon: '👨‍⚕️',
      color: '#7c3aed',
      bgColor: '#ede9fe',
    }
  ];

  // Quick actions - 3 actions only
  const quickActions = [
    {
      id: 1,
      title: 'Staff Management',
      icon: '👤',
      color: '#2196F3',
      path: '/staff'
    },
    {
      id: 2,
      title: 'Bed Management',
      icon: '🛏️',
      color: '#FF9800',
      path: '/beds'
    },
    {
      id: 3,
      title: 'Doctor Management',
      icon: '👨‍⚕️',
      color: '#7c3aed',
      path: '/doctors'
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

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>Error Loading Dashboard</h3>
        <p>{error}</p>
        <button onClick={fetchAllStats} className="retry-btn">
          🔄 Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      {/* Simple Header with Logout */}
      <div className="dashboard-top-bar">
        <div className="top-bar-left">
          <div className="hospital-name">
            {/* <span className="hospital-icon">🏥</span> */}
            <h2>Omkar Clinic - Admin Panel</h2>
          </div>
        </div>
        <div className="top-bar-right">
          {/* <div className="admin-profile">
            <span className="admin-name">Admin</span>
            <div className="profile-icon">👤</div>
          </div> */}
          {/* <button className="logout-top-btn" onClick={handleLogout}>
            <span className="logout-icon">🚪</span>
            <span>Logout</span>
          </button> */}
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="dashboard-container">
        {/* Welcome Header */}
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>Welcome back, Admin</h1>
            <p className="date" style={{color:"white"}}>{formatDate()}</p>
          </div>
        </div>

        {/* Statistics Cards - 3 cards in a row */}
        <div className="stats-row-three">
          {statCards.map(stat => (
            <div 
              key={stat.id} 
              className="stat-card-large"
              onClick={() => handleStatCardClick(stat.title)}
              style={{ cursor: 'pointer' }}
            >
              <div className="stat-icon-large" style={{ backgroundColor: stat.bgColor, color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content-large">
                <h3>{stat.value.toLocaleString()}</h3>
                <p>{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions and Recent Activity */}
        <div className="dashboard-grid">
          {/* Quick Actions Section - Now with 3 actions */}
          <div className="quick-actions-section">
            <div className="section-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="quick-actions-grid-three">
              {quickActions.map(action => (
                <button
                  key={action.id}
                  className="quick-action-card"
                  onClick={() => handleNavigation(action.path)}
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
      </div>
    </div>
  );
};

export default Dashboard;