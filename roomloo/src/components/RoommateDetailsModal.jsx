import React, { useEffect } from "react";
import { FaHeart, FaUtensils, FaHome, FaUser, FaSchool, FaMapMarkerAlt, FaInfo, FaUserFriends, FaGuitar } from "react-icons/fa";
import "../styles/RoommateModal.css";

const RoommateDetailsModal = ({ roommate, onClose }) => {
  const safeGet = (value) => (value ? value : "N/A");
  
  // Close modal when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Prevent background scrolling when modal is open
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling when modal is closed
    };
  }, []);
  
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {/* Header with profile image and basic info */}
        <div className="profile-header">
          <div className="profile-image-container">
            <img
              src={safeGet(roommate.image)}
              alt={roommate.name}
              className="profile-img"
            />
          </div>
          
          <div className="profile-title-info">
            <h1 className="profile-name">{roommate.name}</h1>
            <div className="profile-badges">
              <span className="badge badge-age">{roommate.age} years</span>
              <span className="badge badge-gender">{safeGet(roommate.gender)}</span>
            </div>
          </div>
        </div>
        
        {/* Main content grid */}
        <div className="profile-grid">
          {/* Education & Location */}
          <div className="grid-item education-location">
            <div className="card-header">
              <FaSchool className="section-icon" />
              <h3>Education</h3>
            </div>
            <p><strong>College:</strong> {safeGet(roommate.college)}</p>
            <div className="card-header location-header">
              <FaMapMarkerAlt className="section-icon" />
              <h3>Location</h3>
            </div>
            <p><strong>Address:</strong> {safeGet(roommate.address)}</p>
            <p><strong>Current Hostel:</strong> {safeGet(roommate.currentHostel)}</p>
          </div>
          
          {/* About Me */}
          <div className="grid-item about-me">
            <div className="card-header">
              <FaUser className="section-icon" />
              <h3>About Me</h3>
            </div>
            <p>{safeGet(roommate.about)}</p>
          </div>
          
          {/* Roommate Preferences */}
          <div className="grid-item roommate-preferences">
            <div className="card-header">
              <FaUserFriends className="section-icon" />
              <h3>Roommate Preferences</h3>
            </div>
            <p>{safeGet(roommate.preference)}</p>
          </div>
          
          {/* Hobbies & Interests */}
          <div className="grid-item hobbies-interests">
            <div className="card-header">
              <FaGuitar className="section-icon" />
              <h3>Hobbies & Interests</h3>
            </div>
            <div className="tags-container">
              {roommate.hobbies && roommate.hobbies.map((hobby, index) => (
                <span key={`hobby-${index}`} className="tag tag-hobby">{hobby}</span>
              ))}
              {roommate.interests && roommate.interests.map((interest, index) => (
                <span key={`interest-${index}`} className="tag tag-interest">{interest}</span>
              ))}
            </div>
          </div>
          
          {/* Way to Heart */}
          <div className="grid-item way-to-heart">
            <div className="card-header">
              <FaHeart className="section-icon" />
              <h3>Way to My Heart</h3>
            </div>
            <p>{safeGet(roommate.wayToHeart)}</p>
          </div>
          
          {/* Foods I Love */}
          <div className="grid-item foods-love">
            <div className="card-header">
              <FaUtensils className="section-icon" />
              <h3>Foods I Love</h3>
            </div>
            <div className="foods-container">
              {roommate.foodsLove && roommate.foodsLove.map((food, index) => (
                <span key={`food-${index}`} className="food-item">{food}</span>
              ))}
            </div>
          </div>
          
          {/* Contact */}
          <div className="grid-item contact-info">
            <div className="card-header">
              <FaInfo className="section-icon" />
              <h3>Contact</h3>
            </div>
            <p><strong>Email:</strong> {safeGet(roommate.email)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoommateDetailsModal;