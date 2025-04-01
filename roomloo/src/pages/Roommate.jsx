/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaTimes } from "react-icons/fa";
import "../styles/RoommateFinder.css";

const roommates = [
  {
    id: 1,
    name: "Aarav Sharma",
    age: 22,
    college: "IIT Delhi",
    address: "New Delhi, India",
    email: "aarav.sharma@email.com",
    gender: "Male",
    preference: "Male Roommate",
    hobbies: ["Football", "Coding", "Gaming"],
    interests: ["AI", "Startups", "Music"],
    field: "Computer Science",
    image: "https://source.unsplash.com/400x500/?man,student",
    fallbackImage: "https://i.pravatar.cc/400?img=1",
  },
  {
    id: 2,
    name: "Meera Kapoor",
    age: 21,
    college: "Delhi University",
    address: "Delhi, India",
    email: "meera.kapoor@email.com",
    gender: "Female",
    preference: "Female Roommate",
    hobbies: ["Painting", "Reading", "Yoga"],
    interests: ["Psychology", "Travel", "Photography"],
    field: "Psychology",
    image: "https://source.unsplash.com/400x500/?woman,student",
    fallbackImage: "https://i.pravatar.cc/400?img=2",
  },
];

const RoommateFinder = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(roommates[0].fallbackImage);

  useEffect(() => {
    setFlipped(false);
    const fetchImage = async () => {
      try {
        const response = await fetch(roommates[currentIndex].image, { mode: "no-cors" });
        setImageUrl(response.url || roommates[currentIndex].fallbackImage);
      } catch {
        setImageUrl(roommates[currentIndex].fallbackImage);
      }
    };
    fetchImage();
  }, [currentIndex]);

  const handleAction = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % roommates.length);
      setFlipped(false);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="roommate-finder">
      <h2>Find Your Roommate</h2>

      <motion.div
        className="roommate-card-container"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="roommate-card-wrapper"
          animate={{
            rotateY: flipped ? 180 : 0,
            scale: [1, 1.03, 1], // Breathing animation
          }}
          transition={{
            duration: 0.5,
            rotateY: { duration: 0.5 },
            scale: { repeat: Infinity, repeatType: "reverse", duration: 2 }, // Continuous breathing effect
          }}
          onClick={() => setFlipped(!flipped)}
        >
          {/* Front Side */}
          <div className={`roommate-card ${flipped ? "hidden" : ""}`}>
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <img src={imageUrl} alt="Profile" className="profile-pic" />
            )}
            <h3>
              {roommates[currentIndex].name}, {roommates[currentIndex].age}
            </h3>
            <p>{roommates[currentIndex].college}</p>
          </div>

          {/* Back Side */}
          <div className={`roommate-card roommate-card-back ${!flipped ? "hidden" : ""}`}>
            <h3>{roommates[currentIndex].name}</h3>
            <p>
              <strong>Address:</strong> {roommates[currentIndex].address}
            </p>
            <p>
              <strong>Email:</strong> {roommates[currentIndex].email}
            </p>
            <p>
              <strong>Gender:</strong> {roommates[currentIndex].gender}
            </p>
            <p>
              <strong>Preference:</strong> {roommates[currentIndex].preference}
            </p>
            <p>
              <strong>Field of Study:</strong> {roommates[currentIndex].field}
            </p>
            <p>
              <strong>Hobbies:</strong> {roommates[currentIndex].hobbies.join(", ")}
            </p>
            <p>
              <strong>Interests:</strong> {roommates[currentIndex].interests.join(", ")}
            </p>
          </div>
        </motion.div>
      </motion.div>

      <div className="buttons">
        <motion.button className="skip-btn" onClick={handleAction} whileTap={{ scale: 1.2 }}>
          <FaTimes />
        </motion.button>

        <motion.button className="like-btn" onClick={handleAction} whileTap={{ scale: 1.2 }}>
          <FaHeart />
        </motion.button>
      </div>
    </div>
  );
};

export default RoommateFinder;
