/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldAlt, 
  faCheck, 
  faPen, 
  faPlus, 
  faEdit, 
  faTimes,
  faGlobe,
  faSave,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { 
  faLinkedinIn, 
  faGithub, 
  faInstagram, 
  faTwitter 
} from '@fortawesome/free-brands-svg-icons';
import '../styles/Profile.css';

// Import your existing Firebase config
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
  // User profile data state with default values aligned with Firestore structure
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    pronouns: "(He/Him)",
    age: "25",
    gender: "male",
    hometown: "Bangalore, India",
    collegeName: "National Institute of Technology",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A short intro about the user can go here.",
    roomPreference: "female",
    hobbies: [],
    interests: [],
    currentAddress: "221B Baker Street, London, United Kingdom",
    heartWays: [],
    favoriteFoods: [],
    currentHostel: "Hostel Phoenix",
    socialLinks: {
      linkedin: "",
      github: "",
      instagram: "",
      twitter: "",
      facebook: ""
    }
  });

  // Loading state
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Status state
  const [activeStatus, setActiveStatus] = useState('Needs Roommate');
  
  // Edit states for various sections
  const [editingName, setEditingName] = useState(false);
  const [editingAbout, setEditingAbout] = useState(false);
  const [editingPreference, setEditingPreference] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [editingHeartWays, setEditingHeartWays] = useState(false);
  const [editingHostel, setEditingHostel] = useState(false);
  const [editingBasicInfo, setEditingBasicInfo] = useState(false);
  const [editingCollege, setEditingCollege] = useState(false);
  
  // Temporary states for editing
  const [tempName, setTempName] = useState(userData.fullName);
  const [tempPronouns, setTempPronouns] = useState(userData.pronouns);
  const [tempAbout, setTempAbout] = useState(userData.about);
  const [tempPreference, setTempPreference] = useState(userData.roomPreference);
  const [tempAddress, setTempAddress] = useState(userData.currentAddress);
  const [tempAge, setTempAge] = useState(userData.age);
  const [tempGender, setTempGender] = useState(userData.gender);
  const [tempLocation, setTempLocation] = useState(userData.hometown);
  const [tempCollege, setTempCollege] = useState(userData.collegeName);
  const [tempHostel, setTempHostel] = useState(userData.currentHostel);
  
  // States for new items
  const [newHobby, setNewHobby] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [newFood, setNewFood] = useState('');
  const [newHeartTrait, setNewHeartTrait] = useState('');
  const [addingHobby, setAddingHobby] = useState(false);
  const [addingInterest, setAddingInterest] = useState(false);
  const [addingFood, setAddingFood] = useState(false);
  const [addingHeartTrait, setAddingHeartTrait] = useState(false);

  // Fetch user data from Firebase when component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        await fetchUserProfile(user.uid);
      } else {
        // No user is signed in
        setLoading(false);
        console.log("No user signed in");
        // You may want to redirect to login page here
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        // Set user data from Firestore
        const data = userDoc.data();
        setUserData(data);
        setActiveStatus(data.status || 'Needs Roommate');
        
        // Update all temp states with fetched data
        setTempName(data.fullName || '');
        setTempPronouns(data.pronouns || '');
        setTempAbout(data.about || '');
        setTempPreference(data.roomPreference || '');
        setTempAddress(data.currentAddress || '');
        setTempAge(data.age || '');
        setTempGender(data.gender || '');
        setTempLocation(data.hometown || '');
        setTempCollege(data.collegeName || '');
        setTempHostel(data.currentHostel || '');
      } else {
        // Create a new user profile if it doesn't exist
        await setDoc(userDocRef, { 
          ...userData, 
          status: activeStatus,
          createdAt: new Date(),
          email: auth.currentUser.email
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile in Firestore
  const updateUserProfile = async (updatedData) => {
    if (!userId) return;
    
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, updatedData);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Handler functions for editing operations with Firebase updates
  const handleSaveName = () => {
    const updatedData = {
      ...userData,
      fullName: tempName,
      pronouns: tempPronouns
    };
    
    setUserData(updatedData);
    updateUserProfile({ fullName: tempName, pronouns: tempPronouns });
    setEditingName(false);
  };

  const handleSaveBasicInfo = () => {
    const updatedData = {
      ...userData,
      age: tempAge,
      gender: tempGender,
      hometown: tempLocation
    };
    
    setUserData(updatedData);
    updateUserProfile({ age: tempAge, gender: tempGender, hometown: tempLocation });
    setEditingBasicInfo(false);
  };

  const handleSaveCollege = () => {
    const updatedData = {
      ...userData,
      collegeName: tempCollege
    };
    
    setUserData(updatedData);
    updateUserProfile({ collegeName: tempCollege });
    setEditingCollege(false);
  };

  const handleSaveAbout = () => {
    const updatedData = {
      ...userData,
      about: tempAbout
    };
    
    setUserData(updatedData);
    updateUserProfile({ about: tempAbout });
    setEditingAbout(false);
  };

  const handleSavePreference = () => {
    const updatedData = {
      ...userData,
      roomPreference: tempPreference
    };
    
    setUserData(updatedData);
    updateUserProfile({ roomPreference: tempPreference });
    setEditingPreference(false);
  };

  const handleSaveAddress = () => {
    const updatedData = {
      ...userData,
      currentAddress: tempAddress
    };
    
    setUserData(updatedData);
    updateUserProfile({ currentAddress: tempAddress });
    setEditingAddress(false);
  };

  const handleSaveHostel = () => {
    const updatedData = {
      ...userData,
      currentHostel: tempHostel
    };
    
    setUserData(updatedData);
    updateUserProfile({ currentHostel: tempHostel });
    setEditingHostel(false);
  };

  // Update status and save to Firebase
  const handleStatusChange = (status) => {
    setActiveStatus(status);
    updateUserProfile({ status });
  };

  // Functions to add new items with Firebase updates
  const addHobby = () => {
    if (newHobby.trim()) {
      const updatedHobbies = [...userData.hobbies, newHobby.trim()];
      setUserData(prev => ({
        ...prev,
        hobbies: updatedHobbies
      }));
      updateUserProfile({ hobbies: updatedHobbies });
      setNewHobby('');
      setAddingHobby(false);
    }
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      const updatedInterests = [...userData.interests, newInterest.trim()];
      setUserData(prev => ({
        ...prev,
        interests: updatedInterests
      }));
      updateUserProfile({ interests: updatedInterests });
      setNewInterest('');
      setAddingInterest(false);
    }
  };

  const addFood = () => {
    if (newFood.trim()) {
      const updatedFoods = [...userData.favoriteFoods, newFood.trim()];
      setUserData(prev => ({
        ...prev,
        favoriteFoods: updatedFoods
      }));
      updateUserProfile({ favoriteFoods: updatedFoods });
      setNewFood('');
      setAddingFood(false);
    }
  };

  const addHeartTrait = () => {
    if (newHeartTrait.trim()) {
      const updatedHeartWays = [...userData.heartWays, newHeartTrait.trim()];
      setUserData(prev => ({
        ...prev,
        heartWays: updatedHeartWays
      }));
      updateUserProfile({ heartWays: updatedHeartWays });
      setNewHeartTrait('');
      setAddingHeartTrait(false);
    }
  };

  // Functions to remove items with Firebase updates
  const removeHobby = (hobbyToRemove) => {
    const updatedHobbies = userData.hobbies.filter(hobby => hobby !== hobbyToRemove);
    setUserData(prev => ({
      ...prev,
      hobbies: updatedHobbies
    }));
    updateUserProfile({ hobbies: updatedHobbies });
  };

  const removeInterest = (interestToRemove) => {
    const updatedInterests = userData.interests.filter(interest => interest !== interestToRemove);
    setUserData(prev => ({
      ...prev,
      interests: updatedInterests
    }));
    updateUserProfile({ interests: updatedInterests });
  };

  const removeFood = (foodToRemove) => {
    const updatedFoods = userData.favoriteFoods.filter(food => food !== foodToRemove);
    setUserData(prev => ({
      ...prev,
      favoriteFoods: updatedFoods
    }));
    updateUserProfile({ favoriteFoods: updatedFoods });
  };

  const removeHeartTrait = (traitToRemove) => {
    const updatedHeartWays = userData.heartWays.filter(trait => trait !== traitToRemove);
    setUserData(prev => ({
      ...prev,
      heartWays: updatedHeartWays
    }));
    updateUserProfile({ heartWays: updatedHeartWays });
  };
  
  if (loading) {
    return <div className="pr-loading">Loading profile...</div>;
  }
  
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
          {!editingName ? (
            <>
              <h1 className="pr-user-name">{userData.fullName}</h1>
              <span className="pr-verified" title="Verified">
                <FontAwesomeIcon icon={faShieldAlt} className="pr-shield-icon" />
                <FontAwesomeIcon icon={faCheck} className="pr-check-icon" />
              </span>
              <p className="pr-pronouns">{userData.pronouns}</p>
              <button className="pr-edit-btn" title="Edit Profile" onClick={() => {
                setEditingName(true);
                setTempName(userData.fullName);
                setTempPronouns(userData.pronouns);
              }}>
                <FontAwesomeIcon icon={faPen} />
              </button>
            </>
          ) : (
            <div className="pr-edit-form">
              <input 
                type="text" 
                value={tempName} 
                onChange={(e) => setTempName(e.target.value)}
                className="pr-edit-input"
                placeholder="Name"
              />
              <input 
                type="text" 
                value={tempPronouns} 
                onChange={(e) => setTempPronouns(e.target.value)}
                className="pr-edit-input"
                placeholder="Pronouns"
              />
              <div className="pr-edit-actions">
                <button className="pr-save-btn" onClick={handleSaveName}>
                  <FontAwesomeIcon icon={faSave} />
                </button>
                <button className="pr-cancel-btn" onClick={() => setEditingName(false)}>
                  <FontAwesomeIcon icon={faTimesCircle} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
  
      {/* User Basic Info */}
      <div className="pr-info">
        <div className="pr-basic-info">
          {!editingBasicInfo ? (
            <>
              <div className="pr-info-row">
                <span className="pr-info-item">{userData.age}, {userData.gender}</span>
              </div>
              <div className="pr-info-row">
                <span className="pr-info-item">{userData.hometown}</span>
              </div>
              <button className="pr-edit-btn" onClick={() => {
                setEditingBasicInfo(true);
                setTempAge(userData.age);
                setTempGender(userData.gender);
                setTempLocation(userData.hometown);
              }}>
                <FontAwesomeIcon icon={faPen} />
              </button>
            </>
          ) : (
            <div className="pr-edit-form">
              <div className="pr-edit-row">
                <input 
                  type="text" 
                  value={tempAge} 
                  onChange={(e) => setTempAge(e.target.value)}
                  className="pr-edit-input-small"
                  placeholder="Age"
                />
                <input 
                  type="text" 
                  value={tempGender} 
                  onChange={(e) => setTempGender(e.target.value)}
                  className="pr-edit-input"
                  placeholder="Gender"
                />
              </div>
              <input 
                type="text" 
                value={tempLocation} 
                onChange={(e) => setTempLocation(e.target.value)}
                className="pr-edit-input"
                placeholder="Location"
              />
              <div className="pr-edit-actions">
                <button className="pr-save-btn" onClick={handleSaveBasicInfo}>
                  <FontAwesomeIcon icon={faSave} />
                </button>
                <button className="pr-cancel-btn" onClick={() => setEditingBasicInfo(false)}>
                  <FontAwesomeIcon icon={faTimesCircle} />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="pr-college">
          {!editingCollege ? (
            <>
              <img 
                src="/assets/bg3.jpg" 
                alt="College Logo" 
                className="pr-college-logo" 
              />
              <span className="pr-college-name">{userData.collegeName}</span>
              <button className="pr-edit-btn" onClick={() => {
                setEditingCollege(true);
                setTempCollege(userData.collegeName);
              }}>
                <FontAwesomeIcon icon={faPen} />
              </button>
            </>
          ) : (
            <div className="pr-edit-form">
              <input 
                type="text" 
                value={tempCollege} 
                onChange={(e) => setTempCollege(e.target.value)}
                className="pr-edit-input"
                placeholder="College"
              />
              <div className="pr-edit-actions">
                <button className="pr-save-btn" onClick={handleSaveCollege}>
                  <FontAwesomeIcon icon={faSave} />
                </button>
                <button className="pr-cancel-btn" onClick={() => setEditingCollege(false)}>
                  <FontAwesomeIcon icon={faTimesCircle} />
                </button>
              </div>
            </div>
          )}
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
            onClick={() => handleStatusChange(status)}
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
            {!editingAbout ? (
              <FontAwesomeIcon 
                icon={faEdit} 
                className="pr-edit-icon" 
                onClick={() => {
                  setEditingAbout(true);
                  setTempAbout(userData.about);
                }}
              />
            ) : null}
          </div>
          {!editingAbout ? (
            <p className="pr-about-text">
              {userData.about}
            </p>
          ) : (
            <div className="pr-edit-form">
              <textarea 
                value={tempAbout} 
                onChange={(e) => setTempAbout(e.target.value)}
                className="pr-edit-textarea"
                placeholder="About me"
              />
              <div className="pr-edit-actions">
                <button className="pr-save-btn" onClick={handleSaveAbout}>
                  <FontAwesomeIcon icon={faSave} />
                </button>
                <button className="pr-cancel-btn" onClick={() => setEditingAbout(false)}>
                  <FontAwesomeIcon icon={faTimesCircle} />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="pr-preference">
          <div className="pr-section-header">
            <h3>Preference</h3>
            {!editingPreference ? (
              <FontAwesomeIcon 
                icon={faEdit} 
                className="pr-edit-icon" 
                onClick={() => {
                  setEditingPreference(true);
                  setTempPreference(userData.roomPreference);
                }}
              />
            ) : null}
          </div>
          {!editingPreference ? (
            <p className="pr-preference-value">Prefers: {userData.roomPreference}</p>
          ) : (
            <div className="pr-edit-form">
              <select 
                value={tempPreference} 
                onChange={(e) => setTempPreference(e.target.value)}
                className="pr-edit-select"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="any">Any</option>
              </select>
              <div className="pr-edit-actions">
                <button className="pr-save-btn" onClick={handleSavePreference}>
                  <FontAwesomeIcon icon={faSave} />
                </button>
                <button className="pr-cancel-btn" onClick={() => setEditingPreference(false)}>
                  <FontAwesomeIcon icon={faTimesCircle} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
  
      {/* Content Layout */}
      <div className="pr-content-grid">
        {/* Hobbies Section */}
        <div className="pr-hobbies">
          <div className="pr-hobbies-header">
            <h3>Hobbies</h3>
            {!addingHobby ? (
              <button className="pr-add-btn" onClick={() => setAddingHobby(true)}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            ) : (
              <div className="pr-add-form">
                <input 
                  type="text" 
                  value={newHobby} 
                  onChange={(e) => setNewHobby(e.target.value)}
                  className="pr-add-input"
                  placeholder="New hobby"
                />
                <div className="pr-add-actions">
                  <button className="pr-save-btn" onClick={addHobby}>
                    <FontAwesomeIcon icon={faSave} />
                  </button>
                  <button className="pr-cancel-btn" onClick={() => setAddingHobby(false)}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="pr-hobby-list">
            {userData.hobbies && userData.hobbies.map(hobby => (
              <div key={hobby} className="pr-hobby-chip">
                {hobby}
                <span className="pr-remove-btn" onClick={() => removeHobby(hobby)}>
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
              {!addingInterest ? (
                <button className="pr-add-btn" onClick={() => setAddingInterest(true)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              ) : (
                <div className="pr-add-form">
                  <input 
                    type="text" 
                    value={newInterest} 
                    onChange={(e) => setNewInterest(e.target.value)}
                    className="pr-add-input"
                    placeholder="New interest"
                  />
                  <div className="pr-add-actions">
                    <button className="pr-save-btn" onClick={addInterest}>
                      <FontAwesomeIcon icon={faSave} />
                    </button>
                    <button className="pr-cancel-btn" onClick={() => setAddingInterest(false)}>
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="pr-capsule-container">
              {userData.interests && userData.interests.map(interest => (
                <span key={interest} className="pr-capsule">
                  {interest}
                  <span className="pr-remove-btn" onClick={() => removeInterest(interest)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </span>
              ))}
            </div>
          </div>
          <div className="pr-box">
            <div className="pr-box-header">
              <h4>Address</h4>
              {!editingAddress ? (
                <FontAwesomeIcon 
                  icon={faEdit} 
                  className="pr-edit-icon" 
                  onClick={() => {
                    setEditingAddress(true);
                    setTempAddress(userData.currentAddress);
                  }}
                />
              ) : null}
            </div>
            {!editingAddress ? (
              <p className="pr-address-text">{userData.currentAddress}</p>
            ) : (
              <div className="pr-edit-form">
                <textarea 
                  value={tempAddress} 
                  onChange={(e) => setTempAddress(e.target.value)}
                  className="pr-edit-textarea"
                  placeholder="Address"
                />
                <div className="pr-edit-actions">
                  <button className="pr-save-btn" onClick={handleSaveAddress}>
                    <FontAwesomeIcon icon={faSave} />
                  </button>
                  <button className="pr-cancel-btn" onClick={() => setEditingAddress(false)}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  
      {/* Favorites Section */}
      <div className="pr-favorites">
        <div className="pr-favorite-box">
          <div className="pr-box-header">
            <h4>Way to Your Heart</h4>
            {!addingHeartTrait ? (
              <button className="pr-add-btn" onClick={() => setAddingHeartTrait(true)}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            ) : (
              <div className="pr-add-form">
                <input 
                  type="text" 
                  value={newHeartTrait} 
                  onChange={(e) => setNewHeartTrait(e.target.value)}
                  className="pr-add-input"
                  placeholder="New trait"
                />
                <div className="pr-add-actions">
                  <button className="pr-save-btn" onClick={addHeartTrait}>
                    <FontAwesomeIcon icon={faSave} />
                  </button>
                  <button className="pr-cancel-btn" onClick={() => setAddingHeartTrait(false)}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="pr-food-tags">
            {userData.heartWays && userData.heartWays.map(trait => (
              <span key={trait} className="pr-food-tag">
                {trait}
                <span className="pr-remove-btn" onClick={() => removeHeartTrait(trait)}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </span>
            ))}
          </div>
        </div>
        <div className="pr-favorite-box">
          <div className="pr-box-header">
            <h4>Your Tummy Chargers</h4>
            {!addingFood ? (
              <button className="pr-add-btn" onClick={() => setAddingFood(true)}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            ) : (
              <div className="pr-add-form">
                <input 
                  type="text" 
                  value={newFood} 
                  onChange={(e) => setNewFood(e.target.value)}
                  className="pr-add-input"
                  placeholder="New food"
                />
                <div className="pr-add-actions">
                  <button className="pr-save-btn" onClick={addFood}>
                    <FontAwesomeIcon icon={faSave} />
                  </button>
                  <button className="pr-cancel-btn" onClick={() => setAddingFood(false)}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="pr-food-tags">
            {userData.favoriteFoods && userData.favoriteFoods.map(food => (
              <span key={food} className="pr-food-tag">
                {food}
                <span className="pr-remove-btn" onClick={() => removeFood(food)}>
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
        {!editingHostel ? (
          <>
            <h2 className="pr-hostel-name">{userData.currentHostel}</h2>
            <button className="pr-edit-btn" onClick={() => {
              setEditingHostel(true);
              setTempHostel(userData.currentHostel);
            }}>
              <FontAwesomeIcon icon={faPen} />
            </button>
          </>
        ) : (
          <div className="pr-edit-form">
            <input 
              type="text" 
              value={tempHostel} 
              onChange={(e) => setTempHostel(e.target.value)}
              className="pr-edit-input"
              placeholder="Hostel"
            />
            <div className="pr-edit-actions">
              <button className="pr-save-btn" onClick={handleSaveHostel}>
                <FontAwesomeIcon icon={faSave} />
              </button>
              <button className="pr-cancel-btn" onClick={() => setEditingHostel(false)}>
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;