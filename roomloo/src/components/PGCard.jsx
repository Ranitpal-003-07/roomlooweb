import React from "react";
import "../styles/PGCard.css";

const PGCard = ({ pg, onClick }) => {
  return (
    <div className="pg-card" onClick={() => onClick(pg)}>
      <img src={pg.image} alt={pg.name} className="pg-image" />
      <div className="pg-info">
        <h3>{pg.name}</h3>
        <p><strong>Price:</strong> {pg.price}</p>
        <p><strong>Rating:</strong> {pg.rating}</p>
        <p><strong>Location:</strong> {pg.location}</p>
        <p><strong>Available Rooms:</strong> {pg.availableRooms}</p>
      </div>
    </div>
  );
};

export default PGCard;
