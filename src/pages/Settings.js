// import React, { useState, useEffect } from 'react';
// import './Settings.css';

// // ✅ FIX: Custom event name for same-window sync
// const PROFILE_UPDATED_EVENT = 'clinicProfileUpdated';

// const Settings = () => {
//   // Default clinic profile with doctor info included
//   const defaultProfile = {
//     // Clinic Information
//     clinicName: 'Omkar Clinic',
//     address: 'Omkar Clinic, Wadibhokar Road, Deopur, Dhule',
//     city: 'Dhule',
//     state: 'Maharashtra',
//     pincode: '424001',
//     phone: '+91 02562 221 234',
//     email: 'info@OmkarClinic.com',
//     website: 'www.OmkarClinic.com',
//     registrationNo: 'MHC/1234/2020',
//     established: '2013',
//     licenseNo: 'MH/CLINIC/2020/1234',
    
//     // Doctor Information (nested object)
//     doctorInfo: {
//       name: 'Dr. Pranjal Patil',
//       specialization: 'Cardiology',
//       department: 'Cardiology',
//       doctorPhone: '9876543210',
//       doctorEmail: 'pranjal.patil@hospital.com',
//       doctorAddress: 'Omkar Clinic, Wadibhokar Road, Deopur, Dhule',
//       experience: '13 years',
//       licenseNumber: 'MH123456789',
//       qualifications: 'MBBS, MD Cardiology',
//       joinDate: '2013-03-15',
//       profilePhoto: null
//     }
//   };

//   // Clinic Profile State
//   const [profileData, setProfileData] = useState(defaultProfile);
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const [saveError, setSaveError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [validationErrors, setValidationErrors] = useState({});

//   // Load data from localStorage on component mount
//   useEffect(() => {
//     loadProfileData();
    
//     // ✅ FIX: Listen for CustomEvent instead of 'storage' event (works in same window)
//     const handleProfileUpdate = () => {
//       loadProfileData();
//     };
    
//     window.addEventListener(PROFILE_UPDATED_EVENT, handleProfileUpdate);
    
//     return () => {
//       window.removeEventListener(PROFILE_UPDATED_EVENT, handleProfileUpdate);
//     };
//   }, []);

//   // Load profile data from localStorage
//   const loadProfileData = () => {
//     try {
//       const savedProfile = localStorage.getItem('clinicProfile');
//       if (savedProfile) {
//         const parsed = JSON.parse(savedProfile);
//         // Ensure doctorInfo exists
//         if (!parsed.doctorInfo) {
//           parsed.doctorInfo = defaultProfile.doctorInfo;
//         }
//         setProfileData(parsed);
//         console.log('✅ Profile loaded from localStorage:', parsed);
//       } else {
//         // If no saved data, save default to localStorage
//         localStorage.setItem('clinicProfile', JSON.stringify(defaultProfile));
//         setProfileData(defaultProfile);
//         console.log('📝 Default profile saved to localStorage');
//       }
//     } catch (error) {
//       console.error('❌ Error loading profile:', error);
//       setProfileData(defaultProfile);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==================== VALIDATION FUNCTIONS ====================
  
//   // Validate clinic name (only letters and spaces)
//   const validateClinicName = (name) => {
//     if (!name || name.trim() === '') return 'Clinic name is required';
//     if (!/^[a-zA-Z\s]+$/.test(name)) return 'Clinic name should contain only letters and spaces';
//     if (name.length < 3) return 'Clinic name must be at least 3 characters';
//     if (name.length > 100) return 'Clinic name must be less than 100 characters';
//     return '';
//   };

//   // Validate city (only letters and spaces)
//   const validateCity = (city) => {
//     if (!city || city.trim() === '') return 'City is required';
//     if (!/^[a-zA-Z\s]+$/.test(city)) return 'City should contain only letters and spaces';
//     if (city.length < 2) return 'City name must be at least 2 characters';
//     return '';
//   };

//   // Validate state (only letters and spaces)
//   const validateState = (state) => {
//     if (!state || state.trim() === '') return 'State is required';
//     if (!/^[a-zA-Z\s]+$/.test(state)) return 'State should contain only letters and spaces';
//     if (state.length < 2) return 'State name must be at least 2 characters';
//     return '';
//   };

//   // Validate pincode (exactly 6 digits) - READ ONLY now
//   const validatePincode = (pincode) => {
//     if (!pincode || pincode.trim() === '') return 'Pincode is required';
//     if (!/^\d{6}$/.test(pincode)) return 'Pincode must be exactly 6 digits';
//     return '';
//   };

//   // Validate phone number (10 digits, starting with 6-9)
//   const validatePhone = (phone) => {
//     if (!phone || phone.trim() === '') return 'Phone number is required';
//     // Remove any non-digit characters for validation
//     const cleanPhone = phone.replace(/\D/g, '');
//     if (cleanPhone.length !== 10) return 'Phone number must be exactly 10 digits';
//     if (!/^[6-9]/.test(cleanPhone)) return 'Phone number must start with 6, 7, 8, or 9';
//     return '';
//   };

//   // Validate email (no numbers, must start with letter, only letters, dots, @, etc.)
//   const validateEmail = (email) => {
//     if (!email || email.trim() === '') return 'Email is required';
//     // Email should start with a letter, no numbers in the local part
//     const emailRegex = /^[a-zA-Z][a-zA-Z._%+-]*@[a-zA-Z][a-zA-Z.-]*\.[a-zA-Z]{2,}$/;
//     if (!emailRegex.test(email)) return 'Email must start with a letter and contain no numbers';
//     // Check if email contains any numbers
//     if (/\d/.test(email)) return 'Email should not contain numbers';
//     return '';
//   };

//   // Validate website (only letters, dots, hyphens, no numbers, no spaces)
//   const validateWebsite = (website) => {
//     if (!website) return ''; // Website is optional
//     // Allow only letters, dots, hyphens, forward slashes - NO NUMBERS
//     if (!/^[a-zA-Z./-]+$/.test(website)) return 'Website should contain only letters, dots, hyphens, and slashes (no numbers)';
//     if (website.includes(' ')) return 'Website should not contain spaces';
//     if (/\d/.test(website)) return 'Website should not contain numbers';
//     return '';
//   };

//   // Validate address (no specific restrictions but required)
//   const validateAddress = (address) => {
//     if (!address || address.trim() === '') return 'Address is required';
//     if (address.length < 5) return 'Address must be at least 5 characters';
//     return '';
//   };

//   // ==================== VALIDATE ALL FIELDS ====================
//   const validateAllFields = () => {
//     const errors = {};
    
//     // Only validate editable fields
//     const clinicNameError = validateClinicName(profileData.clinicName);
//     if (clinicNameError) errors.clinicName = clinicNameError;
    
//     const addressError = validateAddress(profileData.address);
//     if (addressError) errors.address = addressError;
    
//     const cityError = validateCity(profileData.city);
//     if (cityError) errors.city = cityError;
    
//     const stateError = validateState(profileData.state);
//     if (stateError) errors.state = stateError;
    
//     const phoneError = validatePhone(profileData.phone);
//     if (phoneError) errors.phone = phoneError;
    
//     const emailError = validateEmail(profileData.email);
//     if (emailError) errors.email = emailError;
    
//     const websiteError = validateWebsite(profileData.website);
//     if (websiteError) errors.website = websiteError;
    
//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Handle Clinic Profile Changes with real-time validation
//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     let error = '';
    
//     // Apply validation based on field name
//     switch (name) {
//       case 'clinicName':
//         // Allow only letters and spaces
//         const lettersOnly = value.replace(/[^a-zA-Z\s]/g, '');
//         if (value !== lettersOnly) {
//           setProfileData({
//             ...profileData,
//             [name]: lettersOnly
//           });
//           error = validateClinicName(lettersOnly);
//         } else {
//           setProfileData({
//             ...profileData,
//             [name]: value
//           });
//           error = validateClinicName(value);
//         }
//         setValidationErrors({ ...validationErrors, [name]: error });
//         return;
      
//       case 'city':
//         // Allow only letters and spaces
//         const cityLetters = value.replace(/[^a-zA-Z\s]/g, '');
//         if (value !== cityLetters) {
//           setProfileData({
//             ...profileData,
//             [name]: cityLetters
//           });
//           error = validateCity(cityLetters);
//         } else {
//           setProfileData({
//             ...profileData,
//             [name]: value
//           });
//           error = validateCity(value);
//         }
//         setValidationErrors({ ...validationErrors, [name]: error });
//         return;
      
//       case 'state':
//         // Allow only letters and spaces
//         const stateLetters = value.replace(/[^a-zA-Z\s]/g, '');
//         if (value !== stateLetters) {
//           setProfileData({
//             ...profileData,
//             [name]: stateLetters
//           });
//           error = validateState(stateLetters);
//         } else {
//           setProfileData({
//             ...profileData,
//             [name]: value
//           });
//           error = validateState(value);
//         }
//         setValidationErrors({ ...validationErrors, [name]: error });
//         return;
      
//       case 'pincode':
//         // Pincode is READ-ONLY - do not allow changes
//         return;
      
//       case 'phone':
//         // Allow only digits and limit to 10
//         const phoneDigits = value.replace(/\D/g, '').slice(0, 10);
//         if (value !== phoneDigits) {
//           setProfileData({
//             ...profileData,
//             [name]: phoneDigits
//           });
//           error = validatePhone(phoneDigits);
//         } else {
//           setProfileData({
//             ...profileData,
//             [name]: value
//           });
//           error = validatePhone(value);
//         }
//         setValidationErrors({ ...validationErrors, [name]: error });
//         return;
      
//       case 'email':
//         // Allow only letters, dots, @, _, %, +, - and no numbers
//         let emailValue = value;
//         // Remove any numbers
//         emailValue = emailValue.replace(/\d/g, '');
//         // Ensure it starts with a letter
//         if (emailValue && !/^[a-zA-Z]/.test(emailValue)) {
//           emailValue = '';
//         }
//         setProfileData({
//           ...profileData,
//           [name]: emailValue
//         });
//         error = validateEmail(emailValue);
//         setValidationErrors({ ...validationErrors, [name]: error });
//         return;
      
//       case 'website':
//         // Allow only letters, dots, hyphens, forward slashes - NO NUMBERS
//         let websiteValue = value;
//         // Remove any numbers
//         websiteValue = websiteValue.replace(/\d/g, '');
//         // Remove any special characters except ., /, -
//         websiteValue = websiteValue.replace(/[^a-zA-Z./-]/g, '');
//         setProfileData({
//           ...profileData,
//           [name]: websiteValue
//         });
//         error = validateWebsite(websiteValue);
//         setValidationErrors({ ...validationErrors, [name]: error });
//         return;
      
//       default:
//         setProfileData({
//           ...profileData,
//           [name]: value
//         });
//     }
    
//     setValidationErrors({ ...validationErrors, [name]: error });
//     setSaveSuccess(false);
//     setSaveError('');
//   };

//   const handleSaveProfile = () => {
//     // Validate all fields
//     if (!validateAllFields()) {
//       setSaveError('❌ Please fix all validation errors before saving');
//       return;
//     }

//     try {
//       // Validate required fields
//       if (!profileData.clinicName || !profileData.address || !profileData.city || 
//           !profileData.state || !profileData.pincode || !profileData.phone || !profileData.email) {
//         setSaveError('❌ Please fill all required fields');
//         return;
//       }

//       // ✅ FIX: Preserve latest doctorInfo from localStorage so it doesn't get overwritten
//       const savedProfile = localStorage.getItem('clinicProfile');
//       const existingData = savedProfile ? JSON.parse(savedProfile) : {};
//       const mergedData = {
//         ...profileData,
//         doctorInfo: existingData.doctorInfo || profileData.doctorInfo
//       };

//       // Save to localStorage
//       localStorage.setItem('clinicProfile', JSON.stringify(mergedData));
//       setProfileData(mergedData);
      
//       // Show success message
//       setSaveSuccess(true);
//       setSaveError('');
//       setValidationErrors({});
      
//       // Auto-hide success message after 3 seconds
//       setTimeout(() => {
//         setSaveSuccess(false);
//       }, 3000);
      
//       console.log('✅ Clinic profile updated successfully!', mergedData);
      
//       // ✅ FIX: Dispatch CustomEvent so DoctorProfile also re-renders
//       window.dispatchEvent(new CustomEvent(PROFILE_UPDATED_EVENT));
//     } catch (error) {
//       console.error('❌ Error saving profile:', error);
//       setSaveError('Failed to save profile. Please try again.');
//     }
//   };

//   const handleResetProfile = () => {
//     if (window.confirm('Are you sure you want to reset to default settings?')) {
//       setProfileData(defaultProfile);
//       localStorage.setItem('clinicProfile', JSON.stringify(defaultProfile));
//       setSaveSuccess(true);
//       setSaveError('');
//       setValidationErrors({});
//       setTimeout(() => setSaveSuccess(false), 3000);
      
//       // ✅ FIX: Dispatch CustomEvent instead of plain 'storage' event
//       window.dispatchEvent(new CustomEvent(PROFILE_UPDATED_EVENT));
//     }
//   };

//   // Show loading state
//   if (loading) {
//     return <div className="loading">Loading settings...</div>;
//   }

//   return (
//     <div className="settings-page">
//       <h2 className="page-title"> Clinic Information</h2>

//       {/* Success/Error Messages */}
//       {saveSuccess && (
//         <div className="alert alert-success">
//           ✅ Clinic profile updated successfully!
//         </div>
//       )}
      
//       {saveError && (
//         <div className="alert alert-error">
//           {saveError}
//         </div>
//       )}

//       {/* Clinic Profile Card */}
//       <div className="settings-card">
//         {/* <h3> Clinic Information</h3> */}

//         {/* Clinic Info Summary Cards */}
//         <div className="clinic-info-grid">
//           <div className="info-card">
//             <div className="info-icon">📋</div>
//             <h4>Registration No.</h4>
//             <p>{profileData.registrationNo}</p>
//           </div>
//           <div className="info-card">
//             <div className="info-icon">📅</div>
//             <h4>Established</h4>
//             <p>{profileData.established}</p>
//           </div>
//           <div className="info-card">
//             <div className="info-icon">🔑</div>
//             <h4>License No.</h4>
//             <p>{profileData.licenseNo}</p>
//           </div>
//         </div>

//         <div className="settings-form">
//           {/* Basic Information */}
//           <div className="form-row">
//             <div className="form-group">
//               <label className="required">Clinic Name</label>
//               <input
//                 type="text"
//                 name="clinicName"
//                 value={profileData.clinicName || ''}
//                 onChange={handleProfileChange}
//                 placeholder="Enter clinic name (letters only)"
//                 className={validationErrors.clinicName ? 'error-input' : ''}
//               />
//               {validationErrors.clinicName && (
//                 <span className="error-message">{validationErrors.clinicName}</span>
//               )}
//             </div>
//             <div className="form-group">
//               <label>Registration No.</label>
//               <input
//                 type="text"
//                 name="registrationNo"
//                 value={profileData.registrationNo || ''}
//                 disabled
//                 className="disabled-input"
//                 title="Registration number cannot be edited"
//               />
//               {/* <small className="help-text">🔒 This field is read-only</small> */}
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>License No.</label>
//               <input
//                 type="text"
//                 name="licenseNo"
//                 value={profileData.licenseNo || ''}
//                 disabled
//                 className="disabled-input"
//                 title="License number cannot be edited"
//               />
//               {/* <small className="help-text">🔒 This field is read-only</small> */}
//             </div>
//             <div className="form-group">
//               <label>Established Year</label>
//               <input
//                 type="text"
//                 name="established"
//                 value={profileData.established || ''}
//                 disabled
//                 className="disabled-input"
//                 title="Established year cannot be edited"
//               />
//               {/* <small className="help-text">🔒 This field is read-only</small> */}
//             </div>
//           </div>

//           {/* Address Information */}
//           <div className="form-group full-width">
//             <label className="required">Address</label>
//             <input
//               type="text"
//               name="address"
//               value={profileData.address || ''}
//               onChange={handleProfileChange}
//               placeholder="Street address"
//               className={validationErrors.address ? 'error-input' : ''}
//             />
//             {validationErrors.address && (
//               <span className="error-message">{validationErrors.address}</span>
//             )}
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label className="required">City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={profileData.city || ''}
//                 onChange={handleProfileChange}
//                 placeholder="City (letters only)"
//                 className={validationErrors.city ? 'error-input' : ''}
//               />
//               {validationErrors.city && (
//                 <span className="error-message">{validationErrors.city}</span>
//               )}
//             </div>
//             <div className="form-group">
//               <label className="required">State</label>
//               <input
//                 type="text"
//                 name="state"
//                 value={profileData.state || ''}
//                 onChange={handleProfileChange}
//                 placeholder="State (letters only)"
//                 className={validationErrors.state ? 'error-input' : ''}
//               />
//               {validationErrors.state && (
//                 <span className="error-message">{validationErrors.state}</span>
//               )}
//             </div>
//             <div className="form-group">
//               <label className="required">Pincode</label>
//               <input
//                 type="text"
//                 name="pincode"
//                 value={profileData.pincode || ''}
//                 disabled
//                 className="disabled-input"
//                 title="Pincode cannot be edited"
//               />
//               {/* <small className="help-text">🔒 This field is read-only</small> */}
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="form-row">
//             <div className="form-group">
//               <label className="required">Phone</label>
//               <div className="input-with-icon">
//                 <span className="input-icon">📞</span>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={profileData.phone || ''}
//                   onChange={handleProfileChange}
//                   placeholder="10-digit mobile number"
//                   maxLength="10"
//                   className={validationErrors.phone ? 'error-input' : ''}
//                 />
//               </div>
//               {validationErrors.phone && (
//                 <span className="error-message">{validationErrors.phone}</span>
//               )}
//               <small className="help-text">Enter 10-digit number starting with 6,7,8,9</small>
//             </div>
//             <div className="form-group">
//               <label className="required">Email</label>
//               <div className="input-with-icon">
//                 <span className="input-icon">📧</span>
//                 <input
//                   type="email"
//                   name="email"
//                   value={profileData.email || ''}
//                   onChange={handleProfileChange}
//                   placeholder="Email address (no numbers)"
//                   className={validationErrors.email ? 'error-input' : ''}
//                 />
//               </div>
//               {validationErrors.email && (
//                 <span className="error-message">{validationErrors.email}</span>
//               )}
//               <small className="help-text">Email must start with a letter and contain no numbers</small>
//             </div>
//           </div>

//           <div className="form-group full-width">
//             <label>Website</label>
//             <div className="input-with-icon">
//               <span className="input-icon">🌐</span>
//               <input
//                 type="text"
//                 name="website"
//                 value={profileData.website || ''}
//                 onChange={handleProfileChange}
//                 placeholder="www.omkarclinic.com (no numbers)"
//                 className={validationErrors.website ? 'error-input' : ''}
//               />
//             </div>
//             {validationErrors.website && (
//               <span className="error-message">{validationErrors.website}</span>
//             )}
//             <small className="help-text">Optional: Letters, dots, hyphens only (no numbers, no spaces)</small>
//           </div>

//           {/* Doctor Information Section - SAFE ACCESS with optional chaining */}
//           {profileData.doctorInfo && (
//             <div className="doctor-info-section" style={{ marginTop: '30px', borderTop: '2px solid #e2e8f0', paddingTop: '20px' }}>
//               <h3>👨‍⚕️ Current Doctor Information</h3>
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
//                 <div>
//                   <label>Doctor Name:</label>
//                   <p><strong>{profileData.doctorInfo.name || 'N/A'}</strong></p>
//                 </div>
//                 <div>
//                   <label>Specialization:</label>
//                   <p><strong>{profileData.doctorInfo.specialization || 'N/A'}</strong></p>
//                 </div>
//                 <div>
//                   <label>Department:</label>
//                   <p><strong>{profileData.doctorInfo.department || 'N/A'}</strong></p>
//                 </div>
//                 <div>
//                   <label>Experience:</label>
//                   <p><strong>{profileData.doctorInfo.experience || 'N/A'}</strong></p>
//                 </div>
//               </div>
//               <p style={{ fontSize: '13px', color: '#64748b', marginTop: '10px' }}>
//                 ℹ️ To edit doctor information, please go to Doctor Profile page.
//               </p>
//             </div>
//           )}

//           {/* Last Updated Info */}
//           <div className="last-updated">
//             <small>⏰ Last saved: {new Date().toLocaleString()}</small>
//           </div>

//           {/* Form Actions */}
//           <div className="form-actions">
//             <button className="btn btn-primary" onClick={handleSaveProfile}>
//               💾 Save Changes
//             </button>
//             <button className="btn btn-secondary" onClick={handleResetProfile}>
//               ↩️ Reset to Default
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;

import React, { useState, useEffect } from 'react';
import './Settings.css';

// ✅ FIX: Custom event name for same-window sync
const PROFILE_UPDATED_EVENT = 'clinicProfileUpdated';

const Settings = () => {
  // Default clinic profile with doctor info included
  const defaultProfile = {
    // Clinic Information
    clinicName: 'Omkar Clinic',
    address: 'Omkar Clinic, Wadibhokar Road, Deopur, Dhule',
    city: 'Dhule',
    state: 'Maharashtra',
    pincode: '424001',
    phone: '+91 02562 221 234',
    email: 'info@OmkarClinic.com',
    website: 'www.OmkarClinic.com',
    registrationNo: 'MHC/1234/2020',
    established: '2013',
    licenseNo: 'MH/CLINIC/2020/1234',
    
    // Doctor Information (nested object)
    doctorInfo: {
      name: 'Dr. Pranjal Patil',
      specialization: 'Cardiology',
      department: 'Cardiology',
      doctorPhone: '9876543210',
      doctorEmail: 'pranjal.patil@hospital.com',
      doctorAddress: 'Omkar Clinic, Wadibhokar Road, Deopur, Dhule',
      experience: '13 years',
      licenseNumber: 'MH123456789',
      qualifications: 'MBBS, MD Cardiology',
      joinDate: '2013-03-15',
      profilePhoto: null
    }
  };

  // Clinic Profile State
  const [profileData, setProfileData] = useState(defaultProfile);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [loading, setLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false); // ✅ NEW: Edit mode state

  // Load data from localStorage on component mount
  useEffect(() => {
    loadProfileData();
    
    // ✅ FIX: Listen for CustomEvent instead of 'storage' event (works in same window)
    const handleProfileUpdate = () => {
      loadProfileData();
    };
    
    window.addEventListener(PROFILE_UPDATED_EVENT, handleProfileUpdate);
    
    return () => {
      window.removeEventListener(PROFILE_UPDATED_EVENT, handleProfileUpdate);
    };
  }, []);

  // Load profile data from localStorage
  const loadProfileData = () => {
    try {
      const savedProfile = localStorage.getItem('clinicProfile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        // Ensure doctorInfo exists
        if (!parsed.doctorInfo) {
          parsed.doctorInfo = defaultProfile.doctorInfo;
        }
        setProfileData(parsed);
        console.log('✅ Profile loaded from localStorage:', parsed);
      } else {
        // If no saved data, save default to localStorage
        localStorage.setItem('clinicProfile', JSON.stringify(defaultProfile));
        setProfileData(defaultProfile);
        console.log('📝 Default profile saved to localStorage');
      }
    } catch (error) {
      console.error('❌ Error loading profile:', error);
      setProfileData(defaultProfile);
    } finally {
      setLoading(false);
    }
  };

  // ==================== VALIDATION FUNCTIONS ====================
  
  // Validate clinic name (only letters and spaces)
  const validateClinicName = (name) => {
    if (!name || name.trim() === '') return 'Clinic name is required';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Clinic name should contain only letters and spaces';
    if (name.length < 3) return 'Clinic name must be at least 3 characters';
    if (name.length > 100) return 'Clinic name must be less than 100 characters';
    return '';
  };

  // Validate city (only letters and spaces)
  const validateCity = (city) => {
    if (!city || city.trim() === '') return 'City is required';
    if (!/^[a-zA-Z\s]+$/.test(city)) return 'City should contain only letters and spaces';
    if (city.length < 2) return 'City name must be at least 2 characters';
    return '';
  };

  // Validate state (only letters and spaces)
  const validateState = (state) => {
    if (!state || state.trim() === '') return 'State is required';
    if (!/^[a-zA-Z\s]+$/.test(state)) return 'State should contain only letters and spaces';
    if (state.length < 2) return 'State name must be at least 2 characters';
    return '';
  };

  // Validate pincode (exactly 6 digits) - READ ONLY now
  const validatePincode = (pincode) => {
    if (!pincode || pincode.trim() === '') return 'Pincode is required';
    if (!/^\d{6}$/.test(pincode)) return 'Pincode must be exactly 6 digits';
    return '';
  };

  // Validate phone number (10 digits, starting with 6-9)
  const validatePhone = (phone) => {
    if (!phone || phone.trim() === '') return 'Phone number is required';
    // Remove any non-digit characters for validation
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) return 'Phone number must be exactly 10 digits';
    if (!/^[6-9]/.test(cleanPhone)) return 'Phone number must start with 6, 7, 8, or 9';
    return '';
  };

  // Validate email (no numbers, must start with letter, only letters, dots, @, etc.)
  const validateEmail = (email) => {
    if (!email || email.trim() === '') return 'Email is required';
    // Email should start with a letter, no numbers in the local part
    const emailRegex = /^[a-zA-Z][a-zA-Z._%+-]*@[a-zA-Z][a-zA-Z.-]*\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return 'Email must start with a letter and contain no numbers';
    // Check if email contains any numbers
    if (/\d/.test(email)) return 'Email should not contain numbers';
    return '';
  };

  // Validate website (only letters, dots, hyphens, no numbers, no spaces)
  const validateWebsite = (website) => {
    if (!website) return ''; // Website is optional
    // Allow only letters, dots, hyphens, forward slashes - NO NUMBERS
    if (!/^[a-zA-Z./-]+$/.test(website)) return 'Website should contain only letters, dots, hyphens, and slashes (no numbers)';
    if (website.includes(' ')) return 'Website should not contain spaces';
    if (/\d/.test(website)) return 'Website should not contain numbers';
    return '';
  };

  // Validate address (no specific restrictions but required)
  const validateAddress = (address) => {
    if (!address || address.trim() === '') return 'Address is required';
    if (address.length < 5) return 'Address must be at least 5 characters';
    return '';
  };

  // ==================== VALIDATE ALL FIELDS ====================
  const validateAllFields = () => {
    const errors = {};
    
    // Only validate editable fields
    const clinicNameError = validateClinicName(profileData.clinicName);
    if (clinicNameError) errors.clinicName = clinicNameError;
    
    const addressError = validateAddress(profileData.address);
    if (addressError) errors.address = addressError;
    
    const cityError = validateCity(profileData.city);
    if (cityError) errors.city = cityError;
    
    const stateError = validateState(profileData.state);
    if (stateError) errors.state = stateError;
    
    const phoneError = validatePhone(profileData.phone);
    if (phoneError) errors.phone = phoneError;
    
    const emailError = validateEmail(profileData.email);
    if (emailError) errors.email = emailError;
    
    const websiteError = validateWebsite(profileData.website);
    if (websiteError) errors.website = websiteError;
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Clinic Profile Changes with real-time validation
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    let error = '';
    
    // Apply validation based on field name
    switch (name) {
      case 'clinicName':
        // Allow only letters and spaces
        const lettersOnly = value.replace(/[^a-zA-Z\s]/g, '');
        if (value !== lettersOnly) {
          setProfileData({
            ...profileData,
            [name]: lettersOnly
          });
          error = validateClinicName(lettersOnly);
        } else {
          setProfileData({
            ...profileData,
            [name]: value
          });
          error = validateClinicName(value);
        }
        setValidationErrors({ ...validationErrors, [name]: error });
        return;
      
      case 'city':
        // Allow only letters and spaces
        const cityLetters = value.replace(/[^a-zA-Z\s]/g, '');
        if (value !== cityLetters) {
          setProfileData({
            ...profileData,
            [name]: cityLetters
          });
          error = validateCity(cityLetters);
        } else {
          setProfileData({
            ...profileData,
            [name]: value
          });
          error = validateCity(value);
        }
        setValidationErrors({ ...validationErrors, [name]: error });
        return;
      
      case 'state':
        // Allow only letters and spaces
        const stateLetters = value.replace(/[^a-zA-Z\s]/g, '');
        if (value !== stateLetters) {
          setProfileData({
            ...profileData,
            [name]: stateLetters
          });
          error = validateState(stateLetters);
        } else {
          setProfileData({
            ...profileData,
            [name]: value
          });
          error = validateState(value);
        }
        setValidationErrors({ ...validationErrors, [name]: error });
        return;
      
      case 'pincode':
        // Pincode is READ-ONLY - do not allow changes
        return;
      
      case 'phone':
        // Allow only digits and limit to 10
        const phoneDigits = value.replace(/\D/g, '').slice(0, 10);
        if (value !== phoneDigits) {
          setProfileData({
            ...profileData,
            [name]: phoneDigits
          });
          error = validatePhone(phoneDigits);
        } else {
          setProfileData({
            ...profileData,
            [name]: value
          });
          error = validatePhone(value);
        }
        setValidationErrors({ ...validationErrors, [name]: error });
        return;
      
      case 'email':
        // Allow only letters, dots, @, _, %, +, - and no numbers
        let emailValue = value;
        // Remove any numbers
        emailValue = emailValue.replace(/\d/g, '');
        // Ensure it starts with a letter
        if (emailValue && !/^[a-zA-Z]/.test(emailValue)) {
          emailValue = '';
        }
        setProfileData({
          ...profileData,
          [name]: emailValue
        });
        error = validateEmail(emailValue);
        setValidationErrors({ ...validationErrors, [name]: error });
        return;
      
      case 'website':
        // Allow only letters, dots, hyphens, forward slashes - NO NUMBERS
        let websiteValue = value;
        // Remove any numbers
        websiteValue = websiteValue.replace(/\d/g, '');
        // Remove any special characters except ., /, -
        websiteValue = websiteValue.replace(/[^a-zA-Z./-]/g, '');
        setProfileData({
          ...profileData,
          [name]: websiteValue
        });
        error = validateWebsite(websiteValue);
        setValidationErrors({ ...validationErrors, [name]: error });
        return;
      
      default:
        setProfileData({
          ...profileData,
          [name]: value
        });
    }
    
    setValidationErrors({ ...validationErrors, [name]: error });
    setSaveSuccess(false);
    setSaveError('');
  };

  // ✅ NEW: Enable edit mode
  const handleEditClick = () => {
    setIsEditing(true);
    setSaveSuccess(false);
    setSaveError('');
    setValidationErrors({});
  };

  // ✅ NEW: Cancel edit mode
  const handleCancelEdit = () => {
    // Reload original data from localStorage
    loadProfileData();
    setIsEditing(false);
    setSaveSuccess(false);
    setSaveError('');
    setValidationErrors({});
  };

  const handleSaveProfile = () => {
    // Validate all fields
    if (!validateAllFields()) {
      setSaveError('❌ Please fix all validation errors before saving');
      return;
    }

    try {
      // Validate required fields
      if (!profileData.clinicName || !profileData.address || !profileData.city || 
          !profileData.state || !profileData.pincode || !profileData.phone || !profileData.email) {
        setSaveError('❌ Please fill all required fields');
        return;
      }

      // ✅ FIX: Preserve latest doctorInfo from localStorage so it doesn't get overwritten
      const savedProfile = localStorage.getItem('clinicProfile');
      const existingData = savedProfile ? JSON.parse(savedProfile) : {};
      const mergedData = {
        ...profileData,
        doctorInfo: existingData.doctorInfo || profileData.doctorInfo
      };

      // Save to localStorage
      localStorage.setItem('clinicProfile', JSON.stringify(mergedData));
      setProfileData(mergedData);
      
      // Show success message
      setSaveSuccess(true);
      setSaveError('');
      setValidationErrors({});
      
      // ✅ Exit edit mode after saving
      setIsEditing(false);
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      
      console.log('✅ Clinic profile updated successfully!', mergedData);
      
      // ✅ FIX: Dispatch CustomEvent so DoctorProfile also re-renders
      window.dispatchEvent(new CustomEvent(PROFILE_UPDATED_EVENT));
    } catch (error) {
      console.error('❌ Error saving profile:', error);
      setSaveError('Failed to save profile. Please try again.');
    }
  };

  const handleResetProfile = () => {
    if (window.confirm('Are you sure you want to reset to default settings?')) {
      setProfileData(defaultProfile);
      localStorage.setItem('clinicProfile', JSON.stringify(defaultProfile));
      setSaveSuccess(true);
      setSaveError('');
      setValidationErrors({});
      setIsEditing(false); // ✅ Exit edit mode on reset
      setTimeout(() => setSaveSuccess(false), 3000);
      
      // ✅ FIX: Dispatch CustomEvent instead of plain 'storage' event
      window.dispatchEvent(new CustomEvent(PROFILE_UPDATED_EVENT));
    }
  };

  // Show loading state
  if (loading) {
    return <div className="loading">Loading settings...</div>;
  }

  return (
    <div className="settings-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className="page-title" style={{ margin: 0 }}> Clinic Information</h2>
        {!isEditing ? (
          <button 
            className="btn btn-primary" 
            onClick={handleEditClick}
            style={{
              padding: "10px 24px",
              background: "#0d6efd",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            ✏️ Edit Information
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="btn btn-secondary" 
              onClick={handleCancelEdit}
              style={{
                padding: "10px 20px",
                background: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600"
              }}
            >
              ❌ Cancel
            </button>
            <button 
              className="btn btn-success" 
              onClick={handleSaveProfile}
              style={{
                padding: "10px 20px",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600"
              }}
            >
              💾 Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Success/Error Messages */}
      {saveSuccess && (
        <div className="alert alert-success">
          ✅ Clinic profile updated successfully!
        </div>
      )}
      
      {saveError && (
        <div className="alert alert-error">
          {saveError}
        </div>
      )}

      {/* Clinic Profile Card */}
      <div className="settings-card">
        {/* Clinic Info Summary Cards */}
        <div className="clinic-info-grid">
          <div className="info-card">
            <div className="info-icon">📋</div>
            <h4>Registration No.</h4>
            <p>{profileData.registrationNo}</p>
          </div>
          <div className="info-card">
            <div className="info-icon">📅</div>
            <h4>Established</h4>
            <p>{profileData.established}</p>
          </div>
          <div className="info-card">
            <div className="info-icon">🔑</div>
            <h4>License No.</h4>
            <p>{profileData.licenseNo}</p>
          </div>
        </div>

        <div className="settings-form">
          {/* Basic Information */}
          <div className="form-row">
            <div className="form-group">
              <label className="required">Clinic Name</label>
              <input
                type="text"
                name="clinicName"
                value={profileData.clinicName || ''}
                onChange={handleProfileChange}
                placeholder="Enter clinic name (letters only)"
                className={validationErrors.clinicName ? 'error-input' : ''}
                disabled={!isEditing}
              />
              {validationErrors.clinicName && (
                <span className="error-message">{validationErrors.clinicName}</span>
              )}
            </div>
            <div className="form-group">
              <label>Registration No.</label>
              <input
                type="text"
                name="registrationNo"
                value={profileData.registrationNo || ''}
                disabled
                className="disabled-input"
                title="Registration number cannot be edited"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>License No.</label>
              <input
                type="text"
                name="licenseNo"
                value={profileData.licenseNo || ''}
                disabled
                className="disabled-input"
                title="License number cannot be edited"
              />
            </div>
            <div className="form-group">
              <label>Established Year</label>
              <input
                type="text"
                name="established"
                value={profileData.established || ''}
                disabled
                className="disabled-input"
                title="Established year cannot be edited"
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="form-group full-width">
            <label className="required">Address</label>
            <input
              type="text"
              name="address"
              value={profileData.address || ''}
              onChange={handleProfileChange}
              placeholder="Street address"
              className={validationErrors.address ? 'error-input' : ''}
              disabled={!isEditing}
            />
            {validationErrors.address && (
              <span className="error-message">{validationErrors.address}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="required">City</label>
              <input
                type="text"
                name="city"
                value={profileData.city || ''}
                onChange={handleProfileChange}
                placeholder="City (letters only)"
                className={validationErrors.city ? 'error-input' : ''}
                disabled={!isEditing}
              />
              {validationErrors.city && (
                <span className="error-message">{validationErrors.city}</span>
              )}
            </div>
            <div className="form-group">
              <label className="required">State</label>
              <input
                type="text"
                name="state"
                value={profileData.state || ''}
                onChange={handleProfileChange}
                placeholder="State (letters only)"
                className={validationErrors.state ? 'error-input' : ''}
                disabled={!isEditing}
              />
              {validationErrors.state && (
                <span className="error-message">{validationErrors.state}</span>
              )}
            </div>
            <div className="form-group">
              <label className="required">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={profileData.pincode || ''}
                disabled
                className="disabled-input"
                title="Pincode cannot be edited"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="form-row">
            <div className="form-group">
              <label className="required">Phone</label>
              <div className="input-with-icon">
                <span className="input-icon">📞</span>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone || ''}
                  onChange={handleProfileChange}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  className={validationErrors.phone ? 'error-input' : ''}
                  disabled={!isEditing}
                />
              </div>
              {validationErrors.phone && (
                <span className="error-message">{validationErrors.phone}</span>
              )}
              <small className="help-text">Enter 10-digit number starting with 6,7,8,9</small>
            </div>
            <div className="form-group">
              <label className="required">Email</label>
              <div className="input-with-icon">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  name="email"
                  value={profileData.email || ''}
                  onChange={handleProfileChange}
                  placeholder="Email address (no numbers)"
                  className={validationErrors.email ? 'error-input' : ''}
                  disabled={!isEditing}
                />
              </div>
              {validationErrors.email && (
                <span className="error-message">{validationErrors.email}</span>
              )}
              <small className="help-text">Email must start with a letter and contain no numbers</small>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Website</label>
            <div className="input-with-icon">
              <span className="input-icon">🌐</span>
              <input
                type="text"
                name="website"
                value={profileData.website || ''}
                onChange={handleProfileChange}
                placeholder="www.omkarclinic.com (no numbers)"
                className={validationErrors.website ? 'error-input' : ''}
                disabled={!isEditing}
              />
            </div>
            {validationErrors.website && (
              <span className="error-message">{validationErrors.website}</span>
            )}
            <small className="help-text">Optional: Letters, dots, hyphens only (no numbers, no spaces)</small>
          </div>

          {/* Doctor Information Section - SAFE ACCESS with optional chaining */}
          {profileData.doctorInfo && (
            <div className="doctor-info-section" style={{ marginTop: '30px', borderTop: '2px solid #e2e8f0', paddingTop: '20px' }}>
              <h3>👨‍⚕️ Current Doctor Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                <div>
                  <label>Doctor Name:</label>
                  <p><strong>{profileData.doctorInfo.name || 'N/A'}</strong></p>
                </div>
                <div>
                  <label>Specialization:</label>
                  <p><strong>{profileData.doctorInfo.specialization || 'N/A'}</strong></p>
                </div>
                <div>
                  <label>Department:</label>
                  <p><strong>{profileData.doctorInfo.department || 'N/A'}</strong></p>
                </div>
                <div>
                  <label>Experience:</label>
                  <p><strong>{profileData.doctorInfo.experience || 'N/A'}</strong></p>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '10px' }}>
                ℹ️ To edit doctor information, please go to Doctor Profile page.
              </p>
            </div>
          )}

          {/* Last Updated Info */}
          <div className="last-updated">
            <small>⏰ Last saved: {new Date().toLocaleString()}</small>
          </div>

          {/* Form Actions - Only show Reset button when not in edit mode */}
          {!isEditing && (
            <div className="form-actions" style={{ marginTop: '20px' }}>
              <button className="btn btn-secondary" onClick={handleResetProfile}>
                ↩️ Reset to Default
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;