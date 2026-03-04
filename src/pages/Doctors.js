import React, { useState } from 'react';
import './Doctors.css';

const Doctors = () => {
  // Mock data for doctors
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'pranjal patil',
      specialization: 'Cardiologist',
      patients: 45,
      status: 'Available',
      experience: '12 years',
      qualification: 'MD, DM Cardiology',
      image: 'https://via.placeholder.com/100'
    },

  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    experience: '',
    qualification: '',
    status: 'Available'
  });

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Add new doctor
  const handleAddDoctor = () => {
    if (editingDoctor) {
      // Update existing doctor
      setDoctors(doctors.map(doc =>
        doc.id === editingDoctor.id ? { ...doc, ...formData } : doc
      ));
    } else {
      // Add new doctor
      const newDoctor = {
        id: doctors.length + 1,
        ...formData,
        patients: 0,
        image: 'https://via.placeholder.com/100'
      };
      setDoctors([...doctors, newDoctor]);
    }
    setShowForm(false);
    setEditingDoctor(null);
    setFormData({
      name: '',
      specialization: '',
      experience: '',
      qualification: '',
      status: 'Available'
    });
  };

  // Edit doctor
  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      experience: doctor.experience,
      qualification: doctor.qualification,
      status: doctor.status
    });
    setShowForm(true);
  };

  // Delete doctor
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      setDoctors(doctors.filter(doc => doc.id !== id));
    }
  };

  return (
    <div className="doctors-page">
      <div className="page-header">
        <h2>Doctors Management</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add New Doctor
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleAddDoctor(); }}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Specialization:</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Experience:</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Qualification:</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="In Surgery">In Surgery</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn" onClick={() => {
                  setShowForm(false);
                  setEditingDoctor(null);
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Doctors Grid */}
      <div className="doctors-grid">
        {doctors.map(doctor => (
          <div key={doctor.id} className="doctor-card card">
            <div className="doctor-image">
              <img src={doctor.image} alt={doctor.name} />
            </div>
            <div className="doctor-info">
              <h3>{doctor.name}</h3>
              <p className="specialization">{doctor.specialization}</p>
              <p className="qualification">{doctor.qualification}</p>
              <p className="experience">{doctor.experience}</p>
              <div className="doctor-stats">
                <span className="patients-count">
                  👥 {doctor.patients} patients
                </span>
                <span className={`status-badge status-${doctor.status.toLowerCase().replace(' ', '-')}`}>
                  {doctor.status}
                </span>
              </div>
            </div>
            <div className="doctor-actions">
              <button className="btn-icon" onClick={() => handleEdit(doctor)}>✏️</button>
              <button className="btn-icon" onClick={() => handleDelete(doctor.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;