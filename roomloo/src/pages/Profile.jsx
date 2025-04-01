/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import "../styles/Profile.css";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { db, storage } from "../firebase"; 
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Profile = () => {
  const detailsRef = useRef(null);
  const { user } = useAuth(); // Get logged-in user

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    preference: "",
    address: "",
    college: "",
    field: "",
    hobbies: "",
    interests: "",
    profilePic: "", // Add profile picture URL
  });

  // Fetch user data from Firestore
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
  
        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData({
            ...data,
            profilePic: data.profilePic || user.photoURL || "/assets/usr1.jpg",
          });
        } else {
          // First-time login: Use Google profile picture or default
          const defaultData = {
            name: user.displayName || "Your Name",
            email: user.email,
            age: "Not Set",
            gender: "Not Set",
            preference: "Not Set",
            address: "Not Set",
            college: "Not Set",
            field: "Not Set",
            hobbies: "Not Set",
            interests: "Not Set",
            profilePic: user.photoURL || "/assets/default-profile.png",
          };
  
          await setDoc(userRef, defaultData);
          setUserData(defaultData);
        }
      };
  
      fetchUserData();
    }
  }, [user]);
  

  // Handle input change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `profile_pictures/${user.uid}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    // Update Firestore with new profile picture URL
    setUserData((prev) => ({ ...prev, profilePic: imageUrl }));
    await updateDoc(doc(db, "users", user.uid), { profilePic: imageUrl });
  };

  // Save updated user details
  const handleSave = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, userData);
      setIsEditing(false);
    }
  };

  // Scroll to details section
  const handleScroll = () => {
    detailsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="glitter-bg">
        {/* Rotating Profile Card */}
        <motion.div
          className="rotating-card"
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          onClick={handleScroll}
        >
          {/* Profile Image with Upload Option */}
          <div className="profile-image">
            <img src={userData.profilePic || "/assets/usr1.jpg"} alt="User" />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="upload-btn" />
          </div>

          {/* Minimal Profile Info */}
          <div className="profile-info">
            <h2>{userData.name}</h2>
            <p><strong>Email:</strong> {userData.email}</p>
          </div>
        </motion.div>
      </div>

      <div className="user-details-container">
        <div className="user-details" ref={detailsRef}>
          <h2>User Details</h2>

          {isEditing ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={userData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" value={userData.email} disabled />
              </div>
              <div className="form-group">
                <label>Age:</label>
                <input type="number" name="age" value={userData.age} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Gender:</label>
                <select name="gender" value={userData.gender} onChange={handleChange}>
                  <option value="Not Set">Not Set</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Preference:</label>
                <select name="preference" value={userData.preference} onChange={handleChange}>
                  <option value="Not Set">Not Set</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Any">Any</option>
                </select>
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input type="text" name="address" value={userData.address} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>College:</label>
                <input type="text" name="college" value={userData.college} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Field of Study:</label>
                <input type="text" name="field" value={userData.field} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Hobbies:</label>
                <input type="text" name="hobbies" value={userData.hobbies} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Interests:</label>
                <input type="text" name="interests" value={userData.interests} onChange={handleChange} />
              </div>
              <button className="save-btn" onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div className="user-info">
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Age:</strong> {userData.age}</p>
              <p><strong>Gender:</strong> {userData.gender}</p>
              <p><strong>Preference:</strong> {userData.preference}</p>
              <p><strong>Address:</strong> {userData.address}</p>
              <p><strong>College:</strong> {userData.college}</p>
              <p><strong>Field of Study:</strong> {userData.field}</p>
              <p><strong>Hobbies:</strong> {userData.hobbies}</p>
              <p><strong>Interests:</strong> {userData.interests}</p>
              <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
