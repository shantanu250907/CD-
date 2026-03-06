// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import './Doctors.css';

// function Doctors() {
//     // ==================== STATE ====================
//     const [doctorInfo, setDoctorInfo] = useState({
//         name: "",
//         specialization: "",
//         department: "",
//         phone: "",
//         email: "",
//         address: "",
//         experience: "",
//         licenseNumber: "",
//         qualifications: "",
//         joinDate: "",
//         profilePhoto: null,
//     });

//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState({});
//     const [photoPreview, setPhotoPreview] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [saving, setSaving] = useState(false);
//     const [error, setError] = useState(null);
    
//     const fileInputRef = useRef(null);

//     const API_URL = "http://localhost:8005/api";

//     // ==================== FETCH DOCTOR DATA ====================
//     useEffect(() => {
//         fetchDoctorData();
//     }, []);

//     const fetchDoctorData = async () => {
//         setLoading(true);
//         setError(null);
        
//         try {
//             // First try to get all doctors to see what's available
//             const allDoctorsResponse = await axios.get(`${API_URL}/doctors`);
//             console.log("All doctors in database:", allDoctorsResponse.data);
            
//             // Now try to get specific doctor by email
//             const email = "pranjal.patil@hospital.com";
//             console.log("Fetching doctor with email:", email);
            
//             const response = await axios.get(`${API_URL}/doctors/email/${email}`);
//             console.log("Doctor data received:", response.data);
            
//             if (response.data.success) {
//                 const doctorData = response.data.data;
//                 // Format date for input field
//                 if (doctorData.joinDate) {
//                     doctorData.joinDate = doctorData.joinDate.split('T')[0];
//                 }
//                 setDoctorInfo(doctorData);
//                 setFormData(doctorData);
//                 setPhotoPreview(doctorData.profilePhoto);
//             }
//         } catch (error) {
//             console.error("Error fetching doctor:", error);
            
//             if (error.response?.status === 404) {
//                 setError("Doctor not found with email: pranjal.patil@hospital.com. Please check if doctor exists in database.");
//             } else {
//                 setError(error.response?.data?.message || "Failed to load doctor data");
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ==================== HANDLERS ====================
//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handlePhotoChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             if (!file.type.startsWith("image/")) {
//                 alert("❌ Please select an image file");
//                 return;
//             }
//             if (file.size > 5 * 1024 * 1024) {
//                 alert("❌ Image size must be less than 5MB");
//                 return;
//             }
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setPhotoPreview(reader.result);
//                 setFormData(prev => ({ ...prev, profilePhoto: reader.result }));
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleRemovePhoto = () => {
//         setPhotoPreview(null);
//         setFormData(prev => ({ ...prev, profilePhoto: null }));
//         if (fileInputRef.current) {
//             fileInputRef.current.value = "";
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSaving(true);
        
//         try {
//             if (!doctorInfo._id) {
//                 throw new Error("Doctor ID not found");
//             }
            
//             const response = await axios.put(`${API_URL}/doctors/${doctorInfo._id}`, formData);
            
//             if (response.data.success) {
//                 const updatedData = response.data.data;
//                 if (updatedData.joinDate) {
//                     updatedData.joinDate = updatedData.joinDate.split('T')[0];
//                 }
//                 setDoctorInfo(updatedData);
//                 setIsEditing(false);
//                 alert("✅ Profile updated successfully!");
//             }
//         } catch (error) {
//             console.error("Error updating doctor:", error);
//             alert(error.response?.data?.message || "Failed to update profile");
//         } finally {
//             setSaving(false);
//         }
//     };

//     const handleCancel = () => {
//         setFormData({ ...doctorInfo });
//         setPhotoPreview(doctorInfo.profilePhoto);
//         setIsEditing(false);
//     };

//     const handleEditClick = () => {
//         setFormData({ ...doctorInfo });
//         setPhotoPreview(doctorInfo.profilePhoto);
//         setIsEditing(true);
//     };

//     // Loading State
//     if (loading) {
//         return (
//             <div className="appointments-page">
//                 <div className="loading-container">
//                     <div className="loading-spinner"></div>
//                     <p>Loading profile...</p>
//                 </div>
//             </div>
//         );
//     }

//     // Error State
//     if (error) {
//         return (
//             <div className="appointments-page">
//                 <div className="error-container">
//                     <span className="error-icon">⚠️</span>
//                     <h3>Error Loading Profile</h3>
//                     <p>{error}</p>
//                     <button onClick={fetchDoctorData} className="retry-btn">
//                         🔄 Try Again
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const currentPhoto = doctorInfo.profilePhoto;

//     return (
//         <div className="appointments-page">
//             {/* Rest of your JSX remains the same */}
//             <div className="page-header">
//                 <div>
//                     <h1>👨‍⚕️ My Profile</h1>
//                 </div>
//                 {!isEditing && (
//                     <button className="add-btn" onClick={handleEditClick}>
//                         ✏️ Edit Profile
//                     </button>
//                 )}
//             </div>

//             {!isEditing ? (
//                 <>
//                     <div className="dashboard-header" style={{ marginBottom: "30px" }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
//                             {currentPhoto ? (
//                                 <img
//                                     src={currentPhoto}
//                                     alt="Profile"
//                                     style={{
//                                         width: "80px", height: "80px", borderRadius: "50%",
//                                         objectFit: "cover",
//                                         border: "3px solid rgba(255,255,255,0.4)",
//                                         boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
//                                     }}
//                                 />
//                             ) : (
//                                 <div style={{
//                                     width: "80px", height: "80px", borderRadius: "50%",
//                                     background: "rgba(255,255,255,0.2)", display: "flex",
//                                     alignItems: "center", justifyContent: "center",
//                                     fontSize: "32px", fontWeight: "700", color: "white",
//                                     border: "3px solid rgba(255,255,255,0.3)"
//                                 }}>
//                                     {doctorInfo.name?.split(" ")[1]?.charAt(0) || doctorInfo.name?.charAt(0) || "D"}
//                                 </div>
//                             )}
//                             <div>
//                                 <h1 style={{ color: "white", fontSize: "24px", margin: "0 0 4px" }}>{doctorInfo.name}</h1>
//                                 <p style={{ color: "rgba(255,255,255,0.9)", margin: "0 0 4px", fontSize: "16px", fontWeight: "600" }}>
//                                     {doctorInfo.specialization}
//                                 </p>
//                                 <p style={{ color: "rgba(255,255,255,0.7)", margin: "0", fontSize: "14px" }}>
//                                     {doctorInfo.department} Department
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="table-container" style={{ marginBottom: "24px" }}>
//                         <div className="table-header">
//                             <h3>📋 Personal Information</h3>
//                         </div>
//                         <div className="info-grid">
//                             <InfoItem label="Full Name" value={doctorInfo.name} />
//                             <InfoItem label="Phone" value={doctorInfo.phone} />
//                             <InfoItem label="Email" value={doctorInfo.email} />
//                             <InfoItem label="Address" value={doctorInfo.address} />
//                         </div>
//                     </div>

//                     <div className="table-container">
//                         <div className="table-header">
//                             <h3>🏥 Professional Information</h3>
//                         </div>
//                         <div className="info-grid">
//                             <InfoItem label="Specialization" value={doctorInfo.specialization} />
//                             <InfoItem label="Department" value={doctorInfo.department} />
//                             <InfoItem label="Experience" value={doctorInfo.experience} />
//                             <InfoItem label="Join Date" value={doctorInfo.joinDate ? new Date(doctorInfo.joinDate).toLocaleDateString() : ''} />
//                             <InfoItem label="License Number" value={doctorInfo.licenseNumber} />
//                             <InfoItem label="Qualifications" value={doctorInfo.qualifications} />
//                         </div>
//                     </div>
//                 </>
//             ) : (
//                 <div className="popup-card wide-popup">
//                     <h2>✏️ Edit Profile</h2>
//                     <form onSubmit={handleSubmit}>
//                         <h3>📷 Profile Photo</h3>
//                         <div className="photo-upload-section">
//                             <div className="photo-preview">
//                                 {photoPreview ? (
//                                     <img src={photoPreview} alt="Preview" />
//                                 ) : (
//                                     <div className="preview-initials">
//                                         {formData.name?.split(" ")[1]?.charAt(0) || formData.name?.charAt(0) || "D"}
//                                     </div>
//                                 )}
//                             </div>
//                             <div className="upload-controls">
//                                 <p>JPG, PNG or GIF. Max 5MB</p>
//                                 <input
//                                     type="file"
//                                     ref={fileInputRef}
//                                     onChange={handlePhotoChange}
//                                     accept="image/*"
//                                     style={{ display: "none" }}
//                                 />
//                                 <div className="upload-buttons">
//                                     <button type="button" className="choose-btn" onClick={() => fileInputRef.current.click()} disabled={saving}>
//                                         📁 Choose Photo
//                                     </button>
//                                     {photoPreview && (
//                                         <button type="button" className="remove-btn" onClick={handleRemovePhoto} disabled={saving}>
//                                             🗑️ Remove
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         <h3>Personal Information</h3>
//                         <div className="form-grid">
//                             <div className="popup-form-group">
//                                 <label>Full Name</label>
//                                 <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required disabled={saving} />
//                             </div>
//                             <div className="popup-form-group">
//                                 <label>Phone</label>
//                                 <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} required disabled={saving} />
//                             </div>
//                             <div className="popup-form-group">
//                                 <label>Email</label>
//                                 <input type="email" name="email" value={formData.email || ''} onChange={handleChange} required disabled={saving} />
//                             </div>
//                             <div className="popup-form-group full-width">
//                                 <label>Address</label>
//                                 <input type="text" name="address" value={formData.address || ''} onChange={handleChange} required disabled={saving} />
//                             </div>
//                         </div>

//                         <h3>Professional Information</h3>
//                         <div className="form-grid">
//                             <div className="popup-form-group">
//                                 <label>Specialization</label>
//                                 <input type="text" name="specialization" value={formData.specialization || ''} onChange={handleChange} required disabled={saving} />
//                             </div>
//                             <div className="popup-form-group">
//                                 <label>Department</label>
//                                 <input type="text" name="department" value={formData.department || ''} onChange={handleChange} required disabled={saving} />
//                             </div>
//                             <div className="popup-form-group">
//                                 <label>Experience</label>
//                                 <input type="text" name="experience" value={formData.experience || ''} onChange={handleChange} required disabled={saving} />
//                             </div>
//                             <div className="popup-form-group">
//                                 <label>License Number</label>
//                                 <input type="text" name="licenseNumber" value={formData.licenseNumber || ''} onChange={handleChange} required disabled={saving} />
//                             </div>
//                             <div className="popup-form-group">
//                                 <label>Qualifications</label>
//                                 <input type="text" name="qualifications" value={formData.qualifications || ''} onChange={handleChange} required disabled={saving} />
//                             </div>
//                             <div className="popup-form-group">
//                                 <label>Join Date</label>
//                                 <input type="date" name="joinDate" value={formData.joinDate || ''} onChange={handleChange} required disabled={saving} />
//                             </div>
//                         </div>

//                         <div className="popup-actions">
//                             <button type="button" className="cancel" onClick={handleCancel} disabled={saving}>Cancel</button>
//                             <button type="submit" className="confirm" disabled={saving}>
//                                 {saving ? 'Saving...' : '✅ Save Changes'}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// }

// const InfoItem = ({ label, value }) => (
//     <div className="info-item">
//         <p className="info-label">{label}</p>
//         <p className="info-value">{value || "Not provided"}</p>
//     </div>
// );

// export default Doctors;


import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import './Doctors.css';

function Doctors() {
    // ==================== STATE ====================
    const [doctorInfo, setDoctorInfo] = useState({
        name: "",
        specialization: "",
        department: "",
        phone: "",
        email: "",
        address: "",
        experience: "",
        licenseNumber: "",
        qualifications: "",
        joinDate: "",
        profilePhoto: null,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [photoPreview, setPhotoPreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    
    const fileInputRef = useRef(null);

    const API_URL = "http://localhost:8005/api";

    // ==================== FETCH DOCTOR DATA ====================
    useEffect(() => {
        fetchDoctorData();
    }, []);

    const fetchDoctorData = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Get all doctors first
            const response = await axios.get(`${API_URL}/doctors`);
            console.log("All doctors in database:", response.data);
            
            if (response.data.success && response.data.data) {
                const doctors = response.data.data;
                const targetEmail = "pranjal.patil@hospital.com";
                
                // Find doctor with matching email
                const doctor = doctors.find(doc => doc.email === targetEmail);
                
                if (doctor) {
                    console.log("Found doctor:", doctor);
                    // Format date for input field
                    if (doctor.joinDate) {
                        doctor.joinDate = doctor.joinDate.split('T')[0];
                    }
                    if (doctor.joiningDate) {
                        doctor.joinDate = doctor.joiningDate.split('T')[0];
                    }
                    setDoctorInfo(doctor);
                    setFormData(doctor);
                    setPhotoPreview(doctor.profilePhoto);
                } else {
                    // If doctor not found, check if there are any doctors
                    if (doctors.length > 0) {
                        // Use the first doctor as fallback
                        console.log("Using first available doctor as fallback");
                        const firstDoctor = doctors[0];
                        if (firstDoctor.joinDate) {
                            firstDoctor.joinDate = firstDoctor.joinDate.split('T')[0];
                        }
                        if (firstDoctor.joiningDate) {
                            firstDoctor.joinDate = firstDoctor.joiningDate.split('T')[0];
                        }
                        setDoctorInfo(firstDoctor);
                        setFormData(firstDoctor);
                        setPhotoPreview(firstDoctor.profilePhoto);
                    } else {
                        setError(`No doctors found in database. Please add a doctor first.`);
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching doctor:", error);
            setError(error.response?.data?.message || "Failed to load doctor data");
        } finally {
            setLoading(false);
        }
    };

    // Rest of your component remains the same...
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("❌ Please select an image file");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert("❌ Image size must be less than 5MB");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
                setFormData(prev => ({ ...prev, profilePhoto: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemovePhoto = () => {
        setPhotoPreview(null);
        setFormData(prev => ({ ...prev, profilePhoto: null }));
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        
        try {
            if (!doctorInfo._id) {
                throw new Error("Doctor ID not found");
            }
            
            const response = await axios.put(`${API_URL}/doctors/${doctorInfo._id}`, formData);
            
            if (response.data.success) {
                const updatedData = response.data.data;
                if (updatedData.joinDate) {
                    updatedData.joinDate = updatedData.joinDate.split('T')[0];
                }
                if (updatedData.joiningDate) {
                    updatedData.joinDate = updatedData.joiningDate.split('T')[0];
                }
                setDoctorInfo(updatedData);
                setIsEditing(false);
                alert("✅ Profile updated successfully!");
            }
        } catch (error) {
            console.error("Error updating doctor:", error);
            alert(error.response?.data?.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setFormData({ ...doctorInfo });
        setPhotoPreview(doctorInfo.profilePhoto);
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setFormData({ ...doctorInfo });
        setPhotoPreview(doctorInfo.profilePhoto);
        setIsEditing(true);
    };

    // Loading State
    if (loading) {
        return (
            <div className="appointments-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading profile...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="appointments-page">
                <div className="error-container">
                    <span className="error-icon">⚠️</span>
                    <h3>Error Loading Profile</h3>
                    <p>{error}</p>
                    <button onClick={fetchDoctorData} className="retry-btn">
                        🔄 Try Again
                    </button>
                </div>
            </div>
        );
    }

    const currentPhoto = doctorInfo.profilePhoto;

    return (
        <div className="appointments-page">
            <div className="page-header">
                <div>
                    <h1>👨‍⚕️ My Profile</h1>
                </div>
                {!isEditing && doctorInfo._id && (
                    <button className="add-btn" onClick={handleEditClick}>
                        ✏️ Edit Profile
                    </button>
                )}
            </div>

            {!isEditing ? (
                <>
                    <div className="dashboard-header" style={{ marginBottom: "30px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                            {currentPhoto ? (
                                <img
                                    src={currentPhoto}
                                    alt="Profile"
                                    style={{
                                        width: "80px", height: "80px", borderRadius: "50%",
                                        objectFit: "cover",
                                        border: "3px solid rgba(255,255,255,0.4)",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                                    }}
                                />
                            ) : (
                                <div style={{
                                    width: "80px", height: "80px", borderRadius: "50%",
                                    background: "rgba(255,255,255,0.2)", display: "flex",
                                    alignItems: "center", justifyContent: "center",
                                    fontSize: "32px", fontWeight: "700", color: "white",
                                    border: "3px solid rgba(255,255,255,0.3)"
                                }}>
                                    {doctorInfo.name?.split(" ")[1]?.charAt(0) || doctorInfo.name?.charAt(0) || "D"}
                                </div>
                            )}
                            <div>
                                <h1 style={{ color: "white", fontSize: "24px", margin: "0 0 4px" }}>{doctorInfo.name}</h1>
                                <p style={{ color: "rgba(255,255,255,0.9)", margin: "0 0 4px", fontSize: "16px", fontWeight: "600" }}>
                                    {doctorInfo.specialization}
                                </p>
                                <p style={{ color: "rgba(255,255,255,0.7)", margin: "0", fontSize: "14px" }}>
                                    {doctorInfo.department} Department
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="table-container" style={{ marginBottom: "24px" }}>
                        <div className="table-header">
                            <h3>📋 Personal Information</h3>
                        </div>
                        <div className="info-grid">
                            <InfoItem label="Full Name" value={doctorInfo.name} />
                            <InfoItem label="Phone" value={doctorInfo.phone} />
                            <InfoItem label="Email" value={doctorInfo.email} />
                            <InfoItem label="Address" value={doctorInfo.address} />
                        </div>
                    </div>

                    <div className="table-container">
                        <div className="table-header">
                            <h3>🏥 Professional Information</h3>
                        </div>
                        <div className="info-grid">
                            <InfoItem label="Specialization" value={doctorInfo.specialization} />
                            <InfoItem label="Department" value={doctorInfo.department} />
                            <InfoItem label="Experience" value={doctorInfo.experience} />
                            <InfoItem label="Join Date" value={doctorInfo.joinDate ? new Date(doctorInfo.joinDate).toLocaleDateString() : ''} />
                            <InfoItem label="License Number" value={doctorInfo.licenseNumber} />
                            <InfoItem label="Qualifications" value={doctorInfo.qualifications} />
                        </div>
                    </div>
                </>
            ) : (
                <div className="popup-card wide-popup">
                    <h2>✏️ Edit Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <h3>📷 Profile Photo</h3>
                        <div className="photo-upload-section">
                            <div className="photo-preview">
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Preview" />
                                ) : (
                                    <div className="preview-initials">
                                        {formData.name?.split(" ")[1]?.charAt(0) || formData.name?.charAt(0) || "D"}
                                    </div>
                                )}
                            </div>
                            <div className="upload-controls">
                                <p>JPG, PNG or GIF. Max 5MB</p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handlePhotoChange}
                                    accept="image/*"
                                    style={{ display: "none" }}
                                />
                                <div className="upload-buttons">
                                    <button type="button" className="choose-btn" onClick={() => fileInputRef.current.click()} disabled={saving}>
                                        📁 Choose Photo
                                    </button>
                                    {photoPreview && (
                                        <button type="button" className="remove-btn" onClick={handleRemovePhoto} disabled={saving}>
                                            🗑️ Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <h3>Personal Information</h3>
                        <div className="form-grid">
                            <div className="popup-form-group">
                                <label>Full Name</label>
                                <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required disabled={saving} />
                            </div>
                            <div className="popup-form-group">
                                <label>Phone</label>
                                <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} required disabled={saving} />
                            </div>
                            <div className="popup-form-group">
                                <label>Email</label>
                                <input type="email" name="email" value={formData.email || ''} onChange={handleChange} required disabled={saving} />
                            </div>
                            <div className="popup-form-group full-width">
                                <label>Address</label>
                                <input type="text" name="address" value={formData.address || ''} onChange={handleChange} required disabled={saving} />
                            </div>
                        </div>

                        <h3>Professional Information</h3>
                        <div className="form-grid">
                            <div className="popup-form-group">
                                <label>Specialization</label>
                                <input type="text" name="specialization" value={formData.specialization || ''} onChange={handleChange} required disabled={saving} />
                            </div>
                            <div className="popup-form-group">
                                <label>Department</label>
                                <input type="text" name="department" value={formData.department || ''} onChange={handleChange} required disabled={saving} />
                            </div>
                            <div className="popup-form-group">
                                <label>Experience</label>
                                <input type="text" name="experience" value={formData.experience || ''} onChange={handleChange} required disabled={saving} />
                            </div>
                            <div className="popup-form-group">
                                <label>License Number</label>
                                <input type="text" name="licenseNumber" value={formData.licenseNumber || ''} onChange={handleChange} required disabled={saving} />
                            </div>
                            <div className="popup-form-group">
                                <label>Qualifications</label>
                                <input type="text" name="qualifications" value={formData.qualifications || ''} onChange={handleChange} required disabled={saving} />
                            </div>
                            <div className="popup-form-group">
                                <label>Join Date</label>
                                <input type="date" name="joinDate" value={formData.joinDate || ''} onChange={handleChange} required disabled={saving} />
                            </div>
                        </div>

                        <div className="popup-actions">
                            <button type="button" className="cancel" onClick={handleCancel} disabled={saving}>Cancel</button>
                            <button type="submit" className="confirm" disabled={saving}>
                                {saving ? 'Saving...' : '✅ Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

const InfoItem = ({ label, value }) => (
    <div className="info-item">
        <p className="info-label">{label}</p>
        <p className="info-value">{value || "Not provided"}</p>
    </div>
);

export default Doctors;