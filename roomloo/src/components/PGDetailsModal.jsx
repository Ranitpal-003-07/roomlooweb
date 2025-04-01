import React from "react";
import "../styles/PGDetailsModal.css";

const PGDetailsModal = ({ pg, onClose }) => {
  if (!pg) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <img src={pg.image} alt={pg.name} className="modal-image" />
        <h2>{pg.name}</h2>
        <p><strong>Price:</strong> {pg.price}</p>
        <p><strong>Rating:</strong> {pg.rating}</p>
        <p><strong>Location:</strong> {pg.location}</p>
        <p><strong>Available Rooms:</strong> {pg.availableRooms}</p>
        <p><strong>Rent:</strong> {pg.rent}</p>
        <p><strong>Electricity Charge:</strong> {pg.electricityCharge}</p>
        <p><strong>Water Bill:</strong> {pg.waterBill}</p>
        <p><strong>AC:</strong> {pg.ac ? "Yes" : "No"}</p>
        <p><strong>Amenities:</strong> {pg.amenities.join(", ")}</p>
      </div>
    </div>
  );
};

export default PGDetailsModal;
