import '../styles/Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';





const Profile = () => {
  return (
    <>
      <div className="profile-page-container">
      <div className="profile-header">
        <img src="/assets/bg2.jpg" alt="Cover" className="cover-photo" />
        <div className="profile-photo-wrapper">
          <img src='/assets/bg1.jpg' alt="Profile" className="profile-photo" />
        </div>
      </div>
      <div className="connect-with-me">
        <h4>Connect with me</h4>
        <div className="social-icons">
          <button className="icon-btn"><i className="fab fa-linkedin-in"></i></button>
          <button className="icon-btn"><i className="fab fa-github"></i></button>
          <button className="icon-btn"><i className="fab fa-instagram"></i></button>
          <button className="icon-btn"><i className="fab fa-twitter"></i></button>
          <button className="icon-btn"><i className="fas fa-globe"></i></button>
        </div>
      </div>
      <div className="profile-header-left">
        <div className="profile-name-row">
          <h2 className="user-name">John Doe</h2>
          <span className="verified-icon" title="Verified">
            <FontAwesomeIcon icon={faShieldAlt} className="shield-icon" />
            <FontAwesomeIcon icon={faCheck} className="check-icon" />
          </span>
          <p className="user-pronouns">(He/Him)</p>
          <button className="edit-btn" title="Edit Profile">
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
      </div>
      <div className="infoooo">
        <div className="profile-basic-info">
          {/* First Row: Age and Gender */}
          <div className="info-row">
            <div className="info-item">
              <span>25,</span> {/* Replace with dynamic value later */}          
              <span>Male</span> {/* Replace with dynamic value later */}
            </div>
          </div>
          <div className="info-row">
            <div className="info-item">
              <span>Bangalore, India</span> {/* Replace with dynamic value later */}
            </div>
          </div>
        </div>
        <div className="college-section">
          <img
            src="/assets/bg3.jpg" // Replace with actual logo URL or dynamic path
            alt="College Logo"
            className="college-logo"
          />
          <div className="college-name">National Institute of Technology</div>
        </div>
      </div>
      </div>
      <div className="status-container">
        <button className="status-btn">Needs Roommate</button>
        <button className="status-btn">Needs Place to Stay</button>
        <button className="status-btn">Has Roommate</button>
        <button className="status-btn">Has Place to Stay</button>
      </div>
      <div className="about-preference-section">
        {/* About Me Section */}
        <div className="about-me">
          <div className="section-header">
            <h3>About Me</h3>
            <i className="fas fa-edit edit-icon"></i>
          </div>
          <p className="about-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. A short intro about the user can go here.
          </p>
        </div>

        {/* Gender Preference Section */}
        <div className="gender-preference">
          <div className="section-header">
            <h3>Preference</h3>
            <i className="fas fa-edit edit-icon"></i>
          </div>
          <p className="preference-value">Prefers: Female</p>
        </div>
      </div>
      <div className="thirty-seventy-container">
        <div className="left-section">
          <div className="hobbies-header">
            <h3>Hobbies</h3>
            <button className="add-hobby-btn">
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <div className="hobby-list">
            <div className="hobby-chip">
              Reading <span className="remove-btn">&times;</span>
            </div>
            <div className="hobby-chip">
              Gaming <span className="remove-btn">&times;</span>
            </div>
            <div className="hobby-chip">
              Cooking <span className="remove-btn">&times;</span>
            </div>
          </div>
        </div>
        <div className="right-section">
          {/* Interests Section */}
          <div className="interests-box">
            <div className="box-header">
              <h4>Interests</h4>
              <button className="add-icon"><i className="fas fa-plus"></i></button>
            </div>
            <div className="capsule-container">
              <span className="capsule">AI <span className="remove-btn">&times;</span></span>
              <span className="capsule">Music <span className="remove-btn">&times;</span></span>
              <span className="capsule">Photography <span className="remove-btn">&times;</span></span>
            </div>
          </div>

          {/* Address Section */}
          <div className="address-box">
          <div className="section-header">
            <h4>Address</h4>
            <i className="fas fa-edit edit-icon"></i>
          </div>
            <p>221B Baker Street, London, United Kingdom</p>
          </div>
        </div>
      </div>
      <div className="favorites-section">
        <div className="favorite-box">
          <div className="box-header">
            <h4>Way to Your Heart</h4>
            <i className="fas fa-edit edit-icon"></i>
          </div>
          <div className="descpt">
            
          </div>
        </div>

        <div className="favorite-box">
          <div className="box-header">
            <h4>Your Tummy Chargers</h4>
            <i className="fas fa-plus add-icon"></i>
          </div>
          <div className="food-tags">
            <span className="food-tag">Pizza <button className="remove-btn">×</button></span>
            <span className="food-tag">Biryani <button className="remove-btn">×</button></span>
          </div>
        </div>
      </div>
      <div className="current-hostel-container">
        <h4>Current Hostel</h4>
        <p className="hostel-name">Hostel Phoenix</p>
      </div>

    </>
  );
};

export default Profile;