import React, { useState, useEffect } from "react";
import { useBeds } from "./BedContext";
import "./BedManagement.css";

const BedManagement = () => {
  const { 
    beds, 
    loading, 
    addBed, 
    deleteBed, 
    updateBedStatus,
    getBedStats 
  } = useBeds();

  const [showForm, setShowForm] = useState(false);
  const [editingBed, setEditingBed] = useState(null);
  const [formData, setFormData] = useState({
    bedNumber: "",
    type: "General",
    status: "available",
    notes: ""
  });
  const [stats, setStats] = useState({ total: 0, available: 0, occupied: 0, maintenance: 0 });

  useEffect(() => {
    setStats(getBedStats());
  }, [beds, getBedStats]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const bedData = {
      id: editingBed ? editingBed.id : formData.bedNumber,
      bedNumber: formData.bedNumber,
      type: formData.type,
      status: formData.status,
      notes: formData.notes
    };

    const result = await addBed(bedData);
    
    if (result.success) {
      resetForm();
      setShowForm(false);
    }
  };

  const handleEdit = (bed) => {
    setEditingBed(bed);
    setFormData({
      bedNumber: bed.bedNumber || bed.id,
      type: bed.type,
      status: bed.status,
      notes: bed.notes || ""
    });
    setShowForm(true);
  };

  const handleDelete = async (bedId) => {
    if (window.confirm("Are you sure you want to delete this bed?")) {
      await deleteBed(bedId);
    }
  };

  const handleStatusChange = async (bed, newStatus) => {
    await updateBedStatus(bed.id || bed.bedNumber, newStatus);
  };

  const resetForm = () => {
    setEditingBed(null);
    setFormData({
      bedNumber: "",
      type: "General",
      status: "available",
      notes: ""
    });
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'available': return 'status-badge available';
      case 'occupied': return 'status-badge occupied';
      case 'maintenance': return 'status-badge maintenance';
      default: return 'status-badge';
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading beds...</div>;
  }

  return (
    <div className="bed-management-container">
      <div className="bed-management-header">
        <h2>
          <i className="fas fa-bed"></i> Bed Management
        </h2>
        <button 
          className="add-bed-btn"
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
        >
          <i className={`fas fa-${showForm ? 'times' : 'plus'}`}></i>
          {showForm ? 'Cancel' : 'Add New Bed'}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">
            <i className="fas fa-bed"></i>
          </div>
          <div className="stat-details">
            <h3>Total Beds</h3>
            <p className="stat-number">{stats.total}</p>
          </div>
        </div>
        <div className="stat-card available">
          <div className="stat-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-details">
            <h3>Available</h3>
            <p className="stat-number">{stats.available}</p>
          </div>
        </div>
        <div className="stat-card occupied">
          <div className="stat-icon">
            <i className="fas fa-user-injured"></i>
          </div>
          <div className="stat-details">
            <h3>Occupied</h3>
            <p className="stat-number">{stats.occupied}</p>
          </div>
        </div>
        <div className="stat-card maintenance">
          <div className="stat-icon">
            <i className="fas fa-tools"></i>
          </div>
          <div className="stat-details">
            <h3>Maintenance</h3>
            <p className="stat-number">{stats.maintenance}</p>
          </div>
        </div>
      </div>

      {/* Add/Edit Bed Form */}
      {showForm && (
        <div className="bed-form-container">
          <h3>{editingBed ? 'Edit Bed' : 'Add New Bed'}</h3>
          <form onSubmit={handleSubmit} className="bed-form">
            <div className="form-group">
              <label>Bed Number *</label>
              <input
                type="text"
                name="bedNumber"
                value={formData.bedNumber}
                onChange={handleInputChange}
                required
                placeholder="e.g., B21, ICU-01, etc."
                disabled={editingBed}
              />
            </div>

            <div className="form-group">
              <label>Bed Type</label>
              <select name="type" value={formData.type} onChange={handleInputChange}>
                <option value="General">General Ward</option>
                <option value="ICU">ICU</option>
                <option value="Emergency">Emergency</option>
                <option value="Private">Private</option>
                <option value="Semi-Private">Semi-Private</option>
              </select>
            </div>

            <div className="form-group">
              <label>Initial Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange}>
                <option value="available">Available</option>
                <option value="maintenance">Under Maintenance</option>
                <option value="occupied">Occupied (if transferring)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Notes (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any special notes about this bed..."
                rows="3"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                <i className="fas fa-save"></i>
                {editingBed ? 'Update Bed' : 'Add Bed'}
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
              >
                <i className="fas fa-times"></i>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Beds Table */}
      <div className="beds-table-container">
        <h3>All Beds</h3>
        <table className="beds-table">
          <thead>
            <tr>
              <th>Bed Number</th>
              <th>Type</th>
              <th>Status</th>
              <th>Patient</th>
              <th>Assigned Date</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {beds.map((bed) => (
              <tr key={bed.id || bed.bedNumber}>
                <td><strong>{bed.bedNumber || bed.id}</strong></td>
                <td>{bed.type}</td>
                <td>
                  <span className={getStatusBadgeClass(bed.status)}>
                    {bed.status}
                  </span>
                </td>
                <td>{bed.patient || '-'}</td>
                <td>{bed.assigned || '-'}</td>
                <td>{bed.notes || '-'}</td>
                <td className="action-buttons">
                  <button 
                    className="action-btn edit" 
                    onClick={() => handleEdit(bed)}
                    title="Edit Bed"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  
                  {bed.status === 'available' && (
                    <button 
                      className="action-btn maintain" 
                      onClick={() => handleStatusChange(bed, 'maintenance')}
                      title="Mark as Maintenance"
                    >
                      <i className="fas fa-tools"></i>
                    </button>
                  )}
                  
                  {bed.status === 'maintenance' && (
                    <button 
                      className="action-btn available" 
                      onClick={() => handleStatusChange(bed, 'available')}
                      title="Mark as Available"
                    >
                      <i className="fas fa-check-circle"></i>
                    </button>
                  )}
                  
                  <button 
                    className="action-btn delete" 
                    onClick={() => handleDelete(bed.id || bed.bedNumber)}
                    title="Delete Bed"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
            
            {beds.length === 0 && (
              <tr>
                <td colSpan="7" className="no-data">
                  <i className="fas fa-bed"></i>
                  <p>No beds found. Add your first bed!</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BedManagement;