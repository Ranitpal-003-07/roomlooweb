/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FiEye, FiEdit2, FiTrash2, FiMapPin, FiHome, FiCoffee, FiWifi } from 'react-icons/fi';
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import "../styles/PGCard2.css";

const PGCard2 = ({ listing, onEdit, onDelete }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
 
  const {
    id,
    description,
    location,
    address,
    amenities = [],
    images = [],
    price = "Contact for price",
    occupancy = "Available",
    status = "active"
  } = listing;
 
  useEffect(() => {
    const fetchFirstImage = async () => {
      setLoadingImage(true);
      try {
        const storage = getStorage();        
        // Reference to the pg_images/{id} folder
        const pgImagesRef = ref(storage, `pg_images/${id}`);        
        // List all items in the folder
        const result = await listAll(pgImagesRef);
       
        if (result.items.length > 0) {
          // Get the first image in the folder
          const firstImageRef = result.items[0];
          const url = await getDownloadURL(firstImageRef);
          setImageUrl(url);
        } else {
          // No images found in the folder
          setImageUrl(null);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageUrl(null);
      } finally {
        setLoadingImage(false);
      }
    };
   
    fetchFirstImage();
  }, [id]);

  // Function to get icon for amenity
  const getAmenityIcon = (amenity) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes('wifi')) return <FiWifi size={12} />;
    if (lowerAmenity.includes('coffee') || lowerAmenity.includes('food')) return <FiCoffee size={12} />;
    return null;
  };
 
  return (
    <div 
      className="pg2-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="pg2-card-image-container">
        {loadingImage ? (
          <div className="pg2-card-image-placeholder">
            <div className="pg2-loading-pulse"></div>
          </div>
        ) : (
          <div className="pg2-card-image">
            {imageUrl ? (
              <img src={imageUrl} alt={description || "PG Accommodation"} />
            ) : (
              <div className="pg2-no-image">
                <FiHome size={40} />
              </div>
            )}
          </div>
        )}
        
        {/* Status Badge */}
        <div className={`pg2-card-status ${status}`}>{status}</div>
        
        {/* Occupancy Badge */}
        <div className="pg2-card-occupancy">{occupancy}</div>
        
        {/* Price Ribbon */}
        <div className="pg2-price-ribbon">
          <span>{price}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="pg2-card-content">
        {/* Title and Location */}
        <h3 className="pg2-title">{description || "PG Accommodation"}</h3>
        
        <div className="pg2-location">
          <FiMapPin className="pg2-location-icon" />
          <span>{location} {address ? `- ${address}` : ""}</span>
        </div>
        
        {/* Amenities */}
        <div className="pg2-amenities">
          {amenities.slice(0, 4).map((amenity, index) => (
            <div key={index} className="amenity-tag">
              {getAmenityIcon(amenity)}
              <span>{amenity}</span>
            </div>
          ))}
          {amenities.length > 4 && (
            <div className="amenity-tag amenity-more">
              +{amenities.length - 4}
            </div>
          )}
        </div>
        
        {/* Divider */}
        <div className="pg2-divider"></div>
        
        {/* Action Buttons */}
        <div className="pg2-card-actions">
          <button 
            className="pg2-action-btn view-btn" 
            title="View Details"
            aria-label="View Details"
          >
            <FiEye />
            <span className="pg2-btn-text">View</span>
          </button>
          
          <button
            className="pg2-action-btn edit-btn"
            title="Edit Listing"
            onClick={() => onEdit(id)}
            aria-label="Edit Listing"
          >
            <FiEdit2 />
            <span className="pg2-btn-text">Edit</span>
          </button>
          
          <button
            className="pg2-action-btn delete-btn"
            title="Delete Listing"
            onClick={() => onDelete(id)}
            aria-label="Delete Listing"
          >
            <FiTrash2 />
            <span className="pg2-btn-text">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PGCard2;