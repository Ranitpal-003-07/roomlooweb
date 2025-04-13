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
      

    </>
  );
};

export default Profile;
