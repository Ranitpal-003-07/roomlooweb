import React, { useState } from "react";
import "../styles/PGpage.css";
import PGCard from "../components/PGCard";
import PGDetailsModal from "../components/PGDetailsModal";

const PGs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roomCount, setRoomCount] = useState(1);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [selectedPG, setSelectedPG] = useState(null);

  const locations = ["Delhi", "Mumbai", "Bangalore", "Pune"];
  const colleges = ["IIT Delhi", "IIT Bombay", "IIM Bangalore", "Symbiosis Pune"];

  const pgList = [
    {
      id: 1,
      name: "Sunrise PG",
      price: "₹7,500",
      rating: "⭐⭐⭐⭐",
      location: "Delhi",
      availableRooms: 3,
      image: "https://source.unsplash.com/400x300/?hostel,room",
      rent: "₹7,500",
      electricityCharge: "₹500",
      waterBill: "₹200",
      ac: true,
      amenities: ["WiFi", "Laundry", "Meals", "Parking"],
    },
    {
      id: 2,
      name: "Blue Haven PG",
      price: "₹8,200",
      rating: "⭐⭐⭐⭐⭐",
      location: "Mumbai",
      availableRooms: 2,
      image: "https://source.unsplash.com/400x300/?apartment,room",
      rent: "₹8,200",
      electricityCharge: "₹600",
      waterBill: "₹250",
      ac: false,
      amenities: ["WiFi", "Gym", "CCTV Security", "Parking"],
    },
    {
      id: 3,
      name: "Green Nest PG",
      price: "₹6,500",
      rating: "⭐⭐⭐",
      location: "Bangalore",
      availableRooms: 5,
      image: "https://source.unsplash.com/400x300/?house,room",
      rent: "₹6,500",
      electricityCharge: "₹400",
      waterBill: "₹150",
      ac: true,
      amenities: ["WiFi", "AC", "CCTV Security", "Housekeeping"],
    },
  ];
  

  const toggleSelection = (value, setFunction, stateArray) => {
    if (stateArray.includes(value)) {
      setFunction(stateArray.filter((item) => item !== value));
    } else {
      setFunction([...stateArray, value]);
    }
  };

  return (
    <div className="pg-container">
      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search PGs by location or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="pg-content">
        {/* Left Filter Section */}
        <aside className="filter-section">
          <h3>Filters</h3>

          {/* Live Map Placeholder */}
          <div className="map-placeholder">📍 Live Map Here</div>

          {/* Price Slider */}
          <div className="filter-group">
            <h4>Price Range</h4>
            <input type="range" min="2000" max="25000" className="price-slider" />
          </div>

          {/* Amenities */}
          <div className="filter-group">
            <h4>Amenities</h4>
            <label><input type="checkbox" /> WiFi</label>
            <label><input type="checkbox" /> AC</label>
            <label><input type="checkbox" /> Meals Included</label>
            <label><input type="checkbox" /> Laundry</label>
          </div>

          {/* Number of Rooms - Slider */}
          <div className="filter-group">
            <h4>No. of Rooms: {roomCount}</h4>
            <input
              type="range"
              min="1"
              max="5"
              value={roomCount}
              onChange={(e) => setRoomCount(e.target.value)}
              className="room-slider"
            />
          </div>

          {/* Location Filter */}
          <div className="filter-group">
            <h4>Location</h4>
            {locations.map((location) => (
              <label key={location}>
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(location)}
                  onChange={() => toggleSelection(location, setSelectedLocations, selectedLocations)}
                />{" "}
                {location}
              </label>
            ))}
          </div>

          {/* Nearby Colleges Filter */}
          <div className="filter-group">
            <h4>Nearby College</h4>
            {colleges.map((college) => (
              <label key={college}>
                <input
                  type="checkbox"
                  checked={selectedColleges.includes(college)}
                  onChange={() => toggleSelection(college, setSelectedColleges, selectedColleges)}
                />{" "}
                {college}
              </label>
            ))}
          </div>
        </aside>

        {/* Right PG Listings Section */}
        <section className="pg-listings">
        {pgList
          .filter(pg => pg.name.toLowerCase().includes(searchTerm.toLowerCase()) || pg.location.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((pg) => (
            <PGCard key={pg.id} pg={pg} onClick={setSelectedPG} />
          ))}
      </section>

      {/* PG Details Modal */}
      <PGDetailsModal pg={selectedPG} onClose={() => setSelectedPG(null)} />
      </div>
    </div>
  );
};

export default PGs;
