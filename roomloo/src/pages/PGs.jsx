import React, { useState, useEffect, useRef } from "react";
import "../styles/PGpage.css";
import PGCard from "../components/PGCard";
import PGDetailsModal from "../components/PGDetailsModal";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const PGs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roomCount, setRoomCount] = useState(1);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [selectedPG, setSelectedPG] = useState(null);
  const [pgList, setPgList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false); // State for mobile filters visibility
  const [selectedGender, setSelectedGender] = useState("all"); // State for gender filter
  
  // Ref for filter sidebar to detect outside clicks
  const filterSidebarRef = useRef(null);
  
  // Set fixed price range from 0 to 40000
  const [priceRange] = useState({ min: 0, max: 40000 });
  const [currentPriceRange, setCurrentPriceRange] = useState(40000);
  
  const [amenityFilters, setAmenityFilters] = useState({
    "WiFi": false,
    "AC": false,
    "Non-AC": false,
    "TV": false,
    "Laundry": false,
    "Parking": false,
    "Mess/Food": false,
    "Gym": false,
    "Power Backup": false,
    "24/7 Water": false,
    "Security": false,
    "Cleaning Service": false,
    "Refrigerator": false,
    "Washing Machine": false,
    "Swimming Pool": false,
    "Elevator": false
  });
  
  const [locations, setLocations] = useState([]);
  const [colleges, setColleges] = useState([]);

  // Handle click outside of filter sidebar
  useEffect(() => {
    function handleClickOutside(event) {
      // Make sure we're not clicking a filter button
      if (filterSidebarRef.current && 
          !filterSidebarRef.current.contains(event.target) &&
          !event.target.classList.contains('filter-toggle-btn')) {
        setShowFilters(false);
      }
    }

    // Add event listener only when the filters are showing
    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters]);

  // Fetch PG listings from Firestore
  useEffect(() => {
    const fetchPGs = async () => {
      try {
        setLoading(true);
        const pgCollectionRef = collection(db, "pgListings");
        const pgSnapshot = await getDocs(pgCollectionRef);
        
        const pgData = pgSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        console.log("Fetched PG data:", pgData);
        setPgList(pgData);
        
        // Extract unique locations from fetched data
        const uniqueLocations = [...new Set(pgData.map(pg => pg.location).filter(Boolean))];
        setLocations(uniqueLocations);
        
        // Extract unique colleges from fetched data
        const uniqueColleges = [...new Set(pgData
          .map(pg => pg.nearbyCollege)
          .filter(college => college && college.trim() !== '')
        )];
        setColleges(uniqueColleges);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching PG listings:", error);
        setLoading(false);
      }
    };
    
    fetchPGs();
  }, []);

  // Filter PGs based on search term and selected filters
  const filteredPGs = pgList.filter(pg => {
    // For debugging
    const debugFilters = false;
    if (debugFilters && pg.id === pgList[0]?.id) {
      console.log("Filtering first PG:", pg);
    }
    
    // Filter by search term
    const matchesSearch = !searchTerm || 
      (pg.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       pg.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       pg.address?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (debugFilters && pg.id === pgList[0]?.id) {
      console.log("Matches search:", matchesSearch, searchTerm);
    }
    
    // Filter by location
    const matchesLocation = selectedLocations.length === 0 || 
                          (pg.location && selectedLocations.includes(pg.location));
    
    if (debugFilters && pg.id === pgList[0]?.id) {
      console.log("Matches location:", matchesLocation, selectedLocations);
    }
    
    // Filter by nearby college
    const matchesCollege = selectedColleges.length === 0 || 
                          (pg.nearbyCollege && selectedColleges.includes(pg.nearbyCollege));
    
    if (debugFilters && pg.id === pgList[0]?.id) {
      console.log("Matches college:", matchesCollege, selectedColleges);
    }
    
    // Filter by price - parse price safely
    const pgPrice = typeof pg.price === 'number' ? pg.price : parseInt(pg.price) || 0;
    const matchesPrice = pgPrice <= currentPriceRange;
    
    if (debugFilters && pg.id === pgList[0]?.id) {
      console.log("Matches price:", matchesPrice, pgPrice, currentPriceRange);
    }
    
    // Filter by room type - improved logic
    let matchesRoomType = true;
    
    if (roomCount === 1) {
      // Single room
      matchesRoomType = pg.roomType === 'Single' || pg.roomType?.toLowerCase()?.includes('single');
    } else if (roomCount > 1) {
      // Sharing room
      if (pg.roomType === 'Sharing' || pg.roomType?.toLowerCase()?.includes('sharing')) {
        if (pg.sharingType) {
          // First try to parse the sharingType as a number
          const sharingTypeNum = parseInt(pg.sharingType);
          if (!isNaN(sharingTypeNum)) {
            matchesRoomType = sharingTypeNum === roomCount;
          } else {
            // If not a simple number, do string comparisons
            const sharingTypeStr = String(pg.sharingType).toLowerCase().trim();
            matchesRoomType = 
              sharingTypeStr === String(roomCount) || 
              sharingTypeStr.startsWith(`${roomCount} `) || 
              sharingTypeStr.includes(`(${roomCount})`) ||
              sharingTypeStr.includes(`${roomCount} sharing`) ||
              sharingTypeStr.includes(`${roomCount}-sharing`);
          }
        } else {
          // No sharingType specified, check if the roomType itself contains the count
          const roomTypeStr = String(pg.roomType).toLowerCase();
          matchesRoomType = roomTypeStr.includes(`${roomCount} sharing`) || 
                          roomTypeStr.includes(`${roomCount}-sharing`);
        }
      } else {
        matchesRoomType = false;
      }
    }
    
    if (debugFilters && pg.id === pgList[0]?.id) {
      console.log("Matches room type:", matchesRoomType, pg.roomType, pg.sharingType, roomCount);
    }
    
    // Filter by amenities - improved to handle different amenity formats
    const matchesAmenities = Object.keys(amenityFilters).every(amenity => {
      // Only check amenities that are selected (true)
      if (!amenityFilters[amenity]) return true;
      
      const normalizedAmenity = amenity.toLowerCase().trim();
      
      // Safely check if amenities exists and contains the amenity
      if (pg.amenities && Array.isArray(pg.amenities)) {
        // Case-insensitive check for the amenity
        return pg.amenities.some(pgAmenity => 
          pgAmenity.toLowerCase().trim() === normalizedAmenity ||
          (amenity === "Mess/Food" && pgAmenity.toLowerCase().includes("food")) ||
          (amenity === "Mess/Food" && pgAmenity.toLowerCase().includes("meal")) ||
          (amenity === "Mess/Food" && pgAmenity.toLowerCase().includes("mess"))
        );
      }
      
      // If pg.amenities is a string, check if it contains the amenity
      if (pg.amenities && typeof pg.amenities === 'string') {
        return pg.amenities.toLowerCase().includes(normalizedAmenity);
      }
      
      return false;
    });
    
    if (debugFilters && pg.id === pgList[0]?.id) {
      console.log("Matches amenities:", matchesAmenities);
      console.log("PG amenities:", pg.amenities);
      console.log("Amenity filters:", amenityFilters);
    }
    
    // Filter by gender - improved with case-insensitive comparison
    const pgGender = pg.gender?.toLowerCase() || "";
    const matchesGender = selectedGender === "all" || 
                         pgGender === selectedGender.toLowerCase() ||
                         (pgGender === "co-ed" && selectedGender === "coed") ||
                         (pgGender === "coed" && selectedGender === "co-ed");
    
    if (debugFilters && pg.id === pgList[0]?.id) {
      console.log("Matches gender:", matchesGender, pgGender, selectedGender);
    }
    
    const shouldInclude = matchesSearch && matchesLocation && matchesCollege && 
           matchesPrice && matchesRoomType && matchesAmenities && matchesGender;
           
    if (debugFilters && pg.id === pgList[0]?.id) {
      console.log("Final result:", shouldInclude);
    }
    
    return shouldInclude;
  });

  const toggleSelection = (value, setFunction, stateArray) => {
    if (stateArray.includes(value)) {
      setFunction(stateArray.filter((item) => item !== value));
    } else {
      setFunction([...stateArray, value]);
    }
  };

  const handleAmenityChange = (amenity) => {
    setAmenityFilters(prev => ({
      ...prev,
      [amenity]: !prev[amenity]
    }));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLocations([]);
    setSelectedColleges([]);
    setCurrentPriceRange(priceRange.max);
    setRoomCount(1);
    setSelectedGender("all");
    // Reset all amenity filters to false
    const resetAmenities = {};
    Object.keys(amenityFilters).forEach(key => {
      resetAmenities[key] = false;
    });
    setAmenityFilters(resetAmenities);
  };

  // Toggle the filter sidebar
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="pg-container">
      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search PGs by name, location or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        {/* Mobile filter toggle button */}
        <button 
          className="filter-toggle-btn"
          onClick={toggleFilters}
          aria-label="Toggle filters"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
        </button>
      </div>
      
      {/* Gender Filter Section */}
      <div className="gender-filter-section">
        <div className="gender-options">
          <button 
            className={`gender-option ${selectedGender === "all" ? "active" : ""}`}
            onClick={() => setSelectedGender("all")}
          >
            All
          </button>
          <button 
            className={`gender-option ${selectedGender === "male" ? "active" : ""}`}
            onClick={() => setSelectedGender("male")}
          >
            Male
          </button>
          <button 
            className={`gender-option ${selectedGender === "female" ? "active" : ""}`}
            onClick={() => setSelectedGender("female")}
          >
            Female
          </button>
          <button 
            className={`gender-option ${selectedGender === "coed" ? "active" : ""}`}
            onClick={() => setSelectedGender("coed")}
          >
            Co-Ed
          </button>
        </div>
      </div>

      <div className="pg-content">
        {/* Left Filter Section - with responsive styling */}
        <aside 
          ref={filterSidebarRef}
          className={`filter-section ${showFilters ? "show-filters" : ""}`}
        >
          <div className="filter-header">
            <h3>Filters</h3>
            <button 
              className="close-filters-btn"
              onClick={() => setShowFilters(false)}
              aria-label="Close filters"
            >
              &times;
            </button>
          </div>
          
          <button 
            onClick={resetFilters}
            className="reset-filters-button"
          >
            Reset All Filters
          </button>

          {/* Live Map Placeholder */}
          <div className="map-placeholder">📍 Live Map Here</div>

          {/* Price Slider - now fixed from 0 to 40000 */}
          <div className="filter-group">
            <h4>Price Range: ₹{currentPriceRange}</h4>
            <input 
              type="range" 
              min={priceRange.min} 
              max={priceRange.max} 
              value={currentPriceRange}
              onChange={(e) => setCurrentPriceRange(parseInt(e.target.value))}
              className="price-slider" 
            />
            <div className="price-range-labels">
              <span>₹{priceRange.min}</span>
              <span>₹{priceRange.max}</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="filter-group">
            <h4>Amenities</h4>
            {Object.entries(amenityFilters).map(([amenity, isChecked]) => (
              <label
              key={amenity}
              className={`amenity-checkbox1 ${isChecked? 'active' : ''}`}
            >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleAmenityChange(amenity)}
                />
                {amenity === "Mess/Food" ? "Meals Included" : amenity}
              </label>
            ))}
          </div>

          {/* Number of Rooms - Slider */}
          <div className="filter-group">
            <h4>Room Type: {roomCount === 1 ? 'Single' : `${roomCount} Sharing`}</h4>
            <input
              type="range"
              min="1"
              max="4"
              value={roomCount}
              onChange={(e) => setRoomCount(parseInt(e.target.value))}
              className="room-slider"
            />
            <div className="room-type-labels">
              <span>Single</span>
              <span>4 Sharing</span>
            </div>
          </div>

          {/* Location Filter */}
          <div className="filter-group">
            <h4>Location</h4>
            {locations.map((location) => (
              <label key={location} className={`location-checkbox ${selectedLocations.includes(location)? 'active' : ''}`}>
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(location)}
                  onChange={() => toggleSelection(location, setSelectedLocations, selectedLocations)}
                />
                <span className="checkbox-custom"></span>
                {location}
              </label>
            ))}
          </div>

          {/* Nearby Colleges Filter */}
          <div className="filter-group">
            <h4>Nearby College</h4>
            {colleges.map((college) => (
              <label key={college} className="college-checkbox">
                <input
                  type="checkbox"
                  checked={selectedColleges.includes(college)}
                  onChange={() => toggleSelection(college, setSelectedColleges, selectedColleges)}
                />
                <span className="checkbox-custom"></span>
                {college}
              </label>
            ))}
          </div>
        </aside>

        {/* Right PG Listings Section */}
        <section className="pg-listings">
          {loading ? (
            <div className="loading-spinner">Loading PG listings...</div>
          ) : filteredPGs.length > 0 ? (
            filteredPGs.map((pg) => (
              <PGCard key={pg.id} pg={pg} onClick={setSelectedPG} />
            ))
          ) : (
            <div className="no-results">
              <p>No PG listings match your search criteria.</p>
              <button onClick={resetFilters}>Reset Filters</button>
            </div>
          )}
        </section>

        {/* PG Details Modal */}
        {selectedPG && <PGDetailsModal pg={selectedPG} onClose={() => setSelectedPG(null)} />}
      </div>
    </div>
  );
};

export default PGs;