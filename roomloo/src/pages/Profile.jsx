import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldAlt, 
  faCheck, 
  faPen, 
  faPlus, 
  faEdit, 
  faTimes,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import { 
  faLinkedinIn, 
  faGithub, 
  faInstagram, 
  faTwitter 
} from '@fortawesome/free-brands-svg-icons';

const Profile = () => {
  const [activeStatus, setActiveStatus] = useState('Needs Roommate');
  
  return (
    <div className="pr-container">
      {/* Header Section */}
      <div className="pr-header">
        <img src="/assets/bg2.jpg" alt="Cover" className="pr-cover-photo" />
        <div className="pr-photo-wrapper">
          <img src='/assets/bg1.jpg' alt="Profile" className="pr-profile-photo" />
        </div>
        <div className="pr-connect">
          <h4>Connect with me</h4>
          <div className="pr-social-icons">
            <button className="pr-icon-btn">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </button>
            <button className="pr-icon-btn">
              <FontAwesomeIcon icon={faGithub} />
            </button>
            <button className="pr-icon-btn">
              <FontAwesomeIcon icon={faInstagram} />
            </button>
            <button className="pr-icon-btn">
              <FontAwesomeIcon icon={faTwitter} />
            </button>
            <button className="pr-icon-btn">
              <FontAwesomeIcon icon={faGlobe} />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Header Info */}
      <div className="pr-header-info">
        <div className="pr-name-row">
          <h1 className="pr-user-name">John Doe</h1>
          <span className="pr-verified" title="Verified">
            <FontAwesomeIcon icon={faShieldAlt} className="pr-shield-icon" />
            <FontAwesomeIcon icon={faCheck} className="pr-check-icon" />
          </span>
          <p className="pr-pronouns">(He/Him)</p>
          <button className="pr-edit-btn" title="Edit Profile">
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
      </div>

      {/* User Basic Info */}
      <div className="pr-info">
        <div className="pr-basic-info">
          <div className="pr-info-row">
            <span className="pr-info-item">25, Male</span>
          </div>
          <div className="pr-info-row">
            <span className="pr-info-item">Bangalore, India</span>
          </div>
        </div>
        <div className="pr-college">
          <img 
            src="/assets/bg3.jpg" 
            alt="College Logo" 
            className="pr-college-logo" 
          />
          <span className="pr-college-name">National Institute of Technology</span>
        </div>
      </div>

      {/* Status Buttons */}
      <div className="pr-status">
        {[
          'Needs Roommate', 
          'Needs Place to Stay', 
          'Has Roommate', 
          'Has Place to Stay'
        ].map(status => (
          <button 
            key={status}
            className={`pr-status-btn ${activeStatus === status ? 'active' : ''}`}
            onClick={() => setActiveStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* About and Preference Section */}
      <div className="pr-about-section">
        <div className="pr-about">
          <div className="pr-section-header">
            <h3>About Me</h3>
            <FontAwesomeIcon icon={faEdit} className="pr-edit-icon" />
          </div>
          <p className="pr-about-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. A short intro about the user can go here.
          </p>
        </div>
        <div className="pr-preference">
          <div className="pr-section-header">
            <h3>Preference</h3>
            <FontAwesomeIcon icon={faEdit} className="pr-edit-icon" />
          </div>
          <p className="pr-preference-value">Prefers: Female</p>
        </div>
      </div>

      {/* Content Layout */}
      <div className="pr-content-grid">
        {/* Hobbies Section */}
        <div className="pr-hobbies">
          <div className="pr-hobbies-header">
            <h3>Hobbies</h3>
            <button className="pr-add-btn">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <div className="pr-hobby-list">
            {['Reading', 'Gaming', 'Cooking'].map(hobby => (
              <div key={hobby} className="pr-hobby-chip">
                {hobby}
                <span className="pr-remove-btn">
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section Boxes */}
        <div className="pr-right-content">
          <div className="pr-box">
            <div className="pr-box-header">
              <h4>Interests</h4>
              <button className="pr-add-btn">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className="pr-capsule-container">
              {['AI', 'Music', 'Photography'].map(interest => (
                <span key={interest} className="pr-capsule">
                  {interest}
                  <span className="pr-remove-btn">
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </span>
              ))}
            </div>
          </div>
          <div className="pr-box">
            <div className="pr-box-header">
              <h4>Address</h4>
              <FontAwesomeIcon icon={faEdit} className="pr-edit-icon" />
            </div>
            <p className="pr-address-text">221B Baker Street, London, United Kingdom</p>
          </div>
        </div>
      </div>

      {/* Favorites Section */}
      <div className="pr-favorites">
        <div className="pr-favorite-box">
          <div className="pr-box-header">
            <h4>Way to Your Heart</h4>
            <FontAwesomeIcon icon={faEdit} className="pr-edit-icon" />
          </div>
          <div className="pr-food-tags">
            {['Kindness', 'Humor', 'Intelligence', 'Loyalty'].map(trait => (
              <span key={trait} className="pr-food-tag">
                {trait}
              </span>
            ))}
          </div>
        </div>
        <div className="pr-favorite-box">
          <div className="pr-box-header">
            <h4>Your Tummy Chargers</h4>
            <button className="pr-add-btn">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <div className="pr-food-tags">
            {['Pizza', 'Biryani', 'Ice Cream', 'Pasta'].map(food => (
              <span key={food} className="pr-food-tag">
                {food}
                <span className="pr-remove-btn">
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Current Hostel */}
      <div className="pr-hostel">
        <h4>Current Hostel</h4>
        <h2 className="pr-hostel-name">Hostel Phoenix</h2>
      </div>
    </div>
  );
};

export default Profile;