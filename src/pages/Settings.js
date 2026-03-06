// import React, { useState } from 'react';
// import './Settings.css';

// const Settings = () => {
//   // Clinic Profile State
//   const [profileData, setProfileData] = useState({
//     clinicName: 'MedCare Clinic',
//     address: '123 Healthcare Street, Medical District',
//     city: 'Mumbai',
//     state: 'Maharashtra',
//     pincode: '400001',
//     phone: '+91 22 1234 5678',
//     email: 'info@medcare.com',
//     website: 'www.medcare.com',
//     registrationNo: 'MHC/1234/2020',
//     established: '2010',
//     licenseNo: 'MH/CLINIC/2020/1234'
//   });

//   // Handle Profile Changes
//   const handleProfileChange = (e) => {
//     setProfileData({
//       ...profileData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSaveProfile = () => {
//     // Save to localStorage or API
//     localStorage.setItem('clinicProfile', JSON.stringify(profileData));
//     alert('✅ Clinic profile updated successfully!');
//   };

//   const handleResetProfile = () => {
//     setProfileData({
//       clinicName: 'MedCare Clinic',
//       address: '123 Healthcare Street, Medical District',
//       city: 'Mumbai',
//       state: 'Maharashtra',
//       pincode: '400001',
//       phone: '+91 22 1234 5678',
//       email: 'info@medcare.com',
//       website: 'www.medcare.com',
//       registrationNo: 'MHC/1234/2020',
//       established: '2010',
//       licenseNo: 'MH/CLINIC/2020/1234'
//     });
//   };

//   return (
//     <div className="settings-page">
//       <h2 className="page-title">Clinic Settings</h2>

//       {/* Clinic Profile Card */}
//       <div className="settings-card">
//         <h3> Clinic Information</h3>

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
//                 value={profileData.clinicName}
//                 onChange={handleProfileChange}
//                 placeholder="Enter clinic name"
//               />
//             </div>
//             <div className="form-group">
//               <label>Registration No.</label>
//               <input
//                 type="text"
//                 name="registrationNo"
//                 value={profileData.registrationNo}
//                 onChange={handleProfileChange}
//                 placeholder="Registration number"
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>License No.</label>
//               <input
//                 type="text"
//                 name="licenseNo"
//                 value={profileData.licenseNo}
//                 onChange={handleProfileChange}
//                 placeholder="License number"
//               />
//             </div>
//             <div className="form-group">
//               <label>Established Year</label>
//               <input
//                 type="text"
//                 name="established"
//                 value={profileData.established}
//                 onChange={handleProfileChange}
//                 placeholder="e.g., 2010"
//               />
//             </div>
//           </div>

//           {/* Address Information */}
//           <div className="form-group full-width">
//             <label className="required">Address</label>
//             <input
//               type="text"
//               name="address"
//               value={profileData.address}
//               onChange={handleProfileChange}
//               placeholder="Street address"
//             />
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label className="required">City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={profileData.city}
//                 onChange={handleProfileChange}
//                 placeholder="City"
//               />
//             </div>
//             <div className="form-group">
//               <label className="required">State</label>
//               <input
//                 type="text"
//                 name="state"
//                 value={profileData.state}
//                 onChange={handleProfileChange}
//                 placeholder="State"
//               />
//             </div>
//             <div className="form-group">
//               <label className="required">Pincode</label>
//               <input
//                 type="text"
//                 name="pincode"
//                 value={profileData.pincode}
//                 onChange={handleProfileChange}
//                 placeholder="Pincode"
//               />
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="form-row">
//             <div className="form-group input-icon">
//               <span className="input-icon">📞</span>
//               <label className="required">Phone</label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={profileData.phone}
//                 onChange={handleProfileChange}
//                 placeholder="+91 22 1234 5678"
//               />
//             </div>
//             <div className="form-group input-icon">
//               <span className="input-icon">📧</span>
//               <label className="required">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={profileData.email}
//                 onChange={handleProfileChange}
//                 placeholder="info@medcare.com"
//               />
//             </div>
//           </div>

//           <div className="form-group input-icon full-width">
//             <span className="input-icon">🌐</span>
//             <label>Website</label>
//             <input
//               type="text"
//               name="website"
//               value={profileData.website}
//               onChange={handleProfileChange}
//               placeholder="www.medcare.com"
//             />
//             <span className="help-text">Optional: Enter your clinic's website URL</span>
//           </div>

//           {/* Form Actions */}
//           <div className="form-actions">
//             <button className="btn btn-primary" onClick={handleSaveProfile}>
//               💾 Save Changes
//             </button>
//             <button className="btn btn-secondary" onClick={handleResetProfile}>
//               ↩️ Reset
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

const Settings = () => {
  // Default clinic profile
  const defaultProfile = {
    clinicName: 'MedCare Clinic',
    address: '123 Healthcare Street, Medical District',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    phone: '+91 22 1234 5678',
    email: 'info@medcare.com',
    website: 'www.medcare.com',
    registrationNo: 'MHC/1234/2020',
    established: '2010',
    licenseNo: 'MH/CLINIC/2020/1234'
  };

  // Clinic Profile State
  const [profileData, setProfileData] = useState(defaultProfile);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // ✅ LOAD DATA FROM LOCALSTORAGE ON COMPONENT MOUNT
  useEffect(() => {
    loadProfileData();
  }, []);

  // Load profile data from localStorage
  const loadProfileData = () => {
    try {
      const savedProfile = localStorage.getItem('clinicProfile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfileData(parsed);
        console.log('✅ Profile loaded from localStorage:', parsed);
      } else {
        // If no saved data, save default to localStorage
        localStorage.setItem('clinicProfile', JSON.stringify(defaultProfile));
        console.log('📝 Default profile saved to localStorage');
      }
    } catch (error) {
      console.error('❌ Error loading profile:', error);
    }
  };

  // Handle Profile Changes
  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
    // Clear any previous messages
    setSaveSuccess(false);
    setSaveError('');
  };

  const handleSaveProfile = () => {
    try {
      // Validate required fields
      if (!profileData.clinicName || !profileData.address || !profileData.city || 
          !profileData.state || !profileData.pincode || !profileData.phone || !profileData.email) {
        setSaveError('❌ Please fill all required fields');
        return;
      }

      // Save to localStorage
      localStorage.setItem('clinicProfile', JSON.stringify(profileData));
      
      // Show success message
      setSaveSuccess(true);
      setSaveError('');
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      
      console.log('✅ Clinic profile updated successfully!', profileData);
      
      // Optional: Trigger event for other components
      if (window.EventBus) {
        window.EventBus.emit('clinicProfileUpdated', profileData);
      }
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
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="settings-page">
      <h2 className="page-title">⚙️ Clinic Settings</h2>

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
        <h3>🏥 Clinic Information</h3>

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
                value={profileData.clinicName}
                onChange={handleProfileChange}
                placeholder="Enter clinic name"
              />
            </div>
            <div className="form-group">
              <label>Registration No.</label>
              <input
                type="text"
                name="registrationNo"
                value={profileData.registrationNo}
                onChange={handleProfileChange}
                placeholder="Registration number"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>License No.</label>
              <input
                type="text"
                name="licenseNo"
                value={profileData.licenseNo}
                onChange={handleProfileChange}
                placeholder="License number"
              />
            </div>
            <div className="form-group">
              <label>Established Year</label>
              <input
                type="text"
                name="established"
                value={profileData.established}
                onChange={handleProfileChange}
                placeholder="e.g., 2010"
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="form-group full-width">
            <label className="required">Address</label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleProfileChange}
              placeholder="Street address"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="required">City</label>
              <input
                type="text"
                name="city"
                value={profileData.city}
                onChange={handleProfileChange}
                placeholder="City"
              />
            </div>
            <div className="form-group">
              <label className="required">State</label>
              <input
                type="text"
                name="state"
                value={profileData.state}
                onChange={handleProfileChange}
                placeholder="State"
              />
            </div>
            <div className="form-group">
              <label className="required">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={profileData.pincode}
                onChange={handleProfileChange}
                placeholder="Pincode"
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
                  type="text"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  placeholder="+91 22 1234 5678"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="required">Email</label>
              <div className="input-with-icon">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  placeholder="info@medcare.com"
                />
              </div>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Website</label>
            <div className="input-with-icon">
              <span className="input-icon">🌐</span>
              <input
                type="text"
                name="website"
                value={profileData.website}
                onChange={handleProfileChange}
                placeholder="www.medcare.com"
              />
            </div>
            <span className="help-text">Optional: Enter your clinic's website URL</span>
          </div>

          {/* Last Updated Info */}
          <div className="last-updated">
            <small>⏰ Last saved: {new Date().toLocaleString()}</small>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button className="btn btn-primary" onClick={handleSaveProfile}>
              💾 Save Changes
            </button>
            <button className="btn btn-secondary" onClick={handleResetProfile}>
              ↩️ Reset to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;