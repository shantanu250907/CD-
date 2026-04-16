
// // import React, { useState, useEffect } from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// // import './App.css';

// // // ==================== CONTEXT ====================
// // import { BedProvider } from './pages/BedContext';

// // // ==================== COMPONENTS ====================
// // import Sidebar from './components/Sidebar';
// // import Header from './components/Header';

// // // ==================== PAGES ====================
// // import Dashboard from './pages/Dashboard';
// // import Doctors from './pages/Doctors';
// // import Staff from './pages/Staff';
// // import Beds from './pages/AddBedForm';
// // import Patients from './pages/Patients';
// // import Laboratory from './pages/Laboratory';
// // import Machinery from './pages/Machinery';
// // import Settings from './pages/Settings';
// // import Login from './pages/Login';

// // // ==================== CONSTANTS ====================
// // const MENU_ITEMS = [
// //   { id: 1, name: 'Dashboard', icon: '📊', path: '/' },
// //   { id: 2, name: 'Doctors', icon: '👨‍⚕️', path: '/doctors' },
// //   { id: 3, name: 'Staff', icon: '👥', path: '/staff' },
// //   { id: 4, name: 'Beds', icon: '🛏️', path: '/beds' },
// //   // { id: 5, name: 'Patients', icon: '👤', path: '/patients' },
  
// //   { id: 8, name: 'Information', icon: '⚙️', path: '/settings' }
// // ];

// // const VALID_PATHS = ['/', '/doctors', '/staff', '/beds', '/patients', '/laboratory', '/machinery', '/settings'];

// // // ==================== LOADING COMPONENT ====================
// // const LoadingSpinner = () => (
// //   <div style={{ 
// //     display: 'flex', 
// //     justifyContent: 'center', 
// //     alignItems: 'center', 
// //     height: '100vh',
// //     flexDirection: 'column',
// //     gap: '20px'
// //   }}>
// //     <div className="loading-spinner"></div>
// //     <p>Loading application...</p>
// //   </div>
// // );

// // // ==================== AUTHENTICATED APP CONTENT ====================
// // function AuthenticatedApp({ handleLogout, sidebarOpen, setSidebarOpen }) {
// //   const navigate = useNavigate();

// //   // Redirect to dashboard if invalid path
// //   useEffect(() => {
// //     const currentPath = window.location.pathname;
// //     if (!VALID_PATHS.includes(currentPath)) {
// //       navigate('/');
// //     }
// //   }, [navigate]);

// //   return (
// //     <div className="app">
// //       <Sidebar
// //         menuItems={MENU_ITEMS}
// //         sidebarOpen={sidebarOpen}
// //         setSidebarOpen={setSidebarOpen}
// //         onLogout={handleLogout}
// //       />

// //       <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
// //         <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

// //         <div className="content-area">
// //           <Routes>
// //             <Route path="/" element={<Dashboard />} />
// //             <Route path="/doctors" element={<Doctors />} />
// //             <Route path="/staff" element={<Staff />} />
// //             <Route path="/beds" element={<Beds />} />
// //             <Route path="/patients" element={<Patients />} />
// //             <Route path="/laboratory" element={<Laboratory />} />
// //             <Route path="/machinery" element={<Machinery />} />
// //             <Route path="/settings" element={<Settings />} />
// //             <Route path="*" element={<Navigate to="/" />} />
// //           </Routes>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ==================== MAIN APP COMPONENT ====================
// // function App() {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [sidebarOpen, setSidebarOpen] = useState(true);

// //   // Check authentication on mount
// //   useEffect(() => {
// //     checkAuth();
// //   }, []);

// //   // Check authentication status
// //   const checkAuth = () => {
// //     const token = localStorage.getItem('token');
// //     const user = localStorage.getItem('user');
    
// //     setIsAuthenticated(!!(token && user));
// //     setLoading(false);
// //   };

// //   // Handle login
// //   const handleLogin = (token, user) => {
// //     localStorage.setItem('token', token);
// //     localStorage.setItem('user', JSON.stringify(user));
// //     setIsAuthenticated(true);
// //   };

// //   // Handle logout
// //   const handleLogout = () => {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('user');
// //     setIsAuthenticated(false);
// //   };

// //   // Show loading spinner while checking auth
// //   if (loading) {
// //     return <LoadingSpinner />;
// //   }

// //   // Show login page if not authenticated
// //   if (!isAuthenticated) {
// //     return (
// //       <Router>
// //         <Routes>
// //           <Route path="*" element={<Login onLogin={handleLogin} />} />
// //         </Routes>
// //       </Router>
// //     );
// //   }

// //   // Show main app with BedProvider if authenticated
// //   return (
// //     <Router>
// //       <BedProvider>
// //         <AuthenticatedApp 
// //           handleLogout={handleLogout}
// //           sidebarOpen={sidebarOpen}
// //           setSidebarOpen={setSidebarOpen}
// //         />
// //       </BedProvider>
// //     </Router>
// //   );
// // }

// // export default App;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// import './App.css';

// // ==================== CONTEXT ====================
// import { BedProvider } from './pages/BedContext';

// // ==================== EMAIL SERVICE ====================
// import { emailTracker, EmailEventBus } from './components/EmailService';
// import FailedEmailsSection from './components/FailedEmailsSection';

// // ==================== COMPONENTS ====================
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';

// // ==================== PAGES ====================
// import Dashboard from './pages/Dashboard';
// import Doctors from './pages/Doctors';
// import Staff from './pages/Staff';
// import Beds from './pages/AddBedForm';
// import Patients from './pages/Patients';
// import Laboratory from './pages/Laboratory';
// import Machinery from './pages/Machinery';
// import Settings from './pages/Settings';
// import Login from './pages/Login';

// // ==================== CONSTANTS ====================
// const MENU_ITEMS = [
//   { id: 1, name: 'Dashboard', icon: '📊', path: '/' },
//   { id: 2, name: 'Doctors', icon: '👨‍⚕️', path: '/doctors' },
//   { id: 3, name: 'Staff', icon: '👥', path: '/staff' },
//   { id: 4, name: 'Beds', icon: '🛏️', path: '/beds' },
//   // { id: 5, name: 'Patients', icon: '👤', path: '/patients' },
//   { id: 8, name: 'Information', icon: '⚙️', path: '/settings' }
// ];

// const VALID_PATHS = ['/', '/doctors', '/staff', '/beds', '/patients', '/laboratory', '/machinery', '/settings'];

// // ==================== LOADING COMPONENT ====================
// const LoadingSpinner = () => (
//   <div style={{ 
//     display: 'flex', 
//     justifyContent: 'center', 
//     alignItems: 'center', 
//     height: '100vh',
//     flexDirection: 'column',
//     gap: '20px'
//   }}>
//     <div className="loading-spinner"></div>
//     <p>Loading application...</p>
//   </div>
// );

// // ==================== AUTHENTICATED APP CONTENT ====================
// function AuthenticatedApp({ handleLogout, sidebarOpen, setSidebarOpen }) {
//   const navigate = useNavigate();
//   const [failedEmailCount, setFailedEmailCount] = useState(0);
//   const [showEmailSection, setShowEmailSection] = useState(false);
//   const [failedEmails, setFailedEmails] = useState([]);

//   // Load failed emails
//   const loadFailedEmails = () => {
//     const emails = emailTracker.getFailedEmails();
//     setFailedEmails(emails);
//     setFailedEmailCount(emails.length);
//   };

//   // Handle email click
//   const handleEmailClick = () => {
//     setShowEmailSection(!showEmailSection);
//     if (!showEmailSection) {
//       loadFailedEmails(); // Refresh when opening
//     }
//   };

//   // Handle close email section
//   const handleCloseEmailSection = () => {
//     setShowEmailSection(false);
//   };

//   // Listen for email events
//   useEffect(() => {
//     loadFailedEmails();

//     const handleEmailChange = () => {
//       loadFailedEmails();
//     };

//     // Subscribe to email events
//     EmailEventBus.subscribe('emailFailed', handleEmailChange);
//     EmailEventBus.subscribe('emailRetrySuccess', handleEmailChange);
//     EmailEventBus.subscribe('emailRemoved', handleEmailChange);
//     EmailEventBus.subscribe('emailsCleared', handleEmailChange);

//     return () => {
//       // Cleanup
//       EmailEventBus.events = {};
//     };
//   }, []);

//   // Redirect to dashboard if invalid path
//   useEffect(() => {
//     const currentPath = window.location.pathname;
//     if (!VALID_PATHS.includes(currentPath)) {
//       navigate('/');
//     }
//   }, [navigate]);

//   return (
//     <div className="app">
//       <Sidebar
//         menuItems={MENU_ITEMS}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         onLogout={handleLogout}
//         onEmailClick={handleEmailClick}
//         failedEmailCount={failedEmailCount}
//         showEmailSection={showEmailSection}
//       />

//       <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
//         <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

//         {/* Email Section Popup */}
//         {showEmailSection && (
//           <FailedEmailsSection 
//             failedEmails={failedEmails}
//             onClose={handleCloseEmailSection}
//             onRefresh={loadFailedEmails}
//           />
//         )}

//         <div className={`content-area ${showEmailSection ? 'content-blurred' : ''}`}>
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/doctors" element={<Doctors />} />
//             <Route path="/staff" element={<Staff />} />
//             <Route path="/beds" element={<Beds />} />
//             <Route path="/patients" element={<Patients />} />
//             <Route path="/laboratory" element={<Laboratory />} />
//             <Route path="/machinery" element={<Machinery />} />
//             <Route path="/settings" element={<Settings />} />
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ==================== MAIN APP COMPONENT ====================
// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // Check authentication on mount
//   useEffect(() => {
//     checkAuth();
//   }, []);

//   // Check authentication status
//   const checkAuth = () => {
//     const token = localStorage.getItem('token');
//     const user = localStorage.getItem('user');
    
//     setIsAuthenticated(!!(token && user));
//     setLoading(false);
//   };

//   // Handle login
//   const handleLogin = (token, user) => {
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(user));
//     setIsAuthenticated(true);
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setIsAuthenticated(false);
//   };

//   // Show loading spinner while checking auth
//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   // Show login page if not authenticated
//   if (!isAuthenticated) {
//     return (
//       <Router>
//         <Routes>
//           <Route path="*" element={<Login onLogin={handleLogin} />} />
//         </Routes>
//       </Router>
//     );
//   }

//   // Show main app with BedProvider if authenticated
//   return (
//     <Router>
//       <BedProvider>
//         <AuthenticatedApp 
//           handleLogout={handleLogout}
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//         />
//       </BedProvider>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

// ==================== CONTEXT ====================
import { BedProvider } from './pages/BedContext';

// ==================== EMAIL SERVICE ====================
import { emailTracker, EmailEventBus } from './components/EmailService';
import FailedEmailsSection from './components/FailedEmailsSection';

// ==================== COMPONENTS ====================
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// ==================== PAGES ====================
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import Staff from './pages/Staff';
import Beds from './pages/AddBedForm';
import Patients from './pages/Patients';
import Laboratory from './pages/Laboratory';
import Machinery from './pages/Machinery';
import Settings from './pages/Settings';
import Login from './pages/Login';

// ==================== CONSTANTS ====================
const MENU_ITEMS = [
  { id: 1, name: 'Dashboard', icon: '📊', path: '/' },
  { id: 2, name: 'Doctors', icon: '👨‍⚕️', path: '/doctors' },
  { id: 3, name: 'Staff', icon: '👥', path: '/staff' },
  { id: 4, name: 'Beds', icon: '🛏️', path: '/beds' },
  { id: 8, name: 'Information', icon: '⚙️', path: '/settings' }
];

const VALID_PATHS = ['/', '/doctors', '/staff', '/beds', '/patients', '/laboratory', '/machinery', '/settings'];

// ==================== LOADING COMPONENT ====================
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    flexDirection: 'column',
    gap: '20px'
  }}>
    <div className="loading-spinner"></div>
    <p>Loading application...</p>
  </div>
);

// ==================== AUTHENTICATED APP CONTENT ====================
function AuthenticatedApp({ handleLogout, sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const [failedEmailCount, setFailedEmailCount] = useState(0);
  const [showEmailSection, setShowEmailSection] = useState(false);
  const [failedEmails, setFailedEmails] = useState([]);

  // Load failed emails
  const loadFailedEmails = () => {
    const emails = emailTracker.getFailedEmails();
    setFailedEmails(emails);
    setFailedEmailCount(emails.length);
  };

  // Handle email click
  const handleEmailClick = () => {
    setShowEmailSection(!showEmailSection);
    if (!showEmailSection) {
      loadFailedEmails();
    }
  };

  // Handle close email section
  const handleCloseEmailSection = () => {
    setShowEmailSection(false);
  };

  // 🔥 LISTEN FOR EMAIL EVENTS FROM OTHER APPS
  useEffect(() => {
    // Initial load
    loadFailedEmails();

    // Handle email change from internal events
    const handleEmailChange = () => {
      console.log('📧 Email change detected');
      loadFailedEmails();
    };

    // 🔥 Handle cross-app email failed events (CustomEvent)
    const handleCrossAppEmailFailed = (event) => {
      console.log('📧 Cross-app email failed event received:', event.detail);
      loadFailedEmails();
    };

    // 🔥 Handle BroadcastChannel messages
    const setupBroadcastChannel = () => {
      if (window.BroadcastChannel) {
        try {
          const channel = new BroadcastChannel('omkar_clinic_emails');
          channel.onmessage = (event) => {
            if (event.data.type === 'EMAIL_FAILED') {
              console.log('📧 BroadcastChannel: Email failed received', event.data.data);
              loadFailedEmails();
            }
          };
          return channel;
        } catch (e) {
          console.log('BroadcastChannel setup error:', e);
        }
      }
      return null;
    };

    // 🔥 Listen for storage events (when localStorage changes in other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'failed_emails') {
        console.log('📧 localStorage changed:', e.newValue);
        loadFailedEmails();
      }
    };

    // Subscribe to internal email events
    EmailEventBus.subscribe('emailFailed', handleEmailChange);
    EmailEventBus.subscribe('emailRetrySuccess', handleEmailChange);
    EmailEventBus.subscribe('emailRemoved', handleEmailChange);
    EmailEventBus.subscribe('emailsCleared', handleEmailChange);

    // Subscribe to cross-app events
    window.addEventListener('emailFailed', handleCrossAppEmailFailed);
    window.addEventListener('storage', handleStorageChange);

    // Setup BroadcastChannel
    const channel = setupBroadcastChannel();

    // Also check every 2 seconds as fallback
    const interval = setInterval(() => {
      const currentEmails = emailTracker.getFailedEmails();
      if (JSON.stringify(currentEmails) !== JSON.stringify(failedEmails)) {
        console.log('📧 Interval check: emails changed');
        loadFailedEmails();
      }
    }, 2000);

    return () => {
      // Cleanup
      EmailEventBus.events = {};
      window.removeEventListener('emailFailed', handleCrossAppEmailFailed);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
      if (channel) channel.close();
    };
  }, [failedEmails]);

  // Redirect to dashboard if invalid path
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (!VALID_PATHS.includes(currentPath)) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="app">
      <Sidebar
        menuItems={MENU_ITEMS}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={handleLogout}
        onEmailClick={handleEmailClick}
        failedEmailCount={failedEmailCount}
        showEmailSection={showEmailSection}
      />

      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Email Section Popup */}
        {showEmailSection && (
          <FailedEmailsSection 
            failedEmails={failedEmails}
            onClose={handleCloseEmailSection}
            onRefresh={loadFailedEmails}
          />
        )}

        <div className={`content-area ${showEmailSection ? 'content-blurred' : ''}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/beds" element={<Beds />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/laboratory" element={<Laboratory />} />
            <Route path="/machinery" element={<Machinery />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN APP COMPONENT ====================
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Check authentication status
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    setIsAuthenticated(!!(token && user));
    setLoading(false);
  };

  // Handle login
  const handleLogin = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  // Show loading spinner while checking auth
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Router>
    );
  }

  // Show main app with BedProvider if authenticated
  return (
    <Router>
      <BedProvider>
        <AuthenticatedApp 
          handleLogout={handleLogout}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </BedProvider>
    </Router>
  );
}

export default App;