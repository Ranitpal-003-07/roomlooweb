// RoommateCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RoommateCard.css";

const RoommateCard = ({ roommate }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${roommate.id}`);
  };

  return (
    <div className="roommate-card" onClick={handleClick}>
      <img src={roommate.image} alt={roommate.name} className="roommate-img" />
      <div className="roommate-info">
        <h3>{roommate.name}, {roommate.age}</h3>
        <p><strong>College:</strong> {roommate.college}</p>
        <p><strong>Gender:</strong> {roommate.gender}</p>
        <div className="match-percentage">
          Match: <span>{roommate.matchPercentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default RoommateCard;
