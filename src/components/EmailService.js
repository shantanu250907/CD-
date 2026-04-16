// // EmailService.js - Email tracking service

// // Simple event bus for email notifications
// const EmailEventBus = {
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
//     console.log(`📧 Email Event emitted: ${event}`, data);
//     if (this.events[event]) {
//       this.events[event].forEach(callback => callback(data));
//     }
//   }
// };

// // Store failed emails in localStorage for persistence
// const STORAGE_KEY = 'failed_emails';

// // Email tracking service
// class EmailTracker {
//   constructor() {
//     this.failedEmails = this.loadFromStorage();
//     this.sentEmails = [];
//   }

//   // Load failed emails from localStorage
//   loadFromStorage() {
//     try {
//       const stored = localStorage.getItem(STORAGE_KEY);
//       return stored ? JSON.parse(stored) : [];
//     } catch (error) {
//       console.error('Error loading failed emails:', error);
//       return [];
//     }
//   }

//   // Save failed emails to localStorage
//   saveToStorage() {
//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(this.failedEmails));
//     } catch (error) {
//       console.error('Error saving failed emails:', error);
//     }
//   }

//   // Track failed email
//   addFailedEmail(emailData) {
//     const failedEmail = {
//       id: `fail-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//       email: emailData.email,
//       recipientName: emailData.recipientName || 'Unknown',
//       subject: emailData.subject || 'No Subject',
//       error: emailData.error || 'Unknown error',
//       timestamp: new Date().toISOString(),
//       retryCount: 0,
//       status: 'failed',
//       formData: emailData.formData || {}
//     };

//     this.failedEmails.unshift(failedEmail); // Add to beginning
//     // Keep only last 50 failed emails
//     if (this.failedEmails.length > 50) {
//       this.failedEmails = this.failedEmails.slice(0, 50);
//     }
    
//     this.saveToStorage();
//     EmailEventBus.emit('emailFailed', failedEmail);
//     return failedEmail;
//   }

//   // Track successful email
//   addSentEmail(emailData) {
//     const sentEmail = {
//       id: `sent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//       email: emailData.email,
//       recipientName: emailData.recipientName || 'Unknown',
//       subject: emailData.subject || 'No Subject',
//       timestamp: new Date().toISOString(),
//       status: 'sent'
//     };

//     this.sentEmails.unshift(sentEmail);
//     // Keep only last 100 sent emails
//     if (this.sentEmails.length > 100) {
//       this.sentEmails = this.sentEmails.slice(0, 100);
//     }
    
//     EmailEventBus.emit('emailSent', sentEmail);
//     return sentEmail;
//   }

//   // Get all failed emails
//   getFailedEmails() {
//     return this.failedEmails;
//   }

//   // Get all sent emails
//   getSentEmails() {
//     return this.sentEmails;
//   }

//   // Retry failed email
//   async retryEmail(failedEmailId) {
//     const failedEmail = this.failedEmails.find(e => e.id === failedEmailId);
//     if (!failedEmail) return false;

//     try {
//       // Update retry count
//       failedEmail.retryCount += 1;
//       failedEmail.lastRetry = new Date().toISOString();

//       // Here you would implement the actual retry logic
//       // For now, we'll simulate a retry
//       console.log('🔄 Retrying email:', failedEmail);

//       // Simulate email sending
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       // If successful, remove from failed and add to sent
//       if (Math.random() > 0.3) { // 70% success rate for demo
//         this.failedEmails = this.failedEmails.filter(e => e.id !== failedEmailId);
//         this.addSentEmail({
//           email: failedEmail.email,
//           recipientName: failedEmail.recipientName,
//           subject: failedEmail.subject
//         });
//         this.saveToStorage();
//         EmailEventBus.emit('emailRetrySuccess', failedEmail);
//         return true;
//       } else {
//         // Update failed record
//         failedEmail.error = 'Retry failed - temporary issue';
//         this.saveToStorage();
//         EmailEventBus.emit('emailRetryFailed', failedEmail);
//         return false;
//       }
//     } catch (error) {
//       console.error('Error retrying email:', error);
//       failedEmail.error = error.message;
//       this.saveToStorage();
//       return false;
//     }
//   }

//   // Clear all failed emails
//   clearFailedEmails() {
//     this.failedEmails = [];
//     this.saveToStorage();
//     EmailEventBus.emit('emailsCleared');
//   }

//   // Remove specific failed email
//   removeFailedEmail(emailId) {
//     this.failedEmails = this.failedEmails.filter(e => e.id !== emailId);
//     this.saveToStorage();
//     EmailEventBus.emit('emailRemoved', emailId);
//   }

//   // Get statistics
//   getStats() {
//     return {
//       totalFailed: this.failedEmails.length,
//       totalSent: this.sentEmails.length,
//       failedByDomain: this.getFailedByDomain(),
//       recentFailures: this.failedEmails.slice(0, 5)
//     };
//   }

//   // Get failures grouped by email domain
//   getFailedByDomain() {
//     const domains = {};
//     this.failedEmails.forEach(email => {
//       const domain = email.email.split('@')[1] || 'unknown';
//       domains[domain] = (domains[domain] || 0) + 1;
//     });
//     return domains;
//   }
// }

// // Create singleton instance
// const emailTracker = new EmailTracker();

// // Make it globally available
// window.EmailTracker = emailTracker;
// window.EmailEventBus = EmailEventBus;

// export { emailTracker, EmailEventBus };

// EmailService.js - Email tracking service

// Simple event bus for email notifications
const EmailEventBus = {
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
    console.log(`📧 Email Event emitted: ${event}`, data);
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
};

// Store failed emails in localStorage for persistence
const STORAGE_KEY = 'failed_emails';

// Email tracking service
class EmailTracker {
  constructor() {
    this.failedEmails = this.loadFromStorage();
    this.sentEmails = [];
  }

  // Load failed emails from localStorage
  loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading failed emails:', error);
      return [];
    }
  }

  // Save failed emails to localStorage
  saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.failedEmails));
    } catch (error) {
      console.error('Error saving failed emails:', error);
    }
  }

  // Track failed email
  addFailedEmail(emailData) {
    const failedEmail = {
      id: `fail-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      email: emailData.email,
      recipientName: emailData.recipientName || 'Unknown',
      subject: emailData.subject || 'No Subject',
      error: emailData.error || 'Unknown error',
      timestamp: new Date().toISOString(),
      retryCount: 0,
      status: 'failed',
      formData: emailData.formData || {}
    };

    this.failedEmails.unshift(failedEmail); // Add to beginning
    // Keep only last 50 failed emails
    if (this.failedEmails.length > 50) {
      this.failedEmails = this.failedEmails.slice(0, 50);
    }
    
    this.saveToStorage();
    EmailEventBus.emit('emailFailed', failedEmail);
    return failedEmail;
  }

  // Track successful email
  addSentEmail(emailData) {
    const sentEmail = {
      id: `sent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      email: emailData.email,
      recipientName: emailData.recipientName || 'Unknown',
      subject: emailData.subject || 'No Subject',
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    this.sentEmails.unshift(sentEmail);
    // Keep only last 100 sent emails
    if (this.sentEmails.length > 100) {
      this.sentEmails = this.sentEmails.slice(0, 100);
    }
    
    EmailEventBus.emit('emailSent', sentEmail);
    return sentEmail;
  }

  // Get all failed emails
  getFailedEmails() {
    return this.failedEmails;
  }

  // Get all sent emails
  getSentEmails() {
    return this.sentEmails;
  }

  // Retry failed email
  async retryEmail(failedEmailId) {
    const failedEmail = this.failedEmails.find(e => e.id === failedEmailId);
    if (!failedEmail) return false;

    try {
      // Update retry count
      failedEmail.retryCount += 1;
      failedEmail.lastRetry = new Date().toISOString();

      // Here you would implement the actual retry logic
      // For now, we'll simulate a retry
      console.log('🔄 Retrying email:', failedEmail);

      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1000));

      // If successful, remove from failed and add to sent
      if (Math.random() > 0.3) { // 70% success rate for demo
        this.failedEmails = this.failedEmails.filter(e => e.id !== failedEmailId);
        this.addSentEmail({
          email: failedEmail.email,
          recipientName: failedEmail.recipientName,
          subject: failedEmail.subject
        });
        this.saveToStorage();
        EmailEventBus.emit('emailRetrySuccess', failedEmail);
        return true;
      } else {
        // Update failed record
        failedEmail.error = 'Retry failed - temporary issue';
        this.saveToStorage();
        EmailEventBus.emit('emailRetryFailed', failedEmail);
        return false;
      }
    } catch (error) {
      console.error('Error retrying email:', error);
      failedEmail.error = error.message;
      this.saveToStorage();
      return false;
    }
  }

  // Clear all failed emails
  clearFailedEmails() {
    this.failedEmails = [];
    this.saveToStorage();
    EmailEventBus.emit('emailsCleared');
  }

  // Remove specific failed email
  removeFailedEmail(emailId) {
    this.failedEmails = this.failedEmails.filter(e => e.id !== emailId);
    this.saveToStorage();
    EmailEventBus.emit('emailRemoved', emailId);
  }

  // Get statistics
  getStats() {
    return {
      totalFailed: this.failedEmails.length,
      totalSent: this.sentEmails.length,
      failedByDomain: this.getFailedByDomain(),
      recentFailures: this.failedEmails.slice(0, 5)
    };
  }

  // Get failures grouped by email domain
  getFailedByDomain() {
    const domains = {};
    this.failedEmails.forEach(email => {
      const domain = email.email.split('@')[1] || 'unknown';
      domains[domain] = (domains[domain] || 0) + 1;
    });
    return domains;
  }
}

// Create singleton instance
const emailTracker = new EmailTracker();

// Make it globally available
window.EmailTracker = emailTracker;
window.EmailEventBus = EmailEventBus;

export { emailTracker, EmailEventBus };