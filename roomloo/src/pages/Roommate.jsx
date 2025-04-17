import React, { useState } from "react";
import "../styles/RoommateFinder.css";
import RoommateCard from "../components/RoommateCard";
import { FaSearch, FaFilter, FaMapMarkerAlt, FaUniversity, FaVenusMars, FaUtensils, FaBookOpen, FaSmoking, FaWineGlass, FaHome, FaPray } from "react-icons/fa";

const RoommateFinder = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const roommates = [
    {
      id: 1,
      name: "Aarav Sharma",
      age: 22,
      college: "IIT Delhi",
      gender: "Male",
      matchPercentage: 92,
      image: "https://source.unsplash.com/300x400/?man,student",
      about: "I'm a final year Computer Science student who loves coding and playing guitar. Looking for a roommate who respects personal space.",
      preference: "Male roommate who is clean and organized",
      address: "Hauz Khas, New Delhi",
      currentHostel: "Nilgiri Hostel",
      hobbies: ["Guitar", "Coding", "Chess", "Hiking"],
      interests: ["AI/ML", "Web Development", "Music"],
      wayToHeart: "Deep conversations about technology and innovation",
      foodsLove: ["Butter Chicken", "Biryani", "Chocolate"],
      email: "aarav.sharma@gmail.com",
      field: "Computer Science",
    },
    {
      id: 2,
      name: "Meera Kapoor",
      age: 21,
      college: "Delhi University",
      gender: "Female",
      matchPercentage: 87,
      image: "https://source.unsplash.com/300x400/?woman,student",
      about: "I'm a Literature major who loves reading and writing poetry. I'm looking for a female roommate who's quiet and respects study time.",
      preference: "Female roommate who is a non-smoker",
      address: "North Campus, Delhi University",
      currentHostel: "Meghdoot Hostel",
      hobbies: ["Reading", "Writing", "Photography", "Yoga"],
      interests: ["Classic Literature", "Film", "Art"],
      wayToHeart: "Discussing books and poetry",
      foodsLove: ["Paneer Tikka", "Pasta", "Ice Cream"],
      email: "meera.kapoor@du.ac.in",
      field: "English Literature",
    },
    {
      id: 3,
      name: "Kabir Malhotra",
      age: 23,
      college: "NSIT Delhi",
      gender: "Male",
      matchPercentage: 95,
      image: "https://source.unsplash.com/300x400/?youngman,college",
      about: "Engineering graduate pursuing MBA. I'm sporty, organized and prefer keeping common areas clean.",
      preference: "Male roommate who is into sports",
      address: "Dwarka, New Delhi",
      currentHostel: "Vindhya Hostel",
      hobbies: ["Cricket", "Football", "Gym", "Swimming"],
      interests: ["Business", "Sports", "Technology"],
      wayToHeart: "Playing sports together or watching matches",
      foodsLove: ["Chicken Tikka", "Noodles", "Protein Shakes"],
      email: "kabir.malhotra@nsit.ac.in",
      field: "MBA",
    },
    {
      id: 4,
      name: "Ananya Singh",
      age: 20,
      college: "Lady Shri Ram College",
      gender: "Female",
      matchPercentage: 90,
      image: "https://source.unsplash.com/300x400/?girl,student",
      about: "Psychology student interested in art and music. I'm looking for someone who appreciates creativity.",
      preference: "Female roommate who is artsy and creative",
      address: "South Campus, Delhi University",
      currentHostel: "Kaveri Hostel",
      hobbies: ["Painting", "Singing", "Dancing", "Cooking"],
      interests: ["Psychology", "Music", "Art Therapy"],
      wayToHeart: "Creating art together or attending music events",
      foodsLove: ["Dal Makhani", "Momos", "Cheesecake"],
      email: "ananya.singh@lsr.du.ac.in",
      field: "Psychology",  
    },
    {
      id: 5,
      name: "Rohan Verma",
      age: 22,
      college: "Jamia Millia Islamia",
      gender: "Male",
      matchPercentage: 88,
      image: "https://source.unsplash.com/300x400/?male,college",
      about: "Mass Communication student passionate about filmmaking and photography. Looking for a creative environment.",
      preference: "Anyone who respects my equipment and late-night editing sessions",
      address: "Okhla, New Delhi",
      currentHostel: "Ganga Hostel",
      hobbies: ["Filmmaking", "Photography", "Traveling", "Blogging"],
      interests: ["Cinema", "Documentaries", "Social Media"],
      wayToHeart: "Discussing films and sharing creative ideas",
      foodsLove: ["Kebabs", "Pizza", "Cold Coffee"],
      email: "rohan.verma@jmi.ac.in",
      field: "Mass Communication",
    },
    {
      id: 6,
      name: "Simran Kaur",
      age: 21,
      college: "Miranda House",
      gender: "Female",
      matchPercentage: 91,
      image: "https://source.unsplash.com/300x400/?female,college",
      about: "Economics honors student who loves debating and playing the piano. I'm organized and prefer a clean living space.",
      preference: "Female roommate who is studious and clean",
      address: "North Campus, Delhi University",
      currentHostel: "Yamuna Hostel",
      hobbies: ["Piano", "Debating", "Running", "Baking"],
      interests: ["Economics", "Politics", "Classical Music"],
      wayToHeart: "Intellectual debates and music sessions",
      foodsLove: ["Rajma Chawal", "Sushi", "Tiramisu"],
      email: "simran.kaur@mirandahouse.ac.in",
      field: "Economics",
    }
  ];

  

  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="roommate-page">
      {/* Search & Filter Header */}
      <div className="roommate-header">
        <h1>Find Your Perfect Roommate</h1>
        <div className="search-filter-container">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by name, college or location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className={`filters-toggle ${isFilterVisible ? 'active' : ''}`} 
            onClick={toggleFilters}
          >
            <FaFilter />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="roommate-content">
        {/* Left Side - Results */}
        <div className="roommate-left">
          <div className="results-header">
            <h2>Matching Roommates</h2>
            <span className="results-count">{roommates.length} results</span>
          </div>
          <div className="roommate-grid">
            {roommates.map((roommate) => (
              <div 
                key={roommate.id} 
              >
                <RoommateCard roommate={roommate} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Filters */}
        <div className={`roommate-right ${isFilterVisible ? 'visible' : ''}`}>
          <div className="roommate-filters">
            <div className="filter-header">
              <h3 className="filter-title">Filter Roommates</h3>
              <button className="clear-filters">Clear All</button>
            </div>

            <div className="filter-group location-filter">
              <div className="filter-group-header">
                <FaMapMarkerAlt className="filter-icon" />
                <h4>Location</h4>
              </div>
              <input type="text" placeholder="Search locations..." className="filter-search" />
            </div>

            <div className="filter-group college-filter">
              <div className="filter-group-header">
                <FaUniversity className="filter-icon" />
                <h4>College</h4>
              </div>
              <input
                type="text"
                placeholder="Search colleges..."
                className="filter-search"
              />
              <div className="college-checkboxes">
                {[
                  "IIT Delhi",
                  "Delhi University",
                  "Jamia Millia Islamia",
                  "NSUT",
                  "IIIT Delhi",
                  "DTU",
                  "Ambedkar University",
                  "IP University",
                  "JNU",
                  "AIIMS Delhi",
                  "Hansraj College",
                  "Lady Shri Ram College",
                  "Shri Ram College of Commerce",
                  "St. Stephen's College",
                  "Miranda House"
                ].map((college, idx) => (
                  <label key={idx} className="checkbox-label">
                    <input type="checkbox" className="styled-checkbox" />
                    <span className="checkbox-text">{college}</span>
                  </label>
                ))}
                <button className="show-more-btn">Show more</button>
              </div>
            </div>

            <div className="filter-group accommodation-filter">
              <div className="filter-group-header">
                <FaHome className="filter-icon" />
                <h4>Accommodation</h4>
              </div>
              <label className="toggle-label">
                <input type="checkbox" className="styled-checkbox" />
                <span className="checkbox-text">Has PG Available</span>
              </label>
            </div>

            <div className="filter-group religion-filter">
              <div className="filter-group-header">
                <FaPray className="filter-icon" />
                <h4>Religion</h4>
              </div>
              <div className="checkbox-grid">
                {["Hindu", "Muslim", "Christian", "Others"].map((religion, idx) => (
                  <label key={idx} className="checkbox-label">
                    <input type="checkbox" className="styled-checkbox" />
                    <span className="checkbox-text">{religion}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group gender-filter">
              <div className="filter-group-header">
                <FaVenusMars className="filter-icon" />
                <h4>Gender</h4>
              </div>
              <div className="checkbox-grid">
                {["Male", "Female", "Other"].map((gender, idx) => (
                  <label key={idx} className="checkbox-label">
                    <input type="checkbox" className="styled-checkbox" />
                    <span className="checkbox-text">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group preference-filter">
              <div className="filter-group-header">
                <FaVenusMars className="filter-icon" />
                <h4>Roommate Preference</h4>
              </div>
              <div className="checkbox-grid">
                {["Male", "Female", "Any"].map((pref, idx) => (
                  <label key={idx} className="checkbox-label">
                    <input type="checkbox" className="styled-checkbox" />
                    <span className="checkbox-text">{pref}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group food-filter">
              <div className="filter-group-header">
                <FaUtensils className="filter-icon" />
                <h4>Food Preference</h4>
              </div>
              <div className="checkbox-grid">
                {["Vegetarian", "Non-Vegetarian", "Eggetarian"].map((food, idx) => (
                  <label key={idx} className="checkbox-label">
                    <input type="checkbox" className="styled-checkbox" />
                    <span className="checkbox-text">{food}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group field-filter">
              <div className="filter-group-header">
                <FaBookOpen className="filter-icon" />
                <h4>Field of Study</h4>
              </div>
              <div className="checkbox-grid">
                {["Computer Science", "Engineering", "Arts", "Medical", "Business", "Science"].map((field, idx) => (
                  <label key={idx} className="checkbox-label">
                    <input type="checkbox" className="styled-checkbox" />
                    <span className="checkbox-text">{field}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group habits-filter">
              <div className="filter-group-header">
                <FaSmoking className="filter-icon" />
                <h4>Smoking Habits</h4>
              </div>
              <div className="checkbox-grid">
                {["Smoker", "Non-Smoker"].map((habit, idx) => (
                  <label key={idx} className="checkbox-label">
                    <input type="checkbox" className="styled-checkbox" />
                    <span className="checkbox-text">{habit}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group alcohol-filter">
              <div className="filter-group-header">
                <FaWineGlass className="filter-icon" />
                <h4>Alcohol Preference</h4>
              </div>
              <div className="checkbox-grid">
                {["Drinks", "Non-Drinker"].map((alcohol, idx) => (
                  <label key={idx} className="checkbox-label">
                    <input type="checkbox" className="styled-checkbox" />
                    <span className="checkbox-text">{alcohol}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="apply-filters-btn">Apply Filters</button>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default RoommateFinder;