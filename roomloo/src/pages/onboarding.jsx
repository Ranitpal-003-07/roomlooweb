import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faCalendarAlt, 
  faMapMarkerAlt, 
  faHome, 
  faVenusMars, 
  faHeart, 
  faUtensils, 
  faBuilding,
  faArrowRight,
  faPlusCircle,
  faMinusCircle,
  faGraduationCap
} from '@fortawesome/free-solid-svg-icons';
import { 
  faInstagram, 
  faFacebook, 
  faGithub, 
  faTwitter, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';
import '../styles/onboarding.css';


const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    hometown: "",
    currentAddress: "",
    collegeName: "", // Added college name field
    socialLinks: {
      instagram: "",
      facebook: "",
      github: "",
      twitter: "",
      linkedin: ""
    },
    roomPreference: "",
    about: "",
    hobbies: [""],
    interests: [""],
    heartWays: [""],
    favoriteFoods: [""],
    currentHostel: ""
  });
  
  // Handle array field additions and removals
  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };
  
  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };
  
  // Handle changes for array fields
  const handleArrayChange = (field, index, value) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };
  
  // Handle changes for social links
  const handleSocialChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };
  
  // Handle regular field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Navigate between steps
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Final submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Remove empty array items
    const cleanedFormData = {
      ...formData,
      hobbies: formData.hobbies.filter(hobby => hobby.trim() !== ""),
      interests: formData.interests.filter(interest => interest.trim() !== ""),
      heartWays: formData.heartWays.filter(way => way.trim() !== ""),
      favoriteFoods: formData.favoriteFoods.filter(food => food.trim() !== "")
    };
    
    if (!user) {
      toast.error("User not logged in.");
      return;
    }
    
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        ...cleanedFormData,
        email: user.email,
        onboardingComplete: true,
        createdAt: new Date()
      });
      
      toast.success("Onboarding complete!");
      navigate("/profile");
    } catch (err) {
      toast.error("Failed to complete onboarding.");
      console.error(err);
    }
  };
  
  // Progress calculation
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="onboarding-container">
      {/* Progress Bar */}
      <div className="onboarding-progress-container">
        <div className="onboarding-progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="onboarding-header">
        <h1>Let's Build Your Profile</h1>
        <p>Step {currentStep} of {totalSteps}</p>
      </div>
      
      <form onSubmit={currentStep === totalSteps ? handleSubmit : e => { e.preventDefault(); nextStep(); }}>
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="onboarding-step-container">
            <h2>Basic Information</h2>
            
            <div className="onboarding-field">
              <label>
                <FontAwesomeIcon icon={faUser} /> Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="onboarding-row">
              <div className="onboarding-field">
                <label>
                  <FontAwesomeIcon icon={faCalendarAlt} /> Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Your age"
                  required
                />
              </div>
              
              <div className="onboarding-field">
                <label>
                  <FontAwesomeIcon icon={faVenusMars} /> Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="onboarding-field">
              <label>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Hometown
              </label>
              <input
                type="text"
                name="hometown"
                value={formData.hometown}
                onChange={handleChange}
                placeholder="Your hometown"
              />
            </div>
            
            <div className="onboarding-field">
              <label>
                <FontAwesomeIcon icon={faHome} /> Current Address
              </label>
              <textarea
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleChange}
                placeholder="Your current address"
                rows={3}
              />
            </div>
          </div>
        )}
        
        {/* Step 2: Social Media Links */}
        {currentStep === 2 && (
          <div className="onboarding-step-container">
            <h2>Connect Your Social Media</h2>
            <p>Help others connect with you</p>
            
            {/* College Name field added here */}
            <div className="onboarding-field">
              <label>
                <FontAwesomeIcon icon={faGraduationCap} /> College Name
              </label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                placeholder="Enter your college name"
              />
            </div>
            
            <div className="onboarding-field">
              <label>
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </label>
              <input
                type="url"
                value={formData.socialLinks.instagram}
                onChange={(e) => handleSocialChange("instagram", e.target.value)}
                placeholder="Instagram profile URL"
              />
            </div>
            
            <div className="onboarding-field">
              <label>
                <FontAwesomeIcon icon={faFacebook} /> Facebook
              </label>
              <input
                type="url"
                value={formData.socialLinks.facebook}
                onChange={(e) => handleSocialChange("facebook", e.target.value)}
                placeholder="Facebook profile URL"
              />
            </div>
            
            <div className="onboarding-field">
              <label>
                <FontAwesomeIcon icon={faTwitter} /> Twitter
              </label>
              <input
                type="url"
                value={formData.socialLinks.twitter}
                onChange={(e) => handleSocialChange("twitter", e.target.value)}
                placeholder="Twitter profile URL"
              />
            </div>
            
            <div className="onboarding-field">
              <label>
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
              </label>
              <input
                type="url"
                value={formData.socialLinks.linkedin}
                onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                placeholder="LinkedIn profile URL"
              />
            </div>
            
            <div className="onboarding-field">
              <label>
                <FontAwesomeIcon icon={faGithub} /> GitHub
              </label>
              <input
                type="url"
                value={formData.socialLinks.github}
                onChange={(e) => handleSocialChange("github", e.target.value)}
                placeholder="GitHub profile URL"
              />
            </div>
          </div>
        )}
        
        {/* Step 3: Roommate Preferences */}
        {currentStep === 3 && (
          <div className="onboarding-step-container">
            <h2>Roommate Preferences</h2>
            
            <div className="onboarding-field">
              <label>
                <FontAwesomeIcon icon={faVenusMars} /> Roommate Gender Preference
              </label>
              <select
                name="roomPreference"
                value={formData.roomPreference}
                onChange={handleChange}
                required
              >
                <option value="">Select Preference</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="no-preference">No Preference</option>
              </select>
            </div>
            
            <div className="onboarding-field">
              <label>
                <FontAwesomeIcon icon={faBuilding} /> Current Hostel/Accommodation (if any)
              </label>
              <input
                type="text"
                name="currentHostel"
                value={formData.currentHostel}
                onChange={handleChange}
                placeholder="Current hostel or accommodation"
              />
            </div>
            
            <div className="onboarding-field">
              <label>About You</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="Tell potential roommates about yourself..."
                rows={5}
              />
            </div>
          </div>
        )}
        
        {/* Step 4: Interests and Hobbies */}
        {currentStep === 4 && (
          <div className="onboarding-step-container">
            <h2>Interests & Hobbies</h2>
            
            <div className="onboarding-field">
              <div className="onboarding-field-header">
                <label>Hobbies</label>
                <button 
                  type="button" 
                  className="onboarding-add-btn"
                  onClick={() => addArrayItem("hobbies")}
                >
                  <FontAwesomeIcon icon={faPlusCircle} /> Add Hobby
                </button>
              </div>
              
              {formData.hobbies.map((hobby, index) => (
                <div key={`hobby-${index}`} className="onboarding-array-item">
                  <input
                    type="text"
                    value={hobby}
                    onChange={(e) => handleArrayChange("hobbies", index, e.target.value)}
                    placeholder="Enter a hobby"
                  />
                  {formData.hobbies.length > 1 && (
                    <button 
                      type="button" 
                      className="onboarding-remove-btn"
                      onClick={() => removeArrayItem("hobbies", index)}
                    >
                      <FontAwesomeIcon icon={faMinusCircle} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="onboarding-field">
              <div className="onboarding-field-header">
                <label>Interests</label>
                <button 
                  type="button" 
                  className="onboarding-add-btn"
                  onClick={() => addArrayItem("interests")}
                >
                  <FontAwesomeIcon icon={faPlusCircle} /> Add Interest
                </button>
              </div>
              
              {formData.interests.map((interest, index) => (
                <div key={`interest-${index}`} className="onboarding-array-item">
                  <input
                    type="text"
                    value={interest}
                    onChange={(e) => handleArrayChange("interests", index, e.target.value)}
                    placeholder="Enter an interest"
                  />
                  {formData.interests.length > 1 && (
                    <button 
                      type="button" 
                      className="onboarding-remove-btn"
                      onClick={() => removeArrayItem("interests", index)}
                    >
                      <FontAwesomeIcon icon={faMinusCircle} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Step 5: Personal Favorites */}
        {currentStep === 5 && (
          <div className="onboarding-step-container">
            <h2>Personal Favorites</h2>
            
            <div className="onboarding-field">
              <div className="onboarding-field-header">
                <label>
                  <FontAwesomeIcon icon={faHeart} /> Ways to Your Heart
                </label>
                <button 
                  type="button" 
                  className="onboarding-add-btn"
                  onClick={() => addArrayItem("heartWays")}
                >
                  <FontAwesomeIcon icon={faPlusCircle} /> Add
                </button>
              </div>
              
              {formData.heartWays.map((way, index) => (
                <div key={`way-${index}`} className="onboarding-array-item">
                  <input
                    type="text"
                    value={way}
                    onChange={(e) => handleArrayChange("heartWays", index, e.target.value)}
                    placeholder="What wins you over?"
                  />
                  {formData.heartWays.length > 1 && (
                    <button 
                      type="button" 
                      className="onboarding-remove-btn"
                      onClick={() => removeArrayItem("heartWays", index)}
                    >
                      <FontAwesomeIcon icon={faMinusCircle} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="onboarding-field">
              <div className="onboarding-field-header">
                <label>
                  <FontAwesomeIcon icon={faUtensils} /> Favorite Foods
                </label>
                <button 
                  type="button" 
                  className="onboarding-add-btn"
                  onClick={() => addArrayItem("favoriteFoods")}
                >
                  <FontAwesomeIcon icon={faPlusCircle} /> Add
                </button>
              </div>
              
              {formData.favoriteFoods.map((food, index) => (
                <div key={`food-${index}`} className="onboarding-array-item">
                  <input
                    type="text"
                    value={food}
                    onChange={(e) => handleArrayChange("favoriteFoods", index, e.target.value)}
                    placeholder="Enter a favorite food"
                  />
                  {formData.favoriteFoods.length > 1 && (
                    <button 
                      type="button" 
                      className="onboarding-remove-btn"
                      onClick={() => removeArrayItem("favoriteFoods", index)}
                    >
                      <FontAwesomeIcon icon={faMinusCircle} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="onboarding-actions">
          {currentStep > 1 && (
            <button 
              type="button" 
              className="onboarding-back-btn" 
              onClick={prevStep}
            >
              Back
            </button>
          )}
          
          <button 
            type="submit" 
            className="onboarding-next-btn"
          >
            {currentStep < totalSteps ? (
              <>Next <FontAwesomeIcon icon={faArrowRight} /></>
            ) : (
              'Complete Profile'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Onboarding;