// import React, { useState } from 'react';
// import { emailTracker } from './EmailService';
// import './FailedEmailsSection.css';

// const FailedEmailsSection = ({ failedEmails, onClose, onRefresh }) => {
//   const [retryingEmail, setRetryingEmail] = useState(null);
//   const [selectedEmail, setSelectedEmail] = useState(null);
//   const [filter, setFilter] = useState('all'); // all, recent, old

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

//   // Handle retry email
//   const handleRetryEmail = async (emailId) => {
//     setRetryingEmail(emailId);
//     const success = await emailTracker.retryEmail(emailId);
//     if (success) {
//       alert('✅ Email retry initiated successfully!');
//     } else {
//       alert('❌ Email retry failed. Please try again later.');
//     }
//     onRefresh();
//     setRetryingEmail(null);
//     setSelectedEmail(null);
//   };

//   // Handle remove email
//   const handleRemoveEmail = (emailId) => {
//     if (window.confirm('Remove this failed email from the list?')) {
//       emailTracker.removeFailedEmail(emailId);
//       onRefresh();
//     }
//   };

//   // Handle clear all
//   const handleClearAll = () => {
//     if (window.confirm('Clear all failed emails?')) {
//       emailTracker.clearFailedEmails();
//       onRefresh();
//     }
//   };

//   // Filter emails
//   const getFilteredEmails = () => {
//     if (filter === 'all') return failedEmails;
//     if (filter === 'recent') {
//       const oneDayAgo = new Date();
//       oneDayAgo.setDate(oneDayAgo.getDate() - 1);
//       return failedEmails.filter(email => new Date(email.timestamp) > oneDayAgo);
//     }
//     if (filter === 'old') {
//       const oneDayAgo = new Date();
//       oneDayAgo.setDate(oneDayAgo.getDate() - 1);
//       return failedEmails.filter(email => new Date(email.timestamp) <= oneDayAgo);
//     }
//     return failedEmails;
//   };

//   const filteredEmails = getFilteredEmails();

//   return (
//     <div className="failed-emails-overlay">
//       <div className="failed-emails-container">
//         <div className="failed-emails-header">
//           <div className="header-title">
//             <span className="header-icon">📧</span>
//             <h2>Failed Email Notifications</h2>
//             <span className="email-count-badge">{failedEmails.length}</span>
//           </div>
//           <button className="close-btn" onClick={onClose}>✕</button>
//         </div>

//         {/* Filter Tabs */}
//         <div className="email-filter-tabs">
//           <button 
//             className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
//             onClick={() => setFilter('all')}
//           >
//             All ({failedEmails.length})
//           </button>
//           <button 
//             className={`filter-tab ${filter === 'recent' ? 'active' : ''}`}
//             onClick={() => setFilter('recent')}
//           >
//             Recent (24h)
//           </button>
//           <button 
//             className={`filter-tab ${filter === 'old' ? 'active' : ''}`}
//             onClick={() => setFilter('old')}
//           >
//             Older
//           </button>
//         </div>

//         {/* Action Buttons */}
//         {failedEmails.length > 0 && (
//           <div className="email-bulk-actions">
//             <button className="clear-all-btn" onClick={handleClearAll}>
//               🗑️ Clear All
//             </button>
//           </div>
//         )}

//         {/* Failed Emails List */}
//         <div className="failed-emails-list">
//           {filteredEmails.length > 0 ? (
//             filteredEmails.map(email => (
//               <div key={email.id} className="failed-email-item">
//                 <div className="failed-email-header">
//                   <div className="email-status-icon">❌</div>
//                   <div className="email-main-info">
//                     <div className="email-recipient">
//                       <strong>To:</strong> {email.email}
//                       {email.recipientName !== 'Unknown' && (
//                         <span className="recipient-name"> ({email.recipientName})</span>
//                       )}
//                     </div>
//                     <div className="email-subject">
//                       <strong>Subject:</strong> {email.subject}
//                     </div>
//                   </div>
//                   <div className="email-time">
//                     {timeAgo(email.timestamp)}
//                   </div>
//                 </div>

//                 <div className="failed-email-details">
//                   <div className="email-error">
//                     <strong>Error:</strong> {email.error}
//                   </div>
//                   {email.retryCount > 0 && (
//                     <div className="email-retry-info">
//                       <span className="retry-count">Retries: {email.retryCount}</span>
//                       {email.lastRetry && (
//                         <span className="last-retry">Last: {timeAgo(email.lastRetry)}</span>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 <div className="email-actions">
//                   <button 
//                     className="retry-btn"
//                     onClick={() => handleRetryEmail(email.id)}
//                     disabled={retryingEmail === email.id}
//                   >
//                     {retryingEmail === email.id ? '⏳ Retrying...' : '🔄 Retry'}
//                   </button>
//                   <button 
//                     className="view-btn"
//                     onClick={() => setSelectedEmail(selectedEmail === email.id ? null : email.id)}
//                   >
//                     {selectedEmail === email.id ? '▼ Hide Details' : '▶ View Details'}
//                   </button>
//                   <button 
//                     className="remove-btn"
//                     onClick={() => handleRemoveEmail(email.id)}
//                   >
//                     ✕ Remove
//                   </button>
//                 </div>

//                 {/* Form Data Details */}
//                 {selectedEmail === email.id && email.formData && Object.keys(email.formData).length > 0 && (
//                   <div className="email-form-details">
//                     <h4>Form Data:</h4>
//                     <div className="form-data-grid">
//                       {Object.entries(email.formData).map(([key, value]) => (
//                         <div key={key} className="form-data-item">
//                           <span className="form-data-label">{key}:</span>
//                           <span className="form-data-value">
//                             {value ? (typeof value === 'object' ? JSON.stringify(value) : String(value)) : '-'}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <div className="no-emails">
//               <div className="no-emails-icon">✅</div>
//               <h3>No Failed Emails</h3>
//               <p>All emails have been sent successfully</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FailedEmailsSection;

import React, { useState } from 'react';
import { emailTracker } from './EmailService';
import './FailedEmailsSection.css';

const FailedEmailsSection = ({ failedEmails, onClose, onRefresh }) => {
  const [retryingEmail, setRetryingEmail] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filter, setFilter] = useState('all');

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

  const handleRetryEmail = async (emailId) => {
    setRetryingEmail(emailId);
    const success = await emailTracker.retryEmail(emailId);
    if (success) {
      alert('✅ Email retry initiated successfully!');
    } else {
      alert('❌ Email retry failed. Please try again later.');
    }
    onRefresh();
    setRetryingEmail(null);
    setSelectedEmail(null);
  };

  const handleRemoveEmail = (emailId) => {
    if (window.confirm('Remove this failed email from the list?')) {
      emailTracker.removeFailedEmail(emailId);
      onRefresh();
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all failed emails?')) {
      emailTracker.clearFailedEmails();
      onRefresh();
    }
  };

  const getFilteredEmails = () => {
    if (filter === 'all') return failedEmails;
    if (filter === 'recent') {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      return failedEmails.filter(email => new Date(email.timestamp) > oneDayAgo);
    }
    if (filter === 'old') {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      return failedEmails.filter(email => new Date(email.timestamp) <= oneDayAgo);
    }
    return failedEmails;
  };

  const filteredEmails = getFilteredEmails();

  return (
    <div className="failed-emails-overlay">
      <div className="failed-emails-container">
        <div className="failed-emails-header">
          <div className="header-title">
            <span className="header-icon">📧</span>
            <h2>Failed Email Notifications</h2>
            <span className="email-count-badge">{failedEmails.length}</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {/* 🔥 REFRESH BUTTON - MANUALLY REFRESH KARNE KE LIYE */}
            <button 
              className="refresh-btn" 
              onClick={onRefresh}
              style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Refresh"
            >
              🔄
            </button>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="email-filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({failedEmails.length})
          </button>
          <button 
            className={`filter-tab ${filter === 'recent' ? 'active' : ''}`}
            onClick={() => setFilter('recent')}
          >
            Recent (24h)
          </button>
          <button 
            className={`filter-tab ${filter === 'old' ? 'active' : ''}`}
            onClick={() => setFilter('old')}
          >
            Older
          </button>
        </div>

        {failedEmails.length > 0 && (
          <div className="email-bulk-actions">
            <button className="clear-all-btn" onClick={handleClearAll}>
              🗑️ Clear All
            </button>
          </div>
        )}

        <div className="failed-emails-list">
          {filteredEmails.length > 0 ? (
            filteredEmails.map(email => (
              <div key={email.id} className="failed-email-item">
                <div className="failed-email-header">
                  <div className="email-status-icon">❌</div>
                  <div className="email-main-info">
                    <div className="email-recipient">
                      <strong>To:</strong> {email.email}
                      {email.recipientName !== 'Unknown' && (
                        <span className="recipient-name"> ({email.recipientName})</span>
                      )}
                    </div>
                    <div className="email-subject">
                      <strong>Subject:</strong> {email.subject}
                    </div>
                  </div>
                  <div className="email-time">
                    {timeAgo(email.timestamp)}
                  </div>
                </div>

                <div className="failed-email-details">
                  <div className="email-error">
                    <strong>Error:</strong> {email.error}
                  </div>
                  {email.retryCount > 0 && (
                    <div className="email-retry-info">
                      <span className="retry-count">Retries: {email.retryCount}</span>
                      {email.lastRetry && (
                        <span className="last-retry">Last: {timeAgo(email.lastRetry)}</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="email-actions">
                  <button 
                    className="retry-btn"
                    onClick={() => handleRetryEmail(email.id)}
                    disabled={retryingEmail === email.id}
                  >
                    {retryingEmail === email.id ? '⏳ Retrying...' : '🔄 Retry'}
                  </button>
                  <button 
                    className="view-btn"
                    onClick={() => setSelectedEmail(selectedEmail === email.id ? null : email.id)}
                  >
                    {selectedEmail === email.id ? '▼ Hide Details' : '▶ View Details'}
                  </button>
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveEmail(email.id)}
                  >
                    ✕ Remove
                  </button>
                </div>

                {selectedEmail === email.id && email.formData && Object.keys(email.formData).length > 0 && (
                  <div className="email-form-details">
                    <h4>Form Data:</h4>
                    <div className="form-data-grid">
                      {Object.entries(email.formData).map(([key, value]) => (
                        <div key={key} className="form-data-item">
                          <span className="form-data-label">{key}:</span>
                          <span className="form-data-value">
                            {value ? String(value) : '-'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-emails">
              <div className="no-emails-icon">✅</div>
              <h3>No Failed Emails</h3>
              <p>All emails have been sent successfully</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FailedEmailsSection;