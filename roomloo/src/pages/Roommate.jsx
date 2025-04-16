import React from "react";
import "../styles/RoommateFinder.css";
import RoommateCard from "../components/RoommateCard";

const RoommateFinder = () => {
  const roommates = [
    {
      id: 1,
      name: "Aarav Sharma",
      age: 22,
      college: "IIT Delhi",
      gender: "Male",
      matchPercentage: 92,
      image: "https://source.unsplash.com/300x400/?man,student",
    },
    {
      id: 2,
      name: "Meera Kapoor",
      age: 21,
      college: "Delhi University",
      gender: "Female",
      matchPercentage: 87,
      image: "https://source.unsplash.com/300x400/?woman,student",
    },
    {
      id: 3,
      name: "Kabir Malhotra",
      age: 23,
      college: "NSIT Delhi",
      gender: "Male",
      matchPercentage: 95,
      image: "https://source.unsplash.com/300x400/?youngman,college",
    },
    {
      id: 4,
      name: "Ananya Singh",
      age: 20,
      college: "Lady Shri Ram College",
      gender: "Female",
      matchPercentage: 90,
      image: "https://source.unsplash.com/300x400/?girl,student",
    },
    {
      id: 5,
      name: "Rohan Verma",
      age: 22,
      college: "Jamia Millia Islamia",
      gender: "Male",
      matchPercentage: 88,
      image: "https://source.unsplash.com/300x400/?male,college",
    },
    {
      id: 6,
      name: "Simran Kaur",
      age: 21,
      college: "Miranda House",
      gender: "Female",
      matchPercentage: 91,
      image: "https://source.unsplash.com/300x400/?female,college",
    }
  ];
  
  return (
    <div className="roommate-page">
      {/* Left Side - 70% */}
      <div className="roommate-left">
        <h2>Find Your Roommate</h2>
        <div className="roommate-grid">
          {roommates.map((roommate) => (
            <RoommateCard key={roommate.id} roommate={roommate} />
          ))}
        </div>
      </div>


      {/* Right Side - 30% */}
      <div className="roommate-right">
        <div className="roommate-filters">
          <h3 className="filter-title">Filter Roommates</h3>

          <div className="filter-group college-filter">
            <h4>College</h4>
            <input
              type="text"
              placeholder="Search colleges..."
              className="college-search"
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
                "Miranda House",
                "Bhagat Singh College",
                "Ramjas College",
                "LSR College",
                "Kirori Mal College",
                "Hindu College",
                "Delhi College of Arts",
                "Delhi College of Engineering",
                "Delhi College of Technology",
                "Delhi College of Management",
                "Delhi College of Science",
                "Delhi College of Commerce",
                "Delhi College of Business",
                "Delhi College of Law",
                "Delhi College of Education",
                "Delhi College of Nursing",
                "Delhi College of Pharmacy",
                "Delhi College of Hotel Management",
                "Delhi College of Catering",
                "Delhi College of Fashion",
                "Garhi College of Fashion",
                "DRC College of Fashion",
                "Delhi College of Design",
              ].map((college, idx) => (
                <label key={idx}>
                  <input type="checkbox" />
                  {college}
                </label>
              ))}
            </div>
          </div>


          <div className="filter-group">
            <label>Location</label>
            <input type="text" placeholder="Search location..." className="filter-search" />
          </div>

          <div className="filter-group">
            <label>Has PG?</label>
            <div><input type="checkbox" id="haspg" /><label htmlFor="haspg">Yes</label></div>
          </div>

          <div className="filter-group">
            <label>Religion</label>
            <div><input type="checkbox" id="hindu" /><label htmlFor="hindu">Hindu</label></div>
            <div><input type="checkbox" id="muslim" /><label htmlFor="muslim">Muslim</label></div>
            <div><input type="checkbox" id="christian" /><label htmlFor="christian">Christian</label></div>
            <div><input type="checkbox" id="others" /><label htmlFor="others">Others</label></div>
          </div>

          <div className="filter-group">
            <label>Gender</label>
            <div><input type="checkbox" id="male" /><label htmlFor="male">Male</label></div>
            <div><input type="checkbox" id="female" /><label htmlFor="female">Female</label></div>
            <div><input type="checkbox" id="other" /><label htmlFor="other">Other</label></div>
          </div>

          <div className="filter-group">
            <label>Preference</label>
            <div><input type="checkbox" id="pref-male" /><label htmlFor="pref-male">Male</label></div>
            <div><input type="checkbox" id="pref-female" /><label htmlFor="pref-female">Female</label></div>
            <div><input type="checkbox" id="pref-any" /><label htmlFor="pref-any">Any</label></div>
          </div>

          <div className="filter-group">
            <label>Food Preference</label>
            <div><input type="checkbox" id="veg" /><label htmlFor="veg">Vegetarian</label></div>
            <div><input type="checkbox" id="nonveg" /><label htmlFor="nonveg">Non-Vegetarian</label></div>
            <div><input type="checkbox" id="eggetarian" /><label htmlFor="eggetarian">Eggetarian</label></div>
          </div>

          <div className="filter-group">
            <label>Field of Study</label>
            <div><input type="checkbox" id="cs" /><label htmlFor="cs">CS</label></div>
            <div><input type="checkbox" id="eng" /><label htmlFor="eng">Engineering</label></div>
            <div><input type="checkbox" id="arts" /><label htmlFor="arts">Arts</label></div>
            <div><input type="checkbox" id="med" /><label htmlFor="med">Medical</label></div>
          </div>

          <div className="filter-group">
            <label>Smoking</label>
            <div><input type="checkbox" id="smoking" /><label htmlFor="smoking">Smoker</label></div>
            <div><input type="checkbox" id="nonsmoking" /><label htmlFor="nonsmoking">Non-Smoker</label></div>
          </div>

          <div className="filter-group">
            <label>Alcohol</label>
            <div><input type="checkbox" id="alcoholic" /><label htmlFor="alcoholic">Drinks</label></div>
            <div><input type="checkbox" id="nonalcoholic" /><label htmlFor="nonalcoholic">Non-Drinker</label></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoommateFinder;
